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
import Wishlist from './Pages/Wishlist'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import OTPVerification from './Pages/Auth/OTPVerification'
import EthnicCollections from './Pages/Collections/EthnicCollection'
import WesternCollections from './Pages/Collections/WesternCollections'
import BridalCollections from './Pages/Collections/BridalCollections'
import CustomCollections from './Pages/Collections/CustomCollections'
import WhatsApp from './components/contact/WhatsApp'

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
            {/* <Route path="product" element={<ProductDetail />} /> */}
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="my-cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />

            <Route path="products/ethnic/:slug" element={<ProductDetail />} />
            {/* <Route path="collections/ethnic" element={<EthnicCollections />} /> */}
            <Route path="collections/ethnic" element={<EthnicCollections />} />
            <Route path="collections/western" element={<WesternCollections />} />
            <Route path="collections/bridal" element={<BridalCollections />} />
            <Route path="collections/custom" element={<CustomCollections />} />

            {/* auth pages */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="verify-otp" element={<OTPVerification />} />
          </Routes>
          <WhatsApp
            message="Hello! I saw your website and have a question."
            phoneNumber="9140211686"
          />
        </AnimatePresence>
      </BrowserRouter>
      {/* <Test /> */}
    </ThemeProvider>
  )
}

export default App
