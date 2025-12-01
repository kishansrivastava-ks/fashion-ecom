// src/pages/admin/AdminDashboard.jsx
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Package, Plus, Home, LogOut, Settings, BarChart3, Package2 } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'
import PageTransition from '@/utils/PageTransition'
import { useAuth } from '@/contexts/AuthContext'

const DashboardContainer = styled.div`
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
  padding: 2rem 0;
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
    padding: 1.5rem 0;
  }
`

const Brand = styled.div`
  font-size: 1.75rem;
  font-weight: 200;
  letter-spacing: 0.15em;
  padding: 0 2rem;
  margin-bottom: 0.5rem;
  color: black;

  @media (max-width: 968px) {
    font-size: 1.5rem;
    padding: 0 1.5rem;
  }
`

const AdminBadge = styled.div`
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 2rem;
  margin-bottom: 3rem;
  font-weight: 400;

  @media (max-width: 968px) {
    margin-bottom: 1.5rem;
    padding: 0 1.5rem;
  }
`

const NavSection = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 1rem;
  flex: 1;

  @media (max-width: 968px) {
    padding: 0 1rem;
  }
`

const SidebarItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  border-radius: 0;
  position: relative;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
    color: black;
  }

  &.active {
    background: black;
    color: white;
    font-weight: 400;

    &:hover {
      background: #333;
    }
  }

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 968px) {
    padding: 0.85rem 1rem;
    font-size: 0.9rem;
  }
`

const SidebarDivider = styled.div`
  height: 1px;
  background: #e5e5e5;
  margin: 1rem 0;
`

const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e5e5e5;
  margin-top: auto;

  @media (max-width: 968px) {
    display: none;
  }
`

const FooterButton = styled(motion.button)`
  width: 100%;
  background: transparent;
  border: 1px solid #e5e5e5;
  color: #666;
  padding: 0.85rem 1.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.02em;
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

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
    flex-wrap: wrap;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  color: black;
`

const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    order: 3;

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
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.02em;
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

const LogoutButton = styled(motion.button)`
  background: black;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
  }
`

const Content = styled.main`
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
  background: #fafafa;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`

// Demo Component showing the structure
const AdminDashboard = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleHomeClick = () => {
    // console.log('Home clicked')
    navigate('/')
  }

  return (
    <PageTransition>
      <DashboardContainer>
        <Sidebar>
          <Brand>SHAASHEE</Brand>
          <AdminBadge>Admin Panel</AdminBadge>

          <NavSection>
            <SidebarItem href="/admin/products" className="active">
              <Package size={18} />
              <span>All Products</span>
            </SidebarItem>

            <SidebarItem href="/admin/products/add">
              <Plus size={18} />
              <span>Add Product</span>
            </SidebarItem>
            <SidebarItem href="/admin/orders">
              {' '}
              <Package2 size={18} />
              <span>View Orders</span>
            </SidebarItem>

            {/* <SidebarDivider /> */}

            {/* <SidebarItem href="/admin/analytics">
              <BarChart3 size={18} />
              <span>Analytics</span>
            </SidebarItem>

            <SidebarItem href="/admin/settings">
              <Settings size={18} />
              <span>Settings</span>
            </SidebarItem> */}
          </NavSection>

          <SidebarFooter>
            <FooterButton
              onClick={handleHomeClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home size={18} />
              Back to Store
            </FooterButton>
          </SidebarFooter>
        </Sidebar>

        <MainContent>
          <Header>
            <HeaderLeft>
              <HeaderTitle>Dashboard</HeaderTitle>
              <HeaderSubtitle>Manage your store and products</HeaderSubtitle>
            </HeaderLeft>

            <HeaderActions>
              <ActionButton
                onClick={handleHomeClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={16} />
                <span>Home</span>
              </ActionButton>

              <LogoutButton
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </LogoutButton>
            </HeaderActions>
          </Header>

          <Content>
            <Outlet />
          </Content>
        </MainContent>
      </DashboardContainer>
    </PageTransition>
  )
}

export default AdminDashboard
