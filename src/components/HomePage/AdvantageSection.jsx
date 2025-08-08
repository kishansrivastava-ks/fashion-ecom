import React from 'react'
import styled from 'styled-components'

// --- STYLED COMPONENTS ---

const AdvantageSectionContainer = styled.section`
  background-color: #ffffff;
  padding: 5rem 2rem;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid #f0f2f5; // Add a subtle separator line
`

const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); // Give slightly more space to text
  gap: 4rem; // Increased gap for better separation
  align-items: center;
  /* border: 2px solid red; */

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const TextContent = styled.div`
  // Decorative corner bracket for the text block
  position: relative;
  padding-left: 20px;
  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    width: 50px;
    height: 50px;
    border-color: #d9534f;
    border-style: solid;
    border-width: 8px 0 0 8px;
  }
`

const SubHeading = styled.p`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`

const MainHeading = styled.h2`
  color: #000080; // Navy blue
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
`

const Description = styled.p`
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1rem;
  margin-bottom: 2.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StatCircle = styled.div`
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #000080;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 128, 0.2);
`

const StatTextContainer = styled.div``

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000080;
`

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  line-height: 1.3;
`

const KnowMoreButton = styled.a`
  display: inline-block;
  background-color: #d9534f;
  color: #ffffff;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(217, 83, 79, 0.3);

  &:hover {
    background-color: #c9302c;
    transform: translateY(-2px);
  }
`

// --- REDESIGNED IMAGE GRID ---
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
  position: relative;

  // Decorative corner bracket for the image grid
  &::after {
    content: '';
    position: absolute;
    bottom: -35px;
    right: -25px;
    width: 50px;
    height: 50px;
    border-color: #000080;
    border-style: solid;
    border-width: 0 8px 8px 0;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1 / 1; // Makes the images square

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`

const InfoTag = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  color: #333;
  font-size: 0.8rem;
  backdrop-filter: blur(4px);
`

const DividerLine = styled.div`
  position: absolute;
  bottom: -3px;
  left: 5%;
  width: 90%;
  height: 3px;
  background: linear-gradient(to right, #000080 50%, #d9534f 50%);
`

// --- MOCK DATA ---
const stats = [
  { value: '1.75L+', label: 'Learners Empowered' },
  { value: '500+', label: 'Recruitment Partners' },
  { value: '70K+', label: 'Placement Opportunities' },
  { value: '5000+', label: 'Hrs of e-Learning Content' },
]

const imageData = [
  { src: '/images/faculty.png', tag: 'Best-in-class Faculty' },
  { src: '/images/courses.jpg', tag: 'Recommended Courses' },
  {
    src: '/images/finance-help.png',
    tag: 'Assured Finance Options',
  },
  { src: '/images/success.jpg', tag: 'Proven Career Success' },
]

// --- MAIN COMPONENT ---
const AdvantageSection = () => {
  return (
    <AdvantageSectionContainer>
      <ContentWrapper>
        <TextContent>
          <SubHeading>Why us?</SubHeading>
          <MainHeading>The Career Counselling Corporation of India Advantage</MainHeading>
          <Description>
            Because we are focused on you, your learning outcomes, and your career development. No
            matter what stage of career you are at, you can choose from our wide range of learning
            and career development solutions that will equip you to rise in a competitive world.
          </Description>
          <StatsContainer>
            {stats.map((stat, index) => (
              <StatItem key={index}>
                <StatCircle>{stat.value.split('+')[0].replace(/[^\d.]/g, '')}</StatCircle>
                <StatTextContainer>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatTextContainer>
              </StatItem>
            ))}
          </StatsContainer>
          <KnowMoreButton href="#">Know More</KnowMoreButton>
        </TextContent>
        <ImageGrid>
          {imageData.map((image, index) => (
            <ImageWrapper key={index}>
              <img src={image.src} alt={image.tag} />
              <InfoTag>{image.tag}</InfoTag>
            </ImageWrapper>
          ))}
        </ImageGrid>
      </ContentWrapper>
      <DividerLine />
    </AdvantageSectionContainer>
  )
}

export default AdvantageSection
