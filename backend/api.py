from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI(title="My Landing Page API", version="1.0.0")

# Enable CORS so Streamlit can call our API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

class Feature(BaseModel):
    title: str
    description: str
    icon: str

# In-memory storage (use a database in production)
contact_messages = []
features = [
    {
        "title": "Fast Performance",
        "description": "Built with modern Python frameworks for lightning-fast response times",
        "icon": "⚡"
    },
    {
        "title": "Easy to Use",
        "description": "Intuitive interface designed with user experience in mind",
        "icon": "🎯"
    },
    {
        "title": "Secure",
        "description": "Enterprise-grade security to protect your data and privacy",
        "icon": "🔒"
    }
]

@app.get("/")
def read_root():
    return {"message": "Welcome to our Landing Page API!"}

@app.get("/api/features", response_model=List[Feature])
def get_features():
    """Get all features for the landing page"""
    return features

@app.post("/api/contact")
def submit_contact(contact: ContactMessage):
    """Submit a contact form message"""
    # In a real app, you'd save to a database or send an email
    contact_messages.append(contact.dict())
    return {"message": "Thank you for your message! We'll get back to you soon.", "success": True}

@app.get("/api/contact-messages")
def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    return {"messages": contact_messages, "count": len(contact_messages)}

@app.get("/api/stats")
def get_stats():
    """Get basic site statistics"""
    return {
        "total_features": len(features),
        "contact_messages": len(contact_messages),
        "api_version": "1.0.0"
    }

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)