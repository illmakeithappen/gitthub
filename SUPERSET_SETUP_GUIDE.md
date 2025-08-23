# Apache Superset Integration Setup Guide for GitThub

## Overview

This guide walks you through setting up Apache Superset as the database viewer and exploratory data analysis (EDA) tool for GitThub.org. Superset provides enterprise-grade data exploration, visualization, and SQL querying capabilities.

## Features

- 🔍 **Direct Database Access**: SQL Lab for writing and executing queries
- 📊 **Interactive Dashboards**: Auto-generated visualizations for uploaded data
- 📈 **Real-time Analytics**: Live data exploration and analysis
- 🔐 **Row-Level Security**: User-specific data access controls
- 🎨 **GitThub Branded**: Custom theming matching your brand colors
- ⚡ **High Performance**: Redis caching and async query execution

## Quick Start

### 1. Prerequisites

- Docker and Docker Compose installed
- Node.js 16+ and npm
- Python 3.9+
- AWS credentials (optional, for cloud deployment)

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install @superset-ui/embedded-sdk axios
```

### 3. Set Environment Variables

Create a `.env` file in the project root:

```env
# Superset Configuration
SUPERSET_SECRET_KEY=your-very-secure-secret-key-change-this
SUPERSET_ADMIN_USERNAME=admin
SUPERSET_ADMIN_PASSWORD=SecurePassword123!
SUPERSET_ADMIN_EMAIL=admin@gitthub.org
GUEST_TOKEN_JWT_SECRET=another-secure-secret-key

# Database
DATABASE_URL=postgresql://superset:superset@localhost:5432/gitthub

# AWS (Optional)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
S3_BUCKET_NAME=gitthub-data

# Frontend
REACT_APP_SUPERSET_URL=http://localhost:8088
REACT_APP_API_URL=http://localhost:8001
```

### 4. Start Services with Docker Compose

```bash
# Start all services including Superset
docker-compose -f docker-compose.superset.yml up --build

# Or start services individually
docker-compose -f docker-compose.superset.yml up postgres redis
docker-compose -f docker-compose.superset.yml up superset
docker-compose -f docker-compose.superset.yml up backend frontend
```

### 5. Initialize Superset

The initialization happens automatically, but you can also run manually:

```bash
# Access Superset container
docker exec -it gitthub-superset bash

# Create admin user (if not exists)
superset fab create-admin \
  --username admin \
  --firstname Admin \
  --lastname User \
  --email admin@gitthub.org \
  --password admin

# Initialize database
superset db upgrade
superset init

# Run bootstrap script
python /app/pythonpath/bootstrap.py
```

## Accessing the Services

- **GitThub Frontend**: http://localhost:3000
- **Data Explorer**: http://localhost:3000/data-explorer
- **Superset Dashboard**: http://localhost:8088
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs

Default credentials:
- Username: `admin`
- Password: `admin` (change in production!)

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Frontend │────▶│  FastAPI Backend│────▶│ Apache Superset │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         │              ┌─────────────────┐     ┌─────────────────┐
         │              │                 │     │                 │
         └─────────────▶│   PostgreSQL    │     │      Redis      │
                        │                 │     │                 │
                        └─────────────────┘     └─────────────────┘
```

## Using the Data Explorer

### 1. Navigate to Data Explorer

Access the Data Explorer at http://localhost:3000/data-explorer

### 2. Main Dashboard

The main dashboard shows:
- Overview of all data resources
- Upload trends
- User activity heatmaps
- Resource distribution charts

### 3. SQL Lab

Write and execute SQL queries directly:

```sql
-- Example queries
SELECT * FROM databank.resources WHERE category = 'Machine Learning';
SELECT COUNT(*) as total, category FROM databank.resources GROUP BY category;
```

### 4. Upload Data for Automatic Dashboards

When you upload data through the Data Bank:
1. The system automatically creates a Superset dataset
2. Generates relevant visualizations based on data types
3. Creates an interactive dashboard
4. Makes it available in "My Dashboards"

## Customization

### Branding

The Superset instance is pre-configured with GitThub branding. To modify:

1. Edit `services/superset/superset_config.py`:

```python
GITTHUB_COLORS = {
    'black': '#1a1a1a',
    'beige': '#e8ddd4',
    'light_beige': '#f5f0eb',
    'gray': '#4a5568',
    'white': '#ffffff',
    'red': '#dc2626'
}
```

### Adding Custom Dashboards

