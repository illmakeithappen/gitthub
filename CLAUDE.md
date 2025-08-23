# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern **FastAPI + React** web application for gitthub.org - an AI and Data Science company. The platform serves as a professional website showcasing data journalism articles, AI solutions, and educational resources through interactive visualizations and modern web interfaces.

**NEW FEATURES:**
- **AI-Powered Course Generation**: Generate interactive learning courses from Data Bank resources
- **Course Library & Viewer**: Browse and take generated courses with progress tracking
- **AWS Integration**: Cloud database (RDS PostgreSQL) and storage (S3) support
- **Authentication System**: User authentication and session management
- **Apache Superset Integration**: Enterprise-grade data visualization and business intelligence
- **Data Explorer**: Interactive data analysis with embedded dashboards and SQL queries

## Architecture

### Current Stack
- **Backend**: FastAPI (Python) - REST API server with auto-reloading development server
- **Frontend**: React 18 + Vite - Modern, component-based frontend with hot module replacement
- **Database**: SQLite (local) or AWS RDS PostgreSQL (production)
- **Storage**: Local filesystem or AWS S3 (production)
- **Analytics**: Apache Superset integration for advanced data visualization
- **Styling**: Styled Components - Component-scoped CSS-in-JS
- **Build Tools**: Vite for fast development and optimized production builds
- **Package Management**: Poetry (Python) and npm (JavaScript)
- **Containerization**: Docker & Docker Compose for development and deployment
- **Deployment**: Render platform configuration with AWS integration
- **AI Services**: Course generation with integrated learning management

### Application Structure
```
website/
├── backend/                    # FastAPI backend
│   ├── api.py                 # Main FastAPI application with CORS, API endpoints
│   ├── models.py              # Pydantic models for data validation
│   ├── database.py           # SQLite database setup and repository pattern
│   ├── data_ingestion.py     # Service for processing multiple file formats
│   ├── seed_data.py          # Script to populate initial data
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile            # Backend container configuration
│   ├── # Course Generation System
│   ├── course_generator.py   # AI-powered course generation service
│   ├── course_models.py      # Course, module, and activity models
│   ├── course_repository.py  # Course data access layer
│   ├── course_export.py      # Course export functionality (PDF, SCORM)
│   ├── # AWS Integration
│   ├── aws_database.py       # AWS RDS PostgreSQL integration
│   ├── aws_s3_storage.py     # AWS S3 storage service
│   ├── cloud_database.py     # Abstract cloud database interface
│   ├── cloud_storage.py      # Abstract cloud storage interface
│   ├── migrate_to_cloud.py   # Migration script from local to cloud
│   ├── setup_aws.py          # AWS setup utilities
│   ├── # Authentication & Session Management
│   ├── auth_service.py       # User authentication service
│   ├── session_manager.py    # Session management utilities
│   ├── # Superset Integration
│   ├── superset_service.py   # Apache Superset integration service
│   └── data/                 # Data storage
│       ├── databank.db      # SQLite database for Data Bank
│       ├── courses.db       # SQLite database for Course system
│       ├── samples/         # Sample data files
│       └── uploads/         # Uploaded files storage
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable React components (Header, Footer)
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx          # Home page
│   │   │   ├── About.jsx         # About page
│   │   │   ├── Services.jsx      # Services page
│   │   │   ├── Contact.jsx       # Contact page
│   │   │   ├── DataBank.jsx      # Data Bank management
│   │   │   ├── CourseGenerator.jsx # AI course generation interface
│   │   │   ├── CourseLibrary.jsx # Browse available courses
│   │   │   ├── CourseViewer.jsx  # Take courses with progress tracking
│   │   │   ├── AuthPage.jsx      # Authentication page
│   │   │   └── DataExplorer.jsx  # Interactive data visualization and analytics
│   │   ├── App.jsx          # Main React app with routing
│   │   ├── main.jsx         # React DOM entry point
│   │   └── index.css        # Global styles with gitthub brand colors
│   ├── public/              # Public assets (favicon)
│   ├── server.js            # Express server for production deployment
│   ├── package.json         # Node.js dependencies and scripts
│   ├── vite.config.js       # Vite configuration with API proxy
│   ├── index.html           # HTML template
│   └── Dockerfile           # Frontend container configuration
├── data/                    # Data directories
│   ├── processed/          # Processed data files
│   └── raw/                # Raw data files
├── static/                  # Static assets (legacy)
│   ├── css/                # Legacy CSS files
│   ├── data/               # Data files (links.csv)
│   ├── docs/               # PDF documents
│   ├── images/             # Image assets and logos
│   └── js/                 # Legacy JavaScript files
├── templates/               # Legacy HTML templates
├── pyproject.toml          # Poetry Python project configuration
├── poetry.lock             # Poetry dependency lock file
├── docker-compose.yml       # Development orchestration
├── render.yaml             # Production deployment configuration
├── AWS_SETUP_GUIDE.md      # Comprehensive AWS setup guide
└── static/docs/            # Documentation
    ├── DEPLOYMENT.md       # Deployment documentation
    ├── AI_LEARNING_COURSES_SPEC.md # Course generation specifications
    └── COURSE_GENERATOR_README.md  # Course generator documentation
```

