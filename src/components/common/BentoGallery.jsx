import React from 'react'
import styled from 'styled-components'

// ====== Styled Components ======

// Section Container
const BentoSection = styled.section`
  margin-bottom: 6rem;
  padding: 0 2rem;
  background: #fff;

  @media (max-width: 1024px) {
    padding: 0 3rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 8rem;
    padding: 0 1.5rem;
  }
`

// Reusable Section Title
const SectionTitle = styled.h2`
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  color: #000;
  opacity: 0.6;
  text-align: left;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 60px;
    height: 2px;
    background: #000;
    opacity: 0.2;
  }
`

// The Bento Grid Container - Now with fixed aspect ratio
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1rem;
  aspect-ratio: 16/9;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    aspect-ratio: 4/3;
    gap: 0.8rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(12, 1fr);
    aspect-ratio: 3/4;
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(16, 1fr);
    aspect-ratio: 2/3;
    gap: 0.5rem;
  }
`

// A Single Bento Grid Item
const BentoItem = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #f7f7f7;
  grid-column: ${(props) => props.gCol || 'span 12'};
  grid-row: ${(props) => props.gRow || 'span 1'};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.5s ease,
    box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1024px) {
    grid-column: ${(props) => props.gColMd || props.gCol || 'span 8'};
    grid-row: ${(props) => props.gRowMd || props.gRow || 'span 1'};
  }

  @media (max-width: 768px) {
    grid-column: ${(props) => props.gColSm || 'span 2'};
    grid-row: ${(props) => props.gRowSm || 'span 2'};
  }

  @media (max-width: 480px) {
    grid-column: ${(props) => props.gColXs || 'span 1'};
    grid-row: ${(props) => props.gRowXs || 'span 2'};
  }
`

// Image Wrapper
const BentoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
  filter: brightness(0.9);

  ${BentoItem}:hover & {
    transform: scale(1.06);
    filter: brightness(1);
  }
`

// Image Caption
const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: #fff;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  z-index: 2;

  ${BentoItem}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const CaptionTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const CaptionSubtext = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  opacity: 0.85;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

// ====== Component ======
const BentoGallery = ({ title, images = galleryImages }) => {
  return (
    <BentoSection>
      <SectionTitle>FEATURED COLLECTIONS</SectionTitle>
      <BentoGrid>
        {images.map((item, index) => (
          <BentoItem
            key={`${item.src}-${index}`}
            gCol={item.gCol}
            gRow={item.gRow}
            gColMd={item.gColMd}
            gRowMd={item.gRowMd}
            gColSm={item.gColSm}
            gRowSm={item.gRowSm}
            gColXs={item.gColXs}
            gRowXs={item.gRowXs}
          >
            <BentoImage src={item.src} alt={item.title} />
            <ImageCaption>
              <CaptionTitle>{item.title}</CaptionTitle>
              <CaptionSubtext>{item.caption}</CaptionSubtext>
            </ImageCaption>
          </BentoItem>
        ))}
      </BentoGrid>
    </BentoSection>
  )
}

// Updated gallery images with perfect rectangular fit
const galleryImages = [
  {
    src: '/images/ethnic/ethnic1.jpg',
    title: 'Silk Heritage',
    caption: 'Timeless Collection',
    gCol: 'span 4',
    gRow: 'span 3',
    gColMd: 'span 3',
    gRowMd: 'span 4',
    gColSm: 'span 2',
    gRowSm: 'span 4',
    gColXs: 'span 1',
    gRowXs: 'span 4',
  },
  {
    src: '/images/ethnic/ethnic61.jpg',
    title: 'Royal Drapes',
    caption: 'Traditional Artistry',
    gCol: 'span 5',
    gRow: 'span 3',
    gColMd: 'span 5',
    gRowMd: 'span 4',
    gColSm: 'span 2',
    gRowSm: 'span 4',
    gColXs: 'span 1',
    gRowXs: 'span 4',
  },
  {
    src: '/images/ethnic/eth004.jpg',
    title: 'Modern Grace',
    caption: 'Contemporary Fusion',
    gCol: 'span 3',
    gRow: 'span 3',
    gColMd: 'span 4',
    gRowMd: 'span 4',
    gColSm: 'span 2',
    gRowSm: 'span 3',
    gColXs: 'span 2',
    gRowXs: 'span 4',
  },
  {
    src: '/images/ethnic/eth003.jpg',
    title: 'Bridal Dreams',
    caption: 'Wedding Collection',
    gCol: 'span 5',
    gRow: 'span 3',
    gColMd: 'span 4',
    gRowMd: 'span 4',
    gColSm: 'span 2',
    gRowSm: 'span 5',
    gColXs: 'span 1',
    gRowXs: 'span 4',
  },
  {
    src: '/images/ethnic/eth002.jpg',
    title: 'Evening Elegance',
    caption: 'Luxury Collection',
    gCol: 'span 4',
    gRow: 'span 3',
    gColMd: 'span 4',
    gRowMd: 'span 4',
    gColSm: 'span 2',
    gRowSm: 'span 5',
    gColXs: 'span 1',
    gRowXs: 'span 4',
  },
  {
    src: '/images/ethnic/eth001.jpg',
    title: 'Golden Threads',
    caption: 'Artisan Embroidery',
    gCol: 'span 3',
    gRow: 'span 3',
    gColMd: 'span 3',
    gRowMd: 'span 4',
    gColSm: 'span 2',
    gRowSm: 'span 4',
    gColXs: 'span 2',
    gRowXs: 'span 4',
  },
]

export default BentoGallery
