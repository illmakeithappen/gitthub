#!/usr/bin/env python3
"""
Test Course Generation Fixes
- Verify unique slugs are generated
- Verify courses are created with 'published' status
"""
import asyncio
import sys
from dotenv import load_dotenv

load_dotenv()

try:
    from course_generator import CourseGeneratorService
    from course_models import CourseRequest, CourseLevel, AIModel
    from aws_database import aws_cloud_repo
    print("✅ All imports successful")
except ImportError as e:
    print(f"❌ Import error: {e}")
    sys.exit(1)

async def test_unique_slug_generation():
    """Test that slugs are unique even with same title"""
    print("\n🔍 Testing unique slug generation...")
    
    generator = CourseGeneratorService()
    
    # Generate multiple slugs with same title
    title = "Complete test Beginner Course"
    slugs = []
    
    for i in range(3):
        slug = generator.generate_slug(title)
        slugs.append(slug)
        print(f"  Slug {i+1}: {slug}")
        # Small delay to ensure different timestamps
        await asyncio.sleep(1)
    
    # Check that all slugs are different
    if len(set(slugs)) == len(slugs):
        print("✅ All slugs are unique!")
        return True
    else:
        print("❌ Some slugs are duplicated!")
        return False

async def test_course_status():
    """Test that generated courses have 'published' status"""
    print("\n🔍 Testing course status...")
    
    generator = CourseGeneratorService()
    
    # Create a test course request
    request = CourseRequest(
        topic="test-fix-validation",
        level=CourseLevel.BEGINNER,
        duration="2 weeks",
        learning_objectives=["Test fix validation"],
        target_audience="Test users",
        include_assessments=True,
        include_projects=True,
        language="english",
        ai_model=AIModel.TEMPLATE
    )
    
    # Generate the course
    course = await generator.generate_course(request)
    
    print(f"  Course ID: {course.course_id}")
    print(f"  Course Title: {course.title}")
    print(f"  Course Slug: {course.slug}")
    print(f"  Course Status: {course.status}")
    print(f"  Course Status Value: {course.status.value}")
    
    if course.status.value == 'published':
        print("✅ Course status is 'published'!")
        return course
    else:
        print(f"❌ Course status is '{course.status.value}', expected 'published'!")
        return None

async def test_database_storage():
    """Test that courses can be saved to database without slug conflicts"""
    print("\n🔍 Testing database storage...")
    
    # Generate another course to test database storage
    generator = CourseGeneratorService()
    
    request = CourseRequest(
        topic="database-storage-test",
        level=CourseLevel.INTERMEDIATE,
        duration="3 weeks",
        learning_objectives=["Test database storage"],
        target_audience="Test users",
        include_assessments=True,
        include_projects=False,
        language="english",
        ai_model=AIModel.TEMPLATE
    )
    
    try:
        # Generate the course
        course = await generator.generate_course(request)
        print(f"  Generated course: {course.course_id}")
        
        # Try to save to database
        saved_course_id = aws_cloud_repo.save_course(course.dict())
        print(f"  Saved to database with ID: {saved_course_id}")
        
        # Verify we can retrieve it
        retrieved_course = aws_cloud_repo.get_course(saved_course_id)
        if retrieved_course:
            print(f"  Retrieved course: {retrieved_course['title']}")
            print(f"  Retrieved status: {retrieved_course['status']}")
            print("✅ Database storage successful!")
            return True
        else:
            print("❌ Could not retrieve saved course!")
            return False
            
    except Exception as e:
        print(f"❌ Database storage failed: {e}")
        return False

async def test_course_listing():
    """Test that published courses appear in course listings"""
    print("\n🔍 Testing course listing...")
    
    try:
        courses = aws_cloud_repo.list_courses(limit=10)
        published_courses = [c for c in courses if c.get('status') == 'published']
        
        print(f"  Total courses in database: {len(courses)}")
        print(f"  Published courses: {len(published_courses)}")
        
        if published_courses:
            print("  Recent published courses:")
            for course in published_courses[:3]:
                print(f"    - {course.get('title')} (ID: {course.get('course_id')})")
        
        print("✅ Course listing working!")
        return len(published_courses) > 0
        
    except Exception as e:
        print(f"❌ Course listing failed: {e}")
        return False

async def main():
    print("🚀 Course Generation Fixes Testing")
    print("=" * 50)
    
    results = []
    
    # Test 1: Unique slug generation
    slug_test = await test_unique_slug_generation()
    results.append(("Unique Slug Generation", slug_test))
    
    # Test 2: Course status
    course = await test_course_status()
    results.append(("Course Status", course is not None))
    
    # Test 3: Database storage
    storage_test = await test_database_storage()
    results.append(("Database Storage", storage_test))
    
    # Test 4: Course listing
    listing_test = await test_course_listing()
    results.append(("Course Listing", listing_test))
    
    # Summary
    print("\n📊 Test Results Summary:")
    print("-" * 30)
    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nPassed: {passed}/{len(results)} tests")
    
    if passed == len(results):
        print("\n🎉 All fixes working correctly!")
        print("\nNext steps:")
        print("1. Deploy the fixes to Render")
        print("2. Test course generation on production")
        print("3. Verify courses appear in DataBank UI")
    else:
        print("\n⚠️  Some tests failed. Please review the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main())