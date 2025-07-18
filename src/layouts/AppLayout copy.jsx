import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Outlet, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

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
      <NavbarWrapper
        animate={{
          backgroundColor: scrolled ? '#ffffffee' : 'transparent',
          boxShadow: scrolled ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        <NavbarContainer>
          <Logo>CourseWave</Logo>
          <SearchBar type="text" placeholder="Search courses..." />
          <NavItems>
            <StyledLink to="/courses">Courses</StyledLink>
            <StyledLink to="/recommendations">Recommendations</StyledLink>
            <StyledLink to="/library">Digital Library</StyledLink>
            <AuthButton to="/auth">Login / Register</AuthButton>
          </NavItems>
        </NavbarContainer>
      </NavbarWrapper>

      <Main>
        <Outlet />
      </Main>

      <Footer>
        <FooterContainer>
          <FooterColumn>
            <FooterLogo>CourseWave</FooterLogo>
            <FooterText>
              Empowering learners with the best curated content across industries and skills.
            </FooterText>
            <SocialIcons>
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </SocialIcons>
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Explore</FooterHeading>
            <FooterLink to="/courses">All Courses</FooterLink>
            <FooterLink to="/categories">Categories</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
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
          </FooterColumn>
        </FooterContainer>
      </Footer>
    </LayoutWrapper>
  )
}

export default AppLayout

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const NavbarWrapper = styled(motion.nav)`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  backdrop-filter: blur(10px);
`

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const SearchBar = styled.input`
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.95rem;
  transition: border 0.2s ease-in-out;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const StyledLink = styled(Link)`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const AuthButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: 500;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: white;
  }
`

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.light};
`

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.dark};
  color: white;
  padding: 3rem 2rem;
`

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const FooterLogo = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const FooterText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
`

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.light};
  > * {
    cursor: pointer;
    transition: color 0.2s;
  }
  > *:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const FooterHeading = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const FooterLink = styled(Link)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`
