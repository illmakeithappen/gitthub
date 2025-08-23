import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LibraryContainer = styled.div`
  min-height: 100vh;
  background: var(--gitthub-white);
`;

const LibraryHeader = styled.div`
  background: var(--gitthub-light-beige);
  border-bottom: 3px solid var(--gitthub-black);
  padding: 3rem 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: var(--gitthub-gray);
  line-height: 1.6;
`;

const LibraryContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  background: white;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  min-width: 300px;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
  }
`;

const CreateButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background: var(--gitthub-black);
  color: white;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CourseCard = styled.div`
  background: white;
  border: 2px solid var(--gitthub-gray);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CourseCardHeader = styled.div`
  background: var(--gitthub-beige);
  padding: 1.5rem;
  border-bottom: 2px solid var(--gitthub-gray);
`;

const CourseTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--gitthub-black);
  margin-bottom: 0.5rem;
`;

const CourseDescription = styled.p`
  color: var(--gitthub-gray);
  font-size: 0.95rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CourseCardBody = styled.div`
  padding: 1.5rem;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: var(--gitthub-gray);
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'published': return '#4caf50';
      case 'draft': return '#ff9800';
      default: return 'var(--gitthub-gray)';
    }
  }};
  color: white;
`;

const ViewButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--gitthub-black);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--gitthub-gray);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: var(--gitthub-light-beige);
  border-radius: 8px;
  border: 2px dashed var(--gitthub-gray);
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--gitthub-black);
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: var(--gitthub-gray);
  margin-bottom: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
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

function CourseLibrary() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [levelFilter, statusFilter]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/courses', {
        params: {
          level: levelFilter || undefined,
          status: statusFilter || undefined,
          limit: 20
        }
      });
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchCourses();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/courses/search', null, {
        params: {
          query: searchQuery,
          level: levelFilter || undefined,
          status: statusFilter || undefined
        }
      });
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error searching courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const filteredCourses = courses.filter(course => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      (course.tags && course.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  return (
    <LibraryContainer>
      <LibraryHeader>
        <HeaderContent>
          <PageTitle>AI Course Library</PageTitle>
          <PageDescription>
            Browse our collection of AI-generated courses or create your own
          </PageDescription>
        </HeaderContent>
      </LibraryHeader>

      <LibraryContent>
        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          
          <FilterSelect
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </FilterSelect>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </FilterSelect>

          <CreateButton to="/course-generator">
            + Create New Course
          </CreateButton>
        </FilterBar>

        {loading ? (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        ) : filteredCourses.length > 0 ? (
          <CoursesGrid>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id || course.course_id} onClick={() => handleViewCourse(course.id || course.course_id)}>
                <CourseCardHeader>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseDescription>{course.description}</CourseDescription>
                </CourseCardHeader>
                <CourseCardBody>
                  <CourseMeta>
                    <MetaItem>
                      <span>📚</span> {course.level}
                    </MetaItem>
                    <MetaItem>
                      <span>⏱️</span> {course.duration}
                    </MetaItem>
                    <StatusBadge status={course.status}>
                      {course.status}
                    </StatusBadge>
                  </CourseMeta>
                  {course.tags && course.tags.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.5rem',
                            margin: '0.25rem',
                            background: 'var(--gitthub-light-beige)',
                            borderRadius: '4px',
                            fontSize: '0.85rem'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <ViewButton onClick={(e) => {
                    e.stopPropagation();
                    handleViewCourse(course.id || course.course_id);
                  }}>
                    View Course
                  </ViewButton>
                </CourseCardBody>
              </CourseCard>
            ))}
          </CoursesGrid>
        ) : (
          <EmptyState>
            <EmptyStateTitle>No Courses Found</EmptyStateTitle>
            <EmptyStateText>
              {searchQuery 
                ? `No courses match your search "${searchQuery}"`
                : 'Be the first to create an AI-powered course!'
              }
            </EmptyStateText>
            <CreateButton to="/course-generator">
              Create Your First Course
            </CreateButton>
          </EmptyState>
        )}
      </LibraryContent>
    </LibraryContainer>
  );
}

export default CourseLibrary;
