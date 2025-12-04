import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, Phone, Video, MessageCircle, User, Mail, CheckCircle } from 'lucide-react'
import styled from 'styled-components'
import FloatingNavbar from '@/components/FloatingNavbar'
import Footer from '@/components/Footer'
import Banner from '@/components/common/Banner'
import StandardNavbar from '@/components/StandardNavbar'

// Hero Section Styles
const HeroContainer = styled.section`
  height: 70vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding-top: 10vh;
`

const HeroContent = styled(motion.div)`
  text-align: center;
  color: white;
  max-width: 1200px;
  padding: 0 2rem;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 100;
  letter-spacing: 0.15rem;
  margin: 0 0 1.5rem 0;
  color: inherit;
  /* border: 2px solid white; */
  /* margin: auto; */
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 300;
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
  color: inherit;
  max-width: 700px;
  margin: auto;
`

// Consultation Types Section
const TypesSection = styled.section`
  background: white;
  padding: 5rem 0;
`

const TypesContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
`

const TypesTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 100;
  text-align: center;
  margin: 0 0 3rem 0;
  color: black;
`

const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TypeCard = styled(motion.div)`
  background: #f8f8f8;
  padding: 2.5rem 2rem;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
    background: white;
  }

  ${(props) =>
    props.selected &&
    `
    border-color: black;
    background: white;
  `}
`

const TypeIcon = styled.div`
  width: 60px;
  height: 60px;
  background: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  color: white;
`

const TypeTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 0.8rem 0;
  color: black;
`

const TypeDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 1rem 0;
  line-height: 1.5;
  font-weight: 300;
`

const TypeDuration = styled.div`
  font-size: 0.85rem;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`

// Booking Form Section
const BookingSection = styled.section`
  background: #f8f8f8;
  padding: 5rem 0;
`

const BookingContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
`

const FormWrapper = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 300;
  margin: 0 0 2rem 0;
  color: black;
  text-align: center;
`

const BookingForm = styled.form`
  display: grid;
  gap: 2rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 400;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
  }
`

const Select = styled.select`
  padding: 1rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
  }
`

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 1rem;
  color: #333;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
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
  margin: 1rem auto 0;
  min-width: 250px;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

// Benefits Section
const BenefitsSection = styled.section`
  background: white;
  padding: 5rem 0;
`

const BenefitsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
`

const BenefitsTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 100;
  text-align: center;
  margin: 0 0 3rem 0;
  color: black;
`

const BenefitsList = styled.div`
  display: grid;
  gap: 2rem;
`

const BenefitItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`

const BenefitIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #f8f8f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: black;
`

const BenefitContent = styled.div`
  flex: 1;
`

const BenefitTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  color: black;
`

const BenefitText = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.6;
  font-weight: 300;
`

// Component
const BookConsultation = () => {
  const [selectedType, setSelectedType] = useState('styling')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    consultationType: 'styling',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const typesRef = useRef(null)
  const formRef = useRef(null)
  const benefitsRef = useRef(null)

  const typesInView = useInView(typesRef, { once: true, margin: '-100px' })
  const formInView = useInView(formRef, { once: true, margin: '-100px' })
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' })

  const consultationTypes = [
    {
      id: 'styling',
      icon: <User size={24} />,
      title: 'Styling Consultation',
      description: 'Get personalized styling advice for your wardrobe and special occasions',
      duration: '30 minutes',
    },
    {
      id: 'custom',
      icon: <Calendar size={24} />,
      title: 'Custom Design',
      description: 'Discuss your custom outfit requirements and design preferences',
      duration: '45 minutes',
    },
    {
      id: 'bridal',
      icon: <CheckCircle size={24} />,
      title: 'Bridal Consultation',
      description: 'Complete bridal wardrobe planning and trousseau design session',
      duration: '60 minutes',
    },
  ]

  const benefits = [
    {
      icon: <User size={24} />,
      title: 'Expert Guidance',
      text: 'Connect with our experienced fashion designers and stylists who understand your unique needs',
    },
    {
      icon: <Calendar size={24} />,
      title: 'Flexible Scheduling',
      text: 'Choose a time that works best for you with our convenient booking system',
    },
    {
      icon: <Video size={24} />,
      title: 'Multiple Options',
      text: 'Consult via video call, phone, or visit our studio in person',
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Personalized Solutions',
      text: 'Receive tailored recommendations based on your style, body type, and preferences',
    },
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Appointment booked:', formData)
    alert('Consultation booked successfully! We will send you a confirmation email shortly.')

    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      consultationType: selectedType,
      message: '',
    })
    setIsSubmitting(false)
  }

  return (
    <div>
      {/* <FloatingNavbar /> */}
      <Banner />
      <StandardNavbar />
      {/* Hero Section */}
      <HeroContainer>
        <HeroContent>
          <HeroTitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            BOOK A CONSULTATION
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Schedule a personalized session with our fashion experts to bring your style vision to
            life
          </HeroSubtitle>
        </HeroContent>
      </HeroContainer>

      {/* Consultation Types */}
      <TypesSection ref={typesRef}>
        <TypesContainer>
          <TypesTitle
            initial={{ y: 30, opacity: 0 }}
            animate={typesInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            Choose Your Consultation Type
          </TypesTitle>

          <TypesGrid>
            {consultationTypes.map((type, index) => (
              <TypeCard
                key={type.id}
                selected={selectedType === type.id}
                onClick={() => setSelectedType(type.id)}
                initial={{ y: 50, opacity: 0 }}
                animate={typesInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <TypeIcon>{type.icon}</TypeIcon>
                <TypeTitle>{type.title}</TypeTitle>
                <TypeDescription>{type.description}</TypeDescription>
                <TypeDuration>
                  <Clock size={14} />
                  {type.duration}
                </TypeDuration>
              </TypeCard>
            ))}
          </TypesGrid>
        </TypesContainer>
      </TypesSection>

      {/* Booking Form */}
      <BookingSection ref={formRef}>
        <BookingContainer>
          <FormWrapper
            initial={{ y: 50, opacity: 0 }}
            animate={formInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <FormTitle>Schedule Your Appointment</FormTitle>

            <BookingForm onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Full Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Consultation Type *</Label>
                  <Select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    required
                  >
                    <option value="styling">Styling Consultation</option>
                    <option value="custom">Custom Design</option>
                    <option value="bridal">Bridal Consultation</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Preferred Date *</Label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Preferred Time *</Label>
                  <Select name="time" value={formData.time} onChange={handleChange} required>
                    <option value="">Select time</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Additional Details</Label>
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements, style preferences, occasion, or any specific questions you have..."
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'BOOKING...' : 'BOOK CONSULTATION'}
                <Calendar size={18} />
              </SubmitButton>
            </BookingForm>
          </FormWrapper>
        </BookingContainer>
      </BookingSection>

      {/* Benefits Section */}
      <BenefitsSection ref={benefitsRef}>
        <BenefitsContainer>
          <BenefitsTitle
            initial={{ y: 30, opacity: 0 }}
            animate={benefitsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            Why Book a Consultation?
          </BenefitsTitle>

          <BenefitsList>
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={benefitsInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <BenefitIcon>{benefit.icon}</BenefitIcon>
                <BenefitContent>
                  <BenefitTitle>{benefit.title}</BenefitTitle>
                  <BenefitText>{benefit.text}</BenefitText>
                </BenefitContent>
              </BenefitItem>
            ))}
          </BenefitsList>
        </BenefitsContainer>
      </BenefitsSection>
      <Footer />
    </div>
  )
}

export default BookConsultation
