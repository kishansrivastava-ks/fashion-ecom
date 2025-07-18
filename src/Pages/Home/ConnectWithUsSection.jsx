import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa'

const ConnectWithUsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      info: 'hello@learningplatform.com',
      color: '#667eea',
    },
    {
      icon: <FaPhone />,
      title: 'Call Us',
      info: '+1 (555) 123-4567',
      color: '#43e97b',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Visit Us',
      info: '123 Learning Street, Education City',
      color: '#fa709a',
    },
  ]

  const socialLinks = [
    { icon: <FaLinkedin />, color: '#0077b5' },
    { icon: <FaTwitter />, color: '#1da1f2' },
    { icon: <FaInstagram />, color: '#e4405f' },
  ]

  return (
    <Wrapper>
      <Heading>
        <span>Get in touch</span>
        <strong>Connect with Us</strong>
      </Heading>

      <ContentContainer>
        <ContactSection
          as={motion.div}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ContactTitle>Let's Start a Conversation</ContactTitle>
          <ContactDescription>
            Have questions about our courses? Want to discuss your learning goals? We're here to
            help you on your educational journey.
          </ContactDescription>

          <ContactInfoList>
            {contactInfo.map((item, index) => (
              <ContactInfoItem
                key={index}
                as={motion.div}
                whileHover={{ scale: 1.05, x: 10 }}
                transition={{ duration: 0.3 }}
                color={item.color}
              >
                <ContactIcon color={item.color}>{item.icon}</ContactIcon>
                <ContactDetails>
                  <ContactLabel>{item.title}</ContactLabel>
                  <ContactValue>{item.info}</ContactValue>
                </ContactDetails>
              </ContactInfoItem>
            ))}
          </ContactInfoList>

          <SocialSection>
            <SocialTitle>Follow Us</SocialTitle>
            <SocialLinks>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  as={motion.a}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  color={social.color}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </SocialSection>
        </ContactSection>

        <FormSection
          as={motion.div}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FormContainer>
            <FormGroup>
              <FormLabel>Your Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how we can help you..."
                rows="5"
                required
              />
            </FormGroup>

            <SubmitButton
              type="button"
              as={motion.button}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
            >
              Send Message
            </SubmitButton>
          </FormContainer>
        </FormSection>
      </ContentContainer>
    </Wrapper>
  )
}

export default ConnectWithUsSection

const Wrapper = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #fafbfc;
  border-radius: 20px;
`

const Heading = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  span {
    display: block;
    font-size: 1.2rem;
    color: #64748b;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  strong {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-top: 0.3rem;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ContactSection = styled.div`
  padding: 0.5rem 0;
`

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`

const ContactDescription = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2rem;
`

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`

const ContactIcon = styled.div`
  width: 45px;
  height: 45px;
  background: ${(props) => `linear-gradient(135deg, ${props.color}20, ${props.color}40)`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: ${(props) => props.color};
  transition: all 0.3s ease-in-out;

  ${ContactInfoItem}:hover & {
    background: ${(props) => props.color};
    color: white;
    transform: scale(1.1);
  }
`

const ContactDetails = styled.div`
  flex: 1;
`

const ContactLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0.2rem;
`

const ContactValue = styled.div`
  font-size: 1rem;
  color: #1e293b;
  font-weight: 600;
`

const SocialSection = styled.div`
  margin-top: 2rem;
`

const SocialTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${(props) => `${props.color}15`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: ${(props) => props.color};
  text-decoration: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${(props) => props.color};
    color: white;
    box-shadow: 0 5px 15px ${(props) => `${props.color}40`};
  }
`

const FormSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
`

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  background: #fafbfc;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: white;
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease-in-out;
  background: #fafbfc;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: white;
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);

  &:hover {
    background: linear-gradient(45deg, #764ba2 0%, #667eea 100%);
    transform: translateY(-2px);
  }
`
