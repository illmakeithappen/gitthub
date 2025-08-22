#!/usr/bin/env python3
# Run with: streamlit run streamlit_links_simple_pipeline.py
"""
Simple Streamlit Link Annotator – with full pipeline steps

• Step 1: Extract links from Markdown / pasted text to a working DataFrame
• Step 2: Fetch website content (title + text) with hashing to avoid rework
• Step 3: Call local Ollama to generate category + 2–3 sentence description (with input hash tracking)
• Output: ONE CSV at ./data/links.csv and a SQLite DB ./finance.db, table `links`

Table `links` schema:
  id TEXT PRIMARY KEY          # SHA1(Link)[:16]
  title TEXT
  category TEXT
  subcategory TEXT             # empty in this app
  description TEXT             # human/LLM description
  link TEXT UNIQUE
  annotation TEXT              # same as description (for compatibility)
  annotation_model TEXT
  annotation_timestamp TEXT

Notes
- We keep additional working columns in the CSV (WebsiteText, Title_Extracted, Content_Hash, LLM_Hash, Processed, Error, Note, Date Added/Modified) to preserve pipeline state.
- DB remains clean/minimal with only the columns above.
"""

from __future__ import annotations

import os
import re
import csv
import json
import time
import hashlib
import sqlite3
import logging
from datetime import datetime
from typing import List

import pandas as pd
import requests
import streamlit as st
from bs4 import BeautifulSoup

# ===============
# Config Defaults
# ===============
CSV_OUT_DEFAULT = "./data/links.csv"
DB_PATH_DEFAULT = "./ai_content.db"  # as requested
TABLE_DEFAULT = "links"
OLLAMA_URL_DEFAULT = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL_DEFAULT = "llama3.1"


# ===============
# Logging helper
# ===============

def setup_logging(log_level=logging.INFO):
    logger = logging.getLogger("links_simple_pipeline")
    logger.setLevel(log_level)
    if not logger.handlers:
        sh = logging.StreamHandler()
        fmt = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        sh.setFormatter(fmt)
        logger.addHandler(sh)
    return logger


logger = setup_logging()


# ========================
# Utility & hashing helpers
# ========================

def ensure_dir(path: str):
    d = os.path.dirname(path)
    if d:
        os.makedirs(d, exist_ok=True)


def ensure_directories_exist(file_paths: List[str]):
    for p in file_paths:
        if p:
            ensure_dir(p)


def get_default_column_config():
    core_columns = [
        "LinkIndex", "Note", "Link", "Category", "Title", "Description",
        "Date Added", "Date Modified", "Comment"
    ]
    csv_only = [
        "WebsiteText", "Error", "LLM_Description", "Title_Extracted",
        "Content_Hash", "LLM_Hash", "Processed"
    ]
    return {
        "core": core_columns,
        "csv_only": csv_only,
        "all": core_columns + csv_only,
    }


def generate_content_hash(content) -> str:
    if content is None or (isinstance(content, float) and pd.isna(content)):
        return ""
    s = str(content).strip()
    if not s:
        return ""
    return hashlib.md5(s.encode('utf-8')).hexdigest()


# =====================
# Step 1 – link extract
# =====================

def extract_links_from_text(text: str) -> pd.DataFrame:
    rows = []
    lines = text.splitlines()
    md_pattern = r"\[(https?://[^\]\s]+)\]\((https?://[^\)\s]+)\)"  # [url](url)
    url_pattern = r"https?://[^\s)<\"]+"
    today = datetime.now().strftime("%Y-%m-%d")

    for line in lines:
        s = line.strip()
        if not s or (s.startswith('|') and '|' in s[1:]):
            continue
        md_links = re.findall(md_pattern, s)
        if md_links:
            link = md_links[0][0]
            note = re.sub(md_pattern, '', s).strip()
            rows.append({"Note": note, "Link": link, "Date Added": today, "Date Modified": today})
            continue
        links = re.findall(url_pattern, s)
        if links:
            link = links[0]
            note = s.split(link)[0].strip()
            rows.append({"Note": note, "Link": link, "Date Added": today, "Date Modified": today})

    df = pd.DataFrame(rows)
    if df.empty:
        return df
    # ensure full schema for CSV
    cfg = get_default_column_config()
    for col in cfg["all"]:
        if col not in df.columns:
            df[col] = ""
    # add LinkIndex
    if "LinkIndex" not in df.columns or (df["LinkIndex"] == "").all():
        df["LinkIndex"] = range(1, len(df) + 1)
    df["LinkIndex"] = df["LinkIndex"].astype(int)
    return df[cfg["all"]]


