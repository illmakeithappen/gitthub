from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import os
import json
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import data bank modules
from models import (
    DataResource, EducationalExperience, DataIngestionRequest,
    SearchRequest, UploadResponse,
    CourseResponse, Module, ContentSection,
    Activity, Assessment, CourseExportRequest
)
from database import DataBankRepository
from data_ingestion import DataIngestionService

# Import enhanced AWS database with links support
try:
    from enhanced_aws_database import enhanced_aws_repo as cloud_repo, IS_PRODUCTION
    USE_CLOUD_DB = True
    logger.info(f"✅ Enhanced AWS database loaded (Production: {IS_PRODUCTION})")
except ImportError as e:
    logger.error(f"❌ Enhanced AWS database import failed: {e}")
    USE_CLOUD_DB = False
    cloud_repo = None

# Import cloud storage
try:
    from aws_s3_storage import aws_s3_storage as cloud_storage
    USE_CLOUD_STORAGE = True
    logger.info(f"✅ AWS S3 storage loaded")
except ImportError as e:
    logger.error(f"❌ AWS S3 import failed: {e}")
    USE_CLOUD_STORAGE = False
    cloud_storage = None

# Import course modules
from course_models import (
    Course, CourseModule, ModuleContent, 
    CourseActivity, CourseAssessment, CourseProject,
    InteractiveElement, ProgressTracking, CourseRequest
)
from course_generator import CourseGeneratorService, InteractiveElementsGenerator
from course_repository import CourseRepository
from course_export import CourseExportService

# Import Superset integration
try:
    from superset_service import superset_service
    SUPERSET_ENABLED = True
    logger.info("✅ Superset integration loaded")
except ImportError as e:
    logger.info(f"ℹ️ Superset integration not available: {e}")
    SUPERSET_ENABLED = False
    superset_service = None

app = FastAPI(title="gitthub API", version="2.0.0")

# Get allowed origins from environment or use defaults
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:3001,http://localhost:5173").split(",")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for contact messages
contact_messages = []

# Features data
features_data = [
    {
        "icon": "📊",
        "title": "Data Analysis",
        "description": "Advanced analytics and visualization tools for complex datasets"
    },
    {
        "icon": "🤖",
        "title": "AI Solutions",
        "description": "Custom machine learning models tailored to your business needs"
    },
    {
        "icon": "📈",
        "title": "Predictive Modeling",
        "description": "Forecast trends and make data-driven decisions with confidence"
    },
    {
        "icon": "🔍",
        "title": "Data Mining",
        "description": "Extract valuable insights from your raw data"
    },
    {
        "icon": "📱",
        "title": "Dashboard Creation",
        "description": "Interactive dashboards for real-time data monitoring"
    },
    {
        "icon": "🔐",
        "title": "Data Security",
        "description": "Enterprise-grade security for your sensitive information"
    }
]

# Pydantic models for links
class LinkCreate(BaseModel):
    title: str
    url: str
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = []
    icon_url: Optional[str] = None
    preview_image: Optional[str] = None
    is_featured: Optional[bool] = False

class LinkUpdate(BaseModel):
    title: Optional[str] = None
    url: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    icon_url: Optional[str] = None
    preview_image: Optional[str] = None
    is_featured: Optional[bool] = None

@app.get("/")
def read_root():
    return {
        "message": "Welcome to gitthub API v2.0",
        "version": "2.0.0",
        "features": {
            "documents": "Upload and manage documents",
            "links": "Store and organize useful links",
            "aws_integration": USE_CLOUD_DB,
            "s3_storage": USE_CLOUD_STORAGE
        },
        "endpoints": {
            "features": "/api/features",
            "stats": "/api/stats",
            "contact": "/api/contact",
            "databank": "/api/databank/*",
            "links": "/api/links/*",
            "courses": "/api/courses/*"
        }
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "database": "AWS RDS" if USE_CLOUD_DB else "SQLite",
        "storage": "AWS S3" if USE_CLOUD_STORAGE else "Local"
    }

