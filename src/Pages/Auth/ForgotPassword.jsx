import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ChevronLeft, CheckCircle } from 'lucide-react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import PageTransition from '@/utils/PageTransition'
import api from '@/api/axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await api.post('/auth/forgot-password', {
        email: email.trim(),
      })

      setIsLoading(false)
      setSuccess(true)
    } catch (err) {
      setIsLoading(false)
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.')
    }
  }

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
            <BrandingTitle>Password Recovery</BrandingTitle>

            <BrandingText>
              Don't worry! It happens to the best of us. Enter your email address and we'll send you
              a link to reset your password.
            </BrandingText>

            <SecurityNote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SecurityIcon>🔒</SecurityIcon>
              <SecurityText>
                <SecurityTitle>Secure Reset Process</SecurityTitle>
                <SecurityDescription>
                  The password reset link will expire in 1 hour for your security. Make sure to
                  check your spam folder if you don't see the email.
                </SecurityDescription>
              </SecurityText>
            </SecurityNote>
          </BrandingContent>

          <BackToLoginPrompt
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Remember your password? <a href="/login">Sign in here</a>
          </BackToLoginPrompt>
        </BrandingSide>

        <FormSide>
          <BackButton onClick={() => navigate('/login')} whileHover={{ x: -5 }}>
            <ChevronLeft size={18} />
            Back to Login
          </BackButton>

          <FormContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MobileLogo>SHAASHEE</MobileLogo>

            {!success ? (
              <>
                <FormHeader>
                  <FormTitle>Forgot Password?</FormTitle>
                  <FormSubtitle>
                    Enter your email address and we'll send you a password reset link
                  </FormSubtitle>
                </FormHeader>

                {error && (
                  <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    ⚠️ {error}
                  </ErrorMessage>
                )}

                <FormWrapper onSubmit={handleSubmit}>
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

                  <SubmitButton
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
                    {!isLoading && <ArrowRight size={18} />}
                  </SubmitButton>
                </FormWrapper>
              </>
            ) : (
              <SuccessContainer
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SuccessIcon>
                  <CheckCircle size={64} />
                </SuccessIcon>
                <SuccessTitle>Check Your Email</SuccessTitle>
                <SuccessMessage>
                  We've sent a password reset link to <strong>{email}</strong>
                </SuccessMessage>
                <SuccessNote>
                  Please check your inbox and click the link to reset your password. The link will
                  expire in 1 hour.
                </SuccessNote>
                <SuccessNote>
                  Didn't receive the email? Check your spam folder or{' '}
                  <ResendLink onClick={() => setSuccess(false)}>try again</ResendLink>
                </SuccessNote>
                <BackToLoginButton
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ChevronLeft size={18} />
                  Back to Login
                </BackToLoginButton>
              </SuccessContainer>
            )}
          </FormContainer>
        </FormSide>
      </Container>
    </PageTransition>
  )
}

export default ForgotPassword

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

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
  margin: 0 0 2rem 0;
  font-weight: 300;
`

const SecurityNote = styled(motion.div)`
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 3px solid white;
`

const SecurityIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
`

const SecurityText = styled.div`
  flex: 1;
`

const SecurityTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: white;
`

const SecurityDescription = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
`

const BackToLoginPrompt = styled(motion.div)`
  text-align: center;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 1;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`

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
  line-height: 1.5;
`

const ErrorMessage = styled(motion.div)`
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`

const FormWrapper = styled.form`
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

const SuccessContainer = styled(motion.div)`
  text-align: center;
  padding: 2rem 0;
`

const SuccessIcon = styled.div`
  color: #22c55e;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`

const SuccessTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  color: black;
`

const SuccessMessage = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;

  strong {
    color: black;
    font-weight: 500;
  }
`

const SuccessNote = styled.p`
  font-size: 0.9rem;
  color: #999;
  margin: 0 0 1rem 0;
  line-height: 1.6;
`

const ResendLink = styled.span`
  color: black;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;

  &:hover {
    color: #333;
  }
`

const BackToLoginButton = styled(motion.button)`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: white;
  color: black;
  border: 2px solid black;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
  }
`
