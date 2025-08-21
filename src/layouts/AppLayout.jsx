import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Outlet, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaGoogle,
  FaBars, // Icon for mobile menu
  FaTimes, // Icon to close mobile menu
} from 'react-icons/fa'

// Add this dummy data at the top of your AppLayout.js file
const coursesData = {
  'General Management': {
    'Early Career': [
      { id: 1, title: 'Business Fundamentals', logo: '🎓', rating: 4.5 },
      { id: 2, title: 'Intro to Project Management', logo: '📊', rating: 4.7 },
    ],
    Executive: [
      { id: 3, title: 'Advanced Corporate Strategy', logo: '📈', rating: 4.9 },
      { id: 4, title: 'Global Leadership Program', logo: '🌍', rating: 4.8 },
    ],
  },
  'Technology & Analytics': {
    'Early Career': [
      { id: 5, title: 'Python for Data Science', logo: '🐍', rating: 4.9 },
      { id: 6, title: 'Full-Stack Web Development', logo: '💻', rating: 4.8 },
    ],
    Executive: [
      { id: 7, title: 'AI for Business Leaders', logo: '🤖', rating: 4.9 },
      { id: 8, title: 'Cybersecurity Strategy', logo: '🔒', rating: 4.7 },
    ],
    Online: [{ id: 9, title: 'Machine Learning A-Z', logo: '🧠', rating: 4.6 }],
  },
  'Banking & Finance': {
    'Early Career': [{ id: 10, title: 'Financial Modeling & Valuation', logo: '💰', rating: 4.8 }],
    Executive: [{ id: 11, title: 'Fintech & Digital Banking', logo: '💳', rating: 4.9 }],
    Online: [{ id: 12, title: 'Algorithmic Trading Basics', logo: '➗', rating: 4.7 }],
  },
  'Leadership and Strategy': {
    'Early Career': [{ id: 13, title: 'Emerging Leaders Program', logo: '🌱', rating: 4.7 }],
    Executive: [
      { id: 14, title: 'Strategic Negotiation', logo: '🤝', rating: 4.9 },
      { id: 15, title: 'C-Suite Leadership Excellence', logo: '👑', rating: 4.8 },
    ],
  },
  'Operations & Supply Chain': {
    'Early Career': [{ id: 16, title: 'Logistics & Distribution Basics', logo: '🚚', rating: 4.6 }],
    Executive: [{ id: 17, title: 'Global Supply Chain Management', logo: '🌐', rating: 4.8 }],
    Online: [{ id: 18, title: 'Lean Six Sigma Certification', logo: '⚙️', rating: 4.9 }],
  },
  'Marketing & Sales': {
    'Early Career': [
      { id: 19, title: 'Digital Marketing Fundamentals', logo: '📱', rating: 4.8 },
      { id: 20, title: 'Professional Sales Techniques', logo: '🗣️', rating: 4.7 },
    ],
    Executive: [{ id: 21, title: 'Chief Marketing Officer Program', logo: '📣', rating: 4.9 }],
  },
  Healthcare: {
    'Early Career': [{ id: 22, title: 'Intro to Healthcare Management', logo: '🏥', rating: 4.6 }],
    Executive: [{ id: 23, title: 'Hospital Administration Leadership', logo: '🏨', rating: 4.8 }],
  },
  'Product Management': {
    'Early Career': [
      { id: 24, title: 'Associate Product Manager Bootcamp', logo: '🚀', rating: 4.8 },
    ],
    Online: [{ id: 25, title: 'Agile & Scrum Masterclass', logo: '🔄', rating: 4.7 }],
  },
  'Human Resources': {
    'Early Career': [
      { id: 26, title: 'Talent Acquisition & Recruitment', logo: '🧑‍💼', rating: 4.7 },
    ],
    Executive: [{ id: 27, title: 'Strategic HR Leadership', logo: '👥', rating: 4.8 }],
  },
}

const courseCategories = [
  'General Management',
  'Technology & Analytics',
  'Banking & Finance',
  'Leadership and Strategy',
  'Operations & Supply Chain',
  'Marketing & Sales',
  'Healthcare',
  'Product Management',
  'Human Resources',
]

