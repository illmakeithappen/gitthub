# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern **FastAPI + React** web application for gitthub.org - an AI and Data Science company. The platform serves as a professional website showcasing data journalism articles, AI solutions, and educational resources through interactive visualizations and modern web interfaces.

## Architecture

### Current Stack
- **Backend**: FastAPI (Python) - REST API server with auto-reloading development server
- **Frontend**: React 18 + Vite - Modern, component-based frontend with hot module replacement
- **Styling**: Styled Components - Component-scoped CSS-in-JS
- **Build Tools**: Vite for fast development and optimized production builds
- **Containerization**: Docker & Docker Compose for development and deployment

### Application Structure
```
website/
├── backend/                    # FastAPI backend
│   ├── api.py                 # Main FastAPI application with CORS, API endpoints
│   ├── requirements.txt       # Python dependencies (FastAPI, Uvicorn, Pydantic)
│   └── Dockerfile            # Backend container configuration
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable React components (Header, Footer)
│   │   ├── pages/           # Page components (Home, About, Services, Contact)
│   │   ├── App.jsx          # Main React app with routing
│   │   ├── main.jsx         # React DOM entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Node.js dependencies and scripts
│   ├── vite.config.js       # Vite configuration with API proxy
│   ├── index.html           # HTML template
│   └── Dockerfile           # Frontend container configuration
├── static/                  # Static assets (images, documents, CSS, JS)
├── docker-compose.yml       # Development orchestration
└── render.yaml             # Production deployment configuration
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
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001 (or 8000 with Docker)
- API Docs: http://localhost:8001/docs

### Dependency Management

**Backend:**
```bash
cd backend
pip install -r requirements.txt

# Add new Python dependency
pip install <package_name>
pip freeze > requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install

# Add new package
npm install <package_name>
```

## API Endpoints

The FastAPI backend provides the following endpoints:
- `GET /` - API root welcome message
- `GET /api/features` - Platform features data
- `GET /api/stats` - Platform statistics (features count, messages, version)
- `POST /api/contact` - Submit contact form (accepts name, email, message)
- `GET /api/contact-messages` - Retrieve all contact messages (admin endpoint)

## Key Features & Components

### React Frontend Components
- **Header.jsx**: Navigation with active route highlighting and responsive design
- **Footer.jsx**: Multi-column footer with company info and links
- **Home.jsx**: Hero section, features grid with API integration, stats display
- **About.jsx**: Company mission and technology information
- **Services.jsx**: Service offerings with interactive cards and CTA section
- **Contact.jsx**: Functional contact form with API integration and validation

### Styling System
- **Styled Components**: Component-scoped styling with dynamic props
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Brand Colors**: 
  - Primary gradient: #667eea to #764ba2
  - Background: #f8f9fa
  - Text: #2d3748 (dark), #4a5568 (medium)
- **Interactive Elements**: Hover effects, smooth transitions, form validation states

### FastAPI Backend Features
- **CORS Configuration**: Enabled for frontend communication
- **Pydantic Models**: Type validation for ContactMessage and Feature data
- **In-memory Storage**: Contact messages and features data (production would use database)
- **Auto-reload**: Development server with automatic reloading on file changes

## Development Notes

### Environment Setup
- **Node.js**: Required for frontend development (React + Vite)
- **Python 3.9+**: Required for backend development (FastAPI)
- **Port Configuration**: Frontend (3000), Backend (8001), with Vite proxy for API calls

### Data Management
- Contact form submissions stored in-memory (backend/api.py)
- Static assets served from `static/` directory
- API proxy configuration in `vite.config.js` handles `/api/*` routes

### Development Workflow
- **Hot Reloading**: Both frontend (Vite) and backend (Uvicorn --reload) support live updates
- **Component Development**: React components are modular and reusable
- **API Integration**: Axios handles HTTP requests with error handling and fallback data
- **Responsive Testing**: Components adapt to different screen sizes automatically