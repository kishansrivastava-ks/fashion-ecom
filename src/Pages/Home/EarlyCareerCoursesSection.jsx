import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaStar } from 'react-icons/fa'

const tabs = [
  'Popular',
  'Banking and Finance',
  'Operations and supply chain',
  'Technology & Analytics',
  'Healthcare',
  'Hospitality',
  'General Management',
]

const sampleCourses = {
  Popular: [
    {
      image: '/images/banking.png',
      title: 'Banking Pro - Certificate Programme in Banking, Financial Services & Insurance',
      category: 'Banking and Finance',
      price: '₹14,999',
      rating: 4.5,
    },
    {
      image: '/images/banking.png',
      title: 'Tech Bootcamp - Full Stack Development & Analytics Essentials',
      category: 'Technology & Analytics',
      price: '₹21,000',
      rating: 4.8,
    },
    {
      image: '/images/banking.png',
      title: 'Healthcare Operations - Essentials of Patient Care & Hospital Management',
      category: 'Healthcare',
      price: '₹17,499',
      rating: 4.2,
    },
  ],
  'Banking and Finance': [
    /* ...you can copy/duplicate */
  ],
  'Operations and supply chain': [
    /* ... */
  ],
  'Technology & Analytics': [
    /* ... */
  ],
  Healthcare: [
    /* ... */
  ],
  Hospitality: [
    /* ... */
  ],
  'General Management': [
    /* ... */
  ],
}

const EarlyCareerCoursesSection = () => {
  const [activeTab, setActiveTab] = useState('Popular')

  return (
    <Wrapper>
      <Heading>
        <span>Become job ready with</span>
        <strong>Early Career Courses</strong>
      </Heading>

      <Tabs>
        {tabs.map((tab) => (
          <Tab key={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </Tabs>

      <CardsContainer>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', gap: '1.5rem', width: '100%' }}
          >
            {sampleCourses[activeTab]?.slice(0, 3).map((course, index) => (
              <Card key={index}>
                <ImageWrapper>
                  <LikeIcon>
                    <FaHeart />
                  </LikeIcon>
                  <Badge>Admission Open</Badge>
                  <CourseImage src={course.image} alt={course.title} />
                </ImageWrapper>

                <CardTitle>{course.title}</CardTitle>
                <CategoryTag>{course.category}</CategoryTag>
                <CardFooter>
                  <Price>{course.price}</Price>
                  <Rating>
                    <FaStar color="#FFD700" size={14} /> {course.rating}
                  </Rating>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </CardsContainer>

      <ExploreButton>Explore all Early Career Courses</ExploreButton>
    </Wrapper>
  )
}

export default EarlyCareerCoursesSection

const Wrapper = styled.div`
  padding: 4rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
`

const Heading = styled.div`
  margin-bottom: 2rem;
  span {
    display: block;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  strong {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-top: 0.3rem;
  }
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`

const Tab = styled.button`
  background: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.light)};
  color: ${({ isActive, theme }) => (isActive ? '#fff' : theme.colors.text)};
  border: none;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`

const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 2rem;
`

const Card = styled.div`
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`

const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const LikeIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 50%;
  padding: 0.4rem;
  font-size: 0.9rem;
  color: #e63946;
  z-index: 2;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Badge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  z-index: 2;
`

const CardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  line-height: 1.4;
`

const CategoryTag = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 1rem 0.5rem;
  border-bottom: 1px solid #eee;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1rem 1rem;
  font-size: 0.9rem;
`

const Price = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 500;
`

const ExploreButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  transition: background 0.2s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`
