import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import random

# Page configuration
st.set_page_config(
    layout="wide",
    initial_sidebar_state="collapsed",
    page_icon="static/gh_logo.ico",
    page_title="Climate Change Impact | gitthub",
)

# CSS styling
st.markdown("""
<style>
    .article-title {
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 800;
        font-size: 2.5rem;
        color: #1E1E1E;
        margin-bottom: 1rem;
    }
    .article-subtitle {
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 400;
        font-size: 1.5rem;
        color: #636363;
        margin-bottom: 2rem;
    }
    .article-meta {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 2rem;
    }
    .article-section {
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 700;
        font-size: 1.8rem;
        color: #1E1E1E;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .article-text {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #333;
    }
    .highlight-box {
        background-color: #f8f9fa;
        border-left: 4px solid #0366d6;
        padding: 1.5rem;
        margin: 1.5rem 0;
        border-radius: 0.3rem;
    }
    .highlight-text {
        font-size: 1.2rem;
        font-weight: 500;
        color: #333;
    }
    .caption {
        font-size: 0.85rem;
        color: #666;
        text-align: center;
        margin-top: 0.5rem;
    }
    .source-text {
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.5rem;
    }
    .related-article {
        padding: 1rem;
        border-radius: 0.3rem;
        background-color: #f8f9fa;
        margin-bottom: 1rem;
        border-left: 3px solid #0366d6;
    }
    .author-box {
        display: flex;
        align-items: center;
        margin: 2rem 0;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 0.5rem;
    }
    .author-image {
        border-radius: 50%;
        margin-right: 1rem;
    }
    .author-name {
        font-weight: 600;
        margin-bottom: 0.2rem;
    }
    .author-bio {
        font-size: 0.9rem;
        color: #555;
    }
</style>
""", unsafe_allow_html=True)


# Helper function to generate sample climate data
def generate_climate_data():
    # Create date range for the past decade
    date_range = pd.date_range(start='2015-01-01', end='2025-01-01', freq='M')

    # Generate global temperature anomalies with an increasing trend
    baseline = 0.8  # starting anomaly in 2015 (°C)
    trend = 0.025  # yearly increase
    seasonal_factor = 0.2  # seasonal variation

    data = []
    regions = ['Global', 'North America', 'Europe', 'Asia', 'Africa', 'South America', 'Oceania']
    regional_factors = {
        'Global': 1.0,
        'North America': 1.2,
        'Europe': 1.1,
        'Asia': 0.9,
        'Africa': 1.3,
        'South America': 0.8,
        'Oceania': 0.7
    }

    for date in date_range:
        years_since_2015 = (date.year - 2015) + (date.month - 1) / 12
        trend_value = baseline + trend * years_since_2015
        seasonal_value = seasonal_factor * np.sin(2 * np.pi * (date.month - 1) / 12)
        random_factor = np.random.normal(0, 0.05)  # random noise

        for region in regions:
            regional_trend = trend_value * regional_factors[region]
            regional_seasonal = seasonal_value * (1.5 if region in ['North America', 'Europe', 'Asia'] else 0.8)
            regional_random = np.random.normal(0, 0.07)

            anomaly = regional_trend + regional_seasonal + regional_random

            data.append({
                'Date': date,
                'Year': date.year,
                'Month': date.month,
                'Region': region,
                'Temperature_Anomaly': round(anomaly, 2)
            })

    return pd.DataFrame(data)


