from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import os
import json
from datetime import datetime

# Import data bank modules
from models import (
    DataResource, EducationalExperience, DataIngestionRequest,
    SearchRequest, UploadResponse,
    CourseResponse, Module, ContentSection,
    Activity, Assessment, CourseExportRequest
)
from database import DataBankRepository
from data_ingestion import DataIngestionService

# Import cloud services
try:
    # Try AWS S3 storage (priority)
    from aws_s3_storage import aws_s3_storage as cloud_storage
    USE_CLOUD_STORAGE = True
    print(f"✅ AWS S3 storage loaded (production: {cloud_storage.is_production})")
except ImportError as e:
    print(f"❌ AWS S3 import failed: {e}")
    USE_CLOUD_STORAGE = False
    cloud_storage = None

# Try AWS database separately
try:
    from aws_database import aws_cloud_repo as cloud_repo, IS_PRODUCTION
    USE_CLOUD_DB = IS_PRODUCTION
    print(f"✅ AWS database loaded")
except ImportError as e:
    print(f"❌ AWS database import failed: {e}")
    USE_CLOUD_DB = False
    cloud_repo = None

# Fallback to original cloud services if AWS is not available
if not USE_CLOUD_STORAGE or not USE_CLOUD_DB:
    try:
        if not USE_CLOUD_STORAGE:
            from cloud_storage import cloud_storage
            USE_CLOUD_STORAGE = True  # Use original cloud storage
            print(f"✅ Fallback cloud storage loaded")
        
        if not USE_CLOUD_DB:
            from cloud_database import cloud_repo
            USE_CLOUD_DB = True  # Use original cloud database
            print(f"✅ Fallback cloud database loaded")
    except ImportError:
        if not cloud_storage:
            cloud_storage = None
        if not cloud_repo:
            cloud_repo = None

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
    print("✅ Superset integration loaded")
except ImportError as e:
    print(f"❌ Superset integration not available: {e}")
    SUPERSET_ENABLED = False
    superset_service = None

app = FastAPI(title="gitthub API", version="1.0.0")

# Get allowed origins from environment or use defaults
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")

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

