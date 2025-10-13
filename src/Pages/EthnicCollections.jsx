import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Heart,
  ShoppingCart,
  Eye,
  Star,
  ArrowLeft,
} from 'lucide-react'
import styled from 'styled-components'
import productsData from '../data/data.json'

// Main Container
const Container = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
`

// Header
const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const HeaderContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
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
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

const PageTitle = styled.h1`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 100;
  letter-spacing: 0.05em;
  margin: 0;
  color: black;
`

const ResultsCount = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 0.95rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
  }

  &::placeholder {
    color: #aaa;
  }
`

const MobileFilterToggle = styled.button`
  display: none;
  padding: 0.8rem 1.5rem;
  background: black;
  color: white;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 968px) {
    display: flex;
  }
`

const SortSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: black;
  }
`

// Main Content
const MainContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

// Sidebar
const Sidebar = styled.aside`
  background: #fafafa;
  border-right: 1px solid #e0e0e0;
  padding: 2rem 1.5rem;
  overflow-y: auto;
  height: calc(100vh - 100px);
  position: sticky;
  top: 100px;

  @media (max-width: 968px) {
    position: fixed;
    top: 0;
    left: ${(props) => (props.isOpen ? '0' : '-100%')};
    width: 300px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
    box-shadow: ${(props) => (props.isOpen ? '2px 0 10px rgba(0,0,0,0.1)' : 'none')};
  }
`

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  color: black;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: 968px) {
    display: block;
  }
`

const FilterSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`

const FilterTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
`

const FilterLabel = styled.h4`
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const FilterContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow: hidden;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }

  input {
    accent-color: black;
    cursor: pointer;
  }
`

const ColorOption = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${(props) => props.color};
  border: 2px solid ${(props) => (props.selected ? 'black' : '#e0e0e0')};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  ${(props) =>
    props.selected &&
    `
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-weight: bold;
      text-shadow: 0 0 2px rgba(0,0,0,0.5);
    }
  `}
`

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));
  gap: 0.8rem;
`

const PriceInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
`

const PriceInput = styled.input`
  padding: 0.6rem 0.8rem;
  border: 1px solid #e0e0e0;
  background: white;
  font-size: 0.9rem;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: black;
  }
`

const ApplyButton = styled.button`
  width: 100%;
  padding: 0.7rem;
  background: black;
  color: white;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 0.8rem;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }
`

const ClearFilters = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: white;
  color: #666;
  border: 1px solid #e0e0e0;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
    color: black;
  }
`

// Products Grid
const ProductsSection = styled.section`
  padding: 2rem;
  overflow-y: auto;
  height: calc(100vh - 100px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const ProductsGrid = styled.div`
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

const ProductCard = styled(motion.div)`
  background: white;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border-color: #333;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: #f8f8f8;

  @media (max-width: 768px) {
    height: 300px;
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

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
`

const NoResultsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  color: black;
`

const NoResultsText = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`

const Overlay = styled(motion.div)`
  display: none;

  @media (max-width: 968px) {
    display: ${(props) => (props.show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`

