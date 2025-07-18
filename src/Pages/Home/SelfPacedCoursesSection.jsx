import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaStar } from 'react-icons/fa'

const tabs = [
  'Popular',
  'Technology & Analytics',
  'Banking & Finance',
  'Soft Skills',
  'Hospitality',
  'Web 3.0',
]

const sampleCourses = {
  Popular: [
    {
      image: '/images/web.png',
      title: 'Complete Data Science & Machine Learning Bootcamp',
      category: 'Technology & Analytics',
      price: '₹12,999',
      rating: 4.8,
    },
    {
      image: '/images/online-learning.jpg',
      title: 'Digital Marketing Masterclass - SEO, Social Media & Growth',
      category: 'Soft Skills',
      price: '₹8,999',
      rating: 4.7,
    },
    {
      image: '/images/mba.jpg',
      title: 'Blockchain & Cryptocurrency Fundamentals',
      category: 'Web 3.0',
      price: '₹15,999',
      rating: 4.9,
    },
  ],
  'Technology & Analytics': [
    {
      image: '/images/python.jpg',
      title: 'Python Programming for Data Analysis',
      category: 'Technology & Analytics',
      price: '₹9,999',
      rating: 4.6,
    },
    {
      image: '/images/ai.jpg',
      title: 'Artificial Intelligence & Deep Learning',
      category: 'Technology & Analytics',
      price: '₹18,999',
      rating: 4.8,
    },
    {
      image: '/images/cloud.jpg',
      title: 'Cloud Computing with AWS & Azure',
      category: 'Technology & Analytics',
      price: '₹14,999',
      rating: 4.7,
    },
  ],
  'Banking & Finance': [
    {
      image: '/images/financial-modeling.jpg',
      title: 'Financial Modeling & Investment Banking',
      category: 'Banking & Finance',
      price: '₹22,999',
      rating: 4.9,
    },
    {
      image: '/images/risk-management.jpg',
      title: 'Risk Management & Compliance',
      category: 'Banking & Finance',
      price: '₹16,999',
      rating: 4.6,
    },
    {
      image: '/images/fintech.jpg',
      title: 'FinTech Innovation & Digital Banking',
      category: 'Banking & Finance',
      price: '₹19,999',
      rating: 4.8,
    },
  ],
  'Soft Skills': [
    {
      image: '/images/leadership.jpg',
      title: 'Leadership & Team Management Excellence',
      category: 'Soft Skills',
      price: '₹11,999',
      rating: 4.7,
    },
    {
      image: '/images/communication.jpg',
      title: 'Effective Communication & Presentation Skills',
      category: 'Soft Skills',
      price: '₹7,999',
      rating: 4.5,
    },
    {
      image: '/images/negotiation.jpg',
      title: 'Negotiation & Conflict Resolution',
      category: 'Soft Skills',
      price: '₹9,999',
      rating: 4.6,
    },
  ],
  Hospitality: [
    {
      image: '/images/hotel-management.jpg',
      title: 'Hotel Operations & Guest Experience Management',
      category: 'Hospitality',
      price: '₹13,999',
      rating: 4.8,
    },
    {
      image: '/images/culinary.jpg',
      title: 'Culinary Arts & Restaurant Management',
      category: 'Hospitality',
      price: '₹17,999',
      rating: 4.7,
    },
    {
      image: '/images/tourism.jpg',
      title: 'Tourism & Travel Industry Management',
      category: 'Hospitality',
      price: '₹12,999',
      rating: 4.6,
    },
  ],
  'Web 3.0': [
    {
      image: '/images/nft.jpg',
      title: 'NFT Creation & Marketplace Development',
      category: 'Web 3.0',
      price: '₹24,999',
      rating: 4.9,
    },
    {
      image: '/images/defi.jpg',
      title: 'DeFi Protocols & Smart Contract Development',
      category: 'Web 3.0',
      price: '₹29,999',
      rating: 4.8,
    },
    {
      image: '/images/metaverse.jpg',
      title: 'Metaverse Development & Virtual Reality',
      category: 'Web 3.0',
      price: '₹32,999',
      rating: 4.7,
    },
  ],
}

const SelfPlacedCoursesSection = () => {
  const [activeTab, setActiveTab] = useState('Popular')

  return (
    <Wrapper>
      <Heading>
        <span>Get future ready at your convenience with</span>
        <strong>Self Placed Courses</strong>
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
              <Card
                key={index}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <ImageWrapper>
                  <LikeIcon as={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <FaHeart />
                  </LikeIcon>
                  <Badge
                    as={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    Self-Paced
                  </Badge>
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

      <ExploreButton
        as={motion.button}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
        whileTap={{ scale: 0.98 }}
      >
        Explore all Self Placed Courses
      </ExploreButton>
    </Wrapper>
  )
}

export default SelfPlacedCoursesSection

const Wrapper = styled.div`
  padding: 4rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
  /* background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); */
  border-radius: 20px;
  /* border: 1px solid red; */
`

const Heading = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  span {
    display: block;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.muted};
    margin-bottom: 0.5rem;
  }
  strong {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-top: 0.3rem;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`

const Tab = styled.button`
  background: ${({ isActive, theme }) =>
    isActive ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' : '#fff'};
  color: ${({ isActive, theme }) => (isActive ? '#fff' : theme.colors.text)};
  border: 2px solid ${({ isActive }) => (isActive ? 'transparent' : '#e9ecef')};
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  border-radius: 25px;
  transition: all 0.3s ease-in-out;
  box-shadow: ${({ isActive }) =>
    isActive ? '0 4px 15px rgba(102, 126, 234, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};

  &:hover {
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`

const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 2rem;
  gap: 1.5rem;
`

const Card = styled.div`
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border: 1px solid #f0f0f0;

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
`

const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const LikeIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 1rem;
  color: #e63946;
  z-index: 2;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e63946;
    color: white;
  }
`

const Badge = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(40, 167, 69, 0.9);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 15px;
  z-index: 2;
`

const CardTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1.2rem 1.2rem 0.5rem;
  line-height: 1.4;
  color: #2c3e50;
`

const CategoryTag = styled.div`
  font-size: 0.85rem;
  color: #667eea;
  padding: 0 1.2rem 0.8rem;
  font-weight: 500;
  border-bottom: 1px solid #f0f0f0;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  font-size: 0.95rem;
`

const Price = styled.div`
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: #495057;
`

const ExploreButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);

  &:hover {
    background: linear-gradient(45deg, #764ba2 0%, #667eea 100%);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }
`
