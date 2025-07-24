import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

// --- ICONS ---
const CheckCircleIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#28a745"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

// --- STYLED COMPONENTS ---
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(5px);
`

const ModalContainer = styled(motion.div)`
  background-color: white;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
`

const InfoPanel = styled.div`
  background: #002664 linear-gradient(135deg, #001f5a 0%, #003380 100%);
  color: white;
  padding: 3.5rem;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  // Decorative quote icon for better UI
  &::before {
    content: '“';
    position: absolute;
    top: 1rem;
    left: 2rem;
    font-size: 8rem;
    color: rgba(255, 255, 255, 0.05);
    line-height: 1;
    font-family: Georgia, serif;
    z-index: 0;
  }

  h3 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    line-height: 1.3;
    z-index: 1;
    color: #d9e7ff;
  }
  p {
    font-size: 1.05rem;
    line-height: 1.7;
    color: #d9e7ff;
    max-width: 300px;
    z-index: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const FormPanel = styled.div`
  padding: 3rem;
  width: 60%;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #a0aec0;
  line-height: 1;
`

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`

const FormLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #2d3748;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #003380;
    box-shadow: 0 0 0 2px rgba(0, 51, 128, 0.2);
  }
`

const PhoneInputGroup = styled.div`
  display: flex;
`

const CountryCodeSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-right: none;
  border-radius: 8px 0 0 8px;
  background-color: #f7f8fc;
  font-size: 1rem;
`

const CheckboxGroup = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 0.75rem;

  input {
    margin-right: 0.75rem;
    height: 18px;
    width: 18px;
    accent-color: #003380;
  }
`

const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 0.85rem;
  margin: 0.25rem 0 0 0;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  border-radius: 8px;
  background-color: #003380;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled.div`
  text-align: center;
  color: #2d3748;
  h4 {
    font-size: 1.5rem;
    color: #28a745;
    margin: 1rem 0 0.5rem 0;
  }
`

// --- MAIN MODAL COMPONENT ---
const RequestCallbackModal = ({ setOpen }) => {
  const [formData, setFormData] = useState({ fullName: '', mobileNumber: '', email: '' })
  const [checkboxes, setCheckboxes] = useState({ terms: false, updates: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle, submitting, success

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setCheckboxes((prev) => ({ ...prev, [name]: checked }))
  }

  const validate = () => {
    let tempErrors = {}
    if (!formData.fullName) tempErrors.fullName = 'Full name is required.'
    if (!formData.mobileNumber) tempErrors.mobileNumber = 'Mobile number is required.'
    else if (!/^\d{10}$/.test(formData.mobileNumber))
      tempErrors.mobileNumber = 'Please enter a valid 10-digit number.'
    if (!formData.email) tempErrors.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is not valid.'
    if (!checkboxes.terms) tempErrors.terms = 'You must agree to the terms.'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setStatus('submitting')
      // Mock API call
      setTimeout(() => {
        setStatus('success')
      }, 1500)
    }
  }

  return (
    <ModalBackdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setOpen(false)}
    >
      <ModalContainer
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <InfoPanel>
          <h3>Request a Callback</h3>
          <p>Just share your details and we will call you back at your convenience.</p>
        </InfoPanel>
        <FormPanel>
          <CloseButton onClick={() => setOpen(false)}>&times;</CloseButton>
          {status === 'success' ? (
            <SuccessMessage>
              <CheckCircleIcon />
              <h4>Thank You!</h4>
              <p>Your request has been received. We will contact you shortly.</p>
            </SuccessMessage>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
                <PhoneInputGroup>
                  <CountryCodeSelect>
                    <option>+91</option>
                  </CountryCodeSelect>
                  <Input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    style={{ borderRadius: '0 8px 8px 0' }}
                  />
                </PhoneInputGroup>
                {errors.mobileNumber && <ErrorMessage>{errors.mobileNumber}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="email">Email ID</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <CheckboxGroup>
                  <input
                    type="checkbox"
                    name="terms"
                    checked={checkboxes.terms}
                    onChange={handleCheckboxChange}
                  />
                  <span>
                    By registering I agree to the <a href="#">Terms of Service</a> and{' '}
                    <a href="#">Privacy Policy</a>.
                  </span>
                </CheckboxGroup>
                {errors.terms && <ErrorMessage>{errors.terms}</ErrorMessage>}
                <CheckboxGroup>
                  <input
                    type="checkbox"
                    name="updates"
                    checked={checkboxes.updates}
                    onChange={handleCheckboxChange}
                  />
                  <span>Yes, I would like to receive updates via email.</span>
                </CheckboxGroup>
              </FormGroup>
              <SubmitButton type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Submit'}
              </SubmitButton>
            </form>
          )}
        </FormPanel>
      </ModalContainer>
    </ModalBackdrop>
  )
}

export default RequestCallbackModal
