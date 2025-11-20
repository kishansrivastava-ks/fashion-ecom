import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import productsData from '../data/data.json'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Ruler, Truck, RotateCcw, Shield, X, Share2 } from 'lucide-react'
import styled from 'styled-components'
import PageTransition from '@/utils/PageTransition'

// Component
const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const [showZoomPreview, setShowZoomPreview] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const [showSizeChart, setShowSizeChart] = useState(false)
  const [showShareNotification, setShowShareNotification] = useState(false)

  // Fetch product data based on slug
  useEffect(() => {
    const foundProduct = productsData.products.find((p) => p.slug === slug)

    if (foundProduct) {
      setProduct(foundProduct)
      // Set default selections
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0])
      }
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        const firstAvailableColor = foundProduct.colors.find((c) => c.inStock)
        setSelectedColor(
          firstAvailableColor ? firstAvailableColor.value : foundProduct.colors[0].value
        )
      }
      setLoading(false)
    } else {
      // Product not found, redirect to home or show 404
      setLoading(false)
      // Optionally: navigate('/404') or navigate('/')
    }
  }, [slug])

  // Add loading state
  if (loading) {
    return (
      <PageTransition>
        <Container>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2>Loading...</h2>
          </div>
        </Container>
      </PageTransition>
    )
  }

  // Product not found
  if (!product) {
    return (
      <PageTransition>
        <Container>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')}>Go to Home</button>
          </div>
        </Container>
      </PageTransition>
    )
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleMouseMove = (e) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setShowZoomPreview(true)
  }

  const handleMouseLeave = () => {
    setShowZoomPreview(false)
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowShareNotification(true)
      setTimeout(() => setShowShareNotification(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <PageTransition>
      <Container>
        <ProductSection>
          {/* Image Gallery */}
          <GalleryContainer>
            <ThumbnailList>
              {product.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  image={image}
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </ThumbnailList>

            <MainImageContainer
              onMouseEnter={window.innerWidth > 1024 ? handleMouseEnter : undefined}
              onMouseLeave={window.innerWidth > 1024 ? handleMouseLeave : undefined}
              onMouseMove={window.innerWidth > 1024 ? handleMouseMove : undefined}
            >
              {product.badges && product.badges.length > 0 && (
                <ImageBadge>
                  {product.badges[0].toUpperCase() === 'NEW'
                    ? 'NEW ARRIVAL'
                    : product.badges[0].toUpperCase() === 'BESTSELLER'
                      ? 'BESTSELLER'
                      : product.badges[0].toUpperCase()}
                </ImageBadge>
              )}
              <MainImage
                ref={imageRef}
                src={product.images[selectedImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={selectedImage}
              />

              {/* Zoom Box Indicator */}
              <AnimatePresence>
                {showZoomPreview && (
                  <ZoomBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      left: `${zoomPosition.x}%`,
                      top: `${zoomPosition.y}%`,
                    }}
                  />
                )}
              </AnimatePresence>
            </MainImageContainer>

            {/* Zoom Preview Panel */}
            <AnimatePresence>
              {showZoomPreview && (
                <ZoomPreviewPanel
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ZoomPreviewImage
                    src={product.images[selectedImage]}
                    alt={product.name}
                    style={{
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transform: `scale(2.5) translate(${50 - zoomPosition.x}%, ${50 - zoomPosition.y}%)`,
                    }}
                  />
                </ZoomPreviewPanel>
              )}
            </AnimatePresence>
          </GalleryContainer>

          {/* Product Info */}
          <ProductInfo>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Breadcrumb>
                <a href="/">Home</a> /{' '}
                <a href={`/collections/${product.category}`}>
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </a>{' '}
                /{' '}
                <a href={`/${product.category}/${product.subCategory}`}>
                  {product.subCategory.charAt(0).toUpperCase() + product.subCategory.slice(1)}
                </a>
              </Breadcrumb>

              <ShareButtonContainer>
                <ShareButton
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 size={18} />
                  Share
                </ShareButton>
                <AnimatePresence>
                  {showShareNotification && (
                    <ShareNotification
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Link copied successfully!
                    </ShareNotification>
                  )}
                </AnimatePresence>
              </ShareButtonContainer>
            </div>

            <ProductTitle>{product.name}</ProductTitle>

            <PriceContainer>
              <CurrentPrice>₹{product.price.toLocaleString()}</CurrentPrice>
            </PriceContainer>

            <Description>{product.description}</Description>

            {/* Size Selection */}
            <OptionGroup>
              <SizeHeader>
                <OptionLabel>Select Size</OptionLabel>
                <SizeChartLink onClick={() => setShowSizeChart(true)}>
                  View Size Chart
                </SizeChartLink>
              </SizeHeader>
              <SizeOptions>
                {product.sizes.map((size) => (
                  <SizeButton
                    key={size}
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </SizeButton>
                ))}
              </SizeOptions>
            </OptionGroup>

            {/* Quantity */}
            <QuantityContainer>
              <OptionLabel>Quantity</OptionLabel>
              <QuantitySelector>
                <QuantityButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  −
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                  +
                </QuantityButton>
              </QuantitySelector>
            </QuantityContainer>

            {/* Action Buttons */}
            <ActionButtons>
              <AddToCartButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <ShoppingCart size={20} />
                ADD TO CART
              </AddToCartButton>

              <BuyNowButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                BUY NOW
              </BuyNowButton>

              <WishlistButton
                active={isWishlisted}
                onClick={() => setIsWishlisted(!isWishlisted)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </WishlistButton>
            </ActionButtons>

            {/* Features */}
            <Features>
              <Feature>
                <FeatureIcon>
                  <Truck size={20} />
                </FeatureIcon>
                <span>Free Shipping on orders above ₹2999</span>
              </Feature>
              <Feature>
                <FeatureIcon>
                  <RotateCcw size={20} />
                </FeatureIcon>
                <span>15 Days Easy Returns</span>
              </Feature>
              <Feature>
                <FeatureIcon>
                  <Shield size={20} />
                </FeatureIcon>
                <span>100% Authentic Products</span>
              </Feature>
              <Feature>
                <FeatureIcon>
                  <Ruler size={20} />
                </FeatureIcon>
                <span>Custom Alterations Available</span>
              </Feature>
            </Features>
          </ProductInfo>
        </ProductSection>

        <AnimatePresence>
          {showSizeChart && (
            <SizeChartModal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeChart(false)}
            >
              <SizeChartContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <SizeChartCloseButton onClick={() => setShowSizeChart(false)}>
                  <X size={24} />
                </SizeChartCloseButton>
                <SizeChartImage src="/images/size-chart.webp" alt="Size Chart" />
              </SizeChartContent>
            </SizeChartModal>
          )}
        </AnimatePresence>
      </Container>
    </PageTransition>
  )
}

export default ProductDetail

// Main Container
const Container = styled.div`
  background: white;
  min-height: 100vh;
  position: relative;
`

// Product Section
const ProductSection = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  /* border: 2px solid red; */

  @media (max-width: 1024px) {
    gap: 3rem;
    padding: 2rem 1.5rem;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 0.5rem;
  }
`

// Image Gallery Styles
const GalleryContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 968px) {
    flex-direction: column-reverse;
  }
`

const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 968px) {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
    /* gap: 0.5rem; */

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 2px;
    }
  }
