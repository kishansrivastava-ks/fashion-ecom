import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import styled, { keyframes } from 'styled-components'

// Keyframe animation for infinite scroll
const scrollLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`

// Styled Components
const BannerContainer = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
  overflow: hidden;
  background-color: #f9fafb;
  margin-bottom: 3rem;
`

const ImageTrack = styled.div`
  animation: ${scrollLeft} 50s linear infinite;
  width: 200%;
  height: 100%;
  display: flex;

  &:hover {
    animation-play-state: paused;
  }
`

const ImageContainer = styled.div`
  width: 16.666667%;
  height: 100%;
  flex-shrink: 0;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const CTAOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 3.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  text-align: center;
  max-width: 28rem;
  border: 1px solid #f3f4f6;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.4);

  @media (max-width: 640px) {
    padding: 2.5rem;
    max-width: 20rem;
  }
`

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 300;
  color: #111827;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  @media (max-width: 640px) {
    font-size: 1.875rem;
  }
`

const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.75;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: #000;
  color: #fff;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #333;
    color: #fff;
  }
`

const EthnicBannerScroll = () => {
  // Image data - Replace urls with your actual image URLs
  const imageAssets = [
    {
      id: 1,
      url: '/images/ethnic/ethnic61.jpg',
      alt: 'Ethnic Collection Look 1',
    },
    {
      id: 2,
      url: '/images/ethnic/ethnic2.jpg',
      alt: 'Ethnic Collection Look 2',
    },
    {
      id: 3,
      url: '/images/ethnic/ethnic33.jpg',
      alt: 'Ethnic Collection Look 3',
    },
    {
      id: 4,
      url: '/images/ethnic/ethnic42.jpg',
      alt: 'Ethnic Collection Look 4',
    },
    {
      id: 5,
      url: '/images/ethnic/ethnic34.jpg',
      alt: 'Ethnic Collection Look 5',
    },
    {
      id: 6,
      url: '/images/ethnic/ethnic7.jpg',
      alt: 'Ethnic Collection Look 6',
    },
  ]

  // Create seamless loop with duplicated images
  const fullTrackImages = [
    ...imageAssets,
    ...imageAssets.map((img) => ({
      ...img,
      id: img.id + 10,
      alt: `Duplicated ${img.alt}`,
    })),
  ]

  return (
    <BannerContainer>
      <ImageTrack>
        {fullTrackImages.map((item) => (
          <ImageContainer key={item.id}>
            <Image
              src={item.url}
              alt={item.alt}
              title={item.path}
              onError={(e) =>
                (e.currentTarget.src =
                  'https://placehold.co/800x1200/e0e0e0/555/png?text=Image+Error')
              }
            />
          </ImageContainer>
        ))}
      </ImageTrack>

      <CTAOverlay>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>Ethnic Elegance</Title>
          <Description>
            Discover the blend of heritage craftsmanship and contemporary fashion in our new
            collection, handpicked for timeless style.
          </Description>
          <CTAButton href="/ethnic" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            Explore Now <ArrowRight size={18} />
          </CTAButton>
        </motion.div>
      </CTAOverlay>
    </BannerContainer>
  )
}

export default EthnicBannerScroll
