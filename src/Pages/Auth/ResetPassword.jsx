import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import PageTransition from '@/utils/PageTransition'
import api from '@/api/axios'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { token } = useParams()

  const validatePassword = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validatePassword()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post('/auth/reset-password', {
        token,
        password,
        confirmPassword,
      })

      // Store the new token if provided
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }

      setIsLoading(false)
      setSuccess(true)
    } catch (err) {
      setIsLoading(false)
      setError(
        err.response?.data?.message || 'Failed to reset password. The link may have expired.'
      )
    }
  }

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: '', color: '' }
    if (password.length < 8) return { strength: 'Weak', color: '#ef4444' }
    if (password.length < 12) return { strength: 'Medium', color: '#f59e0b' }
    return { strength: 'Strong', color: '#22c55e' }
  }

  const passwordStrength = getPasswordStrength()

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
            <BrandingTitle>Create a New Password</BrandingTitle>

            <BrandingText>
              Choose a strong, unique password to secure your account. Make sure it's something
              you'll remember but others can't guess.
            </BrandingText>

            <PasswordTips
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TipsTitle>Password Guidelines:</TipsTitle>
              <TipsList>
                <TipItem>✓ At least 8 characters long</TipItem>
                <TipItem>✓ Mix of uppercase and lowercase letters</TipItem>
                <TipItem>✓ Include numbers and special characters</TipItem>
                <TipItem>✓ Avoid common words or patterns</TipItem>
              </TipsList>
            </PasswordTips>
          </BrandingContent>

          <SecurityBadge
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <BadgeIcon>🔐</BadgeIcon>
            <BadgeText>
              Your password is encrypted and stored securely. We'll never share it with anyone.
            </BadgeText>
          </SecurityBadge>
        </BrandingSide>

        <FormSide>
          <FormContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MobileLogo>SHAASHEE</MobileLogo>

            {!success ? (
              <>
                <FormHeader>
                  <FormTitle>Reset Your Password</FormTitle>
                  <FormSubtitle>Enter your new password below</FormSubtitle>
                </FormHeader>

                {error && (
                  <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={18} />
                    {error}
                  </ErrorMessage>
                )}

                <FormWrapper onSubmit={handleSubmit}>
                  <InputGroup>
                    <Label htmlFor="password">New Password</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Lock size={18} />
                      </InputIcon>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </PasswordToggle>
                    </InputWrapper>
                    {password && (
                      <PasswordStrength color={passwordStrength.color}>
                        {passwordStrength.strength}
                      </PasswordStrength>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <InputWrapper>
                      <InputIcon>
                        <Lock size={18} />
                      </InputIcon>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <PasswordToggle
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </PasswordToggle>
                    </InputWrapper>
                    {confirmPassword && password !== confirmPassword && (
                      <ValidationMessage error>Passwords do not match</ValidationMessage>
                    )}
                    {confirmPassword && password === confirmPassword && (
                      <ValidationMessage success>Passwords match ✓</ValidationMessage>
                    )}
                  </InputGroup>

                  <SubmitButton
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? 'RESETTING PASSWORD...' : 'RESET PASSWORD'}
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
                <SuccessTitle>Password Reset Successful!</SuccessTitle>
                <SuccessMessage>
                  Your password has been successfully reset. You can now login with your new
                  password.
                </SuccessMessage>
                <LoginButton
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  GO TO LOGIN
                  <ArrowRight size={18} />
                </LoginButton>
              </SuccessContainer>
            )}
          </FormContainer>
        </FormSide>
      </Container>
    </PageTransition>
  )
}

export default ResetPassword

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

const PasswordTips = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 3px solid white;
`

const TipsTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: white;
`

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const TipItem = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
`

const SecurityBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  position: relative;
  z-index: 1;
`

const BadgeIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`

const BadgeText = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
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

const ErrorMessage = styled(motion.div)`
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  padding: 1rem 3rem 1rem 3rem;
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
  font-size: 0.85rem;
  font-weight: 500;
  color: ${(props) => props.color};
  margin-top: 0.25rem;
`

const ValidationMessage = styled.div`
  font-size: 0.85rem;
  margin-top: 0.25rem;
  color: ${(props) => (props.error ? '#ef4444' : '#22c55e')};
  font-weight: 500;
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
  margin-top: 0.5rem;

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
  margin: 0 0 2.5rem 0;
  line-height: 1.6;
`

const LoginButton = styled(motion.button)`
  padding: 1.1rem 2rem;
  background: black;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }
`
