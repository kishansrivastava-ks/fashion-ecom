import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import styled from 'styled-components'

// Main Section Container
const Section = styled.section`
  min-height: 200vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`

// First Screen - Large Hero Image
const HeroPanel = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #fafafa;
`

const HeroImage = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url('/images/hero.png');
  background-size: cover;
  background-position: center;
  filter: grayscale(20%);
`

const HeroOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  /* background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4)); */
  z-index: 1;
`

const HeroText = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  color: #000;
  padding: 2rem;
  mix-blend-mode: difference;
  /* color: #fff; */
  /* color: #000; */
`

const HeroTitle = styled(motion.h2)`
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 0.95;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  /* color: #000; */
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);
  font-weight: 400;
  letter-spacing: 0.4em;
  margin: 3rem 0 0 0;
  opacity: 0.95;
  text-transform: uppercase;
  color: #000;
`

// Content Panel
const ContentPanel = styled.div`
  position: relative;
  background: #ffffff;
  padding: 10rem 0;

  @media (max-width: 968px) {
    padding: 6rem 0;
  }
`

const Container = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 6rem;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`

// Modern Grid Layout
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  margin-bottom: 12rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    margin-bottom: 6rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const GalleryItem = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: ${(props) => props.aspectRatio || '3/4'};
  grid-column: span ${(props) => props.span || 3};

  @media (max-width: 968px) {
    grid-column: span ${(props) => props.mobileSpan || 3};
  }

  @media (max-width: 480px) {
    grid-column: span 1;
    aspect-ratio: 3/4;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(0, 0, 0, 0.08);
    pointer-events: none;
    z-index: 2;
  }
`

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(10%);
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);

  ${GalleryItem}:hover & {
    transform: scale(1.08);
    filter: grayscale(0%);
  }
`

const ImageOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 3;

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`

const ImageCaption = styled.div`
  color: #000;
  text-align: center;
`

const CaptionTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`

const CaptionText = styled.div`
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  opacity: 0.6;
  text-transform: uppercase;
`

// Text Divider Section
const TextDivider = styled(motion.div)`
  text-align: center;
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto 8rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 5rem 2rem;
    margin: 0 auto 5rem;
  }
`

const DividerTitle = styled(motion.h3)`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  margin: 0 0 2.5rem 0;
  line-height: 1.1;
  color: #000;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`

const DividerText = styled(motion.p)`
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  font-weight: 400;
  line-height: 1.9;
  letter-spacing: 0.01em;
  max-width: 750px;
  margin: 0 auto;
  color: #333;
`

// Horizontal Scroll Section
const ScrollSection = styled.div`
  position: relative;
  padding: 0 0 12rem 0;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 0 6rem 0;
  }
`

const ScrollTitle = styled(motion.h3)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  margin: 0 0 4rem 6rem;
  color: #000;
  font-family: 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 768px) {
    margin: 0 0 3rem 2rem;
  }
`

const ScrollContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  padding: 0 6rem;

  @media (max-width: 768px) {
    padding: 0 2rem;
    gap: 1rem;
  }
`

const ScrollItem = styled(motion.div)`
  flex-shrink: 0;
  width: 380px;
  height: 520px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 280px;
    height: 400px;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 350px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(0, 0, 0, 0.08);
    pointer-events: none;
    z-index: 2;
  }
`

const ScrollImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(10%);
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);

  ${ScrollItem}:hover & {
    transform: scale(1.05);
    filter: grayscale(0%);
  }
`

const ScrollCaption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  color: #000;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);

  ${ScrollItem}:hover & {
    transform: translateY(0);
  }
`

const ScrollCaptionTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.3rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`

const ScrollCaptionText = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.6;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

// Final CTA
const CTASection = styled(motion.div)`
  text-align: center;
  padding: 12rem 2rem;
  background: #fafafa;
  margin: 0 -6rem;

  @media (max-width: 768px) {
    padding: 8rem 2rem;
    margin: 0 -2rem;
  }
`

const CTATitle = styled(motion.h3)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  margin: 0 0 3rem 0;
  color: #000;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1.3rem 4rem;
  border: 1.5px solid #000;
  color: #000;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #000;
    transform: translateY(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  &:hover {
    color: #fff;

    &::before {
      transform: translateY(0);
    }
  }
`

