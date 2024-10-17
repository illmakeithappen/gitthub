'''
Streamlit for gitthub.org

author: florian gitt
last edit: 2024/10/17
todo:
    - add css file
'''

import streamlit as st
from streamlit_theme import st_theme

st.set_page_config(initial_sidebar_state="collapsed")
st_theme(adjust=True)



st.title('Streamlit for gitthub.org')
st.sidebar.header("Sidebar")

