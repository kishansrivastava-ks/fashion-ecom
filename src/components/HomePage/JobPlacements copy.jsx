import React from 'react'
import styled from 'styled-components'
import {
  Building2,
  MapPin,
  DollarSign,
  ChevronRight,
  GraduationCap,
  Clock,
  Users,
  FileText,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Sample job data (3 items)
const jobData = [
  {
    id: 1,
    company: 'HDFC Bank',
    title: 'Deputy Manager Operational',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-28',
    salary: '₹ 5,59,000/-',
    location: 'Pan India',
    trainingFee: '₹ 3,50,000/- (Finance Facilities available for ₹ 2,57,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '4 Months',
  },
  {
    id: 2,
    company: 'HDFC Bank',
    title: 'Assistant Manager Operational',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-28',
    salary: '₹ 4,40,000/-',
    location: 'Pan India',
    trainingFee: '₹ 2,50,000/- (Finance Facilities available for ₹ 1,50,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '45 Days',
  },
  {
    id: 3,
    company: 'HDFC Bank',
    title: 'Relationship Manager',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-32',
    salary: '₹ 2,08,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 59,000/- (Application Fee: ₹ 68,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '7 Days',
  },
]

// Styled components
const JobsContainer = styled.section`
  background-color: #fff;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  color: #e55c20;
  margin-bottom: 2rem;
  font-weight: 400;
  /* text-align: center; */
  line-height: 1;
  width: 1300px;
  strong {
    font-size: 2rem;
    color: #000080;
    display: block;
    font-weight: 700;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;

    strong {
      font-size: 1.8rem;
    }
  }
`

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const JobCard = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 2.5rem 1.75rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #000080;
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 128, 0.15);
  }

  &:hover .overlay {
    opacity: 1;
    visibility: visible;
  }
`

const JobContent = styled.div`
  transition: opacity 0.3s ease;
`

const JobHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
`

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`

const CompanyName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 500;
`

const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #374151;

  svg {
    color: #6b7280;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 128, 0.95), rgba(0, 0, 96, 0.95));
  color: white;
  padding: 1.75rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`

const OverlayHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const OverlayTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
  line-height: 1.3;
`

const OverlayCompany = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);

  svg {
    width: 16px;
    height: 16px;
  }
`

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const OverlayDetail = styled.div`
  &:last-child {
    margin-bottom: 0;
  }
`

const OverlayLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  svg {
    width: 14px;
    height: 14px;
  }
`

const OverlayValue = styled.div`
  font-size: 0.95rem;
  color: #fff;
  line-height: 1.5;
  font-weight: 400;
`

const HoverHint = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  color: #9ca3af;
  opacity: 0.7;
  transition: opacity 0.3s ease;
`

const SeeMoreButton = styled.button`
  margin-top: 2rem;
  background-color: #000080;
  color: white;
  padding: 0.875rem 2.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000060;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 128, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

// Main Component
const JobPlacements = () => {
  const navigate = useNavigate()

  const handleSeeMore = () => {
    navigate('/training-and-placements')
    console.log('Navigate to /training-and-placements')
  }

  return (
    <JobsContainer>
      <SectionTitle>
        Launch Your Career With
        <strong>Training & Placement Opportunities</strong>
      </SectionTitle>

      <JobsGrid>
        {jobData.slice(0, 3).map((job) => (
          <JobCard key={job.id}>
            <JobContent>
              <JobHeader>
                <JobTitle>{job.title}</JobTitle>
                <CompanyName>
                  <Building2 />
                  {job.company}
                </CompanyName>
              </JobHeader>

              <JobDetails>
                <DetailItem>
                  <MapPin />
                  {job.location}
                </DetailItem>
                <DetailItem>
                  <DollarSign />
                  {job.salary}
                </DetailItem>
              </JobDetails>

              <HoverHint>Hover for details</HoverHint>
            </JobContent>

            <HoverOverlay className="overlay">
              <OverlayHeader>
                <OverlayTitle>{job.title}</OverlayTitle>
                <OverlayCompany>
                  <Building2 />
                  {job.company}
                </OverlayCompany>
              </OverlayHeader>

              <OverlayContent>
                <OverlayDetail>
                  <OverlayLabel>
                    <GraduationCap />
                    Qualification
                  </OverlayLabel>
                  <OverlayValue>{job.qualification}</OverlayValue>
                </OverlayDetail>

                <OverlayDetail>
                  <OverlayLabel>
                    <Users />
                    Age Limit
                  </OverlayLabel>
                  <OverlayValue>{job.ageLimit} years</OverlayValue>
                </OverlayDetail>

                <OverlayDetail>
                  <OverlayLabel>
                    <DollarSign />
                    Salary
                  </OverlayLabel>
                  <OverlayValue>{job.salary}</OverlayValue>
                </OverlayDetail>

                <OverlayDetail>
                  <OverlayLabel>
                    <MapPin />
                    Location
                  </OverlayLabel>
                  <OverlayValue>{job.location}</OverlayValue>
                </OverlayDetail>

                <OverlayDetail>
                  <OverlayLabel>
                    <DollarSign />
                    Training Fee
                  </OverlayLabel>
                  <OverlayValue>{job.trainingFee}</OverlayValue>
                </OverlayDetail>

                <OverlayDetail>
                  <OverlayLabel>
                    <Clock />
                    Training Period
                  </OverlayLabel>
                  <OverlayValue>{job.trainingPeriod}</OverlayValue>
                </OverlayDetail>

                <OverlayDetail>
                  <OverlayLabel>
                    <FileText />
                    Selection Process
                  </OverlayLabel>
                  <OverlayValue>{job.selectionProcess}</OverlayValue>
                </OverlayDetail>
              </OverlayContent>
            </HoverOverlay>
          </JobCard>
        ))}
      </JobsGrid>

      <SeeMoreButton onClick={handleSeeMore}>
        See More
        <ChevronRight />
      </SeeMoreButton>
    </JobsContainer>
  )
}

export default JobPlacements

const SubSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3rem;
`

const SubSectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000080;
  margin-bottom: 1.5rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`
