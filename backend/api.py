from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os

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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)