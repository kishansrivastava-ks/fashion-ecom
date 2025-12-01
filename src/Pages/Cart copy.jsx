import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Heart,
  ArrowLeft,
  Truck,
  Shield,
  Tag,
  ChevronRight,
  Gift,
  AlertCircle,
} from 'lucide-react'
import styled from 'styled-components'
import { useAuth } from '@/contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

// Component
const Cart = () => {
  const { isAuthenticated } = useAuth()

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Elegant Silk Saree',
      category: 'Ethnic Wear',
      size: 'Free Size',
      color: 'Black',
      quantity: 1,
      price: 8999,
      originalPrice: 12999,
      image: '/images/saree2.jpg',
    },
    {
      id: 2,
      name: 'Designer Lehenga Set',
      category: 'Ethnic Wear',
      size: 'M',
      color: 'Maroon',
      quantity: 1,
      price: 15999,
      originalPrice: 22999,
      image: '/images/ethnic.png',
    },
  ])

  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(10, item.quantity + change))
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const moveToWishlist = (item) => {
    console.log('Move to wishlist:', item)
    removeItem(item.id)
  }

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([])
    }
  }

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setAppliedPromo({ code: 'WELCOME10', discount: 10 })
      setPromoCode('')
    } else {
      alert('Invalid promo code')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const savings = originalTotal - subtotal
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const shipping = subtotal >= 2999 ? 0 : 199
  const total = subtotal - discount + shipping

  const shippingProgress = Math.min((subtotal / 2999) * 100, 100)
  const remainingForFreeShipping = Math.max(0, 2999 - subtotal)

  const navigate = useNavigate()
  return (
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
              Continue Shopping
            </BackButton>

            <Breadcrumb>
              <a href="/">Home</a> / Shopping Cart
            </Breadcrumb>
          </div>

          <PageTitle>SHOPPING CART</PageTitle>
        </HeaderContainer>
      </HeaderSection>

      {/* Main Content */}
      <MainContent>
        {!isAuthenticated ? (
          <FallbackSection>
            <div>Login to view your cart</div>
            <EmptyButton onClick={() => navigate('/login')}>Login</EmptyButton>
          </FallbackSection>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <EmptyCart>
                <EmptyIcon>
                  <ShoppingCart size={48} />
                </EmptyIcon>
                <EmptyTitle>Your Cart is Empty</EmptyTitle>
                <EmptyText>Looks like you haven't added anything to your cart yet.</EmptyText>
                <EmptyButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.href = '/collections')}
                >
                  START SHOPPING
                  <ChevronRight size={18} />
                </EmptyButton>
              </EmptyCart>
            ) : (
              <>
                {/* Cart Items */}
                <CartItemsSection>
                  <CartHeader>
                    <ItemCount>
                      {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </ItemCount>
                    <ClearCart onClick={clearCart}>Clear Cart</ClearCart>
                  </CartHeader>

                  <CartItemsList>
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ItemImage
                          image={item.image}
                          onClick={() => (window.location.href = `/product/${item.id}`)}
                        />

                        <ItemDetails>
                          <ItemHeader>
                            <ItemInfo>
                              <ItemName
                                onClick={() => (window.location.href = `/product/${item.id}`)}
                              >
                                {item.name}
                              </ItemName>
                              <ItemCategory>{item.category}</ItemCategory>
                            </ItemInfo>
                            <RemoveButton
                              onClick={() => removeItem(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X size={20} />
                            </RemoveButton>
                          </ItemHeader>

                          <ItemOptions>
                            <Option>
                              <strong>Size:</strong> {item.size}
                            </Option>
                            <Option>
                              <strong>Color:</strong> {item.color}
                            </Option>
                          </ItemOptions>

                          <ItemActions>
                            <QuantitySelector>
                              <QuantityButton
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </QuantityButton>
                              <QuantityDisplay>{item.quantity}</QuantityDisplay>
                              <QuantityButton
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={item.quantity >= 10}
                              >
                                <Plus size={16} />
                              </QuantityButton>
                            </QuantitySelector>

                            <WishlistButton
                              onClick={() => moveToWishlist(item)}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Heart size={16} />
                              Move to Wishlist
                            </WishlistButton>
                          </ItemActions>
                        </ItemDetails>

                        <ItemPricing>
                          <ItemPrice>₹{(item.price * item.quantity).toLocaleString()}</ItemPrice>
                          <OriginalPrice>
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </OriginalPrice>
                          <Savings>
                            Save ₹
                            {((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                          </Savings>
                        </ItemPricing>
                      </CartItem>
                    ))}
                  </CartItemsList>
                </CartItemsSection>

                {/* Order Summary */}
                <SummarySection>
                  <SummaryCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SummaryTitle>Order Summary</SummaryTitle>

                    {/* Free Shipping Progress */}
                    {remainingForFreeShipping > 0 && (
                      <FreeShippingBar>
                        <Truck size={20} />
                        <div style={{ flex: 1 }}>
                          <div>
                            Add ₹{remainingForFreeShipping.toLocaleString()} more for FREE shipping!
                          </div>
                          <ProgressBar>
                            <Progress percent={shippingProgress} />
                          </ProgressBar>
                        </div>
                      </FreeShippingBar>
                    )}

                    {/* Promo Code */}
                    <PromoSection>
                      {!appliedPromo ? (
                        <PromoInput>
                          <Input
                            type="text"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                          />
                          <ApplyButton
                            onClick={applyPromo}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Apply
                          </ApplyButton>
                        </PromoInput>
                      ) : (
                        <PromoApplied>
                          <span>
                            <Tag size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            {appliedPromo.code} applied ({appliedPromo.discount}% off)
                          </span>
                          <RemovePromo onClick={() => setAppliedPromo(null)}>
                            <X size={16} />
                          </RemovePromo>
                        </PromoApplied>
                      )}
                    </PromoSection>

                    {/* Price Breakdown */}
                    <SummaryDetails>
                      <SummaryRow>
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </SummaryRow>
                      {savings > 0 && (
                        <SummaryRow highlight>
                          <span>Discount</span>
                          <span style={{ color: '#27ae60' }}>-₹{savings.toLocaleString()}</span>
                        </SummaryRow>
                      )}
                      {appliedPromo && (
                        <SummaryRow highlight>
                          <span>Promo Code ({appliedPromo.code})</span>
                          <span style={{ color: '#27ae60' }}>-₹{discount.toLocaleString()}</span>
                        </SummaryRow>
                      )}
                      <SummaryRow>
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                      </SummaryRow>
                    </SummaryDetails>

                    <TotalRow>
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </TotalRow>

                    <CheckoutButton
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => (window.location.href = '/checkout')}
                    >
                      PROCEED TO CHECKOUT
                      <ChevronRight size={20} />
                    </CheckoutButton>

                    <ContinueShopping onClick={() => (window.location.href = '/collections')}>
                      Continue Shopping
                    </ContinueShopping>

                    {/* Features */}
                    <Features>
                      <Feature>
                        <FeatureIcon>
                          <Shield size={20} />
                        </FeatureIcon>
                        <span>Secure Payment</span>
                      </Feature>
                      <Feature>
                        <FeatureIcon>
                          <Truck size={20} />
                        </FeatureIcon>
                        <span>Free Shipping</span>
                      </Feature>
                      <Feature>
                        <FeatureIcon>
                          <Gift size={20} />
                        </FeatureIcon>
                        <span>Gift Wrap</span>
                      </Feature>
                    </Features>
                  </SummaryCard>
                </SummarySection>
              </>
            )}
          </>
        )}
      </MainContent>
    </Container>
  )
}