// --- MegaMenu Component (Desktop) ---
const MegaMenu = ({ activeCategory, setActiveCategory }) => {
  const courses = coursesData[activeCategory] || {}
  return (
    <MegaMenuContainer
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <MenuLayout>
        <LeftColumn>
          {courseCategories.map((category) => (
            <CategoryItem
              key={category}
              active={activeCategory === category}
              onMouseEnter={() => setActiveCategory(category)}
            >
              {category}
            </CategoryItem>
          ))}
        </LeftColumn>
        <RightColumn>
          {Object.keys(courses).length > 0 ? (
            Object.entries(courses).map(([type, courseList]) => (
              <CourseSection key={type}>
                <CourseTypeTitle>{type} Courses</CourseTypeTitle>
                {courseList.map((course) => (
                  <CourseCard key={course.id}>
                    <CourseLogo>{course.logo}</CourseLogo>
                    <CourseInfo>
                      <h4>{course.title}</h4>
                      <p>Rating: {course.rating} ★</p>
                    </CourseInfo>
                  </CourseCard>
                ))}
              </CourseSection>
            ))
          ) : (
            <p>Select a category to see courses.</p>
          )}
          <ViewAllButton to="/courses">View All Courses &rarr;</ViewAllButton>
        </RightColumn>
      </MenuLayout>
    </MegaMenuContainer>
  )
}

// --- Mobile Courses Accordion ---
const CoursesAccordion = ({ onLinkClick }) => {
  const [openCategory, setOpenCategory] = useState(null)

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  return (
    <AccordionContainer>
      {courseCategories.map((category) => (
        <div key={category}>
          <AccordionHeader onClick={() => toggleCategory(category)}>
            {category}
            <AccordionIcon isOpen={openCategory === category}>▼</AccordionIcon>
          </AccordionHeader>
          <AnimatePresence>
            {openCategory === category && (
              <AccordionContent
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {Object.entries(coursesData[category]).map(([type, courseList]) => (
                  <div key={type}>
                    <AccordionSubHeader>{type} Courses</AccordionSubHeader>
                    {courseList.map((course) => (
                      <MobileCourseLink
                        to={`/courses/${course.id}`}
                        key={course.id}
                        onClick={onLinkClick}
                      >
                        {course.logo} {course.title}
                      </MobileCourseLink>
                    ))}
                  </div>
                ))}
              </AccordionContent>
            )}
          </AnimatePresence>
        </div>
      ))}
    </AccordionContainer>
  )
}

// --- Mobile Navigation Menu ---
const MobileNavMenu = ({ isOpen, closeMenu, openAuthModal }) => {
  const handleLinkClick = () => {
    closeMenu()
  }

  const handleAuthClick = () => {
    closeMenu()
    openAuthModal()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <MobileNavWrapper
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <MobileNavHeader>
            <CloseMobileMenuButton onClick={closeMenu}>
              <FaTimes />
            </CloseMobileMenuButton>
          </MobileNavHeader>
          <MobileNavLinksContainer>
            <SearchBar type="text" placeholder="Search..." mobile />
            <MobileNavItem>
              <MobileCoursesHeader>Courses</MobileCoursesHeader>
              <CoursesAccordion onLinkClick={handleLinkClick} />
            </MobileNavItem>
            <MobileStyledLink to="/training-and-placements" onClick={handleLinkClick}>
              Training & Placements
            </MobileStyledLink>
            <MobileStyledLink to="/about" onClick={handleLinkClick}>
              About Us
            </MobileStyledLink>
            <MobileStyledLink to="/recommendations" onClick={handleLinkClick}>
              Recommendations
            </MobileStyledLink>
            <AuthButton as="button" onClick={handleAuthClick} mobile>
              Login / Register
            </AuthButton>
          </MobileNavLinksContainer>
        </MobileNavWrapper>
      )}
    </AnimatePresence>
  )
}

// --- AuthModal Component ---
const AuthModal = ({ setOpen }) => {
  return (
    <ModalBackdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ModalContent
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <CloseButton onClick={() => setOpen(false)}>&times;</CloseButton>
        <h3>Welcome!</h3>
        <p>Sign in or create an account to continue</p>
        <SocialLoginButton google>
          <FaGoogle /> Continue with Google
        </SocialLoginButton>
        <SocialLoginButton>
          <FaFacebookF /> Continue with Facebook
        </SocialLoginButton>
        <OrDivider>
          <span>OR</span>
        </OrDivider>
        <input type="email" placeholder="Enter your email" />
        <button className="email-continue">Continue with Email</button>
      </ModalContent>
    </ModalBackdrop>
  )
}

