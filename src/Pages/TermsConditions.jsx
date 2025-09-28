import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, FileText, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import styled from 'styled-components'
import FloatingNavbar from '@/components/FloatingNavbar'
import PageTransition from '@/utils/PageTransition'

// Hero Section Styles
const HeroContainer = styled.section`
  height: 60vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
`

const HeroContent = styled(motion.div)`
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
  padding-top: 10vh;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: 0.1rem;
  line-height: 1;
  margin: 0 0 1.5rem 0;
  color: white;
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: 300;
  letter-spacing: 0.02rem;
  margin: 0 0 1rem 0;
  opacity: 0.9;
  line-height: 1.4;
  color: inherit;
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

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
`

const TableOfContents = styled(motion.div)`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 3rem;
  }
`

const TOCTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 0 1.5rem 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TOCItem = styled.li`
  margin: 0;
`

const TOCLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 300;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

const Section = styled(motion.section)`
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 300;
  letter-spacing: 0.02em;
  margin: 0 0 1.5rem 0;
  color: black;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
`

const SectionContent = styled.div`
  color: #555;
  line-height: 1.7;
  font-weight: 300;

  p {
    margin: 0 0 1.5rem 0;
    font-size: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin: 1.5rem 0;
    padding-left: 2rem;

    li {
      margin-bottom: 0.8rem;
      font-size: 1rem;
    }
  }

  strong {
    color: #333;
    font-weight: 500;
  }
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
  padding: 4rem 2rem;
  text-align: center;
  margin-top: 4rem;
`

const CTAContent = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
`

const CTATitle = styled.h3`
  font-size: 1.5rem;
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

