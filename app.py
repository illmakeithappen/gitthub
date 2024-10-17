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

st.set_page_config(initial_sidebar_state="collapsed")

# not working on render yet
#st_theme(adjust=True)



st.title('Streamlit for gitthub.org')
st.sidebar.header("Sidebar")