@app.get("/")
def read_root():
    return {
        "message": "Welcome to gitthub API",
        "version": "1.0.0",
        "endpoints": {
            "features": "/api/features",
            "stats": "/api/stats",
            "contact": "/api/contact",
            "databank": "/api/databank/*",
            "courses": "/api/courses/*"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/test-database")
def test_database_connection():
    """Test database connection and repository"""
    try:
        # Test local repository
        local_stats = DataBankRepository.get_stats()
        
        # Test cloud repository if available
        cloud_stats = None
        if USE_CLOUD_DB and cloud_repo:
            try:
                cloud_stats = cloud_repo.get_stats()
            except Exception as e:
                cloud_stats = {"error": str(e)}
        
        return {
            "status": "success",
            "USE_CLOUD_DB": USE_CLOUD_DB,
            "local_database": local_stats,
            "cloud_database": cloud_stats,
            "environment": "production" if USE_CLOUD_DB else "development"
        }
    except Exception as e:
        return {"status": "error", "error": str(e)}

@app.get("/api/features")
def get_features():
    return features_data

@app.get("/api/stats")
def get_stats():
    return {
        "featuresCount": len(features_data),
        "messagesCount": len(contact_messages),
        "version": "1.0.0"
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

@app.get("/api/databank/stats")
def get_databank_stats():
    """Get data bank statistics"""
    try:
        stats = DataBankRepository.get_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/resources")
def get_resources(
    limit: int = 20,
    offset: int = 0,
    format: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None
):
    """Get all resources with optional filtering"""
    try:
        resources = DataBankRepository.get_all_resources(
            limit=limit,
            offset=offset,
            format_filter=format,
            category_filter=category,
            search_query=search
        )
        
        # Update S3 URLs with fresh presigned URLs for cloud resources
        if USE_CLOUD_STORAGE and cloud_storage:
            for resource in resources:
                if resource.get('file_id') and 'databank/' in str(resource.get('file_id', '')):
                    try:
                        fresh_url = cloud_storage.generate_presigned_url(resource['file_id'], expires_in=86400)
                        if fresh_url:
                            resource['file_url'] = fresh_url
                    except Exception as e:
                        print(f"Failed to generate fresh presigned URL for {resource.get('id')}: {e}")
        
        return {"resources": resources, "count": len(resources)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/resources/search")
def search_resources(request: SearchRequest):
    """Search resources with advanced filtering"""
    try:
        resources = data_repo.search_resources(
            query=request.query,
            format_filter=request.format,
            category_filter=request.category,
            workflow_filter=request.workflow,
            limit=request.limit
        )
        return {"resources": resources, "count": len(resources)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/resources/upload")
async def upload_resource(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(""),
    category: str = Form(""),
    tags: str = Form(""),
    workflow: Optional[str] = Form(None)
):
    """Upload a new data resource"""
    try:
        # Read file content
        file_content = await file.read()
        
        # Upload to cloud storage if available
        if USE_CLOUD_STORAGE and cloud_storage:
            upload_result = await cloud_storage.upload_file(
                file_content=file_content,
                filename=file.filename,
                content_type=file.content_type or "application/octet-stream",
                folder="databank"
            )
            
            # Process the uploaded file for metadata
            await file.seek(0)  # Reset file position
            result = await ingestion_service.process_file(
                file=file,
                title=title,
                description=description,
                category=category,
                tags=tags.split(",") if tags else [],
                workflow=workflow
            )
            
            # Add cloud storage info to resource
            result["resource"]["file_url"] = upload_result["file_url"]
            result["resource"]["file_id"] = upload_result["file_id"]
            
            # Save to database (cloud if available, otherwise local)
            if USE_CLOUD_DB and cloud_repo:
                try:
                    resource_id = cloud_repo.create_resource(result["resource"])
                except Exception as cloud_error:
                    print(f"Cloud database failed, falling back to local: {cloud_error}")
                    resource_id = data_repo.add_resource(result["resource"])
            else:
                resource_id = data_repo.add_resource(result["resource"])
        else:
            # Use local storage and database
            await file.seek(0)  # Reset file position
            result = await ingestion_service.process_file(
                file=file,
                title=title,
                description=description,
                category=category,
                tags=tags.split(",") if tags else [],
                workflow=workflow
            )
            
            # Save to local database
            resource_id = data_repo.add_resource(result["resource"])
        
        return {
            "success": True,
            "message": "Resource uploaded successfully",
            "resource_id": resource_id,
            "data": result,
            "storage": "cloud" if USE_CLOUD_STORAGE else "local"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/resources/add-link")
async def add_link_resource(
    title: str = Form(...),
    url: str = Form(...),
    description: str = Form(""),
    category: str = Form(""),
    tags: str = Form("")
):
    """Add a new link resource"""
    try:
        import uuid
        from datetime import datetime
        
        # Create resource data for link (store in metadata since database doesn't have resource_type column)
        resource_data = {
            'title': title,
            'description': description or 'No description provided',
            'format': 'URL',
            'category': category or 'General',
            'tags': [tag.strip() for tag in tags.split(',') if tag.strip()] if tags else [],
            'workflow_categories': [],
            'file_url': url,  # Store the URL as file_url for consistency
            'file_path': None,
            'file_size': None,
            'metadata': {
                'url': url,
                'resource_type': 'link',
                'domain': url.split('/')[2] if '://' in url else 'unknown'
            },
            'author': 'user',
            'access_count': 0,
            'is_public': True,
            'preview_data': None
        }
        
        # Save to database (cloud if available, otherwise local)
        if USE_CLOUD_DB and cloud_repo:
            try:
                resource_id = cloud_repo.create_resource(resource_data)
            except Exception as cloud_error:
                print(f"Cloud database failed, falling back to local: {cloud_error}")
                resource_id = data_repo.add_resource(resource_data)
        else:
            resource_id = data_repo.add_resource(resource_data)
        
        return {
            "success": True,
            "message": "Link added successfully",
            "resource_id": resource_id,
            "data": {"resource": resource_data},
            "storage": "cloud" if USE_CLOUD_DB else "local"
        }
    except Exception as e:
        print(f"Error adding link resource: {e}")
        print(f"Resource data: {resource_data}")
        raise HTTPException(status_code=500, detail=f"Failed to add link: {str(e)}")

@app.get("/api/databank/resources/{resource_id}")
def get_resource(resource_id: int):
    """Get a specific resource by ID"""
    try:
        resource = data_repo.get_resource_by_id(resource_id)
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        
        # Update S3 URL with fresh presigned URL if applicable
        if USE_CLOUD_STORAGE and cloud_storage and resource.get('file_id') and 'databank/' in str(resource.get('file_id', '')):
            try:
                fresh_url = cloud_storage.generate_presigned_url(resource['file_id'], expires_in=86400)
                if fresh_url:
                    resource['file_url'] = fresh_url
            except Exception as e:
                print(f"Failed to generate fresh presigned URL: {e}")
        
        return resource
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/resources/{resource_id}/download")
def download_resource(resource_id: int):
    """Download a resource file"""
    try:
        resource = data_repo.get_resource_by_id(resource_id)
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        
        file_path = resource.get("file_path")
        if not file_path or not os.path.exists(file_path):
            # Try to find in uploads directory
            file_path = f"data/uploads/{resource.get('filename', '')}"
            if not os.path.exists(file_path):
                raise HTTPException(status_code=404, detail="File not found")
        
        return FileResponse(
            path=file_path,
            filename=resource.get("filename", "download"),
            media_type=resource.get("mime_type", "application/octet-stream")
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/formats")
def get_formats():
    """Get available formats and categories"""
    try:
        return {
            "formats": [
                "CSV", "JSON", "Excel", "PDF", "Text", 
                "Image", "Python", "Jupyter Notebook", "Parquet"
            ],
            "categories": [
                "Machine Learning", "Natural Language Processing",
                "Computer Vision", "Time Series", "Tabular Data",
                "Graph Data", "Educational", "Research", "Production"
            ],
            "workflows": [
                "data_preprocessing", "feature_engineering",
                "model_training", "evaluation", "deployment"
            ]
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
        experience_id = data_repo.add_experience(experience)
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

@app.post("/api/courses/{course_id}/progress")
async def update_progress(
    course_id: str,
    module_id: str,
    completed: bool = False,
    score: Optional[float] = None
):
    """Update course progress"""
    try:
        progress = await course_repo.update_progress(
            course_id=course_id,
            module_id=module_id,
            completed=completed,
            score=score
        )
        return {
            "success": True,
            "progress": progress
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/courses/{course_id}/certificate")
async def generate_certificate(course_id: str, user_name: str):
    """Generate a course completion certificate"""
    try:
        course = await course_repo.get_course(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        
        certificate = await course_exporter.generate_certificate(
            course=course,
            user_name=user_name,
            completion_date=datetime.now()
        )
        
        return {
            "success": True,
            "certificate": certificate
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

@app.post("/api/superset/guest-token")
async def generate_guest_token(
    user_id: str,
    dashboard_id: Optional[str] = None
):
    """Generate a guest token for embedded dashboards"""
    if not SUPERSET_ENABLED:
        raise HTTPException(status_code=503, detail="Superset integration not available")
    
    try:
        token = superset_service.generate_guest_token(
            user_id=user_id,
            dashboard_id=dashboard_id
        )
        return {
            "success": True,
            "token": token,
            "expires_in": 300  # 5 minutes
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/superset/dashboard/create")
async def create_dashboard_for_dataset(
    dataset_id: str,
    dataset_name: str,
    user_id: str
):
    """Create a custom dashboard for an uploaded dataset"""
    if not SUPERSET_ENABLED:
        raise HTTPException(status_code=503, detail="Superset integration not available")
    
    try:
        dashboard = superset_service.create_dashboard_for_dataset(
            dataset_id=dataset_id,
            dataset_name=dataset_name,
            user_id=user_id
        )
        return {
            "success": True,
            "dashboard": dashboard
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/superset/dashboards")
async def get_user_dashboards(user_id: str):
    """Get all dashboards accessible by a user"""
    if not SUPERSET_ENABLED:
        raise HTTPException(status_code=503, detail="Superset integration not available")
    
    try:
        dashboards = superset_service.get_user_dashboards(user_id)
        return {
            "success": True,
            "dashboards": dashboards,
            "count": len(dashboards)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/superset/sql/execute")
async def execute_sql_query(
    query: str,
    user_id: Optional[str] = None,
    database_id: int = 1
):
    """Execute a SQL query through Superset"""
    if not SUPERSET_ENABLED:
        raise HTTPException(status_code=503, detail="Superset integration not available")
    
    try:
        # Validate query is read-only
        query_lower = query.lower().strip()
        if any(keyword in query_lower for keyword in ['insert', 'update', 'delete', 'drop', 'create', 'alter']):
            raise HTTPException(status_code=400, detail="Only SELECT queries are allowed")
        
        result = superset_service.execute_sql_query(
            query=query,
            database_id=database_id,
            user_id=user_id
        )
        return {
            "success": True,
            "result": result
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/superset/alert/create")
async def create_data_alert(
    name: str,
    sql: str,
    user_email: str,
    schedule: str = "0 9 * * *"
):
    """Create a data alert in Superset"""
    if not SUPERSET_ENABLED:
        raise HTTPException(status_code=503, detail="Superset integration not available")
    
    try:
        alert = superset_service.create_data_alert(
            name=name,
            sql=sql,
            user_email=user_email,
            schedule=schedule
        )
        return {
            "success": True,
            "alert": alert
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
