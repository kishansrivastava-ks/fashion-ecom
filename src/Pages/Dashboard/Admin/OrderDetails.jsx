// src/pages/admin/OrderDetails.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '@/api/axios'
import toast from 'react-hot-toast'

const Container = styled.div`
  max-width: 1200px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 500;
  color: #333;
`

const OrderId = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: normal;
  margin-left: 12px;
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const Section = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
`

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
`

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Item = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
`

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const ItemName = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #333;
`

const ItemSKU = styled.div`
  font-size: 13px;
  color: #666;
`

const ItemPrice = styled.div`
  font-size: 14px;
  color: #666;
`

const ItemQuantity = styled.div`
  font-size: 14px;
  color: #666;
`

const ItemSubtotal = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-top: auto;
  text-align: right;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`

const DetailLabel = styled.span`
  font-size: 14px;
  color: #666;
`

const DetailValue = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
  text-align: right;
`

const TotalRow = styled(DetailRow)`
  padding-top: 16px;
  margin-top: 12px;
  border-top: 2px solid #e0e0e0;
  border-bottom: none;
`

const TotalLabel = styled(DetailLabel)`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`

const TotalValue = styled(DetailValue)`
  font-size: 18px;
  font-weight: 700;
  color: #333;
`

const StatusBadge = styled.span`
  padding: 6px 14px;
  border-radius: 14px;
  font-size: 13px;
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
  padding: 6px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${(props) => {
    switch (props.$status) {
      case 'paid':
        return '#d1e7dd'
      case 'pending':
        return '#fff3cd'
      case 'failed':
        return '#f8d7da'
      case 'refunded':
        return '#cfe2ff'
      default:
        return '#e9ecef'
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case 'paid':
        return '#0f5132'
      case 'pending':
        return '#856404'
      case 'failed':
        return '#842029'
      case 'refunded':
        return '#084298'
      default:
        return '#495057'
    }
  }};
`

const AddressBlock = styled.div`
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
  line-height: 1.6;
  font-size: 14px;
  color: #333;
`

const StatusUpdateSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
`

const StatusUpdateTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`

const StatusUpdateForm = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const Select = styled.select`
  flex: 1;
  padding: 10px 12px;
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

const UpdateButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const NotesSection = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: #fffbea;
  border: 1px solid #f9e79f;
  border-radius: 6px;
`

const NotesLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #856404;
  margin-bottom: 6px;
`

const NotesText = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    fetchOrder()
  }, [id])

  useEffect(() => {
    if (order) {
      setNewStatus(order.status)
    }
  }, [order])

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/orders/${id}`)
      setOrder(res.data.order)
    } catch (error) {
      console.error('Error fetching order:', error)
      toast.error('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async () => {
    if (newStatus === order.status) {
      toast.error('Please select a different status')
      return
    }

    try {
      setUpdating(true)
      await api.patch(`/orders/${id}/status`, { status: newStatus })
      toast.success('Order status updated successfully!')

      // Update local state
      setOrder((prev) => ({
        ...prev,
        status: newStatus,
      }))
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error(error.response?.data?.message || 'Failed to update order status')
    } finally {
      setUpdating(false)
    }
  }

  const handleItemClick = (productId) => {
    navigate(`/admin/products/${productId}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString()}`
  }

  if (loading) {
    return <LoadingMessage>Loading order details...</LoadingMessage>
  }

  if (!order) {
    return <LoadingMessage>Order not found</LoadingMessage>
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/admin/orders')}>← Back to Orders</BackButton>
      </Header>

      <div style={{ marginBottom: '24px' }}>
        <Title>
          Order Details
          <OrderId>#{order._id.slice(-8).toUpperCase()}</OrderId>
        </Title>
        <div style={{ marginTop: '8px', color: '#666', fontSize: '14px' }}>
          Placed on {formatDate(order.createdAt)}
        </div>
      </div>

      <Grid>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Section>
            <SectionTitle>Order Items ({order.items.length})</SectionTitle>
            <ItemsList>
              {order.items.map((item, index) => (
                <Item key={index} onClick={() => handleItemClick(item.product._id)}>
                  <ItemImage
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80?text=No+Image'
                    }}
                  />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemSKU>SKU: {item.sku}</ItemSKU>
                    <ItemPrice>Price: {formatCurrency(item.price)}</ItemPrice>
                    <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
                  </ItemDetails>
                  <ItemSubtotal>{formatCurrency(item.subtotal)}</ItemSubtotal>
                </Item>
              ))}
            </ItemsList>

            <div style={{ marginTop: '24px' }}>
              <TotalRow>
                <TotalLabel>Total Amount</TotalLabel>
                <TotalValue>
                  {formatCurrency(order.totalAmount)} {order.currency}
                </TotalValue>
              </TotalRow>
            </div>
          </Section>

          <Section>
            <SectionTitle>Shipping Address</SectionTitle>
            <AddressBlock>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                {order.shippingAddress.fullName}
              </div>
              <div>{order.shippingAddress.phone}</div>
              <div style={{ marginTop: '8px' }}>{order.shippingAddress.addressLine1}</div>
              {order.shippingAddress.addressLine2 && (
                <div>{order.shippingAddress.addressLine2}</div>
              )}
              <div>
                {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                {order.shippingAddress.postalCode}
              </div>
              <div>{order.shippingAddress.country}</div>
            </AddressBlock>

            {order.notes && (
              <NotesSection>
                <NotesLabel>Customer Notes:</NotesLabel>
                <NotesText>{order.notes}</NotesText>
              </NotesSection>
            )}
          </Section>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Section>
            <SectionTitle>Customer Information</SectionTitle>
            <DetailRow>
              <DetailLabel>Name</DetailLabel>
              <DetailValue>
                {order.user.firstName} {order.user.lastName}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>{order.user.email}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Customer ID</DetailLabel>
              <DetailValue>#{order.user._id.slice(-6).toUpperCase()}</DetailValue>
            </DetailRow>
          </Section>

          <Section>
            <SectionTitle>Order Status</SectionTitle>
            <DetailRow>
              <DetailLabel>Order Status</DetailLabel>
              <DetailValue>
                <StatusBadge $status={order.status}>{order.status}</StatusBadge>
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Payment Status</DetailLabel>
              <DetailValue>
                <PaymentBadge $status={order.paymentStatus}>{order.paymentStatus}</PaymentBadge>
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Payment Method</DetailLabel>
              <DetailValue>{order.paymentMethod}</DetailValue>
            </DetailRow>

            <StatusUpdateSection>
              <StatusUpdateTitle>Update Order Status</StatusUpdateTitle>
              <StatusUpdateForm>
                <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
                <UpdateButton
                  onClick={handleUpdateStatus}
                  disabled={updating || newStatus === order.status}
                >
                  {updating ? 'Updating...' : 'Update'}
                </UpdateButton>
              </StatusUpdateForm>
            </StatusUpdateSection>
          </Section>

          <Section>
            <SectionTitle>Order Timeline</SectionTitle>
            <DetailRow>
              <DetailLabel>Created</DetailLabel>
              <DetailValue>{formatDate(order.createdAt)}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Last Updated</DetailLabel>
              <DetailValue>{formatDate(order.updatedAt)}</DetailValue>
            </DetailRow>
          </Section>
        </div>
      </Grid>
    </Container>
  )
}

export default OrderDetails
