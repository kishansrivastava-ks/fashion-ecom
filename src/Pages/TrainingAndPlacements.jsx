import React, { useState, useMemo, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import RegisterModal from '@/components/modals/RegisterModal'
import { jobData } from '@/data/JobsData'

// --- ICONS ---
const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <circle cx="11" cy="11" r="8"></circle> <line x1="21" y1="21" x2="16.65" y2="16.65"></line>{' '}
  </svg>
)
const ChevronDownIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <polyline points="6 9 12 15 18 9"></polyline>{' '}
  </svg>
)
const FilterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <polygon points="22 3 2 3 10 12.46V19l4 2v-8.54L22 3z"></polygon>{' '}
  </svg>
)
const XIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line>{' '}
  </svg>
)

// --- JobCard Component ---
const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const getLogoInitial = (company) => company.charAt(0)
  return (
    <JobCardWrapper layout>
      <JobCardStyled>
        <CardHeader onClick={() => setIsExpanded(!isExpanded)}>
          <CompanyLogo>{getLogoInitial(job.company)}</CompanyLogo>
          <HeaderContent>
            <JobTitle>{job.title}</JobTitle>
            <CompanyName>
              {job.company} &bull; {job.location}
            </CompanyName>
          </HeaderContent>
          <ExpandButton animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDownIcon />
          </ExpandButton>
        </CardHeader>
        <AnimatePresence>
          {isExpanded && (
            <CardBody
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <DetailsGrid>
                <DetailItem>
                  <DetailLabel>Salary</DetailLabel>
                  {job.salary}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Qualification</DetailLabel>
                  {job.qualification}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Age Limit</DetailLabel>
                  {job.ageLimit}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Training Period</DetailLabel>
                  {job.trainingPeriod}
                </DetailItem>
                <DetailItem style={{ gridColumn: '1 / -1' }}>
                  <DetailLabel>Training Fee</DetailLabel>
                  {job.trainingFee}
                </DetailItem>
                <DetailItem style={{ gridColumn: '1 / -1' }}>
                  <DetailLabel>Selection Process</DetailLabel>
                  {job.selectionProcess}
                </DetailItem>
              </DetailsGrid>
              <ApplyButton href="#">Apply Now</ApplyButton>
            </CardBody>
          )}
        </AnimatePresence>
      </JobCardStyled>
    </JobCardWrapper>
  )
}

