import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Eye, ChevronLeft, ChevronRight, X, Minus, Plus } from 'lucide-react'
import api from '@/api/axios'
import toast from 'react-hot-toast'
import CartSidebar from '../CartSidebar'
import { useAuth } from '@/contexts/AuthContext'

// Main Products Section Component
const ProductsSection = ({ title, products }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [quantityModalProduct, setQuantityModalProduct] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState(null)

  const ref = useRef(null)

  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Filter products based on search term (by product code)
  const filteredProducts = products.filter((product) =>
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart')
      console.log('Fetched cart:', response.data.items)
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const handleAddToCart = async () => {
    if (!quantityModalProduct) return

    setIsAddingToCart(true)
    console.log('Adding to cart:', quantityModalProduct, 'Quantity:', selectedQuantity)
    try {
      await api.post('/cart/add', {
        productId: quantityModalProduct._id,
        quantity: selectedQuantity,
      })

      // Close quantity modal
      setQuantityModalProduct(null)
      setSelectedQuantity(1)

      // Fetch updated cart
      await fetchCart()

      // Open cart sidebar
      setIsCartOpen(true)

      // Optional: show success toast if you're using react-hot-toast
      toast.success('Added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Optional: show error toast
      toast.error('Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Section ref={ref}>
      <Container>
        <HeaderRow
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>{title}</SectionTitle>
          <SearchContainer>
            <SearchIcon>
              <Search size={18} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search by product code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </HeaderRow>

        {filteredProducts.length > 0 ? (
          <ProductsGrid
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isInView={isInView}
                onQuickView={() => setSelectedProduct(product)}
                setQuantityModalProduct={setQuantityModalProduct}
              />
            ))}
          </ProductsGrid>
        ) : (
          <NoResults
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            No products found matching "{searchTerm}"
          </NoResults>
        )}
      </Container>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <QuantityModal
        product={quantityModalProduct}
        onClose={() => {
          setQuantityModalProduct(null)
          setSelectedQuantity(1)
        }}
        onAddToCart={handleAddToCart}
        quantity={selectedQuantity}
        setQuantity={setSelectedQuantity}
        isLoading={isAddingToCart}
      />

      <CartSidebar
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        refreshCart={fetchCart}
      />
    </Section>
  )
}

const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString()}`
}

// Product Card Component
const ProductCard = ({ product, index, isInView, onQuickView, setQuantityModalProduct }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleCardClick = (e) => {
    // Only navigate if clicking on the card itself, not the buttons
    if (e.target === e.currentTarget || e.target.tagName === 'IMG') {
      window.location.href = product.slug
    }
  }

  return (
    <Card
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      // onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageContainer>
        <ProductImage src={product.images[0].url} alt={product.name} />
        <AnimatePresence>
          {isHovered && (
            <ButtonOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ActionButton
                onClick={(e) => {
                  e.stopPropagation()
                  setQuantityModalProduct(product)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Add to Cart"
              >
                <ShoppingCart size={20} />
              </ActionButton>
              <ActionButton
                onClick={(e) => {
                  e.stopPropagation()
                  onQuickView()
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Quick View"
              >
                <Eye size={20} />
              </ActionButton>
            </ButtonOverlay>
          )}
        </AnimatePresence>
      </ImageContainer>
      <ProductInfo>
        <ProductCode>{product.sku}</ProductCode>
        <ProductCategory>{formatCurrency(product.price)}</ProductCategory>
      </ProductInfo>
    </Card>
  )
}

// Quick View Modal Component
const QuickViewModal = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!product) return null

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <ModalBackdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <ModalContent
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>

          <ModalGrid>
            {/* Left Column - Images */}
            <ImageColumn>
              <ImageGallery>
                <AnimatePresence mode="wait">
                  <GalleryImage
                    key={currentImageIndex}
                    src={product.images[currentImageIndex].url}
                    alt={product.name}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                {product.images.length > 1 && (
                  <>
                    <NavButton
                      position="left"
                      onClick={handlePrevImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft size={24} />
                    </NavButton>
                    <NavButton
                      position="right"
                      onClick={handleNextImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight size={24} />
                    </NavButton>
                  </>
                )}
              </ImageGallery>
              <ImageIndicators>
                {product.images.map((_, idx) => (
                  <Indicator
                    key={idx}
                    active={idx === currentImageIndex}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </ImageIndicators>
            </ImageColumn>

            {/* Right Column - Details */}
            <DetailsColumn>
              <ProductName>{product.name}</ProductName>
              <PriceRow>
                <CurrentPrice>₹{product.price.toLocaleString()}</CurrentPrice>
              </PriceRow>

              <DetailSection>
                <DetailLabel>Category</DetailLabel>
                <DetailValue>{product.subCategory}</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Fabric</DetailLabel>
                <DetailValue>{product.fabric}</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Work</DetailLabel>
                <DetailValue>{product.work}</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Occasion</DetailLabel>
                <DetailValue>{product.occasion}</DetailValue>
              </DetailSection>

              <Description>{product.description}</Description>

              {/* <StockStatus inStock={product.inStock}>
                {product.inStock ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
              </StockStatus> */}

              <ButtonGroup>
                <PrimaryButton
                  onClick={() => (window.location.href = `/products/${product.slug}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  VIEW DETAILS
                </PrimaryButton>
                <SecondaryButton
                  // onClick={() => setQuantityModalProduct(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={18} />
                  ADD TO CART
                </SecondaryButton>
              </ButtonGroup>
            </DetailsColumn>
          </ModalGrid>
        </ModalContent>
      </ModalBackdrop>
    </AnimatePresence>
  )
}