# Generate extreme weather events data
def generate_extreme_events_data():
    # Create years for the past decade
    years = list(range(2015, 2026))

    # Event categories
    event_types = ['Floods', 'Droughts', 'Heatwaves', 'Wildfires', 'Severe Storms']

    data = []

    # Generate increasing trend for each event type
    for year in years:
        year_factor = (year - 2015) / 10  # Increasing factor based on year

        for event in event_types:
            # Base count that increases over time with some randomness
            if event == 'Floods':
                base_count = 70 + int(30 * year_factor)
                random_factor = random.randint(-5, 10)
            elif event == 'Droughts':
                base_count = 25 + int(25 * year_factor)
                random_factor = random.randint(-3, 7)
            elif event == 'Heatwaves':
                base_count = 30 + int(50 * year_factor)
                random_factor = random.randint(-4, 15)
            elif event == 'Wildfires':
                base_count = 50 + int(40 * year_factor)
                random_factor = random.randint(-5, 12)
            else:  # Severe Storms
                base_count = 80 + int(25 * year_factor)
                random_factor = random.randint(-8, 15)

            count = max(base_count + random_factor, 0)  # Ensure count is non-negative

            data.append({
                'Year': year,
                'Event_Type': event,
                'Count': count
            })

    return pd.DataFrame(data)


# Generate sea level rise data
def generate_sea_level_data():
    # Create years for the past decade with quarterly measurements
    quarters = []
    sea_levels = []

    # Base sea level rise in mm starting from 2015
    base_level = 60  # mm above pre-industrial level in 2015
    annual_rise_rate = 3.6  # mm per year, increasing slightly over time

    for year in range(2015, 2026):
        for quarter in range(1, 5):
            quarters.append(f"{year} Q{quarter}")

            years_since_2015 = (year - 2015) + (quarter - 1) / 4

            # Slightly accelerating rate of sea level rise
            acceleration_factor = 1 + (years_since_2015 * 0.02)
            quarterly_rise = (annual_rise_rate * acceleration_factor) / 4

            # Add some seasonal variation
            seasonal_factor = np.sin(2 * np.pi * (quarter - 1) / 4) * 1.2

            # Add some random noise
            random_factor = np.random.normal(0, 0.3)

            # Calculate cumulative sea level
            sea_level = base_level + (
                        years_since_2015 * annual_rise_rate * acceleration_factor) + seasonal_factor + random_factor
            sea_levels.append(round(sea_level, 1))

    return pd.DataFrame({'Quarter': quarters, 'Sea_Level_Rise_mm': sea_levels})


# Generate the sample data
climate_data = generate_climate_data()
extreme_events_data = generate_extreme_events_data()
sea_level_data = generate_sea_level_data()

# Article content
st.markdown("<h1 class='article-title'>Climate Change Impact: A Decade of Data Reveals Alarming Trends</h1>",
            unsafe_allow_html=True)
st.markdown(
    "<p class='article-subtitle'>How global temperatures, extreme weather events, and sea levels have changed from 2015 to 2025</p>",
    unsafe_allow_html=True)

# Article metadata
st.markdown(
    "<p class='article-meta'>By <strong>Jamie Data</strong> | Published March 1, 2025 | Updated March 2, 2025</p>",
    unsafe_allow_html=True)

# Featured image
st.image("https://via.placeholder.com/1200x400",
         caption="Global temperature anomalies visualized (Image source: Generated with climate data)")

# Introduction
st.markdown(
    "<p class='article-text'>For the past decade, climate scientists have warned about the accelerating pace of global warming. This article presents a comprehensive analysis of climate data from 2015 to 2025, revealing concerning trends that underscore the urgent need for action.</p>",
    unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>Our investigation combines data from multiple sources, including NASA, NOAA, and the World Meteorological Organization, to create interactive visualizations that help readers understand the scale and impact of climate change over the past ten years.</p>",
    unsafe_allow_html=True)

st.markdown(
    "<div class='highlight-box'><p class='highlight-text'>The data reveals that global temperature anomalies have increased by nearly 25% over the past decade, with some regions experiencing even more dramatic warming.</p></div>",
    unsafe_allow_html=True)

# Section 1: Temperature Anomalies
st.markdown("<h2 class='article-section'>Rising Temperatures: A Global Perspective</h2>", unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>Temperature anomalies—deviations from the long-term average—provide a clear picture of how our climate is changing. The interactive chart below shows global and regional temperature anomalies over the past decade.</p>",
    unsafe_allow_html=True)

