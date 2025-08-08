import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- ICONS (for a real app, use a library like react-icons) ---
const RocketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 12L2 18l6-4m14-6l-6 4-4-6 4-4 6 6zM2 6l4 4" />
    <path d="M12 12l6 6" />
  </svg>
)
const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
)
const ShieldCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
)
const LightbulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.05.84 3.9 2.15 5.19L6 16h12l-1.15-1.81A6.98 6.98 0 0 0 19 9a7 7 0 0 0-7-7z"></path>
  </svg>
)
const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
  </svg>
)

// --- STYLED COMPONENTS ---
const VisionValuesContainer = styled.section`
  background-color: #f8f9fa;
  padding: 2rem 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow: hidden;
`

const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
`

const SectionHeader = styled(motion.div)`
  margin-bottom: 2rem;
`

const MainHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000080;
  margin: 0 0 1rem 0;
`

const SubHeading = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`

const ValuesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  justify-content: center;
`

const ValueCard = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 51, 128, 0.08);
  }
`

const IconWrapper = styled.div`
  color: #d9534f; // Red accent color
  margin-bottom: 1rem;
`

const ValueTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`

// --- MOCK DATA & CONFIG ---
const values = [
  { icon: <RocketIcon />, text: 'Speed with Execution Excellence' },
  { icon: <TargetIcon />, text: 'Learner Centricity' },
  { icon: <ShieldCheckIcon />, text: 'Integrity' },
  { icon: <LightbulbIcon />, text: 'Innovation Culture' },
  { icon: <LinkIcon />, text: 'Enduring Engagement' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

// --- MAIN COMPONENT ---
const VisionValuesSection = () => {
  return (
    <VisionValuesContainer>
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <MainHeading>Our Vision & Values</MainHeading>
          <SubHeading>
            Fulfilling the aspirations of millions of learners by making excellence accessible
            through learner-centric innovations and global collaborations.
          </SubHeading>
        </SectionHeader>

        <ValuesGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((value, index) => (
            <ValueCard key={index} variants={itemVariants}>
              <IconWrapper>{value.icon}</IconWrapper>
              <ValueTitle>{value.text}</ValueTitle>
            </ValueCard>
          ))}
        </ValuesGrid>
      </ContentWrapper>
    </VisionValuesContainer>
  )
}

export default VisionValuesSection
