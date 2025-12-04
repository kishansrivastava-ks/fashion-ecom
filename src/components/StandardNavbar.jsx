import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import api from '@/api/axios'
import { useCart } from '@/contexts/CartContext'

// --- Styled Components ---

// Main Navbar Wrapper (Full width, white, thin)
const NavRoot = styled(motion.nav)`
  position: ${(props) => (props.sticky ? 'sticky' : 'relative')};
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  /* border-bottom: 1px solid #f0f0f0; */
  border-top: 1px solid #f0f0f0; /* Added for mobile view */
  height: 70px; /* Fixed thin height */
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    height: 60px;
    border-top: none;
  }
`

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }
`

// Brand
const Brand = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 200; /* Thin font as per design */
  letter-spacing: 0.15em;
  color: #fff;
  /* cursor: pointer; */
  text-transform: uppercase;
  z-index: 1001; /* Ensure above dropdowns */
  @media (max-width: 768px) {
    color: #000;
    font-size: 1rem;
    letter-spacing: 0.4rem;
    font-weight: 600;
  }
`

// Center Navigation
const CenterNav = styled.ul`
  display: flex;
  justify-content: center;
  gap: 3rem;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
`

const NavLink = styled.a`
  position: relative;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    color: #000;
  }

  /* Underline animation on hover */
  &::after {
    content: '';
    position: absolute;
    bottom: 22px; /* Adjust based on navbar height */
    left: 0;
    width: 0;
    height: 1px;
    background: black;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

// Right Icons
const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: flex-end;
`

const IconButton = styled(motion.button)`
  background: transparent;
  border: none;
  padding: 0.2rem;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    color: #000;
  }
`

const CartBadge = styled(motion.span)`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #1a1a1a;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 500;
`

// --- DROPDOWN STYLES (Ported from FloatingNavbar) ---

const DropdownWrapper = styled(motion.div)`
  position: absolute;
  top: 140px; /* Matches navbar height */
  left: 0;
  width: 100%;
  background: #fff;
  backdrop-filter: blur(20px);
  /* border: 2px solid red; */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.05); */
  /* box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); */
  padding: 2rem 0;
  z-index: 999;
  display: flex;
  justify-content: center;
`

const DropdownContent = styled.div`
  max-width: 1400px;
  width: 100%;
  /* padding: 0 2rem; */
`

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`

const CollectionCard = styled(motion.a)`
  position: relative;
  height: 350px; /* Slightly reduced for standard nav feel */
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%);
  transition: background 0.4s ease;

  ${CollectionCard}:hover & {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);
  }
`

const CollectionCardText = styled.span`
  position: relative;
  z-index: 2;
  color: white;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

// --- Mobile Styles ---

const MobileMenuToggle = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #333;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background: white;
  z-index: 998;
  padding: 2rem;
  overflow-y: auto;
  border-right: 1px solid #f0f0f0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