// Component
const TermsConditions = () => {
  const contentRef = useRef(null)
  const isInView = useInView(contentRef, { once: true, margin: '-100px' })

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'definitions', title: 'Definitions' },
    { id: 'account', title: 'User Account & Registration' },
    { id: 'products', title: 'Products & Services' },
    { id: 'pricing', title: 'Pricing & Payment Terms' },
    { id: 'shipping', title: 'Shipping & Delivery' },
    { id: 'returns', title: 'Returns & Exchanges' },
    { id: 'intellectual', title: 'Intellectual Property' },
    { id: 'privacy', title: 'Privacy & Data Protection' },
    { id: 'prohibited', title: 'Prohibited Uses' },
    { id: 'limitation', title: 'Limitation of Liability' },
    { id: 'modifications', title: 'Modifications to Terms' },
  ]

  return (
    <PageTransition>
      <FloatingNavbar />
      {/* Hero Section */}
      <HeroContainer>
        <HeroContent>
          <HeroTitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            TERMS & CONDITIONS
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Please read these terms carefully before using our services
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
          {/* Table of Contents */}
          <TableOfContents
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <TOCTitle>
              <FileText size={20} />
              Table of Contents
            </TOCTitle>
            <TOCList>
              {sections.map((section, index) => (
                <TOCItem key={section.id}>
                  <TOCLink href={`#${section.id}`}>
                    <CheckCircle size={14} />
                    {section.title}
                  </TOCLink>
                </TOCItem>
              ))}
            </TOCList>
          </TableOfContents>

          {/* Important Notice */}
          <ImportantNotice
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <NoticeIcon>
              <AlertCircle size={24} />
            </NoticeIcon>
            <NoticeContent>
              <strong>Important:</strong> By accessing and using Luxe Fashion's website and
              services, you agree to be bound by these Terms and Conditions. If you do not agree
              with any part of these terms, please do not use our services.
            </NoticeContent>
          </ImportantNotice>

          {/* Sections */}
          <Section
            id="acceptance"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SectionTitle>1. Acceptance of Terms</SectionTitle>
            <SectionContent>
              <p>
                Welcome to Luxe Fashion. These Terms and Conditions ("Terms") govern your use of our
                website, mobile application, and services (collectively, the "Services") operated by
                Luxe Fashion ("we," "us," or "our").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms. These
                Terms apply to all visitors, users, and others who access or use the Services. If
                you disagree with any part of these terms, then you may not access the Services.
              </p>
              <p>
                <strong>Key Points:</strong>
              </p>
              <ul>
                <li>You must be at least 18 years old to use our Services</li>
                <li>These Terms constitute a legally binding agreement</li>
                <li>
                  Your continued use of the Services signifies acceptance of any updated Terms
                </li>
              </ul>
            </SectionContent>
          </Section>

          <Section
            id="definitions"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SectionTitle>2. Definitions</SectionTitle>
            <SectionContent>
              <p>For the purposes of these Terms:</p>
              <ul>
                <li>
                  <strong>"Company"</strong> refers to Luxe Fashion
                </li>
                <li>
                  <strong>"Services"</strong> refers to our website, mobile app, and all related
                  services
                </li>
                <li>
                  <strong>"Products"</strong> refers to fashion items, accessories, and custom
                  designs offered
                </li>
                <li>
                  <strong>"User"</strong> refers to anyone who accesses or uses our Services
                </li>
                <li>
                  <strong>"Account"</strong> refers to the user profile created to access certain
                  Services
                </li>
                <li>
                  <strong>"Content"</strong> refers to text, images, videos, and other materials on
                  our platform
                </li>
              </ul>
            </SectionContent>
          </Section>

          <Section
            id="account"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <SectionTitle>3. User Account & Registration</SectionTitle>
            <SectionContent>
              <p>
                To access certain features of our Services, you may be required to create an
                account. When creating an account, you must provide accurate, current, and complete
                information.
              </p>
              <p>
                <strong>Account Responsibilities:</strong>
              </p>
              <ul>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Update your information promptly when changes occur</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or
                engage in fraudulent, illegal, or harmful activities.
              </p>
            </SectionContent>
          </Section>

          <Section
            id="products"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SectionTitle>4. Products & Services</SectionTitle>
            <SectionContent>
              <p>
                Luxe Fashion offers a curated selection of western and ethnic fashion, including
                ready-to-wear garments, custom designs, and styling consultations.
              </p>
              <p>
                <strong>Product Information:</strong>
              </p>
              <ul>
                <li>
                  We strive to display accurate product images, descriptions, and specifications
                </li>
                <li>Colors may vary slightly due to monitor settings and lighting conditions</li>
                <li>All measurements are approximate and may have minor variations</li>
                <li>Product availability is subject to change without notice</li>
              </ul>
              <p>
                <strong>Custom Orders:</strong>
              </p>
              <ul>
                <li>Custom designs require advance payment and longer delivery times</li>
                <li>Modifications to custom orders may incur additional charges</li>
                <li>Custom items are typically non-returnable unless defective</li>
              </ul>
            </SectionContent>
          </Section>

          <Section
            id="pricing"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <SectionTitle>5. Pricing & Payment Terms</SectionTitle>
            <SectionContent>
              <p>
                All prices are listed in Indian Rupees (INR) and US Dollars (USD) where applicable.
                Prices are subject to change without notice.
              </p>
              <p>
                <strong>Payment Terms:</strong>
              </p>
              <ul>
                <li>Payment is required at the time of order placement</li>
                <li>We accept major credit cards, debit cards, UPI, and digital wallets</li>
                <li>All transactions are processed through secure, encrypted payment gateways</li>
                <li>Custom orders may require a 50% advance payment</li>
              </ul>
              <p>
                <strong>Additional Charges:</strong>
              </p>
              <ul>
                <li>Shipping charges are calculated based on location and order value</li>
                <li>International orders may be subject to customs duties and taxes</li>
                <li>Rush orders may incur additional processing fees</li>
              </ul>
            </SectionContent>
          </Section>

          <Section
            id="shipping"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SectionTitle>6. Shipping & Delivery</SectionTitle>
            <SectionContent>
              <p>
                We ship domestically within India and internationally to select countries. Delivery
                times vary based on location and product availability.
              </p>
              <p>
                <strong>Shipping Policy:</strong>
              </p>
              <ul>
                <li>Standard delivery: 5-7 business days within India</li>
                <li>Express delivery: 2-3 business days (additional charges apply)</li>
                <li>International shipping: 10-15 business days</li>
                <li>Free shipping on orders above ₹2,999 within India</li>
              </ul>
              <p>
                <strong>Delivery Terms:</strong>
              </p>
              <ul>
                <li>You must provide accurate shipping information</li>
                <li>Risk of loss passes to you upon delivery</li>
                <li>Signature confirmation may be required for high-value items</li>
                <li>Delivery delays due to unforeseen circumstances are not our responsibility</li>
              </ul>
            </SectionContent>
          </Section>

          <Section
            id="returns"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <SectionTitle>7. Returns & Exchanges</SectionTitle>
            <SectionContent>
              <p>
                We want you to be completely satisfied with your purchase. Our return and exchange
                policy is designed to ensure your confidence in shopping with us.
              </p>
              <p>
                <strong>Return Policy:</strong>
              </p>
              <ul>
                <li>Items may be returned within 15 days of delivery</li>
                <li>Products must be unworn, unwashed, and in original condition</li>
                <li>Original tags and packaging must be intact</li>
                <li>Return shipping costs are the customer's responsibility</li>
              </ul>
              <p>
                <strong>Non-Returnable Items:</strong>
              </p>
              <ul>
                <li>Custom-made or personalized items</li>
                <li>Intimate apparel and undergarments</li>
                <li>Items marked as "Final Sale"</li>
                <li>Products damaged due to misuse or normal wear</li>
              </ul>
            </SectionContent>
          </Section>

          <Section
            id="intellectual"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <SectionTitle>8. Intellectual Property</SectionTitle>
            <SectionContent>
              <p>
                The Services and their original content, features, and functionality are and will
                remain the exclusive property of Luxe Fashion and its licensors.
              </p>
              <p>
                <strong>Protected Content Includes:</strong>
              </p>
              <ul>
                <li>Original design patterns and fashion concepts</li>
                <li>Website content, images, and videos</li>
                <li>Trademarks, logos, and brand elements</li>
                <li>Software and technical implementations</li>
              </ul>
              <p>
                You may not reproduce, distribute, modify, or create derivative works from our
                content without explicit written permission.
              </p>
            </SectionContent>
          </Section>

          <Section
            id="privacy"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <SectionTitle>9. Privacy & Data Protection</SectionTitle>
            <SectionContent>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use,
                and protect your information when you use our Services.
              </p>
              <p>
                <strong>Data Collection:</strong>
              </p>
              <ul>
                <li>Personal information provided during registration and purchases</li>
                <li>Usage data and preferences to improve our Services</li>
                <li>Communication history for customer support purposes</li>
              </ul>
              <p>
                By using our Services, you consent to the collection and use of information as
                described in our Privacy Policy.
              </p>
            </SectionContent>
          </Section>

          <Section
            id="prohibited"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <SectionTitle>10. Prohibited Uses</SectionTitle>
            <SectionContent>
              <p>
                You may not use our Services for any unlawful purpose or to solicit others to
                perform illegal acts. Prohibited activities include:
              </p>
              <ul>
                <li>Violating laws, regulations, or third-party rights</li>
                <li>Transmitting harmful, threatening, or offensive content</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with the proper functioning of the Services</li>
                <li>Engaging in fraudulent activities or identity theft</li>
                <li>Copying or distributing our content without permission</li>
              </ul>
              <p>
                We reserve the right to terminate access for users who violate these restrictions.
              </p>
            </SectionContent>
          </Section>

          <Section
            id="limitation"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <SectionTitle>11. Limitation of Liability</SectionTitle>
            <SectionContent>
              <p>
                To the fullest extent permitted by law, Luxe Fashion shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages.
              </p>
              <p>
                <strong>Limitations Include:</strong>
              </p>
              <ul>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Interruption of business or service delays</li>
                <li>Third-party actions or system failures</li>
                <li>Damages exceeding the amount paid for the specific product or service</li>
              </ul>
              <p>
                Our total liability for any claim related to the Services is limited to the amount
                you paid for the specific product or service in question.
              </p>
            </SectionContent>
          </Section>

          <Section
            id="modifications"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <SectionTitle>12. Modifications to Terms</SectionTitle>
            <SectionContent>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is
                material, we will provide at least 30 days notice prior to any new terms taking
                effect.
              </p>
              <p>
                <strong>Change Process:</strong>
              </p>
              <ul>
                <li>Updated Terms will be posted on this page</li>
                <li>The "Last Updated" date will be revised</li>
                <li>Significant changes may be communicated via email</li>
                <li>Continued use of Services constitutes acceptance of new Terms</li>
              </ul>
              <p>
                It is your responsibility to review these Terms periodically for changes. If you do
                not agree to the modified Terms, you must discontinue use of the Services.
              </p>
            </SectionContent>
          </Section>
        </ContentContainer>

        {/* Contact CTA */}
        <ContactCTA>
          <CTAContent
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <CTATitle>Questions About These Terms?</CTATitle>
            <CTAText>
              If you have any questions about these Terms and Conditions, please don't hesitate to
              contact our legal team. We're here to help clarify any concerns.
            </CTAText>
            <CTAButton href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Shield size={18} />
              CONTACT LEGAL TEAM
            </CTAButton>
          </CTAContent>
        </ContactCTA>
      </ContentSection>
    </PageTransition>
  )
}

export default TermsConditions
