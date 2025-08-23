"""
AWS RDS PostgreSQL Database Configuration
Uses Amazon RDS for production database and SQLite for local development
"""
import os
from typing import Optional, Dict, Any, List
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, Text, DateTime, Boolean, Float, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import NullPool
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Determine environment - Force local development mode
IS_PRODUCTION = False  # Temporarily disabled for local development
# IS_PRODUCTION = os.getenv("RENDER") is not None or os.getenv("AWS_RDS_ENDPOINT") is not None

# Database configuration
if IS_PRODUCTION:
    # Use AWS RDS PostgreSQL in production
    RDS_ENDPOINT = os.getenv("AWS_RDS_ENDPOINT")
    RDS_PORT = os.getenv("AWS_RDS_PORT", "5432")
    RDS_DB_NAME = os.getenv("AWS_RDS_DB_NAME", "gitthub")
    RDS_USERNAME = os.getenv("AWS_RDS_USERNAME")
    RDS_PASSWORD = os.getenv("AWS_RDS_PASSWORD")
    
    DATABASE_URL = f"postgresql://{RDS_USERNAME}:{RDS_PASSWORD}@{RDS_ENDPOINT}:{RDS_PORT}/{RDS_DB_NAME}"
    
    engine = create_engine(
        DATABASE_URL,
        poolclass=NullPool,  # Recommended for serverless
        pool_pre_ping=True,  # Verify connections before using
        echo=False
    )
else:
    # Use SQLite for local development
    os.makedirs("data", exist_ok=True)
    engine = create_engine(
        "sqlite:///data/databank.db",
        connect_args={"check_same_thread": False},
        echo=False
    )

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# ============== Data Bank Models ==============

class DataResource(Base):
    __tablename__ = "data_resources"
    
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    format = Column(String, nullable=False)
    category = Column(String, nullable=False)
    workflow_categories = Column(JSON)  # List of categories
    tags = Column(JSON)  # List of tags
    s3_bucket = Column(String)  # S3 bucket name
    s3_key = Column(String)  # S3 object key
    file_url = Column(String)  # S3 URL or CloudFront URL
    file_path = Column(String)  # Original path
    file_size = Column(Integer)
    file_metadata = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    author = Column(String, default="gitthub")
    access_count = Column(Integer, default=0)
    is_public = Column(Boolean, default=True)
    preview_data = Column(JSON)

class EducationalExperience(Base):
    __tablename__ = "educational_experiences"
    
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    difficulty_level = Column(String)
    estimated_time = Column(String)
    workflow_category = Column(String)
    learning_objectives = Column(JSON)
    prerequisites = Column(JSON)
    resources = Column(JSON)  # List of resource IDs
    steps = Column(JSON)
    code_snippets = Column(JSON)
    quiz_questions = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completion_count = Column(Integer, default=0)
    rating = Column(Float)

# ============== Course Models ==============

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True)
    description = Column(Text)
    level = Column(String)
    duration = Column(String)
    modules = Column(JSON)  # List of module objects
    prerequisites = Column(JSON)
    learning_objectives = Column(JSON)
    target_audience = Column(Text)
    learning_path = Column(JSON)
    databank_resources = Column(JSON)
    tags = Column(JSON)
    language = Column(String)
    status = Column(String, default="draft")
    access_type = Column(String, default="public")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_by = Column(String)
    file_metadata = Column(JSON)

