# services/superset/superset_config.py
"""
Superset configuration for GitThub.org
"""
import os
from celery.schedules import crontab
from flask_appbuilder.security.manager import AUTH_DB, AUTH_OAUTH

# ---------------------------------------------------------
# GitThub Branding
# ---------------------------------------------------------
APP_NAME = "GitThub Data Explorer"
APP_ICON = "/static/assets/images/gitthub-logo.png"
APP_ICON_WIDTH = 200

# GitThub color scheme
GITTHUB_COLORS = {
    'black': '#1a1a1a',
    'beige': '#e8ddd4',
    'light_beige': '#f5f0eb',
    'gray': '#4a5568',
    'white': '#ffffff',
    'red': '#dc2626'
}

# ---------------------------------------------------------
# Superset specific config
# ---------------------------------------------------------
SECRET_KEY = os.getenv('SUPERSET_SECRET_KEY', 'YOUR_SECRET_KEY_HERE')
SQLALCHEMY_DATABASE_URI = os.getenv(
    'SUPERSET_DATABASE_URL',
    'postgresql://superset:superset@postgres:5432/superset'
)

# Flask-WTF flag for CSRF
WTF_CSRF_ENABLED = True
WTF_CSRF_TIME_LIMIT = None

# Add endpoints that need to be exempt from CSRF protection
WTF_CSRF_EXEMPT_LIST = ['superset.views.core.log']

# ---------------------------------------------------------
# Database connections for GitThub data
# ---------------------------------------------------------
SQLALCHEMY_CUSTOM_PASSWORD_STORE = os.getenv('SQLALCHEMY_CUSTOM_PASSWORD_STORE', '{}')

# Default database for queries
DEFAULT_DATABASE_ID = 1  # GitThub main database

# ---------------------------------------------------------
# Feature Flags
# ---------------------------------------------------------
FEATURE_FLAGS = {
    'ENABLE_TEMPLATE_PROCESSING': True,
    'ENABLE_TEMPLATE_REMOVE_FILTERS': False,
    'DASHBOARD_RBAC': True,
    'ENABLE_REACT_CRUD_VIEWS': True,
    'EMBEDDED_SUPERSET': True,
    'ENABLE_EXPLORE_DRAG_AND_DROP': True,
    'DASHBOARD_CROSS_FILTERS': True,
    'DASHBOARD_NATIVE_FILTERS': True,
    'DASHBOARD_NATIVE_FILTERS_SET': True,
    'ENABLE_JAVASCRIPT_CONTROLS': True,
    'ALERT_REPORTS': True,
    'DYNAMIC_PLUGINS': True,
    'VERSIONED_EXPORT': True,
    'GLOBAL_ASYNC_QUERIES': True,
}

# ---------------------------------------------------------
# Cache configuration  
# ---------------------------------------------------------
CACHE_CONFIG = {
    'CACHE_TYPE': 'RedisCache',
    'CACHE_DEFAULT_TIMEOUT': 86400,  # 1 day
    'CACHE_KEY_PREFIX': 'superset_',
    'CACHE_REDIS_URL': os.getenv('REDIS_URL', 'redis://redis:6379/0'),
}

DATA_CACHE_CONFIG = {
    'CACHE_TYPE': 'RedisCache',
    'CACHE_DEFAULT_TIMEOUT': 86400,
    'CACHE_KEY_PREFIX': 'superset_data_',
    'CACHE_REDIS_URL': os.getenv('REDIS_URL', 'redis://redis:6379/1'),
}

# ---------------------------------------------------------
# Celery configuration for async queries
# ---------------------------------------------------------
class CeleryConfig:
    broker_url = os.getenv('REDIS_URL', 'redis://redis:6379/2')
    result_backend = os.getenv('REDIS_URL', 'redis://redis:6379/3')
    task_annotations = {
        'sql_lab.get_sql_results': {
            'rate_limit': '100/s',
        },
    }
    beat_schedule = {
        'reports.scheduler': {
            'task': 'reports.scheduler',
            'schedule': crontab(minute='*', hour='*'),
        },
        'reports.prune_log': {
            'task': 'reports.prune_log',
            'schedule': crontab(minute=0, hour=0),
        },
    }

CELERY_CONFIG = CeleryConfig

# ---------------------------------------------------------
# Security & Authentication
# ---------------------------------------------------------
# Integration with GitThub's existing auth
AUTH_TYPE = AUTH_DB  # Can change to AUTH_OAUTH for SSO

# Session configuration
SESSION_COOKIE_NAME = 'gitthub_superset_session'
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = os.getenv('ENV', 'development') == 'production'
SESSION_COOKIE_SAMESITE = 'Lax'
PERMANENT_SESSION_LIFETIME = 86400  # 1 day

