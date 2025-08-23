#!/usr/bin/env python3
"""
Populate DataBank with AI Tools and Resources
This script adds a comprehensive list of AI tools and resources to the DataBank
"""

import os
import sys
import logging
import json
from datetime import datetime
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def populate_ai_tools():
    """Populate the database with AI tools and resources"""
    
    try:
        from enhanced_aws_database import enhanced_aws_repo
        logger.info("✅ Connected to database")
    except Exception as e:
        logger.error(f"❌ Failed to connect to database: {e}")
        return False
    
    # Comprehensive list of AI tools and resources
    ai_tools = [
        # Large Language Models & Chat
        {
            "title": "ChatGPT by OpenAI",
            "url": "https://chat.openai.com",
            "description": "Advanced conversational AI powered by GPT-4 for natural language interactions and content generation",
            "category": "Tool",
            "tags": ["LLM", "Chat", "GPT-4", "OpenAI", "Text Generation"],
            "is_featured": True
        },
        {
            "title": "Claude by Anthropic",
            "url": "https://claude.ai",
            "description": "Constitutional AI assistant focused on being helpful, harmless, and honest",
            "category": "Tool",
            "tags": ["LLM", "Chat", "Anthropic", "AI Assistant"],
            "is_featured": True
        },
        {
            "title": "Google Gemini",
            "url": "https://gemini.google.com",
            "description": "Google's multimodal AI model for text, image, and code generation",
            "category": "Tool",
            "tags": ["LLM", "Multimodal", "Google", "AI"],
            "is_featured": True
        },
        
        # Development Tools
        {
            "title": "GitHub Copilot",
            "url": "https://github.com/features/copilot",
            "description": "AI-powered code completion and pair programming assistant",
            "category": "Tool",
            "tags": ["Code", "Development", "GitHub", "AI Coding"],
            "is_featured": True
        },
        {
            "title": "Cursor AI Editor",
            "url": "https://cursor.sh",
            "description": "AI-first code editor built for pair programming with AI",
            "category": "Tool",
            "tags": ["IDE", "Code Editor", "AI Coding", "Development"],
            "is_featured": False
        },
        {
            "title": "Replit AI",
            "url": "https://replit.com/ai",
            "description": "AI-powered coding environment with code generation and debugging",
            "category": "Tool",
            "tags": ["IDE", "Cloud", "AI Coding", "Development"],
            "is_featured": False
        },
        
        # Image Generation
        {
            "title": "Midjourney",
            "url": "https://www.midjourney.com",
            "description": "AI art generator creating stunning images from text prompts",
            "category": "Tool",
            "tags": ["Image Generation", "Art", "Creative AI", "Design"],
            "is_featured": True
        },
        {
            "title": "DALL-E 3",
            "url": "https://openai.com/dall-e-3",
            "description": "OpenAI's advanced text-to-image generation model",
            "category": "Tool",
            "tags": ["Image Generation", "OpenAI", "Art", "Creative AI"],
            "is_featured": True
        },
        {
            "title": "Stable Diffusion",
            "url": "https://stability.ai",
            "description": "Open-source image generation model for creating artwork",
            "category": "Tool",
            "tags": ["Image Generation", "Open Source", "Art", "Stability AI"],
            "is_featured": False
        },
        
        # ML Platforms & Frameworks
        {
            "title": "Hugging Face Hub",
            "url": "https://huggingface.co",
            "description": "Platform for sharing and collaborating on ML models and datasets",
            "category": "Resource",
            "tags": ["Models", "Datasets", "NLP", "ML Platform"],
            "is_featured": True
        },
        {
            "title": "TensorFlow",
            "url": "https://www.tensorflow.org",
            "description": "Open-source machine learning framework by Google",
            "category": "Tool",
            "tags": ["ML Framework", "Deep Learning", "Google", "Open Source"],
            "is_featured": False
        },
        {
            "title": "PyTorch",
            "url": "https://pytorch.org",
            "description": "Open-source machine learning library for Python",
            "category": "Tool",
            "tags": ["ML Framework", "Deep Learning", "Meta", "Python"],
            "is_featured": False
        },
        
        # Data Science Tools
        {
            "title": "Kaggle",
            "url": "https://www.kaggle.com",
            "description": "Platform for data science competitions, datasets, and notebooks",
            "category": "Resource",
            "tags": ["Data Science", "Datasets", "Competitions", "Community"],
            "is_featured": True
        },
        {
            "title": "Google Colab",
            "url": "https://colab.research.google.com",
            "description": "Free cloud-based Jupyter notebook environment with GPU support",
            "category": "Tool",
            "tags": ["Jupyter", "Cloud", "Python", "Free GPU"],
            "is_featured": True
        },
        {
            "title": "Weights & Biases",
            "url": "https://wandb.ai",
            "description": "ML experiment tracking and model monitoring platform",
            "category": "Tool",
            "tags": ["MLOps", "Experiment Tracking", "Monitoring", "Visualization"],
            "is_featured": False
        },
        
        # Documentation & Learning
        {
            "title": "Papers with Code",
            "url": "https://paperswithcode.com",
            "description": "ML papers with implementation code and benchmarks",
            "category": "Resource",
            "tags": ["Research", "Papers", "Code", "Benchmarks"],
            "is_featured": True
        },
        {
            "title": "Fast.ai",
            "url": "https://www.fast.ai",
            "description": "Practical deep learning courses and libraries",
            "category": "Educational",
            "tags": ["Course", "Deep Learning", "Education", "Free"],
            "is_featured": True
        },
        {
            "title": "arXiv",
            "url": "https://arxiv.org",
            "description": "Open-access archive for scientific papers including AI/ML research",
            "category": "Resource",
            "tags": ["Research", "Papers", "Academic", "Open Access"],
            "is_featured": False
        },
        
        # Cloud AI Services
        {
            "title": "AWS SageMaker",
            "url": "https://aws.amazon.com/sagemaker",
            "description": "Build, train, and deploy ML models at scale on AWS",
            "category": "Tool",
            "tags": ["AWS", "Cloud", "MLOps", "Deployment"],
            "is_featured": False
        },
        {
            "title": "Google Cloud AI Platform",
            "url": "https://cloud.google.com/ai-platform",
            "description": "Google Cloud's suite of AI and ML services",
            "category": "Tool",
            "tags": ["Google Cloud", "MLOps", "Cloud", "AI Platform"],
            "is_featured": False
        },
        {
            "title": "Azure Machine Learning",
            "url": "https://azure.microsoft.com/en-us/services/machine-learning",
            "description": "Microsoft's cloud platform for ML model development and deployment",
            "category": "Tool",
            "tags": ["Azure", "Microsoft", "Cloud", "MLOps"],
            "is_featured": False
        },
        
        # Specialized AI Tools
        {
            "title": "Perplexity AI",
            "url": "https://www.perplexity.ai",
            "description": "AI-powered search engine with real-time information",
            "category": "Tool",
            "tags": ["Search", "AI", "Research", "Real-time"],
            "is_featured": True
        },
        {
            "title": "RunwayML",
            "url": "https://runwayml.com",
            "description": "AI tools for creative professionals - video, image, and audio generation",
            "category": "Tool",
            "tags": ["Creative AI", "Video", "Audio", "Design"],
            "is_featured": False
        },
        {
            "title": "Jasper AI",
            "url": "https://www.jasper.ai",
            "description": "AI content creation platform for marketing and copywriting",
            "category": "Tool",
            "tags": ["Content Creation", "Marketing", "Copywriting", "AI Writing"],
            "is_featured": False
        },
        
        # Voice & Audio AI
        {
            "title": "ElevenLabs",
            "url": "https://elevenlabs.io",
            "description": "AI voice synthesis and text-to-speech platform",
            "category": "Tool",
            "tags": ["Voice", "TTS", "Audio", "AI Speech"],
            "is_featured": False
        },
        {
            "title": "Whisper by OpenAI",
            "url": "https://openai.com/research/whisper",
            "description": "Open-source speech recognition model",
            "category": "Tool",
            "tags": ["Speech Recognition", "OpenAI", "Audio", "Open Source"],
            "is_featured": False
        },
        
        # Research & Development
        {
            "title": "OpenAI API",
            "url": "https://platform.openai.com",
            "description": "API access to GPT models and other OpenAI services",
            "category": "Tool",
            "tags": ["API", "OpenAI", "GPT", "Development"],
            "is_featured": True
        },
        {
            "title": "Anthropic API",
            "url": "https://www.anthropic.com/api",
            "description": "API access to Claude models for developers",
            "category": "Tool",
            "tags": ["API", "Anthropic", "Claude", "Development"],
            "is_featured": False
        },
        {
            "title": "LangChain",
            "url": "https://www.langchain.com",
            "description": "Framework for developing applications with large language models",
            "category": "Tool",
            "tags": ["Framework", "LLM", "Development", "Python"],
            "is_featured": True
        },
        
        # Data Labeling & Annotation
        {
            "title": "Labelbox",
            "url": "https://labelbox.com",
            "description": "Data labeling platform for training ML models",
            "category": "Tool",
            "tags": ["Data Labeling", "Annotation", "ML", "Training Data"],
            "is_featured": False
        },
        {
            "title": "Scale AI",
            "url": "https://scale.com",
            "description": "Data platform for AI - labeling, RLHF, and evaluation",
            "category": "Tool",
            "tags": ["Data Labeling", "RLHF", "Evaluation", "Training Data"],
            "is_featured": False
        }
    ]
    
    logger.info(f"Adding {len(ai_tools)} AI tools to DataBank...")
    
    successful = 0
    failed = 0
    
    for tool in ai_tools:
        try:
            # Add domain extraction
            from urllib.parse import urlparse
            parsed_url = urlparse(tool['url'])
            tool['domain'] = parsed_url.netloc
            
            # Create the link
            link_id = enhanced_aws_repo.create_link(tool)
            successful += 1
            logger.info(f"✅ Added: {tool['title']}")
            
        except Exception as e:
            failed += 1
            logger.error(f"❌ Failed to add {tool['title']}: {e}")
    
    logger.info(f"\n{'='*60}")
    logger.info(f"Summary: {successful} tools added successfully, {failed} failed")
    
    # Get final statistics
    try:
        stats = enhanced_aws_repo.get_stats()
        logger.info(f"\nDatabase Statistics:")
        logger.info(f"  Total Resources: {stats.get('total_resources', 0)}")
        logger.info(f"  Total Links: {stats.get('total_links', 0)}")
        logger.info(f"  Total Documents: {stats.get('total_documents', 0)}")
        
        if stats.get('featured_links'):
            logger.info(f"\n⭐ Featured Tools:")
            for link in stats['featured_links'][:5]:
                logger.info(f"    - {link['title']}")
    except Exception as e:
        logger.error(f"Failed to get statistics: {e}")
    
    return successful > 0

def main():
    """Main function"""
    logger.info("\n" + "🚀 " * 20)
    logger.info("GITTHUB DATABANK - AI TOOLS POPULATION")
    logger.info("🚀 " * 20 + "\n")
    
    # Enable AWS if available
    os.environ['ENABLE_AWS'] = 'true'
    
    # Populate the database
    if populate_ai_tools():
        logger.info("\n✅ AI tools successfully added to DataBank!")
        logger.info("Visit http://localhost:3001/databank to see the resources")
        return 0
    else:
        logger.error("\n❌ Failed to populate DataBank")
        return 1

if __name__ == "__main__":
    sys.exit(main())