// Component
const EditorialShowcase = () => {
  const sectionRef = useRef(null)
  const galleryRef = useRef(null)
  const textRef = useRef(null)
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const galleryInView = useInView(galleryRef, { once: true, margin: '-100px' })
  const textInView = useInView(textRef, { once: true, margin: '-100px' })
  const scrollInView = useInView(scrollRef, { once: true, margin: '-100px' })

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const galleryImages = [
    {
      src: '/images/ethnic/ethnic7.jpg',
      title: 'Silk Heritage',
      caption: 'Timeless Elegance',
      span: 4,
      mobileSpan: 3,
      aspectRatio: '3/4',
    },
    {
      src: '/images/ethnic/ethnic32.jpg',
      title: 'Royal Drapes',
      caption: 'Traditional Artistry',
      span: 5,
      mobileSpan: 3,
      aspectRatio: '4/5',
    },
    {
      src: '/images/ethnic/ethnic41.jpg',
      title: 'Modern Grace',
      caption: 'Contemporary Fusion',
      span: 3,
      mobileSpan: 3,
      aspectRatio: '1/1',
    },
    {
      src: '/images/ethnic/ethnic63.jpg',
      title: 'Bridal Dreams',
      caption: 'Wedding Collection',
      span: 7,
      mobileSpan: 6,
      aspectRatio: '16/9',
    },
    {
      src: '/images/ethnic/ethnic61.jpg',
      title: 'Evening Elegance',
      caption: 'Luxury Collection',
      span: 5,
      mobileSpan: 3,
      aspectRatio: '3/4',
    },
  ]

  const scrollImages = [
    {
      src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop',
      title: 'Evening Elegance',
      text: 'Western Collection',
    },
    {
      src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1200&fit=crop',
      title: 'Power Dressing',
      text: 'Formal Suits',
    },
    {
      src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1200&fit=crop',
      title: 'Contemporary Chic',
      text: 'Modern Designs',
    },
    {
      src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1200&fit=crop',
      title: 'Festival Ready',
      text: 'Festive Collection',
    },
    {
      src: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1200&fit=crop',
      title: 'Casual Luxury',
      text: 'Daily Wear',
    },
  ]

  return (
    <Section ref={sectionRef}>
      {/* Hero Panel */}
      <HeroPanel>
        <HeroImage style={{ scale: heroScale, opacity: heroOpacity }} />
        {/* <HeroOverlay style={{ opacity: heroOpacity }} /> */}
        <HeroText>
          <HeroTitle
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            CRAFTED
            <br />
            FOR YOU
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            Where Tradition Meets Modernity
          </HeroSubtitle>
        </HeroText>
      </HeroPanel>

      {/* Content Panel */}
      <ContentPanel>
        <Container>
          {/* Modern Asymmetric Gallery */}
          <Gallery ref={galleryRef}>
            {galleryImages.map((item, index) => (
              <GalleryItem
                key={index}
                span={item.span}
                mobileSpan={item.mobileSpan}
                aspectRatio={item.aspectRatio}
                initial={{ opacity: 0, y: 60 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
              >
                <GalleryImage src={item.src} alt={item.title} />
                <ImageOverlay>
                  <ImageCaption>
                    <CaptionTitle>{item.title}</CaptionTitle>
                    <CaptionText>{item.caption}</CaptionText>
                  </ImageCaption>
                </ImageOverlay>
              </GalleryItem>
            ))}
          </Gallery>

          {/* Text Divider */}
          <TextDivider ref={textRef}>
            <DividerTitle
              initial={{ opacity: 0, y: 30 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            >
              The Art of Fashion
            </DividerTitle>
            <DividerText
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              Each piece tells a story of craftsmanship, tradition, and contemporary design. We
              celebrate the art of fashion through carefully curated collections that honor heritage
              while embracing modernity.
            </DividerText>
          </TextDivider>

          {/* Horizontal Scroll Gallery */}
          <ScrollSection ref={scrollRef}>
            <ScrollTitle
              initial={{ opacity: 0, x: -30 }}
              animate={scrollInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            >
              Latest Collections
            </ScrollTitle>
            <ScrollContainer
              initial={{ x: -50, opacity: 0 }}
              animate={scrollInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              {scrollImages.map((item, index) => (
                <ScrollItem
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={scrollInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <ScrollImage src={item.src} alt={item.title} />
                  <ScrollCaption>
                    <ScrollCaptionTitle>{item.title}</ScrollCaptionTitle>
                    <ScrollCaptionText>{item.text}</ScrollCaptionText>
                  </ScrollCaption>
                </ScrollItem>
              ))}
            </ScrollContainer>
          </ScrollSection>

          {/* Final CTA */}
          <CTASection
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <CTATitle>Discover Your Style</CTATitle>
            <CTAButton href="/collections" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              Explore Collections
            </CTAButton>
          </CTASection>
        </Container>
      </ContentPanel>
    </Section>
  )
}

export default EditorialShowcase
