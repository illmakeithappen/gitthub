"""
AWS S3 File Storage Service
Handles secure file uploads and storage in Amazon S3
"""
import os
import io
import hashlib
import mimetypes
from typing import Dict, Any, Optional, BinaryIO
from datetime import datetime, timedelta
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
from botocore.config import Config
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# AWS Configuration
# Use S3 when credentials are available, regardless of environment
IS_PRODUCTION = all([
    os.getenv("AWS_ACCESS_KEY_ID"),
    os.getenv("AWS_SECRET_ACCESS_KEY"),
    os.getenv("AWS_S3_BUCKET")
])

# S3 Configuration
AWS_REGION = os.getenv("AWS_REGION", "us-west-2")
AWS_S3_BUCKET = os.getenv("AWS_S3_BUCKET", "gitthub-databank")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_S3_CUSTOM_DOMAIN = os.getenv("AWS_S3_CUSTOM_DOMAIN")  # Optional CloudFront domain

# Configure boto3
if IS_PRODUCTION and AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY:
    s3_client = boto3.client(
        's3',
        region_name=AWS_REGION,
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        config=Config(
            signature_version='s3v4',
            retries={'max_attempts': 3}
        )
    )
else:
    s3_client = None
    # For local development, files are stored locally
    UPLOAD_DIR = "data/uploads"
    os.makedirs(UPLOAD_DIR, exist_ok=True)


