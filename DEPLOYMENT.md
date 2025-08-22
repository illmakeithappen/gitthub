# Deployment Guide for gitthub.org

## Overview
This guide explains how to deploy the gitthub website on Render with separate backend (FastAPI) and frontend (React) services.

## Project Structure
```
website/
├── backend/
│   ├── api.py           # FastAPI backend
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── src/            # React source code
│   ├── dist/           # Built files (created after build)
│   ├── package.json    # Node dependencies
│   ├── server.js       # Express server for production
│   └── vite.config.js  # Vite configuration
└── render.yaml         # Render deployment configuration
```

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Update frontend and deployment configuration"
git push origin main
```

### 2. Deploy on Render

#### Option A: Using render.yaml (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Select the branch (main)
5. Render will automatically create services based on render.yaml

#### Option B: Manual Deployment
If the Blueprint doesn't work, create services manually:

**Backend Service:**
1. New → Web Service
2. Connect GitHub repo
3. Settings:
   - Name: `gitthub-api`
   - Runtime: Python
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn api:app --host 0.0.0.0 --port $PORT`
   - Add Environment Variable: `PYTHON_VERSION` = `3.11.0`

**Frontend Service:**
1. New → Web Service
2. Connect GitHub repo
3. Settings:
   - Name: `gitthub-frontend`
   - Runtime: Node
   - Build Command: `cd frontend && npm install && npm run build`
   - Start Command: `cd frontend && npm run start`
   - Add Environment Variables:
     - `NODE_VERSION` = `20.11.0`
     - `VITE_API_URL` = `https://gitthub-api.onrender.com` (use your backend URL)

### 3. Update API URLs
After deployment, update the frontend environment variable:
- Go to frontend service settings
- Update `VITE_API_URL` to point to your deployed backend URL

### 4. Domain Configuration (Optional)
1. Go to service settings
2. Add custom domain (gitthub.org)
3. Configure DNS records as instructed by Render

## Environment Variables

### Backend
- `PORT`: Automatically set by Render
- `PYTHON_VERSION`: 3.11.0
- `ALLOWED_ORIGINS`: Add your frontend URL

### Frontend
- `PORT`: Automatically set by Render
- `NODE_VERSION`: 20.11.0
- `VITE_API_URL`: Your backend API URL

## Troubleshooting

### Frontend not building
- Check Node version compatibility
- Ensure all dependencies are in package.json
- Check build logs for specific errors

### API connection issues
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running and healthy

### 404 errors on routes
- The Express server handles client-side routing
- Ensure server.js is serving index.html for all routes

## Local Development
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn api:app --reload --port 8001

# Frontend
cd frontend
npm install
npm run dev
```

## Updates and Maintenance
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Render will auto-deploy on push to main branch

## Support
- Check Render logs for detailed error messages
- Backend health check: https://gitthub-api.onrender.com/health
- API documentation: https://gitthub-api.onrender.com/docs