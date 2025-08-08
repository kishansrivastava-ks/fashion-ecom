import React, { useEffect, useMemo, useState } from 'react'
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

// --- Styled Components (with media queries for responsiveness) ---

const CoursesContainer = styled.section`
  background-color: #ffffff;
  padding: 3rem 0;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 2px solid red; */

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const SectionHeader = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    text-align: center;
  }
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

  @media (max-width: 768px) {
    strong {
      font-size: 1.75rem;
    }
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

  @media (max-width: 768px) {
    float: none;
    display: block;
    margin-top: 1rem;
    font-size: 1rem;
  }
`

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 2.5rem;
  width: 100%;
  max-width: 1300px;

  @media (max-width: 768px) {
    // Make the container scrollable horizontally on mobile
    overflow-x: auto;
    // Remove the default scrollbar for a cleaner UI
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
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
  white-space: nowrap; // Prevent text wrapping
  flex-shrink: 0; // Prevent buttons from shrinking in flex container

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

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`

const CoursesGrid = styled.div`
  display: grid;
  /* This is already responsive! It will create as many columns as fit that are at least 320px wide. */
  /* On mobile, this results in a single column layout automatically. */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1300px;
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

  @media (max-width: 480px) {
    padding: 1rem;
  }
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

// --- Component Data ---

const allCourses = [
  // Banking & Finance
  {
    id: 1,
    title: 'Banking Pro - Certificate Programme',
    brand: 'CCCOI',
    category: 'Banking & Finance',
    salary: '₹ 2,70,000 PA',
    rating: 4.9,
    imageUrl: '/images/courses/banking-programme.jpg',
  },
  {
    id: 2,
    title: 'Certified Financial Planner Program',
    brand: 'FinSchool',
    category: 'Banking & Finance',
    salary: '₹ 3,50,000 PA',
    rating: 4.8,
    imageUrl: '/images/courses/financial-plan.png',
  },
  {
    id: 3,
    title: 'Investment Banking Analyst Course',
    brand: 'WallStreet Prep',
    category: 'Banking & Finance',
    salary: '₹ 4,20,000 PA',
    rating: 4.9,
    imageUrl: '/images/courses/investment-banking.jpg',
  },
  // Operations & Supply Chain
  {
    id: 4,
    title: 'Certificate in Logistics Management',
    brand: 'CCCOI',
    category: 'Operations & Supply Chain',
    salary: '₹ 1,44,000 PA',
    rating: 4.8,
    imageUrl: '/images/courses/logistics-management.png',
  },
  {
    id: 5,
    title: 'PG in e-Commerce & Supply Chain',
    brand: 'CCCOI',
    category: 'Operations & Supply Chain',
    salary: '₹ 3,50,000 PA',
    rating: 4.8,
    imageUrl: '/images/courses/e-commerce.jpg',
  },
  {
    id: 6,
    title: 'Certificate in Logistics Planning',
    brand: 'Om Logistics',
    category: 'Operations & Supply Chain',
    salary: '₹ 2,40,000 PA',
    rating: 5.0,
    imageUrl: '/images/courses/logistics-planning.png',
  },
  // Technology & Analytics
  {
    id: 7,
    title: 'PG Advanced Certificate in Data Science',
    brand: 'CCCOI',
    category: 'Technology & Analytics',
    salary: '₹ 15,00,000 PA',
    rating: 4.9,
    imageUrl: '/images/courses/data-science.png',
  },
  {
    id: 8,
    title: 'Full Stack Web Development Course',
    brand: 'DevAcademy',
    category: 'Technology & Analytics',
    salary: '₹ 5,00,000 PA',
    rating: 5.0,
    imageUrl: '/images/courses/webd.png',
  },
  {
    id: 9,
    title: 'Cloud Computing & DevOps Certification',
    brand: 'CloudPro',
    category: 'Technology & Analytics',
    salary: '₹ 7,50,000 PA',
    rating: 4.8,
    imageUrl: '/images/courses/cloud.jpg',
  },
  // Healthcare
  {
    id: 10,
    title: 'Certificate in Occupational English for Nurses',
    brand: 'Jobizo',
    category: 'Healthcare',
    salary: '₹ 23,80,219 PA',
    rating: 4.8,
    imageUrl: '/images/courses/nurse.jpg',
  },
  {
    id: 11,
    title: 'Medical Coding and Billing Certificate',
    brand: 'HealthCode',
    category: 'Healthcare',
    salary: '₹ 3,00,000 PA',
    rating: 4.7,
    imageUrl: '/images/courses/medical-coding.png',
  },
  {
    id: 12,
    title: 'Hospital Administration Program',
    brand: 'Medversity',
    category: 'Healthcare',
    salary: '₹ 4,50,000 PA',
    rating: 4.8,
    imageUrl: '/images/courses/hospital.jpg',
  },
  // Hospitality
  {
    id: 13,
    title: 'Certificate in Hospitality & Hotel Management',
    brand: 'Marriott',
    category: 'Hospitality',
    salary: '₹ 2,50,000 PA',
    rating: 4.7,
    imageUrl: '/images/courses/hotel-management.png',
  },
  {
    id: 14,
    title: 'Aviation & Cabin Crew Training',
    brand: 'FlyHigh Academy',
    category: 'Hospitality',
    salary: '₹ 4,00,000 PA',
    rating: 4.9,
    imageUrl: '/images/courses/aviation.png',
  },
  {
    id: 15,
    title: 'Professional Chef Certification',
    brand: 'Le Cordon Bleu',
    category: 'Hospitality',
    salary: '₹ 3,80,000 PA',
    rating: 4.9,
    imageUrl: '/images/courses/chef.png',
  },
  // General Management
  {
    id: 16,
    title: 'BIMTECH PG Diploma in Management (Online)',
    brand: 'BIMTECH',
    category: 'General Management',
    salary: '₹ 5,00,000 PA',
    rating: 4.7,
    imageUrl: '/images/courses/management.jpg',
  },
  {
    id: 17,
    title: 'Certificate in Business Administration',
    brand: 'BizSchool',
    category: 'General Management',
    salary: '₹ 3,20,000 PA',
    rating: 4.6,
    imageUrl: '/images/courses/business-admin.jpg',
  },
  {
    id: 18,
    title: 'Startup & Entrepreneurship Program',
    brand: 'InnovateHub',
    category: 'General Management',
    salary: 'N/A',
    rating: 4.8,
    imageUrl: '/images/courses/startup.jpg',
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

// --- Main Component ---
const EarlyCareerCourses = () => {
  const [activeTab, setActiveTab] = useState('Popular')
  const [popularCourses, setPopularCourses] = useState([])

  // Effect to set the initial random popular courses
  useEffect(() => {
    const shuffled = [...allCourses].sort(() => 0.5 - Math.random())
    setPopularCourses(shuffled.slice(0, 3))
  }, [])

  // Filtering logic
  const filteredCourses = useMemo(() => {
    if (activeTab === 'Popular') {
      return popularCourses
    }
    return allCourses.filter((course) => course.category === activeTab)
  }, [activeTab, popularCourses])

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
        {filteredCourses.map((course) => (
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
