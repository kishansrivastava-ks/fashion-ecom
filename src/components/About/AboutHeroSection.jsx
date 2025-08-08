import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- ICONS (for a real app, use a library like react-icons) ---
const PlayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)
const BriefcaseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
)
const StarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)
const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

// --- STYLED COMPONENTS (Updated with Media Queries) ---

const HeroSectionContainer = styled.section`
  background-color: #f8f9fa;
  padding: 4rem 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow: hidden;

  // Subtle background decorative shape
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -15%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 51, 128, 0.05), transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }

  // Responsive adjustments for padding on smaller screens
  @media (max-width: 992px) {
    padding: 5rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
    // Hide the decorative element on very small screens to reduce clutter
    &::before {
      display: none;
    }
  }
`

const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr; // Give slightly more space to text
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 1;

  // On tablets and below, stack the columns and center-align text
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  // Reduce the gap on mobile for a tighter layout
  @media (max-width: 768px) {
    gap: 2.5rem;
  }
`

const TextContent = styled.div``

const Breadcrumb = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  a {
    color: #003380;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const MainHeading = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: #000080;
  margin: 0 0 1.5rem 0;
  line-height: 1.25;

  // Adjust font size for tablets
  @media (max-width: 992px) {
    font-size: 2.75rem;
  }
  // Further adjust font size for mobile
  @media (max-width: 768px) {
    font-size: 2.25rem;
    line-height: 1.3;
  }
`

const Description = styled(motion.p)`
  font-size: 1.05rem;
  color: #4a5568;
  line-height: 1.7;
  max-width: 500px;
  margin-bottom: 2.5rem;

  // Center the description text when the layout is stacked
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }

  // Adjust font size and margin for mobile
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`

const StatsContainer = styled.div`
  display: grid;
  // This pattern is already responsive, it will wrap automatically.
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;

  // On very small screens, ensure cards have enough space
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`

const StatCard = styled(motion.div)`
  background-color: #ffffff;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;

  // Center content within the card when text is centered globally
  @media (max-width: 992px) {
    justify-content: center;
  }

  // Revert to left alignment for a better look in a multi-column layout on smaller screens
  @media (max-width: 570px) {
    justify-content: flex-start;
  }
`

const StatIconWrapper = styled.div`
  color: #003380;
`

const StatText = styled.div``

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;

  // Reduce font size slightly on mobile
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #718096;
`

const VideoContent = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 31, 90, 0.15);
  aspect-ratio: 16 / 10; // Enforces a landscape aspect ratio

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #003380;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background-color: white;
  }

  // Make the play button smaller on mobile
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`

const VideoCaption = styled.div`
  color: white;
`

const PersonName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const PersonTitle = styled.p`
  font-size: 0.9rem;
  margin: 0.25rem 0 0 0;
  opacity: 0.9;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

// --- MAIN COMPONENT ---
const AboutHeroSection = () => {
  return (
    <HeroSectionContainer>
      <ContentWrapper>
        <TextContent>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <Breadcrumb>
                <a href="/">Home</a> &gt; About Us
              </Breadcrumb>
              <MainHeading>Guiding Your Path to Professional Success.</MainHeading>
              <Description>
                Learning has the power to mould and transform. Be a lifelong learner and fulfill all
                your career aspirations with the Career Counselling Corporation of India, a premier
                platform that equips you with the knowledge, skills, and confidence to thrive in a
                competitive world.
              </Description>
            </motion.div>
            <StatsContainer>
              <StatCard variants={itemVariants}>
                <StatIconWrapper>
                  <StarIcon />
                </StatIconWrapper>
                <StatText>
                  <StatValue>95%+</StatValue>
                  <StatLabel>Success Rate</StatLabel>
                </StatText>
              </StatCard>
              <StatCard variants={itemVariants}>
                <StatIconWrapper>
                  <BriefcaseIcon />
                </StatIconWrapper>
                <StatText>
                  <StatValue>500+</StatValue>
                  <StatLabel>Industry Partners</StatLabel>
                </StatText>
              </StatCard>
              <StatCard variants={itemVariants}>
                <StatIconWrapper>
                  <UsersIcon />
                </StatIconWrapper>
                <StatText>
                  <StatValue>1.75L+</StatValue>
                  <StatLabel>Careers Guided</StatLabel>
                </StatText>
              </StatCard>
            </StatsContainer>
          </motion.div>
        </TextContent>
        <VideoContent variants={itemVariants} initial="hidden" animate="visible">
          <img
            src="https://placehold.co/800x500/a29bfe/ffffff?text=Our+Story"
            alt="Founder of Career Counselling Corporation of India"
          />
          <VideoOverlay>
            <PlayButtonWrapper>
              <PlayIcon />
            </PlayButtonWrapper>
            <VideoCaption>
              <PersonName>Director's Name</PersonName>
              <PersonTitle>Executive Director, CCCI</PersonTitle>
            </VideoCaption>
          </VideoOverlay>
        </VideoContent>
      </ContentWrapper>
    </HeroSectionContainer>
  )
}

export default AboutHeroSection
