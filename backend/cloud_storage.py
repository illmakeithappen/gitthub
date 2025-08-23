"""
Cloudinary File Storage Service
Handles secure file uploads and storage in the cloud
"""
import os
import io
import hashlib
from typing import Dict, Any, Optional, BinaryIO
from datetime import datetime
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Cloudinary
IS_PRODUCTION = os.getenv("RENDER") is not None or os.getenv("CLOUDINARY_URL") is not None

if IS_PRODUCTION:
    # Use environment variable (automatically parsed by Cloudinary)
    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET"),
        secure=True
    )
else:
    # For local development, files are stored locally
    UPLOAD_DIR = "data/uploads"
    os.makedirs(UPLOAD_DIR, exist_ok=True)


class CloudStorageService:
    """Service for handling file uploads and storage"""
    
    def __init__(self):
        self.is_production = IS_PRODUCTION
        self.max_file_size = 50 * 1024 * 1024  # 50MB
    
    async def upload_file(
        self, 
        file_content: bytes,
        filename: str,
        content_type: str,
        resource_type: str = "auto",
        folder: str = "databank"
    ) -> Dict[str, Any]:
        """Upload a file to cloud storage"""
        
        # Validate file size
        if len(file_content) > self.max_file_size:
            raise ValueError(f"File size exceeds maximum allowed size of {self.max_file_size / 1024 / 1024}MB")
        
        # Generate unique identifier
        file_hash = hashlib.md5(file_content).hexdigest()
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = f"{timestamp}_{file_hash[:8]}"
        
        if self.is_production:
            # Upload to Cloudinary
            try:
                # Determine resource type based on content
                if content_type.startswith("image/"):
                    resource_type = "image"
                elif content_type == "application/pdf":
                    resource_type = "raw"
                elif content_type.startswith("video/"):
                    resource_type = "video"
                else:
                    resource_type = "raw"
                
                # Upload to Cloudinary
                result = cloudinary.uploader.upload(
                    file_content,
                    public_id=f"{folder}/{unique_id}_{filename}",
                    resource_type=resource_type,
                    folder=folder,
                    overwrite=False,
                    unique_filename=True,
                    use_filename=True,
                    context={
                        "original_filename": filename,
                        "upload_timestamp": timestamp,
                        "content_type": content_type
                    }
                )
                
                return {
                    "success": True,
                    "file_id": result.get("public_id"),
                    "file_url": result.get("secure_url"),
                    "file_size": result.get("bytes", len(file_content)),
                    "format": result.get("format"),
                    "resource_type": result.get("resource_type"),
                    "created_at": result.get("created_at"),
                    "etag": result.get("etag"),
                    "original_filename": filename
                }
                
            except Exception as e:
                raise Exception(f"Cloudinary upload failed: {str(e)}")
        
        else:
            # Local storage for development
            safe_filename = f"{unique_id}_{filename}"
            file_path = os.path.join(UPLOAD_DIR, safe_filename)
            
            try:
                with open(file_path, "wb") as f:
                    f.write(file_content)
                
                return {
                    "success": True,
                    "file_id": safe_filename,
                    "file_url": f"/api/databank/files/{safe_filename}",
                    "file_path": file_path,
                    "file_size": len(file_content),
                    "format": filename.split(".")[-1] if "." in filename else "unknown",
                    "resource_type": "raw",
                    "created_at": datetime.now().isoformat(),
                    "original_filename": filename
                }
                
            except Exception as e:
                raise Exception(f"Local file storage failed: {str(e)}")
    
    def get_file_url(self, file_id: str, expires_in: int = 3600) -> str:
        """Get a secure URL for accessing a file"""
        
        if self.is_production:
            # Generate signed URL for Cloudinary
            try:
                url = cloudinary.utils.cloudinary_url(
                    file_id,
                    secure=True,
                    sign_url=True,
                    type="authenticated",
                    expires_in=expires_in
                )[0]
                return url
            except:
                # Fallback to public URL
                return cloudinary.utils.cloudinary_url(file_id, secure=True)[0]
        else:
            # Local file URL
            return f"/api/databank/files/{file_id}"
    
    def delete_file(self, file_id: str) -> bool:
        """Delete a file from storage"""
        
        if self.is_production:
            try:
                result = cloudinary.uploader.destroy(file_id)
                return result.get("result") == "ok"
            except:
                return False
        else:
            # Delete local file
            try:
                file_path = os.path.join(UPLOAD_DIR, file_id)
                if os.path.exists(file_path):
                    os.remove(file_path)
                    return True
                return False
            except:
                return False
    
    def get_file_info(self, file_id: str) -> Optional[Dict[str, Any]]:
        """Get information about a stored file"""
        
        if self.is_production:
            try:
                result = cloudinary.api.resource(file_id)
                return {
                    "file_id": result.get("public_id"),
                    "file_url": result.get("secure_url"),
                    "file_size": result.get("bytes"),
                    "format": result.get("format"),
                    "resource_type": result.get("resource_type"),
                    "created_at": result.get("created_at"),
                    "width": result.get("width"),
                    "height": result.get("height"),
                    "context": result.get("context", {})
                }
            except:
                return None
        else:
            # Get local file info
            file_path = os.path.join(UPLOAD_DIR, file_id)
            if os.path.exists(file_path):
                stat = os.stat(file_path)
                return {
                    "file_id": file_id,
                    "file_url": f"/api/databank/files/{file_id}",
                    "file_path": file_path,
                    "file_size": stat.st_size,
                    "created_at": datetime.fromtimestamp(stat.st_ctime).isoformat()
                }
            return None
    
    def list_files(self, folder: str = "databank", max_results: int = 100) -> list:
        """List files in storage"""
        
        if self.is_production:
            try:
                result = cloudinary.api.resources(
                    type="upload",
                    prefix=folder,
                    max_results=max_results
                )
                
                files = []
                for resource in result.get("resources", []):
                    files.append({
                        "file_id": resource.get("public_id"),
                        "file_url": resource.get("secure_url"),
                        "file_size": resource.get("bytes"),
                        "format": resource.get("format"),
                        "created_at": resource.get("created_at")
                    })
                return files
            except:
                return []
        else:
            # List local files
            files = []
            if os.path.exists(UPLOAD_DIR):
                for filename in os.listdir(UPLOAD_DIR):
                    file_path = os.path.join(UPLOAD_DIR, filename)
                    if os.path.isfile(file_path):
                        stat = os.stat(file_path)
                        files.append({
                            "file_id": filename,
                            "file_url": f"/api/databank/files/{filename}",
                            "file_size": stat.st_size,
                            "created_at": datetime.fromtimestamp(stat.st_ctime).isoformat()
                        })
            return files


# Create global storage service instance
cloud_storage = CloudStorageService()