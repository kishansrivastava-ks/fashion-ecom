import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Calendar,
  RotateCcw,
  Clock,
  XCircle,
  CheckCircle,
  Package,
  AlertTriangle,
} from 'lucide-react'
import styled from 'styled-components'
import FloatingNavbar from '@/components/FloatingNavbar'
import PageTransition from '@/utils/PageTransition'
import Banner from '@/components/common/Banner'
import StandardNavbar from '@/components/StandardNavbar'
import Footer from '@/components/Footer'

// Hero Section Styles
const HeroContainer = styled.section`
  height: 60vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding-top: 10vh;
`

const HeroContent = styled(motion.div)`
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: 0.1rem;
  margin: 0 0 1.5rem 0;
  color: white;
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: 300;
  opacity: 0.9;
  margin: 0 0 1rem 0;
  color: white;
`

const LastUpdated = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 1rem;
`

// Quick Summary Section
const QuickSummary = styled.section`
  background: #f8f8f8;
  padding: 4rem 0;
`

const SummaryContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`

const SummaryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SummaryCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const SummaryIcon = styled.div`
  width: 60px;
  height: 60px;
  background: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  color: white;
`

const SummaryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
  color: black;
`

const SummaryText = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
  font-weight: 300;
`

// Main Content Styles
const ContentSection = styled.section`
  background: white;
  padding: 6rem 0;
`

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Section = styled(motion.section)`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-weight: 300;
  margin: 0 0 1.5rem 0;
  color: black;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const SectionContent = styled.div`
  color: #555;
  line-height: 1.7;
  font-weight: 300;

  p {
    margin: 0 0 1.2rem 0;
    font-size: 1rem;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.6rem;
      font-size: 1rem;
    }
  }

  strong {
    color: #333;
    font-weight: 500;
  }
`

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ProcessStep = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 8px;
`

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: black;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  font-weight: 500;
`

const StepTitle = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  color: black;
`

const StepText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
`

const ImportantNotice = styled(motion.div)`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`

const NoticeIcon = styled.div`
  color: #856404;
  flex-shrink: 0;
  margin-top: 0.2rem;
`

const NoticeContent = styled.div`
  color: #856404;
  font-size: 0.95rem;
  line-height: 1.6;

  strong {
    color: #533f03;
  }
`

const ContactCTA = styled.section`
  background: #f8f8f8;
  padding: 3rem 2rem;
  text-align: center;
  margin-top: 3rem;
`

const CTAContent = styled(motion.div)`
  max-width: 500px;
  margin: 0 auto;
`

const CTATitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  color: black;
`

const CTAText = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 0 2rem 0;
  line-height: 1.6;
