# services/superset/bootstrap.py
"""
Bootstrap script to initialize Superset with GitThub data
"""
import os
import logging
from superset import app, db, security_manager
from superset.models.core import Database
from superset.models.dashboard import Dashboard
from superset.models.slice import Slice
from superset.connectors.sqla.models import SqlaTable
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_default_database_connections():
    """Create database connections for GitThub data"""
    
    # Main GitThub database (AWS RDS)
    gitthub_db = Database(
        database_name="GitThub Main Database",
        sqlalchemy_uri=os.getenv(
            'GITTHUB_DATABASE_URL',
            'postgresql://user:pass@aws-rds-endpoint/gitthub'
        ),
        expose_in_sqllab=True,
        allow_ctas=True,
        allow_cvas=True,
        allow_dml=True,
        allow_multi_schema_metadata_fetch=True,
    )
    
    # Analytics database (for processed data)
    analytics_db = Database(
        database_name="GitThub Analytics",
        sqlalchemy_uri=os.getenv(
            'ANALYTICS_DATABASE_URL',
            'postgresql://user:pass@aws-rds-endpoint/analytics'
        ),
        expose_in_sqllab=True,
        allow_ctas=True,
        allow_cvas=True,
    )
    
    # Add databases
    db.session.add(gitthub_db)
    db.session.add(analytics_db)
    db.session.commit()
    
    logger.info("Created default database connections")
    return gitthub_db, analytics_db

def create_default_datasets(database):
    """Create default datasets for GitThub data"""
    
    datasets = [
        {
            'table_name': 'databank_resources',
            'schema': 'public',
            'description': 'All Data Bank resources with metadata',
        },
        {
            'table_name': 'courses',
            'schema': 'public',
            'description': 'AI-generated courses',
        },
        {
            'table_name': 'user_progress',
            'schema': 'public',
            'description': 'User course progress tracking',
        },
        {
            'table_name': 'data_uploads',
            'schema': 'public',
            'description': 'User-uploaded datasets',
        },
    ]
    
    for dataset_config in datasets:
        dataset = SqlaTable(
            table_name=dataset_config['table_name'],
            schema=dataset_config['schema'],
            database=database,
            description=dataset_config['description'],
        )
        db.session.add(dataset)
    
    db.session.commit()
    logger.info(f"Created {len(datasets)} default datasets")

def create_default_charts(database):
    """Create default visualizations"""
    
    charts = [
        {
            'slice_name': 'Data Bank Resources Overview',
            'viz_type': 'pie',
            'datasource_type': 'table',
            'params': json.dumps({
                'metric': 'count',
                'groupby': ['category'],
                'row_limit': 10,
            }),
        },
        {
            'slice_name': 'Upload Trends',
            'viz_type': 'line',
            'datasource_type': 'table',
            'params': json.dumps({
                'metrics': ['count'],
                'groupby': ['upload_date'],
                'time_grain_sqla': 'P1D',
            }),
        },
        {
            'slice_name': 'Course Completion Rates',
            'viz_type': 'bar',
            'datasource_type': 'table',
            'params': json.dumps({
                'metrics': ['completion_rate'],
                'groupby': ['course_name'],
            }),
        },
        {
            'slice_name': 'User Activity Heatmap',
            'viz_type': 'heatmap',
            'datasource_type': 'table',
            'params': json.dumps({
                'metrics': ['activity_count'],
                'groupby': ['hour', 'day_of_week'],
            }),
        },
    ]
    
    created_charts = []
    for chart_config in charts:
        chart = Slice(**chart_config)
        db.session.add(chart)
        created_charts.append(chart)
    
    db.session.commit()
    logger.info(f"Created {len(charts)} default charts")
    return created_charts

def create_default_dashboards(charts):
    """Create default dashboards"""
    
    # Main dashboard
    main_dashboard = Dashboard(
        dashboard_title="GitThub Data Explorer",
        slug="gitthub-main",
        published=True,
        json_metadata=json.dumps({
            'timed_refresh_immune_slices': [],
            'expanded_slices': {},
            'refresh_frequency': 60,
            'default_filters': '{}',
            'color_scheme': 'gitthubTheme',
        }),
    )
    
    # Add charts to dashboard
    main_dashboard.slices = charts
    db.session.add(main_dashboard)
    
    # Data Bank dashboard
    databank_dashboard = Dashboard(
        dashboard_title="Data Bank Analytics",
        slug="databank-analytics",
        published=True,
        json_metadata=json.dumps({
            'filter_scopes': {},
            'expanded_slices': {},
            'refresh_frequency': 300,
        }),
    )
    db.session.add(databank_dashboard)
    
    # Course Analytics dashboard
    course_dashboard = Dashboard(
        dashboard_title="Course Performance",
        slug="course-performance",
        published=True,
    )
    db.session.add(course_dashboard)
    
    db.session.commit()
    logger.info("Created default dashboards")

def create_guest_role():
    """Create guest role for embedded dashboards"""
    
    # Find or create GitThubGuest role
    guest_role = security_manager.find_role("GitThubGuest")
    if not guest_role:
        guest_role = security_manager.add_role("GitThubGuest")
        
        # Add permissions for embedded viewing
        perms = [
            'can_read',
            'can_explore',
            'can_dashboard',
            'can_chart',
            'datasource_access',
        ]
        
        for perm in perms:
            permission = security_manager.find_permission_view_menu(perm, 'all_datasource_access')
            if permission:
                security_manager.add_permission_role(guest_role, permission)
        
        db.session.commit()
        logger.info("Created GitThubGuest role")

def initialize_superset():
    """Main initialization function"""
    
    with app.app_context():
        try:
            # Create database connections
            main_db, analytics_db = create_default_database_connections()
            
            # Create datasets
            create_default_datasets(main_db)
            
            # Create charts
            charts = create_default_charts(main_db)
            
            # Create dashboards
            create_default_dashboards(charts)
            
            # Create guest role
            create_guest_role()
            
            logger.info("Superset initialization completed successfully")
            
        except Exception as e:
            logger.error(f"Error during initialization: {str(e)}")
            db.session.rollback()
            raise

if __name__ == "__main__":
    initialize_superset()