import { styled } from 'styled-components'

export const Wrapper = styled.div`
  padding: 4rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
`

export const Heading = styled.div`
  margin-bottom: 2rem;
  span {
    display: block;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.muted};
  }
  strong {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-top: 0.3rem;
  }
`

export const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`

export const Tab = styled.button`
  background: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.light)};
  color: ${({ isActive, theme }) => (isActive ? '#fff' : theme.colors.text)};
  border: none;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`

export const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 2rem;
`

export const Card = styled.div`
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

export const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`

export const CourseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const LikeIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 50%;
  padding: 0.4rem;
  font-size: 0.9rem;
  color: #e63946;
  z-index: 2;
`

export const Badge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.success};
  color: white;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  z-index: 2;
`

export const CardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  line-height: 1.4;
`

export const CategoryTag = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 1rem 0.5rem;
  border-bottom: 1px solid #eee;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1rem 1rem;
  font-size: 0.9rem;
`

export const Price = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 500;
`

export const ExploreButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  transition: background 0.2s ease-in-out;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`
