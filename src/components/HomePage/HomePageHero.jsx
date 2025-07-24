import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- STYLED COMPONENTS ---

const HeroContainer = styled.section`
  height: 75vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end; /* Aligns content to the bottom */
  justify-content: flex-start; /* Aligns content to the left */
  padding: 3rem;
  background-color: #e0e0e0; // Fallback color
  background-image: url('https://placehold.co/1920x1080/a29bfe/ffffff?text=Your+Inspiring+Background+Image');
  background-image: url('/hero.jpg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  aspect-ratio: 16/9;
  min-height: 50vh;
  max-height: 80vh;

  @media (max-width: 768px) {
    padding: 2rem;
    align-items: center;
    justify-content: center;
    text-align: center;

    min-height: 40vh;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 50%);
`

const GetStartedButton = styled(motion.a)`
  padding: 1rem 2.5rem;
  background-color: #ffffff;
  color: #000080;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  z-index: 1;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background-color: #f0f8ff;
  }
`

// --- MAIN COMPONENT ---
const HomePageHero = () => {
  return (
    <HeroContainer>
      <Overlay />
      <GetStartedButton
        href="/recommendations"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
      >
        Get Started &rarr;
      </GetStartedButton>
    </HeroContainer>
  )
}

export default HomePageHero