class CourseEnrollment(Base):
    __tablename__ = "course_enrollments"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    course_id = Column(String, nullable=False)
    user_email = Column(String, nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    last_accessed = Column(DateTime)
    progress = Column(JSON)
    completion_status = Column(String, default="not_started")

# ============== User Models ==============

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    organization = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
    is_active = Column(Boolean, default=True)
    subscription_tier = Column(String, default="free")
    daily_limit = Column(Integer, default=10)
    monthly_limit = Column(Integer, default=100)
    courses_created = Column(Integer, default=0)
    file_metadata = Column(JSON)

# ============== Database Operations ==============

class AWSRDSRepository:
    """Repository for AWS RDS database operations"""
    
    def __init__(self):
        # Create tables if they don't exist
        Base.metadata.create_all(bind=engine)
    
    def get_session(self) -> Session:
        """Get a new database session"""
        return SessionLocal()
    
    # ============== Data Resource Operations ==============
    
    def create_resource(self, resource_data: Dict[str, Any]) -> str:
        """Create a new data resource"""
        session = self.get_session()
        try:
            resource = DataResource(
                id=resource_data.get('id'),
                title=resource_data.get('title'),
                description=resource_data.get('description'),
                format=resource_data.get('format'),
                category=resource_data.get('category'),
                workflow_categories=resource_data.get('workflow_categories', []),
                tags=resource_data.get('tags', []),
                s3_bucket=resource_data.get('s3_bucket'),
                s3_key=resource_data.get('s3_key'),
                file_url=resource_data.get('file_url'),
                file_path=resource_data.get('file_path'),
                file_size=resource_data.get('file_size'),
                file_metadata=resource_data.get('metadata', {}),
                author=resource_data.get('author', 'gitthub'),
                preview_data=resource_data.get('preview_data')
            )
            session.add(resource)
            session.commit()
            return resource.id
        finally:
            session.close()
    
    def get_resource_by_id(self, resource_id: str) -> Optional[Dict[str, Any]]:
        """Get a resource by ID"""
        session = self.get_session()
        try:
            resource = session.query(DataResource).filter_by(id=resource_id).first()
            if resource:
                # Increment access count
                resource.access_count += 1
                session.commit()
                
                return {
                    'id': resource.id,
                    'title': resource.title,
                    'description': resource.description,
                    'format': resource.format,
                    'category': resource.category,
                    'workflow_categories': resource.workflow_categories or [],
                    'tags': resource.tags or [],
                    's3_bucket': resource.s3_bucket,
                    's3_key': resource.s3_key,
                    'file_url': resource.file_url,
                    'file_path': resource.file_path,
                    'file_size': resource.file_size,
                    'metadata': resource.file_metadata or {},
                    'created_at': resource.created_at.isoformat() if resource.created_at else None,
                    'updated_at': resource.updated_at.isoformat() if resource.updated_at else None,
                    'author': resource.author,
                    'access_count': resource.access_count,
                    'is_public': resource.is_public,
                    'preview_data': resource.preview_data
                }
            return None
        finally:
            session.close()
    
    def search_resources(self, query: Optional[str] = None, 
                        format_filter: Optional[str] = None,
                        category_filter: Optional[str] = None,
                        limit: int = 20, offset: int = 0) -> List[Dict[str, Any]]:
        """Search resources with filters"""
        session = self.get_session()
        try:
            q = session.query(DataResource).filter_by(is_public=True)
            
            if query:
                q = q.filter(
                    (DataResource.title.contains(query)) |
                    (DataResource.description.contains(query))
                )
            
            if format_filter:
                q = q.filter_by(format=format_filter)
            
            if category_filter:
                q = q.filter_by(category=category_filter)
            
            q = q.order_by(DataResource.created_at.desc())
            q = q.limit(limit).offset(offset)
            
            resources = []
            for resource in q.all():
                resources.append({
                    'id': resource.id,
                    'title': resource.title,
                    'description': resource.description,
                    'format': resource.format,
                    'category': resource.category,
                    'workflow_categories': resource.workflow_categories or [],
                    'tags': resource.tags or [],
                    'file_url': resource.file_url,
                    's3_bucket': resource.s3_bucket,
                    's3_key': resource.s3_key,
                    'created_at': resource.created_at.isoformat() if resource.created_at else None,
                    'author': resource.author,
                    'access_count': resource.access_count
                })
            
            return resources
        finally:
            session.close()
    
    # ============== Course Operations ==============
    
    def save_course(self, course_data: Dict[str, Any]) -> str:
        """Save a course"""
        session = self.get_session()
        try:
            course = Course(
                id=course_data.get('course_id'),
                title=course_data.get('title'),
                slug=course_data.get('slug'),
                description=course_data.get('description'),
                level=course_data.get('level'),
                duration=course_data.get('duration'),
                modules=course_data.get('modules', []),
                prerequisites=course_data.get('prerequisites', []),
                learning_objectives=course_data.get('learning_objectives', []),
                target_audience=course_data.get('target_audience'),
                learning_path=course_data.get('learning_path', {}),
                databank_resources=course_data.get('databank_resources', []),
                tags=course_data.get('tags', []),
                language=course_data.get('language', 'english'),
                status=course_data.get('status', 'draft'),
                access_type=course_data.get('access_type', 'public'),
                created_by=course_data.get('created_by'),
                file_metadata=course_data.get('metadata', {})
            )
            session.add(course)
            session.commit()
            return course.id
        finally:
            session.close()
    
    def get_course(self, course_id: str) -> Optional[Dict[str, Any]]:
        """Get a course by ID"""
        session = self.get_session()
        try:
            course = session.query(Course).filter_by(id=course_id).first()
            if course:
                return {
                    'course_id': course.id,
                    'title': course.title,
                    'slug': course.slug,
                    'description': course.description,
                    'level': course.level,
                    'duration': course.duration,
                    'modules': course.modules or [],
                    'prerequisites': course.prerequisites or [],
                    'learning_objectives': course.learning_objectives or [],
                    'target_audience': course.target_audience,
                    'learning_path': course.learning_path or {},
                    'databank_resources': course.databank_resources or [],
                    'tags': course.tags or [],
                    'language': course.language,
                    'status': course.status,
                    'access_type': course.access_type,
                    'created_at': course.created_at.isoformat() if course.created_at else None,
                    'updated_at': course.updated_at.isoformat() if course.updated_at else None,
                    'created_by': course.created_by,
                    'metadata': course.file_metadata or {}
                }
            return None
        finally:
            session.close()
    
    def get_stats(self) -> Dict[str, Any]:
        """Get database statistics"""
        session = self.get_session()
        try:
            total_resources = session.query(DataResource).filter_by(is_public=True).count()
            total_courses = session.query(Course).count()
            total_experiences = session.query(EducationalExperience).count()
            
            # Get format distribution
            resources_by_format = {}
            for resource in session.query(DataResource).filter_by(is_public=True).all():
                format_type = resource.format
                resources_by_format[format_type] = resources_by_format.get(format_type, 0) + 1
            
            # Get recent resources
            recent_resources = []
            for resource in session.query(DataResource).filter_by(is_public=True).order_by(
                DataResource.created_at.desc()
            ).limit(5).all():
                recent_resources.append({
                    'id': resource.id,
                    'title': resource.title,
                    'format': resource.format,
                    'created_at': resource.created_at.isoformat() if resource.created_at else None
                })
            
            return {
                'total_resources': total_resources,
                'total_courses': total_courses,
                'total_experiences': total_experiences,
                'resources_by_format': resources_by_format,
                'recent_uploads': recent_resources
            }
        finally:
            session.close()

# Create global repository instance
aws_rds_repo = AWSRDSRepository()
aws_cloud_repo = aws_rds_repo  # Alias for compatibility