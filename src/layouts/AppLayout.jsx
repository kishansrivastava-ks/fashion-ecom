import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa'

// --- Main App Layout Component ---
const AppLayout = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <LayoutWrapper>
      {/* --- Redesigned Navbar --- */}
      <NavbarWrapper
        animate={{
          backgroundColor: scrolled ? '#fffffff2' : 'transparent',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.07)' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <NavbarContainer>
          <Logo to="/">Career Counselling Corporation of India</Logo>
          <NavItems>
            <StyledLink to="/training-and-placements">Training & Placements</StyledLink>
            {/* <StyledLink to="/institutes">Institutes</StyledLink> */}
            <StyledLink to="/about">About Us</StyledLink>
            <StyledLink to="/contact">Contact</StyledLink>
          </NavItems>
          <AuthContainer>
            <SearchBar type="text" placeholder="Search..." />
            <AuthButton to="/auth">Request a Callback</AuthButton>
          </AuthContainer>
        </NavbarContainer>
      </NavbarWrapper>

      {/* --- Main Content Area --- */}
      <Main>
        <Outlet />
      </Main>

      {/* --- Redesigned Footer --- */}
      <Footer>
        <FooterContainer>
          <FooterColumn>
            <FooterLogo>Career Counselling Corporation of India</FooterLogo>
            <FooterText>
              Empowering learners and professionals with curated content and guidance to achieve
              their career aspirations across diverse industries and skills.
            </FooterText>
            <SocialIcons>
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
            </SocialIcons>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Explore</FooterHeading>
            <FooterLink to="/courses">Early Career Courses</FooterLink>
            <FooterLink to="/courses">Executive Education</FooterLink>
            <FooterLink to="/courses">Self-Paced Courses</FooterLink>
            <FooterLink to="/enterprise">Enterprise Solutions</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Support</FooterHeading>
            <FooterLink to="/help">Help Center</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Company</FooterHeading>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/terms">Terms & Conditions</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
          </FooterColumn>
        </FooterContainer>
        <FooterBottom>
          © {new Date().getFullYear()} Career Counselling Corporation of India. All Rights
          Reserved.
        </FooterBottom>
      </Footer>
    </LayoutWrapper>
  )
}

export default AppLayout

// --- Styled Components for the Layout ---

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
`

// --- Navbar Styles ---

const NavbarWrapper = styled(motion.nav)`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;

  &[style*='background-color: rgb(255, 255, 255)'] {
    border-bottom-color: #e0e0e0;
  }
`

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

const Logo = styled(Link)`
  font-size: 1.3rem;
  font-weight: 700;
  color: #000080;
  text-decoration: none;
  white-space: nowrap;
`

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 1024px) {
    display: none; // Example: Hide for a mobile menu implementation
  }
`

const StyledLink = styled(Link)`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  padding-bottom: 5px;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000080;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SearchBar = styled.input`
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: 180px;

  &:focus {
    border-color: #000080;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 128, 0.1);
    width: 220px;
  }
`

const AuthButton = styled(Link)`
  padding: 0.7rem 1.5rem;
  background: #d9534f;
  color: white;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #c9302c;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(217, 83, 79, 0.3);
  }
`

// --- Main Content Styles ---

const Main = styled.main`
  flex: 1;
`

// --- Footer Styles ---

const Footer = styled.footer`
  background: #000080;
  color: #e0e0e0;
  padding: 4rem 2rem 2rem 2rem;
`

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`

const FooterText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #cce0ff;
  max-width: 350px;
`

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  a {
    color: #ffffff;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);

    &:hover {
      color: #ffffff;
      background-color: #d9534f;
      transform: translateY(-3px);
    }
  }
`

const FooterHeading = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`

const FooterLink = styled(Link)`
  font-size: 0.95rem;
  color: #cce0ff;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
  color: #cce0ff;
`
