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
import StandardNavbar from '@/components/StandardNavbar'
import Banner from '@/components/common/Banner'
import { useCart } from '@/contexts/CartContext'

// Component
const Wishlist = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const { addToCart: addToCartContext, fetchCart, openCart } = useCart()

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

  const removeFromWishlist = async (productId) => {
    try {
      await api.post('/wishlist/remove', { productId })
      // Update local state
      setWishlistItems(wishlistItems.filter((item) => item._id !== productId))
      toast.success('Item removed from wishlist')
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      toast.error(error?.response?.data?.message || 'Failed to remove item')
    }
  }
  const addToCart = async (item) => {
    try {
      // First, remove from wishlist
      await api.post('/wishlist/remove', { productId: item._id })

      // Then, add to cart
      await addToCartContext(item._id, 1)

      // Update local wishlist state
      setWishlistItems(wishlistItems.filter((wishlistItem) => wishlistItem._id !== item._id))

      // Fetch updated cart and open cart sidebar
      await fetchCart()
      openCart()

      toast.success(`${item.name} moved to cart!`)
    } catch (error) {
      console.error('Error moving item to cart:', error)
      toast.error(error?.response?.data?.message || 'Failed to add item to cart')
    }
  }

  const handleShare = () => {
    alert('Share wishlist functionality')
  }
  const navigate = useNavigate()
  if (!isAuthenticated) {
    return (
      <PageTransition>
        <Banner />
        <StandardNavbar />
        <Container>
          <HeaderSection>
            <HeaderContainer>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 4rem',
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
      <StandardNavbar />
      <Container>
        {/* Header */}
        <HeaderSection>
          <HeaderContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1rem',
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
              <EmptyText>Save your favorite items here to purchase them later.</EmptyText>
              <EmptyButton onClick={() => (window.location.href = '/collections')}>
                EXPLORE COLLECTIONS <ChevronRight size={18} />
              </EmptyButton>
            </EmptyState>
          ) : (
            <WishlistList>
              {/* 1. Table Headers */}
              <TableHeaders>
                <div>Product</div>
                <div>Price</div>
                <div>Stock Status</div>
                <div>Action</div>
              </TableHeaders>

              {/* 2. Items List */}
              {wishlistItems.map((item, index) => (
                <WishlistRow
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Column 1: Product Details */}
                  <ProductColumn>
                    <ItemImage
                      src={item.images[0].url}
                      alt={item.name}
                      onClick={() => (window.location.href = `/products/${item.slug}`)}
                    />
                    <ProductDetail>
                      <ProductName
                        onClick={() => (window.location.href = `/products/${item.slug}`)}
                      >
                        {item.name}
                      </ProductName>
                      <ProductCategory>{item.category}</ProductCategory>
                      <RemoveText onClick={() => removeFromWishlist(item._id)}>
                        Remove
                      </RemoveText>{' '}
                    </ProductDetail>
                  </ProductColumn>

                  {/* Column 2: Price */}
                  <CenterColumn>
                    <PriceText>₹{item.price.toLocaleString()}</PriceText>
                  </CenterColumn>

                  {/* Column 3: Stock Status */}
                  <CenterColumn>
                    <StatusBadge inStock={item.inStock}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </StatusBadge>
                  </CenterColumn>

                  {/* Column 4: Action Button */}
                  <CenterColumn>
                    <AddToCartButton
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </AddToCartButton>
                  </CenterColumn>
                </WishlistRow>
              ))}
            </WishlistList>
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
  padding-bottom: 0;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 768px) {
  }
`

const HeaderContainer = styled.div`
  /* max-width: 1400px; */
  margin: 0 auto;
  /* padding: 0 2rem; */
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

  @media (max-width: 768px) {
    font-size: 0.85rem;
    gap: 0.3rem;
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

  @media (max-width: 768px) {
    display: none; // Hide breadcrumb on mobile
  }
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  padding: 0.5rem 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 0;
    padding: 0.5rem 1rem;
  }
`

const TitleSection = styled.div``

const PageTitle = styled.h1`
  font-size: clamp(1rem, 3vw, 2rem);
  font-weight: 100;
  padding: 0.5rem 0;
  color: white;
  letter-spacing: 0.05em;
  display: flex;
  justify-content: center;
  align-items: center;
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

  @media (max-width: 768px) {
    display: none;
  }
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

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
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
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    white-space: normal;
    margin: 0 0 0.4rem 0;
  }
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

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
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

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`

// Suggestions Section
const SuggestionsSection = styled.section`
  background: #f8f8f8;
  padding: 4rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`

const SuggestionsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
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
const WishlistList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const TableHeaders = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.2fr; /* 4 Columns */
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  color: black;

  div:not(:first-child) {
    text-align: center;
  }

  @media (max-width: 768px) {
    display: none; /* Hide headers on mobile */
  }
`

const WishlistRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.2fr;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
  background: white;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid #eee;
    align-items: flex-start;
  }
`

const ProductColumn = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`

const ItemImage = styled.img`
  width: 100px;
  height: 130px;
  object-fit: cover;
  cursor: pointer;
  background: #f8f8f8;

  @media (max-width: 768px) {
    width: 80px;
    height: 100px;
  }
`

const ProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

const RemoveText = styled.button`
  background: none;
  border: none;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 0.85rem;
  text-align: left;
  margin-top: 0.5rem;
  width: fit-content;

  &:hover {
    color: #e74c3c;
  }
`

const CenterColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: 100%;
  }
`

const PriceText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: black;
`

const StatusBadge = styled.span`
  color: ${(props) => (props.inStock ? '#27ae60' : '#e74c3c')};
  background: ${(props) => (props.inStock ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)')};
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
`

const AddToCartButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  width: 100%;
  max-width: 180px;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #333;
  }

  @media (max-width: 768px) {
    max-width: 100%; // Full width on mobile
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
  }
`