// --- Main Page Component ---
const TrainingAndPlacements = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedQualifications, setSelectedQualifications] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false) // State for mobile filter dropdown

  const [showModal, setShowModal] = useState(false)
  const modalShownRef = useRef(false)

  useEffect(() => {
    const handleLoad = () => {
      if (!modalShownRef.current) {
        setShowModal(true)
        modalShownRef.current = true
      }
    }

    if (document.readyState == 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  })

  const handleCloseModal = () => {
    setShowModal(false)
    modalShownRef.current = true
  }

  const categories = useMemo(
    () => [...new Set(jobData.map((j) => j.company.split(',')[0].split(' ')[0]))],
    []
  )
  const qualifications = useMemo(
    () => [
      ...new Set(
        jobData.map((j) => (j.qualification.includes('12th') ? '12th Pass' : 'Graduation'))
      ),
    ],
    []
  )

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target
    setSelectedCategories((prev) => (checked ? [...prev, value] : prev.filter((c) => c !== value)))
  }

  const removeCategory = (catToRemove) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== catToRemove))
  }

  const handleQualificationChange = (e) => {
    const { value, checked } = e.target
    setSelectedQualifications((prev) =>
      checked ? [...prev, value] : prev.filter((q) => q !== value)
    )
  }

  const removeQualification = (qualToRemove) => {
    setSelectedQualifications((prev) => prev.filter((q) => q !== qualToRemove))
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setSelectedQualifications([])
    setIsFilterOpen(false) // Close dropdown on reset
  }

  const activeFilterCount = selectedCategories.length + selectedQualifications.length

  const filteredJobs = useMemo(() => {
    return jobData.filter((job) => {
      const searchTermMatch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => job.company.toLowerCase().includes(cat.toLowerCase()))
      const qualificationMatch =
        selectedQualifications.length === 0 ||
        selectedQualifications.some((qual) => {
          if (qual === '12th Pass') return job.qualification.includes('12th')
          if (qual === 'Graduation') return job.qualification.includes('Graduation')
          return false
        })
      return searchTermMatch && categoryMatch && qualificationMatch
    })
  }, [searchTerm, selectedCategories, selectedQualifications])

  return (
    <>
      <PageWrapper>
        <Header>
          <MainHeading>Find Your Next Career</MainHeading>
          <SubHeading>
            Explore our curated list of job openings and find your perfect match.
          </SubHeading>
        </Header>

        <MainContent>
          <FilterSidebar>
            <MobileFilterHeader onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <MobileFilterHeaderContent>
                <FilterIcon />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <ActiveFilterBadge>{activeFilterCount}</ActiveFilterBadge>
                )}
              </MobileFilterHeaderContent>
              <motion.div animate={{ rotate: isFilterOpen ? 180 : 0 }}>
                <ChevronDownIcon />
              </motion.div>
            </MobileFilterHeader>

            <FilterContentWrapper isOpen={isFilterOpen}>
              <FilterGroup>
                <FilterLabel>Search</FilterLabel>
                <InputWrapper>
                  <InputIcon>
                    <SearchIcon />
                  </InputIcon>
                  <StyledInput
                    type="text"
                    placeholder="Job title or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputWrapper>
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Industry</FilterLabel>
                <CheckboxContainer>
                  {categories.map((cat) => (
                    <CheckboxLabel key={cat}>
                      {' '}
                      <StyledCheckbox
                        type="checkbox"
                        value={cat}
                        checked={selectedCategories.includes(cat)}
                        onChange={handleCategoryChange}
                      />{' '}
                      {cat}{' '}
                    </CheckboxLabel>
                  ))}
                </CheckboxContainer>
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Qualification</FilterLabel>
                <CheckboxContainer>
                  {qualifications.map((qual) => (
                    <CheckboxLabel key={qual}>
                      {' '}
                      <StyledCheckbox
                        type="checkbox"
                        value={qual}
                        checked={selectedQualifications.includes(qual)}
                        onChange={handleQualificationChange}
                      />{' '}
                      {qual}{' '}
                    </CheckboxLabel>
                  ))}
                </CheckboxContainer>
              </FilterGroup>
              <ResetButton onClick={resetFilters}>Reset All Filters</ResetButton>
            </FilterContentWrapper>

            {activeFilterCount > 0 && (
              <ActiveFiltersDisplay>
                {selectedCategories.map((cat) => (
                  <FilterPill key={cat} onClick={() => removeCategory(cat)}>
                    {cat} <XIcon />
                  </FilterPill>
                ))}
                {selectedQualifications.map((qual) => (
                  <FilterPill key={qual} onClick={() => removeQualification(qual)}>
                    {qual} <XIcon />
                  </FilterPill>
                ))}
              </ActiveFiltersDisplay>
            )}
          </FilterSidebar>

          <JobListingsContainer>
            <ResultsHeader>{filteredJobs.length} Jobs Found</ResultsHeader>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <NoResults>No job openings match your criteria.</NoResults>
            )}
          </JobListingsContainer>
        </MainContent>
      </PageWrapper>
      {showModal && <RegisterModal setOpen={setShowModal} onClose={handleCloseModal} />}
    </>
  )
}

export default TrainingAndPlacements