@app.get("/api/features")
def get_features():
    return features_data

@app.get("/api/stats")
def get_stats():
    # Get enhanced stats from cloud repo if available
    if USE_CLOUD_DB and cloud_repo:
        db_stats = cloud_repo.get_stats()
        return {
            "featuresCount": len(features_data),
            "messagesCount": len(contact_messages),
            "documentsCount": db_stats.get('total_documents', 0),
            "linksCount": db_stats.get('total_links', 0),
            "totalResources": db_stats.get('total_resources', 0),
            "database": db_stats.get('database_type', 'Unknown'),
            "version": "2.0.0"
        }
    return {
        "featuresCount": len(features_data),
        "messagesCount": len(contact_messages),
        "version": "2.0.0"
    }

@app.post("/api/contact")
def submit_contact(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    contact_data = {
        "id": len(contact_messages) + 1,
        "name": name,
        "email": email,
        "message": message,
        "timestamp": datetime.now().isoformat()
    }
    contact_messages.append(contact_data)
    return {
        "success": True,
        "message": "Thank you for your message. We'll get back to you soon!",
        "data": contact_data
    }

@app.get("/api/contact-messages")
def get_contact_messages():
    return contact_messages

# Initialize services
data_repo = DataBankRepository()
ingestion_service = DataIngestionService()

# Initialize course services
course_generator = CourseGeneratorService()
course_repo = CourseRepository()
course_exporter = CourseExportService()

# ============== Links API Endpoints ==============

@app.post("/api/links")
def create_link(link: LinkCreate):
    """Create a new link"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            # Extract domain from URL
            from urllib.parse import urlparse
            parsed_url = urlparse(link.url)
            domain = parsed_url.netloc
            
            link_data = {
                "title": link.title,
                "url": link.url,
                "description": link.description,
                "category": link.category,
                "tags": link.tags,
                "icon_url": link.icon_url,
                "preview_image": link.preview_image,
                "domain": domain,
                "is_featured": link.is_featured
            }
            
            link_id = cloud_repo.create_link(link_data)
            
            return {
                "success": True,
                "message": "Link created successfully",
                "link_id": link_id,
                "storage": "AWS RDS"
            }
        else:
            # Fallback to local database
            return {
                "success": False,
                "message": "Cloud database not available. Please configure AWS RDS.",
                "storage": "None"
            }
    except Exception as e:
        logger.error(f"Error creating link: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/links")
def get_links(
    limit: int = 50,
    offset: int = 0,
    category: Optional[str] = None,
    featured_only: bool = False
):
    """Get all links with optional filtering"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            links = cloud_repo.get_all_links(
                limit=limit,
                offset=offset,
                category=category,
                is_featured=featured_only if featured_only else None
            )
            return {
                "links": links,
                "count": len(links),
                "storage": "AWS RDS"
            }
        else:
            return {
                "links": [],
                "count": 0,
                "message": "Cloud database not available",
                "storage": "None"
            }
    except Exception as e:
        logger.error(f"Error getting links: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/links/{link_id}")
def get_link(link_id: int):
    """Get a specific link by ID"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            link = cloud_repo.get_link(link_id)
            if not link:
                raise HTTPException(status_code=404, detail="Link not found")
            return link
        else:
            raise HTTPException(status_code=503, detail="Cloud database not available")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting link: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/links/{link_id}")
def update_link(link_id: int, link_update: LinkUpdate):
    """Update a link"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            update_data = {k: v for k, v in link_update.dict().items() if v is not None}
            
            if 'url' in update_data:
                from urllib.parse import urlparse
                parsed_url = urlparse(update_data['url'])
                update_data['domain'] = parsed_url.netloc
            
            success = cloud_repo.update_link(link_id, update_data)
            
            if success:
                return {
                    "success": True,
                    "message": "Link updated successfully"
                }
            else:
                raise HTTPException(status_code=404, detail="Link not found")
        else:
            raise HTTPException(status_code=503, detail="Cloud database not available")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating link: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/links/{link_id}")
