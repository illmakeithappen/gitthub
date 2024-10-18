'''
Streamlit for gitthub.org

author: florian gitt
last edit: 2024/10/17
todo:
    - get st_theme on render
'''

import streamlit as st



# not working on render yet
#from streamlit_theme import st_theme

st.set_page_config(layout="centered",
                   initial_sidebar_state="collapsed",
                   page_icon="random",
                   page_title="gitthub",
                   menu_items={"About":
                                   "This is a demo of the Streamlit app for gitthub.org."})

# not working on render yet
#st_theme(adjust=True)

#"gitthub/static/gitthub_logo.jpg"

st.logo("static/gitthub_logo.jpg", size="large", icon_image="static/gh_logo.jpg")


st.markdown(
"""
# Streamlit App for Github

This page will serve as an outlet for data journalism and other writing on my own behalf.

All opinions on this site are mine, not my employers.

"""
)



