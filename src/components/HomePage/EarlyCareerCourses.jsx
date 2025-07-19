import React, { useState } from 'react'
import styled from 'styled-components'

// Helper for icons - in a real app, you'd use an icon library like react-icons
const StarIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? '#F5A623' : '#E0E0E0'}
    stroke="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

// Styled Components
const CoursesContainer = styled.section`
  background-color: #ffffff;
  padding: 4rem 2rem;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
  font-weight: normal;

  strong {
    font-size: 2rem;
    color: #000080; // A navy blue color
    display: block;
    font-weight: bold;
  }
`

const TopLink = styled.a`
  float: right;
  color: #000080;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 1200px;
`

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: #666;
  margin-right: 1rem;
  transition: all 0.3s ease;

  ${({ active }) =>
    active &&
    `
    border-bottom-color: #000080;
    color: #000080;
    font-weight: bold;
  `}

  &:hover {
    color: #000080;
  }
`

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`

const CourseCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const AdmissionButton = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
`

const HeartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const CourseTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  min-height: 44px; // Ensures alignment for 2-line titles
`

const TagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const BrandTag = styled.span`
  color: #555;
  font-size: 0.9rem;
`

const CategoryTag = styled.span`
  background-color: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
`

const CardFooter = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`

const SalaryInfo = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;

  strong {
    font-size: 1.2rem;
    color: #333;
    font-weight: bold;
    display: block;
  }
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Stars = styled.div`
  display: flex;
  gap: 2px;
`

const RatingText = styled.span`
  margin-left: 0.5rem;
  font-size: 0.9rem;
  color: #555;
`

// Mock Data
const courses = [
  {
    id: 1,
    title: 'Banking Pro - Certificate Programme in Banking, Financial Services, & Insurance',
    brand: 'TimesPro',
    category: 'Banking & Finance',
    salary: '₹ 2,70,000 PA',
    rating: 4.9,
    imageUrl: 'https://placehold.co/600x400/E0F2F1/333?text=Course+Image+1',
  },
  {
    id: 2,
    title: 'Certificate in Logistics and Supply Chain Management',
    brand: 'TimesPro',
    category: 'Operations & Supply Chain',
    salary: '₹ 1,44,000 PA',
    rating: 4.8,
    imageUrl: 'https://placehold.co/600x400/E3F2FD/333?text=Course+Image+2',
  },
  {
    id: 3,
    title: 'Certificate Programme in Hospitality and Hotel Management',
    brand: 'Marriott International',
    category: 'Hospitality',
    salary: '₹ 2,50,000 PA',
    rating: 4.7,
    imageUrl: 'https://placehold.co/600x400/FCE4EC/333?text=Course+Image+3',
  },
]

const tabs = [
  'Popular',
  'Banking & Finance',
  'Operations & Supply Chain',
  'Technology & Analytics',
  'Healthcare',
  'Hospitality',
  'General Management',
]

// Main Component
const EarlyCareerCourses = () => {
  const [activeTab, setActiveTab] = useState('Popular')

  const renderStars = (rating) => {
    const totalStars = 5
    let stars = []
    for (let i = 1; i <= totalStars; i++) {
      stars.push(<StarIcon key={i} filled={i <= rating} />)
    }
    return stars
  }

  return (
    <CoursesContainer>
      <SectionHeader>
        <TopLink href="#">Explore All Early Career Courses →</TopLink>
        <SectionTitle>
          Become job-ready with
          <strong>Early Career Courses</strong>
        </SectionTitle>
      </SectionHeader>

      <TabsContainer>
        {tabs.map((tab) => (
          <TabButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </TabButton>
        ))}
      </TabsContainer>

      <CoursesGrid>
        {courses.map((course) => (
          <CourseCard key={course.id}>
            <CardImageContainer>
              <CardImage src={course.imageUrl} alt={course.title} />
              <HeartButton>
                <HeartIcon />
              </HeartButton>
              <AdmissionButton>Admission Open</AdmissionButton>
            </CardImageContainer>
            <CardContent>
              <CourseTitle>{course.title}</CourseTitle>
              <TagsContainer>
                <BrandTag>{course.brand}</BrandTag>
                <CategoryTag>{course.category}</CategoryTag>
              </TagsContainer>
              <CardFooter>
                <SalaryInfo>
                  Salary Upto:
                  <strong>{course.salary}</strong>
                </SalaryInfo>
                <RatingContainer>
                  <Stars>{renderStars(course.rating)}</Stars>
                  <RatingText>({course.rating})</RatingText>
                </RatingContainer>
              </CardFooter>
            </CardContent>
          </CourseCard>
        ))}
      </CoursesGrid>
    </CoursesContainer>
  )
}

export default EarlyCareerCourses
