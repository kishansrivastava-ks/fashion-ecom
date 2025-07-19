import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- ICONS (for a real app, use a library like react-icons) ---
const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
)
const HandshakeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 17l-3.5-3.5a1 1 0 0 1 0-1.4l3.5-3.5" />
    <path d="M18 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h13l4 4-4 4z" />
  </svg>
)
const LaptopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l-2 5H6l-2-5" />
  </svg>
)
const RupeeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3h12M6 8h12M4 13h16M4 18h16M11 21V3" />
  </svg>
)
const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

// --- STYLED COMPONENTS ---
const ExcellenceContainer = styled.section`
  background-color: #ffffff;
  padding: 6rem 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`

const MainHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000080;
  margin: 0;
`

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const FeatureCard = styled(motion.div)`
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 51, 128, 0.1);
    border-color: #003380;
  }
`

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem auto;
  border-radius: 50%;
  background-color: #003380;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 51, 128, 0.2);
`

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.75rem 0;
`

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
`

// --- MOCK DATA & CONFIG ---
const features = [
  {
    icon: <BookOpenIcon />,
    title: 'Expert-Curated Curriculum',
    description:
      'Well-created and curated curriculum delivered by best-in-class faculty and industry professionals.',
  },
  {
    icon: <HandshakeIcon />,
    title: 'Strong Hiring Network',
    description:
      'A robust network of academic and corporate hiring partners to connect you with premier opportunities.',
  },
  {
    icon: <LaptopIcon />,
    title: 'Advanced Tech Platform',
    description:
      'A modern, seamless Direct-to-Device (D2D) learning platform for an accessible and engaging experience.',
  },
  {
    icon: <RupeeIcon />,
    title: 'Flexible & Fair Pricing',
    description:
      'Value-for-money pricing structures coupled with flexible finance options to support your journey.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Legacy of Trust',
    description:
      'Built upon a foundation of decades of experience in career counselling and educational excellence.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

// --- MAIN COMPONENT ---
const ExcellenceSection = () => {
  return (
    <ExcellenceContainer>
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <MainHeading>How We Deliver Excellence</MainHeading>
      </SectionHeader>
      <Grid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} variants={itemVariants}>
            <IconWrapper>{feature.icon}</IconWrapper>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </FeatureCard>
        ))}
      </Grid>
    </ExcellenceContainer>
  )
}

export default ExcellenceSection