// --- STYLED COMPONENTS (Updated with Mobile Filter Logic) ---
const PageWrapper = styled.div`
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f7f8fc;
  min-height: 100vh;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
  }
`
const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
`
const MainHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`
const SubHeading = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`
// --- Filter Sidebar Styles ---
const FilterSidebar = styled.aside`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    position: static;
    top: auto;
    padding: 0; // Padding will be on inner elements
  }
`
const MobileFilterHeader = styled.button`
  display: none; // Hidden on desktop
  width: 100%;
  background-color: #fff;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  cursor: pointer;
  text-align: left;

  // Flexbox to align icon and text
  display: none;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    display: flex;
  }
`
const MobileFilterHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`
const ActiveFilterBadge = styled.span`
  background-color: #003380;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FilterContentWrapper = styled.div`
  // On desktop, it's just a pass-through

  @media (max-width: 1024px) {
    // On mobile, it's the collapsible area
    max-height: ${(props) => (props.isOpen ? '1000px' : '0')};
    overflow: hidden;
    opacity: ${(props) => (props.isOpen ? '1' : '0')};
    transition: all 0.4s ease-in-out;
    padding: ${(props) => (props.isOpen ? '1.5rem' : '0 1.5rem')};
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    margin-top: ${(props) => (props.isOpen ? '-1px' : '0')}; // Overlap border
    border-top: ${(props) => (props.isOpen ? '1px solid #e2e8f0' : 'none')};
  }
`
const ActiveFiltersDisplay = styled.div`
  display: none; // Hidden on desktop
  padding: 1rem 1.5rem 0.5rem;
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  margin-top: -12px; // Pull up under header
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  /* z-index: -1; */
  position: relative;

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  /* border: 2px solid red; */
`
const FilterPill = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #eef2ff;
  color: #4338ca;
  border: 1px solid #c7d2fe;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e7ff;
    border-color: #a5b4fc;
  }

  svg {
    color: #6366f1;
  }
`
const FilterGroup = styled.div`
  margin-bottom: 2rem;
  &:last-of-type {
    margin-bottom: 1.5rem;
  }
`
const FilterLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
`
const InputWrapper = styled.div`
  position: relative;
`
const StyledInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #2d3748;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #003380;
    box-shadow: 0 0 0 2px rgba(0, 51, 128, 0.2);
  }
`
const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.8rem;
  transform: translateY(-50%);
  color: #a0aec0;
`
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem 1rem;
  }
`
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
  color: #4a5568;
`
const StyledCheckbox = styled.input`
  margin-right: 0.75rem;
  height: 18px;
  width: 18px;
  accent-color: #003380;
`
const ResetButton = styled.button`
  width: 100%;
  padding: 0.7rem;
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #cbd5e0;
  }
`
// --- Job Listings Styles (No changes needed here) ---
const JobListingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
const ResultsHeader = styled.div`
  background-color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3748;
`
const JobCardWrapper = styled(motion.div)``
const JobCardStyled = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }
`
const CardHeader = styled.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  @media (max-width: 480px) {
    padding: 1rem;
    gap: 0.75rem;
  }
`
const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #f7f8fc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  color: #003380;
  border: 1px solid #e2e8f0;
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
`
const HeaderContent = styled.div``
const JobTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`
const CompanyName = styled.p`
  font-size: 0.95rem;
  color: #4a5568;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`
const ExpandButton = styled(motion.div)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f7f8fc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
`
const CardBody = styled(motion.div)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  color: #2d3748;
  @media (max-width: 480px) {
    padding: 0 1rem 1rem 1rem;
  }
`
const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
  padding-top: 1.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`
const DetailItem = styled.div`
  font-size: 0.95rem;
  line-height: 1.5;
`
const DetailLabel = styled.strong`
  display: block;
  color: #003380;
  font-weight: 600;
  margin-bottom: 0.25rem;
`
const ApplyButton = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  background-color: #003380;
  color: white;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #001f5a;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 51, 128, 0.2);
  }
`
const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  background-color: #fff;
  border-radius: 12px;
`
