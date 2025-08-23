"""
Session Manager for Multi-User Support
Handles individual user sessions for course generation
"""
import uuid
import json
import os
from datetime import datetime, timedelta
from typing import Dict, Optional, Any
import hashlib
import secrets


class SessionManager:
    """Manage user sessions for the course generator"""
    
    def __init__(self, session_timeout_hours: int = 24):
        self.sessions = {}  # In-memory storage (use Redis in production)
        self.session_timeout = timedelta(hours=session_timeout_hours)
        self.api_keys_file = "data/user_api_keys.json"
        self._load_persisted_keys()
    
    def _load_persisted_keys(self):
        """Load persisted API keys from file"""
        if os.path.exists(self.api_keys_file):
            try:
                with open(self.api_keys_file, 'r') as f:
                    self.persisted_keys = json.load(f)
            except:
                self.persisted_keys = {}
        else:
            self.persisted_keys = {}
            os.makedirs(os.path.dirname(self.api_keys_file), exist_ok=True)
    
    def _save_persisted_keys(self):
        """Save API keys to file (encrypted in production)"""
        try:
            with open(self.api_keys_file, 'w') as f:
                json.dump(self.persisted_keys, f)
        except:
            pass
    
    def create_session(self, user_identifier: Optional[str] = None) -> str:
        """Create a new user session"""
        session_id = str(uuid.uuid4())
        
        # Generate a user ID if not provided
        if not user_identifier:
            user_identifier = f"user_{uuid.uuid4().hex[:8]}"
        
        self.sessions[session_id] = {
            "session_id": session_id,
            "user_id": user_identifier,
            "created_at": datetime.now().isoformat(),
            "last_accessed": datetime.now().isoformat(),
            "api_credentials": {
                "openai": "",
                "anthropic": "",
                "google": ""
            },
            "preferences": {
                "default_model": "template",
                "default_language": "english",
                "default_level": "beginner"
            },
            "courses_generated": [],
            "resources_selected": [],
            "generation_count": 0,
            "rate_limit_remaining": 50  # Daily limit per session
        }
        
        # Load persisted API keys if user has them
        if user_identifier in self.persisted_keys:
            self.sessions[session_id]["api_credentials"] = self.persisted_keys[user_identifier].copy()
        
        return session_id
    
    def get_session(self, session_id: str) -> Optional[Dict]:
        """Get session data"""
        if session_id not in self.sessions:
            return None
        
        session = self.sessions[session_id]
        
        # Check if session is expired
        last_accessed = datetime.fromisoformat(session["last_accessed"])
        if datetime.now() - last_accessed > self.session_timeout:
            del self.sessions[session_id]
            return None
        
        # Update last accessed time
        session["last_accessed"] = datetime.now().isoformat()
        return session
    
    def update_session(self, session_id: str, data: Dict) -> bool:
        """Update session data"""
        if session_id not in self.sessions:
            return False
        
        session = self.sessions[session_id]
        session.update(data)
        session["last_accessed"] = datetime.now().isoformat()
        return True
    
    def update_api_credentials(self, session_id: str, credentials: Dict[str, str]) -> bool:
        """Update API credentials for a session"""
        session = self.get_session(session_id)
        if not session:
            return False
        
        # Update session credentials
        for key, value in credentials.items():
            if key in session["api_credentials"] and value:
                session["api_credentials"][key] = value
        
        # Persist for this user (optional)
        user_id = session["user_id"]
        if user_id not in self.persisted_keys:
            self.persisted_keys[user_id] = {}
        self.persisted_keys[user_id].update(session["api_credentials"])
        self._save_persisted_keys()
        
        return True
    
    def get_api_credentials(self, session_id: str) -> Dict[str, str]:
        """Get API credentials for a session"""
        session = self.get_session(session_id)
        if not session:
            return {"openai": "", "anthropic": "", "google": ""}
        return session["api_credentials"]
    
    def track_course_generation(self, session_id: str, course_id: str, course_data: Dict) -> bool:
        """Track course generation for rate limiting and history"""
        session = self.get_session(session_id)
        if not session:
            return False
        
        # Check rate limit
        if session["rate_limit_remaining"] <= 0:
            # Reset if it's a new day
            created_date = datetime.fromisoformat(session["created_at"]).date()
            if datetime.now().date() > created_date:
                session["rate_limit_remaining"] = 50
            else:
                return False  # Rate limit exceeded
        
        # Track the generation
        session["courses_generated"].append({
            "course_id": course_id,
            "title": course_data.get("title", ""),
            "topic": course_data.get("topic", ""),
            "model_used": course_data.get("ai_model", "template"),
            "generated_at": datetime.now().isoformat()
        })
        
        session["generation_count"] += 1
        session["rate_limit_remaining"] -= 1
        
        return True
    
    def get_user_courses(self, session_id: str) -> list:
        """Get list of courses generated by this user"""
        session = self.get_session(session_id)
        if not session:
            return []
        return session["courses_generated"]
    
    def cleanup_expired_sessions(self):
        """Remove expired sessions"""
        current_time = datetime.now()
        expired_sessions = []
        
        for session_id, session in self.sessions.items():
            last_accessed = datetime.fromisoformat(session["last_accessed"])
            if current_time - last_accessed > self.session_timeout:
                expired_sessions.append(session_id)
        
        for session_id in expired_sessions:
            del self.sessions[session_id]
        
        return len(expired_sessions)


