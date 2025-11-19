import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { Search } from 'lucide-react'

// Main Products Section Component
const ProductsSection = ({ title, products }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Filter products based on search term (by product code)
  const filteredProducts = products.filter((product) =>
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              <ProductCard key={product.id} product={product} index={index} isInView={isInView} />
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
    </Section>
  )
}

// Product Card Component
const ProductCard = ({ product, index, isInView }) => {
  const handleClick = () => {
    // Navigate to the product link
    window.location.href = product.link
  }

  return (
    <Card
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={handleClick}
    >
      <ImageContainer>
        <ProductImage src={product.image} alt={product.code} />
        <ImageOverlay>
          <ViewText>VIEW DETAILS</ViewText>
        </ImageOverlay>
      </ImageContainer>
      <ProductInfo>
        <ProductCode>{product.code}</ProductCode>
        <ProductCategory>{product.category}</ProductCategory>
      </ProductInfo>
    </Card>
  )
}

// Styled Components
const Section = styled.section`
  min-height: 100vh;
  background: white;
  padding: 8rem 2rem;

  @media (max-width: 768px) {
    padding: 5rem 2rem;
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
  margin-bottom: 5rem;
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

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`

const ViewText = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
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

export default ProductsSection