# ==================================
# Step 2 – fetch website (title/text)
# ==================================

def fetch_website_content(df: pd.DataFrame, *, max_links: int | None, timeout: int = 10, max_retries: int = 2,
                          force_refetch: bool = False) -> pd.DataFrame:
    if df is None or df.empty:
        return df
    work = df.copy()
    for col in ['WebsiteText', 'Title_Extracted', 'Error', 'Content_Hash', 'Processed']:
        if col not in work.columns:
            work[col] = ""

    # choose rows to process
    if force_refetch:
        to_proc = work.index
    else:
        to_proc = work[
            (work['Processed'] != 'WebsiteFetched') | (work['Error'] != '') | (work['Content_Hash'] == '')].index
    if max_links and len(to_proc) > max_links:
        to_proc = to_proc[:max_links]

    session = requests.Session()
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36',
    ]

    prog = st.progress(0.0)
    for j, idx in enumerate(to_proc):
        url = work.at[idx, 'Link']
        success = False
        err = ""
        for attempt in range(max_retries):
            try:
                session.headers.update({
                    'User-Agent': user_agents[attempt % len(user_agents)],
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                })
                r = session.get(url, timeout=timeout)
                r.raise_for_status()
                soup = BeautifulSoup(r.text, 'html.parser')
                h1 = soup.find('h1')
                title_tag = soup.find('title')
                title = h1.text.strip() if h1 else (title_tag.text.strip() if title_tag else "")
                for sep in [" | ", " - "]:
                    if sep in title:
                        title = title.split(sep)[0]
                        break
                title = re.sub(r'\s+', ' ', title).strip()

                content_tags = soup.find('article') or soup.find('main')
                if not content_tags:
                    for idp in ['content', 'article', 'main', 'post']:
                        node = soup.find(id=re.compile(idp, re.I))
                        if node:
                            content_tags = node;
                            break
                if not content_tags:
                    divs = soup.find_all('div')
                    content_tags = max(divs, key=lambda x: len(x.get_text(strip=True))) if divs else soup
                for s in content_tags(["script", "style"]):
                    s.extract()
                text = content_tags.get_text(separator=' ', strip=True)
                text = re.sub(r'\s+', ' ', text).strip()
                if len(text) < 50 and soup.text:
                    for s in soup(["script", "style"]):
                        s.extract()
                    text = re.sub(r'\s+', ' ', soup.get_text(separator=' ', strip=True)).strip()

                chash = generate_content_hash(text)
                old = work.at[idx, 'Content_Hash']
                if force_refetch or not old or old != chash:
                    work.at[idx, 'WebsiteText'] = text[:5000]
                    work.at[idx, 'Title_Extracted'] = title
                    work.at[idx, 'Content_Hash'] = chash
                    work.at[idx, 'Error'] = ""
                    if not work.at[idx, 'Title']:
                        work.at[idx, 'Title'] = title
                    work.at[idx, 'Date Modified'] = datetime.now().strftime('%Y-%m-%d')
                work.at[idx, 'Processed'] = 'WebsiteFetched'
                success = True
                break
            except requests.exceptions.RequestException as e:
                err = str(e);
                time.sleep(0.5)
            except Exception as e:
                err = str(e);
                break
        if not success:
            work.at[idx, 'Error'] = f"Error fetching content: {err}"
            work.at[idx, 'Date Modified'] = datetime.now().strftime('%Y-%m-%d')
            work.at[idx, 'Processed'] = 'Error'
        prog.progress((j + 1) / max(len(to_proc), 1))
    prog.progress(1.0)
    return work


# ==================================
# Ollama helpers (Step 3 – LLM)
# ==================================

def test_ollama_connection(api_url: str) -> bool:
    try:
        base = api_url.split('/api/')[0] + "/api/tags"
        r = requests.get(base, timeout=5)
        r.raise_for_status()
        return True
    except Exception:
        return False