`

const MobileLink = styled.a`
  display: block;
  font-size: 1.5rem;
  font-weight: 200;
  color: #1a1a1a;
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  text-transform: uppercase;
`
const MobileBottomBar = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: grid;
    position: fixed;
    grid-template-columns: repeat(4, 1fr);
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    border-top: 1px solid #f0f0f0;
    z-index: 1002;
    align-items: center;
    justify-content: space-around; /* Centers the two icons */
    padding-bottom: env(safe-area-inset-bottom); /* iOS safe area */
  }
`

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`

// --- Component Definition ---

const StandardNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false)

  const navigate = useNavigate()
  const { openCart } = useCart()
  const { isAuthenticated, currentUser } = useAuth()

  // --- Logic: Cart Count (Identical to previous) ---
  useEffect(() => {
    let mounted = true
    const fetchCartCount = async () => {
      if (!isAuthenticated) {
        if (mounted) setCartCount(0)
        return
      }
      try {
        const res = await api.get('/cart')
        const count =
          res.data.totalItems ?? res.data.items?.reduce((s, it) => s + (it.quantity || 0), 0) ?? 0
        if (mounted) setCartCount(count)
      } catch (err) {
        if (mounted) setCartCount(0)
      }
    }
    fetchCartCount()
    const onCartUpdated = (evt) => {
      if (evt?.detail) {
        const d = evt.detail
        const count = d.totalItems ?? d.items?.reduce((s, it) => s + (it.quantity || 0), 0) ?? 0
        setCartCount(count)
      } else {
        fetchCartCount()
      }
    }
    window.addEventListener('cartUpdated', onCartUpdated)
    return () => {
      mounted = false
      window.removeEventListener('cartUpdated', onCartUpdated)
    }
  }, [isAuthenticated])

  // --- Data ---
  const navItems = [
    { name: 'Home', href: '/home', hasDropdown: false },
    { name: 'Collections', href: '#collections', hasDropdown: true },
    { name: 'About Us', href: '/about', hasDropdown: false },
    { name: 'Contact', href: '/contact', hasDropdown: false },
  ]

  const collectionItems = [
    { name: 'Ethnic', href: '/collections/ethnic', image: '/images/ethnic/ethnic42.jpg' },
    { name: 'Western', href: '/collections/western', image: '/images/ethnic/ethnic61.jpg' },
    { name: 'Bridal', href: '/collections/bridal', image: '/images/ethnic/ethnic34.jpg' },
    { name: 'Custom', href: '/collections/custom', image: '/images/ethnic/ethnic2.jpg' },
  ]

  return (
    <>
      <NavRoot sticky={true}>
        <NavContainer>
          {/* 1. Left: Hamburger (Visible on Mobile Only) */}
          <MobileMenuToggle onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuToggle>

          {/* 2. Center/Left: Brand */}
          <Brand>SHAASHEE</Brand>

          {/* 3. Center: Desktop Nav (Hidden on Mobile) */}
          <CenterNav>
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                onMouseEnter={() => item.hasDropdown && setShowDropdown(true)}
                onMouseLeave={() => item.hasDropdown && setShowDropdown(false)}
              >
                <NavLink href={item.href} onClick={() => !item.hasDropdown && navigate(item.href)}>
                  {item.name}
                </NavLink>
              </NavItem>
            ))}
          </CenterNav>

          {/* 4. Right: Icons */}
          <IconGroup>
            {/* Search: Hidden on mobile (moved to bottom bar) */}
            <div
              className="hidden md:block"
              style={{ display: window.innerWidth <= 768 ? 'none' : 'block' }}
            >
              <IconButton whileHover={{ scale: 1.1 }} title="Search">
                <Search size={20} strokeWidth={1.5} />
              </IconButton>
            </div>

            {/* Wishlist: Keep as is (or hide if not needed on mobile, code below keeps it) */}
            <IconButton
              onClick={() => navigate('/wishlist')}
              whileHover={{ scale: 1.1 }}
              title="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
            </IconButton>

            {/* Cart: Always visible */}
            <IconButton onClick={openCart} whileHover={{ scale: 1.1 }} title="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <CartBadge initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  {cartCount}
                </CartBadge>
              )}
            </IconButton>

            {/* User: Top Right on Mobile as requested */}
            <IconButton
              onClick={() =>
                navigate(
                  `${!isAuthenticated ? '/login' : currentUser?.role === 'admin' ? '/admin' : '/dashboard'}`
                )
              }
              whileHover={{ scale: 1.1 }}
              title="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </IconButton>
          </IconGroup>
        </NavContainer>
      </NavRoot>

      {/* 4. The Mega Menu Dropdown (Outside NavContainer to span full width, but inside MouseLeave area logic conceptually) */}
      <AnimatePresence>
        {showDropdown && (
          <DropdownWrapper
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <DropdownContent>
              <DropdownGrid>
                {collectionItems.map((collection, idx) => (
                  <CollectionCard
                    key={collection.name}
                    href={collection.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <CollectionCardImage src={collection.image} alt={collection.name} />
                    <CollectionCardOverlay />
                    <CollectionCardText>{collection.name}</CollectionCardText>
                  </CollectionCard>
                ))}
              </DropdownGrid>
            </DropdownContent>
          </DropdownWrapper>
        )}
      </AnimatePresence>

      {/* 5. Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0, x: '-100%' }} // Changed to slide from LEFT
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }} // Changed to slide out to LEFT
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  // Logic for Collections with (+) button
                  <>
                    <AccordionHeader>
                      <MobileLink
                        href={item.href}
                        style={{ borderBottom: 'none', flex: 1 }}
                        onClick={(e) => {
                          e.preventDefault()
                          setMobileCollectionsOpen(!mobileCollectionsOpen)
                        }}
                      >
                        {item.name}
                      </MobileLink>
                      <button
                        onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                        style={{ background: 'none', border: 'none', padding: '1rem' }}
                      >
                        {/* Rotate icon based on state */}
                        <motion.div animate={{ rotate: mobileCollectionsOpen ? 45 : 0 }}>
                          <span style={{ fontSize: '1.5rem', fontWeight: 200 }}>+</span>
                        </motion.div>
                      </button>
                    </AccordionHeader>

                    <AnimatePresence>
                      {mobileCollectionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>
                            {collectionItems.map((sub) => (
                              <MobileLink
                                key={sub.name}
                                href={sub.href}
                                style={{
                                  fontSize: '1rem',
                                  borderBottom: 'none',
                                  padding: '0.5rem 0',
                                  color: '#666',
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                - {sub.name}
                              </MobileLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  // Standard Links
                  <MobileLink href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </MobileLink>
                )}
              </div>
            ))}
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
      <MobileBottomBar>
        <IconButton onClick={() => navigate('/wishlist')} title="Wishlist">
          <Heart size={24} strokeWidth={1.5} />
        </IconButton>
        <IconButton
          onClick={() => {
            /* Toggle Search Logic */
          }}
          title="Search"
        >
          <Search size={24} strokeWidth={1.5} />
        </IconButton>

        <IconButton
          onClick={() =>
            navigate(
              `${!isAuthenticated ? '/login' : currentUser?.role === 'admin' ? '/admin' : '/dashboard'}`
            )
          }
          title="Account"
        >
          <User size={24} strokeWidth={1.5} />
        </IconButton>
      </MobileBottomBar>
    </>
  )
}

export default StandardNavbar
