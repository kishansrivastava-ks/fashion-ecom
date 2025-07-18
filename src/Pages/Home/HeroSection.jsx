import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaPlay, FaUsers, FaGraduationCap, FaStar, FaArrowRight } from 'react-icons/fa'

const HeroSection = () => {
  const stats = [
    { number: '50K+', label: 'Active Students', icon: <FaUsers /> },
    { number: '200+', label: 'Expert Courses', icon: <FaGraduationCap /> },
    { number: '4.9', label: 'Average Rating', icon: <FaStar /> },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <HeroContainer>
      <BackgroundOverlay />
      <FloatingElements>
        <FloatingElement delay={0} />
        <FloatingElement delay={1.5} />
        <FloatingElement delay={3} />
      </FloatingElements>

      <ContentWrapper>
        <HeroContent
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Badge as={motion.div} variants={itemVariants}>
            🎓 #1 Learning Platform
          </Badge>

          <MainHeading as={motion.h1} variants={itemVariants}>
            Master New Skills with
            <GradientText> World-Class Courses</GradientText>
          </MainHeading>

          <SubHeading as={motion.p} variants={itemVariants}>
            Join thousands of professionals advancing their careers with our expert-led courses.
            Learn from industry leaders and transform your future today.
          </SubHeading>

          <ButtonGroup as={motion.div} variants={itemVariants}>
            <PrimaryButton
              as={motion.button}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning Now
              <FaArrowRight />
            </PrimaryButton>

            <SecondaryButton
              as={motion.button}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayIcon>
                <FaPlay />
              </PlayIcon>
              Watch Demo
            </SecondaryButton>
          </ButtonGroup>

          <StatsContainer as={motion.div} variants={itemVariants}>
            {stats.map((stat, index) => (
              <StatItem key={index}>
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsContainer>
        </HeroContent>

        <HeroImage
          as={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ImageContainer>
            <MainImage
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center"
              alt="Students learning together"
            />
            <ImageOverlay />
          </ImageContainer>

          <FloatingCard
            as={motion.div}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <CardIcon>🏆</CardIcon>
            <CardText>
              <CardTitle>Achievement Unlocked</CardTitle>
              <CardSubtitle>Course Completion Rate: 95%</CardSubtitle>
            </CardText>
          </FloatingCard>
        </HeroImage>
      </ContentWrapper>

      <ScrollIndicator
        as={motion.div}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ScrollArrow />
      </ScrollIndicator>
    </HeroContainer>
  )
}

export default HeroSection

const HeroContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url('https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=1080&fit=crop');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
  backdrop-filter: blur(1px);
`

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);

  &:nth-child(1) {
    top: 20%;
    left: 10%;
  }

  &:nth-child(2) {
    top: 60%;
    right: 15%;
  }

  &:nth-child(3) {
    bottom: 30%;
    left: 20%;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`

const HeroContent = styled.div`
  color: white;

  @media (max-width: 768px) {
    order: 2;
  }
`

const Badge = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const MainHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const GradientText = styled.span`
  background: linear-gradient(45deg, #ffeaa7 0%, #fab1a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const SubHeading = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 100%;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #ffeaa7 0%, #fab1a0 100%);
  color: #2d3748;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 234, 167, 0.3);
`

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
`

const PlayIcon = styled.div`
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const StatItem = styled.div`
  text-align: center;
`

const StatIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
`

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`

const HeroImage = styled.div`
  position: relative;

  @media (max-width: 768px) {
    order: 1;
  }
`

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
`

const FloatingCard = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 220px;
`

const CardIcon = styled.div`
  font-size: 2rem;
`

const CardText = styled.div`
  flex: 1;
`

const CardTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
`

const CardSubtitle = styled.div`
  font-size: 0.8rem;
  color: #64748b;
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  cursor: pointer;
`

const ScrollArrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  transform: rotate(45deg);
`

// Add floating animation to floating elements
// React.useEffect(() => {
//   const elements = document.querySelectorAll('[class*="FloatingElement"]')
//   elements.forEach((element, index) => {
//     element.style.animation = `float ${3 + index}s ease-in-out infinite`
//   })
// }, [])

// Add keyframes for floating animation
const style = document.createElement('style')
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`
document.head.appendChild(style)
