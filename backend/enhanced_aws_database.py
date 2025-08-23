"""
Enhanced AWS RDS PostgreSQL Database Configuration with Links Support
Supports both documents and links in the DataBank
"""
import os
from typing import Optional, Dict, Any, List
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, Text, DateTime, Boolean, Float, JSON, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import NullPool
import json
from dotenv import load_dotenv
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Check for placeholder values
def is_placeholder_value(value):
    """Check if a value is a placeholder from .env.example"""
    if not value:
        return True
    placeholder_patterns = ['your-', 'your_', 'xxxxx', '<', '>', '[', ']', 'example', 'placeholder']
    return any(pattern in str(value).lower() for pattern in placeholder_patterns)

# Determine environment and validate credentials
IS_PRODUCTION = os.getenv("RENDER") is not None or os.getenv("ENABLE_AWS") == "true"

# Validate AWS credentials
if IS_PRODUCTION:
    RDS_ENDPOINT = os.getenv("AWS_RDS_ENDPOINT")
    RDS_USERNAME = os.getenv("AWS_RDS_USERNAME")
    RDS_PASSWORD = os.getenv("AWS_RDS_PASSWORD")
    
    # Check for placeholder values
    if any(is_placeholder_value(v) for v in [RDS_ENDPOINT, RDS_USERNAME, RDS_PASSWORD]):
        logger.warning("AWS RDS credentials contain placeholder values, falling back to SQLite")
        IS_PRODUCTION = False

# Database configuration
if IS_PRODUCTION:
    # Use AWS RDS PostgreSQL in production
    RDS_ENDPOINT = os.getenv("AWS_RDS_ENDPOINT")
    RDS_PORT = os.getenv("AWS_RDS_PORT", "5432")
    RDS_DB_NAME = os.getenv("AWS_RDS_DB_NAME", "gitthub")
    RDS_USERNAME = os.getenv("AWS_RDS_USERNAME")
    RDS_PASSWORD = os.getenv("AWS_RDS_PASSWORD")
    
    DATABASE_URL = f"postgresql://{RDS_USERNAME}:{RDS_PASSWORD}@{RDS_ENDPOINT}:{RDS_PORT}/{RDS_DB_NAME}"
    
    try:
        engine = create_engine(
            DATABASE_URL,
            poolclass=NullPool,  # Recommended for serverless
            pool_pre_ping=True,  # Verify connections before using
            echo=True  # Enable SQL logging for debugging
        )
        # Test connection
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        logger.info("✅ Successfully connected to AWS RDS PostgreSQL")
    except Exception as e:
        logger.error(f"❌ Failed to connect to AWS RDS: {e}")
        IS_PRODUCTION = False
        # Fallback to SQLite
        os.makedirs("backend/data", exist_ok=True)
        engine = create_engine(
            "sqlite:///backend/data/databank.db",
            connect_args={"check_same_thread": False},
            echo=True
        )
        logger.info("📦 Using SQLite fallback database")
else:
    # Use SQLite for local development
    os.makedirs("backend/data", exist_ok=True)
    engine = create_engine(
        "sqlite:///backend/data/databank.db",
        connect_args={"check_same_thread": False},
        echo=True
    )
    logger.info("📦 Using SQLite for local development")

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# ============== Enhanced Data Bank Models ==============

class DataResource(Base):
    """Model for both documents and links"""
    __tablename__ = "data_resources"
    
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    resource_type = Column(String, nullable=False)  # 'document' or 'link'
    format = Column(String, nullable=False)
    category = Column(String, nullable=False)
    workflow_categories = Column(JSON)  # List of categories
    tags = Column(JSON)  # List of tags
    
    # For documents
    s3_bucket = Column(String)  # S3 bucket name
    s3_key = Column(String)  # S3 object key
    file_url = Column(String)  # S3 URL or CloudFront URL
    file_path = Column(String)  # Original path
    file_size = Column(Integer)
    file_metadata = Column(JSON)
    
    # For links
    external_url = Column(String)  # External URL for links
    url_metadata = Column(JSON)  # Metadata about the link (e.g., site name, preview)
    
    # Common fields
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    author = Column(String, default="gitthub")
    access_count = Column(Integer, default=0)
    is_public = Column(Boolean, default=True)
    preview_data = Column(JSON)

