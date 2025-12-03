import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Phone,
  CheckCircle,
  ShoppingBag,
  Truck,
  Heart,
  ChevronLeft,
} from 'lucide-react'
import styled from 'styled-components'
import PageTransition from '@/utils/PageTransition'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

// Component
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getPasswordStrength = (password) => {
    if (password.length === 0) return null
    if (password.length < 6) return 'weak'
    if (password.length < 10) return 'medium'
    return 'strong'
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!agreedToTerms) {
      setError('Please agree to the Terms & Conditions')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    const res = await signup(formData) // payload must match backend: firstName,lastName,email,phone,password,confirmPassword
    setIsLoading(false)

    if (res.ok) {
      // backend sends back email in response
      // navigate to otp page and pass email in state or query
      navigate('/verify-otp', { state: { email: res.email } })
    } else {
      setError(res.message || 'Signup failed')
    }
  }

  const benefits = [
    {
      icon: <ShoppingBag size={22} />,
      title: 'Exclusive Access',
      description: 'First look at new collections and limited editions',
    },
    {
      icon: <Truck size={22} />,
      title: 'Free Shipping',
      description: 'Complimentary delivery on your first order',
    },
    {
      icon: <Heart size={22} />,
      title: 'Personalized Service',
      description: 'Styling recommendations tailored just for you',
    },
  ]

  return (
    <PageTransition>
      <Container>
        <BrandingSide>
          <Logo
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SHAASHEE
          </Logo>

          <BrandingContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BrandingTitle>Join the Shaashee Fashion Family</BrandingTitle>

            <BrandingText>
              Create your account today and unlock a world of exclusive fashion, personalized
              experiences, and member-only benefits.
            </BrandingText>

            <Benefits>
              {benefits.map((benefit, index) => (
                <Benefit
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <BenefitIcon>{benefit.icon}</BenefitIcon>
                  <BenefitText>
                    <BenefitTitle>{benefit.title}</BenefitTitle>
                    <BenefitDescription>{benefit.description}</BenefitDescription>
                  </BenefitText>
                </Benefit>
              ))}
            </Benefits>
          </BrandingContent>

          <PromoSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <PromoTitle>
              <CheckCircle size={20} />
              Welcome Offer
            </PromoTitle>
            <PromoText>
              Sign up now and get 10% off your first purchase plus free shipping on orders over
              ₹2,999!
            </PromoText>
          </PromoSection>
        </BrandingSide>

        <FormSide>
          <BackButton onClick={() => window.history.back()} whileHover={{ x: -5 }}>
            <ChevronLeft size={18} />
            Back
          </BackButton>

          <FormContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MobileLogo>SHAASHEE</MobileLogo>

            <FormHeader>
              <FormTitle>Create Account</FormTitle>
              <FormSubtitle>Join us and start your fashion journey</FormSubtitle>
            </FormHeader>

            {error && (
              <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                ⚠️ {error}
              </ErrorMessage>
            )}

            {success && (
              <SuccessMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <CheckCircle size={18} />
                Account created! Redirecting to verification...
              </SuccessMessage>
            )}

            <FormWrapper>
              <FormRow>
                <InputGroup>
                  <Label htmlFor="firstName">
                    First Name <Required>*</Required>
                  </Label>
                  <InputWrapper>
                    <InputIcon>
                      <User size={18} />
                    </InputIcon>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </InputWrapper>
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="lastName">
                    Last Name <Required>*</Required>
                  </Label>
                  <InputWrapper>
                    <InputIcon>
                      <User size={18} />
                    </InputIcon>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </InputWrapper>
                </InputGroup>
              </FormRow>

              <InputGroup>
                <Label htmlFor="email">
                  Email Address <Required>*</Required>
                </Label>
                <InputWrapper>
                  <InputIcon>
                    <Mail size={18} />
                  </InputIcon>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="phone">
                  Phone Number <Required>*</Required>
                </Label>
                <InputWrapper>
                  <InputIcon>
                    <Phone size={18} />
                  </InputIcon>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="password">
                  Password <Required>*</Required>
                </Label>
                <InputWrapper>
                  <InputIcon>
                    <Lock size={18} />
                  </InputIcon>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </PasswordToggle>
                </InputWrapper>
                {formData.password && (
                  <>
                    <PasswordStrength>
                      <StrengthBar active={passwordStrength} strength="weak" />
                      <StrengthBar
                        active={passwordStrength === 'medium' || passwordStrength === 'strong'}
                        strength="medium"
                      />
                      <StrengthBar active={passwordStrength === 'strong'} strength="strong" />
                    </PasswordStrength>
                    <StrengthText strength={passwordStrength}>
                      Password strength:{' '}
                      {passwordStrength
                        ? passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)
                        : ''}
                    </StrengthText>
                  </>
                )}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="confirmPassword">
                  Confirm Password <Required>*</Required>
                </Label>
                <InputWrapper>
                  <InputIcon>
                    <Lock size={18} />
                  </InputIcon>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </PasswordToggle>
                </InputWrapper>
              </InputGroup>

              <CheckboxGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the <a href="/terms-conditions">Terms & Conditions</a> and{' '}
                    <a href="/privacy-policy">Privacy Policy</a>
                  </span>
                </Checkbox>

                <Checkbox>
                  <input
                    type="checkbox"
                    checked={subscribeNewsletter}
                    onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  />
                  <span>Subscribe to our newsletter for exclusive offers and updates</span>
                </Checkbox>
              </CheckboxGroup>

              <SubmitButton
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || success}
                whileHover={{ scale: isLoading || success ? 1 : 1.02 }}
                whileTap={{ scale: isLoading || success ? 1 : 0.98 }}
              >
                {isLoading ? 'CREATING ACCOUNT...' : success ? 'SUCCESS!' : 'CREATE ACCOUNT'}
                {!isLoading && !success && <ArrowRight size={18} />}
              </SubmitButton>
            </FormWrapper>

            <Divider>Already have an account?</Divider>

            <LoginPrompt>
              <a href="/login">Sign in here</a>
            </LoginPrompt>
          </FormContainer>
        </FormSide>
      </Container>
    </PageTransition>
  )
}

