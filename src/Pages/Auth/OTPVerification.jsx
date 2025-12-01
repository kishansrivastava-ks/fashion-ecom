import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Shield,
  Clock,
  AlertCircle,
  ChevronLeft,
} from 'lucide-react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

// Component
const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(300) // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [resendCount, setResendCount] = useState(0)

  const inputRefs = useRef([])

  const location = useLocation()
  const navigate = useNavigate()
  const { verifyEmail } = useAuth()
  const userEmail = location?.state?.email || 'john.doe@example.com'

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }

    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = pastedData.split('')
    while (newOtp.length < 6) newOtp.push('')

    setOtp(newOtp)
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus()
  }

  const handleResend = async () => {
    if (!canResend) return

    setResendCount((prev) => prev + 1)
    setTimer(300)
    setCanResend(false)
    setOtp(['', '', '', '', '', ''])
    setError('')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('OTP resent to:', userEmail)
  }

  const handleVerify = async () => {
    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP')
      return
    }

    setIsVerifying(true)
    const res = await verifyEmail(userEmail, otpValue) // will set token on success
    setIsVerifying(false)

    if (res.ok) {
      setSuccess(true)
      setTimeout(() => navigate('/'), 1000) // go to home after short delay
    } else {
      setError(res.message || 'Invalid OTP')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    }
  }

  const isOtpComplete = otp.every((digit) => digit !== '')

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <BackButton onClick={() => window.history.back()} whileHover={{ x: -5 }}>
            <ChevronLeft size={16} />
            Back
          </BackButton>

          <IconWrapper
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Mail size={36} />
          </IconWrapper>

          <Logo>LUXE</Logo>
          <HeaderTitle>Verify Your Email</HeaderTitle>
          <HeaderText>We've sent a 6-digit verification code to</HeaderText>
          <EmailDisplay>
            <Mail size={16} />
            {userEmail}
          </EmailDisplay>
        </Header>

        <Content>
          {error && (
            <ErrorMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <AlertCircle size={20} />
              {error}
            </ErrorMessage>
          )}

          {success && (
            <SuccessMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle size={20} />
              Email verified successfully! Redirecting to login...
            </SuccessMessage>
          )}

          <OTPInputContainer>
            {otp.map((digit, index) => (
              <OTPInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                filled={digit !== ''}
                hasError={error !== ''}
                disabled={success}
              />
            ))}
          </OTPInputContainer>

          <TimerSection>
            <Timer expired={timer === 0}>
              <Clock size={18} />
              {timer > 0 ? <>Code expires in {formatTime(timer)}</> : <>Code expired</>}
            </Timer>
          </TimerSection>

          <VerifyButton
            onClick={handleVerify}
            disabled={!isOtpComplete || isVerifying || success}
            whileHover={{ scale: !isOtpComplete || isVerifying || success ? 1 : 1.02 }}
            whileTap={{ scale: !isOtpComplete || isVerifying || success ? 1 : 0.98 }}
          >
            {isVerifying ? 'VERIFYING...' : success ? 'VERIFIED!' : 'VERIFY EMAIL'}
            {!isVerifying && !success && <ArrowRight size={18} />}
          </VerifyButton>

          <ResendSection>
            <ResendText>Didn't receive the code?</ResendText>
            <ResendButton
              onClick={handleResend}
              disabled={!canResend || success}
              whileHover={{ scale: canResend && !success ? 1.05 : 1 }}
              whileTap={{ scale: canResend && !success ? 0.95 : 1 }}
            >
              <RefreshCw size={16} />
              {canResend ? 'Resend Code' : `Resend available in ${formatTime(timer)}`}
            </ResendButton>
            {resendCount > 0 && (
              <div style={{ fontSize: '0.85rem', color: '#27ae60', marginTop: '0.5rem' }}>
                ✓ Code resent successfully
              </div>
            )}
          </ResendSection>

          <InfoBox>
            <InfoTitle>
              <Shield size={18} />
              Security Tips
            </InfoTitle>
            <InfoList>
              <InfoItem>Never share your OTP with anyone</InfoItem>
              <InfoItem>Check your spam folder if you don't see the email</InfoItem>
              <InfoItem>The code is valid for 5 minutes only</InfoItem>
              <InfoItem>Contact support if you continue to have issues</InfoItem>
            </InfoList>
          </InfoBox>

          <ChangeEmailLink onClick={() => window.history.back()}>
            Wrong email address? Go back
          </ChangeEmailLink>
        </Content>
      </Card>
    </Container>
  )
}

export default OTPVerification

// Main Container
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%);
  padding: 2rem;
`

const Card = styled(motion.div)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  overflow: hidden;
`

const Header = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  position: relative;
`

const BackButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const IconWrapper = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  border: 2px solid rgba(255, 255, 255, 0.2);
`

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 100;
  letter-spacing: 0.2rem;
  margin: 0 0 0.5rem 0;
  color: white;
`

const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0 0 0.8rem 0;
  letter-spacing: 0.02em;
  color: white;
`

const HeaderText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 300;
  line-height: 1.5;
`

const EmailDisplay = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
`

const Content = styled.div`
  padding: 3rem 2rem;
`

const OTPInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`

const OTPInput = styled.input`
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  border: 2px solid ${(props) => (props.hasError ? '#e74c3c' : props.filled ? 'black' : '#e0e0e0')};
  background: ${(props) => (props.filled ? '#fafafa' : 'white')};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
`

const TimerSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Timer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: ${(props) => (props.expired ? '#e74c3c' : '#666')};
  background: #f8f8f8;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
`

const ResendSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const ResendText = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 1rem 0;
`

const ResendButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${(props) => (props.disabled ? '#ccc' : 'black')};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: ${(props) => (props.disabled ? 'none' : 'underline')};
  }
`

const VerifyButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
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
  margin-bottom: 1.5rem;

  &:hover {
    background: #333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled(motion.div)`
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const SuccessMessage = styled(motion.div)`
  background: #efe;
  border: 1px solid #cfc;
  color: #3c3;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const InfoBox = styled.div`
  background: #f8f8f8;
  border-left: 3px solid black;
  padding: 1.5rem;
  border-radius: 4px;
`

const InfoTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: black;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const InfoItem = styled.li`
  font-size: 0.85rem;
  color: #666;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: black;
  }
`

const ChangeEmailLink = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    color: black;
  }
`
