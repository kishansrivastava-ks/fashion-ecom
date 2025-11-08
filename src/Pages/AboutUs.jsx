import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import styled from 'styled-components'
import FloatingNavbar from '@/components/FloatingNavbar'
import { Eye, Target, Leaf, Sparkles, Palette } from 'lucide-react'
import Footer from '@/components/Footer'
import PageTransition from '@/utils/PageTransition'
import { useNavigate } from 'react-router-dom'

// Hero Section Styles
const HeroContainer = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeroImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%);
  background-image: url('/images/ethnic/eth001.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 2;
`

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 0 2rem;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 8vw, 8rem);
  font-weight: 100;
  letter-spacing: 0.5rem;
  line-height: 0.9;
  margin: 0 0 2rem 0;
  font-family: 'Arial', sans-serif;
  color: white;
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  /* font-weight: 100; */
  letter-spacing: 0.2rem;
  margin: 0;
  opacity: 0.9;
  color: white;
  line-height: 1.4;
`

// Founder Story Section
const FounderSection = styled.section`
  min-height: 100vh;
  background: white;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`

const FounderImageContainer = styled(motion.div)`
  position: relative;
  overflow: hidden;
  min-height: 600px;

  @media (max-width: 968px) {
    min-height: 400px;
    order: 2;
  }
`

const FounderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  background-image: url('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop&crop=center');
  background-size: cover;
  background-position: center;
  transform: scale(1);
  transition: transform 0.6s ease;
`

const FounderContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem;

  @media (max-width: 968px) {
    padding: 3rem 2rem;
    order: 1;
  }
`

const FounderTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin: 0 0 2rem 0;
  color: black;
`

const FounderText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin: 0 0 1.5rem 0;
  font-weight: 300;
`

const FounderQuote = styled(motion.blockquote)`
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 300;
  line-height: 1.6;
  margin: 2rem 0;
  padding-left: 2rem;
  border-left: 2px solid #000;
  color: #333;

  &::before {
    content: '"';
    font-size: 3rem;
    color: #ccc;
    position: absolute;
    margin-left: -3rem;
    margin-top: -1rem;
  }
`

// Vision & Mission Section
const VisionSection = styled.section`
  min-height: 100vh;
  background: #fafafa;
  padding: 8rem 0;

  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`

const VisionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const VisionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`

const VisionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  margin: 0 0 2rem 0;
  color: black;
`

const VisionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`

const VisionCard = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
`

const VisionIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem auto;
  background: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`

const VisionCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin: 0 0 1.5rem 0;
  color: black;
`

const VisionCardText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #666;
  font-weight: 300;
  margin: 0;
`

// Journey Timeline Section
const JourneySection = styled.section`
  min-height: 100vh;
  background: black;
  color: white;
  padding: 8rem 0;

  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`

const JourneyContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`

const JourneyHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;
`

const JourneyTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  margin: 0 0 2rem 0;
  color: white;
`

const Timeline = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #333;
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 2rem;
    }
  }
`

const TimelineItem = styled(motion.div)`
  display: flex;
  margin-bottom: 4rem;
  position: relative;

  &:nth-child(even) {
    flex-direction: row-reverse;

    @media (max-width: 768px) {
      flex-direction: row;
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`

const TimelineContent = styled.div`
  flex: 1;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 0 0 4rem;
  }
`

const TimelineYear = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  color: #ccc;
  margin: 0 0 1rem 0;
  letter-spacing: 0.1em;
`

const TimelineTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  color: white;
`

const TimelineText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #aaa;
  margin: 0;
  font-weight: 300;
`

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    left: 2rem;
  }
`

// Values Section
const ValuesSection = styled.section`
  min-height: 90vh;
  background: white;
  padding: 8rem 0;
`

const ValuesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const ValuesHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;
`

const ValuesTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  margin: 0 0 2rem 0;
  color: black;
`

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
`

const ValueCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`

const ValueIcon = styled(motion.div)`
  font-size: 3rem;
  margin: 0 0 2rem 0;
  filter: grayscale(100%);
  transition: filter 0.3s ease;

  ${ValueCard}:hover & {
    filter: grayscale(0%);
  }
`

const ValueTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin: 0 0 1.5rem 0;
  color: black;
`

const ValueText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  font-weight: 300;
  margin: 0;
`

// CTA Section
const CTASection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  background: white;
  text-align: center;
  color: white;
  color: black;
`

const CTAContent = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  color: black;
`

const CTATitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 100;
  letter-spacing: 0.01em;
  line-height: 1.2;
  margin: 0 0 2rem 0;
  color: white;
  color: black;
`

const CTAText = styled(motion.p)`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.6;
  margin: 0 0 3rem 0;
  opacity: 0.9;
  color: white;
  color: black;
`

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  color: black;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const CTAButton = styled(motion.button)`
  background: ${(props) => (props.primary ? 'white' : 'transparent')};
  border: 1px solid black;
  color: ${(props) => (props.primary ? 'black' : 'white')};
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  color: black;

  &:hover {
    /* background: ${(props) => (props.primary ? '#000' : 'white')}; */
    background: black;
    color: white;
  }
`

// Animation Variants
const fadeInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// Component Functions
const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroImage
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      <HeroOverlay />
      <HeroContent>
        <HeroTitle
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          OUR STORY
        </HeroTitle>
        <HeroSubtitle
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Where tradition meets contemporary elegance, creating timeless pieces that celebrate the
          modern woman
        </HeroSubtitle>
      </HeroContent>
    </HeroContainer>
  )
}

