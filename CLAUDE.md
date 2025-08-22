# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Streamlit-based data journalism platform for gitthub.org. The application serves as a personal website and portfolio for data journalism articles, featuring interactive visualizations, climate analysis, and link management tools.

## Architecture

### Main Application Structure
- **main.py**: Main Streamlit homepage with featured articles, newsletter signup, and navigation. Contains CSS styling and article card components.
- **pages/**: Streamlit multi-page application structure containing:
  - **1_climate_impact.py**: Interactive climate data article with visualizations (temperature anomalies, extreme weather, sea level rise)
  - **links.py**: Simple collection of personal/professional links
  - **linklist.py**: Advanced link annotation pipeline with web scraping, LLM enrichment via Ollama, and SQLite storage
  - **article1.py**, **article2.py**, **harry funke.py**: Additional article pages

### Data Management
- **data/links.csv**: Processed links with metadata, categories, and descriptions
- **finance.db**: SQLite database storing link annotations and metadata
- **static/**: Static assets (logos, images)
- **docs/**: PDF documents and resources

### Dependencies Management
- Uses **Poetry** (pyproject.toml) for dependency management
- **requirements.txt** available for pip-based installations
- Key dependencies: Streamlit, Plotly, Pandas, Requests, BeautifulSoup4, SQLite3

## Common Development Commands

### Running the Application
```bash
# Main application
streamlit run app.py

# Specific page
streamlit run pages/1_climate_impact.py
streamlit run pages/linklist.py
```

### Dependency Management
```bash
# Install dependencies with Poetry
poetry install

# Install dependencies with pip
pip install -r requirements.txt

# Add new dependency with Poetry
poetry add <package_name>
```

### Database Operations
The linklist.py application manages a SQLite database (`finance.db`) with the following schema:
- Table: `links`
- Columns: id (PRIMARY KEY), title, category, subcategory, description, link (UNIQUE), annotation, annotation_model, annotation_timestamp

## Key Features & Components

### Climate Impact Analysis (1_climate_impact.py)
- Generates synthetic climate data for visualization
- Interactive Plotly charts for temperature anomalies, extreme weather events, sea level rise
- Responsive design with custom CSS styling
- Data simulation functions for realistic climate projections

### Link Management Pipeline (linklist.py)
- Multi-step pipeline: Extract links → Fetch website content → LLM enrichment → Export to CSV/DB
- Integration with Ollama for local LLM processing
- Web scraping with BeautifulSoup4 and requests
- SQLite database storage with deduplication
- Support for Markdown link extraction

### Styling & UI
- Custom CSS in each page for consistent branding
- Responsive design with Streamlit columns
- Brand colors: #0366d6 (primary blue), #f8f9fa (background)
- Logo integration and page configuration

## Development Notes

### Environment Setup
- Ensure Ollama is running locally (`ollama serve`) for link annotation features
- Default Ollama model: `llama3.1`
- Default Ollama URL: `http://localhost:11434/api/generate`

### Data Paths
- CSV output: `./data/links.csv`
- SQLite DB: `./finance.db` (note: inconsistent with some references to `./ai_content.db`)
- Static assets: `./static/`

### Page Configuration
All pages use consistent Streamlit configuration:
- Wide layout
- Custom page icons from `static/gh_logo.ico`
- Brand logo: `static/gitthub_logo.jpg`