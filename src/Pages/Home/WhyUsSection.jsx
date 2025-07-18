import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaUsers,
  FaGraduationCap,
  FaAward,
  FaGlobe,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaCheck,
} from 'react-icons/fa'

const whyUsFeatures = [
  {
    id: 1,
    icon: <FaUsers />,
    title: '50,000+ Professionals Trained',
    description: 'Successfully upskilled professionals across 100+ organizations worldwide',
    color: '#667eea',
  },
  {
    id: 2,
    icon: <FaGraduationCap />,
    title: 'World-Class Faculty',
    description: 'Learn from industry experts and renowned academicians with decades of experience',
    color: '#f093fb',
  },
  {
    id: 3,
    icon: <FaAward />,
    title: 'Industry-Recognized Certificates',
    description:
      'Earn certificates that are valued by top employers and enhance your career prospects',
    color: '#43e97b',
  },
  {
    id: 4,
    icon: <FaGlobe />,
    title: 'Global Recognition',
    description: 'Partnerships with leading universities and organizations worldwide',
    color: '#fa709a',
  },
]

const galleryImages = [
  {
    id: 1,
    src: '/images/web.png',
    alt: 'Students in interactive learning session',
    caption: 'Interactive Learning Environment',
  },
  {
    id: 2,
    src: '/images/banking.png',
    alt: 'Corporate training session',
    caption: 'Corporate Training Programs',
  },
  {
    id: 3,
    src: '/images/mba.jpg',
    alt: 'Graduation ceremony',
    caption: 'Celebrating Success',
  },
  {
    id: 4,
    src: '/images/online-learning.jpg',
    alt: 'Online learning platform',
    caption: 'Flexible Online Learning',
  },
]

const WhyUsSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Wrapper>
      <ContentContainer>
        <LeftColumn
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Heading as={motion.div} variants={itemVariants}>
            <span>Why Choose Us</span>
            <strong>Your Success Is Our Priority</strong>
          </Heading>

          <Description as={motion.p} variants={itemVariants}>
            We've been transforming careers and organizations for over a decade. Our proven
            methodology, expert faculty, and commitment to excellence make us the preferred choice
            for professional development.
          </Description>

          <FeaturesGrid>
            {whyUsFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                as={motion.div}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                }}
                color={feature.color}
              >
                <FeatureIcon color={feature.color}>{feature.icon}</FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureCard>
            ))}
          </FeaturesGrid>

          <StatsContainer as={motion.div} variants={itemVariants}>
            <StatItem>
              <StatNumber>15+</StatNumber>
              <StatLabel>Years of Excellence</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Expert Faculty</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>95%</StatNumber>
              <StatLabel>Success Rate</StatLabel>
            </StatItem>
          </StatsContainer>

          <CTAButton
            as={motion.button}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlay style={{ marginRight: '0.5rem' }} />
            Watch Our Story
          </CTAButton>
        </LeftColumn>

        <RightColumn
          as={motion.div}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ImageGallery>
            <MainImageContainer>
              <AnimatePresence mode="wait">
                <MainImage
                  key={currentImageIndex}
                  as={motion.img}
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].alt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              <ImageCaption>{galleryImages[currentImageIndex].caption}</ImageCaption>

              <NavButton
                direction="left"
                onClick={prevImage}
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft />
              </NavButton>

              <NavButton
                direction="right"
                onClick={nextImage}
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight />
              </NavButton>
            </MainImageContainer>

            <ThumbnailContainer>
              {galleryImages.map((image, index) => (
                <Thumbnail
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  isActive={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                  as={motion.img}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </ThumbnailContainer>
          </ImageGallery>
        </RightColumn>
      </ContentContainer>
    </Wrapper>
  )
}

export default WhyUsSection

const Wrapper = styled.div`
  padding: 4rem 4rem;
  max-width: 1500px;
  /* width: 100vw; */
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* border-radius: 20px; */
  color: white;
`

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Heading = styled.div`
  span {
    display: block;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  strong {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    line-height: 1.2;
  }
`

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`

const FeatureCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`

const FeatureIcon = styled.div`
  flex: 0 0 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
`

const FeatureContent = styled.div`
  flex: 1;
`

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
`

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 1rem 0;
`

const StatItem = styled.div`
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`

const CTAButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  align-self: flex-start;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`

const RightColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageGallery = styled.div`
  width: 100%;
  max-width: 500px;
`

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem 1.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
`

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === 'left' ? 'left: 15px;' : 'right: 15px;')}
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 2px solid ${(props) => (props.isActive ? 'white' : 'transparent')};
  opacity: ${(props) => (props.isActive ? 1 : 0.7)};

  &:hover {
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.5);
  }
`
