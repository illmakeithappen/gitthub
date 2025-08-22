import React from 'react'
import styled from 'styled-components'

const AboutSection = styled.section`
  padding: 80px 0;
  background-color: white;
`

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`

const AboutTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
`

const AboutContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    color: #2d3748;
    margin: 2rem 0 1rem 0;
    font-size: 1.5rem;
  }
  
  ul {
    margin-left: 2rem;
    margin-bottom: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`

const About = () => {
  return (
    <AboutSection>
      <AboutContainer>
        <AboutTitle>About gitthub</AboutTitle>
        <AboutContent>
          <p>
            Welcome to <strong>gitthub</strong>, an AI and Data Science company dedicated to 
            transforming complex data into actionable insights that drive meaningful change.
          </p>
          
          <p>
            Our platform serves as a comprehensive hub for data journalism, showcasing 
            in-depth analysis on relevant topics including climate science, economic trends, 
            and social impact studies. Through interactive visualizations and evidence-based 
            reporting, we make complex data accessible to everyone.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe that data has the power to illuminate truth and drive positive change. 
            Our mission is threefold:
          </p>
          <ul>
            <li><strong>Showcase Data Science Articles:</strong> Publishing comprehensive analysis on topics that matter</li>
            <li><strong>Demonstrate AI Solutions:</strong> Providing interactive demos of cutting-edge AI applications</li>
            <li><strong>Educational Resources:</strong> Hosting a repository of educational materials for data science learning</li>
          </ul>

          <h2>What We Do</h2>
          <p>
            Our work spans multiple domains, from climate impact analysis to financial market 
            trends. We combine rigorous data analysis with compelling storytelling to create 
            content that not only informs but also engages and inspires action.
          </p>
          
          <p>
            Through our platform, you'll find interactive articles featuring real-world data 
            visualizations, comprehensive analysis reports, and tools that allow you to 
            explore data yourself. We're committed to transparency, accuracy, and making 
            data science accessible to diverse audiences.
          </p>

          <h2>Technology Stack</h2>
          <p>
            Our platform is built with modern, scalable technologies including FastAPI for 
            our backend services and React for our frontend interface. This architecture 
            ensures fast performance, reliability, and an excellent user experience across 
            all our data journalism and AI demonstration tools.
          </p>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  )
}

export default About