import streamlit as st

st.set_page_config(initial_sidebar_state="collapsed",
                   page_icon="random",
                   page_title="gitthub",
                   menu_items={"About":
                                   "This is a demo of the Streamlit app for gitthub.org."})


#st.sidebar.markdown("# Page 2 ❄️")
st.logo("static/gitthub_logo.jpg", size="large", icon_image="static/gh_logo.jpg")

st.markdown("# Articles")



st.feedback(options="faces", label="How was your experience?", key="feedback")









