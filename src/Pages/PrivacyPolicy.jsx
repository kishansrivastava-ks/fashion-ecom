import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react'
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
  /* font-weight: 100; */
  opacity: 0.9;
  color: white;
  margin: 0 0 1rem 0;
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

const IntroSection = styled(motion.div)`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 4rem;
  text-align: center;
`

const IntroText = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 0;
  line-height: 1.6;
  font-weight: 300;
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

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: black;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`

// Component
const PrivacyPolicy = () => {
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: true, margin: '-100px' })

  return (
    <PageTransition>
      {/* <FloatingNavbar /> */}
      <Banner />
      <StandardNavbar />
      {/* Hero Section */}
      <HeroContainer>
        <HeroContent>
          <HeroTitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            PRIVACY POLICY
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Your privacy is our priority. Learn how we protect and use your information.
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

      {/* Main Content */}
      <ContentSection ref={contentRef}>
        <ContentContainer>
          {/* Introduction */}
          <IntroSection
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <IntroText>
              At Luxe Fashion, we are committed to protecting your privacy and ensuring the security
              of your personal information. This Privacy Policy explains how we collect, use, and
              safeguard your data when you interact with our services.
            </IntroText>
          </IntroSection>

          {/* Information We Collect */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SectionTitle>
              <Database size={24} />
              Information We Collect
            </SectionTitle>
            <SectionContent>
              <p>
                <strong>Personal Information:</strong>
              </p>
              <ul>
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Account credentials and preferences</li>
                <li>Custom design requirements and measurements</li>
              </ul>
              <p>
                <strong>Automatically Collected Data:</strong>
              </p>
              <ul>
                <li>Website usage patterns, IP address, and device information</li>
                <li>Cookies and tracking technologies for improved user experience</li>
                <li>Communication history with our customer support team</li>
              </ul>
            </SectionContent>
          </Section>

          {/* How We Use Your Information */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SectionTitle>
              <UserCheck size={24} />
              How We Use Your Information
            </SectionTitle>
            <SectionContent>
              <p>We use your information to:</p>
              <ul>
                <li>Process orders, payments, and deliver products to you</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send important updates about your orders and our services</li>
                <li>Personalize your shopping experience and recommend products</li>
                <li>Improve our website, products, and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>
            </SectionContent>
          </Section>

          {/* Information Sharing */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SectionTitle>
              <Eye size={24} />
              Information Sharing & Disclosure
            </SectionTitle>
            <SectionContent>
              <p>
                We do not sell, trade, or rent your personal information. We may share information
                with:
              </p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> Payment processors, shipping companies, and
                  technology partners
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                  and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or
                  sale of assets
                </li>
              </ul>
              <p>
                All third parties are contractually obligated to maintain the confidentiality of
                your information.
              </p>
            </SectionContent>
          </Section>

          {/* Data Security */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SectionTitle>
              <Shield size={24} />
              Data Security & Protection
            </SectionTitle>
            <SectionContent>
              <p>We implement industry-standard security measures to protect your information:</p>
              <ul>
                <li>SSL encryption for all data transmission</li>
                <li>Secure payment processing through certified providers</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training on data protection</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
              <p>
                While we strive to protect your information, no method of transmission over the
                internet is 100% secure.
              </p>
            </SectionContent>
          </Section>

          {/* Your Rights */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <SectionTitle>
              <Lock size={24} />
              Your Privacy Rights
            </SectionTitle>
            <SectionContent>
              <p>You have the right to:</p>
              <ul>
                <li>
                  <strong>Access:</strong> Request copies of your personal information
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct inaccurate information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal data (subject to
                  legal requirements)
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time
                </li>
                <li>
                  <strong>Data Portability:</strong> Request your data in a machine-readable format
                </li>
              </ul>
              <p>
                To exercise these rights, please contact our privacy team using the information
                below.
              </p>
            </SectionContent>
          </Section>

          {/* Cookies Policy */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <SectionTitle>
              <Database size={24} />
              Cookies & Tracking
            </SectionTitle>
            <SectionContent>
              <p>We use cookies and similar technologies to enhance your browsing experience:</p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> Required for basic website functionality
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how visitors use our
                  website
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
                </li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences, though some
                features may not function properly if cookies are disabled.
              </p>
            </SectionContent>
          </Section>

          {/* Contact Information */}
          <Section
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <SectionTitle>
              <UserCheck size={24} />
              Contact & Updates
            </SectionTitle>
            <SectionContent>
              <p>
                <strong>Privacy Officer:</strong> privacy@luxefashion.com
              </p>
              <p>
                <strong>General Inquiries:</strong> hello@luxefashion.com
              </p>
              <p>
                <strong>Address:</strong> 123 Fashion District, New Delhi - 110001, India
              </p>
              <p>
                We may update this Privacy Policy periodically. Significant changes will be
                communicated via email or website notification. Your continued use of our services
                after changes indicates acceptance of the updated policy.
              </p>
            </SectionContent>
          </Section>
        </ContentContainer>

        {/* Contact CTA */}
        <ContactCTA>
          <CTAContent
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <CTATitle>Questions About Your Privacy?</CTATitle>
            <CTAText>
              Our privacy team is here to help with any questions or concerns about how we handle
              your personal information.
            </CTAText>
            <CTAButton
              href="mailto:privacy@luxefashion.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield size={18} />
              CONTACT PRIVACY TEAM
            </CTAButton>
          </CTAContent>
        </ContactCTA>
      </ContentSection>
      <Footer />
    </PageTransition>
  )
}

export default PrivacyPolicy
