import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaSearch,
  FaBell,
  FaUser,
  FaChevronDown,
  FaGraduationCap,
  FaHeart,
  FaArrowUp,
} from 'react-icons/fa'

const AppLayout = () => {
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
      setShowScrollTop(scrollPosition > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <LayoutWrapper>
      <NavbarWrapper
        as={motion.nav}
        animate={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.1)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        <NavbarContainer>
          <LogoSection>
            <Logo>
              <LogoIcon>
                <FaGraduationCap />
              </LogoIcon>
              CourseWave
            </Logo>
          </LogoSection>

          <SearchSection>
            <SearchContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput type="text" placeholder="Search courses, instructors, topics..." />
              <SearchButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </SearchButton>
            </SearchContainer>
          </SearchSection>

          <NavItems>
            <NavLink to="/courses">
              Courses
              <DropdownIcon>
                <FaChevronDown />
              </DropdownIcon>
            </NavLink>
            <NavLink to="/recommendations">Recommendations</NavLink>
            <NavLink to="/library">Digital Library</NavLink>

            <NavActions>
              <ActionButton
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaBell />
              </ActionButton>
              <ActionButton
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart />
              </ActionButton>
              <AuthButton
                to="/auth"
                as={motion.div}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUser />
                Login
              </AuthButton>
            </NavActions>
          </NavItems>

          <MobileMenuButton>
            <div></div>
            <div></div>
            <div></div>
          </MobileMenuButton>
        </NavbarContainer>
      </NavbarWrapper>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        <FooterBackground />
        <FooterContainer>
          <FooterTopSection>
            <FooterColumn>
              <FooterLogo>
                <LogoIcon>
                  <FaGraduationCap />
                </LogoIcon>
                CourseWave
              </FooterLogo>
              <FooterDescription>
                Empowering learners worldwide with premium courses from industry experts. Transform
                your career with our cutting-edge learning platform.
              </FooterDescription>
              <SocialSection>
                <SocialLabel>Follow us</SocialLabel>
                <SocialIcons>
                  <SocialIcon
                    as={motion.div}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaFacebookF />
                  </SocialIcon>
                  <SocialIcon
                    as={motion.div}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTwitter />
                  </SocialIcon>
                  <SocialIcon
                    as={motion.div}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaInstagram />
                  </SocialIcon>
                  <SocialIcon
                    as={motion.div}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaYoutube />
                  </SocialIcon>
                </SocialIcons>
              </SocialSection>
            </FooterColumn>

            <FooterColumn>
              <FooterHeading>Explore</FooterHeading>
              <FooterLink to="/courses">All Courses</FooterLink>
              <FooterLink to="/categories">Categories</FooterLink>
              <FooterLink to="/instructors">Instructors</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/events">Events</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterHeading>Support</FooterHeading>
              <FooterLink to="/help">Help Center</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/community">Community</FooterLink>
              <FooterLink to="/tutorials">Tutorials</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterHeading>Company</FooterHeading>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/press">Press Kit</FooterLink>
              <FooterLink to="/partners">Partners</FooterLink>
              <FooterLink to="/affiliate">Affiliate Program</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterHeading>Legal</FooterHeading>
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
              <FooterLink to="/accessibility">Accessibility</FooterLink>
            </FooterColumn>
          </FooterTopSection>

          <FooterBottomSection>
            <FooterCopyright>
              © 2025 CourseWave. All rights reserved. Made with ❤️ for learners worldwide.
            </FooterCopyright>
            <FooterBadges>
              <Badge>🏆 #1 Learning Platform</Badge>
              <Badge>⭐ 4.9/5 Rating</Badge>
              <Badge>🔒 SSL Secured</Badge>
            </FooterBadges>
          </FooterBottomSection>
        </FooterContainer>
      </Footer>

      <ScrollToTop
        as={motion.button}
        onClick={scrollToTop}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp />
      </ScrollToTop>
    </LayoutWrapper>
  )
}

export default AppLayout

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
`

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`

const LogoSection = styled.div`
  flex-shrink: 0;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  /* color: white; */
  text-decoration: none;
  color: #ffe284;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const LogoIcon = styled.div`
  font-size: 1.8rem;
  color: #ffeaa7;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const SearchSection = styled.div`
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    display: none;
  }
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* border: 1px solid #ffe284; */
  border-radius: 50px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus-within {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 3px rgba(255, 234, 167, 0.2);
  }
`

const SearchIcon = styled.div`
  padding: 0 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
`

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 0;
  background: transparent;
  border: none;
  color: black;
  font-size: 0.95rem;
  outline: none;

  &::placeholder {
    /* color: rgba(255, 255, 255, 0.6); */
    color: #9ca3af;
  }
`

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #ffeaa7 0%, #fab1a0 100%);
  color: #2d3748;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  /* color: white; */
  color: #fdda68;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: #ffeaa7;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #ffeaa7 0%, #fab1a0 100%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const DropdownIcon = styled.div`
  font-size: 0.7rem;
  opacity: 0.7;
  transition: transform 0.3s ease;

  ${NavLink}:hover & {
    transform: rotate(180deg);
  }
`

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fdda68;

  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border: 1px solid #fdda68;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    /* color: #ffeaa7; */
  }
`

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #ffeaa7 0%, #fab1a0 100%);
  color: #2d3748;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 234, 167, 0.3);
`

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  backdrop-filter: blur(10px);

  div {
    width: 20px;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`

const Main = styled.main`
  flex: 1;
  padding-top: 80px;
  background: #f8fafc;
  position: relative;
`

const Footer = styled.footer`
  position: relative;
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
  overflow: hidden;
`

const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.02)"><path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z"/></svg>');
  background-size: 100% 100px;
  background-repeat: no-repeat;
  background-position: bottom;
`

const FooterContainer = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
`

const FooterTopSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
`

const FooterDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
`

const SocialSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SocialLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(45deg, #ffeaa7 0%, #fab1a0 100%);
    color: #2d3748;
    border-color: transparent;
  }
`

const FooterHeading = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0.25rem 0;

  &:hover {
    color: #ffeaa7;
    padding-left: 0.5rem;
  }
`

const FooterBottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`

const FooterCopyright = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`

const FooterBadges = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

const Badge = styled.div`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
`

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #ffeaa7 0%, #fab1a0 100%);
  color: #2d3748;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(255, 234, 167, 0.3);
  z-index: 100;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 35px rgba(255, 234, 167, 0.4);
  }
`
