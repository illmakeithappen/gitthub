from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

# Enums for data types and categories
class DataFormat(str, Enum):
    CSV = "csv"
    JSON = "json"
    EXCEL = "excel"
    PDF = "pdf"
    TEXT = "text"
    IMAGE = "image"
    VIDEO = "video"
    AUDIO = "audio"
    MARKDOWN = "markdown"
    NOTEBOOK = "notebook"  # Jupyter notebooks

class DataCategory(str, Enum):
    DATASET = "dataset"
    TUTORIAL = "tutorial"
    CASE_STUDY = "case_study"
    DOCUMENTATION = "documentation"
    CODE_SAMPLE = "code_sample"
    MODEL = "model"
    VISUALIZATION = "visualization"
    RESEARCH = "research"

class WorkflowCategory(str, Enum):
    DATA_CLEANING = "data_cleaning"
    EXPLORATORY_ANALYSIS = "exploratory_analysis"
    MACHINE_LEARNING = "machine_learning"
    NLP = "natural_language_processing"
    COMPUTER_VISION = "computer_vision"
    TIME_SERIES = "time_series"
    DEEP_LEARNING = "deep_learning"
    DATA_VISUALIZATION = "data_visualization"
    ETL = "etl_pipeline"
    MODEL_DEPLOYMENT = "model_deployment"

# Data Models
class DataResource(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    format: DataFormat
    category: DataCategory
    workflow_categories: List[WorkflowCategory] = []
    tags: List[str] = []
    file_url: Optional[str] = None
    file_size: Optional[int] = None  # in bytes
    metadata: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    author: str = "gitthub"
    access_count: int = 0
    is_public: bool = True
    preview_data: Optional[Dict[str, Any]] = None  # For storing sample data

class EducationalExperience(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    difficulty_level: str  # beginner, intermediate, advanced
    estimated_time: str  # e.g., "2 hours", "1 week"
    workflow_category: WorkflowCategory
    learning_objectives: List[str]
    prerequisites: List[str] = []
    resources: List[str] = []  # IDs of DataResource items
    steps: List[Dict[str, Any]] = []  # Structured learning steps
    code_snippets: List[Dict[str, str]] = []  # Language and code pairs
    quiz_questions: List[Dict[str, Any]] = []
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    completion_count: int = 0
    rating: Optional[float] = None

class DataIngestionRequest(BaseModel):
    title: str
    description: str
    format: DataFormat
    category: DataCategory
    workflow_categories: List[WorkflowCategory] = []
    tags: List[str] = []
    file_path: Optional[str] = None
    file_content: Optional[str] = None  # For text-based uploads
    metadata: Dict[str, Any] = {}

class DataBankStats(BaseModel):
    total_resources: int
    total_experiences: int
    resources_by_format: Dict[str, int]
    resources_by_category: Dict[str, int]
    popular_tags: List[Dict[str, Any]]
    recent_uploads: List[DataResource]
    popular_experiences: List[EducationalExperience]

class SearchRequest(BaseModel):
    query: Optional[str] = None
    format: Optional[DataFormat] = None
    category: Optional[DataCategory] = None
    workflow_categories: Optional[List[WorkflowCategory]] = None
    tags: Optional[List[str]] = None
    limit: int = 20
    offset: int = 0

class UserProgress(BaseModel):
    user_id: str
    experience_id: str
    progress_percentage: float
    completed_steps: List[int]
    quiz_scores: Dict[str, float]
    started_at: datetime
    last_accessed: datetime
    completed: bool = False
    completion_date: Optional[datetime] = None

# Course Generation Models
class CourseRequest(BaseModel):
    topic: str
    level: str = "beginner"
    duration: str = "4 weeks"
    learning_objectives: List[str] = []
    target_audience: str = ""
    prerequisites: List[str] = []
    include_assessments: bool = True
    include_projects: bool = True
    language: str = "english"
    ai_model: str = "template"

class Module(BaseModel):
    module_id: str
    title: str
    description: str
    content_sections: List[Dict[str, Any]]
    activities: List[Dict[str, Any]]
    assessment: Optional[Dict[str, Any]] = None

class ContentSection(BaseModel):
    title: str
    content: str
    examples: List[str] = []
    key_points: List[str] = []

class Activity(BaseModel):
    title: str
    type: str
    description: str
    instructions: List[str]
    estimated_time: str

class Assessment(BaseModel):
    title: str
    type: str
    questions: List[Dict[str, Any]]
    passing_score: float

class CourseResponse(BaseModel):
    success: bool
    course_id: str
    course: Dict[str, Any]
    message: str

class CourseExportRequest(BaseModel):
    format: str = "html"
    include_solutions: bool = False

class UploadResponse(BaseModel):
    success: bool
    message: str
    resource_id: str
    data: Dict[str, Any]