def delete_link(link_id: int):
    """Delete a link (soft delete)"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            success = cloud_repo.delete_link(link_id)
            
            if success:
                return {
                    "success": True,
                    "message": "Link deleted successfully"
                }
            else:
                raise HTTPException(status_code=404, detail="Link not found")
        else:
            raise HTTPException(status_code=503, detail="Cloud database not available")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting link: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============== Enhanced DataBank API Endpoints ==============

@app.get("/api/databank/stats")
def get_databank_stats():
    """Get enhanced data bank statistics"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            stats = cloud_repo.get_stats()
            return stats
        else:
            # Fallback to local database
            stats = DataBankRepository.get_stats()
            stats['database_type'] = 'SQLite (Local)'
            return stats
    except Exception as e:
        logger.error(f"Error getting stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/resources")
def get_resources(
    limit: int = 20,
    offset: int = 0,
    format: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None,
    resource_type: Optional[str] = None  # 'document', 'link', or None for all
):
    """Get all resources with optional filtering (documents and links)"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            resources = cloud_repo.search_resources(
                query=search,
                format_filter=format,
                category_filter=category,
                resource_type=resource_type,
                limit=limit,
                offset=offset
            )
            
            # Update S3 URLs with fresh presigned URLs for cloud documents
            if USE_CLOUD_STORAGE and cloud_storage:
                for resource in resources:
                    if resource.get('resource_type') == 'document' and resource.get('s3_key'):
                        try:
                            fresh_url = cloud_storage.generate_presigned_url(
                                resource['s3_key'], 
                                expires_in=86400
                            )
                            if fresh_url:
                                resource['file_url'] = fresh_url
                        except Exception as e:
                            logger.error(f"Failed to generate presigned URL: {e}")
            
            return {
                "resources": resources,
                "count": len(resources),
                "storage": "AWS RDS"
            }
        else:
            # Fallback to local database
            resources = DataBankRepository.get_all_resources(
                limit=limit,
                offset=offset,
                format_filter=format,
                category_filter=category,
                search_query=search
            )
            return {
                "resources": resources,
                "count": len(resources),
                "storage": "SQLite"
            }
    except Exception as e:
        logger.error(f"Error getting resources: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/resources/search")
def search_resources(request: SearchRequest):
    """Search resources with advanced filtering"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            resources = cloud_repo.search_resources(
                query=request.query,
                format_filter=request.format,
                category_filter=request.category,
                limit=request.limit,
                offset=request.offset
            )
            return {"resources": resources, "count": len(resources)}
        else:
            resources = data_repo.search_resources(
                query=request.query,
                format_filter=request.format,
                category_filter=request.category,
                workflow_filter=request.workflow_categories,
                limit=request.limit
            )
            return {"resources": resources, "count": len(resources)}
    except Exception as e:
        logger.error(f"Error searching resources: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/resources/upload")
