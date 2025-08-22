import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const ContactSection = styled.section`
  padding: 100px 0;
  background-color: #f7f3f0;
`

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 40px;
`

const ContactTitle = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #2d2d2d;
  font-weight: 300;
`

const ContactSubtitle = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #5a5a5a;
  margin-bottom: 60px;
  line-height: 1.7;
`

const ContactForm = styled.form`
  background-color: white;
  padding: 60px;
  border-radius: 2px;
  border: 1px solid #e8d5c4;
  max-width: 600px;
  margin: 0 auto;
`

const FormTitle = styled.h2`
  color: #2d2d2d;
  margin-bottom: 40px;
  font-size: 1.3rem;
  font-weight: 300;
  text-align: center;
`

const FormGroup = styled.div`
  margin-bottom: 30px;
`

const Label = styled.label`
  display: block;
  color: #2d2d2d;
  font-weight: 300;
  margin-bottom: 8px;
  font-size: 0.95rem;
`

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #e8d5c4;
  border-radius: 2px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #d4a574;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid #e8d5c4;
  border-radius: 2px;
  font-size: 1rem;
  min-height: 140px;
  resize: vertical;
  transition: border-color 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #d4a574;
  }
`

const SubmitButton = styled.button`
  background-color: #d4a574;
  color: white;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 300;
  border-radius: 2px;
  width: 100%;
  border: 1px solid #d4a574;
  
  &:hover {
    background-color: transparent;
    color: #d4a574;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Message = styled.div`
  margin-top: 20px;
  padding: 16px;
  border-radius: 2px;
  text-align: center;
  font-weight: 300;
  font-size: 0.95rem;
  
  &.success {
    background-color: #f0f8e8;
    color: #2d2d2d;
    border: 1px solid #d4a574;
  }
  
  &.error {
    background-color: #fef5f5;
    color: #2d2d2d;
    border: 1px solid #e8b4b4;
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
        <ContactTitle>Contact Us</ContactTitle>
        <ContactSubtitle>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </ContactSubtitle>
        
        <ContactForm onSubmit={handleSubmit}>
            <FormTitle>Get In Touch</FormTitle>
            
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
      </ContactContainer>
    </ContactSection>
  )
}

export default Contact