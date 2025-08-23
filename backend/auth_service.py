"""
User Authentication System
Handles user registration, login, and account management
"""
import hashlib
import secrets
import sqlite3
import json
import os
from datetime import datetime, timedelta
from typing import Dict, Optional, Any
import jwt
from pydantic import BaseModel, EmailStr, Field


# Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", secrets.token_urlsafe(32))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24


class UserRegistration(BaseModel):
    """User registration model"""
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str
    organization: Optional[str] = None


class UserLogin(BaseModel):
    """User login model"""
    email: EmailStr
    password: str


class UserProfile(BaseModel):
    """User profile model"""
    user_id: str
    email: str
    full_name: str
    organization: Optional[str]
    created_at: str
    courses_created: int
    api_keys_configured: Dict[str, bool]
    subscription_tier: str = "free"
    daily_limit: int = 10
    monthly_limit: int = 100


class UserAuthService:
    """Service for user authentication and management"""
    
    def __init__(self, db_path: str = "data/users.db"):
        self.db_path = db_path
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        self.init_database()
    
    def init_database(self):
        """Initialize user database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                full_name TEXT NOT NULL,
                organization TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                subscription_tier TEXT DEFAULT 'free',
                daily_limit INTEGER DEFAULT 10,
                monthly_limit INTEGER DEFAULT 100,
                courses_created INTEGER DEFAULT 0,
                metadata TEXT
            )
        """)
        
        # User API keys table (encrypted in production)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_api_keys (
                user_id TEXT PRIMARY KEY REFERENCES users(user_id),
                openai_key TEXT,
                anthropic_key TEXT,
                google_key TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # User sessions table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_sessions (
                session_id TEXT PRIMARY KEY,
                user_id TEXT REFERENCES users(user_id),
                token TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                ip_address TEXT,
                user_agent TEXT
            )
        """)
        
        # User courses table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_courses (
                course_id TEXT PRIMARY KEY,
                user_id TEXT REFERENCES users(user_id),
                course_data TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_public BOOLEAN DEFAULT FALSE,
                share_token TEXT UNIQUE,
                view_count INTEGER DEFAULT 0,
                title TEXT,
                topic TEXT,
                model_used TEXT
            )
        """)
        
        # Create indices
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_user_email ON users(email)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_session_user ON user_sessions(user_id)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_course_user ON user_courses(user_id)")
        
        conn.commit()
        conn.close()
    
    def hash_password(self, password: str) -> str:
        """Hash password using SHA256"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def verify_password(self, password: str, password_hash: str) -> bool:
        """Verify password against hash"""
        return self.hash_password(password) == password_hash
    
    def generate_user_id(self) -> str:
        """Generate unique user ID"""
        return f"user_{secrets.token_urlsafe(8)}"
    
    def create_access_token(self, user_id: str, email: str) -> str:
        """Create JWT access token"""
        expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
        to_encode = {
            "user_id": user_id,
            "email": email,
            "exp": expire
        }
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    def verify_token(self, token: str) -> Optional[Dict]:
        """Verify JWT token"""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except jwt.PyJWTError:
            return None
    
    def register_user(self, registration: UserRegistration) -> Dict:
        """Register a new user"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            # Check if email already exists
            cursor.execute("SELECT user_id FROM users WHERE email = ?", (registration.email,))
            if cursor.fetchone():
                return {"success": False, "message": "Email already registered"}
            
            # Create new user
            user_id = self.generate_user_id()
            password_hash = self.hash_password(registration.password)
            
            cursor.execute("""
                INSERT INTO users (
                    user_id, email, password_hash, full_name, 
                    organization, created_at
                ) VALUES (?, ?, ?, ?, ?, ?)
            """, (
                user_id, 
                registration.email, 
                password_hash,
                registration.full_name,
                registration.organization,
                datetime.now().isoformat()
            ))
            
            # Initialize empty API keys
            cursor.execute("""
                INSERT INTO user_api_keys (user_id) VALUES (?)
            """, (user_id,))
            
            conn.commit()
            
            # Create access token
            token = self.create_access_token(user_id, registration.email)
            
            return {
                "success": True,
                "message": "Registration successful",
                "user_id": user_id,
                "token": token,
                "user": {
                    "user_id": user_id,
                    "email": registration.email,
                    "full_name": registration.full_name,
                    "subscription_tier": "free"
                }
            }
            
        except Exception as e:
            return {"success": False, "message": str(e)}
        finally:
            conn.close()
    
    def login_user(self, login: UserLogin) -> Dict:
        """Authenticate user and create session"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            # Get user by email
            cursor.execute("""
                SELECT user_id, email, password_hash, full_name, organization,
                       subscription_tier, daily_limit, monthly_limit, courses_created
                FROM users 
                WHERE email = ? AND is_active = TRUE
            """, (login.email,))
            
            user = cursor.fetchone()
            if not user:
                return {"success": False, "message": "Invalid email or password"}
            
            # Verify password
            if not self.verify_password(login.password, user['password_hash']):
                return {"success": False, "message": "Invalid email or password"}
            
            user_dict = dict(user)
            
            # Update last login
            cursor.execute("""
                UPDATE users SET last_login = ? WHERE user_id = ?
            """, (datetime.now().isoformat(), user_dict['user_id']))
            
            # Create session token
            token = self.create_access_token(user_dict['user_id'], user_dict['email'])
            
            # Store session
            session_id = secrets.token_urlsafe(16)
            expires_at = datetime.now() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
            
            cursor.execute("""
                INSERT INTO user_sessions (
                    session_id, user_id, token, expires_at
                ) VALUES (?, ?, ?, ?)
            """, (session_id, user_dict['user_id'], token, expires_at.isoformat()))
            
            conn.commit()
            
            # Get API keys status
            cursor.execute("""
                SELECT openai_key, anthropic_key, google_key 
                FROM user_api_keys WHERE user_id = ?
            """, (user_dict['user_id'],))
            
            api_keys = cursor.fetchone()
            api_status = {
                "openai": bool(api_keys['openai_key']) if api_keys else False,
                "anthropic": bool(api_keys['anthropic_key']) if api_keys else False,
                "google": bool(api_keys['google_key']) if api_keys else False
            }
            
            return {
                "success": True,
                "message": "Login successful",
                "token": token,
                "session_id": session_id,
                "user": {
                    "user_id": user_dict['user_id'],
                    "email": user_dict['email'],
                    "full_name": user_dict['full_name'],
                    "organization": user_dict['organization'],
                    "subscription_tier": user_dict['subscription_tier'],
                    "daily_limit": user_dict['daily_limit'],
                    "monthly_limit": user_dict['monthly_limit'],
                    "courses_created": user_dict['courses_created'],
                    "api_keys_configured": api_status
                }
            }
            
        except Exception as e:
            return {"success": False, "message": str(e)}
        finally:
            conn.close()
    
    def get_user_by_token(self, token: str) -> Optional[Dict]:
        """Get user information from token"""
        payload = self.verify_token(token)
        if not payload:
            return None
        
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                SELECT u.*, 
                       (SELECT COUNT(*) FROM user_courses WHERE user_id = u.user_id) as total_courses
                FROM users u
                WHERE u.user_id = ? AND u.is_active = TRUE
            """, (payload['user_id'],))
            
            user = cursor.fetchone()
            if user:
                return dict(user)
            return None
            
        finally:
            conn.close()
    
    def update_user_api_keys(self, user_id: str, api_keys: Dict[str, str]) -> bool:
        """Update user's API keys"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            # Update API keys
            cursor.execute("""
                UPDATE user_api_keys 
                SET openai_key = COALESCE(?, openai_key),
                    anthropic_key = COALESCE(?, anthropic_key),
                    google_key = COALESCE(?, google_key),
                    updated_at = ?
                WHERE user_id = ?
            """, (
                api_keys.get('openai'),
                api_keys.get('anthropic'),
                api_keys.get('google'),
                datetime.now().isoformat(),
                user_id
            ))
            
            conn.commit()
            return cursor.rowcount > 0
            
        finally:
            conn.close()
    
    def get_user_api_keys(self, user_id: str) -> Dict[str, str]:
        """Get user's API keys"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                SELECT openai_key, anthropic_key, google_key 
                FROM user_api_keys WHERE user_id = ?
            """, (user_id,))
            
            keys = cursor.fetchone()
            if keys:
                return {
                    "openai": keys['openai_key'] or "",
                    "anthropic": keys['anthropic_key'] or "",
                    "google": keys['google_key'] or ""
                }
            return {"openai": "", "anthropic": "", "google": ""}
            
        finally:
            conn.close()
    
    def save_user_course(self, user_id: str, course_id: str, course_data: Dict) -> str:
        """Save a course for a user"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            share_token = secrets.token_urlsafe(16)
            
            cursor.execute("""
                INSERT INTO user_courses (
                    course_id, user_id, course_data, share_token,
                    title, topic, model_used
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                course_id, 
                user_id, 
                json.dumps(course_data),
                share_token,
                course_data.get('title', ''),
                course_data.get('topic', ''),
                course_data.get('ai_model', 'template')
            ))
            
            # Update user's course count
            cursor.execute("""
                UPDATE users SET courses_created = courses_created + 1
                WHERE user_id = ?
            """, (user_id,))
            
            conn.commit()
            return share_token
            
        finally:
            conn.close()
    
    def get_user_courses(self, user_id: str, limit: int = 20) -> list:
        """Get courses created by a user"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                SELECT course_id, title, topic, model_used, created_at, 
                       share_token, view_count, is_public
                FROM user_courses
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT ?
            """, (user_id, limit))
            
            courses = []
            for row in cursor.fetchall():
                course = dict(row)
                courses.append(course)
            
            return courses
            
        finally:
            conn.close()
    
    def logout_user(self, session_id: str) -> bool:
        """Logout user by invalidating session"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                DELETE FROM user_sessions WHERE session_id = ?
            """, (session_id,))
            
            conn.commit()
            return cursor.rowcount > 0
            
        finally:
            conn.close()
