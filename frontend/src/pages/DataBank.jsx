import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DataBankContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  text-align: center;
  border-bottom: 3px solid var(--gitthub-black);
`;

const PageTitle = styled.h1`
  font-size: clamp(3rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.03em;
  color: var(--gitthub-black);
`;

const PageSubtitle = styled.p`
  font-size: 1.5rem;
  color: var(--gitthub-gray);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: var(--spacing-xl) var(--spacing-lg);
  background: var(--gitthub-beige);
`;

const StatsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const StatCard = styled.div`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: var(--gitthub-black);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.02em;
`;

const StatLabel = styled.div`
  color: var(--gitthub-gray);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`;

const MainContentWrapper = styled.section`
  background: var(--gitthub-light-beige);
  border-top: 3px solid var(--gitthub-black);
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-lg);
`;

const TabContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  border-bottom: 3px solid var(--gitthub-black);
  padding-bottom: var(--spacing-md);
`;

const Tab = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: ${props => props.$active ? 'var(--gitthub-black)' : 'var(--gitthub-white)'};
  color: ${props => props.$active ? 'var(--gitthub-white)' : 'var(--gitthub-black)'};
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const SearchSection = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  background: var(--gitthub-white);
  font-size: 1.1rem;
  font-weight: 600;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }

  &::placeholder {
    color: var(--gitthub-light-gray);
  }
`;

const FilterSelect = styled.select`
  padding: var(--spacing-md) var(--spacing-lg);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  background: var(--gitthub-white);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }
`;

const SearchButton = styled.button`
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--gitthub-black);
  color: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--gitthub-white);
    color: var(--gitthub-black);
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xxl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled.div`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    &::before {
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${props => props.$isLink ? 'var(--gitthub-beige)' : 'var(--gitthub-black)'};
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }
`;

const ResourceIcon = styled.div`
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  font-size: 1.5rem;
`;

const ResourceTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  letter-spacing: -0.01em;
  color: var(--gitthub-black);
  padding-right: var(--spacing-xl);
`;

const ResourceDescription = styled.p`
  color: var(--gitthub-gray);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
`;

const ResourceMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 2px solid var(--gitthub-dark-beige);
`;

const FormatBadge = styled.span`
  background: var(--gitthub-black);
  color: var(--gitthub-white);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CategoryBadge = styled.span`
  background: var(--gitthub-white);
  color: var(--gitthub-black);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  border: 2px solid var(--gitthub-black);
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

const Tag = styled.span`
  background: var(--gitthub-beige);
  color: var(--gitthub-black);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid var(--gitthub-dark-beige);
`;

const ResourceActions = styled.div`
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 2px solid var(--gitthub-dark-beige);
`;

const ActionButton = styled.button`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: ${props => props.$primary ? 'var(--gitthub-black)' : 'var(--gitthub-white)'};
  color: ${props => props.$primary ? 'var(--gitthub-white)' : 'var(--gitthub-black)'};
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: var(--spacing-md);

  &:hover {
    background: ${props => props.$primary ? 'var(--gitthub-white)' : 'var(--gitthub-black)'};
    color: ${props => props.$primary ? 'var(--gitthub-black)' : 'var(--gitthub-white)'};
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: var(--gitthub-light-beige);
    color: var(--gitthub-gray);
    border-color: var(--gitthub-dark-beige);
    cursor: not-allowed;
  }
`;

const ResourceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const InfoItem = styled.span`
  font-size: 0.875rem;
  color: var(--gitthub-gray);
  font-weight: 600;
`;

const UploadSection = styled.section`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xxl);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: var(--spacing-xl);
  letter-spacing: -0.02em;
  color: var(--gitthub-black);
`;

const UploadTypeSelector = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

const UploadTypeButton = styled.button`
  padding: var(--spacing-md) var(--spacing-lg);
  background: ${props => props.$active ? 'var(--gitthub-beige)' : 'var(--gitthub-white)'};
  color: var(--gitthub-black);
  border: 2px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--gitthub-beige);
  }
`;

const UploadForm = styled.form`
  display: grid;
  gap: var(--spacing-lg);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$half ? '1fr 1fr' : '1fr'};
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: grid;
  gap: var(--spacing-sm);
`;

const Label = styled.label`
  color: var(--gitthub-black);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
`;

const Input = styled.input`
  padding: var(--spacing-md);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  background: var(--gitthub-white);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }
`;

const TextArea = styled.textarea`
  padding: var(--spacing-md);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  min-height: 120px;
  resize: vertical;
  background: var(--gitthub-white);
  font-family: var(--font-primary);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }
`;

const Select = styled.select`
  padding: var(--spacing-md);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--gitthub-white);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }
`;

