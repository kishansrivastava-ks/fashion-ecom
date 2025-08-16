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
  Heart,
  Star,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const jobData = [
  // For Graduates (first 6)
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
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person1.jpg',
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
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person2.jpg',
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
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person3.jpg',
  },
  {
    id: 4,
    company: 'SBI Bank',
    title: 'Credit Manager',
    qualification: 'MBA/PGDM in Finance 60%',
    ageLimit: '22-30',
    salary: '₹ 6,50,000/-',
    location: 'Major Cities',
    trainingFee: '₹ 4,00,000/- (Finance Facilities available for ₹ 3,00,000/-)',
    selectionProcess:
      '1. Online Application, 2. Aptitude Test, 3. Group Discussion, 4. Personal Interview',
    trainingPeriod: '6 Months',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/sbi-logo.webp',
    jobImage: '/images/people/person4.jpg',
  },
  {
    id: 5,
    company: 'ICICI Bank',
    title: 'Branch Manager',
    qualification: 'Graduation Any Stream 55%',
    ageLimit: '23-35',
    salary: '₹ 7,20,000/-',
    location: 'Pan India',
    trainingFee: '₹ 5,50,000/- (Finance Facilities available for ₹ 4,00,000/-)',
    selectionProcess: '1. Online Application, 2. Written Test, 3. Case Study, 4. Final Interview',
    trainingPeriod: '5 Months',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/icici-logo.jpg',
    jobImage: '/images/people/person5.jpg',
  },
  {
    id: 6,
    company: 'Axis Bank',
    title: 'Sales Manager',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-30',
    salary: '₹ 4,80,000/-',
    location: 'Metro Cities',
    trainingFee: '₹ 3,20,000/- (Finance Facilities available for ₹ 2,40,000/-)',
    selectionProcess: '1. Online Application, 2. Online Test, 3. Video Interview, 4. Offer Letter',
    trainingPeriod: '3 Months',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person6.jpg',
  },
  // For 12th Pass (next 6)
  {
    id: 7,
    company: 'Indian Railways',
    title: 'Assistant Loco Pilot',
    qualification: '12th Pass with Science 50%',
    ageLimit: '18-28',
    salary: '₹ 2,40,000/-',
    location: 'All India',
    trainingFee: '₹ 85,000/- (Application Fee: ₹ 12,000/-)',
    selectionProcess:
      '1. Online Application, 2. CBT Exam, 3. Medical Test, 4. Document Verification',
    trainingPeriod: '60 Days',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person1.jpg',
  },
  {
    id: 8,
    company: 'Indian Army',
    title: 'Technical Entry Scheme',
    qualification: '12th Pass PCM 50%',
    ageLimit: '16.5-19.5',
    salary: '₹ 3,20,000/-',
    location: 'Defense Locations',
    trainingFee: '₹ 1,20,000/- (Scholarship available)',
    selectionProcess: '1. Online Application, 2. JEE Main Score, 3. SSB Interview, 4. Medical Test',
    trainingPeriod: '4 Years',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person2.jpg',
  },
  {
    id: 9,
    company: 'Air India',
    title: 'Cabin Crew',
    qualification: '12th Pass Any Stream 50%',
    ageLimit: '18-27',
    salary: '₹ 1,80,000 - 2,50,000/-',
    location: 'Mumbai, Delhi, Bangalore',
    trainingFee: '₹ 2,80,000/- (EMI available)',
    selectionProcess:
      '1. Online Application, 2. Physical Test, 3. Group Discussion, 4. Personal Interview',
    trainingPeriod: '90 Days',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person3.jpg',
  },
  {
    id: 10,
    company: 'CRPF',
    title: 'Assistant Sub Inspector',
    qualification: '12th Pass Any Stream 45%',
    ageLimit: '20-25',
    salary: '₹ 2,90,000/-',
    location: 'Pan India',
    trainingFee: '₹ 75,000/- (Government Subsidy available)',
    selectionProcess: '1. Online Application, 2. Physical Test, 3. Written Exam, 4. Medical Test',
    trainingPeriod: '44 Weeks',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person4.jpg',
  },
  {
    id: 11,
    company: 'Delhi Metro',
    title: 'Train Operator',
    qualification: '12th Pass Any Stream 50%',
    ageLimit: '18-28',
    salary: '₹ 2,10,000/-',
    location: 'Delhi NCR',
    trainingFee: '₹ 1,50,000/- (Finance Facilities available)',
    selectionProcess:
      '1. Online Application, 2. Computer Based Test, 3. Psycho Test, 4. Medical Exam',
    trainingPeriod: '6 Months',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person5.jpg',
  },
  {
    id: 12,
    company: 'Indian Coast Guard',
    title: 'Navik (General Duty)',
    qualification: '12th Pass Any Stream 50%',
    ageLimit: '18-22',
    salary: '₹ 2,60,000/-',
    location: 'Coastal Areas',
    trainingFee: '₹ 95,000/- (Government Support available)',
    selectionProcess:
      '1. Online Application, 2. Written Test, 3. Physical Fitness, 4. Medical Examination',
    trainingPeriod: '52 Weeks',
    category: 'Banking',
    description:
      'Join our dynamic team as a Deputy Manager and lead operational excellence in banking services.',
    companyLogo: '/images/hdfc-logo.png',
    jobImage: '/images/people/person6.jpg',
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
  line-height: 1;
  width: 100%;
  max-width: 1300px;

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
  max-width: 1300px;

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
  padding: 0;
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
  /* padding: 0 1.75rem 1.75rem 1.75rem; */
  transition: opacity 0.3s ease;
  /* border: 2px solid red; */
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
  padding: 1rem;
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
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const OverlayTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  /* margin-bottom: 0.5rem; */
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
  gap: 0.5rem;
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
  font-size: 0.9rem;
  color: #fff;
  line-height: 1.2;
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
  /* margin-top: 2rem; */
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

      <SubSection>
        <SubSectionTitle>For Graduates</SubSectionTitle>
        <JobsGrid>
          {jobData.slice(0, 6).map((job) => (
            <JobCard key={job.id}>
              <JobContent>
                <JobImage image={job.jobImage}>
                  <LikeButton>
                    <Heart />
                  </LikeButton>
                </JobImage>

                <JobInfo>
                  <TitleCompanyRow>
                    <TitleCompanyLeft>
                      <JobTitle>{job.title}</JobTitle>
                      <CompanyInfo>
                        <CompanyLogo src={job.companyLogo} alt={job.company} />
                        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{job.company}</span>
                      </CompanyInfo>
                    </TitleCompanyLeft>
                    <CategoryBadge>{job.category}</CategoryBadge>
                  </TitleCompanyRow>

                  <Divider />

                  <BottomRow>
                    <TrainingFee>{job.trainingFee.split('(')[0].trim()}</TrainingFee>
                    <StarRating>
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <span>4.5</span>
                    </StarRating>
                  </BottomRow>
                </JobInfo>
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
                    {/* <OverlayLabel>Category</OverlayLabel> */}
                    <OverlayValue>{job.category}</OverlayValue>
                  </OverlayDetail>

                  <OverlayDescription>{job.description}</OverlayDescription>

                  <OverlayDetail>
                    <OverlayLabel>Training Fee</OverlayLabel>
                    <OverlayValue>{job.trainingFee}</OverlayValue>
                  </OverlayDetail>

                  <OverlayDetail>
                    <OverlayLabel>Salary</OverlayLabel>
                    <OverlayValue>{job.salary}</OverlayValue>
                  </OverlayDetail>

                  <KnowMoreButton>Know More</KnowMoreButton>
                </OverlayContent>
              </HoverOverlay>
            </JobCard>
          ))}
        </JobsGrid>
      </SubSection>

      <SubSection>
        <SubSectionTitle>For 12th Pass</SubSectionTitle>
        <JobsGrid>
          {jobData.slice(6, 12).map((job) => (
            <JobCard key={job.id}>
              <JobContent>
                <JobImage image={job.jobImage}>
                  <LikeButton>
                    <Heart />
                  </LikeButton>
                </JobImage>

                <JobInfo>
                  <TitleCompanyRow>
                    <TitleCompanyLeft>
                      <JobTitle>{job.title}</JobTitle>
                      <CompanyInfo>
                        <CompanyLogo src={job.companyLogo} alt={job.company} />
                        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{job.company}</span>
                      </CompanyInfo>
                    </TitleCompanyLeft>
                    <CategoryBadge>{job.category}</CategoryBadge>
                  </TitleCompanyRow>

                  <Divider />

                  <BottomRow>
                    <TrainingFee>{job.trainingFee.split('(')[0].trim()}</TrainingFee>
                    <StarRating>
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <span>4.5</span>
                    </StarRating>
                  </BottomRow>
                </JobInfo>
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
                    <OverlayLabel>Category</OverlayLabel>
                    <OverlayValue>{job.category}</OverlayValue>
                  </OverlayDetail>

                  <OverlayDescription>{job.description}</OverlayDescription>

                  <OverlayDetail>
                    <OverlayLabel>Training Fee</OverlayLabel>
                    <OverlayValue>{job.trainingFee}</OverlayValue>
                  </OverlayDetail>

                  <OverlayDetail>
                    <OverlayLabel>Salary</OverlayLabel>
                    <OverlayValue>{job.salary}</OverlayValue>
                  </OverlayDetail>

                  <KnowMoreButton>Know More</KnowMoreButton>
                </OverlayContent>
              </HoverOverlay>
            </JobCard>
          ))}
        </JobsGrid>
      </SubSection>

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
  margin-bottom: 2rem;
`

const SubSectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000080;
  margin-bottom: 1rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`

const JobImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px 12px 0 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  margin-bottom: 1.5rem;
`

const LikeButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6b7280;
  }

  &.liked svg {
    color: #ef4444;
    fill: #ef4444;
  }
`

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* border: 2px solid red; */
  padding: 0 1.75rem 1.75rem 1.75rem;
`

const TitleCompanyRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`

const TitleCompanyLeft = styled.div`
  flex: 1;
`

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const CompanyLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  object-fit: contain;
`

const CategoryBadge = styled.span`
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #f3f4f6;
  margin: 0;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

const TrainingFee = styled.div`
  font-size: 1.2rem;
  color: #059669;
  font-weight: 600;
`

const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 15px;
    height: 15px;
    color: #fbbf24;
    fill: #fbbf24;
  }

  span {
    font-size: 1rem;
    color: #6b7280;
    margin-left: 0.25rem;
  }
`

const OverlayDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 0.5rem;
`

const KnowMoreButton = styled.button`
  background: #fff;
  color: #000080;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: #f8fafc;
    transform: translateY(-1px);
  }
`
