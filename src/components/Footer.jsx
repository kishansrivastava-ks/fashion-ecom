import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  ArrowRight,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Star,
} from 'lucide-react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// Footer Container
const FooterContainer = styled.footer`
  background: white;
  color: black;
`

// Newsletter Section
const NewsletterSection = styled.section`
  background: linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%);
  padding: 6rem 0;
  border-bottom: 1px solid #ddd;
`

const NewsletterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`

const NewsletterContent = styled(motion.div)``

const NewsletterTitle = styled.h3`
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 100;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
  color: black;
`

const NewsletterText = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  color: #555;
  margin: 0;
`

const NewsletterForm = styled(motion.form)`
  display: flex;
  gap: 0;
  max-width: 400px;

  @media (max-width: 768px) {
    margin: 0 auto;
    flex-direction: column;
    gap: 1rem;
  }
`

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 1px solid #ccc;
  background: white;
  color: black;
  font-size: 1rem;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #555;
    background: #f9f9f9;
  }
`

const NewsletterButton = styled(motion.button)`
  background: black;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`

// Main Footer Content
const FooterMain = styled.section`
  padding: 5rem 0 3rem 0;
`

const FooterGrid = styled.div`
  max-width: 1200px;
  /* border: 2px solid red; */
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const FooterColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

const BrandColumn = styled(FooterColumn)`
  @media (max-width: 768px) {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: 2rem;
  }
`

const BrandLogo = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.2rem;
  margin: 0 0 1.5rem 0;
  color: black;
`

const BrandTagline = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  color: #555;
  margin: 0 0 2rem 0;
  max-width: 280px;

  @media (max-width: 768px) {
    max-width: 400px;
    margin: 0 auto 2rem auto;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    transform: translateY(-2px);
  }
`

const ColumnTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin: 0 0 2rem 0;
  color: black;
  text-transform: uppercase;
`

const FooterLink = styled(motion.a)`
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 300;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: black;
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #555;
  font-size: 0.95rem;
  font-weight: 300;
`

const ContactIcon = styled.div`
  width: 35px;
  height: 35px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

// Features Section
const FeaturesSection = styled.section`
  background: #f5f5f5;
  padding: 3rem 0;
  border-top: 1px solid #ddd;
`

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
`

const FeatureIcon = styled.div`
  width: 45px;
  height: 45px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  flex-shrink: 0;
`

const FeatureText = styled.div`
  @media (max-width: 480px) {
    text-align: center;
  }
`

const FeatureTitle = styled.h5`
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0 0 0.25rem 0;
  color: black;
`

const FeatureDescription = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
  color: #666;
  margin: 0;
`

// Payment & Legal Section
const BottomSection = styled.section`
  background: white;
  padding: 2rem 0;
  border-top: 1px solid #ddd;
`

const BottomContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`

const Copyright = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  color: #666;
  margin: 0;
`

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const LegalLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 300;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

const PaymentMethods = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    order: -1;
  }
`

const PaymentText = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-right: 0.5rem;
`

const PaymentIcons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const PaymentIcon = styled.div`
  width: 35px;
  height: 24px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 0.8rem;
  font-weight: bold;
`

const BookButton = styled(motion.button)`
  background: black;
  color: white;
  border: 1px solid black;
  padding: 0.8rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: black;
  }
`