const AppLayout = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(courseCategories[0])
  const [isModalOpen, setModalOpen] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <LayoutWrapper>
      <GlobalScrollLock isOpen={isMobileMenuOpen} />
      {/* --- Redesigned Navbar --- */}
      <NavbarWrapper
        animate={{
          backgroundColor: scrolled ? '#fffffff2' : 'transparent',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.07)' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <NavbarContainer>
          <LogoContainer>
            <LogoImage />
            <Logo to="/">
              Career Counseling Corporation of India <br />
              <span style={{ color: '#da3b3b' }}>A Learning Center</span>
            </Logo>
            {/* <div>A Learning Center</div> */}
          </LogoContainer>

          {/* --- Desktop Navigation --- */}
          <NavItems>
            <StyledLink
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <p>Courses</p>
              <AnimatePresence>
                {isDropdownOpen && (
                  <MegaMenu activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                )}
              </AnimatePresence>
            </StyledLink>
            <StyledLink to="/recommendations">Recommendations</StyledLink>
            <SearchBar type="text" placeholder="Search..." />
            <StyledLink to="/training-and-placements">Training & Placements</StyledLink>
            <StyledLink to="/about">About Us</StyledLink>
          </NavItems>
          <AuthContainer>
            <AuthButton as="button" onClick={() => setModalOpen(true)}>
              Login / Register
            </AuthButton>
          </AuthContainer>

          {/* --- Mobile Menu Toggle --- */}
          <MenuToggle onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MenuToggle>
        </NavbarContainer>
      </NavbarWrapper>

      {/* --- Mobile Navigation Menu --- */}
      <MobileNavMenu
        isOpen={isMobileMenuOpen}
        closeMenu={() => setMobileMenuOpen(false)}
        openAuthModal={() => setModalOpen(true)}
      />

      {/* --- Main Content Area --- */}
      <Main>
        <Outlet />
      </Main>

      {/* --- Redesigned Footer --- */}
      <Footer>
        <FooterContainer>
          <FooterColumn>
            <FooterLogo>Career Counseling Corporation of India</FooterLogo>
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

          {/* <FooterColumn>
            <FooterHeading>Explore</FooterHeading>
            <FooterLink to="/courses">Early Career Courses</FooterLink>
            <FooterLink to="/courses">Executive Education</FooterLink>
            <FooterLink to="/courses">Self-Paced Courses</FooterLink>
            <FooterLink to="/enterprise">Enterprise Solutions</FooterLink>
          </FooterColumn> */}

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
          © {new Date().getFullYear()} Career Counseling Corporation of India. All Rights Reserved.
        </FooterBottom>
      </Footer>

      <AnimatePresence>{isModalOpen && <AuthModal setOpen={setModalOpen} />}</AnimatePresence>
    </LayoutWrapper>
  )
}

export default AppLayout

// --- Styled Components for the Layout ---

// Global style to lock body scroll when mobile menu is open
const GlobalScrollLock = createGlobalStyle`
  body {
    overflow: ${({ isOpen }) => (isOpen ? 'hidden' : 'auto')};
  }
`

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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;

  &[style*='background-color: rgb(255, 255, 255)'] {
    border-bottom-color: #e0e0e0;
  }
`

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  max-width: 1500px;
  margin: 0 auto;
  /* border: 2px solid red; */

  @media (max-width: 1024px) {
    padding: 1rem 1.5rem;
  }
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  z-index: 1100; // Ensure logo is above mobile menu overlay when it animates
`

const LogoImage = styled.img.attrs({
  src: '/logo.png',
  alt: 'Logo',
})`
  width: 48px;
  height: 48px;
  margin-right: 0.5rem;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
  }
`

const Logo = styled(Link)`
  font-size: 1.2dvw;
  font-weight: 400;
  color: #000080;
  text-decoration: none;
  white-space: nowrap;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1rem;
    white-space: normal;
    max-width: 250px;
    line-height: 1.2;
  }
  & > span {
    font-size: 0.8rem;
    color: #000000;
    letter-spacing: 1px;
  }
`

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  /* border: 1px solid red; */
  margin-right: auto;
  margin-left: 1rem;
  padding-top: 0.5rem;

  @media (max-width: 1024px) {
    display: none;
  }
