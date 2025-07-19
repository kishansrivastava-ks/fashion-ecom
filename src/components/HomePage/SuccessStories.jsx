import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

// --- ICONS ---
const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
)

// --- STYLED COMPONENTS ---

const StoriesSection = styled.section`
  background-color: #f8f9fa;
  padding: 5rem 2rem;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 1.5rem;
  text-align: left;
`

const SubHeading = styled.p`
  color: #d9534f;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`

const MainHeading = styled.h2`
  color: #000080;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 2rem 0;
`

const TabsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 1200px;
`

const TabButton = styled.button`
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  border: 1px solid transparent;

  ${({ active }) =>
    active
      ? `
        background-color: #000080;
        color: #ffffff;
      `
      : `
        background-color: #e9ecef;
        color: #555;
        border-color: #dee2e6;
        &:hover {
          background-color: #dde1e5;
        }
      `}
`

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
  overflow: hidden;
`

const slideAnimation = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`

const Slide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  animation: ${slideAnimation} 0.6s ease-in-out;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const TestimonialCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  height: 100%;
`

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const AuthorImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #000080;
`

const AuthorDetails = styled.div``

const AuthorName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000080;
  margin: 0 0 0.25rem 0;
`

const AuthorCourse = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 0;
  line-height: 1.4;
`

const TestimonialText = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.7;
  font-style: italic;
  margin: 0;

  strong {
    font-style: normal;
    font-weight: 600;
    color: #000080;
  }
`

const VideoCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
  cursor: pointer;

  img {
    width: 100%;
    display: block;
  }
`

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease;

  ${VideoCard}:hover & {
    opacity: 0.8;
  }
`

const PlayButtonWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(217, 83, 79, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  ${VideoCard}:hover & {
    transform: scale(1.1);
  }
`

const VideoCaption = styled.div`
  text-align: center;
  margin-top: 1rem;
`

const VideoAuthorName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000080;
  margin: 0 0 0.25rem 0;
`

const VideoAuthorCourse = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 0;
`

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
`

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #000080;
  background-color: ${({ active }) => (active ? '#000080' : 'transparent')};
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease;
`

// --- MOCK DATA ---
const stories = [
  {
    type: 'text',
    name: 'Dr. Amitabh Mehta',
    course: 'IIM Indore Executive Programme in Healthcare Management - Batch 04',
    testimonial:
      'I wanted to do a course for gaining insight into hospital and healthcare management. I have learnt a lot about general management, financial management and learnt the art of dealing with staff with whom I interact in my daily life.',
    title: 'Associate Consultant, Non-invasive Cardiology',
    image: 'https://placehold.co/150x150/e0e0e0/333?text=A.M.',
  },
  {
    type: 'video',
    name: 'Momita Chakraborty',
    course: 'IIM Calcutta Executive Programme in Business Management',
    videoThumbnail: 'https://placehold.co/800x450/d8d8d8/333?text=Video+Thumbnail',
  },
  {
    type: 'text',
    name: 'Jane Doe',
    course: 'Early Career Programme in Data Science',
    testimonial:
      'This program completely transformed my career path. The hands-on projects and mentorship were invaluable. I landed my dream job just weeks after graduating!',
    title: 'Data Scientist at TechCorp',
    image: 'https://placehold.co/150x150/f0e0e0/333?text=J.D.',
  },
  {
    type: 'video',
    name: 'John Smith',
    course: 'Executive Programme in Digital Marketing',
    videoThumbnail: 'https://placehold.co/800x450/e8d8d8/333?text=Video+Thumbnail',
  },
]

// --- MAIN COMPONENT ---
const SuccessStories = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [currentSlide, setCurrentSlide] = useState(0)

  const totalSlides = Math.ceil(stories.length / 2)

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(timer)
  }, [totalSlides])

  const startIndex = currentSlide * 2
  const currentStories = stories.slice(startIndex, startIndex + 2)

  return (
    <StoriesSection>
      <SectionHeader>
        <SubHeading>Alumni Speak</SubHeading>
        <MainHeading>Success Stories</MainHeading>
      </SectionHeader>

      <TabsContainer>
        <TabButton active={activeTab === 'All'} onClick={() => setActiveTab('All')}>
          All
        </TabButton>
        <TabButton active={activeTab === 'Early'} onClick={() => setActiveTab('Early')}>
          Early Career Courses
        </TabButton>
        <TabButton active={activeTab === 'Exec'} onClick={() => setActiveTab('Exec')}>
          Executive Education Courses
        </TabButton>
      </TabsContainer>

      <SliderContainer>
        <Slide>
          {currentStories.map((story, index) =>
            story.type === 'text' ? (
              <TestimonialCard key={index}>
                <AuthorInfo>
                  <AuthorImage src={story.image} alt={story.name} />
                  <AuthorDetails>
                    <AuthorName>{story.name}</AuthorName>
                    <AuthorCourse>{story.course}</AuthorCourse>
                  </AuthorDetails>
                </AuthorInfo>
                <TestimonialText>
                  <strong>{story.title}: </strong>"{story.testimonial}"
                </TestimonialText>
              </TestimonialCard>
            ) : (
              <div key={index}>
                <VideoCard>
                  <img src={story.videoThumbnail} alt={`Testimonial from ${story.name}`} />
                  <VideoOverlay>
                    <PlayButtonWrapper>
                      <PlayIcon />
                    </PlayButtonWrapper>
                  </VideoOverlay>
                </VideoCard>
                <VideoCaption>
                  <VideoAuthorName>{story.name}</VideoAuthorName>
                  <VideoAuthorCourse>{story.course}</VideoAuthorCourse>
                </VideoCaption>
              </div>
            )
          )}
        </Slide>
      </SliderContainer>

      <DotsContainer>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <Dot key={index} active={index === currentSlide} onClick={() => handleDotClick(index)} />
        ))}
      </DotsContainer>
    </StoriesSection>
  )
}

export default SuccessStories
