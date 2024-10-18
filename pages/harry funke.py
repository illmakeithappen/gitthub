import streamlit as st
#from streamlit_disqus import st_disqus


st.set_page_config(initial_sidebar_state="collapsed",
                   page_icon="static/gh_logo.ico",
                   page_title="gitthub/harry funke",
                   menu_items={"About":
                                   "This is a demo of the Streamlit app for gitthub.org."})

#st.sidebar.markdown("# Page 3 🎉")
st.logo("static/gitthub_logo.jpg", size="large", icon_image="static/gh_logo.jpg")
st.markdown("# Harry Funke war ein schlauer Mann")

#st_disqus("streamlit-disqus-demo")
