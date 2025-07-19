import EarlyCareerCourses from '@/components/HomePage/EarlyCareerCourses'
import ConnectWithUsSection from './Home/ConnectWithUsSection'
import EarlyCareerCoursesSection from './Home/EarlyCareerCoursesSection'
import EnterpriseSolutionsSection from './Home/EnterpriseSolutionsSection'
import ExecutiveEducationSection from './Home/ExecutiveEducationSection'
import HeroSection from './Home/HeroSection'
import InDemandDomainsSection from './Home/InDemandDomainsSection'
import SelfPacedCoursesSection from './Home/SelfPacedCoursesSection'
import TestimonialsSection from './Home/TestimonialsSection'
import WhyUsSection from './Home/WhyUsSection'
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
      {/* <HeroSection />
      <EarlyCareerCoursesSection />
      <ExecutiveEducationSection />
      <SelfPacedCoursesSection />
      <EnterpriseSolutionsSection />
      <InDemandDomainsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <ConnectWithUsSection /> */}
    </>
  )
}

export default Home
