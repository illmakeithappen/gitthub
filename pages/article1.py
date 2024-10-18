import streamlit as st


# set pages config
st.set_page_config(initial_sidebar_state="collapsed",
                   page_icon="static/gh_logo.ico",
                   page_title="gitthub/article",
                   menu_items={"About":
                                   "This is a demo of the Streamlit app for gitthub.org."})

# set logo
st.logo("static/gitthub_logo.jpg", size="large", icon_image="static/gh_logo.jpg")


# markdown text
st.markdown(
"""
# Coming soon...

"""
)

