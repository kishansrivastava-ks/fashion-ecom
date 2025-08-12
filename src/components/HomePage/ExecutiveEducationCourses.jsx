import React, { useState } from 'react'
import styled from 'styled-components'

// ICONS...
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

// --- STYLED COMPONENTS (RESPONSIVE) ---
// Main container and section header
const CoursesContainer = styled.section`
  background-color: #ffffff;
  padding: 2rem 2rem;
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
  max-width: 1300px;
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
  color: #e55c20;
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

// Tabs responsive
const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 1300px;

  @media (max-width: 1024px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
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
        background-color: #f7f7f7;
        color: #555;
        &:hover {
          background-color: #e9e9e9;
          border-color: #ccc;
        }
      `}
  @media (max-width: 1024px) {
    font-size: 0.92rem;
    padding: 0.6rem 1rem;
  }
`

// Responsive grid
const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1300px;
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
  padding-top: 56.25%; /* 16:9 */
`
const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    margin-bottom: 1rem;
  }
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
  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
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

// --- DATA ---
const coursesData = {
  Popular: [
    {
      id: 1,
      title: 'IIM Kozhikode Professional Certificate Programme in Fintech - Batch 07',
      institution: 'IIM Kozhikode',
      startsIn: '7 days',
      fee: '₹ 2,10,000',
      rating: 4.9,
      imageUrl: '/images/courses/fintech.jpg',
    },
    {
      id: 2,
      title: 'IIM Calcutta Executive Programme in Business Management - Batch 31',
      institution: 'IIM Calcutta',
      startsIn: '14 days',
      fee: '₹ 7,02,000',
      rating: 4.9,
      imageUrl: '/images/courses/business-management.jpg',
    },
    {
      id: 3,
      title: 'IIM Nagpur Certificate Programme in Project Management - Batch 07',
      institution: 'IIM Nagpur',
      startsIn: '41 days',
      fee: '₹ 1,35,000',
      rating: 4.9,
      imageUrl: '/images/courses/project-management.jpg',
    },
  ],
  'Technology & Analytics': [
    {
      id: 4,
      title: 'IIT Delhi Executive Programme in Data Science & AI - Batch 12',
      institution: 'IIT Delhi',
      startsIn: '10 days',
      fee: '₹ 3,50,000',
      rating: 4.8,
      imageUrl: '/images/courses/iitd.jpg',
    },
    {
      id: 5,
      title: 'IIM Bangalore Advanced Certificate in Machine Learning - Batch 08',
      institution: 'IIM Bangalore',
      startsIn: '21 days',
      fee: '₹ 2,75,000',
      rating: 4.7,
      imageUrl: '/images/courses/iimb.webp',
    },
    {
      id: 6,
      title: 'ISB Professional Certificate in Business Analytics - Batch 15',
      institution: 'ISB Hyderabad',
      startsIn: '35 days',
      fee: '₹ 1,95,000',
      rating: 4.8,
      imageUrl: '/images/courses/business-analytics.jpg',
    },
  ],
  'Leadership & Strategy': [
    {
      id: 7,
      title: 'IIM Ahmedabad Advanced Management Programme - Batch 45',
      institution: 'IIM Ahmedabad',
      startsIn: '5 days',
      fee: '₹ 8,50,000',
      rating: 4.9,
      imageUrl: 'https://placehold.co/600x400/e74c3c/333?text=Leadership+AMP',
    },
    {
      id: 8,
      title: 'XLRI Executive Programme in Strategic Leadership - Batch 22',
      institution: 'XLRI Jamshedpur',
      startsIn: '18 days',
      fee: '₹ 6,25,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/f39c12/333?text=Strategic+Leadership',
    },
    {
      id: 9,
      title: 'FMS Delhi Certificate in Corporate Strategy - Batch 11',
      institution: 'FMS Delhi',
      startsIn: '30 days',
      fee: '₹ 3,75,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/1abc9c/333?text=Corporate+Strategy',
    },
  ],
  'General Management': [
    {
      id: 10,
      title: 'IIM Lucknow General Management Programme - Batch 28',
      institution: 'IIM Lucknow',
      startsIn: '12 days',
      fee: '₹ 4,50,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/34495e/333?text=General+Management',
    },
    {
      id: 11,
      title: 'MDI Gurgaon Executive Development Programme - Batch 19',
      institution: 'MDI Gurgaon',
      startsIn: '25 days',
      fee: '₹ 3,25,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/8e44ad/333?text=Executive+Dev',
    },
    {
      id: 12,
      title: 'SPJIMR Advanced General Management - Batch 16',
      institution: 'SPJIMR Mumbai',
      startsIn: '38 days',
      fee: '₹ 5,75,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/d35400/333?text=Advanced+GM',
    },
  ],
  'Operations & Supply Chain': [
    {
      id: 13,
      title: 'IIM Indore Certificate in Supply Chain Management - Batch 09',
      institution: 'IIM Indore',
      startsIn: '8 days',
      fee: '₹ 2,85,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/27ae60/333?text=Supply+Chain',
    },
    {
      id: 14,
      title: 'NITIE Operations Excellence Programme - Batch 13',
      institution: 'NITIE Mumbai',
      startsIn: '22 days',
      fee: '₹ 3,15,000',
      rating: 4.6,
      imageUrl: 'https://placehold.co/600x400/2980b9/333?text=Operations+Excel',
    },
    {
      id: 15,
      title: 'IIT Bombay Advanced Operations Management - Batch 07',
      institution: 'IIT Bombay',
      startsIn: '45 days',
      fee: '₹ 2,45,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/16a085/333?text=Advanced+Ops',
    },
  ],
  'Marketing & Sales': [
    {
      id: 16,
      title: 'IIM Calcutta Advanced Marketing Programme - Batch 24',
      institution: 'IIM Calcutta',
      startsIn: '6 days',
      fee: '₹ 4,25,000',
      rating: 4.9,
      imageUrl: 'https://placehold.co/600x400/e67e22/333?text=Marketing+Prog',
    },
    {
      id: 17,
      title: 'MICA Certificate in Digital Marketing - Batch 18',
      institution: 'MICA Ahmedabad',
      startsIn: '19 days',
      fee: '₹ 1,85,000',
      rating: 4.6,
      imageUrl: 'https://placehold.co/600x400/9c88ff/333?text=Digital+Marketing',
    },
    {
      id: 18,
      title: 'ISB Sales Leadership Programme - Batch 12',
      institution: 'ISB Hyderabad',
      startsIn: '33 days',
      fee: '₹ 3,95,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/ff6b6b/333?text=Sales+Leadership',
    },
  ],
  MBA: [
    {
      id: 19,
      title: 'IIM Kozhikode Executive MBA Programme - Batch 17',
      institution: 'IIM Kozhikode',
      startsIn: '15 days',
      fee: '₹ 12,50,000',
      rating: 4.9,
      imageUrl: 'https://placehold.co/600x400/4ecdc4/333?text=Executive+MBA',
    },
    {
      id: 20,
      title: 'FMS Delhi Weekend MBA Programme - Batch 09',
      institution: 'FMS Delhi',
      startsIn: '28 days',
      fee: '₹ 8,75,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/45b7d1/333?text=Weekend+MBA',
    },
    {
      id: 21,
      title: 'XLRI Global MBA Programme - Batch 06',
      institution: 'XLRI Jamshedpur',
      startsIn: '42 days',
      fee: '₹ 15,25,000',
      rating: 4.9,
      imageUrl: 'https://placehold.co/600x400/f7b731/333?text=Global+MBA',
    },
  ],
  'Banking & Finance': [
    {
      id: 22,
      title: 'IIM Bangalore Advanced Programme in Banking - Batch 14',
      institution: 'IIM Bangalore',
      startsIn: '9 days',
      fee: '₹ 3,65,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/5f27cd/333?text=Banking+Prog',
    },
    {
      id: 23,
      title: 'JBIMS Certificate in Financial Management - Batch 21',
      institution: 'JBIMS Mumbai',
      startsIn: '23 days',
      fee: '₹ 2,25,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/00d2d3/333?text=Financial+Mgmt',
    },
    {
      id: 24,
      title: 'ISB Risk Management Programme - Batch 08',
      institution: 'ISB Hyderabad',
      startsIn: '36 days',
      fee: '₹ 4,15,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/ff9ff3/333?text=Risk+Management',
    },
  ],
  'Innovation & Transformation': [
    {
      id: 25,
      title: 'IIT Delhi Innovation Leadership Programme - Batch 05',
      institution: 'IIT Delhi',
      startsIn: '11 days',
      fee: '₹ 3,85,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/54a0ff/333?text=Innovation+Lead',
    },
    {
      id: 26,
      title: 'IIM Ahmedabad Digital Transformation - Batch 10',
      institution: 'IIM Ahmedabad',
      startsIn: '26 days',
      fee: '₹ 4,95,000',
      rating: 4.9,
      imageUrl: 'https://placehold.co/600x400/2ed573/333?text=Digital+Transform',
    },
    {
      id: 27,
      title: 'BITS Pilani Innovation Management - Batch 07',
      institution: 'BITS Pilani',
      startsIn: '39 days',
      fee: '₹ 2,65,000',
      rating: 4.6,
      imageUrl: 'https://placehold.co/600x400/ffa502/333?text=Innovation+Mgmt',
    },
  ],
  'Human Resources': [
    {
      id: 28,
      title: 'XLRI Advanced HR Management Programme - Batch 26',
      institution: 'XLRI Jamshedpur',
      startsIn: '7 days',
      fee: '₹ 3,45,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/ff6348/333?text=HR+Management',
    },
    {
      id: 29,
      title: 'TISS Strategic HR Leadership - Batch 15',
      institution: 'TISS Mumbai',
      startsIn: '20 days',
      fee: '₹ 2,95,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/ff4757/333?text=HR+Leadership',
    },
    {
      id: 30,
      title: 'MDI Gurgaon People Analytics Programme - Batch 11',
      institution: 'MDI Gurgaon',
      startsIn: '34 days',
      fee: '₹ 1,75,000',
      rating: 4.6,
      imageUrl: 'https://placehold.co/600x400/5352ed/333?text=People+Analytics',
    },
  ],
  Healthcare: [
    {
      id: 31,
      title: 'IIHMR Healthcare Management Programme - Batch 12',
      institution: 'IIHMR Delhi',
      startsIn: '13 days',
      fee: '₹ 2,85,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/3742fa/333?text=Healthcare+Mgmt',
    },
    {
      id: 32,
      title: 'IIM Lucknow Hospital Administration - Batch 08',
      institution: 'IIM Lucknow',
      startsIn: '27 days',
      fee: '₹ 3,25,000',
      rating: 4.6,
      imageUrl: 'https://placehold.co/600x400/2f3542/333?text=Hospital+Admin',
    },
    {
      id: 33,
      title: 'AIIMS Healthcare Leadership Programme - Batch 06',
      institution: 'AIIMS Delhi',
      startsIn: '40 days',
      fee: '₹ 2,15,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/ff3838/333?text=Healthcare+Lead',
    },
  ],
  'Product Management': [
    {
      id: 34,
      title: 'ISB Product Strategy & Innovation - Batch 09',
      institution: 'ISB Hyderabad',
      startsIn: '16 days',
      fee: '₹ 2,55,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/7bed9f/333?text=Product+Strategy',
    },
    {
      id: 35,
      title: 'IIT Bombay Digital Product Management - Batch 11',
      institution: 'IIT Bombay',
      startsIn: '29 days',
      fee: '₹ 1,95,000',
      rating: 4.6,
      imageUrl: 'https://placehold.co/600x400/70a1ff/333?text=Digital+Product',
    },
    {
      id: 36,
      title: 'IIM Bangalore Product Leadership - Batch 13',
      institution: 'IIM Bangalore',
      startsIn: '37 days',
      fee: '₹ 3,05,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/57606f/333?text=Product+Lead',
    },
  ],
  'Web 3.0': [
    {
      id: 37,
      title: 'IIT Delhi Blockchain & Web 3.0 Programme - Batch 04',
      institution: 'IIT Delhi',
      startsIn: '17 days',
      fee: '₹ 1,85,000',
      rating: 4.5,
      imageUrl: 'https://placehold.co/600x400/ffd32a/333?text=Blockchain+Web3',
    },
    {
      id: 38,
      title: 'IIM Kozhikode Cryptocurrency & DeFi - Batch 03',
      institution: 'IIM Kozhikode',
      startsIn: '31 days',
      fee: '₹ 1,45,000',
      rating: 4.4,
      imageUrl: 'https://placehold.co/600x400/ff9500/333?text=Crypto+DeFi',
    },
    {
      id: 39,
      title: 'BITS Pilani NFT & Metaverse Programme - Batch 02',
      institution: 'BITS Pilani',
      startsIn: '44 days',
      fee: '₹ 1,25,000',
      rating: 4.3,
      imageUrl: 'https://placehold.co/600x400/c44569/333?text=NFT+Metaverse',
    },
  ],
  Law: [
    {
      id: 40,
      title: 'NLSIU Corporate Law Programme - Batch 18',
      institution: 'NLSIU Bangalore',
      startsIn: '24 days',
      fee: '₹ 2,75,000',
      rating: 4.8,
      imageUrl: 'https://placehold.co/600x400/786fa6/333?text=Corporate+Law',
    },
    {
      id: 41,
      title: 'NALSAR IP & Technology Law - Batch 09',
      institution: 'NALSAR Hyderabad',
      startsIn: '32 days',
      fee: '₹ 1,95,000',
      rating: 4.7,
      imageUrl: 'https://placehold.co/600x400/f8b500/333?text=IP+Tech+Law',
    },
    {
      id: 42,
      title: 'NUJS Banking & Finance Law - Batch 14',
      institution: 'NUJS Kolkata',
      startsIn: '46 days',
      fee: '₹ 2,35,000',
      rating: 4.6,
      imageUrl: 'https://placehold.co/600x400/4b7bec/333?text=Banking+Law',
    },
  ],
}

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

// --- COMPONENT ---
const ExecutiveEducationCourses = () => {
  const [activeTab, setActiveTab] = useState('Popular')
  const currentCourses = coursesData[activeTab] || []
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
        {currentCourses.map((course) => (
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
