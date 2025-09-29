import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import styled from 'styled-components'
import FeaturedCollection from '@/components/FeaturedCollection'
import FloatingNavbar from '@/components/FloatingNavbar'
import Footer from '@/components/Footer'
import PageTransition from '@/utils/PageTransition'
import { useNavigate } from 'react-router-dom'

// Hero Section Styles
const HeroContainer = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeroImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #000 0%, #333 100%);
  background-image: url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&h=1080&fit=crop&crop=center');
  background-size: cover;
  background-position: center;
  z-index: 1;
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
`

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 100;
  letter-spacing: 2rem;
  line-height: 0.9;
  margin: 0;
  font-family: 'Arial', sans-serif;
  color: white;
`

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 300;
  letter-spacing: 0.5rem;
  margin: 2rem 0 3rem 0;
  opacity: 0.9;
  color: white;
`

const HeroButton = styled(motion.button)`
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 1rem 3rem;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
`

// Featured Collection Styles
const CollectionContainer = styled.section`
  min-height: 100vh;
  padding: 5rem 2rem;
  background: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 3rem 1rem;
  }
`

const CollectionContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const CollectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  color: black;
`

const CollectionDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin: 0 0 2rem 0;
  font-weight: 300;
`

const CollectionButton = styled(motion.button)`
  background: black;
  border: none;
  color: white;
  padding: 1rem 0;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  width: 200px;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`

const CollectionImageContainer = styled(motion.div)`
  position: relative;
  overflow: hidden;
  min-height: 500px;
`

const CollectionImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  background-image: url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop&crop=center');
  background-size: cover;
  background-position: center;
  transform: scale(1);
  transition: transform 0.6s ease;

  &:hover {
    transform: scale(1.05);
  }
`

// Brand Story Styles
const StoryContainer = styled.section`
  min-height: 100vh;
  background: black;
  color: white;
  display: flex;
  align-items: center;
  padding: 0;
`

const StoryWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const StoryImageSection = styled(motion.div)`
  position: relative;
  overflow: hidden;
`

const StoryImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #333 0%, #666 100%);
  background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center');
  background-size: cover;
  background-position: center;
`

const StoryContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`

const StoryTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin: 0 0 2rem 0;
  color: white;
`

const StoryText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ccc;
  margin: 0 0 1.5rem 0;
  font-weight: 300;
`

const StoryQuote = styled(motion.blockquote)`
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 300;
  line-height: 1.6;
  margin: 2rem 0;
  padding-left: 2rem;
  border-left: 1px solid #333;
  color: white;
`

// Products Gallery Styles
const ProductsContainer = styled.section`
  min-height: 100vh;
  background: #fafafa;
  display: flex;
`

const FilterSidebar = styled(motion.aside)`
  width: 300px;
  background: white;
  padding: 3rem 2rem;
  border-right: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isOpen ? '0' : '-300px')};
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
    box-shadow: ${(props) => (props.isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none')};
  }
`

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  margin: 0 0 2rem 0;
  color: black;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  background: #f9f9f9;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
  }
`

const FilterGroup = styled.div`
  margin-bottom: 2rem;
`

const FilterLabel = styled.h4`
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
  color: #333;
`

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;

  input[type='checkbox'] {
    margin-right: 0.5rem;
    accent-color: black;
  }
`

const ProductsMain = styled.div`
  flex: 1;
  padding: 3rem 2rem;
`

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const ProductsTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 100;
  letter-spacing: -0.01em;
  margin: 0;
  color: black;
`

const SortSelect = styled.select`
  padding: 0.8rem 1.5rem;
  border: 1px solid #e0e0e0;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
`

const FilterToggle = styled.button`
  display: none;
  background: black;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const ProductGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`

const ProductCard = styled(motion.div)`
  background: white;
  overflow: hidden;
  cursor: pointer;
`

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: #f5f5f5;
`

const ProductImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`

const ProductInfo = styled.div`
  padding: 1.5rem;
`

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 300;
  margin: 0 0 0.5rem 0;
  color: black;
`

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  color: #333;
`

// Newsletter Styles
const NewsletterContainer = styled.section`
  min-height: 80vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
`

const NewsletterContent = styled(motion.div)`
  text-align: center;
  max-width: 600px;
  color: white;
`

const NewsletterTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 100;
  letter-spacing: 0.01em;
  line-height: 1.2;
  margin: 0 0 1.5rem 0;
  color: white;
`

const NewsletterSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.6;
  margin: 0 0 3rem 0;
  opacity: 0.9;
  color: white;
`

const NewsletterForm = styled(motion.form)`
  display: flex;
  max-width: 400px;
  margin: 0 auto 2rem auto;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const EmailInput = styled.input`
  flex: 1;
  padding: 1.2rem 1.5rem;
  border: 1px solid #444;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
    border-color: white;
    background: rgba(255, 255, 255, 0.15);
  }
`

