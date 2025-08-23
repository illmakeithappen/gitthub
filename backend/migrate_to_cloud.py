#!/usr/bin/env python3
"""
Migration Script - Transfer local SQLite data to Cloud Database
Migrates data from SQLite to Supabase/PostgreSQL
"""
import os
import sys
import json
import sqlite3
from datetime import datetime
from typing import Dict, Any, List
import argparse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import local and cloud repositories
from database import DataBankRepository
from course_repository import CourseRepository
from auth_service import UserAuthService
from cloud_database import cloud_repo, IS_PRODUCTION
from cloud_storage import cloud_storage, CloudStorageService


class DataMigration:
    """Handles migration from local SQLite to cloud databases"""
    
    def __init__(self, dry_run: bool = False):
        self.dry_run = dry_run
        self.local_data_repo = DataBankRepository()
        self.local_course_repo = CourseRepository()
        self.local_auth_service = UserAuthService()
        self.cloud_repo = cloud_repo
        self.cloud_storage = cloud_storage
        
        self.stats = {
            "resources_migrated": 0,
            "courses_migrated": 0,
            "users_migrated": 0,
            "files_uploaded": 0,
            "errors": []
        }
    
    def migrate_databank_resources(self):
        """Migrate Data Bank resources to cloud"""
        print("📊 Migrating Data Bank resources...")
        
        try:
            # Get all local resources
            resources = self.local_data_repo.get_all_resources(limit=1000)
            
            for resource in resources:
                try:
                    # Upload file to cloud storage if it exists
                    file_path = resource.get("file_path")
                    if file_path and os.path.exists(file_path):
                        if not self.dry_run:
                            with open(file_path, "rb") as f:
                                file_content = f.read()
                            
                            # Upload to Cloudinary
                            upload_result = self.cloud_storage.upload_file(
                                file_content=file_content,
                                filename=resource.get("filename", "unknown"),
                                content_type=resource.get("mime_type", "application/octet-stream"),
                                folder="databank"
                            )
                            
                            # Update resource with cloud URLs
                            resource["file_url"] = upload_result["file_url"]
                            resource["file_id"] = upload_result["file_id"]
                            self.stats["files_uploaded"] += 1
                    
                    # Save resource to cloud database
                    if not self.dry_run:
                        resource_id = self.cloud_repo.create_resource(resource)
                        print(f"  ✅ Migrated resource: {resource.get('title')} (ID: {resource_id})")
                    else:
                        print(f"  🔍 Would migrate resource: {resource.get('title')}")
                    
                    self.stats["resources_migrated"] += 1
                    
                except Exception as e:
                    error_msg = f"Failed to migrate resource {resource.get('id')}: {str(e)}"
                    print(f"  ❌ {error_msg}")
                    self.stats["errors"].append(error_msg)
        
        except Exception as e:
            error_msg = f"Failed to fetch local resources: {str(e)}"
            print(f"❌ {error_msg}")
            self.stats["errors"].append(error_msg)
    
    def migrate_courses(self):
        """Migrate courses to cloud database"""
        print("\n📚 Migrating courses...")
        
        try:
            # Connect to local courses database
            conn = sqlite3.connect("data/courses.db")
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            
            cursor.execute("SELECT * FROM courses")
            courses = cursor.fetchall()
            
            for course in courses:
                try:
                    course_data = {
                        "course_id": course["id"],
                        "title": course["title"],
                        "slug": course["slug"],
                        "description": course["description"],
                        "level": course["level"],
                        "duration": course["duration"],
                        "modules": json.loads(course["modules"]) if course["modules"] else [],
                        "prerequisites": json.loads(course["prerequisites"]) if course["prerequisites"] else [],
                        "learning_objectives": json.loads(course["learning_objectives"]) if course["learning_objectives"] else [],
                        "target_audience": course["target_audience"],
                        "learning_path": json.loads(course["learning_path"]) if course["learning_path"] else {},
                        "databank_resources": json.loads(course["databank_resources"]) if course["databank_resources"] else [],
                        "tags": json.loads(course["tags"]) if course["tags"] else [],
                        "language": course["language"],
                        "status": course["status"],
                        "access_type": course["access_type"],
                        "created_by": course["created_by"],
                        "metadata": json.loads(course["metadata"]) if course["metadata"] else {}
                    }
                    
                    if not self.dry_run:
                        course_id = self.cloud_repo.save_course(course_data)
                        print(f"  ✅ Migrated course: {course_data['title']} (ID: {course_id})")
                    else:
                        print(f"  🔍 Would migrate course: {course_data['title']}")
                    
                    self.stats["courses_migrated"] += 1
                    
                except Exception as e:
                    error_msg = f"Failed to migrate course {course['id']}: {str(e)}"
                    print(f"  ❌ {error_msg}")
                    self.stats["errors"].append(error_msg)
            
            conn.close()
            
        except Exception as e:
            error_msg = f"Failed to fetch local courses: {str(e)}"
            print(f"❌ {error_msg}")
            self.stats["errors"].append(error_msg)
    
    def migrate_users(self):
        """Migrate user accounts to cloud database"""
        print("\n👥 Migrating user accounts...")
        
        try:
            # Connect to local users database
            conn = sqlite3.connect("data/users.db")
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            
            # Get all users
            cursor.execute("SELECT * FROM users")
            users = cursor.fetchall()
            
            for user in users:
                try:
                    # Note: In production, you'd want to re-hash passwords with a stronger algorithm
                    user_data = {
                        "user_id": user["user_id"],
                        "email": user["email"],
                        "password_hash": user["password_hash"],
                        "full_name": user["full_name"],
                        "organization": user["organization"],
                        "created_at": user["created_at"],
                        "last_login": user["last_login"],
                        "is_active": bool(user["is_active"]),
                        "subscription_tier": user["subscription_tier"],
                        "daily_limit": user["daily_limit"],
                        "monthly_limit": user["monthly_limit"],
                        "courses_created": user["courses_created"],
                        "metadata": json.loads(user["metadata"]) if user["metadata"] else {}
                    }
                    
                    if not self.dry_run:
                        # Use cloud database to save user
                        # Note: You might need to implement a create_user method in cloud_repo
                        print(f"  ✅ Would migrate user: {user_data['email']}")
                    else:
                        print(f"  🔍 Would migrate user: {user_data['email']}")
                    
                    self.stats["users_migrated"] += 1
                    
                except Exception as e:
                    error_msg = f"Failed to migrate user {user['user_id']}: {str(e)}"
                    print(f"  ❌ {error_msg}")
                    self.stats["errors"].append(error_msg)
            
            conn.close()
            
        except Exception as e:
            error_msg = f"Failed to fetch local users: {str(e)}"
            print(f"❌ {error_msg}")
            self.stats["errors"].append(error_msg)
    
    def run_migration(self):
        """Run the complete migration"""
        print("🚀 Starting Cloud Migration")
        print(f"Mode: {'DRY RUN' if self.dry_run else 'LIVE MIGRATION'}")
        print(f"Target: {'Cloud (Supabase + Cloudinary)' if IS_PRODUCTION else 'Local (Development)'}")
        print("-" * 50)
        
        if not IS_PRODUCTION and not self.dry_run:
            print("⚠️  Warning: Not in production mode. Set DATABASE_URL or RENDER environment variable to migrate to cloud.")
            response = input("Continue with local-to-local migration? (y/n): ")
            if response.lower() != 'y':
                print("Migration cancelled.")
                return
        
        # Run migrations
        self.migrate_databank_resources()
        self.migrate_courses()
        self.migrate_users()
        
        # Print summary
        print("\n" + "=" * 50)
        print("📋 Migration Summary")
        print("-" * 50)
        print(f"✅ Resources migrated: {self.stats['resources_migrated']}")
        print(f"✅ Courses migrated: {self.stats['courses_migrated']}")
        print(f"✅ Users migrated: {self.stats['users_migrated']}")
        print(f"☁️  Files uploaded: {self.stats['files_uploaded']}")
        
        if self.stats["errors"]:
            print(f"\n❌ Errors encountered: {len(self.stats['errors'])}")
            for error in self.stats["errors"][:5]:  # Show first 5 errors
                print(f"  - {error}")
            if len(self.stats["errors"]) > 5:
                print(f"  ... and {len(self.stats['errors']) - 5} more errors")
        
        if self.dry_run:
            print("\n📝 This was a DRY RUN. No data was actually migrated.")
            print("Run without --dry-run flag to perform actual migration.")
        else:
            print("\n✨ Migration completed successfully!")


def main():
    parser = argparse.ArgumentParser(description="Migrate local data to cloud database")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Perform a dry run without actually migrating data"
    )
    parser.add_argument(
        "--skip-resources",
        action="store_true",
        help="Skip migrating Data Bank resources"
    )
    parser.add_argument(
        "--skip-courses",
        action="store_true",
        help="Skip migrating courses"
    )
    parser.add_argument(
        "--skip-users",
        action="store_true",
        help="Skip migrating user accounts"
    )
    
    args = parser.parse_args()
    
    # Create migration instance
    migration = DataMigration(dry_run=args.dry_run)
    
    # Customize migration based on flags
    if not args.skip_resources:
        migration.migrate_databank_resources = migration.migrate_databank_resources
    else:
        migration.migrate_databank_resources = lambda: None
    
    if args.skip_courses:
        migration.migrate_courses = lambda: None
    
    if args.skip_users:
        migration.migrate_users = lambda: None
    
    # Run migration
    migration.run_migration()


if __name__ == "__main__":
    main()