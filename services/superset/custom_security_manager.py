# services/superset/custom_security_manager.py
"""
Custom Security Manager to integrate with GitThub's authentication
"""
import logging
import jwt
from datetime import datetime, timedelta
from flask import redirect, request, session
from flask_appbuilder.security.sqla.manager import SecurityManager
from superset.security import SupersetSecurityManager
from werkzeug.security import check_password_hash
import requests
import os

logger = logging.getLogger(__name__)

class GitThubSecurityManager(SupersetSecurityManager):
    """
    Custom security manager that integrates with GitThub's existing auth system
    """
    
    def __init__(self, appbuilder):
        super().__init__(appbuilder)
        self.gitthub_api_url = os.getenv('GITTHUB_API_URL', 'http://localhost:8001')
        self.jwt_secret = os.getenv('JWT_SECRET', 'your-jwt-secret')
    
    def validate_gitthub_token(self, token):
        """Validate token against GitThub's auth service"""
        try:
            # Decode JWT token
            payload = jwt.decode(
                token, 
                self.jwt_secret, 
                algorithms=['HS256']
            )
            
            # Verify with GitThub backend
            response = requests.post(
                f"{self.gitthub_api_url}/api/auth/verify",
                headers={'Authorization': f'Bearer {token}'}
            )
            
            if response.status_code == 200:
                return response.json()
            
        except jwt.ExpiredSignatureError:
            logger.warning("Expired JWT token")
        except jwt.InvalidTokenError:
            logger.warning("Invalid JWT token")
        except Exception as e:
            logger.error(f"Token validation error: {str(e)}")
        
        return None
    
    def get_user_by_gitthub_id(self, gitthub_user_id):
        """Get or create Superset user from GitThub user ID"""
        
        # Check if user exists
        user = self.find_user(username=f"gitthub_{gitthub_user_id}")
        
        if not user:
            # Fetch user details from GitThub API
            response = requests.get(
                f"{self.gitthub_api_url}/api/users/{gitthub_user_id}"
            )
            
            if response.status_code == 200:
                user_data = response.json()
                
                # Create user in Superset
                role = self.find_role("GitThubUser")
                if not role:
                    role = self.find_role("Gamma")  # Default role
                
                user = self.add_user(
                    username=f"gitthub_{gitthub_user_id}",
                    first_name=user_data.get('first_name', ''),
                    last_name=user_data.get('last_name', ''),
                    email=user_data.get('email'),
                    role=role,
                    password='oauth_user'  # Placeholder password
                )
        
        return user
    
    def login_user(self, user):
        """Custom login that syncs with GitThub session"""
        
        # Call parent login
        super().login_user(user)
        
        # Sync additional GitThub data
        session['gitthub_user_id'] = user.username.replace('gitthub_', '')
        session['is_gitthub_user'] = True
    
    def get_user_roles(self):
        """Get roles based on GitThub permissions"""
        
        roles = super().get_user_roles()
        
        # Check if user has admin access in GitThub
        if session.get('is_gitthub_user'):
            token = request.headers.get('Authorization', '').replace('Bearer ', '')
            user_data = self.validate_gitthub_token(token)
            
            if user_data and user_data.get('is_admin'):
                admin_role = self.find_role("Admin")
                if admin_role and admin_role not in roles:
                    roles.append(admin_role)
        
        return roles
    
    def create_custom_roles(self):
        """Create GitThub-specific roles"""
        
        roles_config = [
            {
                'name': 'GitThubUser',
                'permissions': [
                    'can_read',
                    'can_explore',
                    'can_dashboard',
                    'can_chart',
                    'can_sqllab',
                    'datasource_access',
                ]
            },
            {
                'name': 'GitThubDataScientist',
                'permissions': [
                    'can_read',
                    'can_write',
                    'can_explore',
                    'can_dashboard',
                    'can_chart',
                    'can_sqllab',
                    'can_csv_upload',
                    'datasource_access',
                    'database_access',
                ]
            },
            {
                'name': 'GitThubAdmin',
                'permissions': [
                    'all_datasource_access',
                    'all_database_access',
                    'can_grant_guest_token',
                    'can_create_dashboard',
                    'can_delete',
                    'can_export',
                    'can_import',
                ]
            }
        ]
        
        for role_config in roles_config:
            role = self.find_role(role_config['name'])
            if not role:
                role = self.add_role(role_config['name'])
                
                for perm_name in role_config['permissions']:
                    perm = self.find_permission_view_menu(
                        perm_name, 
                        'all_datasource_access'
                    )
                    if perm:
                        self.add_permission_role(role, perm)
        
        logger.info("Created custom GitThub roles")
    
    def sync_user_permissions(self, user):
        """Sync user permissions from GitThub backend"""
        
        try:
            response = requests.get(
                f"{self.gitthub_api_url}/api/users/{user.username}/permissions"
            )
            
            if response.status_code == 200:
                permissions = response.json()
                
                # Map GitThub permissions to Superset roles
                if permissions.get('can_upload_data'):
                    role = self.find_role('GitThubDataScientist')
                    if role and role not in user.roles:
                        user.roles.append(role)
                
                if permissions.get('is_course_creator'):
                    # Add specific dashboard creation permissions
                    pass
                
                self.get_session.commit()
                
        except Exception as e:
            logger.error(f"Error syncing permissions: {str(e)}")
    
    def guest_token_generator(self, user, resources, rls_rules):
        """Generate guest token for embedded dashboards"""
        
        payload = {
            'user': {
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            'resources': resources,
            'rls_rules': rls_rules,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(minutes=5),
        }
        
        token = jwt.encode(
            payload,
            self.appbuilder.app.config['GUEST_TOKEN_JWT_SECRET'],
            algorithm=self.appbuilder.app.config['GUEST_TOKEN_JWT_ALGO']
        )
        
        return token