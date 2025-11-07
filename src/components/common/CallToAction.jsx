import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'

// Styled Components for the CTA Section
const CTASection = styled(motion.div)`
  text-align: center;
  padding: 10rem 2rem;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  margin: 0 -5rem;

  @media (max-width: 1024px) {
    margin: 0 -3rem;
  }

  @media (max-width: 768px) {
    margin: 0 -1.5rem;
    padding: 8rem 2rem;
  }
`

const CTATitle = styled(motion.h3)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  margin: 0 0 3rem 0;
  color: #000;
`

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 3.5rem;
  border: 1px solid #000;
  color: #000;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: transparent;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #000;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover {
    color: #fff;
    border-color: #000;

    &::before {
      transform: scaleX(1);
    }
  }
`

// The Reusable Component
const CallToAction = ({
  title = 'Discover Your Style',
  buttonText = 'Explore Collections',
  buttonLink = '/collections',
}) => {
  const ctaRef = useRef(null)
  // Animation logic is now self-contained within this component
  const ctaInView = useInView(ctaRef, { once: false, margin: '-100px' })
  return (
    <CTASection
      ref={ctaRef}
      initial={{ opacity: 0, y: 20 }}
      animate={ctaInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
    >
      <CTATitle>{title}</CTATitle>
      <CTAButton href={buttonLink} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {buttonText}
      </CTAButton>
    </CTASection>
  )
}

export default CallToAction
