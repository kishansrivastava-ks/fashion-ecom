import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

// --- DUMMY DATA ---
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

// Duplicate logos for seamless loop
const extendedPartners = [...partners, ...partners]

// --- KEYFRAMES ---
const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 8));
  }
`

// --- STYLED COMPONENTS ---

const ScrollerContainer = styled.section`
  background-color: #ffffff;
  padding: 2.5rem 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }

  @media (max-width: 480px) {
    padding: 2rem 0;
  }
`

const SectionHeader = styled(motion.div)`
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`

const MainHeading = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: #000080;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const Scroller = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
  mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);

  @media (max-width: 768px) {
    max-width: 100vw;
    padding: 0 1rem;
  }
`

const ScrollerTrack = styled.div`
  display: flex;
  width: calc(250px * 16);
  animation: ${scrollAnimation} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 1024px) {
    /* Slightly faster scroll for smaller screens */
    animation-duration: 25s;
  }

  @media (max-width: 480px) {
    animation-duration: 20s;
  }
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  padding: 0 1rem;
  flex-shrink: 0;

  img {
    height: 150px;
    aspect-ratio: 2/1;
    max-width: 100%;
    opacity: 0.85;
    transition: all 0.3s ease;
  }

  &:hover img {
    opacity: 1;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 180px;
    padding: 0 1rem;

    img {
      height: 70px;
    }
  }

  @media (max-width: 480px) {
    width: 140px;
    padding: 0 0.5rem;

    img {
      height: 60px;
    }
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
