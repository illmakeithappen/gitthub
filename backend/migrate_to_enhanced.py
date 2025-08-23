#!/usr/bin/env python3
"""
Migration script to update the existing API to use enhanced features
This script backs up the original API and replaces it with the enhanced version
"""

import os
import shutil
from datetime import datetime
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def backup_original_files():
    """Backup original API and database files"""
    logger.info("Creating backups...")
    
    backup_dir = Path(__file__).parent / f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    backup_dir.mkdir(exist_ok=True)
    
    files_to_backup = [
        'api.py',
        'aws_database.py',
        'database.py',
        'models.py'
    ]
    
    for file in files_to_backup:
        src = Path(__file__).parent / file
        if src.exists():
            dst = backup_dir / file
            shutil.copy2(src, dst)
            logger.info(f"  ✅ Backed up {file}")
    
    logger.info(f"✅ Backups created in {backup_dir}")
    return backup_dir

def update_api_imports():
    """Update the main API to use enhanced features"""
    logger.info("Updating API imports...")
    
    api_file = Path(__file__).parent / 'api.py'
    enhanced_api = Path(__file__).parent / 'enhanced_api.py'
    
    if enhanced_api.exists():
        # Read the enhanced API content
        with open(enhanced_api, 'r') as f:
            content = f.read()
        
        # Write to main API file
        with open(api_file, 'w') as f:
            f.write(content)
        
        logger.info("✅ API updated with enhanced features")
    else:
        logger.error("❌ Enhanced API file not found")
        return False
    
    return True

def update_database_module():
    """Update the AWS database module"""
    logger.info("Updating database module...")
    
    aws_db_file = Path(__file__).parent / 'aws_database.py'
    enhanced_db = Path(__file__).parent / 'enhanced_aws_database.py'
    
    if enhanced_db.exists():
        # Read the enhanced database content
        with open(enhanced_db, 'r') as f:
            content = f.read()
        
        # Write to AWS database file
        with open(aws_db_file, 'w') as f:
            f.write(content)
        
        logger.info("✅ Database module updated with links support")
    else:
        logger.error("❌ Enhanced database file not found")
        return False
    
    return True

def update_requirements():
    """Update requirements.txt with new dependencies"""
    logger.info("Updating requirements...")
    
    requirements_file = Path(__file__).parent / 'requirements.txt'
    
    # Read existing requirements
    existing = set()
    if requirements_file.exists():
        with open(requirements_file, 'r') as f:
            existing = set(line.strip() for line in f if line.strip() and not line.startswith('#'))
    
    # Add new requirements
    new_requirements = {
        'fastapi>=0.116.0',
        'uvicorn[standard]>=0.35.0',
        'sqlalchemy>=2.0.0',
        'psycopg2-binary>=2.9.0',
        'boto3>=1.34.0',
        'python-dotenv>=1.0.0',
        'python-multipart>=0.0.6',
        'pydantic>=2.0.0',
        'aiofiles>=23.0.0'
    }
    
    # Combine and sort
    all_requirements = existing.union(new_requirements)
    sorted_requirements = sorted(all_requirements)
    
    # Write back
    with open(requirements_file, 'w') as f:
        f.write('\n'.join(sorted_requirements))
        f.write('\n')
    
    logger.info("✅ Requirements updated")

def verify_migration():
    """Verify the migration was successful"""
    logger.info("\nVerifying migration...")
    
    try:
        # Try importing the updated modules
        from api import app
        from aws_database import enhanced_aws_repo
        
        logger.info("✅ All imports successful")
        
        # Check for new endpoints
        routes = [route.path for route in app.routes]
        required_routes = ['/api/links', '/api/databank/resources/add-link']
        
        for route in required_routes:
            if any(route in r for r in routes):
                logger.info(f"  ✅ Found endpoint: {route}")
            else:
                logger.warning(f"  ⚠️ Missing endpoint: {route}")
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Verification failed: {e}")
        return False

def main():
    """Main migration function"""
    logger.info("\n" + "🔄 " * 20)
    logger.info("GITTHUB API ENHANCEMENT MIGRATION")
    logger.info("🔄 " * 20 + "\n")
    
    # Create backups
    backup_dir = backup_original_files()
    
    # Update API
    if not update_api_imports():
        logger.error("Migration failed at API update")
        return 1
    
    # Update database
    if not update_database_module():
        logger.error("Migration failed at database update")
        return 1
    
    # Update requirements
    update_requirements()
    
    # Verify migration
    if verify_migration():
        logger.info("\n" + "✅ " * 20)
        logger.info("MIGRATION COMPLETED SUCCESSFULLY!")
        logger.info("✅ " * 20)
        logger.info(f"\nBackups saved in: {backup_dir}")
        logger.info("\nNext steps:")
        logger.info("1. Run: python test_enhanced_databank.py")
        logger.info("2. Start server: python start_enhanced_server.py")
        logger.info("3. Or directly: uvicorn api:app --reload --port 8001")
        return 0
    else:
        logger.error("\n❌ Migration verification failed")
        logger.info(f"Restore from backup: {backup_dir}")
        return 1

if __name__ == "__main__":
    import sys
    sys.exit(main())