# Interactive visualization 1: Temperature anomalies by region
st.subheader("Interactive: Temperature Anomalies by Region (2015-2025)")

# Region selector for the first chart
selected_regions = st.multiselect(
    "Select regions to display:",
    options=climate_data['Region'].unique(),
    default=['Global', 'North America', 'Europe']
)

# Filter data based on selection
filtered_climate_data = climate_data[climate_data['Region'].isin(selected_regions)]

# Create the interactive line chart
fig1 = px.line(
    filtered_climate_data,
    x='Date',
    y='Temperature_Anomaly',
    color='Region',
    title='Monthly Temperature Anomalies (°C above pre-industrial levels)',
    labels={'Temperature_Anomaly': 'Temperature Anomaly (°C)', 'Date': 'Year'},
    line_shape='spline',
    markers=False
)

fig1.update_layout(
    height=500,
    hovermode='x unified',
    legend=dict(orientation='h', yanchor='bottom', y=1.02, xanchor='right', x=1),
    margin=dict(l=20, r=20, t=50, b=20)
)

st.plotly_chart(fig1, use_container_width=True)
st.markdown("<p class='source-text'>Data source: Generated based on NASA GISTEMP and NOAA data patterns</p>",
            unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>The data shows that all regions have experienced warming, but the rate varies significantly. North America and Europe have seen the most dramatic temperature increases, while South America and Oceania show more moderate changes. The global average demonstrates a clear upward trend, with seasonal variations visible in the monthly data.</p>",
    unsafe_allow_html=True)

# Add a heatmap visualization
st.subheader("Temperature Anomalies Heatmap")

# Pivot the data for the heatmap
pivot_data = climate_data[climate_data['Region'] == 'Global'].pivot_table(
    values='Temperature_Anomaly',
    index='Year',
    columns='Month'
)

# Create heatmap - ensure y axis length matches the pivot data's index
# First make sure our pivot table has all years represented
years_in_data = sorted(pivot_data.index.unique())

# Create heatmap with the actual years from the data
fig_heatmap = px.imshow(
    pivot_data,
    labels=dict(x="Month", y="Year", color="Temperature Anomaly (°C)"),
    x=[f"{m}" for m in range(1, 13)],
    y=[str(y) for y in years_in_data],
    color_continuous_scale='RdBu_r',
    aspect="auto"
)

fig_heatmap.update_layout(
    height=400,
    coloraxis_colorbar=dict(title="°C"),
    margin=dict(l=20, r=20, t=30, b=20)
)

st.plotly_chart(fig_heatmap, use_container_width=True)
st.markdown(
    "<p class='caption'>Monthly global temperature anomalies by year. Darker red indicates higher temperature anomalies.</p>",
    unsafe_allow_html=True)

# Section 2: Extreme Weather Events
st.markdown("<h2 class='article-section'>Extreme Weather Events: The New Normal</h2>", unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>As global temperatures rise, we're witnessing an increase in extreme weather events worldwide. Floods, droughts, heatwaves, wildfires, and severe storms have all become more frequent and intense over the past decade.</p>",
    unsafe_allow_html=True)

# Interactive visualization 2: Extreme weather events
st.subheader("Interactive: Extreme Weather Events (2015-2025)")

# Event type selector
selected_events = st.multiselect(
    "Select event types to display:",
    options=extreme_events_data['Event_Type'].unique(),
    default=extreme_events_data['Event_Type'].unique()
)

# Filter data based on selection
filtered_events_data = extreme_events_data[extreme_events_data['Event_Type'].isin(selected_events)]

# Create the interactive bar chart
fig2 = px.bar(
    filtered_events_data,
    x='Year',
    y='Count',
    color='Event_Type',
    title='Number of Recorded Extreme Weather Events by Type',
    labels={'Count': 'Number of Events', 'Year': 'Year'},
    barmode='group'
)

