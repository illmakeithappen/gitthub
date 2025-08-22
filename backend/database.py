import sqlite3
import json
import os
from typing import List, Optional, Dict, Any
from datetime import datetime
from contextlib import contextmanager
import uuid

# Database configuration
DB_PATH = os.environ.get("DB_PATH", "data/databank.db")

def init_database():
    """Initialize the database with required tables"""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Create data_resources table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS data_resources (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                format TEXT NOT NULL,
                category TEXT NOT NULL,
                workflow_categories TEXT,  -- JSON array
                tags TEXT,  -- JSON array
                file_url TEXT,
                file_path TEXT,
                file_size INTEGER,
                metadata TEXT,  -- JSON
                created_at TIMESTAMP,
                updated_at TIMESTAMP,
                author TEXT,
                access_count INTEGER DEFAULT 0,
                is_public BOOLEAN DEFAULT 1,
                preview_data TEXT  -- JSON
            )
        """)
        
        # Create educational_experiences table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS educational_experiences (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                difficulty_level TEXT,
                estimated_time TEXT,
                workflow_category TEXT,
                learning_objectives TEXT,  -- JSON array
                prerequisites TEXT,  -- JSON array
                resources TEXT,  -- JSON array of resource IDs
                steps TEXT,  -- JSON array
                code_snippets TEXT,  -- JSON array
                quiz_questions TEXT,  -- JSON array
                created_at TIMESTAMP,
                updated_at TIMESTAMP,
                completion_count INTEGER DEFAULT 0,
                rating REAL
            )
        """)
        
        # Create user_progress table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_progress (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                experience_id TEXT NOT NULL,
                progress_percentage REAL,
                completed_steps TEXT,  -- JSON array
                quiz_scores TEXT,  -- JSON object
                started_at TIMESTAMP,
                last_accessed TIMESTAMP,
                completed BOOLEAN DEFAULT 0,
                completion_date TIMESTAMP,
                UNIQUE(user_id, experience_id)
            )
        """)
        
        # Create indexes for better query performance
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_resources_format ON data_resources(format)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_resources_category ON data_resources(category)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_experiences_workflow ON educational_experiences(workflow_category)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id)")
        
        conn.commit()

@contextmanager
def get_db():
    """Get database connection context manager"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