async def upload_resource(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    tags: str = Form(""),
    workflow: Optional[str] = Form(None)
):
    """Upload a new data resource (document)"""
    try:
        import uuid
        resource_id = str(uuid.uuid4())
        
        # Read file content
        file_content = await file.read()
        
        resource_data = {
            "id": resource_id,
            "title": title,
            "description": description,
            "resource_type": "document",
            "format": file.filename.split('.')[-1].upper() if '.' in file.filename else "Unknown",
            "category": category,
            "tags": tags.split(",") if tags else [],
            "workflow_categories": [workflow] if workflow else []
        }
        
        # Upload to cloud storage if available
        if USE_CLOUD_STORAGE and cloud_storage:
            upload_result = await cloud_storage.upload_file(
                file_content=file_content,
                filename=file.filename,
                content_type=file.content_type or "application/octet-stream",
                folder="databank"
            )
            
            resource_data["file_url"] = upload_result["file_url"]
            resource_data["s3_key"] = upload_result["file_id"]
            resource_data["s3_bucket"] = upload_result.get("bucket")
            resource_data["file_size"] = len(file_content)
        else:
            # Use local storage
            os.makedirs("backend/data/uploads", exist_ok=True)
            file_path = f"backend/data/uploads/{resource_id}_{file.filename}"
            with open(file_path, "wb") as f:
                f.write(file_content)
            
            resource_data["file_path"] = file_path
            resource_data["file_size"] = len(file_content)
        
        # Save to database
        if USE_CLOUD_DB and cloud_repo:
            cloud_repo.create_resource(resource_data)
            storage_type = "AWS RDS + S3" if USE_CLOUD_STORAGE else "AWS RDS + Local"
        else:
            data_repo.add_resource(resource_data)
            storage_type = "SQLite + Local"
        
        return {
            "success": True,
            "message": "Resource uploaded successfully",
            "resource_id": resource_id,
            "data": resource_data,
            "storage": storage_type
        }
    except Exception as e:
        logger.error(f"Error uploading resource: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/resources/add-link")
def add_resource_link(
    title: str = Form(...),
    url: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    tags: str = Form("")
):
    """Add a link as a resource"""
    try:
        import uuid
        
        # Create link in links table
        if USE_CLOUD_DB and cloud_repo:
            from urllib.parse import urlparse
            parsed_url = urlparse(url)
            domain = parsed_url.netloc
            
            link_data = {
                "title": title,
                "url": url,
                "description": description,
                "category": category,
                "tags": tags.split(",") if tags else [],
                "domain": domain
            }
            
            link_id = cloud_repo.create_link(link_data)
            
            return {
                "success": True,
                "message": "Link added successfully",
                "link_id": link_id,
                "resource_id": f"link_{link_id}",
                "storage": "AWS RDS"
            }
        else:
            return {
                "success": False,
                "message": "Cloud database not available. Please configure AWS RDS."
            }
    except Exception as e:
        logger.error(f"Error adding link resource: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/resources/{resource_id}")
