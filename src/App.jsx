import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeProvider'
import Test from './Pages/Test'
import { GlobalStyles } from './styles/globalStyles'
import { theme } from './styles/theme'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import TermsConditions from './Pages/TermsConditions'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import ReturnPolicy from './Pages/ReturnPolicy'
import { AnimatePresence } from 'framer-motion'
import BookConsultation from './Pages/BookConsultation'
import ScrollToTop from './utils/ScrollToTop'
import ProductDetail from './Pages/ProductDetail'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/home" element={<Test />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="return-policy" element={<ReturnPolicy />} />
            <Route path="appointment" element={<BookConsultation />} />
            <Route path="product" element={<ProductDetail />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
      {/* <Test /> */}
    </ThemeProvider>
  )
}

export default App