## Common Development Commands

### Running the Application

**Development Mode (Recommended):**
```bash
# Backend (Terminal 1)
cd backend
uvicorn api:app --reload --port 8001

# Frontend (Terminal 2) 
cd frontend
npm install  # First time only
npm run dev
```

**Using Docker Compose:**
```bash
docker-compose up --build
```

**Access:**
- Frontend: http://localhost:3000 (or 3001 if 3000 is in use)
- Backend API: http://localhost:8001 (or 8000 with Docker)
- API Docs: http://localhost:8001/docs

### Dependency Management

**Backend (Poetry):**
```bash
# Install dependencies
poetry install

# Add new dependency
poetry add <package_name>

# Add development dependency
poetry add --group dev <package_name>

# Update requirements.txt for Docker
poetry export -f requirements.txt --output backend/requirements.txt --without-hashes
```

**Frontend (npm):**
```bash
cd frontend
npm install

# Add new package
npm install <package_name>

# Add development dependency
npm install --save-dev <package_name>
```

## API Endpoints

The FastAPI backend provides the following endpoints:

### General Endpoints
- `GET /` - API root welcome message
- `GET /api/features` - Platform features data
- `GET /api/stats` - Platform statistics (features count, messages, version)
- `POST /api/contact` - Submit contact form (accepts name, email, message)
- `GET /api/contact-messages` - Retrieve all contact messages (admin endpoint)

### Data Bank Endpoints
- `GET /api/databank/stats` - Data Bank statistics (resources count, formats, categories)
- `GET /api/databank/resources` - List all resources with optional filtering
- `POST /api/databank/resources/search` - Search resources with advanced filters
- `POST /api/databank/resources/upload` - Upload new data resource
- `GET /api/databank/resources/{id}` - Get specific resource details
- `GET /api/databank/resources/{id}/download` - Download resource file
- `GET /api/databank/formats` - Get available formats and categories
- `GET /api/databank/experiences` - List educational experiences
- `POST /api/databank/experiences` - Create new educational experience

### Course Generation Endpoints
- `POST /api/courses/generate` - AI-generate interactive course from Data Bank resources
- `GET /api/courses` - List all available courses with filtering
- `GET /api/courses/{id}` - Get specific course details with modules
- `POST /api/courses/{id}/export` - Export course to PDF or SCORM format
- `POST /api/courses/{id}/progress` - Update user progress in course
- `GET /api/courses/{id}/certificate` - Generate completion certificate

### Superset Analytics Endpoints
- `GET /api/superset/status` - Check if Superset integration is available
- `POST /api/superset/guest-token` - Generate guest token for embedded dashboards
- `POST /api/superset/dashboard/create` - Create custom dashboard for uploaded dataset
- `GET /api/superset/dashboards` - Get all dashboards accessible by a user
- `POST /api/superset/sql/execute` - Execute read-only SQL queries through Superset
- `POST /api/superset/alert/create` - Create data monitoring alerts with email notifications

## Key Features & Components

### React Frontend Components
- **Header.jsx**: Navigation with active route highlighting (red underline) and responsive design
- **Footer.jsx**: Multi-column footer with company info and links
- **Home.jsx**: Hero section, features grid with API integration, stats display
- **About.jsx**: Company mission, values, team information with alternating background sections
- **Services.jsx**: Service offerings with interactive cards, process steps, and testimonials
- **Contact.jsx**: Functional contact form with API integration, FAQ section, and validation
- **DataBank.jsx**: Comprehensive data resource management with browse, search, upload, and download functionality
- **CourseGenerator.jsx**: AI-powered course creation interface with Data Bank integration
- **CourseLibrary.jsx**: Browse and filter available courses with progress indicators
- **CourseViewer.jsx**: Interactive course player with modules, progress tracking, and assessments
- **AuthPage.jsx**: User authentication and registration interface
- **DataExplorer.jsx**: Interactive data visualization and analytics with embedded Superset dashboards

