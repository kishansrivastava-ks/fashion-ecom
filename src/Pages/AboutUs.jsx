import AboutCcciSection from '@/components/About/AboutCcciSection'
import AboutHeroSection from '@/components/About/AboutHeroSection'
import ExcellenceSection from '@/components/About/ExcellenceSection'
import LeadershipSection from '@/components/About/LeadershipSection'
import VisionValuesSection from '@/components/About/VisionValuesSection'
import AlliancesSection from '@/components/HomePage/AlliancesSection'
import ConnectWithUs from '@/components/HomePage/ConnectWithUs'
import ProdegreePartners from '@/components/HomePage/ProdegreePartners'

function AboutUs() {
  return (
    <>
      <AboutHeroSection />
      <ExcellenceSection />
      <VisionValuesSection />
      {/* <LeadershipSection /> */}
      <AboutCcciSection />
      <ProdegreePartners />
      <AlliancesSection />
      <ConnectWithUs />
    </>
  )
}

export default AboutUs