def ollama_call(model: str, api_url: str, prompt: str, timeout: int = 30) -> str:
    try:
        payload = {"model": model, "prompt": prompt, "stream": False}
        r = requests.post(api_url, json=payload, timeout=timeout)
        r.raise_for_status()
        return r.json().get('response', '').strip()
    except Exception:
        return ""


def gen_category(title: str, note: str, url: str, website_text: str, error: str, model: str, api_url: str) -> str:
    has_content = website_text and not error
    prompt = f"""
URL: {url}
Title: {title or 'Unknown'}
User Note: {note or ''}

Pick ONE category from: Development, AI/ML, Research, Tutorial, News, Blog, Reference, Video, Resource, Tool, Documentation, Course, Paper, Book.
"""
    if has_content and len(website_text) > 100:
        prompt += f"\nContent sample:\n{website_text[:500]}\n"
    prompt += "\nCategory: "
    return ollama_call(model, api_url, prompt)


def gen_description(title: str, note: str, url: str, website_text: str, error: str, category: str, model: str,
                    api_url: str) -> str:
    has_content = website_text and not error
    prompt = f"""
Create a concise 2–3 sentence description for this resource.
URL: {url}
Title: {title or 'Unknown'}
Category: {category or 'Unknown'}
Note: {note or ''}
"""
    if has_content:
        prompt += f"\nWebpage content sample:\n{website_text[:800]}\n"
    else:
        prompt += "\n(Website content unavailable; base it on URL/title/note.)\n"
    prompt += "\nDescription: "
    return ollama_call(model, api_url, prompt)


def enrich_with_llm(df: pd.DataFrame, *, model: str, api_url: str, max_links: int | None,
                    force_regen: bool) -> pd.DataFrame:
    if df is None or df.empty:
        return df
    work = df.copy()
    for col in ['LLM_Description', 'LLM_Hash', 'Category', 'Description']:
        if col not in work.columns:
            work[col] = ""

    # choose rows to process
    if force_regen:
        to_proc = work.index
    else:
        # process rows that have fetched website text and either no LLM or changed input hash
        def need_llm(row):
            input_data = {
                'url': row.get('Link', ''),
                'title': row.get('Title', ''),
                'note': row.get('Note', ''),
                'content_hash': row.get('Content_Hash', '')
            }
            ih = generate_content_hash(json.dumps(input_data, sort_keys=True))
            return (row.get('Processed') == 'WebsiteFetched') and (
                        not row.get('LLM_Description') or ih != str(row.get('LLM_Hash', '')))

        mask = work.apply(need_llm, axis=1)
        to_proc = work[mask].index

    if max_links and len(to_proc) > max_links:
        to_proc = to_proc[:max_links]

    if len(to_proc) == 0:
        return work

    if not test_ollama_connection(api_url):
        st.warning("Ollama is not reachable. Start `ollama serve` and pull your model.")
        return work

    prog = st.progress(0.0)
    for j, idx in enumerate(to_proc):
        url = work.at[idx, 'Link']
        title = work.at[idx, 'Title']
        note = work.at[idx, 'Note']
        wtxt = work.at[idx, 'WebsiteText']
        err = work.at[idx, 'Error']
        cat = gen_category(title, note, url, wtxt, err, model, api_url)
        if cat:
            work.at[idx, 'Category'] = cat
        desc = gen_description(title, note, url, wtxt, err, work.at[idx, 'Category'], model, api_url)
        if desc:
            work.at[idx, 'LLM_Description'] = desc
            if not work.at[idx, 'Description']:
                work.at[idx, 'Description'] = desc
            ih = generate_content_hash(
                json.dumps({'url': url, 'title': title, 'note': note, 'content_hash': work.at[idx, 'Content_Hash']},
                           sort_keys=True))
            work.at[idx, 'LLM_Hash'] = ih
            work.at[idx, 'Date Modified'] = datetime.now().strftime('%Y-%m-%d')
            work.at[idx, 'Processed'] = 'LLM_Processed'
        prog.progress((j + 1) / max(len(to_proc), 1))
    prog.progress(1.0)
    return work


