import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const ViewerContainer = styled.div`
  min-height: 100vh;
  background: var(--gitthub-white);
`;

const CourseHeader = styled.div`
  background: var(--gitthub-light-beige);
  border-bottom: 3px solid var(--gitthub-black);
  padding: 3rem 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CourseTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
`;

const CourseDescription = styled.p`
  font-size: 1.2rem;
  color: var(--gitthub-gray);
  line-height: 1.6;
`;

const CourseMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
`;

const CourseContent = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ModuleSidebar = styled.div`
  flex: 0 0 300px;
  background: var(--gitthub-light-beige);
  border: 2px solid var(--gitthub-gray);
  border-radius: 8px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;

  @media (max-width: 768px) {
    position: static;
    flex: 1;
  }
`;

const ModuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ModuleTab = styled.button`
  padding: 1rem;
  border: 2px solid ${props => props.active ? 'var(--gitthub-black)' : 'transparent'};
  background: ${props => props.active ? 'white' : 'transparent'};
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    background: white;
    border-color: var(--gitthub-gray);
  }
`;

const ModuleContent = styled.div`
  flex: 1;
  background: white;
  border: 2px solid var(--gitthub-gray);
  border-radius: 8px;
  padding: 2rem;
`;

const SectionContainer = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--gitthub-beige);
`;

const SectionContent = styled.div`
  line-height: 1.6;
  color: var(--gitthub-gray);
`;

const CodeBlock = styled.pre`
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  margin: 1rem 0;
`;

const ActivityCard = styled.div`
  background: var(--gitthub-light-beige);
  border-left: 4px solid var(--gitthub-black);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 4px 4px 0;
`;

const ActivityTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--gitthub-black);
`;

const QuizContainer = styled.div`
  background: white;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

const Question = styled.div`
  margin-bottom: 1.5rem;
`;

const QuestionText = styled.p`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--gitthub-light-beige);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--gitthub-beige);
  }
`;

const ProgressBar = styled.div`
  height: 8px;
  background: var(--gitthub-light-beige);
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--gitthub-black);
  border-radius: 4px;
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid var(--gitthub-light-beige);
  border-top-color: var(--gitthub-black);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  border: 2px solid #f44;
  color: #c00;
  padding: 1rem;
  border-radius: 4px;
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
`;

function CourseViewer() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/courses/${courseId}`);
      setCourse(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!course) return 0;
    const totalModules = course.modules.length;
    const completedModules = selectedModule + 1;
    return Math.round((completedModules / totalModules) * 100);
  };

  const renderContent = (content, contentType) => {
    if (contentType === 'code') {
      return <CodeBlock>{content}</CodeBlock>;
    } else if (contentType === 'interactive') {
      return (
        <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '4px' }}>
          {content}
        </div>
      );
    } else {
      return <p>{content}</p>;
    }
  };

  if (loading) {
    return (
      <ViewerContainer>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </ViewerContainer>
    );
  }

  if (error) {
    return (
      <ViewerContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </ViewerContainer>
    );
  }

  if (!course) {
    return (
      <ViewerContainer>
        <ErrorMessage>Course not found</ErrorMessage>
      </ViewerContainer>
    );
  }

  const currentModule = course.modules[selectedModule];

  return (
    <ViewerContainer>
      <CourseHeader>
        <HeaderContent>
          <CourseTitle>{course.title}</CourseTitle>
          <CourseDescription>{course.description}</CourseDescription>
          <CourseMeta>
            <MetaItem>
              <span>📚</span>
              <strong>Level:</strong> {course.level}
            </MetaItem>
            <MetaItem>
              <span>⏱️</span>
              <strong>Duration:</strong> {course.duration}
            </MetaItem>
            <MetaItem>
              <span>📖</span>
              <strong>Modules:</strong> {course.modules.length}
            </MetaItem>
            <MetaItem>
              <span>🌐</span>
              <strong>Language:</strong> {course.language || 'English'}
            </MetaItem>
          </CourseMeta>
        </HeaderContent>
      </CourseHeader>

      <CourseContent>
        <ModuleSidebar>
          <h3 style={{ marginBottom: '1rem' }}>Course Modules</h3>
          <ProgressBar>
            <ProgressFill progress={calculateProgress()} />
          </ProgressBar>
          <ModuleList>
            {course.modules.map((module, index) => (
              <ModuleTab
                key={module.module_id}
                active={selectedModule === index}
                onClick={() => setSelectedModule(index)}
              >
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  Module {index + 1}
                </div>
                <div style={{ fontSize: '0.9rem' }}>
                  {module.title}
                </div>
              </ModuleTab>
            ))}
          </ModuleList>
        </ModuleSidebar>

        <ModuleContent>
          <h2 style={{ marginBottom: '1rem' }}>
            Module {selectedModule + 1}: {currentModule.title}
          </h2>
          <p style={{ marginBottom: '2rem', color: 'var(--gitthub-gray)' }}>
            {currentModule.description}
          </p>

          {/* Learning Objectives */}
          {currentModule.objectives && currentModule.objectives.length > 0 && (
            <SectionContainer>
              <SectionTitle>Learning Objectives</SectionTitle>
              <ul style={{ marginLeft: '1.5rem' }}>
                {currentModule.objectives.map((objective, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    {objective}
                  </li>
                ))}
              </ul>
            </SectionContainer>
          )}

          {/* Content Sections */}
          {currentModule.content_sections && currentModule.content_sections.map((section, index) => (
            <SectionContainer key={index}>
              <SectionTitle>{section.title}</SectionTitle>
              <SectionContent>
                {renderContent(section.content, section.content_type)}
                {section.duration_minutes && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--gitthub-gray)', marginTop: '0.5rem' }}>
                    ⏱️ Estimated time: {section.duration_minutes} minutes
                  </p>
                )}
              </SectionContent>
            </SectionContainer>
          ))}

          {/* Activities */}
          {currentModule.activities && currentModule.activities.length > 0 && (
            <SectionContainer>
              <SectionTitle>Activities</SectionTitle>
              {currentModule.activities.map((activity, index) => (
                <ActivityCard key={index}>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <p style={{ marginBottom: '0.5rem' }}>{activity.description}</p>
                  <strong>Instructions:</strong>
                  <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                    {activity.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                  {activity.hints && activity.hints.length > 0 && (
                    <details style={{ marginTop: '1rem' }}>
                      <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
                        💡 Hints
                      </summary>
                      <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                        {activity.hints.map((hint, i) => (
                          <li key={i}>{hint}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </ActivityCard>
              ))}
            </SectionContainer>
          )}

          {/* Assessment */}
          {currentModule.assessment && (
            <SectionContainer>
              <SectionTitle>{currentModule.assessment.title}</SectionTitle>
              <QuizContainer>
                {currentModule.assessment.questions.map((question, index) => (
                  <Question key={index}>
                    <QuestionText>
                      {index + 1}. {question.question}
                    </QuestionText>
                    <Options>
                      {question.options && question.options.map((option, optIndex) => (
                        <Option key={optIndex}>
                          <input type="radio" name={`question-${index}`} />
                          <span>{String.fromCharCode(65 + optIndex)}. {option}</span>
                        </Option>
                      ))}
                    </Options>
                  </Question>
                ))}
              </QuizContainer>
            </SectionContainer>
          )}
        </ModuleContent>
      </CourseContent>
    </ViewerContainer>
  );
}

export default CourseViewer;
