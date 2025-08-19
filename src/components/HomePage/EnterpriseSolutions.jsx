import React, { useState } from 'react'
import styled from 'styled-components'
import RegisterModal from '../modals/RegisterModal'

// --- STYLED COMPONENTS ---

const SolutionsContainer = styled.section`
  background-color: #f0f2f5;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 2.5rem 0.5rem;
  }
`

const SectionHeader = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-bottom: 1.5rem;
  text-align: left;
  @media (max-width: 600px) {
    text-align: center;
    margin-bottom: 1.3rem;
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
    font-size: 1.05rem;
    strong {
      font-size: 1.3rem;
    }
  }
`

const SectionSubTitle = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 0.5rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin-top: 0.7rem;
    margin-bottom: 0;
  }
`

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1300px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 95%;
  }

  @media (max-width: 450px) {
    gap: 0.6rem;
  }
`

const SolutionCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  display: flex;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column; /* image on top */
    align-items: stretch;
  }
`

const CardImage = styled.div`
  flex-shrink: 0;
  width: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 170px;
    min-height: 130px;
  }
  @media (max-width: 450px) {
    height: 100px;
    min-height: 80px;
  }
`

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.75rem 0;
  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
  @media (max-width: 600px) {
    font-size: 0.93rem;
    margin-bottom: 1rem;
  }
`

const KnowMoreButton = styled.a`
  display: inline-block;
  background-color: #d9534f;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.3s;
  align-self: flex-start;

  &:hover {
    background-color: #c9302c;
    color: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
  }
`

// --- MOCK DATA ---
const solutions = [
  {
    title: 'Organisational Development Consulting',
    description:
      'We help businesses transform from within by aligning people, processes, and culture with long-term goals. Our consulting empowers leaders to build agile, high-performing teams, strengthen organizational culture, and drive sustainable growth.',
    imageUrl: '/images/consulting.jpg',
  },
  {
    title: 'Executive Education @ Work',
    description:
      'Unlock leadership potential without stepping away from your workplace. Our executive education programs bring real-time learning, practical insights, and strategic skills directly to your professional environment—so you grow while you work.',
    imageUrl: '/images/education.png',
  },
  {
    title: 'Learning Experience Platform (LXP)',
    description:
      'Our LXP is designed to make learning personal, engaging, and continuous. With AI-driven recommendations, interactive content, and real-time progress tracking, it empowers learners to upskill anytime, anywhere—at their own pace.',
    imageUrl: '/images/lxp.jpg',
  },
  {
    title: 'Content Solutions',
    description:
      'We design impactful, learner-centric content tailored to your business goals. From bite-sized microlearning to in-depth training modules, our solutions ensure knowledge is practical, engaging, and results-driven.',
    imageUrl: '/images/online-learning.jpg',
  },
  {
    title: 'Technology Programmes',
    description:
      'Stay ahead in the digital age with technology programmes built to upskill your workforce. Covering emerging tools, platforms, and digital transformation skills, our programmes prepare teams to thrive in a tech-first world.',
    imageUrl: '/images/technology.png',
  },
  {
    title: 'L&D Solutions',
    description:
      'We provide end-to-end Learning & Development solutions that align with your organizational strategy. From capability building to leadership development, our approach strengthens people and performance together.',
    imageUrl: '/images/solutions.jpg',
  },
]

// --- MAIN COMPONENT ---
const EnterpriseSolutions = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <SolutionsContainer>
        <SectionHeader>
          <SectionTitle>
            Achieve organisational growth with
            <strong>Enterprise Solutions</strong>
          </SectionTitle>
          <SectionSubTitle>
            Customised learning solutions to empower talent and drive business objectives
          </SectionSubTitle>
        </SectionHeader>
        <SolutionsGrid>
          {solutions.map((solution, index) => (
            <SolutionCard key={index}>
              <CardImage src={solution.imageUrl} />
              <CardContent>
                <CardTitle>{solution.title}</CardTitle>
                <CardDescription>{solution.description}</CardDescription>
                <KnowMoreButton onClick={() => setShowModal(true)}>Apply Now →</KnowMoreButton>
              </CardContent>
            </SolutionCard>
          ))}
        </SolutionsGrid>
      </SolutionsContainer>
      {showModal && <RegisterModal setOpen={setShowModal} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default EnterpriseSolutions
