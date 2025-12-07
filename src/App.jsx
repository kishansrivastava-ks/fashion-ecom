import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import UserDashboard from './Pages/Dashboard/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './Pages/Dashboard/Admin/AdminDashboard'
import AllProducts from './Pages/Dashboard/Admin/AllProducts'
import ProductDetails from './Pages/Dashboard/Admin/ProductDetails'
import AddProduct from './Pages/Dashboard/Admin/AddProduct'
import AllOrders from './Pages/Dashboard/Admin/AllOrders'
import OrderDetails from './Pages/Dashboard/Admin/OrderDetails'
import { CartProvider } from './contexts/CartContext'
import GlobalCartSidebar from './components/GlobalCartSidebar'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import ResetPassword from './Pages/Auth/ResetPassword'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
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

                <Route path="products/:slug" element={<ProductDetail />} />
                {/* <Route path="collections/ethnic" element={<EthnicCollections />} /> */}
                <Route path="collections/ethnic" element={<EthnicCollections />} />
                <Route path="collections/western" element={<WesternCollections />} />
                <Route path="collections/bridal" element={<BridalCollections />} />
                <Route path="collections/custom" element={<CustomCollections />} />

                {/* auth pages */}
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verify-otp" element={<OTPVerification />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Admin routes */}
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/admin/products" replace />} />
                  <Route path="products" element={<AllProducts />} />
                  <Route path="products/add" element={<AddProduct />} />
                  <Route path="products/:id" element={<ProductDetails />} />
                  <Route path="orders" element={<AllOrders />} />
                  <Route path="orders/:id" element={<OrderDetails />} />
                </Route>
              </Routes>
              <WhatsApp
                message="Hello! I saw your website and have a question."
                phoneNumber="9140211686"
              />
            </AnimatePresence>
            <GlobalCartSidebar />
          </BrowserRouter>
          <Toaster position="top-right" />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
