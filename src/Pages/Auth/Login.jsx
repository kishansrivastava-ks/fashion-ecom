import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
  Heart,
  Star,
  ChevronLeft,
} from 'lucide-react'
import styled from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom'
import PageTransition from '@/utils/PageTransition'
import { useAuth } from '@/contexts/AuthContext'

// Component
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const res = await login(email.trim(), password)
    setIsLoading(false)
    console.log('LOGIN RESPONSE', res)

    if (res.ok) {
      if (res.role === 'admin') {
        navigate('/admin')
        return
      }
      // on success, go to home
      navigate('/dashboard')
    } else {
      setError(res.message || 'Login failed. Try again.')
    }
  }

  const features = [
    {
      icon: <ShoppingBag size={22} />,
      title: 'Exclusive Collections',
      description: 'Access to designer pieces and limited editions',
    },
    {
      icon: <Heart size={22} />,
      title: 'Personalized Experience',
      description: 'Save favorites and get tailored recommendations',
    },
    {
      icon: <Star size={22} />,
      title: 'Member Benefits',
      description: 'Early access to sales and special offers',
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
            <BrandingTitle>Welcome Back to Luxury Fashion</BrandingTitle>

            <BrandingText>
              Sign in to access your account, manage orders, and enjoy a personalized shopping
              experience tailored just for you.
            </BrandingText>

            <Features>
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureText>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureText>
                </Feature>
              ))}
            </Features>
          </BrandingContent>

          <Testimonial
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <TestimonialText>
              "The quality and craftsmanship of Shaashee Fashion pieces are unmatched. Every
              purchase feels like an investment in timeless elegance."
            </TestimonialText>
            <TestimonialAuthor>— Priya S., Verified Customer</TestimonialAuthor>
          </Testimonial>
        </BrandingSide>

        <FormSide>
          <BackButton onClick={() => navigate('/')} whileHover={{ x: -5 }}>
            <ChevronLeft size={18} />
            Back to Home
          </BackButton>

          <FormContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MobileLogo>SHAASHEE</MobileLogo>

            <FormHeader>
              <FormTitle>Sign In</FormTitle>
              <FormSubtitle>Enter your credentials to access your account</FormSubtitle>
            </FormHeader>

            {error && (
              <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                ⚠️ {error}
              </ErrorMessage>
            )}

            <FormWrapper>
              <InputGroup>
                <Label htmlFor="email">Email Address</Label>
                <InputWrapper>
                  <InputIcon>
                    <Mail size={18} />
                  </InputIcon>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="password">Password</Label>
                <InputWrapper>
                  <InputIcon>
                    <Lock size={18} />
                  </InputIcon>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </PasswordToggle>
                </InputWrapper>
              </InputGroup>

              <FormOptions>
                <RememberMe>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </RememberMe>
                <ForgotPassword onClick={() => navigate('/forgot-password')}>
                  Forgot Password?
                </ForgotPassword>
              </FormOptions>

              <SubmitButton
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                {!isLoading && <ArrowRight size={18} />}
              </SubmitButton>
            </FormWrapper>

            <Divider>New to Shaashee?</Divider>

            <SignupPrompt>
              Don't have an account? <a href="/signup">Create one now</a>
            </SignupPrompt>
          </FormContainer>
        </FormSide>
      </Container>
    </PageTransition>
  )
}

export default Login

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
  justify-content: space-between;
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
    right: -50%;
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
`

const BrandingContent = styled(motion.div)`
  position: relative;
  z-index: 1;
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
  margin: 0 0 1.5rem 0;
  font-weight: 300;
`

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Feature = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const FeatureText = styled.div`
  flex: 1;
`

const FeatureTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.3rem;
`

const FeatureDescription = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`

const Testimonial = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 3px solid white;
  position: relative;
  z-index: 1;
  margin-top: 1rem;
`

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1rem 0;
  font-style: italic;
  font-weight: 300;
`

const TestimonialAuthor = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`

// Right Side - Login Form
const FormSide = styled.div`
  background: white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

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
  max-width: 450px;
  margin: 0 auto;
  width: 100%;
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 400;
  color: #333;
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

const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;

  input {
    accent-color: black;
  }
`

const ForgotPassword = styled.a`
  font-size: 0.9rem;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0;

  &:hover {
    color: black;
    text-decoration: underline;
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

const SignupPrompt = styled.div`
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
