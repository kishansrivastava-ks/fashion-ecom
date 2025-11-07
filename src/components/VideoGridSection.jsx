import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'

// Main Section
const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  /* margin-bottom: 10rem; */
`

// Video Grid Container
const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 150vh;
  width: 100%;
  /* gap: 2px; */
  padding: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 50vh);
    gap: 1px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 45vh);
    gap: 1px;
  }
`

const VideoCell = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 2;
    transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover::after {
    background: rgba(0, 0, 0, 0.35);
  }
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);

  /* ${VideoCell}:hover & {
    transform: scale(1.08);
  } */
`

const VideoContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
`

const CategoryTitle = styled(motion.a)`
  text-decoration: none;
  color: white;
  font-size: clamp(1rem, 1.5vw, 2rem);
  font-weight: 300;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  padding: 1rem 4rem;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: white;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover {
    color: black;
    border-color: white;
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.08);
    box-shadow: 0 8px 32px rgba(255, 255, 255, 0.2);

    &::before {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 4vw, 1.8rem);
    padding: 1rem 2rem;
    border-width: 1.5px;
  }
`

const CategorySubtext = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: clamp(0.7rem, 1.2vw, 0.95rem);
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 11;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
  white-space: nowrap;

  ${VideoCell}:hover & {
    opacity: 0.9;
    bottom: 3.2rem;
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
    bottom: 1.5rem;

    ${VideoCell}:hover & {
      bottom: 2rem;
    }
  }
`

// Component
const VideoGridSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-50px' })
  const [loadedVideos, setLoadedVideos] = useState({})

  const categories = [
    {
      title: 'ETHNIC',
      subtext: 'Traditional Heritage',
      video: '/videos/video1.mp4',
      link: '/collections/ethnic',
      posterIndex: 0,
    },
    {
      title: 'WESTERN',
      subtext: 'Contemporary Style',
      video: '/videos/video2.mp4',
      link: '/collections/western',
      posterIndex: 1,
    },
    {
      title: 'BRIDAL',
      subtext: 'Wedding Dreams',
      video: '/videos/video3.mp4',
      link: '/collections/bridal',
      posterIndex: 2,
    },
    {
      title: 'CUSTOM',
      subtext: 'Bespoke Designs',
      video: '/videos/video4.mp4',
      link: '/collections/custom',
      posterIndex: 3,
    },
  ]

  const posterImages = [
    '/images/ethnic/eth004.jpg',
    '/images/ethnic/ethnic61.jpg',
    '/images/ethnic/eth003.jpg',
    '/images/ethnic/ethnic34.jpg',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <Section ref={sectionRef}>
      <VideoGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {categories.map((category, index) => (
          <VideoCell
            key={index}
            variants={cellVariants}
            // whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Video
              autoPlay
              loop
              muted
              playsInline
              poster={posterImages[category.posterIndex]}
              onLoadedData={() => {
                setLoadedVideos((prev) => ({ ...prev, [index]: true }))
              }}
            >
              {/* <source src={category.video} type="video/mp4" /> */}
            </Video>

            <VideoContent>
              <motion.div variants={contentVariants} initial="hidden" animate="visible">
                <CategoryTitle
                  href={category.link}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.title}
                </CategoryTitle>
              </motion.div>
              <CategorySubtext>{category.subtext}</CategorySubtext>
            </VideoContent>
          </VideoCell>
        ))}
      </VideoGrid>
    </Section>
  )
}

export default VideoGridSection
