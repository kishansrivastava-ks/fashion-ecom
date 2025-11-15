import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import styled from 'styled-components'
import BentoGallery from '@/components/common/BentoGallery'
import VideoGridSection from '@/components/VideoGridSection'

// Main Section Container
const Section = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #ffffff;
`

// Hero Panel
const HeroPanel = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f5f5f5;
`

const HeroImage = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url('/images/hero.png');
  background-size: cover;
  background-position: center;
  will-change: transform;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  /* color: #000; */
  padding: 2rem;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 9vw, 9rem);
  font-weight: 100;
  letter-spacing: 2em;
  text-transform: uppercase;
  color: white; /* Keeps the text fill white */
  letter-spacing: 2rem;
  margin: 0;
  line-height: 1;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  font-weight: 400;
  letter-spacing: 0.15em;
  margin: 2.5rem 0 0 0;
  text-transform: uppercase;
  color: #000;
`

// Content Panel
const ContentPanel = styled.div`
  position: relative;
  background: #fff;
  padding: 3rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  /* padding: 0 5rem; */

  @media (max-width: 1024px) {
    padding: 0 3rem;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`

// Gallery Section
const GallerySection = styled.div`
  margin-bottom: 15rem;
  padding: 0 5rem;

  @media (max-width: 768px) {
    margin-bottom: 8rem;
  }
`

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin: 0 0 6rem 0;
  color: #000;
  opacity: 0.6;
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(8, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`

const GalleryItem = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: ${(props) => props.aspectRatio || '3/4'};
  grid-column: span ${(props) => props.span || 4};
  background: #f9f9f9;

  @media (max-width: 1024px) {
    grid-column: span ${(props) => props.mobileSpan || 4};
  }

  @media (max-width: 768px) {
    grid-column: span 1;
    aspect-ratio: 3/4;
  }
`

const GalleryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  ${GalleryItem}:hover & {
    transform: scale(1.06);
  }
`

const ImageCaption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;

  ${GalleryItem}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`

const CaptionTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
`

const CaptionSubtext = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  opacity: 0.8;
  text-transform: uppercase;
`

// Divider with Quote
const DividerSection = styled.div`
  margin: 5rem 0;
  padding: 8rem 0;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  /* border: 2px solid red; */

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
  max-width: 900px;
  margin: 0 auto;
  color: #000;
`

// Horizontal Scroll Section
const HorizontalSection = styled.div`
  position: relative;
  margin-bottom: 4rem;
  padding: 0 2rem;

  @media (max-width: 1024px) {
    padding: 0 3rem;
    margin-bottom: 5rem;
  }

  @media (max-width: 768px) {
    /* padding: 0 1.5rem; */
    /* border: 2px solid red; */
    padding: 0;
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    /* padding: 0 1rem; */
    margin-bottom: 0;
  }
`

const ScrollTitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin: 0 0 4rem 0;
  color: #000;
  opacity: 0.6;

  @media (max-width: 1024px) {
    margin: 0 0 3rem 0;
  }

  @media (max-width: 768px) {
    margin: 0 0 2rem 0;
    letter-spacing: 0.2em;
    font-size: clamp(1rem, 3vw, 1.2rem);
  }
`

const ScrollWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;

  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    /* Add momentum scrolling for iOS */
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    padding-bottom: 1rem;
  }
`

const ScrollContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding-right: 5rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
    padding-right: 3rem;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding-right: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding-right: 1rem;
  }
`

const ScrollItem = styled(motion.div)`
  flex-shrink: 0;
  width: 340px;
  height: 480px;
  position: relative;
  overflow: hidden;
  background: #f9f9f9;
  scroll-snap-align: start;

  @media (max-width: 1024px) {
    width: 300px;
    height: 440px;
  }

  @media (max-width: 768px) {
    width: 280px;
    height: 400px;
  }

  @media (max-width: 480px) {
    width: 240px;
    height: 340px;
  }
`

const ScrollImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  ${ScrollItem}:hover & {
    transform: scale(1.06);
  }

  @media (max-width: 768px) {
    ${ScrollItem}:hover & {
      transform: scale(1.03);
    }
  }

  @media (max-width: 480px) {
    ${ScrollItem}:active & {
      transform: scale(1.02);
    }

    ${ScrollItem}:hover & {
      transform: none;
    }
  }
`

const ScrollCaption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;

  ${ScrollItem}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    opacity: 1;
    transform: translateY(0);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const ScrollCaptionTitle = styled.div`
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin-bottom: 0.3rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`

const ScrollCaptionSubtext = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  opacity: 0.8;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`