const QuantityModal = ({ product, onClose, onAddToCart, quantity, setQuantity, isLoading }) => {
  if (!product) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  console.log('QuantityModal render with quantity:', quantity)
  console.log('Product in QuantityModal:', product)

  return (
    <AnimatePresence>
      <ModalBackdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <QuantityModalContent
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>

          <QuantityModalTitle>Select Quantity</QuantityModalTitle>
          <ProductNameSmall>{product.name}</ProductNameSmall>

          <QuantitySelector>
            <QuantityBtn
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus size={18} />
            </QuantityBtn>
            <QuantityValue>{quantity}</QuantityValue>
            <QuantityBtn onClick={() => setQuantity(quantity + 1)}>
              <Plus size={18} />
            </QuantityBtn>
          </QuantitySelector>

          <AddToCartBtn onClick={onAddToCart} disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </AddToCartBtn>
        </QuantityModalContent>
      </ModalBackdrop>
    </AnimatePresence>
  )
}

// Styled Components
const Section = styled.section`
  min-height: 100vh;
  background: white;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const HeaderRow = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3rem;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  margin: 0;
  color: black;
`

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: transparent;
  font-size: 0.95rem;
  color: #333;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: black;
  }

  &::placeholder {
    color: #aaa;
    font-weight: 300;
  }
`

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem 2rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const Card = styled(motion.div)`
  cursor: pointer;
  transition: all 0.4s ease;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 1.5rem;
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${Card}:hover & {
    transform: scale(1.08);
  }
`

const ButtonOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const ActionButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: black;
    color: white;
  }
`

const ProductInfo = styled.div`
  text-align: center;
`

const ProductCode = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin: 0 0 0.5rem 0;
  color: black;
  text-transform: uppercase;
`

const ProductCategory = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin: 0;
  color: #666;
  text-transform: capitalize;
`

const NoResults = styled(motion.div)`
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.1rem;
  font-weight: 300;
  color: #999;
  letter-spacing: 0.05em;
`

// Modal Styled Components
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
  }
`

const ModalContent = styled(motion.div)`
  background: white;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  /* border-radius: 8px; */

  @media (max-width: 768px) {
    /* max-height: none; */
    border-radius: 0;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: black;
    color: white;
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

// const ImageColumn = styled.div`
//   background: #f5f5f5;
//   /* padding: 3rem; */
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   position: relative;
//   height: 90dvh;

//   @media (max-width: 768px) {
//     padding: 2rem 1rem;
//   }
// `

const ImageColumn = styled.div`
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  height: 90dvh; // Keeps desktop fixed height

  @media (max-width: 768px) {
    height: auto; // FIX: Allows container to shrink to image size
    min-height: auto;
    background: white; // CLEANER UX: Seamless background on mobile
    padding: 0; // CLEANER UX: Edge-to-edge image looks more modern
    padding-bottom: 2rem; // Space for the indicators
  }
`

const ImageGallery = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background: white;
  /* border-radius: 4px; */
  overflow: hidden;
`

const GalleryImage = styled(motion.img)`
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
`

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  ${(props) => props.position}: 1rem;
  /* transform: translateY(-50%); */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: black;
    color: white;
  }

  @media (max-width: 768px) {
    width: 32px; // Smaller buttons on mobile
    height: 32px;
  }
`

// const ImageIndicators = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.5rem;
//   position: absolute;
//   bottom: 1rem;
//   left: 50%;
//   transform: translateX(-50%);
// `
const ImageIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    bottom: 0.5rem; // Moves dots closer to the image edge
  }
`

const Indicator = styled.button`
  width: ${(props) => (props.active ? '24px' : '8px')};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${(props) => (props.active ? 'black' : '#ccc')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.active ? 'black' : '#999')};
  }
`

const DetailsColumn = styled.div`
  padding: 0 3rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem;
    padding-bottom: 2rem;
  }
`

const ProductName = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  margin: 0;
  color: black;
  line-height: 1.3;
`

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const CurrentPrice = styled.span`
  font-size: 1.75rem;
  font-weight: 600;
  color: black;
`

const OriginalPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 400;
  color: #999;
  text-decoration: line-through;
`

const Discount = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #22c55e;
  padding: 0.25rem 0.75rem;
  background: #f0fdf4;
  border-radius: 4px;
`

const DetailSection = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e5e5;
`

const DetailLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
  min-width: 100px;
`

const DetailValue = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  color: black;
`

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin: 0;
`

const StockStatus = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => (props.inStock ? '#22c55e' : '#ef4444')};
  padding: 0.5rem 1rem;
  background: ${(props) => (props.inStock ? '#f0fdf4' : '#fef2f2')};
  border-radius: 4px;
  text-align: center;
`

const ButtonGroup = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 1rem;
  /* margin-top: auto; */
`

const PrimaryButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: black;
  color: white;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`

const SecondaryButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: white;
  color: black;
  border: 2px solid black;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
  }
`

// for quantity modal
const QuantityModalContent = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  position: relative;
  text-align: center;
`

const QuantityModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
  color: black;
`

const ProductNameSmall = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 2rem 0;
  font-weight: 300;
`

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const QuantityBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #e0e0e0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    border-color: black;
    background: black;
    color: white;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const QuantityValue = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  min-width: 40px;
`

const AddToCartBtn = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: black;
  color: white;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export default ProductsSection
