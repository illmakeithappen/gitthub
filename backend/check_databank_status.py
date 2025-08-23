#!/usr/bin/env python3
"""
Check DataBank Status and Database Connection
This script verifies the DataBank is working properly
"""

import os
import sys
import logging
import json
from datetime import datetime
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def check_database_status():
    """Check the database connection and status"""
    
    logger.info("=" * 60)
    logger.info("DATABANK STATUS CHECK")
    logger.info("=" * 60)
    
    # Enable AWS mode
    os.environ['ENABLE_AWS'] = 'true'
    
    try:
        from enhanced_aws_database import enhanced_aws_repo, IS_PRODUCTION
        
        logger.info(f"\n✅ Database Connection: {'AWS RDS' if IS_PRODUCTION else 'SQLite (Local)'}")
        
        # Get statistics
        stats = enhanced_aws_repo.get_stats()
        
        logger.info(f"\n📊 Database Statistics:")
        logger.info(f"   Database Type: {stats.get('database_type', 'Unknown')}")
        logger.info(f"   Total Resources: {stats.get('total_resources', 0)}")
        logger.info(f"   - Documents: {stats.get('total_documents', 0)}")
        logger.info(f"   - Links: {stats.get('total_links', 0)}")
        logger.info(f"   Total Courses: {stats.get('total_courses', 0)}")
        logger.info(f"   Total Experiences: {stats.get('total_experiences', 0)}")
        
        # Show resource formats
        if stats.get('resources_by_format'):
            logger.info(f"\n📁 Document Formats:")
            for format_type, count in stats['resources_by_format'].items():
                logger.info(f"   - {format_type}: {count}")
        
        # Show link categories
        if stats.get('link_categories'):
            logger.info(f"\n🏷️ Link Categories:")
            for category, count in stats['link_categories'].items():
                logger.info(f"   - {category}: {count}")
        
        # Show recent uploads
        if stats.get('recent_uploads'):
            logger.info(f"\n🆕 Recent Resources:")
            for resource in stats['recent_uploads']:
                logger.info(f"   - [{resource['type']}] {resource['title']}")
        
        # Show featured links
        if stats.get('featured_links'):
            logger.info(f"\n⭐ Featured Links:")
            for link in stats['featured_links']:
                logger.info(f"   - {link['title']} ({link.get('category', 'N/A')})")
        
        # Test search functionality
        logger.info(f"\n🔍 Testing Search Functionality:")
        
        # Search for all resources
        all_resources = enhanced_aws_repo.search_resources(limit=5)
        logger.info(f"   Found {len(all_resources)} resources (showing first 5)")
        
        # Search for links only
        links = enhanced_aws_repo.search_resources(resource_type='link', limit=5)
        logger.info(f"   Found {len(links)} links")
        
        # Search for documents only
        docs = enhanced_aws_repo.search_resources(resource_type='document', limit=5)
        logger.info(f"   Found {len(docs)} documents")
        
        # Test API endpoints
        logger.info(f"\n🌐 API Endpoints:")
        logger.info(f"   Main API: http://localhost:8001")
        logger.info(f"   API Docs: http://localhost:8001/docs")
        logger.info(f"   DataBank Stats: http://localhost:8001/api/databank/stats")
        logger.info(f"   Resources: http://localhost:8001/api/databank/resources")
        logger.info(f"   Links: http://localhost:8001/api/links")
        
        logger.info(f"\n💻 Frontend:")
        logger.info(f"   DataBank Page: http://localhost:3001/databank")
        logger.info(f"   (or http://localhost:3000/databank if using port 3000)")
        
        # Check AWS S3 if configured
        try:
            from aws_s3_storage import aws_s3_storage
            if aws_s3_storage:
                logger.info(f"\n☁️ AWS S3 Storage: ✅ Configured")
        except:
            logger.info(f"\n☁️ AWS S3 Storage: ❌ Not configured (using local storage)")
        
        logger.info(f"\n" + "=" * 60)
        logger.info("✅ DATABANK IS OPERATIONAL")
        logger.info("=" * 60)
        
        return True
        
    except Exception as e:
        logger.error(f"\n❌ Database check failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def check_api_health():
    """Check if the API is running"""
    try:
        import requests
        response = requests.get("http://localhost:8001/health")
        if response.status_code == 200:
            data = response.json()
            logger.info(f"\n✅ API Health Check:")
            logger.info(f"   Status: {data.get('status', 'unknown')}")
            logger.info(f"   Database: {data.get('database', 'unknown')}")
            logger.info(f"   Storage: {data.get('storage', 'unknown')}")
            return True
    except:
        logger.warning(f"\n⚠️ API not responding. Make sure to run: python start_enhanced_server.py")
        return False

def main():
    """Main function"""
    logger.info("\n" + "🔍 " * 20)
    logger.info("GITTHUB DATABANK STATUS CHECK")
    logger.info("🔍 " * 20 + "\n")
    
    # Check database
    db_ok = check_database_status()
    
    # Check API
    api_ok = check_api_health()
    
    if db_ok and api_ok:
        logger.info("\n✅ All systems operational!")
        logger.info("\n📝 Quick Start Guide:")
        logger.info("1. Backend is running at: http://localhost:8001")
        logger.info("2. Frontend should be at: http://localhost:3001")
        logger.info("3. Visit DataBank: http://localhost:3001/databank")
        logger.info("4. Use the Upload tab to add documents or links")
        logger.info("5. Browse Resources tab shows all documents and links")
        logger.info("6. Browse Courses tab shows available AI courses")
        return 0
    else:
        logger.error("\n❌ Some systems are not operational")
        logger.info("\n📝 Troubleshooting:")
        logger.info("1. Start backend: cd backend && python start_enhanced_server.py")
        logger.info("2. Start frontend: cd frontend && npm run dev")
        logger.info("3. Check .env file for AWS credentials")
        logger.info("4. Run populate script: python populate_ai_tools.py")
        return 1

if __name__ == "__main__":
    sys.exit(main())
