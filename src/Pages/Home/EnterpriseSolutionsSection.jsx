import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  FaArrowRight,
  FaBuilding,
  FaGraduationCap,
  FaLaptopCode,
  FaFileAlt,
  FaCogs,
  FaUsers,
} from 'react-icons/fa'

const enterpriseSolutions = [
  {
    id: 1,
    title: 'Organisational Development Consulting',
    description:
      'Transform your organization with strategic consulting services that drive cultural change, improve performance, and align teams with business objectives for sustainable growth.',
    image: '/images/banking.png',
    icon: <FaBuilding />,
  },
  {
    id: 2,
    title: 'Executive Education @ Work',
    description:
      'Bring world-class executive education directly to your workplace with customized programs designed to develop leadership skills and strategic thinking capabilities.',
    image: '/images/mba.jpg',
    icon: <FaGraduationCap />,
  },
  {
    id: 3,
    title: 'Learning Experience Platform (LXP)',
    description:
      'Leverage cutting-edge technology to deliver personalized learning experiences that adapt to individual needs and drive measurable business outcomes.',
    image: '/images/online-learning.jpg',
    icon: <FaLaptopCode />,
  },
  {
    id: 4,
    title: 'Content Solutions',
    description:
      'Access comprehensive content libraries and custom-developed materials that align with your industry needs and organizational learning objectives.',
    image: '/images/web.png',
    icon: <FaFileAlt />,
  },
  {
    id: 5,
    title: 'Technology Programmes',
    description:
      'Stay ahead of the digital curve with specialized technology programs covering emerging trends, digital transformation, and innovation management.',
    image: '/images/mba.jpg',
    icon: <FaCogs />,
  },
  {
    id: 6,
    title: 'L&D Solutions',
    description:
      'Comprehensive Learning & Development solutions that encompass strategy, implementation, and measurement to build a skilled and engaged workforce.',
    image: '/images/online-learning.jpg',
    icon: <FaUsers />,
  },
]

const EnterpriseSolutionsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Wrapper>
      <Heading>
        <span>Achieve organizational growth with</span>
        <strong>Enterprise Solutions</strong>
      </Heading>

      <GridContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {enterpriseSolutions.map((solution) => (
          <Card
            key={solution.id}
            as={motion.div}
            variants={cardVariants}
            whileHover={{
              y: -5,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            }}
            transition={{ duration: 0.3 }}
          >
            <ImageColumn>
              <IconOverlay>{solution.icon}</IconOverlay>
              <CardImage src={solution.image} alt={solution.title} />
            </ImageColumn>

            <ContentColumn>
              <CardTitle>{solution.title}</CardTitle>
              <CardDescription>{solution.description}</CardDescription>
              <KnowMoreButton
                as={motion.button}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#5a67d8',
                }}
                whileTap={{ scale: 0.98 }}
              >
                Know More
                <ArrowIcon as={motion.div} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <FaArrowRight />
                </ArrowIcon>
              </KnowMoreButton>
            </ContentColumn>
          </Card>
        ))}
      </GridContainer>
    </Wrapper>
  )
}

export default EnterpriseSolutionsSection

const Wrapper = styled.div`
  padding: 4rem 4rem;
  max-width: 1500px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  /* border-radius: 20px; */
`

const Heading = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  span {
    display: block;
    font-size: 1.3rem;
    color: #64748b;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  strong {
    display: block;
    font-size: 2.8rem;
    font-weight: 700;
    color: #1e293b;
    margin-top: 0.3rem;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr);
  }
`

const Card = styled.div`
  display: flex;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  border: 1px solid #e2e8f0;
  min-height: 200px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`

const ImageColumn = styled.div`
  flex: 0 0 40%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const IconOverlay = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 0.8rem;
  font-size: 1.2rem;
  color: #667eea;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentColumn = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
`

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  line-height: 1.3;
`

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`

const KnowMoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  align-self: flex-start;

  &:hover {
    background: #5a67d8;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  transition: transform 0.2s ease-in-out;
`
