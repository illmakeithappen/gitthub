# gitthub DataBank - AWS Integration Guide

## Overview
The gitthub DataBank is now fully integrated with AWS RDS PostgreSQL and S3 storage, providing a comprehensive resource management system for AI tools, documents, and educational content.

## Features

### 🎯 New DataBank Capabilities
- **Dual Resource Types**: Manage both documents (files) and links (external URLs)
- **AWS RDS Integration**: Scalable PostgreSQL database for metadata storage
- **AWS S3 Storage**: Cloud storage for document files
- **Enhanced Search**: Filter by resource type, category, format, and tags
- **AI Tools Library**: Curated collection of AI tools and resources
- **Course Management**: Browse and access AI-powered learning courses

## Architecture

### Database Structure
```
AWS RDS PostgreSQL / SQLite (fallback)
├── data_resources (unified table)
│   ├── Documents (PDFs, CSVs, notebooks)
│   └── Links (external URLs, tools)
├── links (dedicated links table)
├── courses (AI-generated courses)
└── users (authentication)
```

### Frontend Tabs
1. **Browse Resources**: View all documents and links
2. **Browse Courses**: Access AI-powered learning experiences  
3. **Upload**: Add new documents or links

## Quick Start

### 1. Start the Enhanced Backend
```bash
cd backend
python start_enhanced_server.py
```
This will:
- Check dependencies
- Test AWS connection
- Start the API on http://localhost:8001

### 2. Start the Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```
Access at: http://localhost:3001

### 3. Populate with AI Tools
```bash
cd backend
python populate_ai_tools.py
```
This adds 30+ curated AI tools including:
- ChatGPT, Claude, Gemini
- GitHub Copilot, Cursor
- Midjourney, DALL-E, Stable Diffusion
- TensorFlow, PyTorch, Hugging Face
- And many more!

### 4. Check Status
```bash
cd backend
python check_databank_status.py
```

## API Endpoints

### Resource Management
- `GET /api/databank/stats` - Database statistics
- `GET /api/databank/resources` - List all resources (docs + links)
- `POST /api/databank/resources/search` - Advanced search
- `POST /api/databank/resources/upload` - Upload document
- `POST /api/databank/resources/add-link` - Add link
- `GET /api/databank/resources/{id}` - Get specific resource
- `GET /api/databank/resources/{id}/download` - Download/redirect

### Links Management
- `GET /api/links` - List all links
- `POST /api/links` - Create new link
- `GET /api/links/{id}` - Get specific link
- `PUT /api/links/{id}` - Update link
- `DELETE /api/links/{id}` - Soft delete link

### Course Management
- `GET /api/courses` - List all courses
- `GET /api/courses/{id}` - Get course details
- `POST /api/courses/generate` - Generate new course

## Environment Configuration

### Required Environment Variables (.env)
```env
# AWS RDS Configuration
AWS_RDS_ENDPOINT=your-rds-endpoint.amazonaws.com
AWS_RDS_USERNAME=your-username
AWS_RDS_PASSWORD=your-password
AWS_RDS_DB_NAME=gitthub
AWS_RDS_PORT=5432

# AWS S3 Configuration  
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-west-2
AWS_S3_BUCKET=your-bucket-name

# Enable AWS (set to true for production)
ENABLE_AWS=true
```

### Local Development (No AWS)
If AWS credentials are not configured, the system automatically falls back to:
- SQLite database (backend/data/databank.db)
- Local file storage (backend/data/uploads/)

## Resource Types

### Documents
- **Formats**: PDF, CSV, JSON, Excel, Markdown, Notebooks
- **Storage**: AWS S3 (production) or local filesystem
- **Features**: Download, preview, metadata tracking

### Links
- **Types**: AI tools, APIs, documentation, tutorials
- **Features**: Click tracking, featured highlights, domain grouping
- **Categories**: Tool, Resource, Documentation, Educational, Tutorial

## DataBank Page Features

### Browse Resources Tab
- Mixed view of documents and links
- Filter by type (document/link)
- Filter by category and format
- Search functionality
- Resource cards with:
  - Title and description
  - Format/type badges
  - Tags
  - Action buttons (Download/Visit)
  - Metadata (size, date, views)

### Browse Courses Tab
- AI-generated courses from DataBank resources
- Course cards with level and duration
- Direct access to course viewer

### Upload Tab
- Toggle between document and link upload
- Document upload:
  - File selection
  - Title and description
  - Category and tags
- Link addition:
  - URL input
  - Title and description
  - Category and tags
  - Automatic domain extraction

## Troubleshooting

### Common Issues

1. **Stats showing 0**
   - Run `python populate_ai_tools.py` to add sample data
   - Check database connection with `python check_databank_status.py`

2. **Resources not displaying**
   - Verify backend is running on port 8001
   - Check browser console for API errors
   - Ensure CORS is properly configured

3. **AWS connection failing**
   - Verify .env file has correct credentials
   - Check AWS RDS security group allows connections
   - System will fallback to SQLite if AWS fails

4. **Upload failing**
   - Check file size limits
   - Verify write permissions for local storage
   - For S3, check bucket permissions

## Testing Scripts

### Test Database Connection
```bash
python test_enhanced_databank.py
```

### Populate Sample Data
```bash
python test_enhanced_databank.py  # Adds sample docs and links
python populate_ai_tools.py        # Adds 30+ AI tools
```

### Check System Status
```bash
python check_databank_status.py
```

## API Documentation
- Interactive docs: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc

## Frontend Routes
- DataBank: http://localhost:3001/databank
- Courses: http://localhost:3001/courses
- Course Generator: http://localhost:3001/course-generator

## Database Schema

### data_resources table
- `id`: Unique identifier
- `title`: Resource title
- `description`: Description text
- `resource_type`: 'document' or 'link'
- `format`: File format or 'URL'
- `category`: Resource category
- `tags`: JSON array of tags
- `s3_key`: S3 object key (documents)
- `file_url`: S3 URL (documents)
- `external_url`: External URL (links)
- `created_at`: Creation timestamp
- `access_count`: View counter

### links table
- `id`: Auto-increment ID
- `title`: Link title
- `url`: External URL
- `description`: Description
- `category`: Link category
- `tags`: JSON array
- `domain`: Extracted domain
- `is_featured`: Featured flag
- `click_count`: Click counter

## Production Deployment

### Render.com Configuration
Environment variables required:
- All AWS RDS variables
- All AWS S3 variables
- `ENABLE_AWS=true`

The system will automatically detect Render environment and use AWS services.

## Support

For issues or questions:
1. Check the logs in Terminal
2. Run `check_databank_status.py` for diagnostics
3. Review API docs at `/docs`
4. Check browser console for frontend errors

## Next Steps

1. ✅ DataBank with document and link support
2. ✅ AWS RDS and S3 integration
3. ✅ AI tools library
4. 🔄 Course generation from resources
5. 🔄 User authentication
6. 🔄 Apache Superset integration
