import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- STYLED COMPONENTS ---
const AboutGroupContainer = styled.section`
  background-color: #f8f9fa;
  padding: 4rem 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`

const ContentWrapper = styled.div`
  max-width: 1300px;
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
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 1000px;
  margin: 1rem auto 0 auto;
  line-height: 1.7;
  text-align: center;
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
          <MainHeading>About Career Counseling Corporation of India</MainHeading>
        </SectionHeader>

        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our Story began with a simple but powerful vision—to bridge the gap between talent and
          opportunity across India. Founded by a team of educators, career experts, and industry
          professionals, the Career Counseling Corporation of India (CCCI) emerged as a response to
          the growing disconnect between traditional education and real-world employment. What
          started as a small initiative to guide students in rural communities has now grown into a
          national movement empowering thousands through personalized counseling, skill development,
          and job placement. Over the years, we’ve evolved into a digitally-driven, impact-focused
          organisation that not only prepares individuals for jobs but helps them discover purpose,
          passion, and potential. CCCI continues to grow with one mission at its core: to make
          career success accessible, inclusive, and transformative for every Indian.
        </Description>

        {/* <PartnersContainer>
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
        </PartnersContainer> */}
      </ContentWrapper>
    </AboutGroupContainer>
  )
}

export default AboutCcciSection
