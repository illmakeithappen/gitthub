import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const ContactSection = styled.section`
  padding: 80px 0;
  background-color: white;
`

const ContactContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`

const ContactTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #2d3748;
`

const ContactSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 3rem;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ContactInfo = styled.div`
  background-color: #f8f9fa;
  padding: 2.5rem;
  border-radius: 12px;
`

const InfoTitle = styled.h2`
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`

const InfoItem = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    color: #667eea;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #4a5568;
    line-height: 1.6;
  }
`

const ContactForm = styled.form`
  background-color: #f8f9fa;
  padding: 2.5rem;
  border-radius: 12px;
`

const FormTitle = styled.h2`
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  color: #2d3748;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 6px;
  width: 100%;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Message = styled.div`
  margin-top: 1rem;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  
  &.success {
    background-color: #c6f6d5;
    color: #22543d;
    border: 1px solid #68d391;
  }
  
  &.error {
    background-color: #fed7d7;
    color: #742a2a;
    border: 1px solid #fc8181;
  }
`

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setMessage('Please fill in all fields.')
      setMessageType('error')
      return
    }
    
    setIsSubmitting(true)
    setMessage('')
    
    try {
      const response = await axios.post('/api/contact', formData)
      
      if (response.data.success) {
        setMessage(response.data.message)
        setMessageType('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setMessage('There was an issue sending your message. Please try again.')
        setMessageType('error')
      }
    } catch (error) {
      if (error.response) {
        setMessage('There was an issue sending your message. Please try again.')
      } else {
        setMessage('Could not connect to server. The backend API may be offline.')
      }
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ContactSection>
      <ContactContainer>
        <ContactTitle>Get In Touch</ContactTitle>
        <ContactSubtitle>
          Ready to transform your data into actionable insights? Let's discuss your project.
        </ContactSubtitle>
        
        <ContactGrid>
          <ContactInfo>
            <InfoTitle>Contact Information</InfoTitle>
            
            <InfoItem>
              <h3>📧 Email</h3>
              <p>contact@gitthub.org</p>
              <p>For general inquiries and project discussions</p>
            </InfoItem>
            
            <InfoItem>
              <h3>💼 Services</h3>
              <p>We specialize in:</p>
              <p>• Data Analysis & Visualization<br/>
                 • AI & Machine Learning Solutions<br/>
                 • Data Journalism<br/>
                 • Educational Content</p>
            </InfoItem>
            
            <InfoItem>
              <h3>⚡ Response Time</h3>
              <p>We typically respond within 24 hours during business days</p>
            </InfoItem>
            
            <InfoItem>
              <h3>🌍 Global Reach</h3>
              <p>Remote-first company serving clients worldwide</p>
            </InfoItem>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            <FormTitle>Send us a Message</FormTitle>
            
            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project, timeline, and how we can help..."
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message 📤'}
            </SubmitButton>
            
            {message && (
              <Message className={messageType}>
                {message}
              </Message>
            )}
          </ContactForm>
        </ContactGrid>
      </ContactContainer>
    </ContactSection>
  )
}

export default Contact