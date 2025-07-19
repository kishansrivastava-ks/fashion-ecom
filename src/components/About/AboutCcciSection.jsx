import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- STYLED COMPONENTS ---
const AboutGroupContainer = styled.section`
  background-color: #f8f9fa;
  padding: 6rem 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
`

const MainHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000080;
  margin: 0;
`

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #4a5568;
  max-width: 800px;
  margin: 1rem auto 4rem auto;
  line-height: 1.7;
`

const PartnersContainer = styled.div`
  text-align: center;
`

const PartnersHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: #718096;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const PartnersGrid = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;
`

const PartnerLogo = styled(motion.div)`
  flex-shrink: 0;

  img {
    height: 40px; // Unified height for logos
    max-width: 150px;
    filter: grayscale(100%) opacity(0.6);
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: grayscale(0%) opacity(1);
    transform: scale(1.1);
  }
`

// --- MOCK DATA & CONFIG ---
const partners = [
  { name: 'Partner 1', logo: 'https://placehold.co/300x100/f0f0f0/999?text=Partner+A' },
  { name: 'Partner 2', logo: 'https://placehold.co/300x100/f0f0f0/999?text=Partner+B' },
  { name: 'Partner 3', logo: 'https://placehold.co/300x100/f0f0f0/999?text=Partner+C' },
  { name: 'Partner 4', logo: 'https://placehold.co/300x100/f0f0f0/999?text=Partner+D' },
  { name: 'Partner 5', logo: 'https://placehold.co/300x100/f0f0f0/999?text=Partner+E' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

// --- MAIN COMPONENT ---
const AboutCcciSection = () => {
  return (
    <AboutGroupContainer>
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <MainHeading>About Career Counselling Corporation of India</MainHeading>
        </SectionHeader>

        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          With a rich legacy of knowledge and learning, the Career Counselling Corporation of India
          (CCCI) is one of the nation's most recognized brands in professional development. We are a
          leading conglomerate with a strong leadership presence across all sectors and verticals
          that are powering India’s transformation into a knowledge economy. Trusted by millions,
          CCCI prides itself in leveraging its intellectual capital and unmatched credibility to
          acquire, create, disseminate, and apply knowledge to facilitate economic and social
          development globally.
        </Description>

        <PartnersContainer>
          <PartnersHeading>Our Esteemed Partners & Collaborators</PartnersHeading>
          <PartnersGrid
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {partners.map((partner, index) => (
              <PartnerLogo key={index} variants={itemVariants}>
                <img src={partner.logo} alt={partner.name} />
              </PartnerLogo>
            ))}
          </PartnersGrid>
        </PartnersContainer>
      </ContentWrapper>
    </AboutGroupContainer>
  )
}

export default AboutCcciSection
