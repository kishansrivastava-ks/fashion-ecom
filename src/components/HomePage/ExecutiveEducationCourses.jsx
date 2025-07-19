import React, { useState } from 'react'
import styled from 'styled-components'

// --- ICONS (in a real app, use an icon library) ---
const StarIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? '#F5A623' : '#E0E0E0'}
    stroke="none"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

const InstitutionIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#666"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <path d="M2 17l10 5 10-5"></path>
    <path d="M2 12l10 5 10-5"></path>
  </svg>
)

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#666"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

// --- STYLED COMPONENTS ---
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
  position: relative;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #e55c20; // An orange color
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
  position: absolute;
  top: 10px;
  right: 0;
  color: #000080;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`

// --- Updated Tab Styles ---
const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 1200px;
`

const TabButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem; /* Smaller font size */
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 6px; /* Rectangular with slightly rounded corners */
  transition: all 0.3s ease;
  font-weight: 500;

  ${({ active }) =>
    active
      ? `
        background-color: #000080; /* Active tab background */
        color: #ffffff; /* Active tab text color */
        border-color: #000080;
      `
      : `
        background-color: #f7f7f7; /* Inactive tab background */
        color: #555; /* Inactive tab text color */
        &:hover {
          background-color: #e9e9e9;
          border-color: #ccc;
        }
      `}
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
  min-height: 44px;
`

const InstitutionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #555;
  font-size: 0.9rem;
`

const InstitutionName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StartDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CardFooter = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FeeInfo = styled.div`
  font-size: 0.8rem;
  color: #666;

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

// --- MOCK DATA ---
const courses = [
  {
    id: 1,
    title: 'IIM Kozhikode Professional Certificate Programme in Fintech - Batch 07',
    institution: 'IIM Kozhikode',
    startsIn: '7 days',
    fee: '₹ 2,10,000',
    rating: 4.9,
    imageUrl: 'https://placehold.co/600x400/bdc3c7/333?text=Fintech+Course',
  },
  {
    id: 2,
    title: 'IIM Calcutta Executive Programme in Business Management - Batch 31',
    institution: 'IIM Calcutta',
    startsIn: '14 days',
    fee: '₹ 7,02,000',
    rating: 4.9,
    imageUrl: 'https://placehold.co/600x400/95a5a6/333?text=Business+Mngmt',
  },
  {
    id: 3,
    title: 'IIM Nagpur Certificate Programme in Project Management - Batch 07',
    institution: 'IIM Nagpur',
    startsIn: '41 days',
    fee: '₹ 1,35,000',
    rating: 4.9,
    imageUrl: 'https://placehold.co/600x400/7f8c8d/333?text=Project+Mngmt',
  },
]

const tabs = [
  'Popular',
  'Technology & Analytics',
  'Leadership & Strategy',
  'General Management',
  'Operations & Supply Chain',
  'Marketing & Sales',
  'MBA',
  'Banking & Finance',
  'Innovation & Transformation',
  'Human Resources',
  'Healthcare',
  'Product Management',
  'Web 3.0',
  'Law',
]

// --- MAIN COMPONENT ---
const ExecutiveEducationCourses = () => {
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
        <TopLink href="#">Explore All Executive Education Courses →</TopLink>
        <SectionTitle>
          Scale Up Your Career With
          <strong>Executive Education Courses</strong>
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
              <InstitutionInfo>
                <InstitutionName>
                  <InstitutionIcon />
                  {course.institution}
                </InstitutionName>
                <StartDate>
                  <CalendarIcon />
                  Starts in {course.startsIn}
                </StartDate>
              </InstitutionInfo>
              <CardFooter>
                <FeeInfo>
                  Course Fee
                  <strong>{course.fee}</strong>
                </FeeInfo>
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

export default ExecutiveEducationCourses
