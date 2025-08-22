#!/usr/bin/env python
"""
Seed script to populate the data bank with initial sample data
"""

import json
import csv
import os
from datetime import datetime
from database import DataBankRepository, init_database
from models import DataFormat, DataCategory, WorkflowCategory

def create_sample_resources():
    """Create sample resources for the data bank"""
    
    # Initialize database
    init_database()
    repo = DataBankRepository()
    
    # Sample CSV data
    sample_csv_path = "data/samples/iris_sample.csv"
    os.makedirs(os.path.dirname(sample_csv_path), exist_ok=True)
    
    with open(sample_csv_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species'])
        writer.writerows([
            [5.1, 3.5, 1.4, 0.2, 'setosa'],
            [4.9, 3.0, 1.4, 0.2, 'setosa'],
            [7.0, 3.2, 4.7, 1.4, 'versicolor'],
            [6.4, 3.2, 4.5, 1.5, 'versicolor'],
            [6.3, 3.3, 6.0, 2.5, 'virginica']
        ])
    
    # Sample JSON data
    sample_json_path = "data/samples/api_response.json"
    sample_json_data = {
        "users": [
            {"id": 1, "name": "Alice", "email": "alice@example.com", "role": "admin"},
            {"id": 2, "name": "Bob", "email": "bob@example.com", "role": "user"},
            {"id": 3, "name": "Charlie", "email": "charlie@example.com", "role": "user"}
        ],
        "metadata": {
            "total": 3,
            "page": 1,
            "per_page": 10
        }
    }
    
    with open(sample_json_path, 'w') as f:
        json.dump(sample_json_data, f, indent=2)
    
    # Sample text data
    sample_text_path = "data/samples/nlp_tutorial.txt"
    with open(sample_text_path, 'w') as f:
        f.write("""Introduction to Natural Language Processing

Natural Language Processing (NLP) is a field at the intersection of computer science, 
artificial intelligence, and linguistics. It focuses on the interaction between computers 
and human language, particularly how to program computers to process and analyze large 
amounts of natural language data.

Key NLP Tasks:
1. Tokenization - Breaking text into words or subwords
2. Part-of-Speech Tagging - Identifying grammatical roles
3. Named Entity Recognition - Finding names, places, organizations
4. Sentiment Analysis - Determining emotional tone
5. Machine Translation - Converting text between languages

Modern NLP relies heavily on deep learning models, particularly transformers like BERT, 
GPT, and their variants. These models have revolutionized the field by achieving 
state-of-the-art results on many benchmark tasks.""")
    
    # Create sample resources in database
    sample_resources = [
        {
            "title": "Iris Dataset Sample",
            "description": "A small sample of the famous Iris flower dataset, commonly used for classification tasks in machine learning",
            "format": DataFormat.CSV,
            "category": DataCategory.DATASET,
            "workflow_categories": [WorkflowCategory.MACHINE_LEARNING, WorkflowCategory.EXPLORATORY_ANALYSIS],
            "tags": ["classification", "iris", "beginner", "supervised-learning"],
            "file_path": sample_csv_path,
            "file_size": os.path.getsize(sample_csv_path),
            "metadata": {
                "rows": 5,
                "columns": 5,
                "target_variable": "species"
            }
        },
        {
            "title": "API Response Example",
            "description": "Sample JSON response from a REST API, useful for learning data parsing and API integration",
            "format": DataFormat.JSON,
            "category": DataCategory.CODE_SAMPLE,
            "workflow_categories": [WorkflowCategory.ETL, WorkflowCategory.DATA_CLEANING],
            "tags": ["api", "json", "rest", "web-development"],
            "file_path": sample_json_path,
            "file_size": os.path.getsize(sample_json_path),
            "metadata": {
                "structure": "nested object with arrays"
            }
        },
        {
            "title": "NLP Basics Tutorial",
            "description": "Introduction to Natural Language Processing concepts and techniques",
            "format": DataFormat.TEXT,
            "category": DataCategory.TUTORIAL,
            "workflow_categories": [WorkflowCategory.NLP],
            "tags": ["nlp", "text-processing", "tutorial", "deep-learning"],
            "file_path": sample_text_path,
            "file_size": os.path.getsize(sample_text_path),
            "metadata": {
                "language": "english",
                "reading_time": "3 minutes"
            }
        },
        {
            "title": "Time Series Forecasting Guide",
            "description": "Comprehensive guide on time series analysis and forecasting methods including ARIMA, Prophet, and LSTM models",
            "format": DataFormat.MARKDOWN,
            "category": DataCategory.DOCUMENTATION,
            "workflow_categories": [WorkflowCategory.TIME_SERIES, WorkflowCategory.MACHINE_LEARNING],
            "tags": ["time-series", "forecasting", "arima", "prophet", "lstm"],
            "metadata": {
                "pages": 15,
                "difficulty": "intermediate"
            }
        },
        {
            "title": "Computer Vision Dataset",
            "description": "Collection of labeled images for object detection and image classification tasks",
            "format": DataFormat.IMAGE,
            "category": DataCategory.DATASET,
            "workflow_categories": [WorkflowCategory.COMPUTER_VISION, WorkflowCategory.DEEP_LEARNING],
            "tags": ["computer-vision", "image-classification", "object-detection", "cnn"],
            "metadata": {
                "image_count": 1000,
                "classes": 10,
                "resolution": "224x224"
            }
        },
        {
            "title": "Data Visualization Best Practices",
            "description": "Learn effective data visualization techniques using matplotlib, seaborn, and plotly",
            "format": DataFormat.NOTEBOOK,
            "category": DataCategory.TUTORIAL,
            "workflow_categories": [WorkflowCategory.DATA_VISUALIZATION, WorkflowCategory.EXPLORATORY_ANALYSIS],
            "tags": ["visualization", "matplotlib", "seaborn", "plotly", "jupyter"],
            "metadata": {
                "kernel": "python3",
                "libraries": ["matplotlib", "seaborn", "plotly", "pandas"]
            }
        }
    ]
    
    # Insert resources into database
    for resource_data in sample_resources:
        try:
            resource_id = repo.create_resource(resource_data)
            print(f"Created resource: {resource_data['title']} (ID: {resource_id})")
        except Exception as e:
            print(f"Error creating resource {resource_data['title']}: {e}")
    
    # Create sample educational experiences
    sample_experiences = [
        {
            "title": "Introduction to Machine Learning with Iris Dataset",
            "description": "Learn the basics of machine learning classification using the Iris dataset",
            "difficulty_level": "beginner",
            "estimated_time": "2 hours",
            "workflow_category": WorkflowCategory.MACHINE_LEARNING,
            "learning_objectives": [
                "Understand classification problems",
                "Load and explore datasets with pandas",
                "Train a decision tree classifier",
                "Evaluate model performance"
            ],
            "prerequisites": ["Basic Python", "Pandas basics"],
            "steps": [
                {"title": "Load the Data", "content": "Import pandas and load the Iris dataset"},
                {"title": "Explore the Data", "content": "Use describe() and info() methods"},
                {"title": "Visualize", "content": "Create scatter plots and histograms"},
                {"title": "Train Model", "content": "Split data and train a classifier"},
                {"title": "Evaluate", "content": "Calculate accuracy and confusion matrix"}
            ],
            "code_snippets": [
                {"language": "python", "code": "import pandas as pd\ndf = pd.read_csv('iris.csv')"},
                {"language": "python", "code": "from sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier()"}
            ]
        },
        {
            "title": "Building REST APIs with FastAPI",
            "description": "Create a production-ready REST API using FastAPI and best practices",
            "difficulty_level": "intermediate",
            "estimated_time": "4 hours",
            "workflow_category": WorkflowCategory.ETL,
            "learning_objectives": [
                "Design RESTful endpoints",
                "Implement data validation with Pydantic",
                "Handle authentication and authorization",
                "Deploy with Docker"
            ],
            "prerequisites": ["Python intermediate", "HTTP basics", "JSON"],
            "steps": [
                {"title": "Setup FastAPI", "content": "Install dependencies and create main.py"},
                {"title": "Define Models", "content": "Create Pydantic models for validation"},
                {"title": "Implement Endpoints", "content": "Build CRUD operations"},
                {"title": "Add Authentication", "content": "Implement JWT tokens"},
                {"title": "Deploy", "content": "Containerize and deploy the API"}
            ]
        }
    ]
    
    # Insert experiences into database
    for experience_data in sample_experiences:
        try:
            experience_id = repo.create_experience(experience_data)
            print(f"Created experience: {experience_data['title']} (ID: {experience_id})")
        except Exception as e:
            print(f"Error creating experience {experience_data['title']}: {e}")
    
    # Print statistics
    stats = repo.get_stats()
    print("\n=== Data Bank Statistics ===")
    print(f"Total Resources: {stats['total_resources']}")
    print(f"Total Experiences: {stats['total_experiences']}")
    print(f"Resources by Format: {stats['resources_by_format']}")
    print(f"Resources by Category: {stats['resources_by_category']}")

if __name__ == "__main__":
    create_sample_resources()
    print("\nSeed data created successfully!")