class UserCourseRepository:
    """Repository for user-specific course storage"""
    
    def __init__(self, db_path: str = "data/user_courses.db"):
        import sqlite3
        self.db_path = db_path
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        self.init_database()
    
    def init_database(self):
        """Initialize user courses database"""
        import sqlite3
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # User courses table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_courses (
                id TEXT PRIMARY KEY,
                session_id TEXT NOT NULL,
                user_id TEXT NOT NULL,
                course_data TEXT NOT NULL,  -- JSON
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_public BOOLEAN DEFAULT FALSE,
                share_token TEXT UNIQUE,
                view_count INTEGER DEFAULT 0
            )
        """)
        
        # Create indices
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_session_id ON user_courses(session_id)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_user_id ON user_courses(user_id)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_share_token ON user_courses(share_token)")
        
        conn.commit()
        conn.close()
    
    def save_user_course(self, session_id: str, user_id: str, course_id: str, course_data: Dict) -> str:
        """Save a course for a specific user"""
        import sqlite3
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            # Generate share token
            share_token = secrets.token_urlsafe(16)
            
            cursor.execute("""
                INSERT INTO user_courses (id, session_id, user_id, course_data, share_token)
                VALUES (?, ?, ?, ?, ?)
            """, (course_id, session_id, user_id, json.dumps(course_data), share_token))
            
            conn.commit()
            return share_token
        finally:
            conn.close()
    
    def get_user_courses(self, user_id: str, limit: int = 20) -> list:
        """Get courses for a specific user"""
        import sqlite3
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                SELECT id, course_data, created_at, is_public, share_token, view_count
                FROM user_courses
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT ?
            """, (user_id, limit))
            
            courses = []
            for row in cursor.fetchall():
                course = dict(row)
                course['course_data'] = json.loads(course['course_data'])
                courses.append(course)
            
            return courses
        finally:
            conn.close()
    
    def get_course_by_share_token(self, share_token: str) -> Optional[Dict]:
        """Get a course by its share token"""
        import sqlite3
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                SELECT * FROM user_courses WHERE share_token = ?
            """, (share_token,))
            
            row = cursor.fetchone()
            if row:
                course = dict(row)
                course['course_data'] = json.loads(course['course_data'])
                
                # Increment view count
                cursor.execute("""
                    UPDATE user_courses SET view_count = view_count + 1
                    WHERE share_token = ?
                """, (share_token,))
                conn.commit()
                
                return course
            return None
        finally:
            conn.close()
