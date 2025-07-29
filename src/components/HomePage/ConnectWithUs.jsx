import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'
import RequestCallbackModal from '../modals/RequestCallbackModal'

// --- STYLED COMPONENTS ---

const ConnectSectionContainer = styled.section`
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`

const CtaBanner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #001f5a, #003380); // Rich blue gradient
  border-radius: 20px;
  padding: 3rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 31, 90, 0.3);

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    padding: 3rem 2rem;
  }
  @media (max-width: 768px) {
    border-radius: 0;
    padding-bottom: 4rem;
    /* margin-bottom: 1rem; */
  }
`

const TextContent = styled.div`
  z-index: 2;
  max-width: 50%;

  @media (max-width: 992px) {
    max-width: 100%;
    margin-bottom: 2.5rem;
  }
`

const Heading = styled.h2`
  color: #ffffff;
  font-size: 2.8rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`

const Subheading = styled.p`
  color: #cce0ff; // Lighter blue for soft contrast
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  max-width: 450px;

  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const CallbackButton = styled.a`
  display: inline-block;
  background-color: #ffffff;
  color: #003380;
  padding: 0.9rem 2.2rem;
  border-radius: 50px; // Pill-shaped button
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);

  &:hover {
    background-color: #f0f8ff;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
  }
`

const ImageContainer = styled.div`
  z-index: 1;
  position: relative;
  width: 300px;
  height: 300px;

  @media (max-width: 992px) {
    width: 250px;
    height: 250px;
  }
`

const AgentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  border-radius: 50%;
`

// --- Decorative Graphic Elements ---
const Circle1 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  z-index: 1;
  transform: scale(0.9);
`

const Circle2 = styled(Circle1)`
  transform: scale(1.1);
  border-style: dashed;
`

const Circle3 = styled(Circle1)`
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  border-color: rgba(217, 83, 79, 0.5); // Subtle red accent
  transform: scale(1);
`

// --- MAIN COMPONENT ---
const ConnectWithUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <ConnectSectionContainer>
        <CtaBanner>
          <TextContent>
            <Heading>Connect with us</Heading>
            <Subheading>
              Just share your details and we will contact you at your convenience.
            </Subheading>
            <CallbackButton onClick={() => setIsModalOpen(true)}>
              Request a Callback &rarr;
            </CallbackButton>
          </TextContent>
          <ImageContainer>
            <Circle1 />
            <Circle2 />
            <Circle3 />
            <AgentImage
              src="/callback.jpg"
              // src="https://placehold.co/300x300/ffffff/333?text=Agent&font=png"
              alt="Support agent"
              // Using a transparent placeholder to better show the effect
              style={{ backgroundColor: 'transparent' }}
            />
          </ImageContainer>
        </CtaBanner>
      </ConnectSectionContainer>
      <AnimatePresence>
        {isModalOpen && <RequestCallbackModal setOpen={setIsModalOpen} />}
      </AnimatePresence>
    </>
  )
}

export default ConnectWithUs
