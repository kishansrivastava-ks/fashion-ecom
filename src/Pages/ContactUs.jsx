import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, Clock } from 'lucide-react'
import styled from 'styled-components'
import FloatingNavbar from '@/components/FloatingNavbar'

// Hero Section Styles
const HeroContainer = styled.section`
  height: 80vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
`

const HeroContent = styled(motion.div)`
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 100;
  letter-spacing: 0.5rem;
  line-height: 0.9;
  margin: 0 0 2rem 0;
  color: white;
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 300;
  letter-spacing: 0.1rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
  color: inherit;
`

// Main Contact Section
const ContactSection = styled.section`
  min-height: 100vh;
  background: white;
  padding: 8rem 0;

  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 5rem;
  }
`

// Contact Form Styles
const FormContainer = styled(motion.div)`
  @media (max-width: 968px) {
    order: 2;
  }
`

const FormTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  margin: 0 0 3rem 0;
  color: black;
`

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #333;
  text-transform: uppercase;
`

const Input = styled.input`
  padding: 1.2rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: transparent;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: black;
  }

  &::placeholder {
    color: #aaa;
  }
`

const TextArea = styled.textarea`
  padding: 1.2rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: transparent;
  font-size: 1rem;
  color: #333;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: black;
  }

  &::placeholder {
    color: #aaa;
  }
`

const Select = styled.select`
  padding: 1.2rem 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: transparent;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: black;
  }

  option {
    background: white;
    color: #333;
  }
`

const SubmitButton = styled(motion.button)`
  background: black;
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

// Contact Info Styles
const InfoContainer = styled(motion.div)`
  @media (max-width: 968px) {
    order: 1;
  }
`

const InfoTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  margin: 0 0 3rem 0;
  color: black;
`

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #f8f8f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: #333;
  }
`

const InfoContent = styled.div`
  flex: 1;
`

const InfoLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  color: black;
  letter-spacing: 0.05em;
`

const InfoText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
  font-weight: 300;
`

const InfoLink = styled.a`
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

// WhatsApp CTA Section
const WhatsAppSection = styled.section`
  padding: 6rem 2rem;
  background: #f8f8f8;
  text-align: center;
`

const WhatsAppContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
`

const WhatsAppTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  margin: 0 0 1.5rem 0;
  color: black;
`

const WhatsAppText = styled(motion.p)`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.6;
  color: #666;
  margin: 0 0 3rem 0;
`

const WhatsAppButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: #25d366;
  color: white;
  text-decoration: none;
  padding: 1.2rem 2.5rem;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    background: #20ba59;
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.2rem;
  }
`

// Animation Variants
const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// Component Functions
const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          GET IN TOUCH
        </HeroTitle>
        <HeroSubtitle
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          We'd love to hear from you. Whether you have questions about our collections, need styling
          advice, or want to discuss custom designs, we're here to help.
        </HeroSubtitle>
      </HeroContent>
    </HeroContainer>
  )
}

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' })
    setIsSubmitting(false)
  }

  return (
    <ContactSection ref={ref}>
      <ContactContainer>
        <FormContainer
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <FormTitle>SEND US A MESSAGE</FormTitle>
          <ContactForm onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </InputGroup>

            <InputGroup>
              <Label>Subject</Label>
              <Select name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="general">General Inquiry</option>
                <option value="custom">Custom Design</option>
                <option value="consultation">Book Consultation</option>
                <option value="order">Order Support</option>
                <option value="wholesale">Wholesale Inquiry</option>
              </Select>
            </InputGroup>

            <InputGroup>
              <Label>Message</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements, questions, or how we can help you..."
                required
              />
            </InputGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              <Send size={18} />
            </SubmitButton>
          </ContactForm>
        </FormContainer>

        <InfoContainer
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <InfoTitle>REACH OUT TO US</InfoTitle>
          <InfoList>
            <InfoItem
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <InfoIcon>
                <Mail size={20} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>EMAIL</InfoLabel>
                <InfoText>
                  <InfoLink href="mailto:hello@luxefashion.com">hello@luxefashion.com</InfoLink>
                  <br />
                  <InfoLink href="mailto:custom@luxefashion.com">custom@luxefashion.com</InfoLink>
                </InfoText>
              </InfoContent>
            </InfoItem>

            <InfoItem
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <InfoIcon>
                <Phone size={20} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>PHONE</InfoLabel>
                <InfoText>
                  <InfoLink href="tel:+911234567890">+91 12345 67890</InfoLink>
                  <br />
                  <InfoLink href="tel:+919876543210">+91 98765 43210</InfoLink>
                </InfoText>
              </InfoContent>
            </InfoItem>

            <InfoItem
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <InfoIcon>
                <MapPin size={20} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>STUDIO ADDRESS</InfoLabel>
                <InfoText>
                  123 Fashion District,
                  <br />
                  Connaught Place,
                  <br />
                  New Delhi - 110001, India
                </InfoText>
              </InfoContent>
            </InfoItem>

            <InfoItem
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <InfoIcon>
                <Clock size={20} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>BUSINESS HOURS</InfoLabel>
                <InfoText>
                  Monday - Saturday: 10:00 AM - 8:00 PM
                  <br />
                  Sunday: 11:00 AM - 6:00 PM
                  <br />
                  <em>Appointments preferred</em>
                </InfoText>
              </InfoContent>
            </InfoItem>
          </InfoList>
        </InfoContainer>
      </ContactContainer>
    </ContactSection>
  )
}

const WhatsAppCTA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <WhatsAppSection ref={ref}>
      <WhatsAppContainer>
        <WhatsAppTitle
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          Need Immediate Assistance?
        </WhatsAppTitle>
        <WhatsAppText
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Connect with us instantly on WhatsApp for quick queries, custom design discussions, or
          styling advice. We're here to help!
        </WhatsAppText>
        <WhatsAppButton
          href="https://wa.me/919876543210?text=Hi! I'm interested in your fashion collections."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle />
          MESSAGE US ON WHATSAPP
        </WhatsAppButton>
      </WhatsAppContainer>
    </WhatsAppSection>
  )
}

// Main Contact Component
const ContactUs = () => {
  return (
    <div>
      <FloatingNavbar />
      <HeroSection />
      <ContactFormSection />
      <WhatsAppCTA />
    </div>
  )
}

export default ContactUs
