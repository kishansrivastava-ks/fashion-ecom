import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'

// Styled Components
const DividerSection = styled.div`
  margin: 3rem 0;
  padding: 0;
  text-align: center;
  /* border-top: 1px solid rgba(0, 0, 0, 0.08); */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.08); */

  @media (max-width: 768px) {
    margin: 10rem 0;
    padding: 5rem 0;
  }
`

const DividerText = styled(motion.p)`
  font-size: clamp(1.3rem, 3vw, 2.2rem);
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: -0.01em;
  letter-spacing: 0.6rem;
  max-width: 900px;
  margin: 0 auto;
  /* border: 2px solid red; */
  color: #000;
`

// The Reusable Component
const QuoteDivider = ({ children }) => {
  const dividerRef = useRef(null)
  // Animation logic is now self-contained within this component
  const dividerInView = useInView(dividerRef, { once: false, margin: '-100px' })

  return (
    <DividerSection ref={dividerRef}>
      <DividerText
        initial={{ opacity: 0, y: 20 }}
        animate={dividerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        A/W Collection 2025-26
      </DividerText>
    </DividerSection>
  )
}

export default QuoteDivider
