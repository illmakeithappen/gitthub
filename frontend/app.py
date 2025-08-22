import dash
from dash import dcc, html, Input, Output, State, callback, no_update
import dash_bootstrap_components as dbc
import requests
import json

# Initialize Dash app with Bootstrap theme
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])
app.title = "My Awesome Landing Page"

# FastAPI backend URL (change this when deploying)
import os
API_BASE_URL = os.environ.get("API_BASE_URL", "http://localhost:8000")

def fetch_features():
    """Fetch features from FastAPI backend"""
    try:
        response = requests.get(f"{API_BASE_URL}/api/features")
        if response.status_code == 200:
            return response.json()
    except requests.exceptions.ConnectionError:
        return []
    return []

def get_stats():
    """Get site statistics from FastAPI backend"""
    try:
        response = requests.get(f"{API_BASE_URL}/api/stats")
        return response.json() if response.status_code == 200 else {}
    except requests.exceptions.ConnectionError:
        return {}

def get_api_status():
    """Get API connection status"""
    try:
        response = requests.get(f"{API_BASE_URL}/api/stats", timeout=2)
        if response.status_code == 200:
            return "✅ API Connected", "success"
        else:
            return "❌ API Issues", "danger"
    except:
        return "⚠️ API Offline", "warning"

# Custom CSS
app.index_string = '''
<!DOCTYPE html>
<html>
    <head>
        {%metas%}
        <title>{%title%}</title>
        {%favicon%}
        {%css%}
        <style>
            .main-header {
                background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
                padding: 3rem 0;
                margin-bottom: 2rem;
                border-radius: 0 0 20px 20px;
            }
            .feature-card {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
                text-align: center;
                margin: 1rem 0;
                border-left: 4px solid #667eea;
                height: 100%;
            }
            .contact-section {
                background: #f1f3f4;
                padding: 2rem;
                border-radius: 15px;
                margin: 2rem 0;
            }
            .stats-container {
                background: #e3f2fd;
                padding: 1rem;
                border-radius: 10px;
                text-align: center;
            }
            .hero-content {
                padding: 2rem 0;
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
        </style>
    </head>
    <body>
        {%app_entry%}
        <footer>
            {%config%}
            {%scripts%}
            {%renderer%}
        </footer>
    </body>
</html>
'''

# Layout
app.layout = html.Div([
    # Header Section
    html.Div([
        html.H1("🚀 Welcome to My Awesome App", style={'margin': '0'}),
        html.H3("Building the future with FastAPI & Dash", style={'margin': '0.5rem 0'}),
        html.P("Experience the power of modern Python web development")
    ], className="main-header"),
    
    dbc.Container([
        # Hero Section
        dbc.Row([
            dbc.Col([
                html.H2("🌟 Transform Your Ideas Into Reality"),
                html.P([
                    "Our platform combines the lightning-fast performance of ",
                    html.Strong("FastAPI"),
                    " with the beautiful, interactive interfaces of ",
                    html.Strong("Dash"),
                    " to create amazing web applications."
                ]),
                html.P("✨ Ready to get started? Scroll down to explore our features and get in touch!"),
                dbc.Button("🚀 Get Started Now", id="get-started-btn", color="primary", className="mb-3"),
                html.Div(id="get-started-message")
            ], width=8),
            
            dbc.Col([
                html.Div([
                    html.Div(id="stats-display", className="stats-container")
                ])
            ], width=4)
        ], className="mb-5"),
        
        # Features Section
        html.Hr(),
        html.H2("🎯 Our Amazing Features", className="text-center mb-4"),
        dbc.Row(id="features-row", className="mb-5"),
        
        # Contact Section
        html.Hr(),
        html.Div([
            html.H2("📧 Get In Touch", className="mb-3"),
            html.P("Have questions? We'd love to hear from you!"),
            
            dbc.Row([
                dbc.Col([
                    dbc.Input(id="contact-name", placeholder="Your Name", className="mb-3"),
                    dbc.Input(id="contact-email", placeholder="Your Email", type="email", className="mb-3")
                ], width=6),
                dbc.Col([
                    dbc.Textarea(id="contact-message", placeholder="Tell us about your project...", 
                               className="mb-3", style={'height': '120px'})
                ], width=6)
            ]),
            
            dbc.Button("Send Message 📤", id="contact-submit-btn", color="primary", className="mb-3"),
            html.Div(id="contact-result")
        ], className="contact-section"),
        
        # Footer
        html.Hr(),
        dbc.Row([
            dbc.Col([
                html.H5("🛠️ Built With"),
                html.Ul([
                    html.Li("FastAPI"),
                    html.Li("Dash"),
                    html.Li("Python")
                ])
            ], width=4),
            
            dbc.Col([
                html.H5("🔗 Quick Links"),
                html.Ul([
                    html.Li(html.A("FastAPI Docs", href="https://fastapi.tiangolo.com", target="_blank")),
                    html.Li(html.A("Dash Docs", href="https://dash.plotly.com", target="_blank")),
                    html.Li(html.A("Python", href="https://python.org", target="_blank"))
                ])
            ], width=4),
            
            dbc.Col([
                html.H5("📊 Backend Status"),
                html.Div(id="api-status")
            ], width=4)
        ], className="mb-4"),
        
        html.Hr(),
        html.Div([
            "Made with ❤️ using FastAPI + Dash | © 2025"
        ], style={'text-align': 'center', 'color': '#666'})
        
    ], fluid=True)
])