### Styling System
- **Styled Components**: Component-scoped styling with dynamic props
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Brand Colors (gitthub theme)**: 
  - Primary: `--gitthub-black` (#1a1a1a)
  - Beige: `--gitthub-beige` (#e8ddd4)
  - Light Beige: `--gitthub-light-beige` (#f5f0eb)
  - Gray: `--gitthub-gray` (#4a5568)
  - White: `--gitthub-white` (#ffffff)
- **Design Elements**: 
  - Section separation with 3px black borders
  - Red underline for active navigation items
  - Consistent border-radius and spacing variables
  - Hover effects with transform and box-shadow transitions
  - Alternating beige/light-beige background sections

### FastAPI Backend Features
- **CORS Configuration**: Enabled for frontend communication
- **Pydantic Models**: Type validation for resources, experiences, courses, and contact messages
- **Database**: SQLite (local) or AWS RDS PostgreSQL (production) with repository pattern
- **File Processing**: Multi-format data ingestion service (CSV, JSON, Excel, PDF, Text, Images, Notebooks)
- **Auto-reload**: Development server with automatic reloading on file changes
- **File Upload**: Support for multipart form data with file validation
- **Cloud Integration**: AWS S3 for file storage and RDS for scalable database operations
- **Course Generation**: AI-powered service for creating interactive learning experiences
- **Authentication**: JWT-based user authentication and session management
- **Export Services**: Course export to PDF and SCORM formats
- **Superset Integration**: Apache Superset service for advanced data visualization and BI dashboards

## Development Notes

### Environment Setup
- **Node.js**: Required for frontend development (React + Vite)
- **Python 3.9+**: Required for backend development (FastAPI)
- **Port Configuration**: Frontend (3000/3001), Backend (8001), with Vite proxy for API calls
- **Production Server**: Express.js server (server.js) for serving built frontend assets

### Data Management
- **Data Bank**: SQLite database (`backend/data/databank.db`) or AWS RDS for resource storage
- **Course Database**: SQLite database (`backend/data/courses.db`) or AWS RDS for course data
- **File Storage**: Local `backend/data/uploads/` directory or AWS S3 bucket
- **Contact Forms**: Submissions stored in-memory (backend/api.py)
- **Sample Data**: Pre-populated sample resources in `backend/data/samples/`
- **Static Assets**: Legacy assets in `static/` directory
- **Public Assets**: Frontend assets in `frontend/public/` directory
- **API Proxy**: Vite configuration handles `/api/*` routes
- **Data Directories**: `data/raw/` and `data/processed/` for data science workflows
- **Cloud Migration**: Automated migration scripts for moving from local to AWS infrastructure

### Development Workflow
- **Hot Reloading**: Both frontend (Vite) and backend (Uvicorn --reload) support live updates
- **Component Development**: React components are modular and reusable
- **API Integration**: Axios handles HTTP requests with error handling and fallback data
- **Responsive Testing**: Components adapt to different screen sizes automatically
- **Database Initialization**: Run `python backend/seed_data.py` to populate sample data
- **Testing Tools**: Jest and Pytest configured for frontend and backend testing respectively
- **Security**: Environment files (.env) are excluded from git to protect sensitive credentials

### Current Development Status
- **Backend Server**: Running on http://localhost:8001 with FastAPI and auto-reload
- **Frontend Server**: Running on http://localhost:3001 with Vite and hot module replacement
- **Database**: Local SQLite with 19+ populated resources and sample educational experiences
- **Cloud Services**: AWS S3 storage operational, RDS gracefully falls back to SQLite in development
- **DataBank Page**: Fully functional with browse, search, upload, and download capabilities
- **API Status**: All endpoints returning 200 OK, proper error handling and fallback mechanisms active

### Project Dependencies
- **Frontend**: React 18.3.1, React Router 6.28.0, Axios 1.7.9, Styled Components 6.1.13, Express 4.18.2
- **Frontend Analytics**: @superset-ui/embedded-sdk (for embedded dashboards)
- **Backend Core**: FastAPI 0.116.1, Uvicorn 0.35.0, Pydantic 2.0.0
- **Data Processing**: pandas, openpyxl, python-multipart, aiofiles
- **Database**: SQLAlchemy (for AWS RDS integration), psycopg2 (PostgreSQL driver)
- **Cloud Services**: boto3 (AWS), python-jose (JWT)
- **Analytics**: requests (for Superset API), PyJWT (for guest tokens)
- **AI/ML**: OpenAI API, LangChain (for course generation)
- **Development**: ESLint, Black, isort, Vite 6.0.5, Poetry for Python dependency management

## Data Bank Feature

The Data Bank is a comprehensive data resource management system that allows users to:
- **Browse Resources**: Filter by format (CSV, JSON, Excel, PDF, etc.) and category
- **Search**: Advanced search with query, format, and category filters
- **Upload**: Add new resources with metadata, tags, and workflow categories
- **Download**: Direct file downloads for all resources
- **Educational Experiences**: Interactive tutorials and guided workflows

### Current Sample Data Available
The system comes pre-populated with diverse sample resources:
- **Iris Dataset Sample** (CSV): Classic machine learning dataset for classification tasks
- **API Response Example** (JSON): Sample REST API response for learning data parsing
- **NLP Basics Tutorial** (Text): Introduction to Natural Language Processing concepts
- **Time Series Forecasting Guide** (Markdown): Comprehensive guide on time series analysis
- **Computer Vision Dataset** (Image): Labeled images for object detection tasks
- **Data Visualization Best Practices** (Notebook): Jupyter notebook with visualization techniques
- **Educational Experiences**: ML with Iris dataset, Building REST APIs with FastAPI

### DataBank Statistics Dashboard
- **Total Resources**: 19+ resources across multiple formats and categories  
- **Data Formats**: CSV, JSON, Text, Markdown, Image, Notebook, PDF
- **Categories**: Educational, Research, Dataset, Tutorial, Code Sample, Documentation
- **Access Patterns**: Download counters and usage analytics

### Supported File Formats
- Data: CSV, JSON, Excel (xlsx/xls), Parquet
- Documents: PDF, Text, Markdown
- Code: Python, Jupyter Notebooks
- Media: Images (PNG, JPG, etc.)

### Data Categories
- Machine Learning, Natural Language Processing, Computer Vision
- Time Series, Tabular Data, Graph Data
- Educational, Research, Production

## AI-Powered Course Generation System

### Overview
The Course Generation system leverages AI to automatically create interactive learning experiences from Data Bank resources. This system transforms static datasets and documents into structured, engaging courses with hands-on exercises and assessments.

### Key Features
- **AI-Generated Content**: Automatically creates course structure, modules, and learning activities
- **Data Bank Integration**: Uses existing resources as course materials and datasets
- **Interactive Elements**: Code sandboxes, visualizations, quizzes, and practical exercises
- **Progress Tracking**: User enrollment, module completion, and learning analytics
- **Export Options**: PDF and SCORM formats for external learning management systems
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Course Structure
```
Course
├── Metadata (title, description, difficulty, duration)
├── Prerequisites & Learning Outcomes
├── Modules
│   ├── Content Sections (theory, explanations)
│   ├── Interactive Elements (code, visualizations)
│   ├── Activities (hands-on exercises)
│   └── Assessments (quizzes, projects)
└── Progress Tracking & Certificates
```

### Workflow Categories
The system supports generating courses for various AI/ML workflows:
- **Data Preparation**: Data cleaning, preprocessing, feature engineering
- **Exploratory Analysis**: Statistical analysis, visualization, pattern discovery
- **Model Development**: Algorithm selection, training, hyperparameter tuning
- **Model Evaluation**: Metrics, validation, cross-validation techniques
- **Deployment**: Model serving, API creation, monitoring
- **Domain-Specific**: Classification, regression, NLP, computer vision, time series

### Course Generation Process
1. **Analyze Data Bank**: AI analyzes available resources and their metadata
2. **Generate Structure**: Creates logical learning progression and module breakdown
3. **Create Content**: Transforms static resources into interactive learning materials
4. **Design Assessments**: Creates exercises and quizzes using actual datasets
5. **Establish Prerequisites**: Links to other courses and required knowledge
6. **Set Success Metrics**: Defines completion criteria and learning outcomes

### Frontend Course Pages
- **Course Generator (`/course-generator`)**: Interface for creating new courses
- **Course Library (`/courses`)**: Browse available courses with filtering and search
- **Course Viewer (`/course/:id`)**: Interactive course player with progress tracking

## AWS Integration

### Overview
The platform supports seamless integration with AWS services for production-scale deployments:

### Services Used
- **AWS RDS PostgreSQL**: Scalable relational database for course and resource data
- **AWS S3**: Cloud storage for uploaded files, course materials, and exports
- **AWS IAM**: Access control and security policies
- **Optional CloudFront CDN**: Fast content delivery for media assets

### Configuration Files
- **AWS_SETUP_GUIDE.md**: Comprehensive setup instructions for AWS services
- **Backend Environment Variables**: Secure configuration for AWS credentials
- **Migration Scripts**: Automated tools for moving from local to cloud infrastructure

### Local vs Cloud Operation
The system intelligently detects the environment and uses appropriate services:
- **Local Development**: SQLite databases and local file storage
- **Production**: AWS RDS and S3 with automatic failover to local services
- **Hybrid Mode**: Can use cloud database with local storage or vice versa

### Migration Process
```bash
# Test migration first
python backend/migrate_to_cloud.py --dry-run

# Run actual migration
python backend/migrate_to_cloud.py
```

## Authentication & Session Management

### Features
- **User Registration & Login**: Secure user account creation and authentication
- **JWT-Based Sessions**: Stateless authentication with secure token handling
- **Course Enrollment**: User progress tracking across multiple courses
- **Role-Based Access**: Different permissions for students, instructors, and administrators

### Security
- **Password Hashing**: Secure password storage with bcrypt
- **Environment Variables**: All secrets managed through secure environment configuration
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Pydantic models ensure data integrity

## Apache Superset Data Explorer Integration

### Overview
The Data Explorer feature provides enterprise-grade business intelligence and advanced data visualization capabilities through Apache Superset integration. This feature transforms the platform from a simple data management tool into a comprehensive analytics platform.

### Key Features
- **Embedded Dashboards**: Interactive Superset dashboards embedded directly in the web interface
- **Custom Dashboard Creation**: Automatically generate dashboards for uploaded datasets
- **SQL Query Interface**: Execute read-only SQL queries directly through the web interface
- **Guest Token Authentication**: Secure, time-limited access to dashboards without requiring Superset accounts
- **Data Alerting**: Set up automated email alerts based on data thresholds and conditions
- **Multi-user Support**: User-specific dashboard access and permissions

### Data Explorer Page (`/data-explorer`)
The Data Explorer provides multiple tabs for different analytics functions:
- **Dashboard View**: Browse and interact with existing Superset dashboards
- **Query Builder**: Execute custom SQL queries with results visualization
- **Dataset Upload**: Upload new datasets and automatically create visualizations
- **Alert Management**: Configure data monitoring alerts and notifications

### Technical Architecture
```
Data Explorer Flow:
├── Frontend (DataExplorer.jsx)
│   ├── @superset-ui/embedded-sdk for dashboard embedding
│   ├── Tabbed interface for different analytics functions
│   └── Real-time data visualization
├── Backend (superset_service.py)
│   ├── Superset API integration
│   ├── JWT guest token generation
│   ├── Dashboard CRUD operations
│   └── SQL query proxy with security validation
└── Superset Instance
    ├── Dashboard creation and management
    ├── SQL execution engine
    └── Alert and notification system
```

### Environment Configuration
Required environment variables for Superset integration:
```env
SUPERSET_URL=http://localhost:8088
SUPERSET_GUEST_TOKEN_SECRET=your-secret-key
SUPERSET_ADMIN_USERNAME=admin
SUPERSET_ADMIN_PASSWORD=admin
```

### Security Features
- **Query Validation**: Only SELECT statements allowed, blocks INSERT/UPDATE/DELETE
- **Guest Token Expiry**: 5-minute token expiration for embedded dashboards
- **User Isolation**: Dashboard access restricted by user permissions
- **API Rate Limiting**: Prevents abuse of Superset API endpoints

### Integration with Data Bank
- **Auto-Dashboard Creation**: Uploaded datasets automatically get visualization dashboards
- **Resource Linking**: Data Bank resources can be directly visualized in Superset
- **Metadata Sync**: Dataset metadata synchronized between Data Bank and Superset
- **File Format Support**: CSV, JSON, Excel files automatically ingested into Superset

### Current Limitations & Setup
- **Missing Dependencies**: Requires `@superset-ui/embedded-sdk` frontend package
- **SQLAlchemy Requirement**: Backend needs `sqlalchemy` for database operations
- **Superset Instance**: Requires separate Apache Superset installation
- **Configuration Setup**: Manual Superset configuration needed for first-time setup

### Installation & Setup
```bash
# Install missing frontend dependency
cd frontend
npm install @superset-ui/embedded-sdk

# Install missing backend dependencies
cd backend
poetry add sqlalchemy requests PyJWT

# Set up Apache Superset (separate installation)
# Follow official Superset documentation for installation
```

## Deployment & Production

### Recent Fixes & Improvements (August 2024)
- **Database Configuration**: Fixed SQLAlchemy ArgumentError on production deployment
- **Placeholder Value Detection**: Added validation to detect and handle .env.example placeholder values
- **Graceful Fallback**: Improved error handling with automatic fallback to SQLite when AWS RDS is misconfigured
- **Security Enhancements**: Updated .gitignore to exclude sensitive environment files from repository
- **Environment Validation**: Enhanced environment variable validation for production deployments
- **DataBank API Fixes**: Fixed static method calls in `/api/databank/resources` and `/api/databank/stats` endpoints
- **Sample Data Population**: Added comprehensive seed data with 19+ resources across multiple formats and categories
- **DataBank Frontend**: Resolved issue preventing data resources from displaying on the DataBank page

### Production Deployment on Render
The application is configured to deploy on Render platform with the following considerations:

**Environment Variables Required:**
- **AWS RDS Configuration**: 
  - `AWS_RDS_ENDPOINT`: Your actual RDS endpoint
  - `AWS_RDS_USERNAME`: Database username  
  - `AWS_RDS_PASSWORD`: Database password
  - `AWS_RDS_DB_NAME`: Database name (default: gitthub)
  - `AWS_RDS_PORT`: Database port (default: 5432)

- **AWS S3 Configuration**:
  - `AWS_ACCESS_KEY_ID`: AWS access key
  - `AWS_SECRET_ACCESS_KEY`: AWS secret key
  - `AWS_REGION`: AWS region (default: us-west-2)
  - `AWS_S3_BUCKET`: S3 bucket name

- **Security**:
  - `JWT_SECRET_KEY`: JWT signing secret (auto-generated by Render)

**Deployment Behavior:**
1. **Production Mode**: Automatically detected when `RENDER` environment variable is set
2. **Database Fallback**: If AWS RDS credentials are invalid or contain placeholder values, falls back to SQLite
3. **Storage Fallback**: If AWS S3 credentials are invalid, falls back to local file storage
4. **Health Check**: Available at `/health` endpoint for monitoring

### Troubleshooting Deployment Issues

**Common Issues:**
1. **"Could not translate host name" Error**: 
   - Caused by placeholder values in AWS environment variables
   - Fixed by validating environment variables and falling back to SQLite
   
2. **SQLAlchemy ArgumentError**: 
   - Caused by None or invalid DATABASE_URL values
   - Fixed by improved error handling and environment validation

3. **Missing Environment Variables**:
   - Render dashboard must have all required environment variables set
   - Use render.yaml with `sync: false` for sensitive values

**Security Best Practices:**
- Environment files (.env) are excluded from git repository
- Use Render's environment variable dashboard for sensitive credentials
- Regular rotation of AWS credentials and JWT secrets
- Enable AWS CloudTrail for access monitoring

## Additional Documentation

### Setup Guides
- **AWS_SETUP_GUIDE.md**: Step-by-step AWS configuration for production deployment
- **static/docs/DEPLOYMENT.md**: General deployment instructions for various platforms

### Feature Specifications
- **static/docs/AI_LEARNING_COURSES_SPEC.md**: Detailed specifications for AI course generation
- **static/docs/COURSE_GENERATOR_README.md**: Course generator implementation details

### Development Tools
- **Backend Migration**: `python backend/migrate_to_cloud.py` for cloud migration
- **AWS Setup**: `python backend/setup_aws.py` for AWS configuration
- **Course Generation**: Visit `/course-generator` to create AI-powered courses
- **Course Library**: Visit `/courses` to browse available learning experiences
- **Data Analytics**: Visit `/data-explorer` for advanced data visualization and BI dashboards

### Quick Start for New Features
1. **Generate a Course**: Use the Course Generator with Data Bank resources
2. **Explore Data**: Use the Data Explorer for advanced analytics and visualization
3. **Set up AWS**: Follow AWS_SETUP_GUIDE.md for production deployment
4. **Set up Superset**: Install Apache Superset for enterprise analytics capabilities
5. **Test Cloud Migration**: Run migration scripts with `--dry-run` flag first
6. **Explore API**: Check `/docs` endpoint for interactive API documentation

### Missing Dependencies Setup
If you encounter import errors, install these missing dependencies:
```bash
# Frontend
cd frontend
npm install @superset-ui/embedded-sdk

# Backend  
cd backend
poetry add sqlalchemy requests PyJWT
```