import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  CreditCard,
  Lock,
  ChevronRight,
  CheckCircle,
  Edit,
  Truck,
  Package,
  Shield,
} from 'lucide-react'
import styled from 'styled-components'

// Main Container
const Container = styled.div`
  background: #f8f8f8;
  min-height: 100vh;
`

// Header
const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 1.5rem 0;
`

const HeaderContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 100;
  letter-spacing: 0.2rem;
  margin: 0;
  color: black;
`

const SecureCheckout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 768px) {
    display: none;
  }
`

// Progress Steps
const StepsContainer = styled.div`
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 2rem 0;
`

const StepsWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: #e0e0e0;
    z-index: 0;
  }
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => (props.active ? 'black' : props.completed ? '#27ae60' : 'white')};
  color: ${(props) => (props.active || props.completed ? 'white' : '#999')};
  border: 2px solid ${(props) => (props.active ? 'black' : props.completed ? '#27ae60' : '#e0e0e0')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`

const StepLabel = styled.div`
  font-size: 0.9rem;
  color: ${(props) => (props.active ? 'black' : '#999')};
  font-weight: ${(props) => (props.active ? '500' : '300')};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`

// Main Content
const MainContent = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

// Left Section
const CheckoutForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Section = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 4px;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
`

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0;
  color: black;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const StepNumber = styled.span`
  width: 30px;
  height: 30px;
  background: black;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
`

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns || '1fr 1fr'};
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-column: ${(props) => (props.fullWidth ? '1 / -1' : 'auto')};
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 400;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`

const Required = styled.span`
  color: #e74c3c;
`

const Input = styled.input`
  padding: 0.9rem 1rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
  }
`

const Select = styled.select`
  padding: 0.9rem 1rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
  }
`

const TextArea = styled.textarea`
  padding: 0.9rem 1rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  font-size: 1rem;
  border-radius: 4px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: black;
    background: white;
  }
`

const Checkbox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #666;
  cursor: pointer;

  input {
    margin-top: 0.2rem;
    accent-color: black;
  }
`

// Saved Address
const SavedAddress = styled.div`
  border: 2px solid ${(props) => (props.selected ? 'black' : '#e0e0e0')};
  padding: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: black;
  }
`

const AddressType = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`

const AddressText = styled.div`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.6;
`

const SelectedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: black;
  color: white;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`

const AddNewAddress = styled.button`
  width: 100%;
  padding: 1rem;
  border: 2px dashed #e0e0e0;
  background: none;
  color: #666;
  font-size: 0.95rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
    color: black;
  }
`

// Payment Methods
const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PaymentMethod = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  border: 2px solid ${(props) => (props.selected ? 'black' : '#e0e0e0')};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
  }

  input {
    accent-color: black;
  }
`

const PaymentIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #f8f8f8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`

const PaymentInfo = styled.div`
  flex: 1;
`

const PaymentTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: black;
  margin-bottom: 0.2rem;
`

const PaymentDescription = styled.div`
  font-size: 0.85rem;
  color: #666;
`

const CardDetails = styled(motion.div)`
  margin-top: 1rem;
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 4px;
`

// Right Section - Order Summary
const OrderSummary = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 4px;
  position: sticky;
  top: 2rem;
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
    order: -1;
  }
`

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0 0 1.5rem 0;
  color: black;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
`

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`

const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
`

const ItemImage = styled.div`
  width: 70px;
  height: 90px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
`

const ItemDetails = styled.div`
  flex: 1;
`

const ItemName = styled.div`
  font-size: 0.95rem;
  color: black;
  margin-bottom: 0.3rem;
  font-weight: 400;
`

const ItemMeta = styled.div`
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 0.3rem;
`

const ItemPrice = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: black;
`

const PriceBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: ${(props) => (props.highlight ? 'black' : '#666')};
  font-weight: ${(props) => (props.highlight ? '500' : '300')};
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 500;
  color: black;
  margin-bottom: 1.5rem;
`

const PlaceOrderButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  background: black;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.85rem;
  color: #666;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 4px;

  svg {
    color: #27ae60;
  }
`

