import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// --- ICONS (for a real app, use a library like react-icons) ---
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

// --- STYLED COMPONENTS ---
const LeadershipContainer = styled.section`
  background-color: #ffffff;
  padding: 6rem 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`

const MainHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000080;
  margin: 0;
`

const TeamGrid = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
`

const MemberCard = styled(motion.div)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageWrapper = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 51, 128, 0.1);
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
  }
`

const SocialLink = styled.a`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #003380;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #d9534f;
    transform: scale(1.1);
    color: white;
  }
`

const MemberName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
`

const MemberTitle = styled.p`
  font-size: 0.95rem;
  color: #4a5568;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  min-height: 40px; // To align cards with different title lengths
`

const KnowMoreLink = styled.a`
  font-size: 0.9rem;
  font-weight: 500;
  color: #003380;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

// --- MOCK DATA & CONFIG ---
const leadershipTeam = [
  {
    name: 'Priya Sharma',
    title: 'President & CEO',
    img: 'https://placehold.co/200x200/E6E6FA/333?text=PS',
  },
  {
    name: 'Rohan Gupta',
    title: 'President, Enterprise & Skilling Business, CFO',
    img: 'https://placehold.co/200x200/D8BFD8/333?text=RG',
  },
  {
    name: 'Dr. Alisha Khan',
    title: 'Chief People Officer & Head - People, Places & HR',
    img: 'https://placehold.co/200x200/DDA0DD/333?text=AK',
  },
  {
    name: 'Vikram Singh',
    title: 'Chief Digital Strategy Officer',
    img: 'https://placehold.co/200x200/DA70D6/333?text=VS',
  },
  {
    name: 'Sunita Reddy',
    title: 'Business Head, Platforms',
    img: 'https://placehold.co/200x200/BA55D3/333?text=SR',
  },
  {
    name: 'Anil Mehta',
    title: 'Vice President - Finance & Accounts',
    img: 'https://placehold.co/200x200/9932CC/333?text=AM',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

// --- MAIN COMPONENT ---
const LeadershipSection = () => {
  return (
    <LeadershipContainer>
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <MainHeading>The Flag Bearers</MainHeading>
      </SectionHeader>
      <TeamGrid
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {leadershipTeam.map((member, index) => (
          <MemberCard key={index} variants={itemVariants}>
            <ImageWrapper>
              <img src={member.img} alt={`Portrait of ${member.name}`} />
              <SocialLink
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profile of ${member.name}`}
              >
                <LinkedInIcon />
              </SocialLink>
            </ImageWrapper>
            <MemberName>{member.name}</MemberName>
            <MemberTitle>{member.title}</MemberTitle>
            <KnowMoreLink href="#">Know More &rarr;</KnowMoreLink>
          </MemberCard>
        ))}
      </TeamGrid>
    </LeadershipContainer>
  )
}

export default LeadershipSection