export default Signup

// Main Container
const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

// Left Side - Branding
const BrandingSide = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 1.5rem;
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 968px) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  }
`

const Logo = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 100;
  letter-spacing: 0.3rem;
  margin: 0;
  position: relative;
  z-index: 1;
  color: white;
  /* border: 2px solid white; */
`

const BrandingContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  /* border: 2px solid white; */
`

const BrandingTitle = styled.h2`
  font-size: 2rem;
  font-weight: 100;
  line-height: 1.2;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.05em;
  color: white;
`

const BrandingText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 2rem 0;
  font-weight: 300;
`

const Benefits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Benefit = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const BenefitIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
`

const BenefitText = styled.div`
  flex: 1;
`

const BenefitTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.3rem;
`

const BenefitDescription = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`

const PromoSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
`

const PromoTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PromoText = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
`

// Right Side - Signup Form
const FormSide = styled.div`
  background: white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow-y: auto;

  @media (max-width: 968px) {
    padding: 2rem;
  }
`

const BackButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

const FormContainer = styled(motion.div)`
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 0;

  @media (max-width: 968px) {
    padding: 3rem 0 2rem;
  }
`

const MobileLogo = styled.h1`
  font-size: 2rem;
  font-weight: 100;
  letter-spacing: 0.2rem;
  margin: 0 0 2rem 0;
  color: black;
  text-align: center;

  @media (min-width: 969px) {
    display: none;
  }
`

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  /* border: 3px solid black; */
`

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  margin: 0 0 0.5rem 0;
  color: black;
  letter-spacing: 0.02em;
`

const FormSubtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  font-weight: 300;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 400;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`

const Required = styled.span`
  color: #e74c3c;
`

const InputWrapper = styled.div`
  position: relative;
`

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
  }

  &::placeholder {
    color: #aaa;
  }
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;

  &:hover {
    color: black;
  }
`

const PasswordStrength = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-top: 0.5rem;
`

const StrengthBar = styled.div`
  flex: 1;
  height: 4px;
  background: ${(props) =>
    props.active
      ? props.strength === 'weak'
        ? '#e74c3c'
        : props.strength === 'medium'
          ? '#f39c12'
          : '#27ae60'
      : '#e0e0e0'};
  border-radius: 2px;
  transition: background 0.3s ease;
`

const StrengthText = styled.div`
  font-size: 0.85rem;
  color: ${(props) =>
    props.strength === 'weak'
      ? '#e74c3c'
      : props.strength === 'medium'
        ? '#f39c12'
        : props.strength === 'strong'
          ? '#27ae60'
          : '#999'};
  margin-top: 0.3rem;
`

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Checkbox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  line-height: 1.5;

  input {
    margin-top: 0.2rem;
    accent-color: black;
    flex-shrink: 0;
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1.1rem;
  background: black;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e0e0e0;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`

const LoginPrompt = styled.div`
  text-align: center;
  font-size: 0.95rem;
  color: #666;
  margin-top: 1.5rem;

  a {
    color: black;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ErrorMessage = styled(motion.div)`
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
`

const SuccessMessage = styled(motion.div)`
  background: #efe;
  border: 1px solid #cfc;
  color: #3c3;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
