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
    DataBankStats, SearchRequest, UserProgress,
    DataFormat, DataCategory, WorkflowCategory
)
from database import DataBankRepository, init_database
from data_ingestion import DataIngestionService

app = FastAPI(title="gitthub API", version="1.0.0")

# Get allowed origins from environment or use defaults
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "").split(",") if os.environ.get("ALLOWED_ORIGINS") else [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://gitthub.org",
    "https://www.gitthub.org",
    "https://gitthub-frontend.onrender.com"
]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS + ["*"],  # In production, remove ["*"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class ContactMessage(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str

class Feature(BaseModel):
    title: str
    description: str
    icon: str

# In-memory storage (use a database in production)
contact_messages = []

# gitthub specific features
features = [
    {
        "title": "Data Analysis",
        "description": "Transform raw data into actionable insights with our advanced analytics.",
        "icon": "📊"
    },
    {
        "title": "AI Solutions",
        "description": "Leverage cutting-edge artificial intelligence for smarter decision making.",
        "icon": "🤖"
    },
    {
        "title": "Data Journalism",
        "description": "Tell compelling stories backed by data-driven research and visualization.",
        "icon": "📰"
    },
    {
        "title": "Machine Learning",
        "description": "Build predictive models that learn and improve from your data.",
        "icon": "🧠"
    },
    {
        "title": "Consulting",
        "description": "Expert guidance to navigate your data transformation journey.",
        "icon": "💡"
    },
    {
        "title": "Training",
        "description": "Empower your team with data literacy and technical skills.",
        "icon": "🎓"
    }
]

@app.get("/")
def read_root():
    return {
        "message": "Welcome to gitthub API",
        "description": "AI and Data Science Solutions",
        "version": "1.0.0"
    }

@app.get("/api/features")
def get_features():
    """Get all features for the landing page"""
    return {"features": features}

@app.post("/api/contact")
def submit_contact(contact: ContactMessage):
    """Submit a contact form message"""
    # In a real app, you'd save to a database or send an email
    contact_messages.append(contact.dict())
    return {
        "message": "Thank you for your message! We'll get back to you soon.",
        "success": True
    }

@app.get("/api/contact-messages")
def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    return {
        "messages": contact_messages,
        "count": len(contact_messages)
    }

@app.get("/api/stats")
def get_stats():
    """Get gitthub statistics"""
    return {
        "projects": 150,
        "clients": 50,
        "team": 25,
        "years": 5,
        "total_features": len(features),
        "contact_messages": len(contact_messages)
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

# ============== Data Bank API Endpoints ==============

# Initialize services
data_repo = DataBankRepository()
ingestion_service = DataIngestionService()

@app.get("/api/databank/stats")
def get_databank_stats():
    """Get data bank statistics"""
    try:
        stats = data_repo.get_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/resources/upload")
async def upload_resource(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...),
    format: DataFormat = Form(...),
    category: DataCategory = Form(...),
    workflow_categories: str = Form("[]"),  # JSON string
    tags: str = Form("[]")  # JSON string
):
    """Upload a new data resource"""
    try:
        # Parse JSON strings
        workflow_cats = json.loads(workflow_categories)
        tag_list = json.loads(tags)
        
        # Read file content
        file_content = await file.read()
        
        # Validate format
        if not ingestion_service.validate_format(file_content, format):
            raise HTTPException(status_code=400, detail=f"File content does not match format: {format}")
        
        # Ingest file
        resource_data = ingestion_service.ingest_file(
            file_content=file_content,
            filename=file.filename,
            format=format,
            title=title,
            description=description,
            category=category,
            workflow_categories=workflow_cats,
            tags=tag_list
        )
        
        # Save to database
        resource_id = data_repo.create_resource(resource_data)
        resource_data['id'] = resource_id
        
        return {
            "success": True,
            "resource_id": resource_id,
            "message": "Resource uploaded successfully",
            "resource": resource_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/resources/{resource_id}")
def get_resource(resource_id: str):
    """Get a specific resource by ID"""
    resource = data_repo.get_resource(resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

@app.post("/api/databank/resources/search")
def search_resources(search: SearchRequest):
    """Search for resources with filters"""
    try:
        resources = data_repo.search_resources(
            query=search.query,
            format=search.format,
            category=search.category,
            workflow_categories=search.workflow_categories,
            tags=search.tags,
            limit=search.limit,
            offset=search.offset
        )
        return {
            "resources": resources,
            "count": len(resources),
            "limit": search.limit,
            "offset": search.offset
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/resources")
def list_resources(
    limit: int = 20,
    offset: int = 0,
    format: Optional[str] = None,
    category: Optional[str] = None
):
    """List all public resources"""
    try:
        resources = data_repo.search_resources(
            format=format,
            category=category,
            limit=limit,
            offset=offset
        )
        return {
            "resources": resources,
            "count": len(resources),
            "limit": limit,
            "offset": offset
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/databank/experiences")
def create_experience(experience: EducationalExperience):
    """Create a new educational experience"""
    try:
        experience_data = experience.dict()
        experience_id = data_repo.create_experience(experience_data)
        experience_data['id'] = experience_id
        return {
            "success": True,
            "experience_id": experience_id,
            "message": "Educational experience created successfully",
            "experience": experience_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/databank/experiences/{experience_id}")
def get_experience(experience_id: str):
    """Get a specific educational experience"""
    experience = data_repo.get_experience(experience_id)
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return experience

@app.get("/api/databank/experiences")
def list_experiences(
    limit: int = 20,
    offset: int = 0,
    workflow_category: Optional[str] = None,
    difficulty_level: Optional[str] = None
):
    """List all educational experiences"""
    # This would need to be implemented in the repository
    return {
        "experiences": [],
        "count": 0,
        "message": "Experience listing endpoint - to be implemented"
    }

@app.get("/api/databank/formats")
def get_supported_formats():
    """Get list of supported data formats"""
    return {
        "formats": [format.value for format in DataFormat],
        "categories": [cat.value for cat in DataCategory],
        "workflow_categories": [wf.value for wf in WorkflowCategory]
    }

@app.get("/api/databank/resources/{resource_id}/download")
def download_resource(resource_id: str):
    """Download a resource file"""
    resource = data_repo.get_resource(resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    
    file_path = resource.get('file_path')
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Resource file not found")
    
    return FileResponse(
        path=file_path,
        filename=resource.get('metadata', {}).get('original_filename', 'download'),
        media_type='application/octet-stream'
    )

if __name__ == "__main__":
    # Initialize database
    init_database()
    
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)