def get_resource(resource_id: str):
    """Get a specific resource by ID (document or link)"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            resource = cloud_repo.get_resource_by_id(resource_id)
            if not resource:
                raise HTTPException(status_code=404, detail="Resource not found")
            
            # Update S3 URL for documents
            if resource.get('resource_type') == 'document' and USE_CLOUD_STORAGE and cloud_storage:
                if resource.get('s3_key'):
                    try:
                        fresh_url = cloud_storage.generate_presigned_url(
                            resource['s3_key'], 
                            expires_in=86400
                        )
                        if fresh_url:
                            resource['file_url'] = fresh_url
                    except Exception as e:
                        logger.error(f"Failed to generate presigned URL: {e}")
            
            return resource
        else:
            # Try local database
            try:
                resource_id_int = int(resource_id)
                resource = data_repo.get_resource_by_id(resource_id_int)
                if not resource:
                    raise HTTPException(status_code=404, detail="Resource not found")
                return resource
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid resource ID for local database")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting resource: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/resources/{resource_id}/download")
def download_resource(resource_id: str):
    """Download a resource file (for documents only)"""
    try:
        if USE_CLOUD_DB and cloud_repo:
            resource = cloud_repo.get_resource_by_id(resource_id)
            if not resource:
                raise HTTPException(status_code=404, detail="Resource not found")
            
            if resource.get('resource_type') == 'link':
                # For links, redirect to the external URL
                from fastapi.responses import RedirectResponse
                return RedirectResponse(url=resource.get('external_url'))
            
            # For documents, provide download
            if USE_CLOUD_STORAGE and resource.get('s3_key'):
                # Generate presigned URL for direct download
                download_url = cloud_storage.generate_presigned_url(
                    resource['s3_key'],
                    expires_in=3600,
                    response_content_disposition=f'attachment; filename="{resource.get("title")}"'
                )
                from fastapi.responses import RedirectResponse
                return RedirectResponse(url=download_url)
            elif resource.get('file_path') and os.path.exists(resource['file_path']):
                return FileResponse(
                    path=resource['file_path'],
                    filename=resource.get('title'),
                    media_type="application/octet-stream"
                )
            else:
                raise HTTPException(status_code=404, detail="File not found")
        else:
            # Local database fallback
            try:
                resource_id_int = int(resource_id)
                resource = data_repo.get_resource_by_id(resource_id_int)
                if not resource:
                    raise HTTPException(status_code=404, detail="Resource not found")
                
                file_path = resource.get("file_path")
                if not file_path or not os.path.exists(file_path):
                    file_path = f"backend/data/uploads/{resource.get('filename', '')}"
                    if not os.path.exists(file_path):
                        raise HTTPException(status_code=404, detail="File not found")
                
                return FileResponse(
                    path=file_path,
                    filename=resource.get("filename", "download"),
                    media_type=resource.get("mime_type", "application/octet-stream")
                )
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid resource ID")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error downloading resource: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/formats")
def get_formats():
    """Get available formats and categories"""
    try:
        return {
            "formats": [
                "CSV", "JSON", "Excel", "PDF", "Text", 
                "Image", "Python", "Jupyter Notebook", "Parquet", "URL"
            ],
            "categories": [
                "Machine Learning", "Natural Language Processing",
                "Computer Vision", "Time Series", "Tabular Data",
                "Graph Data", "Educational", "Research", "Production",
                "Documentation", "Tutorial", "Tool", "Resource"
            ],
            "workflows": [
                "data_preprocessing", "feature_engineering",
                "model_training", "evaluation", "deployment"
            ],
            "resource_types": ["document", "link"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/experiences")
def get_experiences():
    """Get educational experiences"""
    try:
        experiences = data_repo.get_all_experiences()
        return {"experiences": experiences, "count": len(experiences)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/experiences")
def create_experience(experience: EducationalExperience):
    """Create a new educational experience"""
    try:
        experience_id = data_repo.add_experience(experience.dict())
        return {
            "success": True,
            "message": "Experience created successfully",
            "experience_id": experience_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============== Course Generator API Endpoints ==============

@app.post("/api/courses/generate")
async def generate_course(request: CourseRequest):
    """Generate a new AI-powered course"""
    try:
        # Generate the course using template model
        course = await course_generator.generate_course(request)
        
        # Save to database
        course_id = await course_repo.save_course(course)
        
        return {
            "success": True,
            "course_id": course_id,
            "course": course.dict(),
            "message": "Course generated successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/courses/{course_id}")
async def get_course(course_id: str):
    """Get a specific course by ID"""
    try:
        course = await course_repo.get_course(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/courses")
async def list_courses(
    limit: int = 20,
    offset: int = 0,
    level: Optional[str] = None,
    language: Optional[str] = None
):
    """List all available courses"""
    try:
        courses = await course_repo.list_courses(
            limit=limit,
            offset=offset,
            level=level,
            language=language
        )
        return {
            "courses": courses,
            "count": len(courses)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/courses/{course_id}/export")
async def export_course(course_id: str, request: CourseExportRequest):
    """Export a course in various formats"""
    try:
        course = await course_repo.get_course(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        
        # Convert dict to Course object if needed
        if isinstance(course, dict):
            course = Course(**course)
        
        export_data = await course_exporter.export_course(
            course=course,
            format=request.format,
            include_solutions=request.include_solutions
        )
        
        return {
            "success": True,
            "format": request.format,
            "data": export_data
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============== Superset Integration API Endpoints ==============

@app.get("/api/superset/status")
def get_superset_status():
    """Check if Superset integration is available"""
    return {
        "enabled": SUPERSET_ENABLED,
        "message": "Superset is available" if SUPERSET_ENABLED else "Superset integration not configured"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)
