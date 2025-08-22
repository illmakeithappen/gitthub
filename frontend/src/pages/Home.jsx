import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const HeroSection = styled.section`
  background-color: #33302e;
  color: #fff1e5;
  padding: 80px 0;
`

const HeroContainer = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`

const HeroContent = styled.div`
  
`

const HeroKicker = styled.p`
  font-family: 'MetricWeb', Arial, sans-serif;
  color: #ff8833;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
`

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 24px;
  font-weight: 600;
  line-height: 1.2;
  color: #fff1e5;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 32px;
  line-height: 1.6;
  color: #d6d2c4;
  font-family: 'MetricWeb', Arial, sans-serif;
`

const CTAButton = styled.button`
  background-color: #ff8833;
  color: white;
  padding: 16px 32px;
  font-size: 14px;
  margin-right: 16px;
  margin-bottom: 16px;
`

const SecondaryButton = styled.button`
  background-color: transparent;
  color: #ff8833;
  border: 2px solid #ff8833;
  padding: 16px 32px;
  font-size: 14px;
  
  &:hover {
    background-color: #ff8833;
    color: white;
  }
`

const HeroStats = styled.div`
  background-color: rgba(255, 241, 229, 0.1);
  padding: 2rem;
  border-left: 4px solid #ff8833;
`

const MainContent = styled.main`
  background-color: #fff1e5;
`

const FeaturesSection = styled.section`
  padding: 80px 0;
  background-color: white;
  border-top: 1px solid #d6d2c4;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 16px;
    color: #33302e;
  }
  
  p {
    font-size: 1.1rem;
    color: #66605c;
    max-width: 600px;
    margin: 0 auto;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 20px;
`

const FeatureCard = styled.div`
  background: white;
  padding: 32px 24px;
  border: 1px solid #d6d2c4;
  border-left: 4px solid #ff8833;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
  color: #ff8833;
`

const FeatureTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 1.3rem;
  color: #33302e;
`

const FeatureDescription = styled.p`
  color: #66605c;
  line-height: 1.7;
  font-family: 'MetricWeb', Arial, sans-serif;
`

const StatsSection = styled.section`
  background-color: #f6f2e9;
  padding: 60px 0;
  border-top: 1px solid #d6d2c4;
  border-bottom: 1px solid #d6d2c4;
`

const StatsContainer = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`

const ApiStatus = styled.div`
  display: inline-block;
  padding: 8px 16px;
  font-family: 'MetricWeb', Arial, sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
  background-color: ${props => props.$status === 'connected' ? '#0d7377' : '#cc0000'};
  color: white;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const StatCard = styled.div`
  h3 {
    font-size: 2.5rem;
    color: #ff8833;
    margin-bottom: 8px;
  }
  
  p {
    color: #66605c;
    font-family: 'MetricWeb', Arial, sans-serif;
    font-weight: 500;
  }
`

const Home = () => {
  const [features, setFeatures] = useState([])
  const [stats, setStats] = useState({})
  const [apiStatus, setApiStatus] = useState('disconnected')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Test API connection and fetch data
        const [featuresResponse, statsResponse] = await Promise.all([
          axios.get('/api/features'),
          axios.get('/api/stats')
        ])
        
        setFeatures(featuresResponse.data)
        setStats(statsResponse.data)
        setApiStatus('connected')
      } catch (error) {
        console.log('API not available, using fallback data')
        // Fallback data when API is not available
        setFeatures([
          {
            title: "Data Analysis",
            description: "Transform raw data into actionable insights with our advanced analytics platform",
            icon: "📊"
          },
          {
            title: "AI Solutions", 
            description: "Custom AI models and machine learning solutions tailored to your business needs",
            icon: "🤖"
          },
          {
            title: "Consulting",
            description: "Expert guidance on data strategy and AI implementation for your organization",
            icon: "💡"
          }
        ])
        setStats({ 
          total_features: 3, 
          contact_messages: 0, 
          api_version: "1.0.0" 
        })
        setApiStatus('disconnected')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroKicker>Premium AI Solutions</HeroKicker>
            <HeroTitle>Transform Data Into Strategic Advantage</HeroTitle>
            <HeroSubtitle>
              Leading AI and data science company delivering cutting-edge analytics, 
              machine learning solutions, and data journalism that drives business impact.
            </HeroSubtitle>
            <CTAButton>Get Started</CTAButton>
            <SecondaryButton>Learn More</SecondaryButton>
          </HeroContent>
          
          <HeroStats>
            <h3 style={{ color: '#ff8833', marginBottom: '16px', fontSize: '1.2rem' }}>
              Platform Status
            </h3>
            <ApiStatus $status={apiStatus}>
              {apiStatus === 'connected' ? 'API Connected' : 'API Offline'}
            </ApiStatus>
            <div style={{ marginTop: '24px' }}>
              <p style={{ color: '#d6d2c4', marginBottom: '8px' }}>
                <strong>Features:</strong> {stats.total_features || 0}
              </p>
              <p style={{ color: '#d6d2c4', marginBottom: '8px' }}>
                <strong>Messages:</strong> {stats.contact_messages || 0}
              </p>
              <p style={{ color: '#d6d2c4' }}>
                <strong>Version:</strong> {stats.api_version || 'N/A'}
              </p>
            </div>
          </HeroStats>
        </HeroContainer>
      </HeroSection>

      <MainContent>
        <FeaturesSection>
          <div className="container">
            <SectionHeader>
              <h2>Our Core Services</h2>
              <p>
                Comprehensive AI and data science solutions designed to unlock 
                the potential of your data and drive measurable business outcomes.
              </p>
            </SectionHeader>
            
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </div>
        </FeaturesSection>

        <StatsSection>
          <StatsContainer>
            <h2 style={{ marginBottom: '16px', color: '#33302e', fontSize: '2rem' }}>
              Market Intelligence
            </h2>
            <p style={{ color: '#66605c', marginBottom: '32px', fontSize: '1.1rem' }}>
              Real-time insights into our platform performance and capabilities
            </p>
            
            <StatsGrid>
              <StatCard>
                <h3>{stats.total_features || 0}</h3>
                <p>Active Solutions</p>
              </StatCard>
              <StatCard>
                <h3>{stats.contact_messages || 0}</h3>
                <p>Client Inquiries</p>
              </StatCard>
              <StatCard>
                <h3>{stats.api_version || 'N/A'}</h3>
                <p>Platform Version</p>
              </StatCard>
            </StatsGrid>
          </StatsContainer>
        </StatsSection>
      </MainContent>
    </>
  )
}

export default Home