```python
# In services/superset/bootstrap.py
def create_custom_dashboard():
    dashboard = Dashboard(
        dashboard_title="Your Custom Dashboard",
        slug="custom-dashboard",
        published=True,
        json_metadata={...}
    )
    db.session.add(dashboard)
    db.session.commit()
```

## Production Deployment on Render

### 1. Update render.yaml

Add Superset services to your `render.yaml`:

```yaml
services:
  - type: web
    name: gitthub-superset
    env: docker
    dockerfilePath: ./services/superset/Dockerfile
    envVars:
      - key: SUPERSET_SECRET_KEY
        generateValue: true
      - key: DATABASE_URL
        fromDatabase:
          name: gitthub-db
          property: connectionString
    
  - type: redis
    name: gitthub-redis
    plan: starter
    
  - type: worker
    name: superset-worker
    env: docker
    dockerCommand: celery --app=superset.tasks.celery_app:app worker
```

### 2. Configure Environment Variables

In Render dashboard, set:
- `SUPERSET_SECRET_KEY` (generate secure key)
- `GUEST_TOKEN_JWT_SECRET` (generate secure key)
- `SUPERSET_ADMIN_USERNAME` and `SUPERSET_ADMIN_PASSWORD`
- AWS credentials if using S3

### 3. Deploy

```bash
git add .
git commit -m "Add Superset integration"
git push origin main
```

## Troubleshooting

### Issue: Superset container fails to start

**Solution**: Check PostgreSQL is running and healthy:
```bash
docker-compose -f docker-compose.superset.yml ps
docker-compose -f docker-compose.superset.yml logs postgres
```

### Issue: Cannot embed dashboards

**Solution**: Ensure CORS is configured correctly:
```python
# In superset_config.py
ENABLE_CORS = True
CORS_OPTIONS = {
    'origins': ['http://localhost:3000', 'https://gitthub.org']
}
```

### Issue: Guest token errors

**Solution**: Verify JWT secrets match between services:
```bash
# Check backend
echo $GUEST_TOKEN_JWT_SECRET

# Should match in superset_config.py
GUEST_TOKEN_JWT_SECRET = os.getenv('GUEST_TOKEN_JWT_SECRET')
```

## Security Best Practices

1. **Change default passwords** immediately in production
2. **Use strong secret keys**: Generate with `openssl rand -hex 32`
3. **Enable HTTPS** in production
4. **Configure row-level security** for multi-tenant access
5. **Limit SQL Lab access** to trusted users
6. **Regular backups** of PostgreSQL database

## Advanced Features

### 1. Email Alerts

Configure SMTP in `superset_config.py`:

```python
SMTP_HOST = 'smtp.sendgrid.net'
SMTP_PORT = 587
SMTP_USER = 'your-smtp-user'
SMTP_PASSWORD = 'your-smtp-password'
```

### 2. Custom Visualizations

Add custom chart types:

```javascript
// In frontend code
import { ChartPlugin } from '@superset-ui/core';
import CustomChart from './CustomChart';

new ChartPlugin()
  .configure({ key: 'custom-chart' })
  .register();
```

### 3. API Integration

Use Superset's API for programmatic access:

```python
# In backend/superset_service.py
def create_chart_programmatically():
    response = requests.post(
        f"{SUPERSET_URL}/api/v1/chart/",
        json={
            'slice_name': 'Programmatic Chart',
            'viz_type': 'line',
            'datasource_id': 1,
            'params': {...}
        },
        headers={'Authorization': f'Bearer {token}'}
    )
```

## Monitoring

### Check Service Health

```bash
# All services status
docker-compose -f docker-compose.superset.yml ps

# Superset logs
docker-compose -f docker-compose.superset.yml logs -f superset

# Database connections
docker exec gitthub-postgres psql -U superset -c "\l"
```

### Performance Metrics

Access Superset's built-in monitoring at:
- http://localhost:8088/dashboard/list/
- http://localhost:8088/superset/sqllab/

## Support

For issues or questions:
1. Check the logs: `docker-compose logs superset`
2. Review Superset docs: https://superset.apache.org/docs/
3. Contact GitThub support: support@gitthub.org

## Next Steps

1. ✅ Verify all services are running
2. ✅ Access Data Explorer and run test queries
3. ✅ Upload sample data and check auto-generated dashboards
4. ✅ Configure production environment variables
5. ✅ Deploy to Render or your preferred platform

Congratulations! You now have a powerful data exploration platform integrated with GitThub.org! 🎉