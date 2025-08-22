import React from 'react'
import styled from 'styled-components'

const ServicesSection = styled.section`
  padding: 100px 0;
  background-color: white;
`

const ServicesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 40px;
`

const ServicesTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 60px;
  color: #2d2d2d;
  font-weight: 300;
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 60px;
  margin-bottom: 80px;
`

const ServiceCard = styled.div`
  text-align: center;
  padding: 40px 20px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 24px;
  opacity: 0.7;
`

const ServiceTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #2d2d2d;
  font-weight: 300;
`

const ServiceDescription = styled.p`
  color: #5a5a5a;
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 0.95rem;
`

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  max-width: 280px;
  margin: 0 auto;
  
  li {
    color: #5a5a5a;
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    font-size: 0.9rem;
    
    &:before {
      content: "•";
      color: #d4a574;
      position: absolute;
      left: 0;
    }
  }
`

const CTASection = styled.div`
  background-color: #f7f3f0;
  padding: 60px 40px;
  border-radius: 2px;
  text-align: center;
`

const CTATitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #2d2d2d;
  font-weight: 300;
`

const CTADescription = styled.p`
  font-size: 1rem;
  margin-bottom: 40px;
  color: #5a5a5a;
  line-height: 1.7;
`

const CTAButton = styled.button`
  background-color: #d4a574;
  color: white;
  padding: 14px 32px;
  font-size: 14px;
  font-weight: 300;
  border-radius: 2px;
  border: 1px solid #d4a574;
  
  &:hover {
    background-color: transparent;
    color: #d4a574;
  }
`

const Services = () => {
  const services = [
    {
      icon: "○",
      title: "Data Analytics",
      description: "Transform complex datasets into clear, actionable insights through sophisticated analytical methods.",
      features: [
        "Statistical modeling and analysis",
        "Interactive data visualizations",
        "Predictive analytics",
        "Performance dashboards"
      ]
    },
    {
      icon: "○",
      title: "AI Development",
      description: "Custom artificial intelligence solutions designed to solve specific business challenges.",
      features: [
        "Machine learning models",
        "Natural language processing",
        "Computer vision systems",
        "Process automation"
      ]
    },
    {
      icon: "○",
      title: "Strategic Consulting",
      description: "Expert guidance on implementing data-driven strategies for sustainable growth.",
      features: [
        "Data strategy development",
        "Technology assessments",
        "Team training",
        "Implementation planning"
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
          <CTATitle>Let's Work Together</CTATitle>
          <CTADescription>
            Ready to unlock the potential of your data? We'd love to discuss how we can help you achieve your goals.
          </CTADescription>
          <CTAButton>Get In Touch</CTAButton>
        </CTASection>
      </ServicesContainer>
    </ServicesSection>
  )
}

export default Services