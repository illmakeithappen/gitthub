'''
Streamlit for gitthub.org




'''

import streamlit as st
from datetime import date

# Custom CSS
st.markdown("""
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            color: #333;
        }
        h1 {
            color: #4a90e2;
            text-align: center;
            margin-bottom: 20px;
        }
        h2 {
            color: #333;
            border-bottom: 2px solid #4a90e2;
            padding-bottom: 10px;
        }
        .expander {
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
            padding: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
    </style>
""", unsafe_allow_html=True)

# Define variables
name = "Florian Gitt"
contact_info = {
    "phone": "+49 176 249 318 28",
    "email": "florian.gitt@pm.me",
    "github": "github.com/gitthub"  # Fixed typo in GitHub link
}

work_experience = [
    {"title": "Associate", "company": "German Institute of Development and Sustainability", "dates": "Jan 2024 - Present"},
    {"title": "Researcher", "company": "German Institute of Development and Sustainability", "dates": "Mar 2022 - Dec 2023"},
    {"title": "Research Assistant", "company": "European Parliament", "dates": "Sep 2019 - Feb 2022"},
    {"title": "Intern", "company": "Office Dr. Werner", "dates": "Aug 2018 - Oct 2018"}
]

education = [
    {"title": "Ph.D. in International Trade", "institution": "Paris School of Economics", "date": date(2023, 7, 1)},
    {"title": "M.Sc. in Economics", "institution": "University of Cologne", "date": date(2019, 7, 1)},
    {"title": "B.Sc. in Economics", "institution": "University of Bonn", "date": date(2012, 10, 1)}
]

publications = [
    {
        "title": "Berger et al. (2021). Macroeconomic Impacts.",
        "publication_type": "Book chapter",
        "year": 2021,
        "doi": "10.23661/dp11.2021"
    },
    {
        "title": "Berger et al. (2023). Implementation of the WTO Investment Facilitation for Development Agreement.",
        "publication_type": "Policy Brief",
        "year": 2023,
        "doi": "10.23661/ipb7.2023"
    },
    {
        "title": "Berger et al. (2023). The Updated Investment Facilitation Index (1.0.0) [Data set].",
        "publication_type": "Data set",
        "year": 2023,
        "doi": "10.5281/zenodo.7755522"
    },
    {
        "title": "Dadkhah et al. (2024). The Investment Facilitation Index (IFI).",
        "publication_type": "Journal article",
        "year": 2024,
        "doi": "10.5281/zenodo.7755522"
    }
]

skills = [
    {
        "language": "Python",
        "experience": ["Data analysis", "Visualization"]
    },
    {
        "language": "R",
        "experience": ["Data analysis", "Visualization"]
    },
    {
        "language": "SQL",
        "experience": ["Database management"]
    }
]

languages = [
    {"name": "German", "level": "Native"},
    {"name": "English", "level": "C2+"},
    {"name": "French", "level": "B1"}
]

# Streamlit app
st.title(name)

# Contact info section
with st.expander("Contact Info", expanded=True):
    for key, value in contact_info.items():
        st.write(f"**{key.capitalize()}:** {value}")

# Work experience section
with st.expander("Work Experience"):
    for exp in work_experience:
        with st.popover(f"{exp['title']} at {exp['company']}"):
            st.write(f"**Company:** {exp['company']}")
            st.write(f"**Dates:** {exp['dates']}")

# Education section
with st.expander("Education"):
    for edu in education:
        with st.popover(f"{edu['title']} ({edu['institution']})"):
            st.write(f"**Date:** {edu['date'].strftime('%Y-%m-%d')}")

# Publications section
with st.expander("Publications"):
    for pub in publications:
        with st.popover(pub["title"]):
            st.write(f"**Publication Type:** {pub['publication_type']}")
            st.write(f"**Year:** {pub['year']}")
            if pub["doi"]:
                st.write(f"**DOI:** [Link](https://doi.org/{pub['doi']})")

# Skills section
with st.expander("Skills"):
    for skill in skills:
        with st.popover(skill["language"]):
            st.write(f"**Experience:** {', '.join(skill['experience'])}")

# Languages section
with st.expander("Languages"):
    for lang in languages:
        with st.popover(lang["name"]):
            st.write(f"**Level:** {lang['level']}")

# Footer
st.markdown("---")
st.markdown('<div class="footer">This application was created to showcase my professional profile.</div>', unsafe_allow_html=True)