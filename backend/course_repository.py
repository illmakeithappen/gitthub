"""
Course Storage Repository
Handles database operations for courses
"""
import json
import sqlite3
from typing import List, Optional, Dict
from datetime import datetime
from course_models import GeneratedCourse, CourseProgress


class CourseRepository:
    """Repository for course storage and retrieval"""
    
    def __init__(self, db_path: str = "data/courses.db"):
        # Ensure the data directory exists
        import os
        os.makedirs(os.path.dirname(db_path), exist_ok=True)
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize database tables"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Courses table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS courses (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                slug TEXT UNIQUE,
                description TEXT,
                level TEXT,
                duration TEXT,
                modules TEXT,  -- JSON
                prerequisites TEXT,  -- JSON
                learning_objectives TEXT,  -- JSON
                target_audience TEXT,
                learning_path TEXT,  -- JSON
                databank_resources TEXT,  -- JSON
                tags TEXT,  -- JSON
                language TEXT,
                status TEXT DEFAULT 'draft',
                access_type TEXT DEFAULT 'public',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_by TEXT,
                metadata TEXT  -- JSON
            )
        """)
        
        # Course enrollments table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS course_enrollments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_id TEXT REFERENCES courses(id),
                user_email TEXT,
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_accessed TIMESTAMP,
                progress TEXT,  -- JSON
                completion_status TEXT DEFAULT 'not_started',
                UNIQUE(course_id, user_email)
            )
        """)
        
        # Course resources junction table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS course_resources (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_id TEXT REFERENCES courses(id),
                resource_id INTEGER,
                resource_type TEXT,
                module_index INTEGER,
                ordering INTEGER
            )
        """)
        
        # Course ratings table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS course_ratings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_id TEXT REFERENCES courses(id),
                user_email TEXT,
                rating INTEGER CHECK(rating >= 1 AND rating <= 5),
                review TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(course_id, user_email)
            )
        """)
        
        conn.commit()
        conn.close()
    
    async def save_course(self, course: GeneratedCourse) -> str:
        """Save a generated course"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                INSERT OR REPLACE INTO courses (
                    id, title, slug, description, level, duration,
                    modules, prerequisites, learning_objectives,
                    target_audience, learning_path, databank_resources,
                    tags, language, status, access_type,
                    created_at, updated_at, created_by, metadata
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                course.course_id,
                course.title,
                course.slug,
                course.description,
                course.level.value,
                course.duration,
                json.dumps([m.dict() for m in course.modules]),
                json.dumps(course.prerequisites),
                json.dumps(course.learning_objectives),
                course.target_audience,
                json.dumps(course.learning_path.dict()),
                json.dumps(course.databank_resources),
                json.dumps(course.tags),
                course.language,
                course.status.value,
                course.access_type.value,
                course.created_at.isoformat(),
                course.updated_at.isoformat(),
                course.created_by,
                json.dumps(course.metadata)
            ))
            
            # Save resource associations
            for i, resource in enumerate(course.databank_resources):
                cursor.execute("""
                    INSERT INTO course_resources (course_id, resource_id, resource_type, module_index, ordering)
                    VALUES (?, ?, ?, ?, ?)
                """, (course.course_id, resource.get('id'), resource.get('type'), 0, i))
            
            conn.commit()
            return course.course_id
        finally:
            conn.close()
    
    async def get_course(self, course_id: str) -> Optional[Dict]:
        """Retrieve a course by ID"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            cursor.execute("SELECT * FROM courses WHERE id = ?", (course_id,))
            row = cursor.fetchone()
            
            if not row:
                return None
            
            course = dict(row)
            # Parse JSON fields
            course['modules'] = json.loads(course['modules'])
            course['prerequisites'] = json.loads(course['prerequisites'])
            course['learning_objectives'] = json.loads(course['learning_objectives'])
            course['learning_path'] = json.loads(course['learning_path'])
            course['databank_resources'] = json.loads(course['databank_resources'])
            course['tags'] = json.loads(course['tags'])
            course['metadata'] = json.loads(course['metadata'])
            
            return course
        finally:
            conn.close()
    
    async def list_courses(self, skip: int = 0, limit: int = 10, 
                          status: Optional[str] = None,
                          level: Optional[str] = None) -> List[Dict]:
        """List courses with pagination and filters"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            query = "SELECT * FROM courses WHERE 1=1"
            params = []
            
            if status:
                query += " AND status = ?"
                params.append(status)
            
            if level:
                query += " AND level = ?"
                params.append(level)
            
            query += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
            params.extend([limit, skip])
            
            cursor.execute(query, params)
            rows = cursor.fetchall()
            
            courses = []
            for row in rows:
                course = dict(row)
                # Parse JSON fields
                course['modules'] = json.loads(course['modules'])
                course['tags'] = json.loads(course['tags'])
                courses.append(course)
            
            return courses
        finally:
            conn.close()
    
    async def update_course_status(self, course_id: str, status: str) -> bool:
        """Update course status"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                UPDATE courses 
                SET status = ?, updated_at = ?
                WHERE id = ?
            """, (status, datetime.now().isoformat(), course_id))
            
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()
    
    async def enroll_user(self, course_id: str, user_email: str) -> bool:
        """Enroll a user in a course"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                INSERT OR IGNORE INTO course_enrollments (
                    course_id, user_email, enrolled_at, completion_status
                ) VALUES (?, ?, ?, ?)
            """, (course_id, user_email, datetime.now().isoformat(), 'not_started'))
            
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()
    
    async def get_user_progress(self, course_id: str, user_email: str) -> Optional[Dict]:
        """Get user's progress in a course"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                SELECT * FROM course_enrollments 
                WHERE course_id = ? AND user_email = ?
            """, (course_id, user_email))
            
            row = cursor.fetchone()
            if row:
                progress = dict(row)
                if progress['progress']:
                    progress['progress'] = json.loads(progress['progress'])
                return progress
            return None
        finally:
            conn.close()
    
    async def update_user_progress(self, course_id: str, user_email: str, 
                                 progress_data: Dict) -> bool:
        """Update user's course progress"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute("""
                UPDATE course_enrollments 
                SET progress = ?, last_accessed = ?, completion_status = ?
                WHERE course_id = ? AND user_email = ?
            """, (
                json.dumps(progress_data),
                datetime.now().isoformat(),
                progress_data.get('completion_status', 'in_progress'),
                course_id,
                user_email
            ))
            
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()
    
    async def search_courses(self, query: str, filters: Dict = None) -> List[Dict]:
        """Search courses by query and filters"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        try:
            search_query = """
                SELECT * FROM courses 
                WHERE (title LIKE ? OR description LIKE ? OR tags LIKE ?)
            """
            params = [f'%{query}%', f'%{query}%', f'%{query}%']
            
            if filters:
                if filters.get('level'):
                    search_query += " AND level = ?"
                    params.append(filters['level'])
                if filters.get('status'):
                    search_query += " AND status = ?"
                    params.append(filters['status'])
                if filters.get('language'):
                    search_query += " AND language = ?"
                    params.append(filters['language'])
            
            search_query += " ORDER BY created_at DESC"
            
            cursor.execute(search_query, params)
            rows = cursor.fetchall()
            
            courses = []
            for row in rows:
                course = dict(row)
                course['modules'] = json.loads(course['modules'])
                course['tags'] = json.loads(course['tags'])
                courses.append(course)
            
            return courses
        finally:
            conn.close()