# Enable proxy fix for Render deployment
ENABLE_PROXY_FIX = True
PROXY_FIX_CONFIG = {
    "x_for": 1,
    "x_proto": 1,
    "x_host": 1,
    "x_port": 1,
    "x_prefix": 1,
}

# ---------------------------------------------------------
# Row Level Security
# ---------------------------------------------------------
ENABLE_ROW_LEVEL_SECURITY = True
ROW_LEVEL_SECURITY_DEFAULT_CLAUSE = f"user_id = '{{{{{'}user_id'}}}}}'"

# ---------------------------------------------------------
# SQL Lab Settings
# ---------------------------------------------------------
SQLLAB_TIMEOUT = 300
SQLLAB_ASYNC_TIME_LIMIT_SEC = 60 * 60 * 6  # 6 hours
SQLLAB_QUERY_COST_ESTIMATE_TIMEOUT = 10
SQL_MAX_ROW = 100000

# Enable SQL Lab for users
ENABLE_SQL_LAB = True

# ---------------------------------------------------------
# Embedding configuration
# ---------------------------------------------------------
GUEST_ROLE_NAME = "GitThubGuest"
GUEST_TOKEN_JWT_SECRET = os.getenv('GUEST_TOKEN_JWT_SECRET', SECRET_KEY)
GUEST_TOKEN_JWT_ALGO = "HS256"
GUEST_TOKEN_HEADER_NAME = "X-GuestToken"
GUEST_TOKEN_JWT_EXP_SECONDS = 300  # 5 minutes

# CORS configuration for embedding
ENABLE_CORS = True
CORS_OPTIONS = {
    'supports_credentials': True,
    'allow_headers': ['*'],
    'resources': ['*'],
    'origins': [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://gitthub.org',
        'https://www.gitthub.org',
    ]
}

# ---------------------------------------------------------
# Custom CSS
# ---------------------------------------------------------
CUSTOM_CSS = f"""
.navbar {{
    background-color: {GITTHUB_COLORS['black']} !important;
}}

.navbar-brand {{
    color: {GITTHUB_COLORS['white']} !important;
}}

.btn-primary {{
    background-color: {GITTHUB_COLORS['black']};
    border-color: {GITTHUB_COLORS['black']};
}}

.btn-primary:hover {{
    background-color: {GITTHUB_COLORS['gray']};
    border-color: {GITTHUB_COLORS['gray']};
}}

.dashboard-header {{
    background-color: {GITTHUB_COLORS['light_beige']};
    border-bottom: 3px solid {GITTHUB_COLORS['black']};
}}

.slice_container {{
    border: 1px solid {GITTHUB_COLORS['beige']};
}}
"""

# ---------------------------------------------------------
# Data Upload Settings
# ---------------------------------------------------------
UPLOAD_FOLDER = '/app/uploads'
ALLOWED_EXTENSIONS = {'csv', 'json', 'xlsx', 'xls', 'parquet', 'tsv'}
CSV_UPLOAD_MAX_SIZE = 50 * 1024 * 1024  # 50MB

# ---------------------------------------------------------
# Map Settings (if using map visualizations)
# ---------------------------------------------------------
MAPBOX_API_KEY = os.getenv('MAPBOX_API_KEY', '')

# ---------------------------------------------------------
# Thumbnail configuration
# ---------------------------------------------------------
THUMBNAIL_CACHE_CONFIG = {
    'CACHE_TYPE': 'RedisCache',
    'CACHE_DEFAULT_TIMEOUT': 86400 * 7,  # 1 week
    'CACHE_KEY_PREFIX': 'thumbnail_',
    'CACHE_REDIS_URL': os.getenv('REDIS_URL', 'redis://redis:6379/4'),
}

# ---------------------------------------------------------
# Alert & Reports Configuration
# ---------------------------------------------------------
ALERT_REPORTS_NOTIFICATION_DRY_RUN = False
SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.sendgrid.net')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SMTP_STARTTLS = True
SMTP_SSL = False
SMTP_USER = os.getenv('SMTP_USER', '')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
SMTP_MAIL_FROM = os.getenv('SMTP_MAIL_FROM', 'alerts@gitthub.org')

# ---------------------------------------------------------
# Logging
# ---------------------------------------------------------
LOG_FORMAT = '%(asctime)s:%(levelname)s:%(name)s:%(message)s'
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')

# ---------------------------------------------------------
# Public role permissions (for embedded dashboards)
# ---------------------------------------------------------
PUBLIC_ROLE_LIKE = "GitThubGuest"

# Additional configurations for production
if os.getenv('ENV') == 'production':
    # Use secure cookies
    SESSION_COOKIE_SECURE = True
    
    # Increase workers for production
    SUPERSET_WORKERS = 4
    
    # Enable HTTPS redirect
    PREFERRED_URL_SCHEME = 'https'