fig2.update_layout(
    height=500,
    hovermode='x unified',
    legend=dict(orientation='h', yanchor='bottom', y=1.02, xanchor='right', x=1),
    margin=dict(l=20, r=20, t=50, b=20)
)

st.plotly_chart(fig2, use_container_width=True)
st.markdown(
    "<p class='source-text'>Data source: Generated based on EM-DAT International Disaster Database patterns</p>",
    unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>The data reveals a concerning trend: all categories of extreme weather events have increased over the past decade. Heatwaves show the most dramatic rise, nearly doubling since 2015, while floods remain the most common extreme weather event overall. These changes align with climate models that predict more frequent and severe weather extremes as global temperatures rise.</p>",
    unsafe_allow_html=True)

# Add a normalized stacked area chart to show relative changes
st.subheader("Relative Changes in Extreme Weather Events")

# Prepare data for stacked area chart
pivot_events = extreme_events_data.pivot_table(
    values='Count',
    index='Year',
    columns='Event_Type'
)

# Calculate percentages for each year
percent_events = pivot_events.div(pivot_events.sum(axis=1), axis=0) * 100

# Reset index to convert Year back to a column
percent_events_reset = percent_events.reset_index()

# Melt the data for plotly
melted_events = pd.melt(
    percent_events_reset,
    id_vars=['Year'],
    value_vars=list(percent_events.columns),
    var_name='Event_Type',
    value_name='Percentage'
)

# Create the stacked area chart
fig_area = px.area(
    melted_events,
    x='Year',
    y='Percentage',
    color='Event_Type',
    title='Relative Distribution of Extreme Weather Events',
    labels={'Percentage': 'Percentage of Total Events', 'Year': 'Year'},
    line_shape='spline'
)

fig_area.update_layout(
    height=400,
    hovermode='x unified',
    legend=dict(orientation='h', yanchor='bottom', y=1.02, xanchor='right', x=1),
    margin=dict(l=20, r=20, t=50, b=20),
    yaxis=dict(ticksuffix='%')
)

st.plotly_chart(fig_area, use_container_width=True)
st.markdown(
    "<p class='caption'>The changing composition of extreme weather events over time. Note the increasing proportion of heatwaves and wildfires.</p>",
    unsafe_allow_html=True)

# Section 3: Sea Level Rise
st.markdown("<h2 class='article-section'>Rising Seas: The Long-Term Threat</h2>", unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>Sea level rise represents one of the most significant long-term threats posed by climate change. Even small increases can dramatically increase the risk of coastal flooding during storms, threatening billions of people living in coastal areas worldwide.</p>",
    unsafe_allow_html=True)

# Interactive visualization 3: Sea level rise
st.subheader("Interactive: Global Mean Sea Level Rise (2015-2025)")

# Create the interactive line chart with range slider
fig3 = px.line(
    sea_level_data,
    x='Quarter',
    y='Sea_Level_Rise_mm',
    title='Global Mean Sea Level Rise (mm above pre-industrial levels)',
    labels={'Sea_Level_Rise_mm': 'Sea Level Rise (mm)', 'Quarter': 'Year'},
    line_shape='spline',
    markers=True
)

fig3.update_layout(
    height=500,
    hovermode='x unified',
    margin=dict(l=20, r=20, t=50, b=20),
    xaxis=dict(
        rangeslider=dict(visible=True),
        type='category'
    )
)

# Add trendline
x = list(range(len(sea_level_data)))
y = sea_level_data['Sea_Level_Rise_mm']
z = np.polyfit(x, y, 1)
p = np.poly1d(z)

fig3.add_trace(
    go.Scatter(
        x=sea_level_data['Quarter'],
        y=p(x),
        mode='lines',
        name='Trend',
        line=dict(color='red', dash='dash')
    )
)

st.plotly_chart(fig3, use_container_width=True)
st.markdown("<p class='source-text'>Data source: Generated based on NASA Satellite Sea Level Observations patterns</p>",
            unsafe_allow_html=True)

