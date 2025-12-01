// src/pages/admin/AllOrders.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '@/api/axios'
import toast from 'react-hot-toast'

const AllOrders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' })

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    paymentStatus: '',
    paymentMethod: '',
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    applyFiltersAndSort()
  }, [orders, filters, sortConfig])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await api.get('/orders')
      setOrders(res.data.orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = () => {
    let result = [...orders]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (order) =>
          order._id.toLowerCase().includes(searchLower) ||
          order.user.email.toLowerCase().includes(searchLower) ||
          order.user.firstName.toLowerCase().includes(searchLower) ||
          order.user.lastName.toLowerCase().includes(searchLower) ||
          order.shippingAddress.phone.includes(filters.search)
      )
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter((order) => order.status === filters.status)
    }

    // Apply payment status filter
    if (filters.paymentStatus) {
      result = result.filter((order) => order.paymentStatus === filters.paymentStatus)
    }

    // Apply payment method filter
    if (filters.paymentMethod) {
      result = result.filter((order) => order.paymentMethod === filters.paymentMethod)
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue

      switch (sortConfig.key) {
        case 'createdAt':
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
          break
        case 'totalAmount':
          aValue = a.totalAmount
          bValue = b.totalAmount
          break
        case 'customer':
          aValue = `${a.user.firstName} ${a.user.lastName}`.toLowerCase()
          bValue = `${b.user.firstName} ${b.user.lastName}`.toLowerCase()
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        default:
          return 0
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    setFilteredOrders(result)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      paymentStatus: '',
      paymentMethod: '',
    })
  }

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleRowClick = (orderId) => {
    navigate(`/admin/orders/${orderId}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`
  }

  if (loading) {
    return <LoadingMessage>Loading orders...</LoadingMessage>
  }

  return (
    <Container>
      <Header>
        <Title>
          All Orders <OrderCount>({filteredOrders.length})</OrderCount>
        </Title>
      </Header>

      <FilterSection>
        <FilterGrid>
          <FilterGroup>
            <Label>Search</Label>
            <Input
              type="text"
              name="search"
              placeholder="Order ID, email, customer name, phone..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </FilterGroup>

          <FilterGroup>
            <Label>Order Status</Label>
            <Select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <Label>Payment Status</Label>
            <Select
              name="paymentStatus"
              value={filters.paymentStatus}
              onChange={handleFilterChange}
            >
              <option value="">All Payment Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <Label>Payment Method</Label>
            <Select
              name="paymentMethod"
              value={filters.paymentMethod}
              onChange={handleFilterChange}
            >
              <option value="">All Methods</option>
              <option value="COD">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <Label>&nbsp;</Label>
            <ClearButton onClick={handleClearFilters}>Clear Filters</ClearButton>
          </FilterGroup>
        </FilterGrid>
      </FilterSection>

      <TableContainer>
        {filteredOrders.length === 0 ? (
          <EmptyMessage>
            {filters.search || filters.status || filters.paymentStatus || filters.paymentMethod
              ? 'No orders found matching the filters'
              : 'No orders yet'}
          </EmptyMessage>
        ) : (
          <TableWrapper>
            <Table>
              <Thead>
                <tr>
                  <Th>Order ID</Th>
                  <Th $sortable onClick={() => handleSort('customer')}>
                    Customer
                    <SortIcon $active={sortConfig.key === 'customer'}>
                      {sortConfig.key === 'customer' && sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </SortIcon>
                  </Th>
                  <Th>Items</Th>
                  <Th $sortable onClick={() => handleSort('totalAmount')}>
                    Total
                    <SortIcon $active={sortConfig.key === 'totalAmount'}>
                      {sortConfig.key === 'totalAmount' && sortConfig.direction === 'asc'
                        ? '↑'
                        : '↓'}
                    </SortIcon>
                  </Th>
                  <Th $sortable onClick={() => handleSort('status')}>
                    Status
                    <SortIcon $active={sortConfig.key === 'status'}>
                      {sortConfig.key === 'status' && sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </SortIcon>
                  </Th>
                  <Th>Payment</Th>
                  <Th>Method</Th>
                  <Th $sortable onClick={() => handleSort('createdAt')}>
                    Order Date
                    <SortIcon $active={sortConfig.key === 'createdAt'}>
                      {sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </SortIcon>
                  </Th>
                </tr>
              </Thead>
              <Tbody>
                {filteredOrders.map((order) => (
                  <Tr key={order._id} onClick={() => handleRowClick(order._id)}>
                    <Td>#{order._id.slice(-8).toUpperCase()}</Td>
                    <Td>
                      <div>
                        {order.user.firstName} {order.user.lastName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{order.user.email}</div>
                    </Td>
                    <Td>
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </Td>
                    <Td style={{ fontWeight: '600' }}>{formatCurrency(order.totalAmount)}</Td>
                    <Td>
                      <StatusBadge $status={order.status}>{order.status}</StatusBadge>
                    </Td>
                    <Td>
                      <PaymentBadge $status={order.paymentStatus}>
                        {order.paymentStatus}
                      </PaymentBadge>
                    </Td>
                    <Td>{order.paymentMethod}</Td>
                    <Td>{formatDate(order.createdAt)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableWrapper>
        )}
      </TableContainer>
    </Container>
  )
}

export default AllOrders

const Container = styled.div`
  max-width: 1400px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 500;
  color: #333;
`

const OrderCount = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: normal;
`

const FilterSection = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #666;
  }
`

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #666;
  }
`

const ClearButton = styled.button`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  align-self: flex-end;

  &:hover {
    background-color: #e0e0e0;
  }
`

const TableContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`

const TableWrapper = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`

const Thead = styled.thead`
  background-color: #f8f9fa;
  border-bottom: 2px solid #e0e0e0;
`

const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  cursor: ${(props) => (props.$sortable ? 'pointer' : 'default')};
  user-select: none;

  &:hover {
    background-color: ${(props) => (props.$sortable ? '#f0f0f0' : 'transparent')};
  }
`

const SortIcon = styled.span`
  margin-left: 6px;
  font-size: 12px;
  color: ${(props) => (props.$active ? '#333' : '#ccc')};
`

const Tbody = styled.tbody``

const Tr = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`

const Td = styled.td`
  padding: 12px 16px;
  color: #333;
  white-space: nowrap;
`

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${(props) => {
    switch (props.$status) {
      case 'pending':
        return '#fff3cd'
      case 'confirmed':
        return '#cfe2ff'
      case 'processing':
        return '#e7d9f9'
      case 'shipped':
        return '#cff4fc'
      case 'delivered':
        return '#d1e7dd'
      case 'cancelled':
        return '#f8d7da'
      default:
        return '#e9ecef'
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case 'pending':
        return '#856404'
      case 'confirmed':
        return '#084298'
      case 'processing':
        return '#6f42c1'
      case 'shipped':
        return '#055160'
      case 'delivered':
        return '#0f5132'
      case 'cancelled':
        return '#842029'
      default:
        return '#495057'
    }
  }};
`

const PaymentBadge = styled.span`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${(props) => (props.$status === 'paid' ? '#d1e7dd' : '#fff3cd')};
  color: ${(props) => (props.$status === 'paid' ? '#0f5132' : '#856404')};
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
`
