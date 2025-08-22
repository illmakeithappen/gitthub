import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

// Get API URL from environment or use relative path
const API_URL = import.meta.env.VITE_API_URL || ''

const HomeContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`

const HeroSection = styled.section`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--gitthub-beige);
  padding: var(--spacing-xxl) var(--spacing-lg);

  @media (max-width: 768px) {
    min-height: calc(100vh - 70px);
    padding: var(--spacing-xl) var(--spacing-md);
  }
`

const HeroContent = styled.div`
  max-width: 1400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const HeroText = styled.div`
  animation: fadeInUp 1s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.03em;

  span {
    display: block;
    background: linear-gradient(135deg, var(--gitthub-black) 0%, var(--gitthub-gray) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const HeroSubtitle = styled.p`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: var(--gitthub-gray);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`

const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  text-align: center;
  min-width: 150px;

  ${props => props.$primary ? `
    background: var(--gitthub-black);
    color: var(--gitthub-beige);
    border: 2px solid var(--gitthub-black);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
  ` : `
    background: transparent;
    color: var(--gitthub-black);
    border: 2px solid var(--gitthub-black);

    &:hover {
      background: var(--gitthub-black);
      color: var(--gitthub-beige);
      transform: translateY(-3px);
    }
  `}
`

const HeroVisual = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @media (max-width: 1024px) {
    height: 400px;
  }
`

const DataVisualization = styled.div`
  width: 100%;
  height: 100%;
  background: var(--gitthub-black);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: 'gitthub';
    position: absolute;
    font-size: 8rem;
    font-weight: 900;
    color: var(--gitthub-beige);
    opacity: 0.1;
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`

const LogoDisplay = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: var(--gitthub-beige);
  z-index: 1;
  letter-spacing: -0.05em;
`

const FeaturesSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-light-beige);
  border-top: 3px solid var(--gitthub-black);
  border-bottom: 3px solid var(--gitthub-black);
`

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--spacing-xxl);
`

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 900;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
`

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--gitthub-gray);
  line-height: 1.8;
`

const FeaturesGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FeatureCard = styled.div`
  background: var(--gitthub-beige);
  border: 3px solid var(--gitthub-black);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    &::after {
      transform: translateX(0);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gitthub-black);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
`

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  font-weight: 900;
`

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--spacing-sm);
`

const FeatureDescription = styled.p`
  color: var(--gitthub-gray);
  line-height: 1.6;
`

const StatsSection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-black);
  color: var(--gitthub-beige);
  border-bottom: 3px solid var(--gitthub-black);
`

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  text-align: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const StatItem = styled.div`
  h3 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: var(--spacing-sm);
    background: linear-gradient(135deg, var(--gitthub-beige) 0%, var(--gitthub-light-beige) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.1rem;
    color: var(--gitthub-light-beige);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`

const CTASection = styled.section`
  padding: var(--spacing-xxl) var(--spacing-lg);
  background: var(--gitthub-beige);
  text-align: center;
  border-top: 3px solid var(--gitthub-black);
`

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.25rem;
    color: var(--gitthub-gray);
    margin-bottom: var(--spacing-xl);
    line-height: 1.8;
  }
`

function Home() {
  const [features, setFeatures] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    // Fetch features from API
    axios.get(`${API_URL}/api/features`)
      .then(response => {
        setFeatures(response.data.features || [])
      })
      .catch(error => {
        console.error('Error fetching features:', error)
        // Fallback features
        setFeatures([
          {
            title: "Data Analysis",
            description: "Transform raw data into actionable insights with our advanced analytics.",
            icon: "📊"
          },
          {
            title: "AI Solutions",
            description: "Leverage cutting-edge artificial intelligence for smarter decision making.",
            icon: "🤖"
          },
          {
            title: "Data Journalism",
            description: "Tell compelling stories backed by data-driven research and visualization.",
            icon: "📰"
          },
          {
            title: "Machine Learning",
            description: "Build predictive models that learn and improve from your data.",
            icon: "🧠"
          },
          {
            title: "Consulting",
            description: "Expert guidance to navigate your data transformation journey.",
            icon: "💡"
          },
          {
            title: "Training",
            description: "Empower your team with data literacy and technical skills.",
            icon: "🎓"
          }
        ])
      })

    // Fetch stats from API
    axios.get(`${API_URL}/api/stats`)
      .then(response => {
        setStats(response.data)
      })
      .catch(error => {
        console.error('Error fetching stats:', error)
        setStats({
          projects: 150,
          clients: 50,
          team: 25,
          years: 5
        })
      })
  }, [])

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTitle>
              Data Science
              <span>Meets Innovation</span>
            </HeroTitle>
            <HeroSubtitle>
              Transform your data into powerful insights with cutting-edge AI 
              and machine learning solutions tailored for modern challenges.
            </HeroSubtitle>
            <ButtonGroup>
              <Button to="/services" $primary>
                Explore Services
              </Button>
              <Button to="/contact">
                Get Started
              </Button>
            </ButtonGroup>
          </HeroText>
          <HeroVisual>
            <DataVisualization>
              <LogoDisplay>gitthub</LogoDisplay>
            </DataVisualization>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionHeader>
          <SectionTitle>What We Do</SectionTitle>
          <SectionSubtitle>
            Comprehensive data solutions designed to accelerate your digital transformation
          </SectionSubtitle>
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
      </FeaturesSection>

      {stats && (
        <StatsSection>
          <StatsGrid>
            <StatItem>
              <h3>{stats.projects || 150}+</h3>
              <p>Projects Completed</p>
            </StatItem>
            <StatItem>
              <h3>{stats.clients || 50}+</h3>
              <p>Happy Clients</p>
            </StatItem>
            <StatItem>
              <h3>{stats.team || 25}+</h3>
              <p>Team Members</p>
            </StatItem>
            <StatItem>
              <h3>{stats.years || 5}+</h3>
              <p>Years Experience</p>
            </StatItem>
          </StatsGrid>
        </StatsSection>
      )}

      <CTASection>
        <CTAContent>
          <h2>Ready to Transform Your Data?</h2>
          <p>
            Let's discuss how our expertise can help you unlock the full potential 
            of your data and drive meaningful business outcomes.
          </p>
          <Button to="/contact" $primary>
            Start Your Journey
          </Button>
        </CTAContent>
      </CTASection>
    </HomeContainer>
  )
}

export default Home