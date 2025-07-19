import EarlyCareerCourses from '@/components/HomePage/EarlyCareerCourses'
import ExecutiveEducationCourses from '@/components/HomePage/ExecutiveEducationCourses'
import SelfPacedCourses from '@/components/HomePage/SelfPacedCourses'
import EnterpriseSolutions from '@/components/HomePage/EnterpriseSolutions'
import InDemandDomains from '@/components/HomePage/InDemandDomains'
import PremierInstitutes from '@/components/HomePage/PremierInstitutes'
import AdvantageSection from '@/components/HomePage/AdvantageSection'
import SuccessStories from '@/components/HomePage/SuccessStories'
import ConnectWithUs from '@/components/HomePage/ConnectWithUs'

function Home() {
  return (
    <>
      <EarlyCareerCourses />
      <ExecutiveEducationCourses />
      <SelfPacedCourses />
      <EnterpriseSolutions />
      <InDemandDomains />
      <PremierInstitutes />
      <AdvantageSection />
      <SuccessStories />
      <ConnectWithUs />
    </>
  )
}

export default Home
