import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { Search, Heart, ShoppingBag, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Main navigation container
const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 2rem;
  left: 20%;
  transform: translateX(-50%);
  z-index: 1000;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 1rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    top: 1.5rem;
    padding: 0.9rem 1.8rem;
    max-width: 85vw;
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 2.5%;
    /* transform: translateX(-50%); */
    border-radius: 25px;
    padding: 0.8rem 1.2rem;
    max-width: 95vw;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 1rem;
  }
`

// Navigation list
const NavList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`

// Brand logo/name
const Brand = styled(motion.li)`
  font-size: 1.8rem;
  font-weight: 100;
  letter-spacing: 0.15em;
  color: #1a1a1a;
  cursor: pointer;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    letter-spacing: 0.1em;
  }
`

// Navigation items
const NavItem = styled(motion.li)`
  position: relative;
`

const NavLink = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: #1a1a1a;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
  }
`

// Dropdown menu for collections
// Large Collections Dropdown Container
const DropdownContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: -500%;
  transform: translateX(50%);
  margin-top: 1.5rem;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  width: 100vw;

  @media (max-width: 1024px) {
    width: 85vw;
    padding: 1.8rem;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    transform: none;
    margin-top: 0;
    width: 100%;
    max-width: 100%;
    padding: 1.5rem;
    border-radius: 20px 20px 0 0;
    max-height: 70vh;
    overflow-y: auto;
  }
`
const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const CollectionCard = styled(motion.a)`
  position: relative;
  height: 450px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    height: 350px;
  }

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`

const CollectionCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${CollectionCard}:hover & {
    transform: scale(1.1);
  }
`

const CollectionCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);
  transition: background 0.4s ease;

  ${CollectionCard}:hover & {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%);
  }
`

const CollectionCardText = styled.span`
  position: relative;
  z-index: 2;
  color: white;
  font-size: 1.3rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

// Action buttons container
const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`

// Icon button for actions like search, cart, etc.
const IconButton = styled(motion.button)`
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #333;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #1a1a1a;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.3rem;
  }
`

// Cart badge
const CartBadge = styled(motion.span)`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #1a1a1a;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 500;
`

// Mobile menu toggle
const MobileMenuToggle = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #333;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`

// Mobile menu overlay
const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  padding: 5rem 2rem 2rem 2rem;
  overflow-y: auto;

  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 480px) {
    padding: 4rem 1.5rem 2rem 1.5rem;
  }
`

const MobileMenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  /* border: 2px solid red; */
  margin-top: 3rem;
`

const MobileMenuItem = styled(motion.li)`
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`

const MobileMenuLink = styled.a`
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 100;
  letter-spacing: 0.05em;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: #1a1a1a;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    padding: 0.8rem 0;
  }
`

const FloatingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3) // Example cart count
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Collections', href: '#collections', hasDropdown: true },
    // { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const collectionItems = [
    {
      name: 'Ethnic',
      href: '/collections/ethnic',
      image: '/images/ethnic/ethnic42.jpg',
    },
    {
      name: 'Western',
      href: '/collections/western',
      image: '/images/ethnic/ethnic61.jpg',
    },
    {
      name: 'Bridal',
      href: '/collections/bridal',
      image: '/images/ethnic/ethnic34.jpg',
    },
    {
      name: 'Custom',
      href: '/collections/custom',
      image: '/images/ethnic/ethnic2.jpg',
    },
  ]

  const mobileMenuItems = [
    { name: 'Home', href: '/home' },
    { name: 'Ethnic Collection', href: '/collections/ethnic' },
    { name: 'Western Collection', href: '/collections/western' },
    { name: 'Bridal Collection', href: '/collections/bridal' },
    { name: 'Custom Orders', href: '/collections/custom' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <NavContainer
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: isScrolled ? 0.95 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <NavList>
          {/* Brand */}
          <Brand
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
          >
            SHAASHEE
          </Brand>

          {/* Desktop Navigation */}
          <NavContentWrapper>
            {/* Hide on mobile */}
            <DesktopNavWrapper>
              {navItems.map((item, index) => (
                <NavItem
                  key={item.name}
                  onMouseEnter={() => item.hasDropdown && setShowDropdown(true)}
                  onMouseLeave={() => item.hasDropdown && setShowDropdown(false)}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NavLink href={item.href}>{item.name}</NavLink>

                  {/* Dropdown for Collections */}
                  <AnimatePresence>
                    {item.hasDropdown && showDropdown && (
                      <DropdownContainer
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DropdownGrid>
                          {collectionItems.map((collection, idx) => (
                            <CollectionCard
                              key={collection.name}
                              href={collection.href}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: idx * 0.1 }}
                              // whileHover={{ y: -5 }}
                            >
                              <CollectionCardImage src={collection.image} alt={collection.name} />
                              <CollectionCardOverlay />
                              <CollectionCardText>{collection.name}</CollectionCardText>
                            </CollectionCard>
                          ))}
                        </DropdownGrid>
                      </DropdownContainer>
                    )}
                  </AnimatePresence>
                </NavItem>
              ))}
            </DesktopNavWrapper>

            {/* Action Buttons */}
            <ActionButtons>
              <IconButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Search">
                <Search />
              </IconButton>

              <IconButton
                onClick={() => navigate('/wishlist')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Wishlist"
              >
                <Heart />
              </IconButton>

              <IconButton
                onClick={() => navigate('/my-cart')}
                style={{ position: 'relative' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Shopping Cart"
              >
                <ShoppingBag />
                {cartCount > 0 && (
                  <CartBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {cartCount}
                  </CartBadge>
                )}
              </IconButton>

              <IconButton
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="login"
              >
                <User />
              </IconButton>

              {/* Mobile Menu Toggle */}
              <MobileMenuToggle onClick={() => setIsMobileMenuOpen(true)} whileTap={{ scale: 0.9 }}>
                ☰
              </MobileMenuToggle>
            </ActionButtons>
          </NavContentWrapper>
        </NavList>
      </NavContainer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <motion.button
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'transparent',
                border: 'none',
                fontSize: '2rem',
                cursor: 'pointer',
                color: '#333',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>

            <MobileMenuList>
              {mobileMenuItems.map((item, index) => (
                <MobileMenuItem
                  key={item.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <MobileMenuLink href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </MobileMenuLink>
                </MobileMenuItem>
              ))}
            </MobileMenuList>
          </MobileMenu>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
            align-items: center;
            gap: 2.5rem;
          }
        }
      `}</style>
    </>
  )
}

export default FloatingNavbar

const DesktopNavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`
const NavContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`