class Link(Base):
    """Dedicated table for links with additional metadata"""
    __tablename__ = "links"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    url = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    tags = Column(JSON)
    icon_url = Column(String)  # Favicon or icon URL
    preview_image = Column(String)  # Preview image URL
    domain = Column(String)  # Domain name for grouping
    click_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_by = Column(String, default="gitthub")
    metadata = Column(JSON)  # Additional metadata

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
    resources = Column(JSON)  # List of resource IDs (both docs and links)
    steps = Column(JSON)
    code_snippets = Column(JSON)
    quiz_questions = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completion_count = Column(Integer, default=0)
    rating = Column(Float)

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True)
    description = Column(Text)
    level = Column(String)
    duration = Column(String)
    modules = Column(JSON)
    prerequisites = Column(JSON)
    learning_objectives = Column(JSON)
    target_audience = Column(Text)
    learning_path = Column(JSON)
    databank_resources = Column(JSON)  # Includes both docs and links
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

# ============== Enhanced Repository with Links Support ==============

class EnhancedAWSRepository:
    """Enhanced repository for AWS RDS database operations with links support"""
    
    def __init__(self):
        # Create tables if they don't exist
        Base.metadata.create_all(bind=engine)
        logger.info(f"Database initialized. Production mode: {IS_PRODUCTION}")
    
    def get_session(self) -> Session:
        """Get a new database session"""
        return SessionLocal()
    
    # ============== Link Operations ==============
    
    def create_link(self, link_data: Dict[str, Any]) -> int:
        """Create a new link entry"""
        session = self.get_session()
        try:
            link = Link(
                title=link_data.get('title'),
                url=link_data.get('url'),
                description=link_data.get('description'),
                category=link_data.get('category'),
                tags=link_data.get('tags', []),
                icon_url=link_data.get('icon_url'),
                preview_image=link_data.get('preview_image'),
                domain=link_data.get('domain'),
                is_featured=link_data.get('is_featured', False),
                created_by=link_data.get('created_by', 'gitthub'),
                metadata=link_data.get('metadata', {})
            )
            session.add(link)
            session.commit()
            session.refresh(link)
            
            # Also create a DataResource entry for unified access
            resource = DataResource(
                id=f"link_{link.id}",
                title=link.title,
                description=link.description,
                resource_type='link',
                format='URL',
                category=link.category or 'Resource',
                workflow_categories=link_data.get('workflow_categories', []),
                tags=link.tags or [],
                external_url=link.url,
                url_metadata={
                    'domain': link.domain,
                    'icon_url': link.icon_url,
                    'preview_image': link.preview_image
                },
                author=link.created_by
            )
            session.add(resource)
            session.commit()
            
            return link.id
        except Exception as e:
            session.rollback()
            logger.error(f"Error creating link: {e}")
            raise
        finally:
            session.close()
    
    def get_link(self, link_id: int) -> Optional[Dict[str, Any]]:
        """Get a link by ID"""
        session = self.get_session()
        try:
            link = session.query(Link).filter_by(id=link_id).first()
            if link:
                # Increment click count
                link.click_count += 1
                session.commit()
                
                return {
                    'id': link.id,
                    'title': link.title,
                    'url': link.url,
                    'description': link.description,
                    'category': link.category,
                    'tags': link.tags or [],
                    'icon_url': link.icon_url,
                    'preview_image': link.preview_image,
                    'domain': link.domain,
                    'click_count': link.click_count,
                    'is_featured': link.is_featured,
                    'is_active': link.is_active,
                    'created_at': link.created_at.isoformat() if link.created_at else None,
                    'created_by': link.created_by,
                    'metadata': link.metadata or {}
                }
            return None
        finally:
            session.close()
    
    def get_all_links(self, limit: int = 50, offset: int = 0, 
                     category: Optional[str] = None,
                     is_featured: Optional[bool] = None) -> List[Dict[str, Any]]:
        """Get all links with optional filtering"""
        session = self.get_session()
        try:
            query = session.query(Link).filter_by(is_active=True)
            
            if category:
                query = query.filter_by(category=category)
            
            if is_featured is not None:
                query = query.filter_by(is_featured=is_featured)
            
            query = query.order_by(Link.is_featured.desc(), Link.created_at.desc())
            query = query.limit(limit).offset(offset)
            
            links = []
            for link in query.all():
                links.append({
                    'id': link.id,
                    'title': link.title,
                    'url': link.url,
                    'description': link.description,
                    'category': link.category,
                    'tags': link.tags or [],
                    'icon_url': link.icon_url,
                    'preview_image': link.preview_image,
                    'domain': link.domain,
                    'click_count': link.click_count,
                    'is_featured': link.is_featured,
                    'created_at': link.created_at.isoformat() if link.created_at else None
                })
            
            return links
        finally:
            session.close()
    
    def update_link(self, link_id: int, update_data: Dict[str, Any]) -> bool:
        """Update a link"""
        session = self.get_session()
        try:
            link = session.query(Link).filter_by(id=link_id).first()
            if link:
                for key, value in update_data.items():
                    if hasattr(link, key):
                        setattr(link, key, value)
                link.updated_at = datetime.utcnow()
                session.commit()
                return True
            return False
        except Exception as e:
            session.rollback()
            logger.error(f"Error updating link: {e}")
            raise
        finally:
            session.close()
    
    def delete_link(self, link_id: int) -> bool:
        """Soft delete a link"""
        session = self.get_session()
        try:
            link = session.query(Link).filter_by(id=link_id).first()
            if link:
                link.is_active = False
                link.updated_at = datetime.utcnow()
                session.commit()
                
                # Also deactivate the corresponding DataResource
                resource = session.query(DataResource).filter_by(id=f"link_{link_id}").first()
                if resource:
                    resource.is_public = False
                    session.commit()
                
                return True
            return False
        finally:
            session.close()
    
    # ============== Enhanced Data Resource Operations ==============
    
    def create_resource(self, resource_data: Dict[str, Any]) -> str:
        """Create a new data resource (document or link)"""
        session = self.get_session()
        try:
            # Determine resource type
            resource_type = resource_data.get('resource_type', 'document')
            
            resource = DataResource(
                id=resource_data.get('id'),
                title=resource_data.get('title'),
                description=resource_data.get('description'),
                resource_type=resource_type,
                format=resource_data.get('format'),
                category=resource_data.get('category'),
                workflow_categories=resource_data.get('workflow_categories', []),
                tags=resource_data.get('tags', []),
                s3_bucket=resource_data.get('s3_bucket') if resource_type == 'document' else None,
                s3_key=resource_data.get('s3_key') if resource_type == 'document' else None,
                file_url=resource_data.get('file_url') if resource_type == 'document' else None,
                file_path=resource_data.get('file_path') if resource_type == 'document' else None,
                file_size=resource_data.get('file_size') if resource_type == 'document' else None,
                file_metadata=resource_data.get('metadata', {}) if resource_type == 'document' else None,
                external_url=resource_data.get('external_url') if resource_type == 'link' else None,
                url_metadata=resource_data.get('url_metadata', {}) if resource_type == 'link' else None,
                author=resource_data.get('author', 'gitthub'),
                preview_data=resource_data.get('preview_data')
            )
            session.add(resource)
            session.commit()
            return resource.id
        except Exception as e:
            session.rollback()
            logger.error(f"Error creating resource: {e}")
            raise
        finally:
            session.close()
    
    def get_resource_by_id(self, resource_id: str) -> Optional[Dict[str, Any]]:
        """Get a resource by ID (document or link)"""
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
                    'resource_type': resource.resource_type,
                    'format': resource.format,
                    'category': resource.category,
                    'workflow_categories': resource.workflow_categories or [],
                    'tags': resource.tags or [],
                    's3_bucket': resource.s3_bucket,
                    's3_key': resource.s3_key,
                    'file_url': resource.file_url,
                    'file_path': resource.file_path,
                    'file_size': resource.file_size,
                    'external_url': resource.external_url,
                    'url_metadata': resource.url_metadata,
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
                        resource_type: Optional[str] = None,
                        limit: int = 20, offset: int = 0) -> List[Dict[str, Any]]:
        """Search resources with filters (both documents and links)"""
        session = self.get_session()
        try:
            q = session.query(DataResource).filter_by(is_public=True)
            
            if resource_type:
                q = q.filter_by(resource_type=resource_type)
            
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
                    'resource_type': resource.resource_type,
                    'format': resource.format,
                    'category': resource.category,
                    'workflow_categories': resource.workflow_categories or [],
                    'tags': resource.tags or [],
                    'file_url': resource.file_url,
                    'external_url': resource.external_url,
                    'url_metadata': resource.url_metadata,
                    's3_bucket': resource.s3_bucket,
                    's3_key': resource.s3_key,
                    'created_at': resource.created_at.isoformat() if resource.created_at else None,
                    'author': resource.author,
                    'access_count': resource.access_count
                })
            
            return resources
        finally:
            session.close()
    
    def get_stats(self) -> Dict[str, Any]:
        """Get enhanced database statistics"""
        session = self.get_session()
        try:
            # Count resources by type
            total_documents = session.query(DataResource).filter_by(
                is_public=True, resource_type='document'
            ).count()
            total_links = session.query(Link).filter_by(is_active=True).count()
            total_resources = total_documents + total_links
            
            total_courses = session.query(Course).count()
            total_experiences = session.query(EducationalExperience).count()
            
            # Get format distribution for documents
            resources_by_format = {}
            for resource in session.query(DataResource).filter_by(
                is_public=True, resource_type='document'
            ).all():
                format_type = resource.format
                resources_by_format[format_type] = resources_by_format.get(format_type, 0) + 1
            
            # Get link categories
            link_categories = {}
            for link in session.query(Link).filter_by(is_active=True).all():
                if link.category:
                    link_categories[link.category] = link_categories.get(link.category, 0) + 1
            
            # Get recent resources (both types)
            recent_resources = []
            for resource in session.query(DataResource).filter_by(is_public=True).order_by(
                DataResource.created_at.desc()
            ).limit(5).all():
                recent_resources.append({
                    'id': resource.id,
                    'title': resource.title,
                    'type': resource.resource_type,
                    'format': resource.format,
                    'created_at': resource.created_at.isoformat() if resource.created_at else None
                })
            
            # Get featured links
            featured_links = []
            for link in session.query(Link).filter_by(
                is_active=True, is_featured=True
            ).order_by(Link.created_at.desc()).limit(5).all():
                featured_links.append({
                    'id': link.id,
                    'title': link.title,
                    'url': link.url,
                    'category': link.category
                })
            
            return {
                'total_resources': total_resources,
                'total_documents': total_documents,
                'total_links': total_links,
                'total_courses': total_courses,
                'total_experiences': total_experiences,
                'resources_by_format': resources_by_format,
                'link_categories': link_categories,
                'recent_uploads': recent_resources,
                'featured_links': featured_links,
                'database_type': 'AWS RDS PostgreSQL' if IS_PRODUCTION else 'SQLite (Local)'
            }
        finally:
            session.close()
    
    # ============== Course Operations (unchanged) ==============
    
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
        except Exception as e:
            session.rollback()
            logger.error(f"Error saving course: {e}")
            raise
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

# Create global repository instance
enhanced_aws_repo = EnhancedAWSRepository()

# Export for compatibility
aws_rds_repo = enhanced_aws_repo
aws_cloud_repo = enhanced_aws_repo
