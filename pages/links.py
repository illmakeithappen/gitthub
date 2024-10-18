import streamlit as st


# set pages config
st.set_page_config(initial_sidebar_state="collapsed",
                   page_icon="random",
                   page_title="gitthub",
                   menu_items={"About":
                                   "This is a demo of the Streamlit app for gitthub.org."})

# set logo
st.logo("static/gitthub_logo.jpg", size="large", icon_image="static/gh_logo.jpg")


# markdown text
st.markdown(
"""
# Collection of links

- [Curriculum Vitae](https://github.com/illmakeithappen/gitthub/blob/main/docs/Curriculum%20Vitae.pdf)
- [GitHub](https://github.com/illmakeithappen)
- [IDOS](https://www.idos-research.de/en/florian-gitt/)
- [Google Scholar](https://scholar.google.com/citations?user=z44XJ4UAAAAJ&hl=de)
- [LinkedIn](https://www.linkedin.com/in/florian-gitt-8b31b3188/)
- [X](https://x.com/gitthub)
"""
)

