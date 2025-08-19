import React, { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import {
  Search,
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  X,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// --- KEYFRAMES ---
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const spinLoader = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

// --- STYLED COMPONENTS ---
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%);
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`

const StickyHeader = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(229, 231, 235, 0.8);
  position: sticky;
  top: 0;
  z-index: 30;
`

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 1.5rem 2rem;
  }
`

const HeaderFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const TitleSection = styled.div`
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
  }
`

const MainTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`

const GradientText = styled.span`
  background: linear-gradient(135deg, #000080, #0066cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`

const Subtitle = styled.p`
  color: #6b7280;
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const ControlsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: flex-end;
  }
`

const SearchContainer = styled.div`
  position: relative;
`

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  width: 18px;
  height: 18px;
`

const SearchInput = styled.input`
  width: 16rem;
  padding: 0.625rem 0.75rem 0.625rem 2.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
    border-color: transparent;
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const GridControls = styled.div`
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 0.75rem;
  padding: 0.25rem;
`

const GridButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  color: ${(props) => (props.active ? '#000080' : '#6b7280')};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => (props.active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none')};

  &:hover {
    color: ${(props) => (props.active ? '#000080' : '#374151')};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const ResultsCount = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`

const ResultsText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`

const CountNumber = styled.span`
  font-weight: 600;
  color: ${(props) => (props.primary ? '#000080' : '#111827')};
`

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`

const ReviewsGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  ${(props) => {
    switch (props.gridSize) {
      case 2:
        return css`
          grid-template-columns: 1fr;
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
        `
      case 3:
        return css`
          grid-template-columns: 1fr;
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
          }
        `
      case 4:
        return css`
          grid-template-columns: 1fr;
          @media (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
          }
          @media (min-width: 1280px) {
            grid-template-columns: repeat(4, 1fr);
          }
        `
      default:
        return css`
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        `
    }
  }}
`

const ReviewCard = styled.div`
  position: relative;
  background: #ffffff;
  /* border-radius: 1rem; */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s ease;
  animation: ${fadeIn} 0.6s ease forwards;
  animation-delay: ${(props) => props.index * 0.1}s;
  opacity: 0;

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  }
`

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  /* border-radius: 1rem; */
`

const AspectRatioWrapper = styled.div`
  position: relative;
  width: 100%;
  /* aspect-ratio: 4 / 5; */
`

const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.7s ease;
  opacity: ${(props) => (props.loaded ? 1 : 0)};

  ${ReviewCard}:hover & {
    transform: scale(1.05);
  }
`

const LoadingPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

const LoadingSpinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 4px solid #000080;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${spinLoader} 1s linear infinite;
`

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent, transparent);
  opacity: 0;
  transition: all 0.3s ease;

  ${ReviewCard}:hover & {
    opacity: 1;
  }
`

const OverlayContent = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ReviewBadge = styled.span`
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  backdrop-filter: blur(4px);
`

const SearchIconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    color: #000080;
  }
`

const ReviewNumber = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #000080;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const NoResults = styled.div`
  text-align: center;
  padding: 5rem 0;
`

const NoResultsIcon = styled.div`
  width: 6rem;
  height: 6rem;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  svg {
    width: 2rem;
    height: 2rem;
    color: #9ca3af;
  }
`

const NoResultsTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.75rem 0;
`

const NoResultsText = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0 0 1rem 0;
`

const ClearButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: #000080;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0066cc;
  }
`

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${scaleIn} 0.3s ease;
`

const LightboxButton = styled.button`
  position: absolute;
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`

const CloseButton = styled(LightboxButton)`
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.5rem;

  svg {
    width: 28px;
    height: 28px;
  }
`

const NavButton = styled(LightboxButton)`
  top: 50%;
  transform: translateY(-50%);
  padding: 0.75rem;

  svg {
    width: 32px;
    height: 32px;
  }
`

const PrevButton = styled(NavButton)`
  left: 1.5rem;
`

const NextButton = styled(NavButton)`
  right: 1.5rem;
`

const LightboxImageContainer = styled.div`
  position: relative;
  max-width: 64rem;
  max-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 1rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
`

const ImageCounter = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  backdrop-filter: blur(4px);

  span {
    font-size: 0.875rem;
    font-weight: 500;
  }
`

const KeyboardInstructions = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #000080, #0066cc);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 40;
  animation: ${slideUp} 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #0066cc, #0080ff);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

