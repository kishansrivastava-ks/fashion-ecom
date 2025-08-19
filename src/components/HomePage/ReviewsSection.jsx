import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const scrollHorizontal = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`

// --- STYLED COMPONENTS ---
const ReviewsSectionContainer = styled.section`
  background-color: #f8f9fa;
  padding: 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow: hidden;

  @media (max-width: 992px) {
    padding: 3rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`

const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`

const MainHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000080;
  margin: 0 0 1rem 0;

  @media (max-width: 992px) {
    font-size: 2.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto 1rem auto;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`

const CarouselContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 0; // Space for navigation arrows

  @media (max-width: 768px) {
    padding: 0 60px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 0 50px;
  }
`

const CarouselTrack = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 2rem 0;
  animation: ${scrollHorizontal} 15s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1.5rem 0;
  }
`

const ReviewCard = styled(motion.div)`
  flex: 0 0 auto;
  width: 380px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 31, 90, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 31, 90, 0.15);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 320px;
  }

  @media (max-width: 480px) {
    width: 280px;
  }
`

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #000080, #0066cc);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 31, 90, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #0066cc, #0080ff);
    box-shadow: 0 6px 20px rgba(0, 31, 90, 0.3);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(-50%) scale(1);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

const PrevButton = styled(NavigationButton)`
  left: 10px;

  @media (max-width: 480px) {
    left: 5px;
  }
`

const NextButton = styled(NavigationButton)`
  right: 10px;

  @media (max-width: 480px) {
    right: 5px;
  }
`

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`

const Dot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.active ? 'linear-gradient(135deg, #000080, #0066cc)' : '#cbd5e0'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.active ? 'linear-gradient(135deg, #000080, #0066cc)' : '#9ca3af'};
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }
`

const ViewAllButton = styled(motion.button)`
  background: linear-gradient(135deg, #000080, #0066cc);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  text-decoration: none;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 128, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
`

// --- ICON COMPONENTS ---
const ChevronLeft = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
)

// --- MAIN COMPONENT ---
const ReviewsSection = () => {
  // Generate array of review image paths
  const reviewImages = Array.from(
    { length: 28 },
    (_, i) => `/images/reviews/review-${String(i + 1).padStart(2, '0')}.jpg`
  )

  const duplicatedImages = [...reviewImages, ...reviewImages]

  // Calculate responsive cards per view

  const handleViewAllClick = () => {
    window.location.href = '/reviews'
  }

  return (
    <ReviewsSectionContainer>
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <MainHeading>What Our Students Say</MainHeading>
          <Description
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real stories from real students who transformed their careers with CCCI's guidance and
            expertise.
          </Description>
        </SectionHeader>

        <CarouselContainer>
          <CarouselWrapper>
            <CarouselTrack>
              {duplicatedImages.map((imagePath, index) => (
                <ReviewCard
                  key={`review-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.1, 0.5),
                  }}
                  whileHover={{
                    y: -8,
                    transition: { type: 'spring', stiffness: 400, damping: 25 },
                  }}
                >
                  <img src={imagePath} alt={`Student Review ${(index % 28) + 1}`} loading="lazy" />
                </ReviewCard>
              ))}
            </CarouselTrack>
          </CarouselWrapper>
        </CarouselContainer>

        <ViewAllButton
          onClick={handleViewAllClick}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          View All Reviews
          <ArrowIcon />
        </ViewAllButton>
      </ContentWrapper>
    </ReviewsSectionContainer>
  )
}

export default ReviewsSection
