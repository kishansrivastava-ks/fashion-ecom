import React from 'react'
import styled from 'styled-components'

// --- ICON PLACEHOLDER ---
// In a real app, you would use a proper icon library and map specific icons to domains.
const PlaceholderIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
)

// --- STYLED COMPONENTS ---

const DomainsContainer = styled.section`
  background-color: #f8f9fa;
  padding: 2rem 2rem;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionHeader = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-bottom: 2rem;
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

const DomainsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1300px;
`

const CardBase = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`

const DomainCard = styled(CardBase)`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const IconCircle = styled.div`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #000080; // Navy blue
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DomainTitle = styled.h3`
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
const domains = [
  { name: 'General Management', courses: 27 },
  { name: 'MBA', courses: 14 },
  { name: 'Leadership & Strategy', courses: 30 },
  { name: 'Technology & Analytics', courses: 93 },
  { name: 'Operations & Supply Chain', courses: 27 },
  { name: 'Banking & Finance', courses: 36 },
  { name: 'Marketing & Sales', courses: 15 },
  { name: 'Healthcare', courses: 5 },
  { name: 'Product Management', courses: 2 },
]

// --- MAIN COMPONENT ---
const InDemandDomains = () => {
  return (
    <DomainsContainer>
      <SectionHeader>
        <SectionTitle>
          Select Courses from
          <strong>In-demand Domains</strong>
        </SectionTitle>
      </SectionHeader>
      <DomainsGrid>
        {domains.map((domain, index) => (
          <DomainCard key={index}>
            <IconCircle>
              <PlaceholderIcon />
            </IconCircle>
            <TextContainer>
              <DomainTitle>{domain.name}</DomainTitle>
              <CourseCount>{domain.courses} Courses</CourseCount>
            </TextContainer>
          </DomainCard>
        ))}
        <ViewAllCard>View Courses From All Categories →</ViewAllCard>
      </DomainsGrid>
    </DomainsContainer>
  )
}

export default InDemandDomains