const FounderStory = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <FounderSection ref={ref}>
      <FounderImageContainer
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <FounderImage />
      </FounderImageContainer>

      <FounderContent>
        <FounderTitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          THE DESIGNER
        </FounderTitle>
        <FounderText
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Founded by Priya Sharma in 2018, our brand emerged from a passion for blending India's
          rich textile heritage with contemporary design sensibilities. With over a decade of
          experience in fashion design and a deep appreciation for traditional craftsmanship, Priya
          envisioned a brand that would celebrate both ethnic and western aesthetics.
        </FounderText>
        <FounderText
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Having studied fashion design at NIFT Delhi and worked with renowned designers across
          India and internationally, she brings a unique perspective that honors traditional
          techniques while embracing modern silhouettes and sustainable practices.
        </FounderText>
        <FounderQuote
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Fashion is not just about clothing—it's about empowering women to express their authentic
          selves with confidence and grace.
        </FounderQuote>
      </FounderContent>
    </FounderSection>
  )
}

const VisionMission = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <VisionSection ref={ref}>
      <VisionContainer>
        <VisionHeader>
          <VisionTitle
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            VISION & MISSION
          </VisionTitle>
        </VisionHeader>

        <VisionGrid>
          <VisionCard
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VisionIcon whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }}>
              <Eye size={40} />
            </VisionIcon>
            <VisionCardTitle>OUR VISION</VisionCardTitle>
            <VisionCardText>
              To be the leading fashion brand that seamlessly blends traditional Indian
              craftsmanship with contemporary design, creating pieces that empower women to embrace
              their individuality while staying connected to their cultural roots.
            </VisionCardText>
          </VisionCard>

          <VisionCard
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <VisionIcon whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }}>
              <Target size={40} />
            </VisionIcon>
            <VisionCardTitle>OUR MISSION</VisionCardTitle>
            <VisionCardText>
              To create exceptional fashion that celebrates the modern woman's journey, offering
              versatile pieces that transition seamlessly from traditional celebrations to
              contemporary occasions, all while maintaining the highest standards of quality and
              ethical production.
            </VisionCardText>
          </VisionCard>
        </VisionGrid>
      </VisionContainer>
    </VisionSection>
  )
}

const JourneyTimeline = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const timelineData = [
    {
      year: '2018',
      title: 'The Beginning',
      text: 'Founded with a vision to bridge traditional and contemporary fashion. Started with a small collection of ethnic wear.',
    },
    {
      year: '2019',
      title: 'Expansion',
      text: 'Launched our western collection and introduced custom tailoring services. Expanded to online platform.',
    },
    {
      year: '2021',
      title: 'Recognition',
      text: 'Featured in leading fashion magazines. Collaborated with sustainable textile suppliers and artisan communities.',
    },
    {
      year: '2023',
      title: 'Innovation',
      text: 'Introduced AI-powered virtual fitting and launched our signature bridal collection with international shipping.',
    },
    {
      year: '2024',
      title: 'Present',
      text: 'Serving customers globally with a focus on sustainable fashion, custom designs, and celebrating individual style.',
    },
  ]

  return (
    <JourneySection ref={ref}>
      <JourneyContainer>
        <JourneyHeader>
          <JourneyTitle
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            OUR JOURNEY
          </JourneyTitle>
        </JourneyHeader>

        <Timeline>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <TimelineContent>
                <TimelineYear>{item.year}</TimelineYear>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineText>{item.text}</TimelineText>
              </TimelineContent>
              <TimelineDot />
            </TimelineItem>
          ))}
        </Timeline>
      </JourneyContainer>
    </JourneySection>
  )
}

const OurValues = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const values = [
    {
      icon: <Leaf size={48} />,
      title: 'SUSTAINABILITY',
      text: 'Committed to eco-friendly practices, sustainable materials, and supporting local artisan communities.',
    },
    {
      icon: <Sparkles size={40} />,
      title: 'QUALITY',
      text: 'Uncompromising attention to detail, premium fabrics, and expert craftsmanship in every piece.',
    },
    {
      icon: <Palette size={40} />,
      title: 'INNOVATION',
      text: 'Constantly evolving designs that blend traditional techniques with modern aesthetics and technology.',
    },
    // {
    //   icon: '💝',
    //   title: 'EMPOWERMENT',
    //   text: 'Creating fashion that empowers women to feel confident, beautiful, and true to themselves.',
    // },
  ]

  return (
    <ValuesSection ref={ref}>
      <ValuesContainer>
        <ValuesHeader>
          <ValuesTitle
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            OUR VALUES
          </ValuesTitle>
        </ValuesHeader>

        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <ValueIcon whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                {value.icon}
              </ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueText>{value.text}</ValueText>
            </ValueCard>
          ))}
        </ValuesGrid>
      </ValuesContainer>
    </ValuesSection>
  )
}

const CallToAction = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  return (
    <CTASection ref={ref}>
      <CTAContent>
        <CTATitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          Ready to Experience Our Craft?
        </CTATitle>
        <CTAText
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover our latest collections or schedule a personal consultation to create something
          uniquely yours.
        </CTAText>
        <CTAButtons
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CTAButton primary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            EXPLORE COLLECTION
          </CTAButton>
          <CTAButton
            onClick={() => navigate('/appointment')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK CONSULTATION
          </CTAButton>
        </CTAButtons>
      </CTAContent>
    </CTASection>
  )
}

// Main About Us Component
const AboutUs = () => {
  return (
    <PageTransition>
      <FloatingNavbar />
      <HeroSection />
      <FounderStory />
      {/* <VisionMission /> */}
      {/* <JourneyTimeline /> */}
      {/* <OurValues /> */}
      <CallToAction />
      <Footer />
    </PageTransition>
  )
}

export default AboutUs
