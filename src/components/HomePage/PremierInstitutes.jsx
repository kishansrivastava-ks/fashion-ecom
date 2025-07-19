import React from 'react'
import styled from 'styled-components'

// --- STYLED COMPONENTS ---

const InstitutesContainer = styled.section`
  background-color: #f8f9fa;
  padding: 4rem 2rem;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionHeader = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2.5rem;
  text-align: left;
`

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #d9534f; // Red color
  margin: 0;
  font-weight: normal;

  strong {
    font-size: 2rem;
    color: #000080; // Navy blue color
    display: block;
    font-weight: bold;
  }
`

const InstitutesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
`

const CardBase = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px_15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`

const InstituteCard = styled(CardBase)`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const LogoImage = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  object-fit: contain;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InstituteTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const CourseCount = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.25rem 0 0 0;
`

const ViewAllCard = styled(CardBase)`
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000080;
  font-weight: 600;
  font-size: 1rem;

  &:hover {
    background-color: #e9ecf0;
  }
`

// --- MOCK DATA ---
// Using placeholders for logos. In a real app, you'd use actual image URLs.
const institutes = [
  { name: 'IISc Bangalore', courses: 3, logo: 'https://placehold.co/100x100/ccc/333?text=IISc' },
  {
    name: 'Manipal University Jaipur',
    courses: 1,
    logo: 'https://placehold.co/100x100/ccc/333?text=MUJ',
  },
  { name: 'IIM Kozhikode', courses: 24, logo: 'https://placehold.co/100x100/ccc/333?text=IIM-K' },
  { name: 'IIM Calcutta', courses: 14, logo: 'https://placehold.co/100x100/ccc/333?text=IIM-C' },
  { name: 'IIT Delhi', courses: 21, logo: 'https://placehold.co/100x100/ccc/333?text=IIT-D' },
  { name: 'IIM Lucknow', courses: 13, logo: 'https://placehold.co/100x100/ccc/333?text=IIM-L' },
  { name: 'IIM Indore', courses: 20, logo: 'https://placehold.co/100x100/ccc/333?text=IIM-I' },
  { name: 'XLRI Jamshedpur', courses: 3, logo: 'https://placehold.co/100x100/ccc/333?text=XLRI' },
  { name: 'IIM Raipur', courses: 2, logo: 'https://placehold.co/100x100/ccc/333?text=IIM-R' },
]

// --- MAIN COMPONENT ---
const PremierInstitutes = () => {
  return (
    <InstitutesContainer>
      <SectionHeader>
        <SectionTitle>
          Get Certifications from
          <strong>Premier Institutes</strong>
        </SectionTitle>
      </SectionHeader>
      <InstitutesGrid>
        {institutes.map((inst, index) => (
          <InstituteCard key={index}>
            <LogoImage src={inst.logo} alt={`${inst.name} logo`} />
            <TextContainer>
              <InstituteTitle>{inst.name}</InstituteTitle>
              <CourseCount>
                {inst.courses} Course{inst.courses > 1 ? 's' : ''}
              </CourseCount>
            </TextContainer>
          </InstituteCard>
        ))}
        <ViewAllCard>View Courses From All Institutions →</ViewAllCard>
      </InstitutesGrid>
    </InstitutesContainer>
  )
}

export default PremierInstitutes
