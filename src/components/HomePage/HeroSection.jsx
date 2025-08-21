import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// Styled Components
const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  align-items: flex-start;
  justify-content: center;
  min-height: 65vh;
  background-color: #ffffff;
  /* background-color: #f7f6f6; */
  padding-left: 6rem;

  gap: 2rem;
  overflow: hidden;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1.5rem;
  }

  box-shadow: inset 0 -8px 0 #18009c;
`

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 1300px; */

  @media (max-width: 992px) {
    flex-direction: column;
  }
`

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem;
  height: 100%;
  /* margin-top: auto; */
  padding-top: 2rem;
  /* border: 2px solid blue; */

  @media (max-width: 992px) {
    padding-right: 0;
    align-items: center;
  }
`

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #002366; /* A dark blue color */
  line-height: 1.1;
  margin-bottom: 1rem;

  span {
    color: #da3b3b; /* A red color */
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    font-weight: 400;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 500px;

  @media (max-width: 992px) {
    max-width: 100%;
  }
`

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? '#fff' : '#f8f9fa')};
  color: ${({ active }) => (active ? '#D32F2F' : '#333')};
  border: 2px solid ${({ active }) => (active ? '#D32F2F' : '#ddd')};
  transition: all 0.3s ease;

  &:hover {
    border-color: #d32f2f;
    color: #d32f2f;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const GetStartedButton = styled.button`
  background-color: #d32f2f;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b71c1c; /* A darker red for hover */
  }

  @media (max-width: 992px) {
    align-self: center;
    width: 100%;
    max-width: 300px;
  }
`

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 2px solid red; */

  @media (max-width: 992px) {
    display: none; // Hides the image on smaller screens for better layout
  }
`

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: contain;
  margin-left: 3rem;
  scale: 0.95;
`

// The main component
const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('Counselling')
  //   const tabs = ['Counseling', 'Training', 'Job Placement']
  const tabs = [
    {
      name: 'Counselling',
      to: '/',
    },
    {
      name: 'Training',
      to: '/training-and-placements',
    },
    {
      name: 'Job Placement',
      to: '/',
    },
  ]
  const navigate = useNavigate()

  return (
    <>
      <HeroContainer>
        <ContentWrapper>
          <LeftContent>
            <Title>
              Unlock your Potential with&nbsp;
              <span>
                Expert <br /> Career Counseling
              </span>
            </Title>
            <Subtitle>
              Discover your passion, build your career with India’s leading learning and career
              platform.
            </Subtitle>
            <TabsContainer>
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  active={activeTab === tab.name}
                  onClick={() => {
                    setActiveTab(tab.name)
                    navigate(`${tab.to}`)
                  }}
                >
                  {tab.name}
                </Tab>
              ))}
            </TabsContainer>
            <GetStartedButton onClick={() => navigate('/recommendations')}>
              Get Started
            </GetStartedButton>
          </LeftContent>
          <RightContent>
            {/* As requested, a dummy image. Replace the src with your actual image path. */}
            <HeroImage
              //   src="https://placehold.co/600x500/E0E0E0/333?text=Your+Image+Here"
              src="/hero1.jpg"
              alt="Career counseling visual"
              onerror="this.onerror=null;this.src='https://placehold.co/600x400/E0E0E0/333?text=Image+Not+Found';"
            />
          </RightContent>
        </ContentWrapper>
      </HeroContainer>
    </>
  )
}

export default HeroSection
