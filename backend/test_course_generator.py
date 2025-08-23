#!/usr/bin/env python3
"""
Test script for Course Generator
Run this to test if course generation is working
"""
import asyncio
import json
from course_models import CourseRequest, CourseLevel
from course_generator import CourseGeneratorService
from course_repository import CourseRepository

async def test_course_generation():
    """Test the course generation pipeline"""
    print("=" * 50)
    print("Testing Course Generation")
    print("=" * 50)
    
    # Initialize services
    generator = CourseGeneratorService()
    repo = CourseRepository()
    
    # Create a test request
    request = CourseRequest(
        topic="Python Programming",
        level=CourseLevel.BEGINNER,
        duration="4 weeks",
        learning_objectives=[
            "Understand Python basics",
            "Write simple programs",
            "Work with data structures"
        ],
        target_audience="Beginners with no programming experience",
        prerequisites=[],
        use_databank_resources=True,
        include_assessments=True,
        include_projects=True,
        language="english"
    )
    
    print(f"\nGenerating course for: {request.topic}")
    print(f"Level: {request.level.value}")
    print(f"Duration: {request.duration}")
    
    try:
        # Generate the course
        print("\nStep 1: Generating course content...")
        course = await generator.generate_course(request)
        print(f"✓ Course generated: {course.course_id}")
        print(f"  Title: {course.title}")
        print(f"  Modules: {len(course.modules)}")
        
        # Save to database
        print("\nStep 2: Saving to database...")
        course_id = await repo.save_course(course)
        print(f"✓ Course saved with ID: {course_id}")
        
        # Retrieve from database
        print("\nStep 3: Retrieving from database...")
        retrieved = await repo.get_course(course_id)
        print(f"✓ Course retrieved successfully")
        
        # Display course structure
        print("\n" + "=" * 50)
        print("GENERATED COURSE STRUCTURE")
        print("=" * 50)
        print(f"\nTitle: {course.title}")
        print(f"Description: {course.description}")
        print(f"\nModules:")
        for i, module in enumerate(course.modules):
            print(f"\n  Module {i+1}: {module.title}")
            print(f"    - {len(module.content_sections)} content sections")
            print(f"    - {len(module.activities)} activities")
            print(f"    - Assessment: {'Yes' if module.assessment else 'No'}")
        
        print("\n" + "=" * 50)
        print("✓ ALL TESTS PASSED!")
        print("=" * 50)
        
        return True
        
    except Exception as e:
        print(f"\n✗ ERROR: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    # Run the test
    success = asyncio.run(test_course_generation())
    exit(0 if success else 1)