// CTA Section
const CTASection = styled(motion.div)`
  text-align: center;
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  margin: 0 -5rem;
  /* border-top: 1px solid rgba(0, 0, 0, 0.08); */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.08); */
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

// Component
const EditorialShowcase = () => {
  const sectionRef = useRef(null)
  // const heroRef = useRef(null)
  // const galleryRef = useRef(null)
  // const dividerRef = useRef(null)
  const scrollRef = useRef(null)

  // const { scrollYProgress } = useScroll({
  //   target: heroRef,
  //   offset: ['start start', 'end start'],
  // })

  // const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  // const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  // const galleryInView = useInView(galleryRef, { once: true, margin: '-100px' })
  // const dividerInView = useInView(dividerRef, { once: false, margin: '-100px' })
  const scrollInView = useInView(scrollRef, { once: true, margin: '-100px' })

  // Auto horizontal scroll logic
  React.useEffect(() => {
    const scrollWrapper = scrollRef.current
    if (!scrollWrapper) return

    const scrollInterval = setInterval(() => {
      // Move one full item width (assuming all items have the same width)
      const itemWidth = scrollWrapper.querySelector('div > div')?.offsetWidth || 300
      const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth

      // If reached end, reset to start
      if (scrollWrapper.scrollLeft + itemWidth >= maxScroll) {
        scrollWrapper.scrollTo({ left: 0, behavior: 'instant' })
      } else {
        scrollWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' })
      }
    }, 2000) // every 2 seconds

    return () => clearInterval(scrollInterval)
  }, [])

  // const galleryImages = [
  //   {
  //     src: '/images/ethnic/ethnic7.jpg',
  //     title: 'Silk Heritage',
  //     caption: 'Timeless Collection',
  //     gCol: 'span 3',
  //     gRow: 'span 2',
  //     gColMd: 'span 4',
  //     gRowMd: 'span 2',
  //   },
  //   {
  //     src: '/images/ethnic/ethnic33.jpg',
  //     title: 'Royal Drapes',
  //     caption: 'Traditional Artistry',
  //     gCol: 'span 4',
  //     gRow: 'span 2',
  //     gColMd: 'span 4',
  //     gRowMd: 'span 2',
  //   },
  //   {
  //     src: '/images/ethnic/ethnic41.jpg',
  //     title: 'Modern Grace',
  //     caption: 'Contemporary Fusion',
  //     gCol: 'span 5',
  //     gRow: 'span 2',
  //     gColMd: 'span 4',
  //     gRowMd: 'span 2',
  //   },
  //   {
  //     src: '/images/ethnic/ethnic63.jpg',
  //     title: 'Bridal Dreams',
  //     caption: 'Wedding Collection',
  //     gCol: 'span 6',
  //     gRow: 'span 3',
  //     gColMd: 'span 8',
  //     gRowMd: 'span 2',
  //   },
  //   {
  //     src: '/images/ethnic/ethnic61.jpg',
  //     title: 'Evening Elegance',
  //     caption: 'Luxury Collection',
  //     gCol: 'span 6',
  //     gRow: 'span 2',
  //     gColMd: 'span 8',
  //     gRowMd: 'span 2',
  //   },
  //   {
  //     src: '/images/ethnic/ethnic2.jpg',
  //     title: 'Golden Threads',
  //     caption: 'Artisan Embroidery',
  //     gCol: 'span 4',
  //     gRow: 'span 2',
  //     gColMd: 'span 4',
  //     gRowMd: 'span 2',
  //   },
  //   {
  //     src: '/images/ethnic/ethnic63.jpg',
  //     title: 'Chic Comfort',
  //     caption: 'Urban Fusion',
  //     gCol: 'span 4',
  //     gRow: 'span 1',
  //     gColMd: 'span 4',
  //     gRowMd: 'span 1',
  //   },
  //   {
  //     src: '/images/ethnic/ethnic1.jpg',
  //     title: 'Vibrant Aura',
  //     caption: 'Festive Collection',
  //     gCol: 'span 4',
  //     gRow: 'span 2',
  //     gColMd: 'span 4',
  //     gRowMd: 'span 2',
  //   },
  // ]

  const scrollImages = [
    {
      src: '/images/ethnic/ethnic2.jpg',
      title: 'Evening Elegance',
      text: 'Western Collection',
    },
    {
      src: '/images/ethnic/ethnic63.jpg',
      title: 'Power Dressing',
      text: 'Formal Suits',
    },
    {
      src: '/images/western/western1.jpg',
      title: 'Contemporary Chic',
      text: 'Modern Designs',
    },
    {
      src: '/images/ethnic/ethnic1.jpg',
      title: 'Festival Ready',
      text: 'Festive Collection',
    },
    {
      src: '/images/ethnic/ethnic34.jpg',
      title: 'Casual Luxury',
      text: 'Daily Wear',
    },
  ]

  return (
    <Section ref={sectionRef}>
      <VideoGridSection />
      {/* Hero Panel */}
      {/* <HeroPanel ref={heroRef}> */}
      {/* <HeroImage style={{ scale: heroScale, opacity: heroOpacity }} /> */}
      {/* <HeroContent>
          <HeroTitle
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            Crafted
            <br />
            For You
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            Where Tradition Meets Modernity
          </HeroSubtitle>
        </HeroContent> */}
      {/* </HeroPanel> */}

      {/* Content Panel */}
      <ContentPanel>
        <Container>
          {/* Gallery Section */}
          <BentoGallery />

          {/* Horizontal Scroll Section */}
          <HorizontalSection ref={scrollRef}>
            <ScrollTitle
              initial={{ opacity: 0 }}
              animate={scrollInView ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.8 }}
            >
              Latest Collections
            </ScrollTitle>
            <ScrollWrapper>
              <ScrollContainer
                initial={{ opacity: 0 }}
                animate={scrollInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
              >
                {scrollImages.map((item, index) => (
                  <ScrollItem
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={scrollInView ? { opacity: 1 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <ScrollImage src={item.src} alt={item.title} />
                    <ScrollCaption>
                      <ScrollCaptionTitle>{item.title}</ScrollCaptionTitle>
                      <ScrollCaptionSubtext>{item.text}</ScrollCaptionSubtext>
                    </ScrollCaption>
                  </ScrollItem>
                ))}
              </ScrollContainer>
            </ScrollWrapper>
          </HorizontalSection>
        </Container>
      </ContentPanel>
    </Section>
  )
}

export default EditorialShowcase
