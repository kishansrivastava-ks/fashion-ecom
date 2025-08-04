import React, { useState } from 'react'
import styled from 'styled-components'

// --- STYLED COMPONENTS (RESPONSIVE) ---
const CoursesContainer = styled.section`
  background-color: #f9f9f9;
  padding: 4rem 2rem;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    padding: 3rem 1rem;
  }
`
const SectionHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 600px) {
    align-items: flex-start;
    gap: 0.6rem;
    margin-bottom: 1rem;
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
  @media (max-width: 600px) {
    position: static;
    align-self: flex-end;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }
`
const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
  font-weight: normal;

  strong {
    font-size: 2rem;
    color: #000080;
    display: block;
    font-weight: bold;
  }
  @media (max-width: 600px) {
    font-size: 1.1rem;
    strong {
      font-size: 1.25rem;
    }
  }
`

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1024px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`
const TabButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;

  ${({ active }) =>
    active
      ? `
        background-color: #000080;
        color: #ffffff;
        border-color: #000080;
      `
      : `
        background-color: #ffffff;
        color: #555;
        &:hover {
          background-color: #f0f0f0;
          border-color: #ccc;
        }
      `}
  @media (max-width: 1024px) {
    font-size: 0.92rem;
    padding: 0.6rem 1rem;
  }
`
const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  @media (max-width: 600px) {
    gap: 1.25rem;
  }
`
const CourseCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`
const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
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
const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`
const CourseTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
  min-height: 44px;
`
const BrandTag = styled.span`
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`
const CardFooter = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
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

// --- MOCK DATA ---
const courses = [
  {
    id: 1,
    title: 'Certificate Program in Full Stack Web Development',
    brand: 'CCCOI',
    fee: '₹ 9,499',
    imageUrl: '/images/courses/webd.png',
  },
  {
    id: 2,
    title: 'Certificate Program in Data Analytics and Data Visualisation',
    brand: 'CCCOI',
    fee: '₹ 1,999',
    imageUrl: '/images/courses/data-analytics.jpg',
  },
  {
    id: 3,
    title: 'Certificate Program in Data Science and Artificial Intelligence',
    brand: 'CCCOI',
    fee: '₹ 11,999',
    imageUrl: '/images/courses/data-science.png',
  },
]
const tabs = [
  'Popular',
  'Technology & Analytics',
  'Banking & Finance',
  'Soft skills',
  'Hospitality',
  'Operations & Supply Chain',
  'Web 3.0',
]

// --- MAIN COMPONENT ---
const SelfPacedCourses = () => {
  const [activeTab, setActiveTab] = useState('Popular')

  return (
    <CoursesContainer>
      <SectionHeader>
        <TopLink href="#">Explore All Self-Paced Courses →</TopLink>
        <SectionTitle>
          Get future ready at your convenience with
          <strong>Self-Paced Courses</strong>
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
              <AdmissionButton>Admission Open</AdmissionButton>
            </CardImageContainer>
            <CardContent>
              <CourseTitle>{course.title}</CourseTitle>
              <BrandTag>{course.brand}</BrandTag>
              <CardFooter>
                <FeeInfo>
                  Course Fee
                  <strong>{course.fee}</strong>
                </FeeInfo>
              </CardFooter>
            </CardContent>
          </CourseCard>
        ))}
      </CoursesGrid>
    </CoursesContainer>
  )
}

export default SelfPacedCourses
