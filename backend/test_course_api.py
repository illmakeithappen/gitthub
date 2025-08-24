#!/usr/bin/env python3
"""
Test Course API Endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8001"

def test_courses_list():
    """Test the /api/courses endpoint"""
    print("\n🔍 Testing /api/courses endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/api/courses")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            courses = data.get('courses', [])
            print(f"✅ Found {len(courses)} courses")
            
            for course in courses:
                print(f"  - {course.get('title')} (ID: {course.get('course_id')})")
                
            return True, courses
        else:
            print(f"❌ Error: {response.text}")
            return False, []
            
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False, []

def test_specific_course(course_id):
    """Test getting a specific course"""
    print(f"\n🔍 Testing /api/courses/{course_id} endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/api/courses/{course_id}")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            course = response.json()
            print(f"✅ Course details retrieved:")
            print(f"  Title: {course.get('title')}")
            print(f"  Status: {course.get('status')}")
            print(f"  Modules: {len(course.get('modules', []))}")
            return True
        else:
            print(f"❌ Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

def test_databank_stats():
    """Test databank stats to see if courses are counted"""
    print("\n🔍 Testing /api/databank/stats endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/api/databank/stats")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            stats = response.json()
            print(f"✅ Stats retrieved:")
            print(f"  Total resources: {stats.get('total_resources', 0)}")
            print(f"  Total courses: {stats.get('total_courses', 0)}")
            print(f"  Total experiences: {stats.get('total_experiences', 0)}")
            return True
        else:
            print(f"❌ Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

def main():
    print("🚀 Course API Endpoint Testing")
    print("=" * 40)
    
    # Test 1: List courses
    success, courses = test_courses_list()
    if not success:
        print("❌ Course listing failed")
        return
    
    # Test 2: Get specific course if any exist
    if courses:
        course_id = courses[0].get('course_id') or courses[0].get('id')
        if course_id:
            test_specific_course(course_id)
    
    # Test 3: Check databank stats
    test_databank_stats()
    
    print("\n✅ API endpoint tests completed")
    print("\nIf all tests passed, the issue might be:")
    print("1. Frontend not calling the correct endpoints")
    print("2. CORS issues")
    print("3. Render deployment configuration")

if __name__ == "__main__":
    main()