# Callbacks
@callback(
    Output("get-started-message", "children"),
    Input("get-started-btn", "n_clicks"),
    prevent_initial_call=True
)
def handle_get_started(n_clicks):
    if n_clicks:
        return dbc.Alert("Welcome aboard! Check out our features below 👇", color="success", dismissable=True)
    return no_update

@callback(
    Output("stats-display", "children"),
    Input("get-started-btn", "id")  # Trigger on page load
)
def update_stats(_):
    stats = get_stats()
    if stats:
        return [
            html.H6("Available Features"),
            html.H4(str(stats.get("total_features", 0))),
            html.H6("Messages Received"),
            html.H4(str(stats.get("contact_messages", 0))),
            html.H6("API Version"),
            html.H4(str(stats.get("api_version", "N/A")))
        ]
    return html.P("💡 Start the FastAPI backend to see dynamic stats!")

@callback(
    Output("features-row", "children"),
    Input("get-started-btn", "id")  # Trigger on page load
)
def update_features(_):
    features = fetch_features()
    if features:
        feature_cards = []
        for feature in features:
            card = dbc.Col([
                html.Div([
                    html.H2(feature['icon']),
                    html.H4(feature['title']),
                    html.P(feature['description'])
                ], className="feature-card")
            ], width=12//len(features))
            feature_cards.append(card)
        return feature_cards
    else:
        return dbc.Col([
            dbc.Alert("💡 Start the FastAPI backend to see dynamic features loaded from the API!", color="info")
        ], width=12)

@callback(
    Output("api-status", "children"),
    Input("get-started-btn", "id")  # Trigger on page load
)
def update_api_status(_):
    status_text, status_color = get_api_status()
    return dbc.Badge(status_text, color=status_color)

@callback(
    Output("contact-result", "children"),
    Input("contact-submit-btn", "n_clicks"),
    State("contact-name", "value"),
    State("contact-email", "value"),
    State("contact-message", "value"),
    prevent_initial_call=True
)
def handle_contact_form(n_clicks, name, email, message):
    if n_clicks:
        if not all([name, email, message]):
            return dbc.Alert("Please fill in all fields.", color="danger", dismissable=True)
        
        try:
            data = {"name": name, "email": email, "message": message}
            response = requests.post(f"{API_BASE_URL}/api/contact", json=data)
            result = response.json() if response.status_code == 200 else None
            
            if result and result.get("success"):
                return dbc.Alert(result["message"], color="success", dismissable=True)
            else:
                return dbc.Alert("There was an issue sending your message. Please try again.", color="danger", dismissable=True)
        except requests.exceptions.ConnectionError:
            return dbc.Alert("Could not connect to backend API", color="warning", dismissable=True)
    
    return no_update

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8050))
    app.run(debug=False, host="0.0.0.0", port=port)