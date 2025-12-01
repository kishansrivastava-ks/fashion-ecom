// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Package,
  LogOut,
  Home,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  MapPin,
  Copy,
  Truck,
} from 'lucide-react'
import api from '../../api/axios'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'

const UserDashboard = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [ordersCount, setOrdersCount] = useState(0)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [orderDetails, setOrderDetails] = useState(null)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)

  useEffect(() => {
    fetchProfile()
    fetchOrders()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (selectedOrderId) {
      fetchOrderDetails(selectedOrderId)
    } else {
      setOrderDetails(null)
    }
  }, [selectedOrderId])

  const fetchProfile = async () => {
    setLoadingProfile(true)
    try {
      const res = await api.get('/auth/me')
      setProfile(res.data.user)
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Failed to load profile')
      if (err?.response?.status === 401) navigate('/login')
    } finally {
      setLoadingProfile(false)
    }
  }

  const fetchOrders = async () => {
    setLoadingOrders(true)
    try {
      const res = await api.get('/orders/my')
      setOrders(res.data.orders || [])
      setOrdersCount(res.data.count || 0)
      if (res.data.orders && res.data.orders.length > 0) {
        setSelectedOrderId(res.data.orders[0]._id)
      }
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Failed to load orders')
    } finally {
      setLoadingOrders(false)
    }
  }

  const fetchOrderDetails = async (orderId) => {
    setLoadingDetails(true)
    try {
      const res = await api.get(`/orders/my/${orderId}`)
      setOrderDetails(res.data.order)
      setActiveTab('orders')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Failed to load order details')
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <Page>
      <Sidebar>
        <Brand>SHAASHEE</Brand>

        <NavMenu>
          <NavItem
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <User size={18} />
            <span>Profile</span>
          </NavItem>

          <NavItem
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Package size={18} />
            <span>My Orders</span>
            {ordersCount > 0 && <OrderBadge>{ordersCount}</OrderBadge>}
          </NavItem>
        </NavMenu>

        <SidebarFooter>
          <NavItem onClick={handleLogout} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
            <LogOut size={18} />
            <span>Logout</span>
          </NavItem>
        </SidebarFooter>
      </Sidebar>

      <Content>
        <Header>
          <HeaderLeft>
            <WelcomeText>
              {profile ? `${profile.firstName} ${profile.lastName}` : 'Welcome'}
            </WelcomeText>
            <EmailText>{profile ? profile.email : loadingProfile ? 'Loading...' : ''}</EmailText>
          </HeaderLeft>

          <HeaderActions>
            <ActionButton onClick={goHome} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Home size={16} />
              Home
            </ActionButton>
            <ActionButton
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={16} />
              Logout
            </ActionButton>
          </HeaderActions>
        </Header>

        <Body>
          <MainCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionHeader>
                    <SectionTitle>Your Profile</SectionTitle>
                    <SectionSubtitle>Manage your account information</SectionSubtitle>
                  </SectionHeader>

                  {loadingProfile ? (
                    <LoadingState>Loading your profile...</LoadingState>
                  ) : profile ? (
                    <ProfileContent>
                      <InfoGrid>
                        <InfoCard>
                          <InfoIcon>
                            <User size={20} />
                          </InfoIcon>
                          <InfoContent>
                            <InfoLabel>Full Name</InfoLabel>
                            <InfoValue>
                              {profile.firstName} {profile.lastName}
                            </InfoValue>
                          </InfoContent>
                        </InfoCard>

                        <InfoCard>
                          <InfoIcon>
                            <Mail size={20} />
                          </InfoIcon>
                          <InfoContent>
                            <InfoLabel>Email Address</InfoLabel>
                            <InfoValue>{profile.email}</InfoValue>
                          </InfoContent>
                        </InfoCard>

                        <InfoCard>
                          <InfoIcon>
                            <Phone size={20} />
                          </InfoIcon>
                          <InfoContent>
                            <InfoLabel>Phone Number</InfoLabel>
                            <InfoValue>{profile.phone}</InfoValue>
                          </InfoContent>
                        </InfoCard>

                        <InfoCard>
                          <InfoIcon>
                            <Calendar size={20} />
                          </InfoIcon>
                          <InfoContent>
                            <InfoLabel>Member Since</InfoLabel>
                            <InfoValue>
                              {new Date(profile.createdAt).toLocaleDateString()}
                            </InfoValue>
                          </InfoContent>
                        </InfoCard>

                        <InfoCard>
                          <InfoIcon>
                            {profile.isVerified ? (
                              <CheckCircle size={20} color="#22c55e" />
                            ) : (
                              <XCircle size={20} color="#ef4444" />
                            )}
                          </InfoIcon>
                          <InfoContent>
                            <InfoLabel>Account Status</InfoLabel>
                            <InfoValue>
                              {profile.isVerified ? 'Verified' : 'Not Verified'}
                            </InfoValue>
                          </InfoContent>
                        </InfoCard>
                      </InfoGrid>

                      <ViewOrdersButton
                        onClick={() => setActiveTab('orders')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Package size={18} />
                        View My Orders
                      </ViewOrdersButton>
                    </ProfileContent>
                  ) : (
                    <EmptyState>No profile data available</EmptyState>
                  )}
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SectionHeader>
                    <SectionTitle>My Orders</SectionTitle>
                    <SectionSubtitle>Track and manage your purchases</SectionSubtitle>
                  </SectionHeader>

                  {loadingOrders ? (
                    <LoadingState>Loading your orders...</LoadingState>
                  ) : orders.length === 0 ? (
                    <EmptyState>
                      <Package size={48} color="#ccc" />
                      <p>No orders found</p>
                    </EmptyState>
                  ) : (
                    <OrdersList>
                      {orders.map((order, index) => (
                        <OrderCard
                          key={order._id}
                          active={order._id === selectedOrderId}
                          onClick={() => setSelectedOrderId(order._id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -4 }}
                        >
                          <OrderHeader>
                            <OrderId>Order #{order._id.slice(-6).toUpperCase()}</OrderId>
                            <StatusBadge status={order.status || order.paymentStatus}>
                              {order.status || order.paymentStatus}
                            </StatusBadge>
                          </OrderHeader>

                          <OrderDate>
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </OrderDate>

                          <OrderAmount>
                            {order.currency} {order.totalAmount.toLocaleString()}
                          </OrderAmount>
                        </OrderCard>
                      ))}
                    </OrdersList>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </MainCard>

          <DetailsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeader>
              <SectionTitle>Order Details</SectionTitle>
              <SectionSubtitle>
                {selectedOrderId ? 'Complete order information' : 'Select an order to view details'}
              </SectionSubtitle>
            </SectionHeader>

            {!selectedOrderId && (
              <EmptyState>
                <Package size={48} color="#ccc" />
                <p>No order selected</p>
              </EmptyState>
            )}

            {selectedOrderId && loadingDetails && (
              <LoadingState>Loading order details...</LoadingState>
            )}

            <AnimatePresence mode="wait">
              {orderDetails && (
                <motion.div
                  key={orderDetails._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <OrderDetailsContent>
                    <DetailSection>
                      <DetailRow>
                        <DetailLabel>Order ID</DetailLabel>
                        <DetailValue>{orderDetails._id}</DetailValue>
                      </DetailRow>

                      <DetailRow>
                        <DetailLabel>Placed On</DetailLabel>
                        <DetailValue>
                          {new Date(orderDetails.createdAt).toLocaleString()}
                        </DetailValue>
                      </DetailRow>

                      <DetailRow>
                        <DetailLabel>Payment Method</DetailLabel>
                        <DetailValue>{orderDetails.paymentMethod}</DetailValue>
                      </DetailRow>

                      <DetailRow>
                        <DetailLabel>Payment Status</DetailLabel>
                        <StatusBadge status={orderDetails.paymentStatus}>
                          {orderDetails.paymentStatus}
                        </StatusBadge>
                      </DetailRow>

                      <DetailRow>
                        <DetailLabel>Order Status</DetailLabel>
                        <StatusBadge status={orderDetails.status}>
                          {orderDetails.status}
                        </StatusBadge>
                      </DetailRow>
                    </DetailSection>

                    <Divider />

                    <DetailSection>
                      <SubsectionTitle>Order Items</SubsectionTitle>
                      <ItemsList>
                        {orderDetails.items.map((item) => (
                          <ItemCard key={item.product._id || item.product}>
                            <ItemImage
                              src={item.image || item.product?.images?.[0]?.url}
                              alt={item.name}
                            />
                            <ItemInfo>
                              <ItemName>{item.name}</ItemName>
                              <ItemSKU>{item.sku}</ItemSKU>
                              <ItemMeta>
                                <MetaItem>Qty: {item.quantity}</MetaItem>
                                <MetaItem>
                                  {orderDetails.currency} {item.price.toLocaleString()}
                                </MetaItem>
                                <MetaItem>
                                  Subtotal: {orderDetails.currency} {item.subtotal.toLocaleString()}
                                </MetaItem>
                              </ItemMeta>
                            </ItemInfo>
                          </ItemCard>
                        ))}
                      </ItemsList>

                      <TotalRow>
                        <TotalLabel>Total Amount</TotalLabel>
                        <TotalValue>
                          {orderDetails.currency} {orderDetails.totalAmount.toLocaleString()}
                        </TotalValue>
                      </TotalRow>
                    </DetailSection>

                    <Divider />

                    <DetailSection>
                      <SubsectionTitle>
                        <MapPin size={18} />
                        Shipping Address
                      </SubsectionTitle>
                      <AddressCard>
                        <AddressName>{orderDetails.shippingAddress.fullName}</AddressName>
                        <AddressLine>{orderDetails.shippingAddress.phone}</AddressLine>
                        <AddressLine>{orderDetails.shippingAddress.addressLine1}</AddressLine>
                        {orderDetails.shippingAddress.addressLine2 && (
                          <AddressLine>{orderDetails.shippingAddress.addressLine2}</AddressLine>
                        )}
                        <AddressLine>
                          {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{' '}
                          {orderDetails.shippingAddress.postalCode}
                        </AddressLine>
                        <AddressLine>{orderDetails.shippingAddress.country}</AddressLine>
                      </AddressCard>
                    </DetailSection>

                    {orderDetails.notes && (
                      <>
                        <Divider />
                        <DetailSection>
                          <SubsectionTitle>Order Notes</SubsectionTitle>
                          <NotesText>{orderDetails.notes}</NotesText>
                        </DetailSection>
                      </>
                    )}

                    <ActionButtonsGroup>
                      <PrimaryActionButton
                        onClick={() => toast.success('Tracking feature coming soon')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Truck size={18} />
                        Track Order
                      </PrimaryActionButton>

                      <SecondaryActionButton
                        onClick={() => {
                          navigator.clipboard?.writeText(window.location.href)
                          toast.success('Order link copied')
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Copy size={18} />
                        Copy Link
                      </SecondaryActionButton>
                    </ActionButtonsGroup>
                  </OrderDetailsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </DetailsCard>
        </Body>
      </Content>
    </Page>
  )
}

export default UserDashboard

/* Styled Components */

const Page = styled.div`
  display: flex;
  min-height: 100vh;
  background: #fafafa;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`

const Sidebar = styled.aside`
  width: 280px;
  background: white;
  border-right: 1px solid #e5e5e5;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;

  @media (max-width: 968px) {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #e5e5e5;
    padding: 1.5rem;
  }
`

const Brand = styled.div`
  font-size: 1.75rem;
  font-weight: 200;
  letter-spacing: 0.15em;
  margin-bottom: 3rem;
  color: black;

  @media (max-width: 968px) {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;

  @media (max-width: 968px) {
    flex-direction: row;
    gap: 1rem;
  }
`

const NavItem = styled(motion.button)`
  background: ${(p) => (p.active ? 'black' : 'transparent')};
  color: ${(p) => (p.active ? 'white' : '#666')};
  border: none;
  padding: 1rem 1.25rem;
  border-radius: 0;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${(p) => (p.active ? 'black' : '#f5f5f5')};
    color: ${(p) => (p.active ? 'white' : 'black')};
  }

  @media (max-width: 968px) {
    flex: 1;
    justify-content: center;
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
`

const OrderBadge = styled.span`
  background: white;
  color: black;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: auto;
`

const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;

  @media (max-width: 968px) {
    display: none;
  }
`

const Content = styled.main`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const WelcomeText = styled.h1`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  margin: 0;
  color: black;
`

const EmailText = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
  font-weight: 300;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`

const ActionButton = styled(motion.button)`
  background: white;
  color: black;
  border: 1px solid #e5e5e5;
  padding: 0.75rem 1.25rem;
  border-radius: 0;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    border-color: black;
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
  }
`

const Body = styled.section`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 350px 1fr;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const MainCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e5e5;
  padding: 2rem;
  min-height: 500px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const DetailsCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e5e5;
  padding: 2rem;
  min-height: 500px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const SectionHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.02em;
  margin: 0 0 0.5rem 0;
  color: black;
`

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-weight: 300;
`

const LoadingState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #999;
  font-size: 0.95rem;
  font-weight: 300;
`

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #999;
  font-size: 0.95rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  p {
    margin: 0;
  }
`

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
`

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #e5e5e5;
  flex-shrink: 0;
`

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`

const InfoLabel = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 400;
`

const InfoValue = styled.div`
  font-size: 0.95rem;
  color: black;
  font-weight: 400;
`

const ViewOrdersButton = styled(motion.button)`
  background: black;
  color: white;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const OrderCard = styled(motion.div)`
  background: ${(p) => (p.active ? '#fafafa' : 'white')};
  border: 1px solid ${(p) => (p.active ? 'black' : '#e5e5e5')};
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: black;
  }
`

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`

const OrderId = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: black;
`

const StatusBadge = styled.span`
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: white;
  background: ${(p) => {
    if (p.status === 'confirmed' || p.status === 'completed') return '#22c55e'
    if (p.status === 'pending' || p.status === 'processing') return '#f59e0b'
    if (p.status === 'cancelled' || p.status === 'failed') return '#ef4444'
    return '#666'
  }};
`

const OrderDate = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 300;
`

const OrderAmount = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: black;
`

const OrderDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
`

const DetailLabel = styled.div`
  font-size: 0.85rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 400;
`

const DetailValue = styled.div`
  font-size: 0.9rem;
  color: black;
  font-weight: 400;
  text-align: right;
  max-width: 60%;
  word-break: break-all;
`

const Divider = styled.div`
  height: 1px;
  background: #e5e5e5;
  margin: 1rem 0;
`

const SubsectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  margin: 0;
  color: black;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ItemCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #fafafa;
  border: 1px solid #f0f0f0;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #e5e5e5;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
`

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`

const ItemName = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: black;
`

const ItemSKU = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const ItemMeta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`

const MetaItem = styled.span`
  font-size: 0.85rem;
  color: #666;
  font-weight: 300;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: #fafafa;
  border: 1px solid #e5e5e5;
  margin-top: 1rem;
`

const TotalLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: black;
`

const TotalValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
`

const AddressCard = styled.div`
  padding: 1.5rem;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const AddressName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: black;
  margin-bottom: 0.25rem;
`

const AddressLine = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
`

const NotesText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
  padding: 1rem;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  font-weight: 300;
`

const ActionButtonsGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const PrimaryActionButton = styled(motion.button)`
  flex: 1;
  background: black;
  color: white;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`

const SecondaryActionButton = styled(motion.button)`
  flex: 1;
  background: white;
  color: black;
  border: 1px solid #e5e5e5;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    border-color: black;
  }
`
