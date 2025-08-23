#!/usr/bin/env python3
"""
AWS Setup Helper Script
Helps you configure and test AWS services for gitthub.org
"""
import os
import sys
import json
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
import psycopg2
from dotenv import load_dotenv, set_key
import getpass

# Load existing environment variables
load_dotenv()

class AWSSetupHelper:
    def __init__(self):
        self.env_file = '.env'
        self.aws_configured = False
        self.rds_configured = False
        self.s3_configured = False
    
    def print_header(self, text):
        print("\n" + "="*50)
        print(f"  {text}")
        print("="*50)
    
    def print_step(self, number, text):
        print(f"\n📍 Step {number}: {text}")
        print("-" * 40)
    
    def check_aws_cli(self):
        """Check if AWS CLI is installed"""
        self.print_header("Checking AWS CLI")
        try:
            import subprocess
            result = subprocess.run(['aws', '--version'], capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ AWS CLI is installed:", result.stdout.strip())
                return True
            else:
                print("❌ AWS CLI is not installed")
                print("Install it from: https://aws.amazon.com/cli/")
                return False
        except FileNotFoundError:
            print("❌ AWS CLI is not installed")
            print("Install it from: https://aws.amazon.com/cli/")
            return False
    
    def get_aws_credentials(self):
        """Get AWS credentials from user"""
        self.print_header("AWS Credentials Setup")
        print("\n⚠️  You need an AWS account to continue.")
        print("If you don't have one, create it at: https://aws.amazon.com/")
        print("\nYou'll need:")
        print("1. AWS Access Key ID")
        print("2. AWS Secret Access Key")
        print("3. Default Region (e.g., us-west-2)")
        print("\nGet these from AWS Console → IAM → Users → Security Credentials")
        
        proceed = input("\n▶️  Do you have your AWS credentials ready? (y/n): ").lower()
        if proceed != 'y':
            print("\n📋 Please follow these steps:")
            print("1. Log into AWS Console: https://console.aws.amazon.com")
            print("2. Go to IAM → Users")
            print("3. Click 'Add User' or select existing user")
            print("4. Go to 'Security credentials' tab")
            print("5. Click 'Create access key'")
            print("6. Choose 'Application running outside AWS'")
            print("7. Save the Access Key ID and Secret Access Key")
            return False
        
        print("\n🔐 Enter your AWS credentials (they will be saved to .env file):")
        
        access_key = input("AWS Access Key ID (starts with AKIA): ").strip()
        secret_key = getpass.getpass("AWS Secret Access Key (hidden): ").strip()
        region = input("AWS Region (press Enter for us-west-2): ").strip() or "us-west-2"
        
        # Save to .env file
        set_key(self.env_file, "AWS_ACCESS_KEY_ID", access_key)
        set_key(self.env_file, "AWS_SECRET_ACCESS_KEY", secret_key)
        set_key(self.env_file, "AWS_REGION", region)
        
        # Test credentials
        try:
            session = boto3.Session(
                aws_access_key_id=access_key,
                aws_secret_access_key=secret_key,
                region_name=region
            )
            sts = session.client('sts')
            identity = sts.get_caller_identity()
            print(f"\n✅ AWS credentials verified!")
            print(f"Account ID: {identity['Account']}")
            print(f"User ARN: {identity['Arn']}")
            self.aws_configured = True
            return True
        except Exception as e:
            print(f"\n❌ Failed to verify AWS credentials: {e}")
            print("Please check your credentials and try again.")
            return False
    
    def setup_rds(self):
        """Set up RDS PostgreSQL database"""
        self.print_header("RDS PostgreSQL Setup")
        
        print("\n📌 We'll create a PostgreSQL database in AWS RDS")
        print("This will use the free tier (db.t3.micro)")
        
        create_new = input("\n▶️  Do you want to create a new RDS database? (y/n): ").lower()
        
        if create_new == 'y':
            print("\n🔧 Creating RDS database...")
            print("Please go to AWS Console and create the database manually for now.")
            print("\nFollow these steps:")
            print("1. Go to: https://console.aws.amazon.com/rds")
            print("2. Click 'Create database'")
            print("3. Choose:")
            print("   - Engine: PostgreSQL")
            print("   - Template: Free tier")
            print("   - DB Instance: gitthub-db")
            print("   - Master username: gitthubadmin")
            print("   - Master password: (create a strong password)")
            print("   - Instance: db.t3.micro")
            print("   - Storage: 20 GB")
            print("   - Public access: Yes")
            print("   - Initial database name: gitthub")
            print("4. Wait 5-10 minutes for creation")
            print("5. Note the endpoint from the database details")
            
            input("\n⏸️  Press Enter when your database is created...")
        
        print("\n🔗 Enter your RDS database details:")
        endpoint = input("RDS Endpoint (e.g., mydb.c123.us-west-2.rds.amazonaws.com): ").strip()
        username = input("Master Username (default: gitthubadmin): ").strip() or "gitthubadmin"
        password = getpass.getpass("Master Password (hidden): ").strip()
        db_name = input("Database Name (default: gitthub): ").strip() or "gitthub"
        port = input("Port (default: 5432): ").strip() or "5432"
        
        # Save to .env
        set_key(self.env_file, "AWS_RDS_ENDPOINT", endpoint)
        set_key(self.env_file, "AWS_RDS_PORT", port)
        set_key(self.env_file, "AWS_RDS_DB_NAME", db_name)
        set_key(self.env_file, "AWS_RDS_USERNAME", username)
        set_key(self.env_file, "AWS_RDS_PASSWORD", password)
        
        # Test connection
        print("\n🔍 Testing RDS connection...")
        try:
            conn = psycopg2.connect(
                host=endpoint,
                port=port,
                database=db_name,
                user=username,
                password=password
            )
            conn.close()
            print("✅ Successfully connected to RDS database!")
            self.rds_configured = True
            return True
        except Exception as e:
            print(f"❌ Failed to connect to RDS: {e}")
            print("\n🔧 Troubleshooting:")
            print("1. Check that the database is running")
            print("2. Ensure 'Publicly accessible' is Yes")
            print("3. Check security group allows inbound PostgreSQL (port 5432)")
            print("4. Verify credentials are correct")
            return False
    
    def setup_s3(self):
        """Set up S3 bucket"""
        self.print_header("S3 Bucket Setup")
        
        if not self.aws_configured:
            print("❌ Please configure AWS credentials first")
            return False
        
        # Load AWS credentials
        load_dotenv()
        session = boto3.Session(
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=os.getenv("AWS_REGION", "us-west-2")
        )
        s3 = session.client('s3')
        
        print("\n📦 Setting up S3 bucket for file storage")
        
        bucket_name = input("S3 Bucket Name (default: gitthub-databank): ").strip() or "gitthub-databank"
        
        # Make bucket name unique by adding account ID if needed
        try:
            sts = session.client('sts')
            account_id = sts.get_caller_identity()['Account']
            bucket_name = f"{bucket_name}-{account_id[-6:]}"  # Add last 6 digits of account ID
        except:
            pass
        
        print(f"\n🪣 Creating bucket: {bucket_name}")
        
        try:
            # Check if bucket exists
            s3.head_bucket(Bucket=bucket_name)
            print(f"✅ Bucket '{bucket_name}' already exists")
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code == '404':
                # Create bucket
                try:
                    region = os.getenv("AWS_REGION", "us-west-2")
                    if region == 'us-east-1':
                        s3.create_bucket(Bucket=bucket_name)
                    else:
                        s3.create_bucket(
                            Bucket=bucket_name,
                            CreateBucketConfiguration={'LocationConstraint': region}
                        )
                    print(f"✅ Created bucket: {bucket_name}")
                    
                    # Enable versioning
                    s3.put_bucket_versioning(
                        Bucket=bucket_name,
                        VersioningConfiguration={'Status': 'Enabled'}
                    )
                    print("✅ Enabled versioning")
                    
                    # Set CORS for web uploads
                    cors_config = {
                        'CORSRules': [{
                            'AllowedHeaders': ['*'],
                            'AllowedMethods': ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
                            'AllowedOrigins': ['*'],
                            'ExposeHeaders': ['ETag'],
                            'MaxAgeSeconds': 3000
                        }]
                    }
                    s3.put_bucket_cors(Bucket=bucket_name, CORSConfiguration=cors_config)
                    print("✅ Configured CORS")
                    
                except Exception as create_error:
                    print(f"❌ Failed to create bucket: {create_error}")
                    return False
        
        # Save to .env
        set_key(self.env_file, "AWS_S3_BUCKET", bucket_name)
        
        # Test upload
        print("\n🧪 Testing S3 upload...")
        try:
            test_key = "test/setup_test.txt"
            s3.put_object(
                Bucket=bucket_name,
                Key=test_key,
                Body=b"Test file from gitthub setup",
                ContentType="text/plain"
            )
            print(f"✅ Successfully uploaded test file")
            
            # Clean up test file
            s3.delete_object(Bucket=bucket_name, Key=test_key)
            
            self.s3_configured = True
            return True
            
        except Exception as e:
            print(f"❌ Failed to upload to S3: {e}")
            return False
    
    def create_tables(self):
        """Create database tables"""
        self.print_header("Creating Database Tables")
        
        if not self.rds_configured:
            print("❌ Please configure RDS first")
            return False
        
        print("\n📊 Creating tables in RDS...")
        
        try:
            # Import and run the AWS database setup
            from aws_database import Base, engine
            Base.metadata.create_all(bind=engine)
            print("✅ Database tables created successfully!")
            return True
        except Exception as e:
            print(f"❌ Failed to create tables: {e}")
            return False
    
    def run_setup(self):
        """Run the complete setup process"""
        print("\n🚀 AWS Setup for gitthub.org")
        print("="*50)
        
        # Step 1: Check AWS CLI
        self.print_step(1, "Check Prerequisites")
        self.check_aws_cli()
        
        # Step 2: Get AWS Credentials
        self.print_step(2, "Configure AWS Credentials")
        if not self.get_aws_credentials():
            print("\n❌ Setup incomplete. Please get AWS credentials and try again.")
            return
        
        # Step 3: Setup RDS
        self.print_step(3, "Configure RDS Database")
        if not self.setup_rds():
            print("\n⚠️  RDS setup incomplete. You can configure it later.")
        
        # Step 4: Setup S3
        self.print_step(4, "Configure S3 Storage")
        if not self.setup_s3():
            print("\n⚠️  S3 setup incomplete. You can configure it later.")
        
        # Step 5: Create tables
        if self.rds_configured:
            self.print_step(5, "Initialize Database")
            self.create_tables()
        
        # Summary
        self.print_header("Setup Summary")
        print(f"\n✅ AWS Credentials: {'Configured' if self.aws_configured else 'Not configured'}")
        print(f"✅ RDS Database: {'Configured' if self.rds_configured else 'Not configured'}")
        print(f"✅ S3 Storage: {'Configured' if self.s3_configured else 'Not configured'}")
        
        if self.aws_configured and self.rds_configured and self.s3_configured:
            print("\n🎉 AWS setup complete!")
            print("\n📋 Next steps:")
            print("1. Test locally: python test_aws_connection.py")
            print("2. Migrate data: python migrate_to_aws.py")
            print("3. Deploy to Render with these environment variables")
            print("\n💡 Your .env file has been updated with all credentials")
        else:
            print("\n⚠️  Setup incomplete. Please complete missing configurations.")


if __name__ == "__main__":
    setup = AWSSetupHelper()
    setup.run_setup()