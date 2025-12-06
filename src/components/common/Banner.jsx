import styled from 'styled-components'

const StyledBanner = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #000;
  text-align: center;
  padding: 1rem 0;
  font-size: 1.5rem;
  letter-spacing: 15px;
  font-family: 'Arial', sans-serif;
  font-weight: 600;

  @media (max-width: 640px) {
    padding: 0.5rem 0;
    letter-spacing: 10px;
    font-size: 1.2rem;
    display: none;
  }
`

function Banner() {
  return <StyledBanner>SHAASHEE</StyledBanner>
}

export default Banner