// --- MAIN COMPONENT ---
const ReviewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [gridSize, setGridSize] = useState(3)
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [loadedImages, setLoadedImages] = useState(new Set())

  // Generate all 28 review images
  const reviewImages = Array.from({ length: 28 }, (_, i) => ({
    id: i + 1,
    src: `/images/reviews/review-${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `Student Review ${i + 1}`,
  }))

  // Filter images based on search
  const filteredImages = reviewImages.filter(
    (image) =>
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.id.toString().includes(searchTerm)
  )

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') navigateImage('prev')
        if (e.key === 'ArrowRight') navigateImage('next')
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentImageIndex])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleImageLoad = (imageId) => {
    setLoadedImages((prev) => new Set(prev).add(imageId))
  }

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const navigateImage = (direction) => {
    const maxIndex = filteredImages.length - 1
    let newIndex = currentImageIndex

    if (direction === 'next') {
      newIndex = currentImageIndex >= maxIndex ? 0 : currentImageIndex + 1
    } else {
      newIndex = currentImageIndex <= 0 ? maxIndex : currentImageIndex - 1
    }

    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <PageContainer>
      {/* Header Section */}
      <StickyHeader>
        <HeaderContent>
          <HeaderFlex>
            <TitleSection>
              <MainTitle>
                Student <GradientText>Reviews</GradientText>
              </MainTitle>
              <Subtitle>Browse through our student testimonials and success stories</Subtitle>
            </TitleSection>

            <ControlsSection>
              {/* Search Bar */}
              <SearchContainer>
                <SearchIcon />
                <SearchInput
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchContainer>

              {/* Grid Size Controls */}
              <GridControls>
                <GridButton
                  active={gridSize === 2}
                  onClick={() => setGridSize(2)}
                  title="2 columns"
                >
                  <Grid2X2 />
                </GridButton>
                <GridButton
                  active={gridSize === 3}
                  onClick={() => setGridSize(3)}
                  title="3 columns"
                >
                  <Grid3X3 />
                </GridButton>
                <GridButton
                  active={gridSize === 4}
                  onClick={() => setGridSize(4)}
                  title="4 columns"
                >
                  <LayoutGrid />
                </GridButton>
              </GridControls>
            </ControlsSection>
          </HeaderFlex>

          {/* Results Count */}
          <ResultsCount>
            <ResultsText>
              Showing <CountNumber primary>{filteredImages.length}</CountNumber> of{' '}
              <CountNumber>{reviewImages.length}</CountNumber> reviews
            </ResultsText>
          </ResultsCount>
        </HeaderContent>
      </StickyHeader>

      {/* Main Content */}
      <MainContent>
        {/* Reviews Grid */}
        <ReviewsGrid gridSize={gridSize}>
          {filteredImages.map((image, index) => (
            <ReviewCard key={image.id} index={index} onClick={() => openLightbox(image, index)}>
              {/* Image Container */}
              <ImageContainer>
                <AspectRatioWrapper>
                  <ReviewImage
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    loaded={loadedImages.has(image.id)}
                    onLoad={() => handleImageLoad(image.id)}
                  />

                  {/* Loading placeholder */}
                  {!loadedImages.has(image.id) && (
                    <LoadingPlaceholder>
                      <LoadingSpinner />
                    </LoadingPlaceholder>
                  )}

                  {/* Hover overlay */}
                  <HoverOverlay>
                    <OverlayContent>
                      <ReviewBadge>Review #{image.id}</ReviewBadge>
                      <SearchIconWrapper>
                        <Search />
                      </SearchIconWrapper>
                    </OverlayContent>
                  </HoverOverlay>
                </AspectRatioWrapper>
              </ImageContainer>

              {/* Review number badge */}
              <ReviewNumber>#{image.id}</ReviewNumber>
            </ReviewCard>
          ))}
        </ReviewsGrid>

        {/* No Results */}
        {filteredImages.length === 0 && (
          <NoResults>
            <NoResultsIcon>
              <Search />
            </NoResultsIcon>
            <NoResultsTitle>No reviews found</NoResultsTitle>
            <NoResultsText>Try adjusting your search terms</NoResultsText>
            <ClearButton onClick={() => setSearchTerm('')}>Clear Search</ClearButton>
          </NoResults>
        )}
      </MainContent>

      {/* Lightbox Modal */}
      {selectedImage && (
        <LightboxOverlay>
          {/* Navigation and Close Buttons */}
          <CloseButton onClick={closeLightbox}>
            <X />
          </CloseButton>

          {/* Previous Button */}
          <PrevButton onClick={() => navigateImage('prev')}>
            <ChevronLeft />
          </PrevButton>

          {/* Next Button */}
          <NextButton onClick={() => navigateImage('next')}>
            <ChevronRight />
          </NextButton>

          {/* Image Container */}
          <LightboxImageContainer>
            <LightboxImage src={selectedImage.src} alt={selectedImage.alt} />

            {/* Image Counter */}
            <ImageCounter>
              <span>
                {currentImageIndex + 1} of {filteredImages.length}
              </span>
            </ImageCounter>
          </LightboxImageContainer>

          {/* Keyboard Instructions */}
          <KeyboardInstructions>
            <p>Use ← → arrow keys to navigate • ESC to close</p>
          </KeyboardInstructions>
        </LightboxOverlay>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <ScrollTopButton onClick={scrollToTop}>
          <ArrowUp />
        </ScrollTopButton>
      )}
    </PageContainer>
  )
}

export default ReviewsPage
