import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

// --- DUMMY DATA ---
const experienceLevels = [
  { id: 'exp1', text: 'Fresh Graduate' },
  { id: 'exp2', text: '0-2 Years' },
  { id: 'exp3', text: '2-5 Years' },
  { id: 'exp4', text: '5-10 Years' },
  { id: 'exp5', text: '10-15 Years' },
]

const learningObjectives = [
  { id: 'obj1', text: 'Programmes with Placement Assistance' },
  { id: 'obj2', text: 'Upskilling for Promotion' },
  { id: 'obj3', text: 'Career Change / Transition' },
  { id: 'obj4', text: 'Domain Specialization' },
]

const interestAreas = [
  { id: 'int1', text: 'Technology & Analytics' },
  { id: 'int2', text: 'Banking & Finance' },
  { id: 'int3', text: 'Management & Leadership' },
  { id: 'int4', text: 'Logistics & Supply Chain' },
  { id: 'int5', text: 'Healthcare Management' },
  { id: 'int6', text: 'Digital Marketing' },
]

const dummyCourses = [
  { id: 'c1', title: 'Executive Programme in Business Management', university: 'IIM Calcutta' },
  { id: 'c2', title: 'Advanced Certificate in Data Science', university: 'IIT Madras' },
  { id: 'c3', title: 'Professional Certificate in Fintech', university: 'IIM Kozhikode' },
  { id: 'c4', title: 'Digital Marketing & Analytics', university: 'ISB Hyderabad' },
]

// --- STYLED COMPONENTS WITH RESPONSIVE UPDATES ---
const PageWrapper = styled.div`
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    background-color: #ffffff; // Change background for a seamless feel on mobile
  }
`

const WizardContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    box-shadow: none; // Remove shadow on mobile if page bg is white
  }
`

const ProgressBarContainer = styled.div`
  margin-bottom: 2.5rem;
`

const ProgressTrack = styled.div`
  height: 4px;
  background-color: #e2e8f0;
  border-radius: 2px;
  position: relative;
`

const ProgressFill = styled(motion.div)`
  height: 100%;
  background-color: #003380;
  border-radius: 2px;
  position: absolute;
`

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -16px;
`

const StepDot = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#003380' : '#e2e8f0')};
  border: 4px solid #ffffff;
  transition: background-color 0.3s ease;
  position: relative;
`

const StepLabel = styled.span`
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: ${({ active }) => (active ? '#1a202c' : '#a0aec0')};
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none; // Hide labels on mobile to prevent clutter
  }
`

const StepContent = styled(motion.div)`
  text-align: center;
`

const StepHeading = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Stack options vertically on mobile
    gap: 1rem;
  }
`

const OptionCard = styled(motion.div)`
  padding: 1.5rem;
  border: 2px solid ${({ selected }) => (selected ? '#003380' : '#e2e8f0')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  color: ${({ selected }) => (selected ? '#003380' : '#2d3748')};
  box-shadow: ${({ selected }) => (selected ? '0 4px 15px rgba(0, 51, 128, 0.1)' : 'none')};

  &:hover {
    transform: translateY(-5px);
    border-color: #003380;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    text-align: left;
  }
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
`

const NavButton = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &.primary {
    background-color: #003380;
    color: white;
    &:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
      background-color: #001f5a;
    }
  }

  &.secondary {
    background-color: transparent;
    color: #4a5568;
    border-color: #e2e8f0;
    &:hover {
      background-color: #f7f8fc;
    }
  }

  @media (max-width: 480px) {
    flex-grow: 1;
  }
`

const ResultsContainer = styled(motion.div)`
  text-align: center;
`

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // Stack courses vertically on mobile
  }
`

const CourseCard = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`

const CourseTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #003380;
  margin: 0 0 0.5rem 0;
`

const CourseUniversity = styled.p`
  font-size: 1rem;
  color: #4a5568;
  margin: 0;
`

// --- MAIN COMPONENT ---
const Recommendations = () => {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState({
    experience: null,
    objective: null,
    interest: null,
  })

  const progress = useMemo(() => ((step - 1) / 3) * 100, [step])
  const stepsConfig = ['Experience', 'Objective', 'Interests', 'Result']

  const handleSelect = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = () => setStep((prev) => (prev < 4 ? prev + 1 : prev))
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev))
  const startOver = () => {
    setSelections({ experience: null, objective: null, interest: null })
    setStep(1)
  }

  const isNextDisabled = () => {
    if (step === 1) return !selections.experience
    if (step === 2) return !selections.objective
    if (step === 3) return !selections.interest
    return false
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <StepContent
            key={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StepHeading>What is your work experience?</StepHeading>
            <OptionsGrid>
              {experienceLevels.map((item) => (
                <OptionCard
                  key={item.id}
                  selected={selections.experience === item.id}
                  onClick={() => handleSelect('experience', item.id)}
                >
                  {item.text}
                </OptionCard>
              ))}
            </OptionsGrid>
          </StepContent>
        )
      case 2:
        return (
          <StepContent
            key={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StepHeading>What is your primary learning objective?</StepHeading>
            <OptionsGrid>
              {learningObjectives.map((item) => (
                <OptionCard
                  key={item.id}
                  selected={selections.objective === item.id}
                  onClick={() => handleSelect('objective', item.id)}
                >
                  {item.text}
                </OptionCard>
              ))}
            </OptionsGrid>
          </StepContent>
        )
      case 3:
        return (
          <StepContent
            key={3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StepHeading>What are your areas of interest?</StepHeading>
            <OptionsGrid>
              {interestAreas.map((item) => (
                <OptionCard
                  key={item.id}
                  selected={selections.interest === item.id}
                  onClick={() => handleSelect('interest', item.id)}
                >
                  {item.text}
                </OptionCard>
              ))}
            </OptionsGrid>
          </StepContent>
        )
      case 4:
        return (
          <ResultsContainer
            key={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StepHeading>Your Recommended Courses</StepHeading>
            <p>Based on your selections, here are some courses you might like.</p>
            <CourseGrid>
              {dummyCourses.map((course) => (
                <CourseCard key={course.id}>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseUniversity>{course.university}</CourseUniversity>
                </CourseCard>
              ))}
            </CourseGrid>
          </ResultsContainer>
        )
      default:
        return null
    }
  }

  return (
    <PageWrapper>
      <WizardContainer>
        <ProgressBarContainer>
          <ProgressTrack>
            <ProgressFill style={{ width: `${progress}%` }} />
          </ProgressTrack>
          <StepsContainer>
            {stepsConfig.map((label, index) => (
              <StepDot key={index} active={step > index}>
                <StepLabel active={step > index}>{label}</StepLabel>
              </StepDot>
            ))}
          </StepsContainer>
        </ProgressBarContainer>

        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

        <Navigation>
          {step > 1 && step < 4 && (
            <NavButton className="secondary" onClick={prevStep}>
              Back
            </NavButton>
          )}
          {step === 4 && (
            <NavButton className="secondary" onClick={startOver}>
              Start Over
            </NavButton>
          )}
          {step === 1 && <div />} {/* Placeholder to keep 'Next' on the right */}
          {step < 3 && (
            <NavButton className="primary" onClick={nextStep} disabled={isNextDisabled()}>
              Next Step
            </NavButton>
          )}
          {step === 3 && (
            <NavButton className="primary" onClick={nextStep} disabled={isNextDisabled()}>
              Recommend Courses
            </NavButton>
          )}
        </Navigation>
      </WizardContainer>
    </PageWrapper>
  )
}

export default Recommendations