`

const StyledLink = styled(Link)`
  font-size: 1vw;
  color: #333;
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
  /* gap: 1rem; */
  @media (max-width: 1024px) {
    display: none;
  }
`

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  /* border-radius: 8px; */
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: ${({ mobile }) => (mobile ? '100%' : '22vw')};
  margin-top: -0.5rem;

  &:focus {
    border-color: #000080;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 128, 0.1);
    width: ${({ mobile }) => (mobile ? '100%' : '23vw')};
  }
`

const AuthButton = styled(Link)`
  padding: 0.35rem 1.5rem;
  background: #d9534f;
  color: white;
  /* border-radius: 8px; */
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-size: 1vw;

  width: ${({ mobile }) => (mobile ? '100%' : 'auto')};
  padding: ${({ mobile }) => (mobile ? '0.8rem 1.5rem' : '0.35rem 1.5rem')};
  text-align: center;

  &:hover {
    background: #c9302c;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(217, 83, 79, 0.3);
    color: #ffffff;
  }
`

// --- Mobile Navigation Styles ---
const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #000080;
  cursor: pointer;
  z-index: 1100; // Above overlay

  @media (max-width: 1024px) {
    display: block;
  }
`

const MobileNavWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100dvh;
  background: #ffffff;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);

  @media (min-width: 577px) {
    width: 375px; // A fixed width for larger mobile/tablet
  }
`
const MobileNavHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  height: 86px; // Match navbar height
  align-items: center;
`

const CloseMobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #000080;
  cursor: pointer;
`

const MobileNavLinksContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  flex-grow: 1;
`

const MobileStyledLink = styled(Link)`
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 0;
`
const MobileNavItem = styled.div`
  display: flex;
  flex-direction: column;
`

const MobileCoursesHeader = styled.h3`
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
  margin: 0;
  padding: 0.5rem 0;
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

// For the Dropdown Menu (Desktop)
const NavItem = styled.div`
  position: relative;
  /* border: 1px solid red; */
`

const MegaMenuContainer = styled(motion.div)`
  position: absolute;
  top: 150%;
  left: -20rem;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 1300px;
  background-color: white;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 2rem;
  z-index: 1;
  border-top: 1px solid #eee;
`

const MenuLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
`

const LeftColumn = styled.div`
  border-right: 1px solid #eee;
  padding-right: 2rem;
`

const CategoryItem = styled.div`
  padding: 0.75rem 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#000080' : '#333')};
  background-color: ${({ active }) => (active ? '#f0f2f5' : 'transparent')};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f0f2f5;
  }
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CourseSection = styled.div``

const CourseTypeTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`

const CourseCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`

const CourseLogo = styled.div`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CourseInfo = styled.div`
  h4 {
    margin: 0 0 0.25rem 0;
    font-weight: 600;
    color: #2d3748;
  }
  p {
    margin: 0;
    font-size: 0.85rem;
    color: #718096;
  }
`

const ViewAllButton = styled(Link)`
  margin-top: 1rem;
  font-weight: 500;
  color: #000080;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

// Styles for Mobile Courses Accordion
const AccordionContainer = styled.div`
  width: 100%;
  border-top: 1px solid #eee;
  margin-top: 1rem;
`

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  cursor: pointer;
  font-weight: 500;
  color: #4a5568;
`

const AccordionIcon = styled.span`
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`

const AccordionContent = styled(motion.div)`
  overflow: hidden;
  padding-left: 1rem;
  border-left: 2px solid #00008020;
`
const AccordionSubHeader = styled.h4`
  font-size: 0.9rem;
  color: #718096;
  margin: 0.75rem 0 0.5rem;
  text-transform: uppercase;
`
const MobileCourseLink = styled(Link)`
  display: block;
  padding: 0.5rem 0;
  color: #2d3748;
  text-decoration: none;
  font-size: 1rem;
`

// For the Auth Modal
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 2.5rem;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  position: relative;
  text-align: center;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    color: #1a202c;
  }
  p {
    margin: 0 0 2rem 0;
    color: #4a5568;
  }
  input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .email-continue {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    background-color: #000080;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #a0aec0;
`

const SocialLoginButton = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.google ? '#F8F8F8' : '#fff')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #a0aec0;
  margin: 1.5rem 0;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }
  span {
    padding: 0 1rem;
  }
`
