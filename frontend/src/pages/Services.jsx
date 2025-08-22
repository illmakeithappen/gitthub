import React from 'react'
import styled from 'styled-components'

const ServicesSection = styled.section`
  padding: 80px 0;
  background-color: #f8f9fa;
`

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const ServicesTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #2d3748;
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`

const ServiceCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
  text-align: center;
`

const ServiceDescription = styled.p`
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  text-align: center;
`

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    color: #4a5568;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;
    
    &:before {
      content: "✓";
      color: #48bb78;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`

const CTASection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
`

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`

const CTAButton = styled.button`
  background-color: white;
  color: #667eea;
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 30px;
  
  &:hover {
    background-color: #f0f0f0;
  }
`

const Services = () => {
  const services = [
    {
      icon: "📊",
      title: "Data Analysis & Visualization",
      description: "Transform your raw data into compelling stories through advanced analytics and interactive visualizations.",
      features: [
        "Interactive dashboards and reports",
        "Statistical analysis and modeling",
        "Data cleaning and preprocessing",
        "Custom visualization solutions"
      ]
    },
    {
      icon: "🤖",
      title: "AI & Machine Learning",
      description: "Leverage the power of artificial intelligence to automate processes and uncover hidden insights.",
      features: [
        "Custom ML model development",
        "Natural language processing",
        "Predictive analytics",
        "AI-powered automation"
      ]
    },
    {
      icon: "📰",
      title: "Data Journalism",
      description: "Create compelling, data-driven narratives that inform and engage your audience.",
      features: [
        "Investigative data analysis",
        "Interactive story presentations",
        "Fact-checking and verification",
        "Multimedia data stories"
      ]
    },
    {
      icon: "🎓",
      title: "Educational Resources",
      description: "Comprehensive learning materials and training programs for data science and AI.",
      features: [
        "Interactive tutorials",
        "Hands-on workshops",
        "Educational content creation",
        "Training program development"
      ]
    },
    {
      icon: "💡",
      title: "Consulting Services",
      description: "Strategic guidance and expert advice for your data science and AI initiatives.",
      features: [
        "Data strategy development",
        "Technology stack recommendations",
        "Team training and mentoring",
        "Project management support"
      ]
    },
    {
      icon: "🌍",
      title: "Climate & Environmental Analysis",
      description: "Specialized analysis of climate data and environmental trends for impactful research.",
      features: [
        "Climate data visualization",
        "Environmental impact assessment",
        "Sustainability reporting",
        "Policy impact analysis"
      ]
    }
  ]

  return (
    <ServicesSection>
      <ServicesContainer>
        <ServicesTitle>Our Services</ServicesTitle>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ServiceFeatures>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <CTASection>
          <CTATitle>Ready to Get Started?</CTATitle>
          <CTADescription>
            Let's discuss how we can help transform your data into actionable insights 
            and compelling stories.
          </CTADescription>
          <CTAButton>Contact Us Today</CTAButton>
        </CTASection>
      </ServicesContainer>
    </ServicesSection>
  )
}

export default Services