class DataBankRepository:
    """Repository for data bank operations"""
    
    @staticmethod
    def create_resource(resource: Dict[str, Any]) -> str:
        """Create a new data resource"""
        resource_id = str(uuid.uuid4())
        resource['id'] = resource_id
        
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO data_resources (
                    id, title, description, format, category, workflow_categories,
                    tags, file_url, file_path, file_size, metadata, created_at,
                    updated_at, author, access_count, is_public, preview_data
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                resource_id,
                resource.get('title'),
                resource.get('description'),
                resource.get('format'),
                resource.get('category'),
                json.dumps(resource.get('workflow_categories', [])),
                json.dumps(resource.get('tags', [])),
                resource.get('file_url'),
                resource.get('file_path'),
                resource.get('file_size'),
                json.dumps(resource.get('metadata', {})),
                resource.get('created_at', datetime.now().isoformat()),
                resource.get('updated_at', datetime.now().isoformat()),
                resource.get('author', 'gitthub'),
                resource.get('access_count', 0),
                resource.get('is_public', True),
                json.dumps(resource.get('preview_data')) if resource.get('preview_data') else None
            ))
            conn.commit()
        
        return resource_id
    
    @staticmethod
    def get_resource(resource_id: str) -> Optional[Dict[str, Any]]:
        """Get a resource by ID"""
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM data_resources WHERE id = ?", (resource_id,))
            row = cursor.fetchone()
            
            if row:
                # Increment access count
                cursor.execute(
                    "UPDATE data_resources SET access_count = access_count + 1 WHERE id = ?",
                    (resource_id,)
                )
                conn.commit()
                
                return DataBankRepository._row_to_resource(row)
        return None
    
    @staticmethod
    def search_resources(
        query: Optional[str] = None,
        format: Optional[str] = None,
        category: Optional[str] = None,
        workflow_categories: Optional[List[str]] = None,
        tags: Optional[List[str]] = None,
        limit: int = 20,
        offset: int = 0
    ) -> List[Dict[str, Any]]:
        """Search resources with filters"""
        with get_db() as conn:
            cursor = conn.cursor()
            
            conditions = ["is_public = 1"]
            params = []
            
            if query:
                conditions.append("(title LIKE ? OR description LIKE ?)")
                params.extend([f"%{query}%", f"%{query}%"])
            
            if format:
                conditions.append("format = ?")
                params.append(format)
            
            if category:
                conditions.append("category = ?")
                params.append(category)
            
            where_clause = " AND ".join(conditions) if conditions else "1=1"
            
            cursor.execute(f"""
                SELECT * FROM data_resources
                WHERE {where_clause}
                ORDER BY created_at DESC
                LIMIT ? OFFSET ?
            """, params + [limit, offset])
            
            resources = []
            for row in cursor.fetchall():
                resource = DataBankRepository._row_to_resource(row)
                
                # Filter by workflow categories and tags if specified
                if workflow_categories:
                    resource_workflows = resource.get('workflow_categories', [])
                    if not any(wf in resource_workflows for wf in workflow_categories):
                        continue
                
                if tags:
                    resource_tags = resource.get('tags', [])
                    if not any(tag in resource_tags for tag in tags):
                        continue
                
                resources.append(resource)
            
            return resources[:limit]
    
    @staticmethod
    def create_experience(experience: Dict[str, Any]) -> str:
        """Create a new educational experience"""
        experience_id = str(uuid.uuid4())
        experience['id'] = experience_id
        
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO educational_experiences (
                    id, title, description, difficulty_level, estimated_time,
                    workflow_category, learning_objectives, prerequisites,
                    resources, steps, code_snippets, quiz_questions,
                    created_at, updated_at, completion_count, rating
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                experience_id,
                experience.get('title'),
                experience.get('description'),
                experience.get('difficulty_level'),
                experience.get('estimated_time'),
                experience.get('workflow_category'),
                json.dumps(experience.get('learning_objectives', [])),
                json.dumps(experience.get('prerequisites', [])),
                json.dumps(experience.get('resources', [])),
                json.dumps(experience.get('steps', [])),
                json.dumps(experience.get('code_snippets', [])),
                json.dumps(experience.get('quiz_questions', [])),
                experience.get('created_at', datetime.now().isoformat()),
                experience.get('updated_at', datetime.now().isoformat()),
                experience.get('completion_count', 0),
                experience.get('rating')
            ))
            conn.commit()
        
        return experience_id
    
    @staticmethod
    def get_experience(experience_id: str) -> Optional[Dict[str, Any]]:
        """Get an educational experience by ID"""
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM educational_experiences WHERE id = ?", (experience_id,))
            row = cursor.fetchone()
            
            if row:
                return DataBankRepository._row_to_experience(row)
        return None
    
    @staticmethod
    def get_stats() -> Dict[str, Any]:
        """Get data bank statistics"""
        with get_db() as conn:
            cursor = conn.cursor()
            
            # Total counts
            cursor.execute("SELECT COUNT(*) FROM data_resources WHERE is_public = 1")
            total_resources = cursor.fetchone()[0]
            
            cursor.execute("SELECT COUNT(*) FROM educational_experiences")
            total_experiences = cursor.fetchone()[0]
            
            # Resources by format
            cursor.execute("""
                SELECT format, COUNT(*) as count
                FROM data_resources
                WHERE is_public = 1
                GROUP BY format
            """)
            resources_by_format = {row[0]: row[1] for row in cursor.fetchall()}
            
            # Resources by category
            cursor.execute("""
                SELECT category, COUNT(*) as count
                FROM data_resources
                WHERE is_public = 1
                GROUP BY category
            """)
            resources_by_category = {row[0]: row[1] for row in cursor.fetchall()}
            
            # Recent uploads
            cursor.execute("""
                SELECT * FROM data_resources
                WHERE is_public = 1
                ORDER BY created_at DESC
                LIMIT 5
            """)
            recent_uploads = [DataBankRepository._row_to_resource(row) for row in cursor.fetchall()]
            
            # Popular experiences
            cursor.execute("""
                SELECT * FROM educational_experiences
                ORDER BY completion_count DESC, rating DESC
                LIMIT 5
            """)
            popular_experiences = [DataBankRepository._row_to_experience(row) for row in cursor.fetchall()]
            
            return {
                'total_resources': total_resources,
                'total_experiences': total_experiences,
                'resources_by_format': resources_by_format,
                'resources_by_category': resources_by_category,
                'recent_uploads': recent_uploads,
                'popular_experiences': popular_experiences
            }
    
    @staticmethod
    def _row_to_resource(row) -> Dict[str, Any]:
        """Convert database row to resource dictionary"""
        return {
            'id': row['id'],
            'title': row['title'],
            'description': row['description'],
            'format': row['format'],
            'category': row['category'],
            'workflow_categories': json.loads(row['workflow_categories']) if row['workflow_categories'] else [],
            'tags': json.loads(row['tags']) if row['tags'] else [],
            'file_url': row['file_url'],
            'file_path': row['file_path'],
            'file_size': row['file_size'],
            'metadata': json.loads(row['metadata']) if row['metadata'] else {},
            'created_at': row['created_at'],
            'updated_at': row['updated_at'],
            'author': row['author'],
            'access_count': row['access_count'],
            'is_public': bool(row['is_public']),
            'preview_data': json.loads(row['preview_data']) if row['preview_data'] else None
        }
    
    @staticmethod
    def _row_to_experience(row) -> Dict[str, Any]:
        """Convert database row to experience dictionary"""
        return {
            'id': row['id'],
            'title': row['title'],
            'description': row['description'],
            'difficulty_level': row['difficulty_level'],
            'estimated_time': row['estimated_time'],
            'workflow_category': row['workflow_category'],
            'learning_objectives': json.loads(row['learning_objectives']) if row['learning_objectives'] else [],
            'prerequisites': json.loads(row['prerequisites']) if row['prerequisites'] else [],
            'resources': json.loads(row['resources']) if row['resources'] else [],
            'steps': json.loads(row['steps']) if row['steps'] else [],
            'code_snippets': json.loads(row['code_snippets']) if row['code_snippets'] else [],
            'quiz_questions': json.loads(row['quiz_questions']) if row['quiz_questions'] else [],
            'created_at': row['created_at'],
            'updated_at': row['updated_at'],
            'completion_count': row['completion_count'],
            'rating': row['rating']
        }

# Initialize database on module import
init_database()