class AWSS3StorageService:
    """Service for handling file uploads and storage in AWS S3"""
    
    def __init__(self):
        self.is_production = IS_PRODUCTION
        self.s3_client = s3_client
        self.bucket_name = AWS_S3_BUCKET
        self.region = AWS_REGION
        self.custom_domain = AWS_S3_CUSTOM_DOMAIN
        self.max_file_size = 100 * 1024 * 1024  # 100MB
        
        # Create bucket if it doesn't exist (only in production)
        if self.is_production and self.s3_client:
            self._ensure_bucket_exists()
    
    def _ensure_bucket_exists(self):
        """Create S3 bucket if it doesn't exist"""
        try:
            self.s3_client.head_bucket(Bucket=self.bucket_name)
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code == '404':
                try:
                    if self.region == 'us-east-1':
                        self.s3_client.create_bucket(Bucket=self.bucket_name)
                    else:
                        self.s3_client.create_bucket(
                            Bucket=self.bucket_name,
                            CreateBucketConfiguration={'LocationConstraint': self.region}
                        )
                    
                    # Enable versioning for data protection
                    self.s3_client.put_bucket_versioning(
                        Bucket=self.bucket_name,
                        VersioningConfiguration={'Status': 'Enabled'}
                    )
                    
                    # Set bucket policy for public read (optional)
                    # self._set_bucket_policy()
                    
                    print(f"Created S3 bucket: {self.bucket_name}")
                except ClientError as create_error:
                    print(f"Failed to create bucket: {create_error}")
    
    def _set_bucket_policy(self):
        """Set bucket policy for public read access (optional)"""
        bucket_policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "PublicReadGetObject",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": "s3:GetObject",
                    "Resource": f"arn:aws:s3:::{self.bucket_name}/public/*"
                }
            ]
        }
        
        try:
            self.s3_client.put_bucket_policy(
                Bucket=self.bucket_name,
                Policy=json.dumps(bucket_policy)
            )
        except ClientError as e:
            print(f"Failed to set bucket policy: {e}")
    
    async def upload_file(
        self, 
        file_content: bytes,
        filename: str,
        content_type: str,
        folder: str = "databank",
        public: bool = True
    ) -> Dict[str, Any]:
        """Upload a file to S3"""
        
        # Validate file size
        if len(file_content) > self.max_file_size:
            raise ValueError(f"File size exceeds maximum allowed size of {self.max_file_size / 1024 / 1024}MB")
        
        # Generate unique identifier
        file_hash = hashlib.md5(file_content).hexdigest()
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = f"{timestamp}_{file_hash[:8]}"
        
        # Determine content type if not provided
        if not content_type:
            content_type, _ = mimetypes.guess_type(filename)
            content_type = content_type or 'application/octet-stream'
        
        if self.is_production and self.s3_client:
            # Upload to S3
            try:
                # Create S3 key (path)
                s3_key = f"{folder}/{unique_id}_{filename}"
                
                # Upload file
                extra_args = {
                    'ContentType': content_type,
                    'Metadata': {
                        'original_filename': filename,
                        'upload_timestamp': timestamp,
                        'file_hash': file_hash
                    }
                }
                
                # Skip ACL setting - bucket doesn't support ACLs
                # ACLs are disabled in modern S3 buckets for security
                
                self.s3_client.put_object(
                    Bucket=self.bucket_name,
                    Key=s3_key,
                    Body=file_content,
                    **extra_args
                )
                
                # Generate secure presigned URL (valid for 24 hours)
                file_url = self.generate_presigned_url(s3_key, expires_in=86400)
                
                return {
                    "success": True,
                    "file_id": s3_key,  # API expects file_id
                    "file_url": file_url,
                    "s3_bucket": self.bucket_name,
                    "s3_key": s3_key,
                    "file_size": len(file_content),
                    "content_type": content_type,
                    "created_at": datetime.now().isoformat(),
                    "original_filename": filename,
                    "file_hash": file_hash
                }
                
            except (ClientError, NoCredentialsError) as e:
                raise Exception(f"S3 upload failed: {str(e)}")
        
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
                    "content_type": content_type,
                    "created_at": datetime.now().isoformat(),
                    "original_filename": filename
                }
                
            except Exception as e:
                raise Exception(f"Local file storage failed: {str(e)}")
    
    def generate_presigned_url(self, s3_key: str, expires_in: int = 3600) -> str:
        """Generate a presigned URL for accessing a file"""
        
        if self.is_production and self.s3_client:
            try:
                url = self.s3_client.generate_presigned_url(
                    'get_object',
                    Params={'Bucket': self.bucket_name, 'Key': s3_key},
                    ExpiresIn=expires_in,
                    HttpMethod='GET'
                )
                return url
            except ClientError as e:
                print(f"Failed to generate presigned URL: {e}")
                return ""
        else:
            # Local file URL
            filename = s3_key.split('/')[-1] if '/' in s3_key else s3_key
            return f"/api/databank/files/{filename}"
    
    def delete_file(self, s3_key: str) -> bool:
        """Delete a file from S3"""
        
        if self.is_production and self.s3_client:
            try:
                self.s3_client.delete_object(Bucket=self.bucket_name, Key=s3_key)
                return True
            except ClientError as e:
                print(f"Failed to delete S3 object: {e}")
                return False
        else:
            # Delete local file
            try:
                filename = s3_key.split('/')[-1] if '/' in s3_key else s3_key
                file_path = os.path.join(UPLOAD_DIR, filename)
                if os.path.exists(file_path):
                    os.remove(file_path)
                    return True
                return False
            except Exception as e:
                print(f"Failed to delete local file: {e}")
                return False
    
    def get_file_info(self, s3_key: str) -> Optional[Dict[str, Any]]:
        """Get information about a stored file"""
        
        if self.is_production and self.s3_client:
            try:
                response = self.s3_client.head_object(Bucket=self.bucket_name, Key=s3_key)
                
                return {
                    "s3_bucket": self.bucket_name,
                    "s3_key": s3_key,
                    "file_size": response['ContentLength'],
                    "content_type": response.get('ContentType', 'application/octet-stream'),
                    "last_modified": response['LastModified'].isoformat(),
                    "etag": response.get('ETag', '').strip('"'),
                    "metadata": response.get('Metadata', {}),
                    "version_id": response.get('VersionId')
                }
            except ClientError as e:
                if e.response['Error']['Code'] == '404':
                    return None
                print(f"Failed to get S3 object info: {e}")
                return None
        else:
            # Get local file info
            filename = s3_key.split('/')[-1] if '/' in s3_key else s3_key
            file_path = os.path.join(UPLOAD_DIR, filename)
            if os.path.exists(file_path):
                stat = os.stat(file_path)
                return {
                    "file_id": filename,
                    "file_url": f"/api/databank/files/{filename}",
                    "file_path": file_path,
                    "file_size": stat.st_size,
                    "created_at": datetime.fromtimestamp(stat.st_ctime).isoformat()
                }
            return None
    
    def list_files(self, prefix: str = "databank/", max_results: int = 100) -> list:
        """List files in S3 bucket"""
        
        if self.is_production and self.s3_client:
            try:
                response = self.s3_client.list_objects_v2(
                    Bucket=self.bucket_name,
                    Prefix=prefix,
                    MaxKeys=max_results
                )
                
                files = []
                for obj in response.get('Contents', []):
                    files.append({
                        "s3_key": obj['Key'],
                        "file_size": obj['Size'],
                        "last_modified": obj['LastModified'].isoformat(),
                        "etag": obj.get('ETag', '').strip('"'),
                        "storage_class": obj.get('StorageClass', 'STANDARD')
                    })
                return files
            except ClientError as e:
                print(f"Failed to list S3 objects: {e}")
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
    
    def download_file(self, s3_key: str) -> Optional[bytes]:
        """Download a file from S3"""
        
        if self.is_production and self.s3_client:
            try:
                response = self.s3_client.get_object(Bucket=self.bucket_name, Key=s3_key)
                return response['Body'].read()
            except ClientError as e:
                print(f"Failed to download S3 object: {e}")
                return None
        else:
            # Read local file
            filename = s3_key.split('/')[-1] if '/' in s3_key else s3_key
            file_path = os.path.join(UPLOAD_DIR, filename)
            if os.path.exists(file_path):
                with open(file_path, 'rb') as f:
                    return f.read()
            return None


# Create global storage service instance
aws_s3_storage = AWSS3StorageService()