`

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const CTAButton = styled(motion.a)`
  display: inline-flex;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${(props) => (props.primary ? 'black' : 'transparent')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border: 1px solid black;
  text-decoration: none;
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  min-width: 18rem;

  &:hover {
    background: ${(props) => (props.primary ? '#333' : 'black')};
    color: white;
  }
`

// Component
const ReturnPolicy = () => {
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: true, margin: '-100px' })

  return (
    <PageTransition>
      <Banner />
      <StandardNavbar />
      {/* <FloatingNavbar /> */}
      {/* Hero Section */}
      <HeroContainer>
        <HeroContent>
          <HeroTitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            RETURN POLICY
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Your satisfaction is our priority. Easy returns within 15 days of delivery.
          </HeroSubtitle>
          <LastUpdated
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Calendar size={16} />
            Last updated: December 15, 2024
          </LastUpdated>
        </HeroContent>
      </HeroContainer>

      {/* Quick Summary */}
      <QuickSummary>
        <SummaryContainer>
          <SummaryGrid
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SummaryCard whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <SummaryIcon>
                <Clock size={28} />
              </SummaryIcon>
              <SummaryTitle>15-Day Window</SummaryTitle>
              <SummaryText>
                Return items within 15 days of delivery for a full refund or exchange
              </SummaryText>
            </SummaryCard>

            <SummaryCard whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <SummaryIcon>
                <CheckCircle size={28} />
              </SummaryIcon>
              <SummaryTitle>Original Condition</SummaryTitle>
              <SummaryText>
                Items must be unworn, unwashed, with original tags and packaging intact
              </SummaryText>
            </SummaryCard>

            <SummaryCard whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <SummaryIcon>
                <RotateCcw size={28} />
              </SummaryIcon>
              <SummaryTitle>Easy Process</SummaryTitle>
              <SummaryText>
                Simple online return initiation with prepaid return shipping labels
              </SummaryText>
            </SummaryCard>
          </SummaryGrid>
        </SummaryContainer>
      </QuickSummary>

      {/* Main Content */}
      <ContentSection ref={contentRef}>
        <ContentContainer>
          {/* Return Eligibility */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle>
              <CheckCircle size={24} />
              Return Eligibility
            </SectionTitle>
            <SectionContent>
              <p>
                <strong>Items eligible for return:</strong>
              </p>
              <ul>
                <li>All ready-to-wear western and ethnic clothing</li>
                <li>Accessories (scarves, bags, jewelry)</li>
                <li>Items purchased at full price or on sale</li>
                <li>Products delivered within the last 15 days</li>
              </ul>
              <p>
                <strong>Return conditions:</strong>
              </p>
              <ul>
                <li>Items must be in original, unworn condition</li>
                <li>All original tags, labels, and packaging must be intact</li>
                <li>Products must be free from perfume, deodorant, or makeup stains</li>
                <li>Return request must be initiated within 15 days of delivery</li>
              </ul>
            </SectionContent>
          </Section>

          {/* Non-Returnable Items */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SectionTitle>
              <XCircle size={24} />
              Non-Returnable Items
            </SectionTitle>
            <SectionContent>
              <p>The following items cannot be returned for hygiene and customization reasons:</p>
              <ul>
                <li>
                  <strong>Custom-made items:</strong> Tailored pieces, altered garments,
                  personalized designs
                </li>
                <li>
                  <strong>Intimate apparel:</strong> Undergarments, lingerie, swimwear
                </li>
                <li>
                  <strong>Final sale items:</strong> Clearance products marked as "Final Sale"
                </li>
                <li>
                  <strong>Damaged items:</strong> Products damaged due to misuse or normal wear
                </li>
                <li>
                  <strong>Gift cards:</strong> Non-refundable once purchased
                </li>
              </ul>
            </SectionContent>

            <ImportantNotice
              initial={{ x: -30, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <NoticeIcon>
                <AlertTriangle size={24} />
              </NoticeIcon>
              <NoticeContent>
                <strong>Custom Orders:</strong> Since custom pieces are made specifically for you,
                they cannot be returned unless there's a manufacturing defect or the item doesn't
                match your approved design specifications.
              </NoticeContent>
            </ImportantNotice>
          </Section>

          {/* Return Process */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SectionTitle>
              <Package size={24} />
              How to Return an Item
            </SectionTitle>
            <SectionContent>
              <p>Follow these simple steps to return your purchase:</p>
            </SectionContent>

            <ProcessSteps>
              <ProcessStep
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <StepNumber>1</StepNumber>
                <StepTitle>Initiate Return</StepTitle>
                <StepText>
                  Log into your account and select "Return Item" from your order history
                </StepText>
              </ProcessStep>

              <ProcessStep
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <StepNumber>2</StepNumber>
                <StepTitle>Print Label</StepTitle>
                <StepText>Download and print the prepaid return shipping label we provide</StepText>
              </ProcessStep>

              <ProcessStep
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <StepNumber>3</StepNumber>
                <StepTitle>Pack & Ship</StepTitle>
                <StepText>
                  Package the item securely with original tags and drop off at courier
                </StepText>
              </ProcessStep>

              <ProcessStep
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <StepNumber>4</StepNumber>
                <StepTitle>Get Refund</StepTitle>
                <StepText>
                  Receive your refund within 5-7 business days after we receive the item
                </StepText>
              </ProcessStep>
            </ProcessSteps>
          </Section>

          {/* Refund Information */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SectionTitle>
              <RotateCcw size={24} />
              Refund & Exchange Information
            </SectionTitle>
            <SectionContent>
              <p>
                <strong>Refund Processing:</strong>
              </p>
              <ul>
                <li>Refunds are processed to the original payment method</li>
                <li>Processing time: 5-7 business days after we receive the returned item</li>
                <li>Original shipping charges are non-refundable (unless item was defective)</li>
                <li>Return shipping is free for domestic orders within India</li>
              </ul>
              <p>
                <strong>Exchanges:</strong>
              </p>
              <ul>
                <li>Size or color exchanges are subject to availability</li>
                <li>Exchange processing takes 7-10 business days</li>
                <li>Price differences may apply for upgraded items</li>
                <li>International exchanges may incur additional shipping costs</li>
              </ul>
            </SectionContent>
          </Section>

          {/* International Returns */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SectionTitle>
              <Package size={24} />
              International Returns
            </SectionTitle>
            <SectionContent>
              <p>For international customers:</p>
              <ul>
                <li>Return window is extended to 20 days to account for longer shipping times</li>
                <li>Return shipping costs are the customer's responsibility</li>
                <li>Customs duties and taxes are non-refundable</li>
                <li>Items must be declared properly to avoid customs delays</li>
              </ul>
              <p>
                We recommend contacting our customer service team before initiating an international
                return.
              </p>
            </SectionContent>
          </Section>
        </ContentContainer>

        {/* Contact CTA */}
        <ContactCTA>
          <CTAContent
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <CTATitle>Need Help with Your Return?</CTATitle>
            <CTAText>
              Our customer service team is here to assist you with any questions about returns,
              exchanges, or refunds.
            </CTAText>
            <CTAButtons>
              <CTAButton
                href="/contact"
                primary
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Package size={18} />
                CONTACT SUPPORT
              </CTAButton>
              <CTAButton
                href="mailto:returns@luxefashion.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw size={18} />
                EMAIL RETURNS TEAM
              </CTAButton>
            </CTAButtons>
          </CTAContent>
        </ContactCTA>
      </ContentSection>
      <Footer />
    </PageTransition>
  )
}

export default ReturnPolicy