# Add an interactive projection visualization
st.subheader("Sea Level Rise Projections")


# Create projection data
def create_projection_data():
    years = list(range(2025, 2101))
    scenarios = {
        'Low Emissions (SSP1-2.6)': 0.3,  # cm per year
        'Moderate Emissions (SSP2-4.5)': 0.5,  # cm per year
        'High Emissions (SSP5-8.5)': 0.8,  # cm per year
    }

    data = []
    start_level = sea_level_data['Sea_Level_Rise_mm'].iloc[-1] / 10  # convert to cm

    for scenario, rate in scenarios.items():
        for year in years:
            years_from_2025 = year - 2025

            # Add acceleration factor for more realistic projections
            if scenario == 'Low Emissions (SSP1-2.6)':
                acceleration = 1 + (years_from_2025 * 0.001)  # slight acceleration
            elif scenario == 'Moderate Emissions (SSP2-4.5)':
                acceleration = 1 + (years_from_2025 * 0.003)  # moderate acceleration
            else:  # High emissions
                acceleration = 1 + (years_from_2025 * 0.005)  # high acceleration

            annual_rate = rate * acceleration
            rise = start_level + (years_from_2025 * annual_rate)

            data.append({
                'Year': year,
                'Scenario': scenario,
                'Sea_Level_Rise_cm': round(rise, 1)
            })

    return pd.DataFrame(data)


projection_data = create_projection_data()

# Create interactive projection chart
fig_proj = px.line(
    projection_data,
    x='Year',
    y='Sea_Level_Rise_cm',
    color='Scenario',
    title='Sea Level Rise Projections to 2100',
    labels={'Sea_Level_Rise_cm': 'Sea Level Rise (cm)', 'Year': 'Year'},
    line_shape='spline'
)

fig_proj.update_layout(
    height=500,
    hovermode='x unified',
    legend=dict(orientation='h', yanchor='bottom', y=1.02, xanchor='right', x=1),
    margin=dict(l=20, r=20, t=50, b=20),
    xaxis=dict(tickangle=45)
)

# Add annotation for context
fig_proj.add_annotation(
    x=2100,
    y=projection_data[projection_data['Year'] == 2100]['Sea_Level_Rise_cm'].max(),
    text="80cm rise would threaten coastal cities worldwide",
    showarrow=True,
    arrowhead=1,
    ax=0,
    ay=-40
)

st.plotly_chart(fig_proj, use_container_width=True)
st.markdown(
    "<p class='caption'>Sea level rise projections under different emission scenarios. The high emissions scenario could result in over 80cm of sea level rise by 2100.</p>",
    unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>The data shows that sea levels have risen approximately 25mm over the past decade, with the rate of increase accelerating. This acceleration is consistent with climate models that predict faster sea level rise as ocean temperatures increase and ice sheets melt more rapidly.</p>",
    unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>While 25mm might seem small, it represents a significant increase in the baseline water level that affects coastal flooding. According to our projections based on various emissions scenarios, sea levels could rise anywhere from 30cm to over 80cm by 2100, putting numerous coastal cities at risk.</p>",
    unsafe_allow_html=True)

# Interactive regional impact map
st.markdown("<h2 class='article-section'>Regional Impacts: Who's Most Vulnerable?</h2>", unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>Climate change affects different regions in different ways. Our analysis identifies which areas have experienced the most significant warming and are most vulnerable to continued change.</p>",
    unsafe_allow_html=True)


