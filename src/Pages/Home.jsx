import EarlyCareerCourses from '@/components/HomePage/EarlyCareerCourses'
import ExecutiveEducationCourses from '@/components/HomePage/ExecutiveEducationCourses'
import SelfPacedCourses from '@/components/HomePage/SelfPacedCourses'
import EnterpriseSolutions from '@/components/HomePage/EnterpriseSolutions'
import InDemandDomains from '@/components/HomePage/InDemandDomains'
import PremierInstitutes from '@/components/HomePage/PremierInstitutes'
import AdvantageSection from '@/components/HomePage/AdvantageSection'
import SuccessStories from '@/components/HomePage/SuccessStories'
import ConnectWithUs from '@/components/HomePage/ConnectWithUs'
import HomePageHero from '@/components/HomePage/HomePageHero'
import ProdegreePartners from '@/components/HomePage/ProdegreePartners'
import AlliancesSection from '@/components/HomePage/AlliancesSection'
import HeroSection from '@/components/HomePage/HeroSection'
import JobPlacements from '@/components/HomePage/JobPlacements'
import { useEffect, useRef, useState } from 'react'
import RegisterModal from '@/components/modals/RegisterModal'
import ReviewsSection from '@/components/HomePage/ReviewsSection'

function Home() {
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

  return (
    <>
      {/* <HomePageHero /> */}
      <HeroSection />
      <JobPlacements />
      <EarlyCareerCourses />
      <ExecutiveEducationCourses />
      <SelfPacedCourses />
      <EnterpriseSolutions />
      <InDemandDomains />
      <PremierInstitutes />
      <AdvantageSection />
      {/* <SuccessStories /> */}
      <ProdegreePartners />
      <AlliancesSection />
      <ReviewsSection />
      <ConnectWithUs />
      {showModal && <RegisterModal setOpen={setShowModal} onClose={handleCloseModal} />}
    </>
  )
}

export default Home
