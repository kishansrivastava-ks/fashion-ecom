import React from 'react'
import styled from 'styled-components'

// ====== Styled Components ======

// Section Container
const BentoSection = styled.section`
  margin-bottom: 15rem;
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
  margin-bottom: 6rem;
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

// The Bento Grid Container
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: clamp(120px, 16vw, 280px);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(8, 1fr);
    grid-auto-rows: clamp(120px, 18vw, 250px);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`

// A Single Bento Grid Item
const BentoItem = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  /* border-radius: 1rem; */
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
    grid-column: span 1;
    grid-row: auto;
    aspect-ratio: 3/4;
  }

  @media (max-width: 480px) {
    grid-column: span 1;
    aspect-ratio: 3/4;
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
`

const CaptionTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
`

const CaptionSubtext = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  opacity: 0.85;
  text-transform: uppercase;
`

// ====== Component ======
const BentoGallery = ({ title, images = [] }) => {
  return (
    <BentoSection>
      <SectionTitle>{title}</SectionTitle>
      <BentoGrid>
        {images.map((item) => (
          <BentoItem
            key={item.src}
            gCol={item.gCol}
            gRow={item.gRow}
            gColMd={item.gColMd}
            gRowMd={item.gRowMd}
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

export default BentoGallery
