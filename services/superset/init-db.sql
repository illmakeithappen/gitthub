-- services/superset/init-db.sql
-- Initialize databases for GitThub platform with Superset

-- Create databases
CREATE DATABASE IF NOT EXISTS gitthub;
CREATE DATABASE IF NOT EXISTS analytics;

-- Connect to gitthub database
\c gitthub;

-- Create schema for Data Bank
CREATE SCHEMA IF NOT EXISTS databank;

-- Data Bank Resources table
CREATE TABLE IF NOT EXISTS databank.resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    filename VARCHAR(255),
    file_path TEXT,
    file_url TEXT,
    file_id VARCHAR(255),
    file_size BIGINT,
    mime_type VARCHAR(100),
    format VARCHAR(50),
    category VARCHAR(100),
    tags TEXT[],
    workflow VARCHAR(100),
    metadata JSONB,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(100),
    is_public BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0
);

-- Educational Experiences table
CREATE TABLE IF NOT EXISTS databank.experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50),
    difficulty_level VARCHAR(20),
    estimated_duration INTEGER,
    prerequisites TEXT[],
    learning_outcomes TEXT[],
    resources JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id VARCHAR(100),
    is_published BOOLEAN DEFAULT false,
    enrollment_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2)
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    objectives TEXT[],
    prerequisites TEXT[],
    level VARCHAR(50),
    duration_hours INTEGER,
    language VARCHAR(10) DEFAULT 'en',
    modules JSONB,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id VARCHAR(100),
    is_published BOOLEAN DEFAULT false,
    enrollment_count INTEGER DEFAULT 0,
    completion_rate DECIMAL(5,2),
    rating DECIMAL(3,2)
);

-- User Progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    course_id VARCHAR(100) REFERENCES courses(id),
    module_id VARCHAR(100),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    score DECIMAL(5,2),
    time_spent_minutes INTEGER DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Uploads table for tracking user uploads
CREATE TABLE IF NOT EXISTS data_uploads (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    dataset_name VARCHAR(255) NOT NULL,
    file_path TEXT,
    file_size BIGINT,
    row_count INTEGER,
    column_count INTEGER,
    data_types JSONB,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processing_status VARCHAR(50) DEFAULT 'pending',
    superset_dataset_id INTEGER,
    superset_dashboard_id INTEGER,
    is_public BOOLEAN DEFAULT false
);

-- Create indexes for better query performance
CREATE INDEX idx_resources_user ON databank.resources(user_id);
CREATE INDEX idx_resources_category ON databank.resources(category);
CREATE INDEX idx_resources_format ON databank.resources(format);
CREATE INDEX idx_resources_tags ON databank.resources USING GIN(tags);
CREATE INDEX idx_resources_metadata ON databank.resources USING GIN(metadata);

CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_language ON courses(language);
CREATE INDEX idx_courses_published ON courses(is_published);

CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_progress_course ON user_progress(course_id);
CREATE INDEX idx_progress_user_course ON user_progress(user_id, course_id);

CREATE INDEX idx_uploads_user ON data_uploads(user_id);
CREATE INDEX idx_uploads_status ON data_uploads(processing_status);

-- Connect to analytics database
\c analytics;

-- Create analytics schema
CREATE SCHEMA IF NOT EXISTS metrics;

-- User Activity Analytics
CREATE TABLE IF NOT EXISTS metrics.user_activity (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    activity_type VARCHAR(50),
    activity_details JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT
);

-- Resource Analytics
CREATE TABLE IF NOT EXISTS metrics.resource_analytics (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER,
    event_type VARCHAR(50),
    user_id VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration_seconds INTEGER,
    metadata JSONB
);

-- Course Analytics
CREATE TABLE IF NOT EXISTS metrics.course_analytics (
    id SERIAL PRIMARY KEY,
    course_id VARCHAR(100),
    module_id VARCHAR(100),
    user_id VARCHAR(100),
    event_type VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    score DECIMAL(5,2),
    time_spent_seconds INTEGER,
    metadata JSONB
);

-- Dashboard Analytics
CREATE TABLE IF NOT EXISTS metrics.dashboard_views (
    id SERIAL PRIMARY KEY,
    dashboard_id INTEGER,
    user_id VARCHAR(100),
    view_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration_seconds INTEGER,
    interactions JSONB
);

-- Create analytics indexes
CREATE INDEX idx_activity_user ON metrics.user_activity(user_id);
CREATE INDEX idx_activity_type ON metrics.user_activity(activity_type);
CREATE INDEX idx_activity_timestamp ON metrics.user_activity(timestamp);

CREATE INDEX idx_resource_analytics_resource ON metrics.resource_analytics(resource_id);
CREATE INDEX idx_resource_analytics_user ON metrics.resource_analytics(user_id);
CREATE INDEX idx_resource_analytics_event ON metrics.resource_analytics(event_type);

CREATE INDEX idx_course_analytics_course ON metrics.course_analytics(course_id);
CREATE INDEX idx_course_analytics_user ON metrics.course_analytics(user_id);
CREATE INDEX idx_course_analytics_event ON metrics.course_analytics(event_type);

-- Create views for Superset
\c gitthub;

CREATE OR REPLACE VIEW databank_summary AS
SELECT 
    COUNT(DISTINCT r.id) as total_resources,
    COUNT(DISTINCT r.user_id) as unique_users,
    COUNT(DISTINCT r.category) as categories,
    COUNT(DISTINCT r.format) as formats,
    SUM(r.download_count) as total_downloads,
    AVG(r.file_size) as avg_file_size
FROM databank.resources r;

CREATE OR REPLACE VIEW course_summary AS
SELECT 
    c.id,
    c.title,
    c.level,
    c.duration_hours,
    c.enrollment_count,
    c.completion_rate,
    c.rating,
    COUNT(DISTINCT up.user_id) as active_users,
    AVG(up.progress_percentage) as avg_progress
FROM courses c
LEFT JOIN user_progress up ON c.id = up.course_id
GROUP BY c.id, c.title, c.level, c.duration_hours, 
         c.enrollment_count, c.completion_rate, c.rating;

-- Grant permissions for Superset user
GRANT ALL PRIVILEGES ON DATABASE gitthub TO superset;
GRANT ALL PRIVILEGES ON DATABASE analytics TO superset;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO superset;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA databank TO superset;
\c analytics;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA metrics TO superset;