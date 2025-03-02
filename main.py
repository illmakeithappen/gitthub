'''
Streamlit for gitthub.org

author: florian gitt
last edit: 2024/10/17
todo:
    - get st_theme on render
'''
import streamlit as st
from datetime import datetime
import os

# Page configuration
st.set_page_config(
    layout="wide",
    initial_sidebar_state="expanded",
    page_icon="static/gh_logo.ico",
    page_title="gitthub | Data Journalism",
    menu_items={
        "About": "This is a data journalism platform by gitthub.org",
        "Report a bug": "https://github.com/yourusername/gitthub-journalism/issues",
        "Get help": "https://github.com/yourusername/gitthub-journalism"
    }
)
st.logo("static/gitthub_logo.jpg")

# CSS styling
st.markdown("""
<style>
    .main-header {
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 700;
        color: #1E1E1E;
    }
    .subheader {
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 400;
        color: #636363;
    }
    .article-card {
        padding: 1.5rem;
        border-radius: 0.5rem;
        background-color: #f8f9fa;
        margin-bottom: 1rem;
        border-left: 4px solid #0366d6;
        transition: transform 0.3s;
    }
    .article-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    .article-title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    .article-meta {
        font-size: 0.8rem;
        color: #666;
        margin-bottom: 0.8rem;
    }
    .article-summary {
        font-size: 1rem;
        color: #333;
    }
    .footer {
        margin-top: 3rem;
        padding-top: 1rem;
        border-top: 1px solid #eaeaea;
        text-align: center;
        color: #666;
        font-size: 0.8rem;
    }
</style>
""", unsafe_allow_html=True)

# Main header for content area only
st.markdown("<h1 class='main-header'>gitthub | Data Journalism</h1>", unsafe_allow_html=True)
st.markdown("<p class='subheader'>Exploring the world through data and narratives</p>", unsafe_allow_html=True)

# Featured article
st.markdown("## Featured Story")

featured_col1, featured_col2 = st.columns([2, 1])

with featured_col1:
    st.markdown("""
    <div class="article-card" style="border-left: 4px solid #ff4b4b;">
        <div class="article-title">Climate Change Impact: A Decade of Data Reveals Alarming Trends</div>
        <div class="article-meta">Published March 1, 2025 • 8 min read • Climate, Environment</div>
        <div class="article-summary">
            Our deep dive into global climate data reveals how temperature changes have accelerated over the past decade, 
            with interactive visualizations that help you understand the impact on your region.
        </div>
    </div>
    """, unsafe_allow_html=True)

with featured_col2:
    st.image("https://via.placeholder.com/400x250", caption="Global temperature anomalies (2015-2025)")

# Recent articles section
st.markdown("## Recent Articles")


# Function to display article cards
def display_article_card(title, date, category, summary, image_url=None):
    cols = st.columns([3, 1]) if image_url else [st.columns([1])[0]]

    with cols[0]:
        st.markdown(f"""
        <div class="article-card">
            <div class="article-title">{title}</div>
            <div class="article-meta">Published {date} • {category}</div>
            <div class="article-summary">{summary}</div>
        </div>
        """, unsafe_allow_html=True)

    if image_url:
        with cols[1]:
            st.image(image_url, width=200)


# Display sample articles
display_article_card(
    "Tech Giants' Environmental Impact: Analyzing Carbon Footprints",
    "February 25, 2025",
    "Technology, Environment",
    "We've analyzed publicly available data on major tech companies' carbon emissions and sustainability efforts. See how they compare and who's leading the green revolution.",
    "https://via.placeholder.com/200x150"
)

display_article_card(
    "Urban Housing Crisis: The Numbers Behind the Headlines",
    "February 18, 2025",
    "Economy, Housing",
    "Using census and real estate data, we explore the factors driving housing affordability issues in major metropolitan areas across the country.",
    "https://via.placeholder.com/200x150"
)

display_article_card(
    "Public Health Trends: Visualizing a Decade of Data",
    "February 10, 2025",
    "Health, Data Analysis",
    "Interactive visualizations reveal how public health metrics have changed over the past decade, with surprising findings about regional disparities."
)

# Topics section
st.markdown("## Explore by Topic")

topics_col1, topics_col2, topics_col3, topics_col4 = st.columns(4)

with topics_col1:
    st.button("📊 Economy", use_container_width=True)
    st.button("🌍 Climate", use_container_width=True)

with topics_col2:
    st.button("🏙️ Urban Development", use_container_width=True)
    st.button("💻 Technology", use_container_width=True)

with topics_col3:
    st.button("🏥 Healthcare", use_container_width=True)
    st.button("🗳️ Politics", use_container_width=True)

with topics_col4:
    st.button("📱 Social Media", use_container_width=True)
    st.button("🎓 Education", use_container_width=True)

# Newsletter signup
st.markdown("## Stay Updated")
with st.form(key='newsletter_form'):
    cols = st.columns([3, 1])
    with cols[0]:
        email = st.text_input("Email address")
    with cols[1]:
        submit_button = st.form_submit_button(label='Subscribe')

if submit_button:
    st.success("Thanks for subscribing! You'll receive our weekly data journalism digest.")

# Footer
st.markdown("""
<div class="footer">
    © 2025 gitthub.org | Data Journalism<br>
    All opinions are those of the author, not their employer.<br>
    <a href="#">About</a> • <a href="#">Contact</a> • <a href="#">Privacy Policy</a>
</div>
""", unsafe_allow_html=True)