const FileInput = styled.input`
  padding: var(--spacing-md);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  background: var(--gitthub-white);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--gitthub-dark-beige);
  }

  &::file-selector-button {
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--gitthub-black);
    color: var(--gitthub-white);
    border: none;
    border-radius: var(--radius-sm);
    font-weight: 700;
    margin-right: var(--spacing-md);
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--gitthub-black);
  color: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-md);
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;

  &:hover {
    background: var(--gitthub-white);
    color: var(--gitthub-black);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--gitthub-gray);
  font-size: 1.5rem;
  font-weight: 700;
`;

const MessageCard = styled.div`
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  font-weight: 600;
  border: 3px solid var(--gitthub-black);
`;

const ErrorMessage = styled(MessageCard)`
  background: #FEE;
  color: var(--gitthub-black);
`;

const SuccessMessage = styled(MessageCard)`
  background: #EFE;
  color: var(--gitthub-black);
`;

const CourseSection = styled.section`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
`;

const ComingSoonText = styled.p`
  color: var(--gitthub-gray);
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--spacing-xxl);
  color: var(--gitthub-gray);
`;

const EmptyStateTitle = styled.h3`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  color: var(--gitthub-black);
`;

const EmptyStateText = styled.p`
  font-size: 1.25rem;
  margin-bottom: var(--spacing-xl);
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xxl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled.div`
  background: var(--gitthub-white);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CourseTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--spacing-sm);
  color: var(--gitthub-black);
`;

const CourseDescription = styled.p`
  color: var(--gitthub-gray);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 2px solid var(--gitthub-beige);
`;

const CourseLevel = styled.span`
  background: var(--gitthub-beige);
  color: var(--gitthub-black);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
`;

const CourseDuration = styled.span`
  color: var(--gitthub-gray);
  font-size: 0.875rem;
  font-weight: 600;
