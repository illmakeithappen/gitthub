#!/usr/bin/env python3
"""
Test AWS Connections
Verifies that RDS and S3 are properly configured
"""
import os
import sys
from dotenv import load_dotenv
import boto3
import psycopg2
from datetime import datetime

# Load environment variables
load_dotenv()

def test_rds_connection():
    """Test RDS PostgreSQL connection"""
    print("\n🔍 Testing RDS Connection...")
    print("-" * 40)
    
    endpoint = os.getenv("AWS_RDS_ENDPOINT")
    port = os.getenv("AWS_RDS_PORT", "5432")
    db_name = os.getenv("AWS_RDS_DB_NAME", "gitthub")
    username = os.getenv("AWS_RDS_USERNAME")
    password = os.getenv("AWS_RDS_PASSWORD")
    
    if not all([endpoint, username, password]):
        print("❌ Missing RDS credentials in .env file")
        return False
    
    try:
        # Connect to RDS
        conn = psycopg2.connect(
            host=endpoint,
            port=port,
            database=db_name,
            user=username,
            password=password,
            connect_timeout=10
        )
        
        # Test query
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
        
        print(f"✅ Connected to RDS PostgreSQL")
        print(f"   Endpoint: {endpoint}")
        print(f"   Database: {db_name}")
        print(f"   Version: {version.split(',')[0]}")
        
        # Check tables
        cursor.execute("""
            SELECT table_name FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        tables = cursor.fetchall()
        
        if tables:
            print(f"   Tables found: {len(tables)}")
            for table in tables[:5]:  # Show first 5 tables
                print(f"     - {table[0]}")
        else:
            print("   No tables found (run migration to create them)")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ RDS connection failed: {e}")
        return False

def test_s3_connection():
    """Test S3 bucket access"""
    print("\n🔍 Testing S3 Connection...")
    print("-" * 40)
    
    access_key = os.getenv("AWS_ACCESS_KEY_ID")
    secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
    region = os.getenv("AWS_REGION", "us-west-2")
    bucket_name = os.getenv("AWS_S3_BUCKET", "gitthub-databank")
    
    if not all([access_key, secret_key]):
        print("❌ Missing AWS credentials in .env file")
        return False
    
    try:
        # Create S3 client
        s3 = boto3.client(
            's3',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            region_name=region
        )
        
        # Check bucket exists
        s3.head_bucket(Bucket=bucket_name)
        print(f"✅ Connected to S3")
        print(f"   Bucket: {bucket_name}")
        print(f"   Region: {region}")
        
        # Test upload
        test_key = f"test/connection_test_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        test_content = f"Test upload from gitthub.org at {datetime.now()}"
        
        s3.put_object(
            Bucket=bucket_name,
            Key=test_key,
            Body=test_content.encode(),
            ContentType="text/plain"
        )
        print(f"   ✅ Upload test successful")
        
        # List objects
        response = s3.list_objects_v2(Bucket=bucket_name, MaxKeys=5)
        object_count = response.get('KeyCount', 0)
        print(f"   Objects in bucket: {object_count}")
        
        # Clean up test file
        s3.delete_object(Bucket=bucket_name, Key=test_key)
        
        return True
        
    except Exception as e:
        print(f"❌ S3 connection failed: {e}")
        return False

def test_aws_services():
    """Test all AWS services"""
    print("\n" + "="*50)
    print("  AWS Services Connection Test")
    print("="*50)
    
    # Check environment
    is_production = os.getenv("RENDER") is not None or os.getenv("AWS_RDS_ENDPOINT") is not None
    print(f"\nEnvironment: {'Production' if is_production else 'Development'}")
    
    # Test RDS
    rds_ok = test_rds_connection()
    
    # Test S3
    s3_ok = test_s3_connection()
    
    # Summary
    print("\n" + "="*50)
    print("  Test Summary")
    print("="*50)
    
    if rds_ok and s3_ok:
        print("\n✅ All AWS services are properly configured!")
        print("\n📋 Next steps:")
        print("1. Run migration: python migrate_to_aws.py")
        print("2. Start the app: python api.py")
        print("3. Deploy to Render")
    else:
        print("\n⚠️  Some services are not configured properly")
        if not rds_ok:
            print("\n🔧 Fix RDS:")
            print("  - Check security group allows inbound connections")
            print("  - Verify database is publicly accessible")
            print("  - Check credentials in .env file")
        if not s3_ok:
            print("\n🔧 Fix S3:")
            print("  - Verify AWS credentials are correct")
            print("  - Check bucket name and region")
            print("  - Ensure IAM user has S3 permissions")

if __name__ == "__main__":
    test_aws_services()