const SubmitButton = styled.button`
  background: white;
  color: black;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }
`

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`

// Component Functions
const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroImage
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <HeroOverlay />
      <HeroContent>
        <HeroTitle
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          LUXE
        </HeroTitle>
        <HeroSubtitle
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          REDEFINING MODERN FASHION
        </HeroSubtitle>
        <HeroButton
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EXPLORE COLLECTION
        </HeroButton>
      </HeroContent>
    </HeroContainer>
  )
}

// const FeaturedCollection = () => {
//   const ref = React.useRef(null)
//   const isInView = useInView(ref, { once: true, margin: '-100px' })

//   return (
//     <CollectionContainer ref={ref}>
//       <CollectionContent>
//         <CollectionTitle
//           initial={{ x: -100, opacity: 0 }}
//           animate={isInView ? { x: 0, opacity: 1 } : {}}
//           transition={{ duration: 0.8 }}
//         >
//           SPRING
//           <br />
//           COLLECTION
//         </CollectionTitle>
//         <CollectionDescription
//           initial={{ x: -50, opacity: 0 }}
//           animate={isInView ? { x: 0, opacity: 1 } : {}}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           Discover our latest collection where contemporary design meets timeless elegance. Each
//           piece is carefully crafted to embody the perfect balance between comfort and
//           sophistication.
//         </CollectionDescription>
//         <CollectionButton
//           initial={{ x: -30, opacity: 0 }}
//           animate={isInView ? { x: 0, opacity: 1 } : {}}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           SHOP NOW
//         </CollectionButton>
//       </CollectionContent>

//       <CollectionImageContainer
//         initial={{ x: 100, opacity: 0 }}
//         animate={isInView ? { x: 0, opacity: 1 } : {}}
//         transition={{ duration: 1 }}
//       >
//         <CollectionImage />
//       </CollectionImageContainer>
//     </CollectionContainer>
//   )
// }

const BrandStory = () => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <StoryContainer ref={ref}>
      <StoryWrapper>
        <StoryImageSection
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <StoryImage />
        </StoryImageSection>

        <StoryContent>
          <StoryTitle
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            OUR STORY
          </StoryTitle>
          <StoryText
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Founded with a vision to revolutionize contemporary fashion, we believe in creating
            pieces that transcend seasons and trends. Our commitment to quality and innovation
            drives every decision we make.
          </StoryText>
          <StoryText
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            From our sustainable sourcing practices to our meticulous attention to detail, we're
            dedicated to building a brand that respects both our customers and our planet.
          </StoryText>
          <StoryQuote
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            "Fashion is not just about clothing—it's about expressing your authentic self."
          </StoryQuote>
        </StoryContent>
      </StoryWrapper>
    </StoryContainer>
  )
}

const ProductsGallery = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [sortBy, setSortBy] = useState('name')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const navigate = useNavigate()

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Minimalist Blazer',
      price: '₹299',
      category: 'outerwear',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
    },
    {
      id: 2,
      name: 'Classic White Shirt',
      price: '₹129',
      category: 'tops',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    },
    {
      id: 3,
      name: 'Tailored Trousers',
      price: '₹199',
      category: 'bottoms',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
    },
    {
      id: 4,
      name: 'Silk Blouse',
      price: '₹179',
      category: 'tops',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    },
    {
      id: 5,
      name: 'Wool Coat',
      price: '₹449',
      category: 'outerwear',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop',
    },
    {
      id: 6,
      name: 'Pencil Skirt',
      price: '₹149',
      category: 'bottoms',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
    },
  ]

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
    return matchesSearch && matchesCategory
  })

  return (
    <ProductsContainer ref={ref}>
      <FilterSidebar
        isOpen={isFilterOpen}
        initial={{ x: -50, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <FilterTitle>FILTER & SEARCH</FilterTitle>

        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterGroup>
          <FilterLabel>CATEGORIES</FilterLabel>
          {['tops', 'bottoms', 'outerwear'].map((category) => (
            <FilterOption key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterOption>
          ))}
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>PRICE RANGE</FilterLabel>
          <FilterOption>
            <input type="checkbox" />
            Under ₹150
          </FilterOption>
          <FilterOption>
            <input type="checkbox" />
            ₹150 - ₹300
          </FilterOption>
          <FilterOption>
            <input type="checkbox" />
            Over ₹300
          </FilterOption>
        </FilterGroup>
      </FilterSidebar>

      <ProductsMain>
        <ProductsHeader>
          <ProductsTitle
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            COLLECTIONS
          </ProductsTitle>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <FilterToggle onClick={() => setIsFilterOpen(!isFilterOpen)}>FILTERS</FilterToggle>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="newest">Newest First</option>
            </SortSelect>
          </div>
        </ProductsHeader>

        <ProductGrid
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate('/product')}
            >
              <ProductImageContainer>
                <ProductImage style={{ backgroundImage: `url(${product.image})` }} />
              </ProductImageContainer>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </ProductsMain>
    </ProductsContainer>
  )
}

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <NewsletterContainer ref={ref}>
      <NewsletterContent>
        <NewsletterTitle
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          STAY IN TOUCH
        </NewsletterTitle>
        <NewsletterSubtitle
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Be the first to know about new collections, exclusive offers, and fashion insights.
        </NewsletterSubtitle>

        <NewsletterForm
          onSubmit={handleSubmit}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <EmailInput
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton type="submit">SUBSCRIBE</SubmitButton>
        </NewsletterForm>

        <SocialLinks
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SocialLink href="#" aria-label="Instagram">
            📷
          </SocialLink>
          <SocialLink href="#" aria-label="Facebook">
            📘
          </SocialLink>
          <SocialLink href="#" aria-label="Twitter">
            🐦
          </SocialLink>
          <SocialLink href="#" aria-label="Pinterest">
            📌
          </SocialLink>
        </SocialLinks>
      </NewsletterContent>
    </NewsletterContainer>
  )
}

// Main Landing Page Component
const Test = () => {
  return (
    <PageTransition>
      <FloatingNavbar />
      <HeroSection />
      <FeaturedCollection />
      <BrandStory />
      <ProductsGallery />
      {/* <Newsletter /> */}
      <Footer />
    </PageTransition>
  )
}

export default Test
