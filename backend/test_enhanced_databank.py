#!/usr/bin/env python3
"""
Test script for AWS RDS connection and DataBank functionality
Tests both document uploads and link creation
"""

import os
import sys
import logging
from datetime import datetime
import json
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def test_aws_connection():
    """Test AWS RDS connection"""
    logger.info("=" * 60)
    logger.info("Testing AWS RDS Connection")
    logger.info("=" * 60)
    
    try:
        from enhanced_aws_database import enhanced_aws_repo, IS_PRODUCTION
        
        logger.info(f"Production Mode: {IS_PRODUCTION}")
        
        if IS_PRODUCTION:
            logger.info("✅ AWS RDS is configured and active")
            
            # Test database stats
            stats = enhanced_aws_repo.get_stats()
            logger.info(f"Database Type: {stats.get('database_type')}")
            logger.info(f"Total Documents: {stats.get('total_documents')}")
            logger.info(f"Total Links: {stats.get('total_links')}")
            logger.info(f"Total Resources: {stats.get('total_resources')}")
        else:
            logger.warning("⚠️ Running in local mode (SQLite)")
            logger.info("To enable AWS RDS, set ENABLE_AWS=true in .env or deploy to production")
        
        return enhanced_aws_repo, IS_PRODUCTION
        
    except Exception as e:
        logger.error(f"❌ Failed to connect to database: {e}")
        return None, False

def create_sample_links(repo):
    """Create sample links in the database"""
    logger.info("\n" + "=" * 60)
    logger.info("Creating Sample Links")
    logger.info("=" * 60)
    
    sample_links = [
        {
            "title": "OpenAI GPT Documentation",
            "url": "https://platform.openai.com/docs",
            "description": "Official documentation for OpenAI's GPT models and API",
            "category": "Documentation",
            "tags": ["AI", "Machine Learning", "NLP", "API"],
            "is_featured": True
        },
        {
            "title": "TensorFlow Tutorials",
            "url": "https://www.tensorflow.org/tutorials",
            "description": "Comprehensive tutorials for TensorFlow machine learning framework",
            "category": "Tutorial",
            "tags": ["Machine Learning", "Deep Learning", "Python"],
            "is_featured": True
        },
        {
            "title": "Kaggle Datasets",
            "url": "https://www.kaggle.com/datasets",
            "description": "Explore and analyze thousands of public datasets",
            "category": "Resource",
            "tags": ["Data", "Datasets", "Machine Learning"],
            "is_featured": False
        },
        {
            "title": "Papers with Code",
            "url": "https://paperswithcode.com",
            "description": "Machine learning papers with implementation code",
            "category": "Research",
            "tags": ["Research", "Papers", "Code", "ML"],
            "is_featured": True
        },
        {
            "title": "Hugging Face Models",
            "url": "https://huggingface.co/models",
            "description": "Pre-trained models for NLP, computer vision, and more",
            "category": "Tool",
            "tags": ["Models", "NLP", "Computer Vision", "Pre-trained"],
            "is_featured": False
        },
        {
            "title": "Google Colab",
            "url": "https://colab.research.google.com",
            "description": "Free cloud-based Jupyter notebook environment",
            "category": "Tool",
            "tags": ["Jupyter", "Cloud", "Python", "Free"],
            "is_featured": True
        },
        {
            "title": "Fast.ai Course",
            "url": "https://course.fast.ai",
            "description": "Practical deep learning for coders - free course",
            "category": "Educational",
            "tags": ["Deep Learning", "Course", "Free", "Python"],
            "is_featured": True
        },
        {
            "title": "AWS SageMaker Documentation",
            "url": "https://docs.aws.amazon.com/sagemaker",
            "description": "Build, train, and deploy machine learning models on AWS",
            "category": "Documentation",
            "tags": ["AWS", "Cloud", "ML", "Deployment"],
            "is_featured": False
        }
    ]
    
    created_links = []
    for link_data in sample_links:
        try:
            # Add domain extraction
            from urllib.parse import urlparse
            parsed_url = urlparse(link_data['url'])
            link_data['domain'] = parsed_url.netloc
            
            link_id = repo.create_link(link_data)
            created_links.append(link_id)
            logger.info(f"✅ Created link: {link_data['title']} (ID: {link_id})")
        except Exception as e:
            logger.error(f"❌ Failed to create link '{link_data['title']}': {e}")
    
    return created_links

