import React from 'react'
import { motion, useInView } from 'framer-motion'
import styled from 'styled-components'

// Container for the entire featured collections section
const FeaturedContainer = styled.section`
  min-height: 100vh;
  background: #fafafa;
  padding: 5rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`

// Header section with title and description
const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 6rem auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: 0.02em;
  line-height: 1.2;
  margin: 0 0 1.5rem 0;
  color: #1a1a1a;
`

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.6;
  color: #666;
  margin: 0;
  letter-spacing: 0.01em;
`

// Collections grid wrapper
const CollectionsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

// Individual collection card
const CollectionCard = styled(motion.div)`
  position: relative;
  min-height: 70vh;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 768px) {
    min-height: 60vh;
  }
`

// Collection image with overlay
const CollectionImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.8s ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    transition: opacity 0.2s ease;
  }

  ${CollectionCard}:hover & {
    transform: scale(1.05);

    &::after {
      opacity: 0.7;
    }
  }
`

// Content overlay on the image
const CollectionContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3rem;
  color: white;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const CollectionTitle = styled(motion.h3)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 100;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  color: white;
`

const CollectionDescription = styled(motion.p)`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  opacity: 0.95;
  max-width: 400px;
  color: white;
`

const CollectionButton = styled(motion.button)`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 1rem 2.5rem;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  align-self: flex-start;

  &:hover {
    background: white;
    color: black;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 0.85rem;
  }
`

// Shop all collections section
const ShopAllSection = styled.div`
  text-align: center;
  margin-top: 6rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    margin-top: 4rem;
  }
`

const ShopAllButton = styled(motion.button)`
  background: #1a1a1a;
  border: none;
  color: white;
  padding: 1.2rem 3rem;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1rem 2.5rem;
    font-size: 0.9rem;
  }
`

const FeaturedCollection = () => {
  const headerRef = React.useRef(null)
  const cardsRef = React.useRef(null)
  const buttonRef = React.useRef(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-100px' })
  const buttonInView = useInView(buttonRef, { once: true, margin: '-100px' })

  const collections = [
    {
      id: 1,
      title: 'Western Collection',
      description:
        'Contemporary designs that blend modern sophistication with timeless elegance. Perfect for the modern woman who values both style and comfort.',
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&crop=center',
      buttonText: 'Shop Western',
    },
    {
      id: 2,
      title: 'Ethnic Collection',
      description:
        'Traditional craftsmanship meets contemporary design. Exquisite sarees, lehengas, and custom pieces that celebrate our rich heritage.',
      image: '/images/ethnic.png',
      buttonText: 'Shop Ethnic',
    },
  ]

  return (
    <FeaturedContainer>
      {/* Section Header */}
      <SectionHeader ref={headerRef}>
        <SectionTitle
          initial={{ y: 50, opacity: 0 }}
          animate={headerInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          Featured Collections
        </SectionTitle>
        <SectionSubtitle
          initial={{ y: 30, opacity: 0 }}
          animate={headerInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover our carefully curated collections that embody the perfect fusion of traditional
          artistry and contemporary fashion.
        </SectionSubtitle>
      </SectionHeader>

      {/* Collections Grid */}
      <CollectionsGrid ref={cardsRef}>
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.id}
            initial={{ y: 100, opacity: 0 }}
            animate={cardsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            // whileHover={{ y: -5 }}
          >
            <CollectionImage style={{ backgroundImage: `url(${collection.image})` }} />
            <CollectionContent>
              <CollectionTitle
                initial={{ y: 30, opacity: 0 }}
                animate={cardsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.3 }}
              >
                {collection.title}
              </CollectionTitle>
              <CollectionDescription
                initial={{ y: 20, opacity: 0 }}
                animate={cardsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.3 }}
              >
                {collection.description}
              </CollectionDescription>
              <CollectionButton
                initial={{ y: 20, opacity: 0 }}
                animate={cardsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {collection.buttonText}
              </CollectionButton>
            </CollectionContent>
          </CollectionCard>
        ))}
      </CollectionsGrid>

      {/* Shop All Section */}
      <ShopAllSection ref={buttonRef}>
        <ShopAllButton
          initial={{ y: 30, opacity: 0 }}
          animate={buttonInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Collections
        </ShopAllButton>
      </ShopAllSection>
    </FeaturedContainer>
  )
}

export default FeaturedCollection