# =====================
# SQLite (DB) utilities
# =====================
SCHEMA_SQL = """
             CREATE TABLE IF NOT EXISTS links \
             ( \
                 id \
                 TEXT \
                 PRIMARY \
                 KEY, \
                 title \
                 TEXT, \
                 category \
                 TEXT, \
                 subcategory \
                 TEXT, \
                 description \
                 TEXT, \
                 link \
                 TEXT \
                 UNIQUE, \
                 annotation \
                 TEXT, \
                 annotation_model \
                 TEXT, \
                 annotation_timestamp \
                 TEXT
             );
             CREATE INDEX IF NOT EXISTS idx_links_link ON links(link); \
             """


def init_db(db_path: str):
    ensure_dir(db_path)
    with sqlite3.connect(db_path) as conn:
        conn.executescript(SCHEMA_SQL)


def export_to_sqlite(df: pd.DataFrame, *, db_path: str, table: str, model_name: str) -> int:
    if df is None or df.empty:
        return 0
    init_db(db_path)
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    out = pd.DataFrame()
    out['link'] = df['Link']
    out['id'] = out['link'].apply(lambda x: hashlib.sha1((x or '').encode('utf-8')).hexdigest()[:16])
    out['title'] = df.get('Title', "")
    out['category'] = df.get('Category', "")
    out['subcategory'] = ""
    # choose LLM_Description first
    llm = df.get('LLM_Description', pd.Series([""] * len(df)))
    fallback = df.get('Description', pd.Series([""] * len(df)))
    out['annotation'] = llm.where(llm.astype(str).str.len() > 0, fallback)
    out['description'] = df.get('Description', "")
    out['annotation_model'] = model_name
    out['annotation_timestamp'] = now

    cols = ["id", "title", "category", "subcategory", "description", "link", "annotation", "annotation_model",
            "annotation_timestamp"]
    out = out[cols].drop_duplicates(subset=['id'])

    placeholders = ", ".join([":" + c for c in cols])
    col_list = ", ".join(cols)
    update_clause = ", ".join([f"{c}=excluded.{c}" for c in cols if c != 'id'])
    sql = f"""
    INSERT INTO {table} ({col_list})
    VALUES ({placeholders})
    ON CONFLICT(id) DO UPDATE SET {update_clause}
    """

    with sqlite3.connect(db_path) as conn:
        cur = conn.cursor()
        cur.executemany(sql, out.to_dict(orient='records'))
        conn.commit()
        return cur.rowcount or 0


# ==============
# Streamlit App
# ==============

