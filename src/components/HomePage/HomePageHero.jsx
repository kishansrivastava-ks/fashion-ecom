import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- STYLED COMPONENTS ---

const HeroContainer = styled.section`
  height: 72vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end; /* Aligns content to the bottom */
  justify-content: flex-start; /* Aligns content to the left */
  padding: 3rem;
  background-color: #e0e0e0; // Fallback color
  /* background-image: url('https://placehold.co/1920x1080/a29bfe/ffffff?text=Your+Inspiring+Background+Image'); */
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
    /* Remove background image on mobile */
    background-image: url('/hero-mobile.jpg');
    /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
    background-image: url('/hero.jpg');

    /* Center content for mobile */
    align-items: center;
    justify-content: center;
    text-align: center;

    /* Adjust dimensions for mobile */
    height: 60vh;
    min-height: 400px;
    max-height: none;
    aspect-ratio: unset;
    padding: 2rem 1.5rem;

    /* Add subtle pattern overlay for visual interest */
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 50%);

  @media (max-width: 768px) {
    /* Remove overlay on mobile since we have a solid gradient background */
    display: none;
  }
`

const MobileContent = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    z-index: 2;
    position: relative;
  }
`

const MobileTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const MobileSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #f0f0f0;
  margin: 0;
  text-align: center;
  max-width: 300px;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
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

  @media (max-width: 768px) {
    /* Mobile button styling */
    background-color: #ffffff;
    color: #667eea;
    font-size: 1.1rem;
    padding: 1rem 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #f8f9ff;
      transform: translateY(-2px) scale(1.03);
    }
  }

  @media (max-width: 480px) {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
  }
`

const DesktopButton = styled(GetStartedButton)`
  @media (max-width: 768px) {
    display: none;
  }
`

// --- MAIN COMPONENT ---
const HomePageHero = () => {
  return (
    <HeroContainer>
      {/* <Overlay /> */}

      {/* Desktop Button - positioned as before */}
      <DesktopButton
        href="/recommendations"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
      >
        Get Started &rarr;
      </DesktopButton>

      {/* Mobile Content - only visible on mobile */}
      <MobileContent>
        <MobileTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          Your Career Path Starts Here
        </MobileTitle>

        <MobileSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          Get expert guidance and find courses to achieve your professional goals.
        </MobileSubtitle>

        <GetStartedButton
          href="/recommendations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        >
          Get Started &rarr;
        </GetStartedButton>
      </MobileContent>
    </HeroContainer>
  )
}

export default HomePageHero
