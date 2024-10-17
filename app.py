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

st.set_page_config(initial_sidebar_state="collapsed",
                   page_icon="random",
                   page_title="gitthub",
                   menu_items={"About":
                                   "This is a demo of the Streamlit app for gitthub.org."})

# not working on render yet
#st_theme(adjust=True)



st.title('Streamlit for gitthub.org')
st.sidebar.header("Sidebar")

