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
`

function Banner() {
  return <StyledBanner>SHASHEE</StyledBanner>
}

export default Banner