// Component
const EthnicCollections = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Filters
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [selectedOccasions, setSelectedOccasions] = useState([])
  const [selectedFabrics, setSelectedFabrics] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [inStockOnly, setInStockOnly] = useState(false)

  // Filter sections open/close
  const [openSections, setOpenSections] = useState({
    subCategory: true,
    price: true,
    fabric: true,
    occasion: true,
    color: true,
    availability: true,
  })

  useEffect(() => {
    // Load ethnic products
    const ethnicProducts = productsData.products.filter((p) => p.category === 'ethnic')
    setProducts(ethnicProducts)
    setFilteredProducts(ethnicProducts)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [
    searchQuery,
    selectedSubCategories,
    selectedOccasions,
    selectedFabrics,
    selectedColors,
    priceRange,
    inStockOnly,
    sortBy,
    products,
  ])

  const applyFilters = () => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sub-category filter
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((p) => selectedSubCategories.includes(p.subCategory))
    }

    // Occasion filter
    if (selectedOccasions.length > 0) {
      filtered = filtered.filter((p) => selectedOccasions.some((occ) => p.occasion.includes(occ)))
    }

    // Fabric filter
    if (selectedFabrics.length > 0) {
      filtered = filtered.filter((p) => selectedFabrics.includes(p.fabric))
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((color) => selectedColors.includes(color.name))
      )
    }

    // Price range filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((p) => {
        const price = p.price
        const min = priceRange.min ? parseFloat(priceRange.min) : 0
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity
        return price >= min && price <= max
      })
    }

    // In stock filter
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.inStock)
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount)
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredProducts(filtered)
  }

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSubCategoryChange = (subCat) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCat) ? prev.filter((s) => s !== subCat) : [...prev, subCat]
    )
  }

  const handleOccasionChange = (occasion) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion) ? prev.filter((o) => o !== occasion) : [...prev, occasion]
    )
  }

  const handleFabricChange = (fabric) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    )
  }

  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  const clearAllFilters = () => {
    setSelectedSubCategories([])
    setSelectedOccasions([])
    setSelectedFabrics([])
    setSelectedColors([])
    setPriceRange({ min: '', max: '' })
    setInStockOnly(false)
    setSearchQuery('')
  }

  const handleProductClick = (product) => {
    window.location.href = `/products/ethnic/${product.slug}`
  }

  const handleWishlist = (e, productId) => {
    e.stopPropagation()
    console.log('Added to wishlist:', productId)
  }

  const handleQuickView = (e, product) => {
    e.stopPropagation()
    console.log('Quick view:', product)
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    console.log('Added to cart:', product)
  }

  // Get unique values for filters
  const subCategories = [...new Set(products.map((p) => p.subCategory))]
  const occasions = [...new Set(products.flatMap((p) => p.occasion.split(', ')))]
  const fabrics = [...new Set(products.map((p) => p.fabric))]
  const allColors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.name)))]

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContainer>
          <HeaderLeft>
            <BackButton onClick={() => window.history.back()} whileHover={{ x: -5 }}>
              <ArrowLeft size={18} />
              <span>Back</span>
            </BackButton>
            <div>
              <PageTitle>ETHNIC COLLECTION</PageTitle>
              <ResultsCount>{filteredProducts.length} Products</ResultsCount>
            </div>
          </HeaderLeft>
          <HeaderRight>
            <SearchBar>
              <SearchIcon size={18} />
              <SearchInput
                type="text"
                placeholder="Search by name, ID, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBar>
            <MobileFilterToggle onClick={() => setIsSidebarOpen(true)}>
              <SlidersHorizontal size={18} />
              Filters
            </MobileFilterToggle>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="discount">Highest Discount</option>
            </SortSelect>
          </HeaderRight>
        </HeaderContainer>
      </Header>

      {/* Overlay for mobile */}
      <Overlay
        show={isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Main Content */}
      <MainContent>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarHeader>
            <SidebarTitle>Filters</SidebarTitle>
            <CloseButton onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </CloseButton>
          </SidebarHeader>

          {/* Sub-Category Filter */}
          <FilterSection>
            <FilterTitle onClick={() => toggleSection('subCategory')}>
              <FilterLabel>Category</FilterLabel>
              <ChevronDown
                size={18}
                style={{
                  transform: openSections.subCategory ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </FilterTitle>
            {openSections.subCategory && (
              <FilterContent>
                {subCategories.map((subCat) => (
                  <CheckboxLabel key={subCat}>
                    <input
                      type="checkbox"
                      checked={selectedSubCategories.includes(subCat)}
                      onChange={() => handleSubCategoryChange(subCat)}
                    />
                    {subCat.charAt(0).toUpperCase() + subCat.slice(1)}
                  </CheckboxLabel>
                ))}
              </FilterContent>
            )}
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection>
            <FilterTitle onClick={() => toggleSection('price')}>
              <FilterLabel>Price Range</FilterLabel>
              <ChevronDown
                size={18}
                style={{
                  transform: openSections.price ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </FilterTitle>
            {openSections.price && (
              <FilterContent>
                <PriceInputs>
                  <PriceInput
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />
                  <PriceInput
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </PriceInputs>
              </FilterContent>
            )}
          </FilterSection>

          {/* Fabric Filter */}
          <FilterSection>
            <FilterTitle onClick={() => toggleSection('fabric')}>
              <FilterLabel>Fabric</FilterLabel>
              <ChevronDown
                size={18}
                style={{
                  transform: openSections.fabric ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </FilterTitle>
            {openSections.fabric && (
              <FilterContent>
                {fabrics.map((fabric) => (
                  <CheckboxLabel key={fabric}>
                    <input
                      type="checkbox"
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => handleFabricChange(fabric)}
                    />
                    {fabric}
                  </CheckboxLabel>
                ))}
              </FilterContent>
            )}
          </FilterSection>

          {/* Occasion Filter */}
          <FilterSection>
            <FilterTitle onClick={() => toggleSection('occasion')}>
              <FilterLabel>Occasion</FilterLabel>
              <ChevronDown
                size={18}
                style={{
                  transform: openSections.occasion ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </FilterTitle>
            {openSections.occasion && (
              <FilterContent>
                {occasions.map((occasion) => (
                  <CheckboxLabel key={occasion}>
                    <input
                      type="checkbox"
                      checked={selectedOccasions.includes(occasion)}
                      onChange={() => handleOccasionChange(occasion)}
                    />
                    {occasion}
                  </CheckboxLabel>
                ))}
              </FilterContent>
            )}
          </FilterSection>

          {/* Color Filter */}
          <FilterSection>
            <FilterTitle onClick={() => toggleSection('color')}>
              <FilterLabel>Color</FilterLabel>
              <ChevronDown
                size={18}
                style={{
                  transform: openSections.color ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </FilterTitle>
            {openSections.color && (
              <FilterContent>
                <ColorGrid>
                  {allColors.map((colorName) => {
                    const colorObj = products
                      .flatMap((p) => p.colors)
                      .find((c) => c.name === colorName)
                    return (
                      <ColorOption
                        key={colorName}
                        color={colorObj?.value || '#ccc'}
                        selected={selectedColors.includes(colorName)}
                        onClick={() => handleColorChange(colorName)}
                        title={colorName}
                      />
                    )
                  })}
                </ColorGrid>
              </FilterContent>
            )}
          </FilterSection>

          {/* Availability Filter */}
          <FilterSection>
            <FilterTitle onClick={() => toggleSection('availability')}>
              <FilterLabel>Availability</FilterLabel>
              <ChevronDown
                size={18}
                style={{
                  transform: openSections.availability ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </FilterTitle>
            {openSections.availability && (
              <FilterContent>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  In Stock Only
                </CheckboxLabel>
              </FilterContent>
            )}
          </FilterSection>

          <ClearFilters onClick={clearAllFilters}>Clear All Filters</ClearFilters>
        </Sidebar>

        {/* Products Grid */}
        <ProductsSection>
          {filteredProducts.length === 0 ? (
            <NoResults>
              <NoResultsTitle>No Products Found</NoResultsTitle>
              <NoResultsText>
                Try adjusting your filters or search query to find what you're looking for.
              </NoResultsText>
            </NoResults>
          ) : (
            <ProductsGrid>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
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
                        onClick={(e) => handleQuickView(e, product)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={20} />
                      </QuickActionButton>
                      <QuickActionButton
                        onClick={(e) => handleAddToCart(e, product)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ShoppingCart size={20} />
                      </QuickActionButton>
                    </ImageOverlay>
                  </ImageContainer>

                  <ProductInfo>
                    <ProductCategory>{product.subCategory}</ProductCategory>
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
            </ProductsGrid>
          )}
        </ProductsSection>
      </MainContent>
    </Container>
  )
}

export default EthnicCollections
