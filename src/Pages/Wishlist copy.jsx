import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Heart,
  ShoppingCart,
  X,
  ArrowLeft,
  Share2,
  Star,
  Trash2,
  Eye,
  ChevronRight,
} from 'lucide-react'
import styled from 'styled-components'
import PageTransition from '@/utils/PageTransition'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '@/api/axios'
import toast from 'react-hot-toast'

// Component
const Wishlist = () => {
  const { isAuthenticated, currentUser } = useAuth()

  const [wishlistItems, setWishlistItems] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchWishlist = async () => {
      setLoading(true)
      try {
        const res = await api.get('/wishlist')
        if (mounted) {
          setWishlistItems(res.data.products || [])
        }
      } catch (err) {
        console.error('Failed to fetch wishlist', err)
        toast.error(err?.response?.data?.message || 'Failed to load wishlist')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchWishlist()
    return () => {
      mounted = false
    }
  }, [])

  const suggestions = [
    {
      id: 101,
      name: 'Embroidered Kurta Set',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    },
    {
      id: 102,
      name: 'Floral Print Dress',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop',
    },
    {
      id: 103,
      name: 'Velvet Jacket',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    },
    {
      id: 104,
      name: 'Traditional Sharara',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop',
    },
  ]

  const suggestionsRef = useRef(null)
  const suggestionsInView = useInView(suggestionsRef, { once: true, margin: '-100px' })

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const addToCart = (item) => {
    console.log('Added to cart:', item)
    alert(`${item.name} added to cart!`)
  }

  const handleShare = () => {
    alert('Share wishlist functionality')
  }
  const navigate = useNavigate()
  if (!isAuthenticated) {
    return (
      <PageTransition>
        <Container>
          <HeaderSection>
            <HeaderContainer>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <BackButton onClick={() => window.history.back()} whileHover={{ x: -5 }}>
                  <ArrowLeft size={18} />
                  Back
                </BackButton>

                <Breadcrumb>
                  <a href="/">Home</a> / Wishlist
                </Breadcrumb>
              </div>
              <HeaderContent>
                <TitleSection>
                  <PageTitle>MY WISHLIST</PageTitle>
                </TitleSection>
              </HeaderContent>
            </HeaderContainer>
          </HeaderSection>
          <FallbackSection>
            Login to view your wishlist
            <ActionButton onClick={() => navigate('/login')}>Login</ActionButton>
          </FallbackSection>
        </Container>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Container>
        {/* Header */}
        <HeaderSection>
          <HeaderContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <BackButton onClick={() => window.history.back()} whileHover={{ x: -5 }}>
                <ArrowLeft size={18} />
                Back
              </BackButton>

              <Breadcrumb>
                <a href="/">Home</a> / Wishlist
              </Breadcrumb>
            </div>
            <HeaderContent>
              <TitleSection>
                <PageTitle>MY WISHLIST</PageTitle>
                <ItemCount>
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                </ItemCount>
              </TitleSection>

              {wishlistItems.length > 0 && (
                <HeaderActions>
                  <ActionButton
                    onClick={handleShare}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 size={18} />
                    Share
                  </ActionButton>
                </HeaderActions>
              )}
            </HeaderContent>
          </HeaderContainer>
        </HeaderSection>

        {/* Wishlist Items */}
        <WishlistSection>
          {wishlistItems.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <Heart size={48} />
              </EmptyIcon>
              <EmptyTitle>Your Wishlist is Empty</EmptyTitle>
              <EmptyText>
                Save your favorite items here to purchase them later or share with friends.
              </EmptyText>
              <EmptyButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = '/collections')}
              >
                EXPLORE COLLECTIONS
                <ChevronRight size={18} />
              </EmptyButton>
            </EmptyState>
          ) : (
            <WishlistGrid>
              {wishlistItems.map((item, index) => (
                <WishlistCard
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <ImageContainer>
                    <ProductImage src={item.images[0].url} alt={item.name} />

                    <RemoveButton
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFromWishlist(item.id)
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={18} />
                    </RemoveButton>

                    <StockBadge inStock={item.inStock}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </StockBadge>

                    <QuickActions>
                      <QuickButton
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(item)
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </QuickButton>
                      <QuickButton
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/product`
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={16} />
                        View
                      </QuickButton>
                    </QuickActions>
                  </ImageContainer>

                  <ProductInfo>
                    <ProductCategory>{item.category}</ProductCategory>
                    <ProductName>{item.name}</ProductName>
                    <PriceContainer>
                      <CurrentPrice>₹{item.price.toLocaleString()}</CurrentPrice>
                    </PriceContainer>
                  </ProductInfo>
                </WishlistCard>
              ))}
            </WishlistGrid>
          )}
        </WishlistSection>

        {/* Suggestions Section */}
        <SuggestionsSection ref={suggestionsRef}>
          <SuggestionsContainer>
            <SectionHeader>
              <SectionTitle>You May Also Like</SectionTitle>
              <ViewAllLink href="/collections">
                View All
                <ChevronRight size={16} />
              </ViewAllLink>
            </SectionHeader>

            <SuggestionsGrid>
              {suggestions.map((item, index) => (
                <SuggestionCard
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={suggestionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => (window.location.href = `/product/${item.id}`)}
                >
                  <SuggestionImage image={item.image}>
                    <WishlistIcon
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('Add to wishlist:', item.id)
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart size={16} />
                    </WishlistIcon>
                  </SuggestionImage>
                  <SuggestionInfo>
                    <SuggestionName>{item.name}</SuggestionName>
                    <SuggestionPrice>₹{item.price.toLocaleString()}</SuggestionPrice>
                  </SuggestionInfo>
                </SuggestionCard>
              ))}
            </SuggestionsGrid>
          </SuggestionsContainer>
        </SuggestionsSection>
      </Container>
    </PageTransition>
  )
}

export default Wishlist

// Main Container
const Container = styled.div`
  background: white;
  min-height: 100vh;
`

// Header Section
const HeaderSection = styled.section`
  background: #f8f8f8;
  padding: 2rem 0;
  border-bottom: 1px solid #e0e0e0;
`

const HeaderContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  font-size: 0.95rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

const Breadcrumb = styled.div`
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 1rem;

  a {
    color: #999;
    text-decoration: none;

    &:hover {
      color: black;
    }
  }
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const TitleSection = styled.div``

const PageTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 100;
  margin: 0 0 0.5rem 0;
  color: black;
  letter-spacing: 0.05em;
`

const ItemCount = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  font-weight: 300;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border: 1px solid ${(props) => (props.primary ? 'black' : '#e0e0e0')};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.primary ? '#333' : '#f8f8f8')};
  }
`

// Wishlist Section
const WishlistSection = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
`

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const WishlistCard = styled(motion.div)`
  background: white;
  border: 1px solid #e0e0e0;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: #f8f8f8;

  @media (max-width: 768px) {
    height: 280px;
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${WishlistCard}:hover & {
    transform: scale(1.05);
  }
`

const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  &:hover {
    background: #e74c3c;
    color: white;
  }
`

const StockBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${(props) => (props.inStock ? '#27ae60' : '#e74c3c')};
  color: white;
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`

const QuickActions = styled(motion.div)`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${WishlistCard}:hover & {
    opacity: 1;
  }
`

const QuickButton = styled(motion.button)`
  background: black;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.3s ease;
  justify-content: center;

  &:hover {
    background: #333;
  }
`

const ProductInfo = styled.div`
  padding: 1.5rem;
`

const ProductCategory = styled.div`
  font-size: 0.85rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0 0 0.8rem 0;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`

const CurrentPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  color: black;
`

const OriginalPrice = styled.div`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #666;
`

const Stars = styled.div`
  display: flex;
  gap: 0.1rem;
  color: #ffa500;
`

// Empty State
const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 2rem;
`

const EmptyIcon = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 2rem auto;
  background: #f8f8f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
`

const EmptyTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  color: black;
`

const EmptyText = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 0 2rem 0;
  font-weight: 300;
`

const EmptyButton = styled(motion.button)`
  background: black;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }
`

// Suggestions Section
const SuggestionsSection = styled.section`
  background: #f8f8f8;
  padding: 4rem 0;
`

const SuggestionsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 100;
  margin: 0;
  color: black;
`

const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #666;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

const SuggestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const SuggestionCard = styled(motion.div)`
  background: white;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`

const SuggestionImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 250px;
  }
`

const WishlistIcon = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #f0f0f0;
  }
`

const SuggestionInfo = styled.div`
  padding: 1.2rem;
`

const SuggestionName = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  color: black;
`

const SuggestionPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: black;
`
const FallbackSection = styled.div`
  height: 70dvh;
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`