`;

function DataBank() {
  const [activeTab, setActiveTab] = useState('browse-resources');
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedResourceType, setSelectedResourceType] = useState(''); // 'document', 'link', or ''
  const [formats, setFormats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploadType, setUploadType] = useState('document'); // 'document' or 'link'
  
  // Upload form state for documents
  const [documentForm, setDocumentForm] = useState({
    title: '',
    description: '',
    category: '',
    file: null,
    tags: '',
    workflowCategories: []
  });

  // Upload form state for links
  const [linkForm, setLinkForm] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    fetchStats();
    fetchResources();
    fetchCourses();
    fetchFormats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/databank/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Set default stats if error
      setStats({
        total_resources: 0,
        total_documents: 0,
        total_links: 0,
        total_courses: 0,
        database_type: 'Unknown'
      });
    }
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = {
        limit: 50
      };
      if (selectedFormat) params.format = selectedFormat;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedResourceType) params.resource_type = selectedResourceType;
      
      const response = await axios.get('/api/databank/resources', { params });
      setResources(response.data.resources || []);
    } catch (err) {
      setError('Failed to load resources');
      console.error('Error fetching resources:', err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data.courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setCourses([]);
    }
  };

  const fetchFormats = async () => {
    try {
      const response = await axios.get('/api/databank/formats');
      setFormats(response.data.formats || []);
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error('Error fetching formats:', err);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/databank/resources/search', {
        query: searchQuery,
        format: selectedFormat || null,
        category: selectedCategory || null,
        resource_type: selectedResourceType || null,
        limit: 50,
        offset: 0
      });
      setResources(response.data.resources || []);
    } catch (err) {
      setError('Search failed');
      console.error('Error searching:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', documentForm.file);
    formData.append('title', documentForm.title);
    formData.append('description', documentForm.description);
    formData.append('category', documentForm.category);
    formData.append('tags', documentForm.tags);
    formData.append('workflow', documentForm.workflowCategories.join(','));

    try {
      const response = await axios.post('/api/databank/resources/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess('Document uploaded successfully!');
      setDocumentForm({
        title: '',
        description: '',
        category: '',
        file: null,
        tags: '',
        workflowCategories: []
      });
      
      // Refresh resources
      fetchResources();
      fetchStats();
      
      // Switch to browse tab
      setActiveTab('browse-resources');
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed');
      console.error('Error uploading:', err);
    }
  };

  const handleLinkUpload = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('title', linkForm.title);
    formData.append('url', linkForm.url);
    formData.append('description', linkForm.description);
    formData.append('category', linkForm.category);
    formData.append('tags', linkForm.tags);

    try {
      const response = await axios.post('/api/databank/resources/add-link', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccess('Link added successfully!');
      setLinkForm({
        title: '',
        url: '',
        description: '',
        category: '',
        tags: ''
      });
      
      // Refresh resources
      fetchResources();
      fetchStats();
      
      // Switch to browse tab
      setActiveTab('browse-resources');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add link');
      console.error('Error adding link:', err);
    }
  };

  const handleResourceAction = async (resource) => {
    try {
      if (resource.resource_type === 'link' && resource.external_url) {
        // Open external link in new tab
        window.open(resource.external_url, '_blank');
      } else if (resource.file_url) {
        // Download document from S3
        window.open(resource.file_url, '_blank');
      } else if (resource.id) {
        // Fallback to API download endpoint
        window.open(`/api/databank/resources/${resource.id}/download`, '_blank');
      }
    } catch (err) {
      setError('Action failed');
      console.error('Error:', err);
    }
  };

  const openCourse = (courseId) => {
    // Navigate to course viewer
    window.location.href = `/course/${courseId}`;
  };

  return (
    <DataBankContainer>
      <HeroSection>
        <PageTitle>Data Bank</PageTitle>
        <PageSubtitle>
          Your comprehensive hub for AI tools, datasets, and educational resources.
          Browse curated links, upload documents, and explore interactive courses.
        </PageSubtitle>
      </HeroSection>

      {stats && (
        <StatsSection>
          <StatsGrid>
            <StatCard>
              <StatNumber>{stats.total_resources || 0}</StatNumber>
              <StatLabel>Total Resources</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.total_documents || 0}</StatNumber>
              <StatLabel>Documents</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.total_links || 0}</StatNumber>
              <StatLabel>AI Tools & Links</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.total_courses || 0}</StatNumber>
              <StatLabel>Courses</StatLabel>
            </StatCard>
          </StatsGrid>
        </StatsSection>
      )}

      <MainContentWrapper>
        <MainContent>
          <TabContainer>
            <Tab $active={activeTab === 'browse-resources'} onClick={() => setActiveTab('browse-resources')}>
              Browse Resources
            </Tab>
            <Tab $active={activeTab === 'browse-courses'} onClick={() => setActiveTab('browse-courses')}>
              Browse Courses
            </Tab>
            <Tab $active={activeTab === 'upload'} onClick={() => setActiveTab('upload')}>
              Upload
            </Tab>
          </TabContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          {activeTab === 'browse-resources' && (
            <>
              <SearchSection>
                <SearchInput
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <FilterSelect
                  value={selectedResourceType}
                  onChange={(e) => setSelectedResourceType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="document">Documents</option>
                  <option value="link">Links</option>
                </FilterSelect>
                <FilterSelect
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </FilterSelect>
                <SearchButton onClick={handleSearch}>Search</SearchButton>
              </SearchSection>

              {loading ? (
                <LoadingSpinner>Loading resources...</LoadingSpinner>
              ) : resources.length > 0 ? (
                <ResourceGrid>
                  {resources.map(resource => (
                    <ResourceCard key={resource.id} $isLink={resource.resource_type === 'link'}>
                      <ResourceIcon>
                        {resource.resource_type === 'link' ? '🔗' : '📄'}
                      </ResourceIcon>
                      <ResourceTitle>{resource.title}</ResourceTitle>
                      <ResourceDescription>{resource.description}</ResourceDescription>
                      
                      <ResourceMeta>
                        <FormatBadge>
                          {resource.format || 'URL'}
                        </FormatBadge>
                        <CategoryBadge>
                          {resource.category?.replace(/_/g, ' ') || 'General'}
                        </CategoryBadge>
                      </ResourceMeta>
                      
                      {resource.tags && resource.tags.length > 0 && (
                        <TagContainer>
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <Tag key={index}>{tag}</Tag>
                          ))}
                          {resource.tags.length > 3 && (
                            <Tag>+{resource.tags.length - 3}</Tag>
                          )}
                        </TagContainer>
                      )}
                      
                      <ResourceActions>
                        <ActionButton 
                          $primary 
                          onClick={() => handleResourceAction(resource)}
                        >
                          {resource.resource_type === 'link' 
                            ? '🌐 Visit Link' 
                            : (resource.file_url ? '☁️ Download from Cloud' : '📁 Download File')}
                        </ActionButton>
                        
                        <ResourceInfo>
                          {resource.resource_type === 'link' && resource.url_metadata?.domain && (
                            <InfoItem>
                              Domain: {resource.url_metadata.domain}
                            </InfoItem>
                          )}
                          {resource.file_size && (
                            <InfoItem>
                              Size: {(resource.file_size / 1024).toFixed(1)}KB
                            </InfoItem>
                          )}
                          {resource.created_at && (
                            <InfoItem>
                              Added: {new Date(resource.created_at).toLocaleDateString()}
                            </InfoItem>
                          )}
                          {resource.access_count > 0 && (
                            <InfoItem>
                              Views: {resource.access_count}
                            </InfoItem>
                          )}
                        </ResourceInfo>
                      </ResourceActions>
                    </ResourceCard>
                  ))}
                </ResourceGrid>
              ) : (
                <EmptyState>
                  <EmptyStateTitle>No resources found</EmptyStateTitle>
                  <EmptyStateText>
                    Try adjusting your search filters or upload new resources to get started.
                  </EmptyStateText>
                </EmptyState>
              )}
            </>
          )}

          {activeTab === 'browse-courses' && (
            <>
              <SectionTitle>Available Courses</SectionTitle>
              {courses.length > 0 ? (
                <CourseGrid>
                  {courses.map(course => (
                    <CourseCard key={course.course_id || course.id} onClick={() => openCourse(course.course_id || course.id)}>
                      <CourseTitle>{course.title}</CourseTitle>
                      <CourseDescription>{course.description}</CourseDescription>
                      <CourseMeta>
                        <CourseLevel>{course.level || 'Beginner'}</CourseLevel>
                        <CourseDuration>{course.duration || '2-3 hours'}</CourseDuration>
                      </CourseMeta>
                    </CourseCard>
                  ))}
                </CourseGrid>
              ) : (
                <CourseSection>
                  <ComingSoonText>
                    AI-powered courses are being generated from our Data Bank resources.
                    Check back soon for interactive learning experiences!
                  </ComingSoonText>
                </CourseSection>
              )}
            </>
          )}

          {activeTab === 'upload' && (
            <UploadSection>
              <SectionTitle>Add New Resource</SectionTitle>
              
              <UploadTypeSelector>
                <UploadTypeButton 
                  $active={uploadType === 'document'} 
                  onClick={() => setUploadType('document')}
                >
                  📄 Upload Document
                </UploadTypeButton>
                <UploadTypeButton 
                  $active={uploadType === 'link'} 
                  onClick={() => setUploadType('link')}
                >
                  🔗 Add Link
                </UploadTypeButton>
              </UploadTypeSelector>

              {uploadType === 'document' ? (
                <UploadForm onSubmit={handleDocumentUpload}>
                  <FormRow>
                    <FormGroup>
                      <Label>Title *</Label>
                      <Input
                        type="text"
                        value={documentForm.title}
                        onChange={(e) => setDocumentForm({...documentForm, title: e.target.value})}
                        required
                        placeholder="Enter document title"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Description</Label>
                      <TextArea
                        value={documentForm.description}
                        onChange={(e) => setDocumentForm({...documentForm, description: e.target.value})}
                        placeholder="Describe your document... (optional)"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>File *</Label>
                      <FileInput
                        type="file"
                        onChange={(e) => setDocumentForm({...documentForm, file: e.target.files[0]})}
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow $half>
                    <FormGroup>
                      <Label>Category</Label>
                      <Select
                        value={documentForm.category}
                        onChange={(e) => setDocumentForm({...documentForm, category: e.target.value})}
                      >
                        <option value="">Select Category (optional)</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label>Tags (comma-separated)</Label>
                      <Input
                        type="text"
                        value={documentForm.tags}
                        onChange={(e) => setDocumentForm({...documentForm, tags: e.target.value})}
                        placeholder="e.g., machine-learning, dataset, tutorial"
                      />
                    </FormGroup>
                  </FormRow>

                  <SubmitButton type="submit">Upload Document</SubmitButton>
                </UploadForm>
              ) : (
                <UploadForm onSubmit={handleLinkUpload}>
                  <FormRow>
                    <FormGroup>
                      <Label>Title *</Label>
                      <Input
                        type="text"
                        value={linkForm.title}
                        onChange={(e) => setLinkForm({...linkForm, title: e.target.value})}
                        required
                        placeholder="Enter link title"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>URL *</Label>
                      <Input
                        type="url"
                        value={linkForm.url}
                        onChange={(e) => setLinkForm({...linkForm, url: e.target.value})}
                        required
                        placeholder="https://example.com"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Description</Label>
                      <TextArea
                        value={linkForm.description}
                        onChange={(e) => setLinkForm({...linkForm, description: e.target.value})}
                        placeholder="Describe this resource... (optional)"
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow $half>
                    <FormGroup>
                      <Label>Category</Label>
                      <Select
                        value={linkForm.category}
                        onChange={(e) => setLinkForm({...linkForm, category: e.target.value})}
                      >
                        <option value="">Select Category (optional)</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label>Tags (comma-separated)</Label>
                      <Input
                        type="text"
                        value={linkForm.tags}
                        onChange={(e) => setLinkForm({...linkForm, tags: e.target.value})}
                        placeholder="e.g., AI, tool, documentation"
                      />
                    </FormGroup>
                  </FormRow>

                  <SubmitButton type="submit">Add Link</SubmitButton>
                </UploadForm>
              )}
            </UploadSection>
          )}
        </MainContent>
      </MainContentWrapper>
    </DataBankContainer>
  );
}

export default DataBank;