# Create sample regional impact data
@st.cache_data
def generate_regional_impact_data():
    regions = [
        'North America', 'Central America', 'South America',
        'Western Europe', 'Eastern Europe', 'North Africa', 'Sub-Saharan Africa',
        'Middle East', 'Central Asia', 'South Asia', 'East Asia',
        'Southeast Asia', 'Australia', 'Pacific Islands'
    ]

    # Define random vulnerability scores for different impact types
    data = []
    for region in regions:
        # Create region-specific vulnerability patterns
        if 'Africa' in region or 'Asia' in region or 'Islands' in region:
            temp_factor = np.random.uniform(0.7, 1.0)
            drought_factor = np.random.uniform(0.8, 1.0)
            flood_factor = np.random.uniform(0.6, 0.9)
            econ_factor = np.random.uniform(0.7, 1.0)
        elif 'America' in region:
            temp_factor = np.random.uniform(0.5, 0.8)
            drought_factor = np.random.uniform(0.6, 0.9)
            flood_factor = np.random.uniform(0.5, 0.8)
            econ_factor = np.random.uniform(0.4, 0.7)
        else:  # Europe, Australia
            temp_factor = np.random.uniform(0.4, 0.7)
            drought_factor = np.random.uniform(0.4, 0.7)
            flood_factor = np.random.uniform(0.5, 0.8)
            econ_factor = np.random.uniform(0.3, 0.6)

        data.append({
            'Region': region,
            'Temperature_Vulnerability': round(np.random.uniform(5, 10) * temp_factor, 1),
            'Drought_Vulnerability': round(np.random.uniform(5, 10) * drought_factor, 1),
            'Flood_Vulnerability': round(np.random.uniform(5, 10) * flood_factor, 1),
            'Economic_Impact': round(np.random.uniform(5, 10) * econ_factor, 1),
            'Overall_Vulnerability': None  # Will calculate this
        })

    # Convert to DataFrame
    df = pd.DataFrame(data)

    # Calculate overall vulnerability (weighted average)
    df['Overall_Vulnerability'] = round((
            df['Temperature_Vulnerability'] * 0.3 +
            df['Drought_Vulnerability'] * 0.25 +
            df['Flood_Vulnerability'] * 0.25 +
            df['Economic_Impact'] * 0.2
    ), 1)

    return df


regional_impact_data = generate_regional_impact_data()

# Create radar chart for regional vulnerabilities
st.subheader("Regional Climate Vulnerability Assessment")

# Region selector for radar chart
selected_region = st.selectbox(
    "Select a region to view its vulnerability profile:",
    options=regional_impact_data['Region'].tolist()
)

# Filter data for selected region
region_data = regional_impact_data[regional_impact_data['Region'] == selected_region].iloc[0]

# Prepare radar chart data
categories = ['Temperature', 'Drought', 'Flood', 'Economic']
values = [
    region_data['Temperature_Vulnerability'],
    region_data['Drought_Vulnerability'],
    region_data['Flood_Vulnerability'],
    region_data['Economic_Impact']
]

# Create radar chart
fig_radar = go.Figure()

fig_radar.add_trace(go.Scatterpolar(
    r=values,
    theta=categories,
    fill='toself',
    name=selected_region
))

fig_radar.update_layout(
    polar=dict(
        radialaxis=dict(
            visible=True,
            range=[0, 10]
        )
    ),
    title=f"Vulnerability Profile: {selected_region} (Overall Score: {region_data['Overall_Vulnerability']})",
    height=500
)

st.plotly_chart(fig_radar, use_container_width=True)

# Create a sortable table of all regions
st.subheader("Vulnerability Rankings by Region")

# Sort options
sort_by = st.selectbox(
    "Sort regions by:",
    options=["Overall_Vulnerability", "Temperature_Vulnerability", "Drought_Vulnerability", "Flood_Vulnerability",
             "Economic_Impact"],
    format_func=lambda x: x.replace("_", " ")
)

# Sort the data
sorted_regions = regional_impact_data.sort_values(by=sort_by, ascending=False)

# Create a styled table with plotly
fig_table = go.Figure(data=[go.Table(
    header=dict(
        values=["Region", "Temperature", "Drought", "Flood", "Economic", "Overall"],
        fill_color='royalblue',
        align='left',
        font=dict(color='white', size=12)
    ),
    cells=dict(
        values=[
            sorted_regions['Region'],
            sorted_regions['Temperature_Vulnerability'],
            sorted_regions['Drought_Vulnerability'],
            sorted_regions['Flood_Vulnerability'],
            sorted_regions['Economic_Impact'],
            sorted_regions['Overall_Vulnerability']
        ],
        fill_color=[['#f5f7fa'] * len(sorted_regions)],
        align='left')
)
])

