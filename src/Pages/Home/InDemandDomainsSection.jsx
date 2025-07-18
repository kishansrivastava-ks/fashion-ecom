import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  FaUsers,
  FaGraduationCap,
  FaChess,
  FaLaptopCode,
  FaCogs,
  FaUniversity,
  FaChartLine,
  FaHeartbeat,
  FaRocket,
} from 'react-icons/fa'

const domains = [
  {
    id: 1,
    title: 'General Management',
    courses: 45,
    icon: <FaUsers />,
    color: '#667eea',
  },
  {
    id: 2,
    title: 'MBA',
    courses: 28,
    icon: <FaGraduationCap />,
    color: '#f093fb',
  },
  {
    id: 3,
    title: 'Leadership & Strategy',
    courses: 32,
    icon: <FaChess />,
    color: '#4facfe',
  },
  {
    id: 4,
    title: 'Technology & Analytics',
    courses: 67,
    icon: <FaLaptopCode />,
    color: '#43e97b',
  },
  {
    id: 5,
    title: 'Operations & Supply Chain',
    courses: 24,
    icon: <FaCogs />,
    color: '#fa709a',
  },
  {
    id: 6,
    title: 'Banking & Finance',
    courses: 41,
    icon: <FaUniversity />,
    color: '#fee140',
  },
  {
    id: 7,
    title: 'Marketing & Sales',
    courses: 35,
    icon: <FaChartLine />,
    color: '#a8edea',
  },
  {
    id: 8,
    title: 'Healthcare',
    courses: 19,
    icon: <FaHeartbeat />,
    color: '#ffecd2',
  },
  {
    id: 9,
    title: 'Product Management',
    courses: 26,
    icon: <FaRocket />,
    color: '#ff9a9e',
  },
]

const InDemandDomainsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Wrapper>
      <Heading>
        <span>Select courses from</span>
        <strong>In Demand Domains</strong>
      </Heading>

      <GridContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {domains.map((domain) => (
          <Card
            key={domain.id}
            as={motion.div}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            color={domain.color}
          >
            <IconContainer color={domain.color}>{domain.icon}</IconContainer>

            <ContentContainer>
              <CardTitle>{domain.title}</CardTitle>
              <CourseCount>{domain.courses} Courses</CourseCount>
            </ContentContainer>

            <HoverOverlay />
          </Card>
        ))}
      </GridContainer>

      <ViewAllButton
        as={motion.button}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
        }}
        whileTap={{ scale: 0.98 }}
      >
        View All Courses
      </ViewAllButton>
    </Wrapper>
  )
}

export default InDemandDomainsSection

const Wrapper = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #fafbfc;
  border-radius: 20px;
`

const Heading = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  span {
    display: block;
    font-size: 1.2rem;
    color: #64748b;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  strong {
    display: block;
    font-size: 2.5rem;
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid #f1f5f9;
  overflow: hidden;
  min-height: 80px;

  &:hover {
    border-color: ${(props) => props.color};
    transform: translateY(-3px);
  }
`

const IconContainer = styled.div`
  flex: 0 0 50px;
  height: 50px;
  background: ${(props) => `linear-gradient(135deg, ${props.color}20, ${props.color}40)`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${(props) => props.color};
  margin-right: 1rem;
  transition: all 0.3s ease-in-out;

  ${Card}:hover & {
    background: ${(props) => props.color};
    color: white;
    transform: scale(1.1);
  }
`

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.3rem;
  line-height: 1.3;
`

const CourseCount = styled.span`
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
`

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  ${Card}:hover & {
    opacity: 1;
  }
`

const ViewAllButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);

  &:hover {
    background: linear-gradient(45deg, #764ba2 0%, #667eea 100%);
    transform: translateY(-2px);
  }
`
