import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye } from 'lucide-react'
import styled from 'styled-components'
import productsData from '../data/data.json'

// Component
const ProductCarousel = () => {
  const [ethnicOffset, setEthnicOffset] = useState(0)
  const [westernOffset, setWesternOffset] = useState(0)
  const ethnicRef = useRef(null)
  const westernRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const ethnicProducts = productsData.products.filter((p) => p.category === 'ethnic')
  const westernProducts = productsData.products.filter((p) => p.category === 'western')

  const cardWidth = 320 + 32 // card width + gap
  const cardWidthMobile = 280 + 16

  useEffect(() => {
    const ethnicInterval = setInterval(() => {
      handleEthnicNext()
    }, 5000)

    const westernInterval = setInterval(() => {
      handleWesternNext()
    }, 5500)

    return () => {
      clearInterval(ethnicInterval)
      clearInterval(westernInterval)
    }
  }, [ethnicOffset, westernOffset])

  const handleEthnicPrev = () => {
    setEthnicOffset((prev) =>
      Math.min(prev + (window.innerWidth < 768 ? cardWidthMobile : cardWidth), 0)
    )
  }

  const handleEthnicNext = () => {
    const maxOffset =
      -(ethnicProducts.length - (window.innerWidth < 768 ? 1 : 3)) *
      (window.innerWidth < 768 ? cardWidthMobile : cardWidth)
    setEthnicOffset((prev) => {
      const newOffset = prev - (window.innerWidth < 768 ? cardWidthMobile : cardWidth)
      return newOffset < maxOffset ? 0 : newOffset
    })
  }

  const handleWesternPrev = () => {
    setWesternOffset((prev) =>
      Math.min(prev + (window.innerWidth < 768 ? cardWidthMobile : cardWidth), 0)
    )
  }

  const handleWesternNext = () => {
    const maxOffset =
      -(westernProducts.length - (window.innerWidth < 768 ? 1 : 3)) *
      (window.innerWidth < 768 ? cardWidthMobile : cardWidth)
    setWesternOffset((prev) => {
      const newOffset = prev - (window.innerWidth < 768 ? cardWidthMobile : cardWidth)
      return newOffset < maxOffset ? 0 : newOffset
    })
  }

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`
  }

  const handleWishlist = (e, productId) => {
    e.stopPropagation()
    console.log('Added to wishlist:', productId)
  }

  const handleQuickView = (e, productId) => {
    e.stopPropagation()
    console.log('Quick view:', productId)
  }

  const handleAddToCart = (e, productId) => {
    e.stopPropagation()
    console.log('Added to cart:', productId)
  }

  return (
    <Section ref={sectionRef}>
      <Container>
        {/* Ethnic Collection */}
        <CategorySection>
          <SectionHeader
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <CategoryTitle>ETHNIC COLLECTION</CategoryTitle>
            <ViewAllLink href="/collections/ethnic">
              View All <ChevronRight size={18} />
            </ViewAllLink>
          </SectionHeader>

          <CarouselContainer ref={ethnicRef}>
            <NavButton
              direction="left"
              onClick={handleEthnicPrev}
              disabled={ethnicOffset === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </NavButton>

            <CarouselWrapper offset={ethnicOffset}>
              {ethnicProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <ImageContainer>
                    <ProductImage src={product.images[0]} alt={product.name} />

                    {product.badges && product.badges.length > 0 && (
                      <Badge type={product.badges[0]}>{product.badges[0]}</Badge>
                    )}

                    <WishlistButton
                      onClick={(e) => handleWishlist(e, product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart size={18} />
                    </WishlistButton>

                    <ImageOverlay>
                      <QuickActionButton
                        onClick={(e) => handleQuickView(e, product.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={20} />
                      </QuickActionButton>
                      <QuickActionButton
                        onClick={(e) => handleAddToCart(e, product.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingCart size={20} />
                      </QuickActionButton>
                    </ImageOverlay>
                  </ImageContainer>

                  <ProductInfo>
                    <ProductCategory>
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1) +
                        ' Wear'}
                    </ProductCategory>
                    <ProductTitle>{product.name}</ProductTitle>
                    <PriceContainer>
                      <CurrentPrice>₹{product.price.toLocaleString()}</CurrentPrice>
                      <OriginalPrice>₹{product.originalPrice.toLocaleString()}</OriginalPrice>
                      <Discount>{product.discount}% OFF</Discount>
                    </PriceContainer>
                    <Rating>
                      <Stars>
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </Stars>
                      <span>
                        {product.rating} ({product.reviews})
                      </span>
                    </Rating>
                  </ProductInfo>
                </ProductCard>
              ))}
            </CarouselWrapper>

            <NavButton
              direction="right"
              onClick={handleEthnicNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </NavButton>
          </CarouselContainer>
        </CategorySection>

        {/* Western Collection */}
        {/* <CategorySection>
          <SectionHeader
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CategoryTitle>WESTERN COLLECTION</CategoryTitle>
            <ViewAllLink href="/western">
              View All <ChevronRight size={18} />
            </ViewAllLink>
          </SectionHeader>

          <CarouselContainer ref={westernRef}>
            <NavButton
              direction="left"
              onClick={handleWesternPrev}
              disabled={westernOffset === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </NavButton>

            <CarouselWrapper offset={westernOffset}>
              {westernProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <ImageContainer>
                    <ProductImage src={product.images[0]} alt={product.name} />

                    {product.badges && product.badges.length > 0 && (
                      <Badge type={product.badges[0]}>{product.badges[0]}</Badge>
                    )}

                    <WishlistButton
                      onClick={(e) => handleWishlist(e, product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart size={18} />
                    </WishlistButton>

                    <ImageOverlay>
                      <QuickActionButton
                        onClick={(e) => handleQuickView(e, product.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={20} />
                      </QuickActionButton>
                      <QuickActionButton
                        onClick={(e) => handleAddToCart(e, product.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingCart size={20} />
                      </QuickActionButton>
                    </ImageOverlay>
                  </ImageContainer>

                  <ProductInfo>
                    <ProductCategory>
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1) +
                        ' Wear'}
                    </ProductCategory>
                    <ProductTitle>{product.name}</ProductTitle>
                    <PriceContainer>
                      <CurrentPrice>₹{product.price.toLocaleString()}</CurrentPrice>
                      <OriginalPrice>₹{product.originalPrice.toLocaleString()}</OriginalPrice>
                      <Discount>{product.discount}% OFF</Discount>
                    </PriceContainer>
                    <Rating>
                      <Stars>
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </Stars>
                      <span>
                        {product.rating} ({product.reviews})
                      </span>
                    </Rating>
                  </ProductInfo>
                </ProductCard>
              ))}
            </CarouselWrapper>

            <NavButton
              direction="right"
              onClick={handleWesternNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </NavButton>
          </CarouselContainer>
        </CategorySection> */}
      </Container>
    </Section>
  )
}

export default ProductCarousel

// Section Container
const Section = styled.section`
  background: white;
  padding: 6rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`

const CategorySection = styled.div`
  margin-bottom: 5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const CategoryTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 100;
  margin: 0;
  color: black;
  letter-spacing: 0.05em;
`

const ViewAllLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 300;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: black;
  }
`

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
`

const CarouselWrapper = styled.div`
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.offset}px);

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const ProductCard = styled(motion.div)`
  min-width: 320px;
  flex-shrink: 0;
  background: white;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border-color: #333;
  }

  @media (max-width: 768px) {
    min-width: 280px;
  }

  @media (max-width: 480px) {
    min-width: 260px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: #f8f8f8;

  @media (max-width: 768px) {
    height: 350px;
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.08);
  }
`

const ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`

const QuickActionButton = styled(motion.button)`
  width: 45px;
  height: 45px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    transform: scale(1.1);
  }
`

const Badge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${(props) => (props.type === 'new' ? 'black' : '#e74c3c')};
  color: white;
  padding: 0.4rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  z-index: 10;
`

const WishlistButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 38px;
  height: 38px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    transform: scale(1.1);
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

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0 0 0.8rem 0;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const Discount = styled.div`
  font-size: 0.85rem;
  color: #27ae60;
  font-weight: 500;
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

// Navigation Buttons
const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === 'left' ? 'left: -1rem;' : 'right: -1rem;')}
  width: 50px;
  height: 50px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    border-color: black;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;

    &:hover {
      background: white;
      color: black;
    }
  }

  @media (max-width: 768px) {
    ${(props) => (props.direction === 'left' ? 'left: 0;' : 'right: 0;')}
  }
`
