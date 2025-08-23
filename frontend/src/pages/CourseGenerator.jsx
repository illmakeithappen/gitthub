import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--gitthub-white);
`;

const GeneratorSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
  text-align: center;
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--gitthub-gray);
  text-align: center;
  margin-bottom: 3rem;
`;

const GeneratorForm = styled.form`
  background: var(--gitthub-light-beige);
  border: 3px solid var(--gitthub-black);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gitthub-black);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`;

const CheckboxField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const GenerateButton = styled.button`
  background: var(--gitthub-black);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: block;
  margin: 2rem auto 0;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const CoursePreview = styled.div`
  background: white;
  border: 3px solid var(--gitthub-black);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
`;

const PreviewHeader = styled.div`
  border-bottom: 3px solid var(--gitthub-beige);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

const CourseTitle = styled.h2`
  font-size: 2rem;
  color: var(--gitthub-black);
  margin-bottom: 0.5rem;
`;

const CourseDescription = styled.p`
  color: var(--gitthub-gray);
  line-height: 1.6;
`;

const ModulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModuleCard = styled.div`
  background: var(--gitthub-light-beige);
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  padding: 1.5rem;
`;

const ModuleTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--gitthub-black);
`;

const ModuleDescription = styled.p`
  color: var(--gitthub-gray);
  font-size: 0.95rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--gitthub-black);
  background: ${props => props.primary ? 'var(--gitthub-black)' : 'white'};
  color: ${props => props.primary ? 'white' : 'var(--gitthub-black)'};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

function CourseGenerator() {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    topic: '',
    level: 'beginner',
    duration: '4 weeks',
    learningObjectives: '',
    targetAudience: '',
    prerequisites: '',
    includeAssessments: true,
    includeProjects: true,
    language: 'english'
  });

  const [generatedCourse, setGeneratedCourse] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedCourse(null);

    try {
      const requestData = {
        topic: formData.topic,
        level: formData.level,
        duration: formData.duration,
        learning_objectives: formData.learningObjectives.split('\n').filter(o => o.trim()),
        target_audience: formData.targetAudience,
        prerequisites: formData.prerequisites.split('\n').filter(p => p.trim()),
        include_assessments: formData.includeAssessments,
        include_projects: formData.includeProjects,
        language: formData.language,
        ai_model: 'template' // Using template model by default
      };

      const response = await axios.post('/api/courses/generate', requestData, {
        withCredentials: true
      });
      
      if (response.data.success && response.data.course) {
        setGeneratedCourse(response.data.course);
      } else {
        throw new Error('Failed to generate course');
      }
    } catch (error) {
      console.error('Error generating course:', error);
      alert('Failed to generate course. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format) => {
    if (!generatedCourse) return;

    try {
      const response = await axios.post(`/api/courses/${generatedCourse.course_id}/export`, {
        format: format,
        include_solutions: false
      });

      const blob = new Blob([response.data.data.content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = response.data.data.filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting course:', error);
      alert('Failed to export course. Please try again.');
    }
  };

  const handleViewCourse = () => {
    if (generatedCourse) {
      navigate(`/course/${generatedCourse.course_id}`);
    }
  };

  return (
    <PageContainer>
      <GeneratorSection>
        <PageTitle>AI Course Generator</PageTitle>
        <PageSubtitle>
          Create comprehensive, structured courses on any topic in seconds
        </PageSubtitle>

        <GeneratorForm onSubmit={handleGenerate}>
          <FormGrid>
            <FormField>
              <Label htmlFor="topic">Course Topic *</Label>
              <Input
                id="topic"
                name="topic"
                type="text"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="e.g., Machine Learning Fundamentals"
                required
              />
            </FormField>

            <FormField>
              <Label htmlFor="level">Difficulty Level</Label>
              <Select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </FormField>

            <FormField>
              <Label htmlFor="duration">Course Duration</Label>
              <Input
                id="duration"
                name="duration"
                type="text"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 4 weeks, 10 hours"
              />
            </FormField>

            <FormField>
              <Label htmlFor="language">Language</Label>
              <Select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
              </Select>
            </FormField>

            <FormField>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                name="targetAudience"
                type="text"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="e.g., Data scientists, Software engineers, Students"
              />
            </FormField>
          </FormGrid>

          <FormField>
            <Label htmlFor="learningObjectives">Learning Objectives (one per line)</Label>
            <Textarea
              id="learningObjectives"
              name="learningObjectives"
              value={formData.learningObjectives}
              onChange={handleInputChange}
              placeholder="Understand fundamental ML concepts&#10;Build and train models&#10;Evaluate model performance"
            />
          </FormField>

          <FormField>
            <Label htmlFor="prerequisites">Prerequisites (one per line)</Label>
            <Textarea
              id="prerequisites"
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleInputChange}
              placeholder="Basic Python programming&#10;Understanding of statistics&#10;Linear algebra fundamentals"
            />
          </FormField>

          <CheckboxField>
            <Checkbox
              type="checkbox"
              id="includeAssessments"
              name="includeAssessments"
              checked={formData.includeAssessments}
              onChange={handleInputChange}
            />
            <Label htmlFor="includeAssessments" style={{ marginBottom: 0 }}>
              Generate quizzes and assessments
            </Label>
          </CheckboxField>

          <CheckboxField>
            <Checkbox
              type="checkbox"
              id="includeProjects"
              name="includeProjects"
              checked={formData.includeProjects}
              onChange={handleInputChange}
            />
            <Label htmlFor="includeProjects" style={{ marginBottom: 0 }}>
              Include hands-on projects
            </Label>
          </CheckboxField>

          <GenerateButton type="submit" disabled={isGenerating || !formData.topic}>
            {isGenerating ? (
              <>
                <LoadingSpinner />
                Generating Course...
              </>
            ) : (
              'Generate Course'
            )}
          </GenerateButton>
        </GeneratorForm>

        {generatedCourse && (
          <CoursePreview>
            <PreviewHeader>
              <CourseTitle>{generatedCourse.title}</CourseTitle>
              <CourseDescription>{generatedCourse.description}</CourseDescription>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <span><strong>Level:</strong> {generatedCourse.level}</span>
                <span><strong>Duration:</strong> {generatedCourse.duration}</span>
                <span><strong>Modules:</strong> {generatedCourse.modules.length}</span>
              </div>
            </PreviewHeader>

            <h3 style={{ marginBottom: '1rem' }}>Course Modules</h3>
            <ModulesList>
              {generatedCourse.modules.map((module, index) => (
                <ModuleCard key={module.module_id}>
                  <ModuleTitle>
                    Module {index + 1}: {module.title}
                  </ModuleTitle>
                  <ModuleDescription>{module.description}</ModuleDescription>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--gitthub-gray)' }}>
                    {module.content_sections.length} sections • 
                    {module.activities.length} activities • 
                    {module.assessment ? '1 assessment' : 'No assessment'}
                  </div>
                </ModuleCard>
              ))}
            </ModulesList>

            <ActionButtons>
              <ActionButton primary onClick={handleViewCourse}>
                View Full Course
              </ActionButton>
              <ActionButton onClick={() => handleExport('html')}>
                Export as HTML
              </ActionButton>
              <ActionButton onClick={() => handleExport('markdown')}>
                Export as Markdown
              </ActionButton>
              <ActionButton onClick={() => handleExport('json')}>
                Export as JSON
              </ActionButton>
            </ActionButtons>
          </CoursePreview>
        )}
      </GeneratorSection>
    </PageContainer>
  );
}

export default CourseGenerator;
