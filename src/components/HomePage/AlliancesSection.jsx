import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- DUMMY DATA ---
// Assuming you have 8 alliance logos in your `public` folder.
// Using placeholders for demonstration.
const alliances = [
  {
    name: 'Alliance Partner A',
    logo: '/images/alliances/cisi.png',
  },
  {
    name: 'Alliance Partner B',
    logo: '/images/alliances/nsdc.png',
  },
  {
    name: 'Alliance Partner C',
    logo: '/images/alliances/iiba.jpeg',
  },
  {
    name: 'Alliance Partner D',
    logo: '/images/alliances/nse.jpg',
  },
]

// --- STYLED COMPONENTS ---

const AlliancesContainer = styled.section`
  background-color: #f1f1f1;
  padding: 4rem 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`

const MainHeading = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: #000080;
  margin: 0;
`

const LogoGrid = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const LogoCard = styled(motion.a)`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  aspect-ratio: 16 / 9;
  text-decoration: none;

  img {
    max-width: 80%;
    max-height: 100px; // Ensures logos are of a considerable size
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 51, 128, 0.1);
    border-color: #003380;

    img {
      transform: scale(1.05);
    }
  }
`

// --- ANIMATION VARIANTS ---
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
const AlliancesSection = () => {
  return (
    <AlliancesContainer>
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <MainHeading>Our Alliances</MainHeading>
      </SectionHeader>
      <LogoGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {alliances.map((alliance, index) => (
          <LogoCard
            href="#"
            key={index}
            variants={itemVariants}
            aria-label={`Visit ${alliance.name}`}
          >
            <img src={alliance.logo} alt={`${alliance.name} logo`} />
          </LogoCard>
        ))}
      </LogoGrid>
    </AlliancesContainer>
  )
}

export default AlliancesSection
