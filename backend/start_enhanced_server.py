#!/usr/bin/env python3
"""
Startup script for gitthub DataBank with AWS integration
Run this to start the enhanced API with AWS RDS and S3 support
"""

import os
import sys
import subprocess
import logging
from pathlib import Path

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def check_dependencies():
    """Check if required dependencies are installed"""
    logger.info("Checking dependencies...")
    
    required_packages = [
        'fastapi',
        'uvicorn',
        'sqlalchemy',
        'psycopg2-binary',
        'boto3',
        'python-dotenv',
        'python-multipart'
    ]
    
    missing = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            missing.append(package)
    
    if missing:
        logger.warning(f"Missing packages: {', '.join(missing)}")
        logger.info("Installing missing packages...")
        subprocess.run([sys.executable, '-m', 'pip', 'install'] + missing)
        logger.info("✅ Dependencies installed")
    else:
        logger.info("✅ All dependencies are installed")

def setup_environment():
    """Setup environment variables for AWS"""
    logger.info("Setting up environment...")
    
    # Enable AWS mode
    os.environ['ENABLE_AWS'] = 'true'
    
    # Check if .env file exists
    env_file = Path(__file__).parent / '.env'
    if env_file.exists():
        logger.info("✅ .env file found")
        from dotenv import load_dotenv
        load_dotenv()
    else:
        logger.warning("⚠️ .env file not found. AWS features may not work properly.")

def test_aws_connection():
    """Quick test of AWS connection"""
    logger.info("Testing AWS connection...")
    
    try:
        from enhanced_aws_database import enhanced_aws_repo, IS_PRODUCTION
        
        if IS_PRODUCTION:
            stats = enhanced_aws_repo.get_stats()
            logger.info(f"✅ Connected to {stats.get('database_type', 'Unknown')}")
            logger.info(f"   Total resources: {stats.get('total_resources', 0)}")
            logger.info(f"   Documents: {stats.get('total_documents', 0)}")
            logger.info(f"   Links: {stats.get('total_links', 0)}")
            return True
        else:
            logger.warning("⚠️ Running in local mode (SQLite)")
            logger.info("   Check your AWS credentials in .env file")
            return False
    except Exception as e:
        logger.error(f"❌ AWS connection test failed: {e}")
        return False

def start_enhanced_api():
    """Start the enhanced API server"""
    logger.info("\n" + "="*60)
    logger.info("Starting Enhanced gitthub API Server")
    logger.info("="*60)
    
    api_file = Path(__file__).parent / 'enhanced_api.py'
    
    if not api_file.exists():
        logger.error(f"❌ Enhanced API file not found: {api_file}")
        return False
    
    logger.info("🚀 Starting server on http://localhost:8001")
    logger.info("📚 API Documentation: http://localhost:8001/docs")
    logger.info("🔗 Interactive API: http://localhost:8001/redoc")
    logger.info("\nPress Ctrl+C to stop the server\n")
    
    try:
        subprocess.run([
            sys.executable, '-m', 'uvicorn',
            'enhanced_api:app',
            '--host', '0.0.0.0',
            '--port', '8001',
            '--reload'
        ], cwd=api_file.parent)
    except KeyboardInterrupt:
        logger.info("\n✅ Server stopped")
        return True
    except Exception as e:
        logger.error(f"❌ Failed to start server: {e}")
        return False

def main():
    """Main function"""
    logger.info("\n" + "🚀 " * 20)
    logger.info("GITTHUB ENHANCED DATABANK STARTUP")
    logger.info("🚀 " * 20 + "\n")
    
    # Check and install dependencies
    check_dependencies()
    
    # Setup environment
    setup_environment()
    
    # Test AWS connection
    aws_connected = test_aws_connection()
    
    if not aws_connected:
        response = input("\nAWS is not connected. Continue with local mode? (y/n): ")
        if response.lower() != 'y':
            logger.info("Exiting...")
            return 0
    
    # Start the enhanced API
    if start_enhanced_api():
        return 0
    else:
        return 1

if __name__ == "__main__":
    sys.exit(main())
