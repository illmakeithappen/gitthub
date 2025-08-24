#!/usr/bin/env python3
"""
AWS RDS Schema Migration Script
Adds missing columns to existing data_resources table to match SQLAlchemy model
"""
import os
import sys
from sqlalchemy import create_engine, text, Column, String, Integer, Text, DateTime, Boolean, Float, JSON
from sqlalchemy.exc import OperationalError, ProgrammingError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_rds_connection():
    """Get AWS RDS database connection"""
    RDS_ENDPOINT = os.getenv("AWS_RDS_ENDPOINT")
    RDS_PORT = os.getenv("AWS_RDS_PORT", "5432")
    RDS_DB_NAME = os.getenv("AWS_RDS_DB_NAME", "gitthub")
    RDS_USERNAME = os.getenv("AWS_RDS_USERNAME")
    RDS_PASSWORD = os.getenv("AWS_RDS_PASSWORD")
    
    if not all([RDS_ENDPOINT, RDS_USERNAME, RDS_PASSWORD]):
        print("❌ Missing AWS RDS credentials in environment variables")
        return None
    
    DATABASE_URL = f"postgresql://{RDS_USERNAME}:{RDS_PASSWORD}@{RDS_ENDPOINT}:{RDS_PORT}/{RDS_DB_NAME}"
    
    try:
        engine = create_engine(DATABASE_URL, echo=True)
        return engine
    except Exception as e:
        print(f"❌ Failed to connect to AWS RDS: {e}")
        return None

def check_table_schema(engine, table_name):
    """Check current table schema"""
    try:
        with engine.connect() as conn:
            result = conn.execute(text(f"""
                SELECT column_name, data_type, is_nullable
                FROM information_schema.columns 
                WHERE table_name = '{table_name}'
                ORDER BY ordinal_position;
            """))
            columns = result.fetchall()
            return columns
    except Exception as e:
        print(f"❌ Error checking table schema: {e}")
        return []

def add_missing_columns(engine):
    """Add missing columns to data_resources table"""
    
    # Define missing columns that need to be added
    missing_columns = [
        ("s3_bucket", "VARCHAR"),
        ("s3_key", "VARCHAR"),
    ]
    
    # Check current schema
    print("📊 Checking current data_resources table schema...")
    current_columns = check_table_schema(engine, "data_resources")
    
    if not current_columns:
        print("❌ Could not retrieve table schema")
        return False
    
    print("Current columns:")
    for col in current_columns:
        print(f"  - {col[0]} ({col[1]}) - nullable: {col[2]}")
    
    # Check which columns are missing
    current_column_names = [col[0] for col in current_columns]
    columns_to_add = [col for col in missing_columns if col[0] not in current_column_names]
    
    if not columns_to_add:
        print("✅ All required columns already exist!")
        return True
    
    print(f"\n📝 Adding {len(columns_to_add)} missing columns...")
    
    try:
        with engine.connect() as conn:
            # Start a transaction
            trans = conn.begin()
            
            for col_name, col_type in columns_to_add:
                print(f"  Adding column: {col_name} ({col_type})")
                
                # Add the column
                alter_sql = f"ALTER TABLE data_resources ADD COLUMN {col_name} {col_type};"
                conn.execute(text(alter_sql))
            
            # Commit the transaction
            trans.commit()
            print("✅ Successfully added missing columns!")
            return True
            
    except Exception as e:
        print(f"❌ Error adding columns: {e}")
        if 'trans' in locals():
            trans.rollback()
        return False

def verify_schema(engine):
    """Verify the final schema matches our requirements"""
    print("\n🔍 Verifying final schema...")
    
    required_columns = [
        "id", "title", "description", "format", "category", 
        "workflow_categories", "tags", "s3_bucket", "s3_key", 
        "file_url", "file_path", "file_size", "file_metadata",
        "created_at", "updated_at", "author", "access_count", 
        "is_public", "preview_data"
    ]
    
    current_columns = check_table_schema(engine, "data_resources")
    current_column_names = [col[0] for col in current_columns]
    
    missing = [col for col in required_columns if col not in current_column_names]
    
    if missing:
        print(f"⚠️  Still missing columns: {missing}")
        return False
    else:
        print("✅ All required columns are present!")
        return True

def main():
    print("🚀 AWS RDS Schema Migration Tool")
    print("=" * 50)
    
    # Get database connection
    engine = get_rds_connection()
    if not engine:
        sys.exit(1)
    
    print("✅ Connected to AWS RDS PostgreSQL")
    
    # Add missing columns
    success = add_missing_columns(engine)
    if not success:
        print("❌ Migration failed!")
        sys.exit(1)
    
    # Verify schema
    verify_success = verify_schema(engine)
    if not verify_success:
        print("⚠️  Schema verification failed!")
        sys.exit(1)
    
    print("\n🎉 Migration completed successfully!")
    print("The data_resources table now has all required columns.")

if __name__ == "__main__":
    main()