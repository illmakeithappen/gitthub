import streamlit as st


# set pages config
st.set_page_config(initial_sidebar_state="collapsed",
                   page_icon="assets/gh_logo.ico",
                   page_title="gitthub/article",
                   menu_items={"About":
                                   "This is a demo of the Streamlit app for gitthub.org."})

# set logo
st.logo("assets/gitthub_logo.jpg", size="large", icon_image="assets/gh_logo.jpg")


# markdown text
st.markdown(
"""
# Coming soon...

"""
)

