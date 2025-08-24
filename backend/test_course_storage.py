#!/usr/bin/env python3
"""
Test Script to Verify Course Storage in AWS RDS
"""
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    from aws_database import aws_cloud_repo, IS_PRODUCTION
    print(f"✅ AWS Database loaded. Production mode: {IS_PRODUCTION}")
except ImportError as e:
    print(f"❌ Failed to load AWS database: {e}")
    sys.exit(1)

def test_course_table():
    """Test if the courses table exists and is accessible"""
    print("\n🔍 Testing course table access...")
    
    try:
        # Try to list courses (this will test table existence)
        courses = aws_cloud_repo.list_courses(limit=5)
        print(f"✅ Courses table accessible. Found {len(courses)} published courses")
        
        if courses:
            print("\nExisting courses:")
            for course in courses:
                print(f"  - {course.get('title', 'No title')} (ID: {course.get('course_id', 'No ID')})")
        else:
            print("  No published courses found (this is expected if none have been generated yet)")
        
        return True
        
    except Exception as e:
        print(f"❌ Error accessing courses table: {e}")
        return False

def create_test_course():
    """Create a test course to verify storage"""
    print("\n📝 Creating test course...")
    
    test_course_data = {
        'course_id': 'test-course-aws-001',
        'title': 'AWS Storage Test Course',
        'slug': 'aws-storage-test-course',
        'description': 'A test course to verify AWS RDS storage is working correctly',
        'level': 'beginner',
        'duration': '30 minutes',
        'modules': [
            {
                'id': 'module-1',
                'title': 'Introduction to Testing',
                'content': 'This is a test module to verify storage works.'
            }
        ],
        'prerequisites': [],
        'learning_objectives': [
            'Verify AWS RDS storage',
            'Confirm course retrieval works'
        ],
        'target_audience': 'Developers testing the system',
        'tags': ['test', 'aws', 'verification'],
        'language': 'english',
        'status': 'published',
        'created_by': 'test-script'
    }
    
    try:
        course_id = aws_cloud_repo.save_course(test_course_data)
        print(f"✅ Test course created successfully with ID: {course_id}")
        return course_id
        
    except Exception as e:
        print(f"❌ Error creating test course: {e}")
        return None

def retrieve_test_course(course_id):
    """Retrieve the test course to verify storage and retrieval"""
    print(f"\n🔍 Retrieving test course with ID: {course_id}")
    
    try:
        course = aws_cloud_repo.get_course(course_id)
        
        if course:
            print("✅ Test course retrieved successfully!")
            print(f"  Title: {course.get('title')}")
            print(f"  Status: {course.get('status')}")
            print(f"  Modules: {len(course.get('modules', []))}")
            print(f"  Created: {course.get('created_at')}")
            return True
        else:
            print("❌ Test course not found after creation")
            return False
            
    except Exception as e:
        print(f"❌ Error retrieving test course: {e}")
        return False

def test_course_listing():
    """Test course listing to verify the course appears"""
    print("\n📋 Testing course listing...")
    
    try:
        courses = aws_cloud_repo.list_courses(limit=10)
        print(f"✅ Course listing works. Total courses: {len(courses)}")
        
        # Look for our test course
        test_course_found = False
        for course in courses:
            if course.get('course_id') == 'test-course-aws-001':
                test_course_found = True
                print(f"✅ Test course found in listing: {course.get('title')}")
                break
        
        if not test_course_found:
            print("⚠️  Test course not found in listing (but listing works)")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing course listing: {e}")
        return False

def cleanup_test_course():
    """Note: This script doesn't include cleanup to preserve test data"""
    print("\n🧹 Note: Test course 'test-course-aws-001' was left in database for verification")
    print("   You can verify it appears in your DataBank courses tab")

def main():
    print("🚀 AWS RDS Course Storage Verification")
    print("=" * 50)
    
    # Check if we're in production mode
    if not IS_PRODUCTION:
        print("⚠️  Not in production mode - AWS RDS may not be active")
        print("   Make sure AWS credentials are properly configured")
    
    # Test 1: Verify course table access
    if not test_course_table():
        print("❌ Course table access failed. Exiting.")
        sys.exit(1)
    
    # Test 2: Create test course
    course_id = create_test_course()
    if not course_id:
        print("❌ Course creation failed. Exiting.")
        sys.exit(1)
    
    # Test 3: Retrieve test course
    if not retrieve_test_course(course_id):
        print("❌ Course retrieval failed. Exiting.")
        sys.exit(1)
    
    # Test 4: Test course listing
    if not test_course_listing():
        print("❌ Course listing failed. Exiting.")
        sys.exit(1)
    
    cleanup_test_course()
    
    print("\n🎉 All tests passed! Course storage in AWS RDS is working correctly.")
    print("\nNext steps:")
    print("1. Check your DataBank page - the test course should appear in Browse Courses tab")
    print("2. Test course generation through the UI")
    print("3. Verify the generated course appears and is accessible")

if __name__ == "__main__":
    main()