export default Cart

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
  margin-bottom: 1.5rem;

  a {
    color: #999;
    text-decoration: none;

    &:hover {
      color: black;
    }
  }
`

const PageTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 100;
  margin: 0;
  color: black;
  letter-spacing: 0.05em;
`

// Main Content
const MainContent = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

// Cart Items Section
const CartItemsSection = styled.div``

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
`

const ItemCount = styled.h2`
  font-size: 1.3rem;
  font-weight: 300;
  margin: 0;
  color: black;
`

const ClearCart = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #c0392b;
  }
`

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 4px;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr;
    gap: 1rem;
  }
`

const ItemImage = styled.div`
  width: 140px;
  height: 180px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100px;
    height: 130px;
  }
`

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const ItemInfo = styled.div`
  flex: 1;
`

const ItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0 0 0.3rem 0;
  color: black;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const ItemCategory = styled.div`
  font-size: 0.85rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const RemoveButton = styled(motion.button)`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.3rem;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`

const ItemOptions = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.3rem;
  }
`

const Option = styled.div`
  display: flex;
  gap: 0.3rem;

  strong {
    color: #333;
  }
`

const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
  }
`

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  background: white;
  width: fit-content;
`

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f8f8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const QuantityDisplay = styled.div`
  width: 50px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`

const WishlistButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`

const ItemPricing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const ItemPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  color: black;
`

const OriginalPrice = styled.div`
  font-size: 0.95rem;
  color: #999;
  text-decoration: line-through;
`

const Savings = styled.div`
  font-size: 0.85rem;
  color: #27ae60;
  font-weight: 500;
`

// Summary Section
const SummarySection = styled.div`
  @media (max-width: 1024px) {
    order: -1;
  }
`

const SummaryCard = styled(motion.div)`
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 4px;
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    position: static;
  }
`

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0 0 1.5rem 0;
  color: black;
`

const PromoSection = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`

const PromoInput = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const Input = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  background: white;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: black;
  }
`

const ApplyButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: black;
  color: white;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }
`

const PromoApplied = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #155724;
`

const RemovePromo = styled.button`
  background: none;
  border: none;
  color: #155724;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #0f3d19;
  }
`

const SummaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: ${(props) => (props.highlight ? 'black' : '#666')};
  font-weight: ${(props) => (props.highlight ? '500' : '300')};
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 500;
  color: black;
  margin-bottom: 1.5rem;
`

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  background: black;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background: #333;
  }
`

const ContinueShopping = styled.button`
  width: 100%;
  padding: 1rem;
  background: white;
  color: black;
  border: 1px solid #e0e0e0;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f8f8;
  }
`

const FreeShippingBar = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.9rem;
  color: #856404;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
`

const Progress = styled.div`
  height: 100%;
  background: #27ae60;
  width: ${(props) => props.percent}%;
  transition: width 0.3s ease;
`

// Features
const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
`

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
`

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`

// Empty Cart
const EmptyCart = styled.div`
  grid-column: 1 / -1;
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

const FallbackSection = styled.div`
  height: 70dvh;
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 92vw;
`