`

const Thumbnail = styled(motion.div)`
  width: 80px;
  height: 100px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? 'black' : '#e0e0e0')};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: black;
  }

  @media (max-width: 968px) {
    min-width: 80px;
  }
`

const MainImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  /* background: #f8f8f8; */
  cursor: crosshair;
  height: min-content;

  @media (max-width: 1024px) {
    cursor: default;
  }
`

const MainImage = styled(motion.img)`
  width: 100%;
  height: auto;
  display: block;
  /* object-fit: cover; */
  min-height: 600px;
  height: 90vh;
  object-fit: contain;

  @media (max-width: 1024px) {
    height: 70vh;
    min-height: 500px;
  }

  @media (max-width: 968px) {
    min-height: 400px;
    height: 60vh;
  }

  @media (max-width: 640px) {
    min-height: 300px;
    height: 50vh;
  }
`

const ImageBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: black;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
`

// Product Info Styles
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  /* border: 2px solid blue; */

  @media (max-width: 640px) {
    margin: 0 1rem;
  }
`

const Breadcrumb = styled.div`
  font-size: 0.9rem;
  color: #999;

  a {
    color: #999;
    text-decoration: none;

    &:hover {
      color: black;
    }
  }
`

const ProductTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 300;
  margin: 0;
  color: black;
  letter-spacing: 0.02em;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CurrentPrice = styled.div`
  font-size: 2rem;
  font-weight: 400;
  color: black;
`

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #666;
  margin: 0;
  font-weight: 300;
`

// Size and Color Selection
const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const OptionLabel = styled.label`
  font-size: 0.95rem;
  font-weight: 400;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const SizeOptions = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`

const SizeButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border: 1px solid ${(props) => (props.selected ? 'black' : '#e0e0e0')};
  background: ${(props) => (props.selected ? 'black' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

// Quantity Selector
const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  width: fit-content;
`

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 1.2rem;
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
  width: 60px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
`

// Action Buttons
const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const AddToCartButton = styled(motion.button)`
  flex: 1;
  background: black;
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }
`

const BuyNowButton = styled(motion.button)`
  flex: 1;
  background: white;
  color: black;
  border: 2px solid black;
  padding: 1.2rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
  }
`

const WishlistButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  background: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
  }

  ${(props) =>
    props.active &&
    `
    border-color: #e74c3c;
    color: #e74c3c;
  `}
`

// Features
const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 4px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`

const FeatureIcon = styled.div`
  color: black;
`

const ZoomBox = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.3);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 10;

  @media (max-width: 1024px) {
    display: none;
  }
`

const ZoomPreviewPanel = styled(motion.div)`
  position: absolute;
  right: 250px;
  top: 10%;
  width: 450px;
  height: 450px;
  background: white;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 20;

  @media (max-width: 1400px) {
    display: none;
  }
`

const ZoomPreviewImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`

const SizeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const SizeChartLink = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.85rem;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

const SizeChartModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0;
`

const SizeChartContent = styled(motion.div)`
  position: relative;
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  background: white;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 95vw;
    height: 95vh;
  }
`

const SizeChartCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`

const SizeChartImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`
const ShareButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`

const ShareButton = styled(motion.button)`
  background: white;
  border: 1px solid #e0e0e0;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
    color: black;
  }
`

const ShareNotification = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: black;
  color: white;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;
`
