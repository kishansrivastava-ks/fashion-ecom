import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

// --- DUMMY DATA ---
// Assuming you have 8 logo images in your `public/logos` folder.
// For demonstration, I'm using placeholders.
const partners = [
  { name: 'EY', logo: '/images/partners/EY.webp' },
  { name: 'Partner 2', logo: '/images/partners/EY.webp' },
  { name: 'Partner 3', logo: '/images/partners/BARCLAYS.jpg' },
  { name: 'Partner 4', logo: '/images/partners/GENPACT.jpg' },
  { name: 'Partner 5', logo: '/images/partners/HDFC.jpeg' },
  { name: 'Partner 6', logo: '/images/partners/MCX.jpg' },
  { name: 'Partner 7', logo: '/images/partners/OSWAL.png' },
  { name: 'Partner 8', logo: '/images/partners/SAP.jpg' },
]

// To create the seamless loop, we duplicate the logos
const extendedPartners = [...partners, ...partners]

// --- STYLED COMPONENTS ---

const ScrollerContainer = styled.section`
  background-color: #ffffff;
  padding: 6rem 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  text-align: center;
`

const SectionHeader = styled(motion.div)`
  margin-bottom: 4rem;
`

const MainHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000080;
  margin: 0;
`

// Keyframes for the scrolling animation
const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 8)); 
  }
`

const Scroller = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
  mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
`

const ScrollerTrack = styled.div`
  display: flex;
  width: calc(250px * 16);
  animation: ${scrollAnimation} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  padding: 0 2rem;
  flex-shrink: 0;

  img {
    height: 100px;
    max-width: 100%;

    opacity: 0.85;
    transition: all 0.3s ease;
  }

  &:hover img {
    opacity: 1;
    transform: scale(1.05);
  }
`

// --- MAIN COMPONENT ---
const ProdegreePartners = () => {
  return (
    <ScrollerContainer>
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <MainHeading>Our Online Prodegree Partners</MainHeading>
      </SectionHeader>
      <Scroller>
        <ScrollerTrack>
          {extendedPartners.map((partner, index) => (
            <Logo href="#" key={index} aria-label={partner.name}>
              <img src={partner.logo} alt={partner.name} />
            </Logo>
          ))}
        </ScrollerTrack>
      </Scroller>
    </ScrollerContainer>
  )
}

export default ProdegreePartners
