import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The courses completely transformed my career trajectory. The practical insights and expert guidance helped me transition from a junior role to leading product strategy at a Fortune 500 company.',
    color: '#667eea',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Data Scientist',
    company: 'Analytics Pro',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Outstanding content quality and real-world applications. The Technology & Analytics courses gave me the skills I needed to excel in machine learning and data visualization.',
    color: '#43e97b',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'Growth Labs',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The Marketing & Sales courses are incredibly comprehensive. I implemented the strategies immediately and saw a 40% increase in campaign performance within the first quarter.',
    color: '#a8edea',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Operations Manager',
    company: 'LogiFlow',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The Operations & Supply Chain courses provided exactly what I needed to optimize our processes. Our efficiency improved by 35% after implementing the frameworks I learned.',
    color: '#fa709a',
  },
  {
    id: 5,
    name: 'Jessica Park',
    role: 'Financial Analyst',
    company: 'InvestCorp',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The Banking & Finance courses are top-notch. The instructors bring real industry experience, and the case studies are incredibly relevant to current market conditions.',
    color: '#fee140',
  },
]

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        <span>What our students say</span>
        <strong>Success Stories</strong>
      </Heading>

      <GridContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            as={motion.div}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              y: -8,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            color={testimonial.color}
          >
            <QuoteIcon color={testimonial.color}>
              <FaQuoteLeft />
            </QuoteIcon>

            <TestimonialText>{testimonial.text}</TestimonialText>

            <RatingContainer>
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} color={testimonial.color}>
                  <FaStar />
                </Star>
              ))}
            </RatingContainer>

            <AuthorSection>
              <AuthorImage src={testimonial.image} alt={testimonial.name} />
              <AuthorInfo>
                <AuthorName>{testimonial.name}</AuthorName>
                <AuthorRole>
                  {testimonial.role} at {testimonial.company}
                </AuthorRole>
              </AuthorInfo>
            </AuthorSection>

            <HoverOverlay color={testimonial.color} />
          </TestimonialCard>
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
        View All Reviews
      </ViewAllButton>
    </Wrapper>
  )
}

export default TestimonialsSection

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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const TestimonialCard = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid #f1f5f9;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    border-color: ${(props) => props.color};
    transform: translateY(-5px);
  }
`

const QuoteIcon = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  background: ${(props) => `linear-gradient(135deg, ${props.color}20, ${props.color}40)`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${(props) => props.color};
  transition: all 0.3s ease-in-out;

  ${TestimonialCard}:hover & {
    background: ${(props) => props.color};
    color: white;
    transform: scale(1.1);
  }
`

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #334155;
  margin-bottom: 1.5rem;
  font-weight: 400;
  flex-grow: 1;
  padding-right: 3rem;
`

const RatingContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
`

const Star = styled.div`
  color: ${(props) => props.color};
  font-size: 1rem;
  transition: all 0.3s ease-in-out;

  ${TestimonialCard}:hover & {
    transform: scale(1.1);
  }
`

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f1f5f9;
  transition: all 0.3s ease-in-out;

  ${TestimonialCard}:hover & {
    border-color: ${(props) => props.color};
    transform: scale(1.05);
  }
`

const AuthorInfo = styled.div`
  flex: 1;
`

const AuthorName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.2rem;
`

const AuthorRole = styled.p`
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
  background: ${(props) => `linear-gradient(135deg, ${props.color}05, ${props.color}10)`};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  ${TestimonialCard}:hover & {
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
