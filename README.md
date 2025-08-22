# gitthub.org - AI & Data Science Company

A modern web application built with FastAPI backend and React frontend for showcasing data journalism, AI solutions, and educational resources.

## Architecture

- **Backend**: FastAPI (Python) - REST API server
- **Frontend**: React with Vite - Modern web interface
- **Styling**: Styled Components
- **Deployment**: Docker & Docker Compose ready

## Quick Start

### Development Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd website
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
uvicorn api:app --reload
```
Backend will be available at http://localhost:8000

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at http://localhost:3000

### Using Docker Compose

```bash
# Start both services
docker-compose up --build

# Backend: http://localhost:8000
# Frontend: http://localhost:3000
```

## Project Structure

```
website/
├── backend/                 # FastAPI backend
│   ├── api.py              # Main API application
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         
├── frontend/               # React frontend
│   ├── src/               # React source code
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── App.jsx       # Main app component
│   ├── package.json       # Node.js dependencies
│   └── vite.config.js     # Vite configuration
├── static/                # Static assets
├── docker-compose.yml     # Development orchestration
└── render.yaml           # Production deployment config
```

## Features

- **Responsive Design**: Mobile-first responsive web interface
- **Modern Stack**: FastAPI + React + Vite for fast development
- **Interactive UI**: Styled components with smooth animations
- **API Integration**: Real-time data from FastAPI backend
- **Contact Form**: Functional contact form with API integration
- **Docker Ready**: Containerized for easy deployment

## API Endpoints

- `GET /` - API root
- `GET /api/features` - Get platform features
- `GET /api/stats` - Get platform statistics
- `POST /api/contact` - Submit contact form
- `GET /api/contact-messages` - Get contact messages (admin)

## Deployment

The application is configured for deployment on Render.com using the included `render.yaml` configuration.

## Development

- **Backend**: Auto-reloads on file changes with `--reload` flag
- **Frontend**: Hot module replacement with Vite
- **Linting**: ESLint configured for React best practices
- **Styling**: Styled Components for component-scoped CSS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

© 2025 gitthub. All rights reserved.