import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: #33302e;
  color: #d6d2c4;
  padding: 3rem 0 1rem;
  margin-top: auto;
  border-top: 1px solid #4a453f;
`

const FooterContent = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    color: #ff8833;
    font-family: 'MetricWeb', Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p, a {
    color: #d6d2c4;
    text-decoration: none;
    line-height: 1.7;
    font-family: 'MetricWeb', Arial, sans-serif;
    margin-bottom: 8px;
  }
  
  a:hover {
    color: #ff8833;
    border-bottom-color: #ff8833;
  }
`

const Copyright = styled.div`
  border-top: 1px solid #4a453f;
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
  color: #999286;
  font-family: 'MetricWeb', Arial, sans-serif;
  font-size: 14px;
`

const FooterBrand = styled.div`
  margin-bottom: 1rem;
  
  h2 {
    color: #ff8833;
    font-family: 'FinancierDisplayWeb', Georgia, serif;
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  p {
    color: #999286;
    font-size: 14px;
    line-height: 1.6;
  }
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterBrand>
            <h2>gitthub</h2>
            <p>Premium AI and data science solutions transforming business intelligence</p>
          </FooterBrand>
        </FooterSection>
        
        <FooterSection>
          <h3>Solutions</h3>
          <p>Data Analytics Platform</p>
          <p>Machine Learning Models</p>
          <p>Business Intelligence</p>
          <p>Strategic Consulting</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Company</h3>
          <p>About gitthub</p>
          <p>Our Services</p>
          <p>Contact Us</p>
          <p>Career Opportunities</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Resources</h3>
          <p>Data Journalism</p>
          <p>Research Reports</p>
          <p>Industry Insights</p>
          <p>Technical Documentation</p>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © 2025 gitthub. All rights reserved. Built with FastAPI + React.
      </Copyright>
    </FooterContainer>
  )
}

export default Footer