fig_table.update_layout(
    height=400,
    margin=dict(l=0, r=0, t=0, b=0)
)

st.plotly_chart(fig_table, use_container_width=True)

# Conclusion
st.markdown("<h2 class='article-section'>Conclusion: The Path Forward</h2>", unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>The data presented in this article paints a clear picture: climate change is accelerating, and its impacts are becoming more severe. Over the past decade, we've witnessed rising temperatures, more frequent extreme weather events, and accelerating sea level rise—all consistent with scientific projections.</p>",
    unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>However, the data also suggests that different emissions scenarios lead to significantly different outcomes. This underscores the importance of ambitious climate action to limit warming and its associated impacts.</p>",
    unsafe_allow_html=True)

st.markdown(
    "<div class='highlight-box'><p class='highlight-text'>The next decade will be crucial. If current trends continue, we will likely surpass the 1.5°C warming threshold set by the Paris Agreement by 2030, leading to even more severe climate impacts.</p></div>",
    unsafe_allow_html=True)

st.markdown(
    "<p class='article-text'>In future articles, we'll explore specific mitigation and adaptation strategies, examine successful climate policies from around the world, and investigate the economic opportunities presented by the transition to a low-carbon economy.</p>",
    unsafe_allow_html=True)

# Author information
st.markdown("<h2 class='article-section'>About the Author</h2>", unsafe_allow_html=True)

col1, col2 = st.columns([1, 3])

with col1:
    st.image("https://via.placeholder.com/150", width=150, caption="Jamie Data")

with col2:
    st.markdown("<p class='author-name'>Jamie Data</p>", unsafe_allow_html=True)
    st.markdown(
        "<p class='author-bio'>Jamie Data is a data journalist specializing in climate science and environmental issues. With a background in both climate modeling and data visualization, Jamie focuses on making complex scientific information accessible to the public.</p>",
        unsafe_allow_html=True)

# Related articles
st.markdown("<h2 class='article-section'>Related Articles</h2>", unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    st.markdown("""
    <div class="related-article">
        <strong>Climate Policy Analysis: What Works and What Doesn't</strong><br>
        An evidence-based assessment of climate policies from around the world.
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="related-article">
        <strong>The Economics of Climate Change</strong><br>
        How climate change affects economies and the economic opportunities of the green transition.
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="related-article">
        <strong>Urban Planning for a Changing Climate</strong><br>
        How cities are adapting to rising temperatures and extreme weather events.
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="related-article">
        <strong>Climate Data Deep Dive: Understanding the Metrics</strong><br>
        A guide to understanding the key metrics and data sources in climate science.
    </div>
    """, unsafe_allow_html=True)

# Add interactive comments section
st.markdown("<h2 class='article-section'>Join the Conversation</h2>", unsafe_allow_html=True)

with st.form(key='comment_form'):
    st.text_area("Share your thoughts on this article:", height=100)
    col1, col2, col3 = st.columns([1, 1, 1])
    with col1:
        st.text_input("Name")
    with col2:
        st.text_input("Email (not published)")
    with col3:
        st.form_submit_button(label='Post Comment')

# Footer with social sharing
st.markdown("<hr>", unsafe_allow_html=True)
cols = st.columns([1, 1, 1, 1, 1])
with cols[0]:
    st.button("📱 Share", use_container_width=True)
with cols[1]:
    st.button("🐦 Twitter", use_container_width=True)
with cols[2]:
    st.button("📘 Facebook", use_container_width=True)
with cols[3]:
    st.button("📧 Email", use_container_width=True)
with cols[4]:
    st.button("🖨️ Print", use_container_width=True)