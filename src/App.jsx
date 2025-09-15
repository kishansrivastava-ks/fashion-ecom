import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeProvider'
import Test from './Pages/Test'
import { GlobalStyles } from './styles/globalStyles'
import { theme } from './styles/theme'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/home" element={<Test />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
      {/* <Test /> */}
    </ThemeProvider>
  )
}

export default App