def create_sample_documents(repo):
    """Create sample document entries in the database"""
    logger.info("\n" + "=" * 60)
    logger.info("Creating Sample Documents")
    logger.info("=" * 60)
    
    import uuid
    
    sample_docs = [
        {
            "id": str(uuid.uuid4()),
            "title": "Machine Learning Fundamentals Guide",
            "description": "Comprehensive guide covering ML basics, algorithms, and best practices",
            "resource_type": "document",
            "format": "PDF",
            "category": "Educational",
            "workflow_categories": ["machine_learning", "data_preprocessing"],
            "tags": ["ML", "Tutorial", "Beginner"],
            "file_size": 2456789,
            "author": "gitthub Team"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Customer Churn Dataset",
            "description": "Telecom customer churn data with 5000 records and 20 features",
            "resource_type": "document",
            "format": "CSV",
            "category": "Dataset",
            "workflow_categories": ["data_cleaning", "exploratory_analysis"],
            "tags": ["Dataset", "Classification", "Churn"],
            "file_size": 567890,
            "author": "gitthub Data Team"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Neural Network Implementation",
            "description": "Python notebook implementing a neural network from scratch",
            "resource_type": "document",
            "format": "Jupyter Notebook",
            "category": "Code Sample",
            "workflow_categories": ["deep_learning", "model_development"],
            "tags": ["Neural Network", "Python", "Deep Learning"],
            "file_size": 145678,
            "author": "gitthub AI Lab"
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Data Visualization Best Practices",
            "description": "Guidelines and examples for creating effective data visualizations",
            "resource_type": "document",
            "format": "Markdown",
            "category": "Documentation",
            "workflow_categories": ["data_visualization"],
            "tags": ["Visualization", "Best Practices", "Guide"],
            "file_size": 89012,
            "author": "gitthub Design Team"
        }
    ]
    
    created_docs = []
    for doc_data in sample_docs:
        try:
            resource_id = repo.create_resource(doc_data)
            created_docs.append(resource_id)
            logger.info(f"✅ Created document: {doc_data['title']} (ID: {resource_id})")
        except Exception as e:
            logger.error(f"❌ Failed to create document '{doc_data['title']}': {e}")
    
    return created_docs

def test_search_functionality(repo):
    """Test searching for resources"""
    logger.info("\n" + "=" * 60)
    logger.info("Testing Search Functionality")
    logger.info("=" * 60)
    
    # Test searching all resources
    logger.info("\n📋 All Resources:")
    all_resources = repo.search_resources(limit=10)
    for resource in all_resources:
        logger.info(f"  - [{resource['resource_type']}] {resource['title']}")
    
    # Test searching only documents
    logger.info("\n📄 Documents only:")
    documents = repo.search_resources(resource_type='document', limit=5)
    for doc in documents:
        logger.info(f"  - {doc['title']} ({doc['format']})")
    
    # Test searching only links
    logger.info("\n🔗 Links only:")
    links = repo.search_resources(resource_type='link', limit=5)
    for link in links:
        logger.info(f"  - {link['title']} -> {link.get('external_url', 'N/A')}")
    
    # Test category filter
    logger.info("\n🏷️ Educational resources:")
    educational = repo.search_resources(category_filter='Educational', limit=5)
    for resource in educational:
        logger.info(f"  - {resource['title']}")

def test_links_crud(repo):
    """Test CRUD operations for links"""
    logger.info("\n" + "=" * 60)
    logger.info("Testing Links CRUD Operations")
    logger.info("=" * 60)
    
    # Get all links
    logger.info("\nRetrieving all links:")
    all_links = repo.get_all_links(limit=10)
    logger.info(f"Found {len(all_links)} links")
    
    # Get featured links
    logger.info("\n⭐ Featured links:")
    featured = repo.get_all_links(is_featured=True, limit=5)
    for link in featured:
        logger.info(f"  - {link['title']}")
    
    if all_links:
        # Test getting a specific link
        test_link_id = all_links[0]['id']
        logger.info(f"\nGetting link ID {test_link_id}:")
        link = repo.get_link(test_link_id)
        if link:
            logger.info(f"  Title: {link['title']}")
            logger.info(f"  URL: {link['url']}")
            logger.info(f"  Clicks: {link['click_count']}")
        
        # Test updating a link
        logger.info(f"\nUpdating link ID {test_link_id}:")
        success = repo.update_link(test_link_id, {
            "description": "Updated description - " + datetime.now().isoformat(),
            "is_featured": True
        })
        if success:
            logger.info("  ✅ Link updated successfully")
        else:
            logger.error("  ❌ Failed to update link")

def main():
    """Main test function"""
    logger.info("\n" + "🚀 " * 20)
    logger.info("GITTHUB AWS DATABANK TEST SUITE")
    logger.info("🚀 " * 20)
    
    # Test connection
    repo, is_production = test_aws_connection()
    
    if not repo:
        logger.error("Failed to initialize repository. Exiting.")
        return 1
    
    # Create sample data
    try:
        # Create sample links
        link_ids = create_sample_links(repo)
        logger.info(f"\n✅ Created {len(link_ids)} sample links")
        
        # Create sample documents
        doc_ids = create_sample_documents(repo)
        logger.info(f"✅ Created {len(doc_ids)} sample documents")
        
        # Test search functionality
        test_search_functionality(repo)
        
        # Test links CRUD
        test_links_crud(repo)
        
        # Final statistics
        logger.info("\n" + "=" * 60)
        logger.info("Final Database Statistics")
        logger.info("=" * 60)
        
        stats = repo.get_stats()
        logger.info(f"Database Type: {stats.get('database_type')}")
        logger.info(f"Total Resources: {stats.get('total_resources')}")
        logger.info(f"  - Documents: {stats.get('total_documents')}")
        logger.info(f"  - Links: {stats.get('total_links')}")
        logger.info(f"Total Courses: {stats.get('total_courses')}")
        logger.info(f"Total Experiences: {stats.get('total_experiences')}")
        
        if stats.get('featured_links'):
            logger.info("\n⭐ Featured Links:")
            for link in stats['featured_links']:
                logger.info(f"  - {link['title']}")
        
        logger.info("\n" + "✅ " * 20)
        logger.info("ALL TESTS COMPLETED SUCCESSFULLY!")
        logger.info("✅ " * 20)
        
        return 0
        
    except Exception as e:
        logger.error(f"\n❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(main())