def main():
    st.set_page_config(page_title="Links → CSV + SQLite", page_icon="🔗", layout="wide")
    st.title("🔗 Links Pipeline (Simple) – Website fetch + LLM + CSV/DB")

    with st.sidebar:
        st.header("I/O & Model")
        csv_out = st.text_input("CSV output", value=CSV_OUT_DEFAULT)
        db_path = st.text_input("SQLite DB path", value=DB_PATH_DEFAULT)
        table = st.text_input("Table name", value=TABLE_DEFAULT)
        st.divider()
        api_url = st.text_input("Ollama API URL", value=OLLAMA_URL_DEFAULT)
        model = st.text_input("Model", value=MODEL_DEFAULT)
        st.divider()
        max_links = st.number_input("Max links per step (0 = all)", min_value=0, value=0)
        force_refetch = st.checkbox("Force refetch website content", value=False)
        force_regen = st.checkbox("Force regenerate LLM", value=False)

    st.subheader("1) Provide links")
    input_md_path = st.text_input("Markdown file path (optional)", value="LINKS.md")
    uploaded = st.file_uploader("…or upload .md/.txt", type=["md", "txt"])
    pasted = st.text_area("…or paste lines with URLs", height=120)

    df = None
    if uploaded is not None:
        try:
            text = uploaded.read().decode('utf-8', errors='ignore')
            df = extract_links_from_text(text)
            st.success(f"Loaded {len(df)} links from uploaded file")
        except Exception as e:
            st.error(f"Failed to read uploaded file: {e}")
    elif pasted.strip():
        df = extract_links_from_text(pasted)
        st.success(f"Extracted {len(df)} links from pasted text")
    elif os.path.exists(input_md_path):
        try:
            with open(input_md_path, 'r', encoding='utf-8') as f:
                text = f.read()
            df = extract_links_from_text(text)
            st.success(f"Loaded {len(df)} links from {input_md_path}")
        except Exception as e:
            st.error(f"Failed to read {input_md_path}: {e}")

    if df is not None and not df.empty:
        st.dataframe(
            df[[c for c in ["Note", "Link", "Title", "Category", "Description", "Processed"] if c in df.columns]].head(
                20), use_container_width=True)

    st.subheader("2) Run pipeline steps")
    c1, c2, c3, c4 = st.columns(4)
    run_all = c1.button("🚀 Run ALL", type="primary")
    btn_fetch = c2.button("🌐 Fetch content")
    btn_llm = c3.button("🧠 LLM enrich")
    btn_save = c4.button("💾 Save CSV + DB")

    # Keep state across reruns
    if 'working_df' not in st.session_state:
        st.session_state.working_df = None

    if df is not None:
        st.session_state.working_df = df

    # Step 2
    if run_all or btn_fetch:
        if st.session_state.working_df is None or st.session_state.working_df.empty:
            st.warning("Load or paste some links first.")
        else:
            with st.spinner("Fetching website content…"):
                lim = max_links or None
                st.session_state.working_df = fetch_website_content(st.session_state.working_df, max_links=lim,
                                                                    force_refetch=force_refetch)
            st.success("Content fetch complete")
            st.dataframe(st.session_state.working_df[
                             [c for c in ["Link", "Title", "Title_Extracted", "Error", "Processed", "Content_Hash"] if
                              c in st.session_state.working_df.columns]], use_container_width=True)

    # Step 3
    if run_all or btn_llm:
        if st.session_state.working_df is None or st.session_state.working_df.empty:
            st.warning("Nothing to enrich. Run content fetch first.")
        else:
            with st.spinner("Generating categories & descriptions with Ollama…"):
                lim = max_links or None
                st.session_state.working_df = enrich_with_llm(st.session_state.working_df, model=model, api_url=api_url,
                                                              max_links=lim, force_regen=force_regen)
            st.success("LLM enrichment complete")
            st.dataframe(st.session_state.working_df[
                             [c for c in ["Link", "Title", "Category", "LLM_Description", "Processed"] if
                              c in st.session_state.working_df.columns]], use_container_width=True)

    # Save CSV + DB
    if run_all or btn_save:
        if st.session_state.working_df is None or st.session_state.working_df.empty:
            st.warning("No data to save.")
        else:
            # Save / merge CSV
            ensure_dir(csv_out)
            out_df = st.session_state.working_df.copy()
            # persist working CSV with all columns
            if os.path.exists(csv_out) and os.path.getsize(csv_out) > 0:
                try:
                    old = pd.read_csv(csv_out)
                    merged = pd.concat([old, out_df], ignore_index=True)
                    # Create a stable id from Link to de-duplicate rows logically
                    merged['__id'] = merged['Link'].apply(
                        lambda x: hashlib.sha1((x or '').encode('utf-8')).hexdigest()[:16])
                    merged.sort_values(by=['__id', 'Date Modified'], inplace=True)
                    merged = merged.drop_duplicates(subset=['__id'], keep='last')
                    merged.drop(columns=['__id'], inplace=True)
                    merged.to_csv(csv_out, index=False)
                except Exception:
                    out_df.to_csv(csv_out, index=False)
            else:
                out_df.to_csv(csv_out, index=False)
            st.success(f"Saved CSV → {csv_out}")

            # DB export (clean/minimal selection)
            affected = export_to_sqlite(out_df, db_path=db_path, table=table, model_name=model)
            st.success(f"Upserted {affected} row(s) into {db_path}:{table}")

            st.markdown("---")
            st.subheader("Preview (DB payload)")
            preview = pd.DataFrame({
                'id': out_df['Link'].apply(lambda x: hashlib.sha1((x or '').encode('utf-8')).hexdigest()[:16]),
                'link': out_df['Link'],
                'title': out_df.get('Title', ''),
                'category': out_df.get('Category', ''),
                'description': out_df.get('Description', ''),
            })
            st.dataframe(preview.head(50), use_container_width=True)
            st.download_button("Download current CSV", data=pd.read_csv(csv_out).to_csv(index=False),
                               file_name=os.path.basename(csv_out), mime="text/csv")


if __name__ == "__main__":
    main()
