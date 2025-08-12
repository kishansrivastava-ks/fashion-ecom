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

function Home() {
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
      <ConnectWithUs />
    </>
  )
}

export default Home