// Component
const Footer = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      {/* Newsletter Section */}
      <NewsletterSection>
        <NewsletterContainer>
          <NewsletterContent
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <NewsletterTitle>Stay Updated</NewsletterTitle>
            <NewsletterText>
              Be the first to know about new collections, exclusive offers, and fashion insights
              delivered to your inbox.
            </NewsletterText>
          </NewsletterContent>
          <NewsletterForm
            onSubmit={handleNewsletterSubmit}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <NewsletterInput
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <NewsletterButton type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Send size={16} />
              SUBSCRIBE
            </NewsletterButton>
          </NewsletterForm>
        </NewsletterContainer>
      </NewsletterSection>

      {/* Main Footer Content */}
      <FooterMain>
        <FooterGrid>
          <BrandColumn
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <BrandLogo>SHAASHEE</BrandLogo>
            <BrandTagline>
              Redefining modern fashion through the perfect blend of traditional craftsmanship and
              contemporary design. Where every piece tells a story of elegance and sophistication.
            </BrandTagline>
            <SocialLinks>
              <SocialLink
                href="https://instagram.com/luxefashion"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </SocialLink>
              <SocialLink
                href="https://facebook.com/luxefashion"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={18} />
              </SocialLink>
              <SocialLink
                href="https://twitter.com/luxefashion"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={18} />
              </SocialLink>
              <SocialLink
                href="https://youtube.com/luxefashion"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Youtube size={18} />
              </SocialLink>
            </SocialLinks>
          </BrandColumn>

          <FooterColumn
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ColumnTitle>Quick Links</ColumnTitle>
            <FooterLink href="/about">
              <ArrowRight size={14} />
              About Us
            </FooterLink>
            <FooterLink href="/contact">
              <ArrowRight size={14} />
              Contact Us
            </FooterLink>
            <FooterLink href="/appointment">
              <ArrowRight size={14} />
              Book Consultation
            </FooterLink>
            <FooterLink href="/wishlist">
              <Heart size={14} />
              Wishlist
            </FooterLink>
            <FooterLink href="/track-order">
              <ArrowRight size={14} />
              Track Your Order
            </FooterLink>
            <FooterLink href="/size-guide">
              <ArrowRight size={14} />
              Size Guide
            </FooterLink>
          </FooterColumn>

          <FooterColumn
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ColumnTitle>Contact Info</ColumnTitle>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <MapPin size={16} />
                </ContactIcon>
                <div>
                  123 Fashion District,
                  <br />
                  New Delhi - 110001
                </div>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <Phone size={16} />
                </ContactIcon>
                <div>+91 12345 67890</div>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <Mail size={16} />
                </ContactIcon>
                <div>hello@shasheefashion.com</div>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <MessageCircle size={16} />
                </ContactIcon>
                <div>WhatsApp Support</div>
              </ContactItem>
            </ContactInfo>
          </FooterColumn>

          <FooterColumn
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ColumnTitle>Personal Styling Session</ColumnTitle>
            <p
              style={{
                fontSize: '0.95rem',
                fontWeight: 300,
                color: '#555',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Let’s create your dream outfit together — book your slot now.
            </p>
            <BookButton
              onClick={() => navigate('/appointment')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation <ArrowRight size={16} />
            </BookButton>
          </FooterColumn>
        </FooterGrid>
      </FooterMain>

      {/* Features Section */}
      <FeaturesSection>
        <FeaturesContainer>
          <FeatureItem
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FeatureIcon>
              <Truck size={20} />
            </FeatureIcon>
            <FeatureText>
              <FeatureTitle>Free Shipping</FeatureTitle>
              <FeatureDescription>On orders above ₹2999</FeatureDescription>
            </FeatureText>
          </FeatureItem>

          <FeatureItem
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FeatureIcon>
              <RotateCcw size={20} />
            </FeatureIcon>
            <FeatureText>
              <FeatureTitle>Easy Returns</FeatureTitle>
              <FeatureDescription>15-day return policy</FeatureDescription>
            </FeatureText>
          </FeatureItem>

          <FeatureItem
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FeatureIcon>
              <Shield size={20} />
            </FeatureIcon>
            <FeatureText>
              <FeatureTitle>Secure Payment</FeatureTitle>
              <FeatureDescription>100% secure checkout</FeatureDescription>
            </FeatureText>
          </FeatureItem>

          <FeatureItem
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FeatureIcon>
              <MessageCircle size={20} />
            </FeatureIcon>
            <FeatureText>
              <FeatureTitle>24/7 Support</FeatureTitle>
              <FeatureDescription>Always here to help</FeatureDescription>
            </FeatureText>
          </FeatureItem>
        </FeaturesContainer>
      </FeaturesSection>

      {/* Bottom Section */}
      <BottomSection>
        <BottomContainer>
          <Copyright>
            © {currentYear} SHAASHEE Fashion. All rights reserved. Designed with ❤️ in India
          </Copyright>

          <LegalLinks>
            <LegalLink href="/privacy-policy">Privacy Policy</LegalLink>
            <LegalLink href="/terms-conditions">Terms & Conditions</LegalLink>
            <LegalLink href="/return-policy">Return Policy</LegalLink>
          </LegalLinks>

          <PaymentMethods>
            <PaymentText>We Accept:</PaymentText>
            <PaymentIcons>
              <PaymentIcon>VISA</PaymentIcon>
              <PaymentIcon>MC</PaymentIcon>
              <PaymentIcon>UPI</PaymentIcon>
              <PaymentIcon>GPay</PaymentIcon>
            </PaymentIcons>
          </PaymentMethods>
        </BottomContainer>
      </BottomSection>
    </FooterContainer>
  )
}

export default Footer
