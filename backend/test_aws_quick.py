#!/usr/bin/env python3
"""
Quick test to verify AWS integration is working
Run this to test AWS RDS and S3 connectivity
"""

import os
import sys
import logging
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def test_aws_credentials():
    """Check if AWS credentials are configured"""
    logger.info("Checking AWS credentials...")
    
    rds_endpoint = os.getenv("AWS_RDS_ENDPOINT")
    rds_username = os.getenv("AWS_RDS_USERNAME")
    rds_password = os.getenv("AWS_RDS_PASSWORD")
    
    s3_access_key = os.getenv("AWS_ACCESS_KEY_ID")
    s3_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
    s3_bucket = os.getenv("AWS_S3_BUCKET")
    
    has_rds = all([rds_endpoint, rds_username, rds_password])
    has_s3 = all([s3_access_key, s3_secret_key, s3_bucket])
    
    if has_rds:
        logger.info(f"✅ RDS configured: {rds_endpoint}")
    else:
        logger.warning("⚠️ RDS credentials missing")
    
    if has_s3:
        logger.info(f"✅ S3 configured: {s3_bucket}")
    else:
        logger.warning("⚠️ S3 credentials missing")
    
    return has_rds, has_s3

def test_rds_connection():
    """Test RDS database connection"""
    logger.info("\nTesting RDS connection...")
    
    # Enable AWS mode
    os.environ['ENABLE_AWS'] = 'true'
    
    try:
        from enhanced_aws_database import enhanced_aws_repo, IS_PRODUCTION
        
        if IS_PRODUCTION:
            # Try to get stats
            stats = enhanced_aws_repo.get_stats()
            logger.info(f"✅ Connected to: {stats.get('database_type')}")
            logger.info(f"   Total resources: {stats.get('total_resources')}")
            logger.info(f"   Documents: {stats.get('total_documents')}")
            logger.info(f"   Links: {stats.get('total_links')}")
            return True
        else:
            logger.warning("⚠️ Not in production mode, using SQLite")
            return False
    except Exception as e:
        logger.error(f"❌ RDS connection failed: {e}")
        return False

def test_s3_connection():
    """Test S3 storage connection"""
    logger.info("\nTesting S3 connection...")
    
    try:
        from aws_s3_storage import aws_s3_storage
        
        if aws_s3_storage.is_production:
            # Try to list files
            files = aws_s3_storage.list_files(max_results=5)
            logger.info(f"✅ Connected to S3 bucket: {aws_s3_storage.bucket_name}")
            logger.info(f"   Files in bucket: {len(files)}")
            return True
        else:
            logger.warning("⚠️ S3 not configured, using local storage")
            return False
    except Exception as e:
        logger.error(f"❌ S3 connection failed: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints"""
    logger.info("\nTesting API endpoints...")
    
    try:
        import requests
        
        # Check if server is running
        response = requests.get("http://localhost:8001/health", timeout=2)
        if response.status_code == 200:
            data = response.json()
            logger.info("✅ API server is running")
            logger.info(f"   Database: {data.get('database')}")
            logger.info(f"   Storage: {data.get('storage')}")
            
            # Test stats endpoint
            stats = requests.get("http://localhost:8001/api/stats").json()
            logger.info(f"   Total resources: {stats.get('totalResources', 0)}")
            logger.info(f"   Documents: {stats.get('documentsCount', 0)}")
            logger.info(f"   Links: {stats.get('linksCount', 0)}")
            
            return True
    except requests.exceptions.ConnectionError:
        logger.warning("⚠️ API server not running. Start with: python start_enhanced_server.py")
        return False
    except Exception as e:
        logger.error(f"❌ API test failed: {e}")
        return False

def main():
    """Main test function"""
    logger.info("=" * 60)
    logger.info("AWS INTEGRATION QUICK TEST")
    logger.info("=" * 60)
    
    # Test credentials
    has_rds, has_s3 = test_aws_credentials()
    
    # Test RDS
    rds_ok = test_rds_connection()
    
    # Test S3
    s3_ok = test_s3_connection()
    
    # Test API
    api_ok = test_api_endpoints()
    
    # Summary
    logger.info("\n" + "=" * 60)
    logger.info("TEST SUMMARY")
    logger.info("=" * 60)
    
    all_tests = [
        ("AWS RDS Credentials", has_rds),
        ("AWS S3 Credentials", has_s3),
        ("RDS Connection", rds_ok),
        ("S3 Connection", s3_ok),
        ("API Endpoints", api_ok)
    ]
    
    for test_name, result in all_tests:
        status = "✅ PASS" if result else "❌ FAIL"
        logger.info(f"{test_name:.<30} {status}")
    
    passed = sum(1 for _, r in all_tests if r)
    total = len(all_tests)
    
    logger.info(f"\nTests passed: {passed}/{total}")
    
    if passed == total:
        logger.info("\n🎉 All tests passed! AWS integration is working correctly.")
    elif passed > 0:
        logger.info("\n⚠️ Some tests failed. Check the logs above for details.")
    else:
        logger.info("\n❌ All tests failed. Please check your configuration.")
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())
