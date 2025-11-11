import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const CollectionHero = ({ image, title, subtitle }) => {
  return (
    <HeroContainer $bgImage={image}>
      <HeroOverlay />
      <HeroContent>
        <HeroTitle
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          {title}
        </HeroTitle>
        <HeroSubtitle
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        >
          {subtitle}
        </HeroSubtitle>
      </HeroContent>
    </HeroContainer>
  )
}

// Hero Section Styles
const HeroContainer = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
  z-index: 1;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 0 2rem;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 7vw, 7rem);
  font-weight: 100;
  letter-spacing: 0.5rem;
  line-height: 0.9;
  margin: 0 0 2rem 0;
  color: white;
  text-transform: uppercase;
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 300;
  letter-spacing: 0.15rem;
  margin: 0;
  opacity: 0.95;
  line-height: 1.6;
  color: white;
`

export default CollectionHero
