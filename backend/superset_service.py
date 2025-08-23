# backend/superset_service.py
"""
Service to integrate Superset with GitThub backend
"""
import os
import jwt
import requests
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import logging
from fastapi import HTTPException

logger = logging.getLogger(__name__)

class SupersetService:
    """Handle all Superset-related operations"""
    
    def __init__(self):
        self.superset_url = os.getenv('SUPERSET_URL', 'http://localhost:8088')
        self.guest_token_secret = os.getenv('SUPERSET_GUEST_TOKEN_SECRET', 'your-secret')
        self.admin_username = os.getenv('SUPERSET_ADMIN_USERNAME', 'admin')
        self.admin_password = os.getenv('SUPERSET_ADMIN_PASSWORD', 'admin')
        self._access_token = None
        self._token_expiry = None
    
    def _get_admin_token(self) -> str:
        """Get admin access token for Superset API"""
        
        # Check if we have a valid token
        if self._access_token and self._token_expiry and self._token_expiry > datetime.utcnow():
            return self._access_token
        
        # Login to get new token
        login_data = {
            'username': self.admin_username,
            'password': self.admin_password,
            'provider': 'db',
            'refresh': True,
        }
        
        response = requests.post(
            f"{self.superset_url}/api/v1/security/login",
            json=login_data
        )
        
        if response.status_code == 200:
            data = response.json()
            self._access_token = data['access_token']
            # Set expiry to 5 minutes before actual expiry
            self._token_expiry = datetime.utcnow() + timedelta(minutes=55)
            return self._access_token
        else:
            logger.error(f"Failed to get Superset admin token: {response.text}")
            raise HTTPException(status_code=500, detail="Failed to connect to Superset")
    
    def generate_guest_token(
        self, 
        user_id: str, 
        dashboard_id: Optional[int] = None,
        resources: Optional[List[Dict]] = None,
        rls_filters: Optional[List[Dict]] = None
    ) -> str:
        """Generate a guest token for embedded dashboards"""
        
        if not resources:
            resources = [
                {
                    'type': 'dashboard',
                    'id': dashboard_id or 'gitthub-main'
                }
            ]
        
        if not rls_filters:
            # Default row-level security based on user
            rls_filters = [
                {
                    'dataset': 1,  # Dataset ID
                    'clause': f"user_id = '{user_id}'"
                }
            ]
        
        payload = {
            'user': {
                'username': f'guest_{user_id}',
                'first_name': 'GitThub',
                'last_name': 'User',
            },
            'resources': resources,
            'rls': rls_filters,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(minutes=5),
        }
        
        token = jwt.encode(
            payload,
            self.guest_token_secret,
            algorithm='HS256'
        )
        
        return token
    
    def create_dashboard_for_dataset(
        self,
        dataset_id: str,
        dataset_name: str,
        user_id: str
    ) -> Dict:
        """Create a custom dashboard for a uploaded dataset"""
        
        token = self._get_admin_token()
        headers = {'Authorization': f'Bearer {token}'}
        
        # First, register the dataset in Superset
        dataset_payload = {
            'database': 1,  # GitThub main database ID
            'schema': 'public',
            'table_name': f'upload_{dataset_id}',
            'owners': [],
        }
        
        response = requests.post(
            f"{self.superset_url}/api/v1/dataset/",
            json=dataset_payload,
            headers=headers
        )
        
        if response.status_code not in [200, 201]:
            logger.error(f"Failed to create dataset: {response.text}")
            raise HTTPException(status_code=500, detail="Failed to create dataset in Superset")
        
        superset_dataset_id = response.json()['id']
        
        # Create automatic visualizations
        charts = self._create_auto_charts(superset_dataset_id, dataset_name, headers)
        
        # Create dashboard
        dashboard_payload = {
            'dashboard_title': f"{dataset_name} - Analysis",
            'slug': f"dataset-{dataset_id}",
            'published': True,
            'owners': [],
            'json_metadata': {
                'refresh_frequency': 0,
                'timed_refresh_immune_slices': [],
                'expanded_slices': {},
                'color_scheme': 'gitthubTheme',
                'label_colors': {},
                'shared_label_colors': {},
                'color_scheme_domain': [],
                'cross_filters_enabled': True,
            }
        }
        
        response = requests.post(
            f"{self.superset_url}/api/v1/dashboard/",
            json=dashboard_payload,
            headers=headers
        )
        
        if response.status_code not in [200, 201]:
            logger.error(f"Failed to create dashboard: {response.text}")
            raise HTTPException(status_code=500, detail="Failed to create dashboard")
        
        dashboard = response.json()
        
        # Add charts to dashboard
        self._add_charts_to_dashboard(dashboard['id'], charts, headers)
        
        return {
            'dashboard_id': dashboard['id'],
            'dashboard_url': f"{self.superset_url}/superset/dashboard/{dashboard['id']}/",
            'embed_id': dashboard['id'],
        }
    
    def _create_auto_charts(
        self,
        dataset_id: int,
        dataset_name: str,
        headers: Dict
    ) -> List[int]:
        """Create automatic visualizations for a dataset"""
        
        chart_ids = []
        
        # Get dataset info to understand columns
        response = requests.get(
            f"{self.superset_url}/api/v1/dataset/{dataset_id}",
            headers=headers
        )
        
        if response.status_code == 200:
            dataset_info = response.json()
            columns = dataset_info.get('columns', [])
            
            # Create different chart types based on column types
            numeric_cols = [col for col in columns if col['type'] in ['FLOAT', 'INTEGER', 'BIGINT']]
            temporal_cols = [col for col in columns if col['type'] in ['DATE', 'DATETIME', 'TIMESTAMP']]
            categorical_cols = [col for col in columns if col['type'] in ['VARCHAR', 'TEXT']]
            
            # 1. Create a table view
            table_chart = {
                'slice_name': f'{dataset_name} - Data Table',
                'viz_type': 'table',
                'datasource_id': dataset_id,
                'datasource_type': 'table',
                'params': {
                    'metrics': [],
                    'all_columns': [col['column_name'] for col in columns[:10]],  # First 10 columns
                    'row_limit': 1000,
                }
            }
            
            # 2. Create distribution chart for numeric columns
            if numeric_cols:
                for col in numeric_cols[:3]:  # First 3 numeric columns
                    hist_chart = {
                        'slice_name': f'{dataset_name} - {col["column_name"]} Distribution',
                        'viz_type': 'histogram',
                        'datasource_id': dataset_id,
                        'datasource_type': 'table',
                        'params': {
                            'all_columns_x': [col['column_name']],
                            'row_limit': 10000,
                        }
                    }
                    chart_ids.append(self._create_chart(hist_chart, headers))
            
            # 3. Create time series if temporal columns exist
            if temporal_cols and numeric_cols:
                time_chart = {
                    'slice_name': f'{dataset_name} - Time Series',
                    'viz_type': 'line',
                    'datasource_id': dataset_id,
                    'datasource_type': 'table',
                    'params': {
                        'metrics': [{'column': {'column_name': numeric_cols[0]['column_name']}, 'aggregate': 'AVG'}],
                        'time_range': 'No filter',
                        'granularity_sqla': temporal_cols[0]['column_name'],
                    }
                }
                chart_ids.append(self._create_chart(time_chart, headers))
            
            # 4. Create categorical distribution
            if categorical_cols:
                cat_chart = {
                    'slice_name': f'{dataset_name} - Category Distribution',
                    'viz_type': 'pie',
                    'datasource_id': dataset_id,
                    'datasource_type': 'table',
                    'params': {
                        'metric': {'aggregate': 'COUNT', 'column': {'column_name': categorical_cols[0]['column_name']}},
                        'groupby': [categorical_cols[0]['column_name']],
                        'row_limit': 10,
                    }
                }
                chart_ids.append(self._create_chart(cat_chart, headers))
            
            # Add the table chart
            chart_ids.append(self._create_chart(table_chart, headers))
        
        return chart_ids
    
    def _create_chart(self, chart_config: Dict, headers: Dict) -> int:
        """Create a single chart in Superset"""
        
        response = requests.post(
            f"{self.superset_url}/api/v1/chart/",
            json=chart_config,
            headers=headers
        )
        
        if response.status_code in [200, 201]:
            return response.json()['id']
        else:
            logger.warning(f"Failed to create chart: {response.text}")
            return None
    
    def _add_charts_to_dashboard(
        self,
        dashboard_id: int,
        chart_ids: List[int],
        headers: Dict
    ):
        """Add charts to a dashboard with layout"""
        
        # Get current dashboard configuration
        response = requests.get(
            f"{self.superset_url}/api/v1/dashboard/{dashboard_id}",
            headers=headers
        )
        
        if response.status_code == 200:
            dashboard = response.json()
            
            # Create position JSON for charts
            positions = {}
            row = 0
            col = 0
            
            for i, chart_id in enumerate(chart_ids):
                if chart_id:
                    positions[f"CHART-{chart_id}"] = {
                        'type': 'CHART',
                        'id': f"CHART-{chart_id}",
                        'children': [],
                        'meta': {
                            'width': 4,
                            'height': 50,
                            'chartId': chart_id,
                        }
                    }
                    
                    col += 4
                    if col >= 12:
                        col = 0
                        row += 50
            
            # Update dashboard with charts
            update_payload = {
                'json_metadata': {
                    **dashboard.get('json_metadata', {}),
                    'positions': positions,
                },
                'slug': dashboard['slug'],
                'dashboard_title': dashboard['dashboard_title'],
            }
            
            response = requests.put(
                f"{self.superset_url}/api/v1/dashboard/{dashboard_id}",
                json=update_payload,
                headers=headers
            )
            
            if response.status_code != 200:
                logger.warning(f"Failed to add charts to dashboard: {response.text}")
    
    def get_user_dashboards(self, user_id: str) -> List[Dict]:
        """Get all dashboards accessible by a user"""
        
        token = self._get_admin_token()
        headers = {'Authorization': f'Bearer {token}'}
        
        # Get dashboards
        response = requests.get(
            f"{self.superset_url}/api/v1/dashboard/",
            headers=headers,
            params={
                'q': f'(filters:!((col:owners,opr:rel_m_m,value:{user_id})))',
                'page_size': 100,
            }
        )
        
        if response.status_code == 200:
            dashboards = response.json().get('result', [])
            return [
                {
                    'id': d['id'],
                    'title': d['dashboard_title'],
                    'url': f"{self.superset_url}/superset/dashboard/{d['id']}/",
                    'slug': d['slug'],
                    'published': d.get('published', False),
                }
                for d in dashboards
            ]
        else:
            logger.error(f"Failed to get dashboards: {response.text}")
            return []
    
    def execute_sql_query(
        self,
        query: str,
        database_id: int = 1,
        schema: str = 'public',
        user_id: Optional[str] = None
    ) -> Dict:
        """Execute SQL query through Superset's SQL Lab"""
        
        token = self._get_admin_token()
        headers = {'Authorization': f'Bearer {token}'}
        
        # Add row-level security if user_id provided
        if user_id:
            query = f"""
            WITH user_filtered AS (
                SELECT * FROM ({query}) AS base_query
                WHERE user_id = '{user_id}'
            )
            SELECT * FROM user_filtered
            """
        
        payload = {
            'database_id': database_id,
            'sql': query,
            'schema': schema,
            'runAsync': False,
            'expand_data': True,
        }
        
        response = requests.post(
            f"{self.superset_url}/api/v1/sqllab/execute/",
            json=payload,
            headers=headers
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Failed to execute query: {response.text}")
            raise HTTPException(status_code=400, detail="Query execution failed")
    
    def create_data_alert(
        self,
        name: str,
        sql: str,
        user_email: str,
        schedule: str = "0 9 * * *"  # Default: daily at 9 AM
    ) -> Dict:
        """Create a data alert in Superset"""
        
        token = self._get_admin_token()
        headers = {'Authorization': f'Bearer {token}'}
        
        payload = {
            'name': name,
            'type': 'Alert',
            'database': 1,
            'sql': sql,
            'crontab': schedule,
            'recipients': [
                {
                    'type': 'email',
                    'recipient_config_json': {'target': user_email}
                }
            ],
            'grace_period': 14400,  # 4 hours
            'working_timeout': 3600,  # 1 hour
        }
        
        response = requests.post(
            f"{self.superset_url}/api/v1/report/",
            json=payload,
            headers=headers
        )
        
        if response.status_code in [200, 201]:
            return response.json()
        else:
            logger.error(f"Failed to create alert: {response.text}")
            raise HTTPException(status_code=500, detail="Failed to create alert")

# Singleton instance
superset_service = SupersetService()