// Component
const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
  })
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  })
  const [selectedAddress, setSelectedAddress] = useState('home')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [sameAsShipping, setSameAsShipping] = useState(true)

  const orderItems = [
    {
      id: 1,
      name: 'Elegant Silk Saree',
      size: 'Free Size',
      color: 'Black',
      quantity: 1,
      price: 8999,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=250&fit=crop',
    },
    {
      id: 2,
      name: 'Designer Lehenga Set',
      size: 'M',
      color: 'Maroon',
      quantity: 1,
      price: 15999,
      image: 'https://images.unsplash.com/photo-1583391733981-5ead0e3ef5f0?w=200&h=250&fit=crop',
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  const savedAddresses = [
    {
      id: 'home',
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      phone: '+91 98765 43210',
    },
    {
      id: 'office',
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Park, Floor 3',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 98765 43210',
    },
  ]

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setCurrentStep(3)
  }

  const handlePlaceOrder = () => {
    alert('Order placed successfully!')
    window.location.href = '/order-confirmation'
  }

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContainer>
          <Logo>LUXE</Logo>
          <SecureCheckout>
            <Lock size={18} />
            Secure Checkout
          </SecureCheckout>
        </HeaderContainer>
      </Header>

      {/* Progress Steps */}
      <StepsContainer>
        <StepsWrapper>
          <Step>
            <StepCircle active={currentStep === 1} completed={currentStep > 1}>
              {currentStep > 1 ? <CheckCircle size={20} /> : '1'}
            </StepCircle>
            <StepLabel active={currentStep === 1}>Contact</StepLabel>
          </Step>
          <Step>
            <StepCircle active={currentStep === 2} completed={currentStep > 2}>
              {currentStep > 2 ? <CheckCircle size={20} /> : '2'}
            </StepCircle>
            <StepLabel active={currentStep === 2}>Shipping</StepLabel>
          </Step>
          <Step>
            <StepCircle active={currentStep === 3}>3</StepCircle>
            <StepLabel active={currentStep === 3}>Payment</StepLabel>
          </Step>
        </StepsWrapper>
      </StepsContainer>

      {/* Main Content */}
      <MainContent>
        <CheckoutForm>
          {/* Contact Information */}
          <Section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader>
              <SectionTitle>
                <StepNumber>1</StepNumber>
                Contact Information
              </SectionTitle>
              {currentStep > 1 && (
                <EditButton onClick={() => setCurrentStep(1)}>
                  <Edit size={16} />
                  Edit
                </EditButton>
              )}
            </SectionHeader>

            {currentStep === 1 ? (
              <form onSubmit={handleContactSubmit}>
                <FormGrid>
                  <FormGroup fullWidth>
                    <Label>
                      Email Address <Required>*</Required>
                    </Label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      required
                    />
                  </FormGroup>
                  <FormGroup fullWidth>
                    <Label>
                      Phone Number <Required>*</Required>
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      required
                    />
                  </FormGroup>
                  <FormGroup fullWidth>
                    <Checkbox>
                      <input type="checkbox" />
                      Keep me updated with order notifications via SMS
                    </Checkbox>
                  </FormGroup>
                </FormGrid>
                <motion.button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'black',
                    color: 'white',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '1.5rem',
                    borderRadius: '4px',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Shipping
                </motion.button>
              </form>
            ) : (
              <div style={{ color: '#666', fontSize: '0.95rem' }}>
                <div>{contactInfo.email}</div>
                <div>{contactInfo.phone}</div>
              </div>
            )}
          </Section>

          {/* Shipping Address */}
          {currentStep >= 2 && (
            <Section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader>
                <SectionTitle>
                  <StepNumber>2</StepNumber>
                  Shipping Address
                </SectionTitle>
                {currentStep > 2 && (
                  <EditButton onClick={() => setCurrentStep(2)}>
                    <Edit size={16} />
                    Edit
                  </EditButton>
                )}
              </SectionHeader>

              {currentStep === 2 ? (
                <form onSubmit={handleShippingSubmit}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {savedAddresses.map((addr) => (
                      <SavedAddress
                        key={addr.id}
                        selected={selectedAddress === addr.id}
                        onClick={() => setSelectedAddress(addr.id)}
                      >
                        <AddressType>{addr.type}</AddressType>
                        <AddressText>
                          {addr.name}
                          <br />
                          {addr.address}
                          <br />
                          {addr.city}, {addr.state} - {addr.pincode}
                          <br />
                          {addr.phone}
                        </AddressText>
                        {selectedAddress === addr.id && (
                          <SelectedBadge>
                            <CheckCircle size={12} />
                            Selected
                          </SelectedBadge>
                        )}
                      </SavedAddress>
                    ))}
                    <AddNewAddress type="button">+ Add New Address</AddNewAddress>
                  </div>

                  <FormGroup fullWidth>
                    <Label>Delivery Instructions (Optional)</Label>
                    <TextArea placeholder="Any special instructions for delivery..." />
                  </FormGroup>

                  <motion.button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'black',
                      color: 'white',
                      border: 'none',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      marginTop: '1.5rem',
                      borderRadius: '4px',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to Payment
                  </motion.button>
                </form>
              ) : (
                <div style={{ color: '#666', fontSize: '0.95rem' }}>
                  {savedAddresses.find((a) => a.id === selectedAddress)?.address}
                  <br />
                  {savedAddresses.find((a) => a.id === selectedAddress)?.city},{' '}
                  {savedAddresses.find((a) => a.id === selectedAddress)?.state} -{' '}
                  {savedAddresses.find((a) => a.id === selectedAddress)?.pincode}
                </div>
              )}
            </Section>
          )}

          {/* Payment Method */}
          {currentStep >= 3 && (
            <Section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader>
                <SectionTitle>
                  <StepNumber>3</StepNumber>
                  Payment Method
                </SectionTitle>
              </SectionHeader>

              <PaymentMethods>
                <PaymentMethod selected={paymentMethod === 'card'}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <PaymentIcon>
                    <CreditCard size={24} />
                  </PaymentIcon>
                  <PaymentInfo>
                    <PaymentTitle>Credit/Debit Card</PaymentTitle>
                    <PaymentDescription>Pay securely with your card</PaymentDescription>
                  </PaymentInfo>
                </PaymentMethod>

                {paymentMethod === 'card' && (
                  <CardDetails
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FormGrid>
                      <FormGroup fullWidth>
                        <Label>
                          Card Number <Required>*</Required>
                        </Label>
                        <Input type="text" placeholder="1234 5678 9012 3456" required />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          Expiry Date <Required>*</Required>
                        </Label>
                        <Input type="text" placeholder="MM/YY" required />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          CVV <Required>*</Required>
                        </Label>
                        <Input type="text" placeholder="123" required />
                      </FormGroup>
                      <FormGroup fullWidth>
                        <Label>
                          Cardholder Name <Required>*</Required>
                        </Label>
                        <Input type="text" placeholder="Name on card" required />
                      </FormGroup>
                    </FormGrid>
                  </CardDetails>
                )}

                <PaymentMethod selected={paymentMethod === 'upi'}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <PaymentIcon>
                    <Package size={24} />
                  </PaymentIcon>
                  <PaymentInfo>
                    <PaymentTitle>UPI</PaymentTitle>
                    <PaymentDescription>
                      Pay using UPI apps like GPay, PhonePe, Paytm
                    </PaymentDescription>
                  </PaymentInfo>
                </PaymentMethod>

                <PaymentMethod selected={paymentMethod === 'cod'}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <PaymentIcon>
                    <Home size={24} />
                  </PaymentIcon>
                  <PaymentInfo>
                    <PaymentTitle>Cash on Delivery</PaymentTitle>
                    <PaymentDescription>Pay when you receive the order</PaymentDescription>
                  </PaymentInfo>
                </PaymentMethod>
              </PaymentMethods>
            </Section>
          )}
        </CheckoutForm>

        {/* Order Summary */}
        <OrderSummary
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SummaryTitle>Order Summary</SummaryTitle>

          <OrderItems>
            {orderItems.map((item) => (
              <OrderItem key={item.id}>
                <ItemImage image={item.image} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemMeta>
                    Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                  </ItemMeta>
                  <ItemPrice>₹{item.price.toLocaleString()}</ItemPrice>
                </ItemDetails>
              </OrderItem>
            ))}
          </OrderItems>

          <PriceBreakdown>
            <PriceRow>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </PriceRow>
            <PriceRow>
              <span>Shipping</span>
              <span style={{ color: '#27ae60' }}>FREE</span>
            </PriceRow>
            <PriceRow>
              <span>Tax (GST 18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </PriceRow>
          </PriceBreakdown>

          <TotalRow>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </TotalRow>

          <PlaceOrderButton
            onClick={handlePlaceOrder}
            disabled={currentStep < 3}
            whileHover={{ scale: currentStep >= 3 ? 1.02 : 1 }}
            whileTap={{ scale: currentStep >= 3 ? 0.98 : 1 }}
          >
            {currentStep >= 3 ? 'PLACE ORDER' : 'COMPLETE PREVIOUS STEPS'}
            <ChevronRight size={20} />
          </PlaceOrderButton>

          <SecurityNote>
            <Shield size={18} />
            Your payment information is secure and encrypted
          </SecurityNote>
        </OrderSummary>
      </MainContent>
    </Container>
  )
}

export default Checkout
