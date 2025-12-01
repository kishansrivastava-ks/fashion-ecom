// src/components/CartSidebar.jsx
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function CartSidebar({ open, onClose, cart, refreshCart }) {
  console.log('Cart data in CartSidebar:', cart)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const handleQuantityChange = (itemId, newQuantity) => {
    // Implement quantity change logic here
    toast.success(`Quantity updated`)
    // refreshCart() if you have backend integration
  }

  const handleRemoveItem = (itemId) => {
    // Implement remove item logic here
    toast.success(`Item removed from cart`)
    // refreshCart() if you have backend integration
  }

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...')
    // Navigate to checkout page
    onClose()
  }

  const itemCount = cart?.items?.length || 0
  const isEmpty = !cart || !cart.items || cart.items.length === 0

  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <Panel
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Header>
              <TitleWrapper>
                <Title>Shopping Bag</Title>
                {!isEmpty && (
                  <ItemCount>
                    ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </ItemCount>
                )}
              </TitleWrapper>
              <CloseBtn
                aria-label="Close cart"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </CloseBtn>
            </Header>

            <Content>
              {isEmpty ? (
                <EmptyState>
                  <ShoppingBag size={64} color="#ddd" />
                  <EmptyText>Your shopping bag is empty</EmptyText>
                </EmptyState>
              ) : (
                <ItemsList>
                  {cart.items.map((item, index) => {
                    const product = item.product || {}
                    const img =
                      (product.images && (product.images[0]?.url || product.images[0])) ||
                      product.image ||
                      ''
                    return (
                      <Item
                        key={product._id || product.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Thumb src={img} alt={product.name} />
                        <ItemInfo>
                          <ItemName>{product.name}</ItemName>
                          <ItemSKU>{product.sku}</ItemSKU>
                          <ItemPrice>
                            {product.currency || '₹'}{' '}
                            {product.price?.toLocaleString?.() ?? product.price}
                          </ItemPrice>

                          <QuantityControl>
                            <QuantityButton
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Minus size={14} />
                            </QuantityButton>
                            <QuantityDisplay>{item.quantity}</QuantityDisplay>
                            <QuantityButton
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Plus size={14} />
                            </QuantityButton>
                          </QuantityControl>
                        </ItemInfo>

                        <RemoveButton
                          onClick={() => handleRemoveItem(item._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 size={18} />
                        </RemoveButton>
                      </Item>
                    )
                  })}
                </ItemsList>
              )}
            </Content>

            {!isEmpty && (
              <Footer>
                <Subtotal>
                  <SubtotalLabel>Subtotal</SubtotalLabel>
                  <SubtotalValue>
                    {cart.currency || '₹'}{' '}
                    {cart.totalAmount?.toLocaleString?.() ?? cart.totalAmount}
                  </SubtotalValue>
                </Subtotal>

                <ShippingNote>Shipping and taxes calculated at checkout</ShippingNote>

                <CheckoutBtn
                  // onClick={handleCheckout}
                  onClick={() => navigate('/my-cart')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </CheckoutBtn>

                <ContinueShoppingBtn
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </ContinueShoppingBtn>
              </Footer>
            )}
          </Panel>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1200;
  display: flex;
  justify-content: flex-end;
  backdrop-filter: blur(2px);
`

const Panel = styled(motion.aside)`
  width: 450px;
  max-width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 640px) {
    width: 100%;
  }
`

const Header = styled.div`
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  position: relative;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.02em;
  margin: 0;
  color: black;
`

const ItemCount = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
`

const CloseBtn = styled(motion.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e5e5;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    border-color: black;
    transform: rotate(90deg);
  }
`

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 2rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: #999;
  gap: 1rem;
`

const EmptyText = styled.p`
  font-size: 1rem;
  font-weight: 300;
  margin: 0;
  color: #666;
`

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Item = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
`

const Thumb = styled.img`
  width: 100px;
  height: 120px;
  object-fit: cover;
  border: 1px solid #e5e5e5;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 80px;
    height: 100px;
  }
`

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ItemName = styled.div`
  font-size: 0.95rem;
  font-weight: 400;
  color: black;
  line-height: 1.4;
  margin-bottom: 0.25rem;
`

const ItemSKU = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const ItemPrice = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: black;
  margin-top: 0.5rem;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`

const QuantityButton = styled(motion.button)`
  width: 28px;
  height: 28px;
  border: 1px solid #e5e5e5;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    border-color: black;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    &:hover {
      background: white;
      color: black;
      border-color: #e5e5e5;
    }
  }
`

const QuantityDisplay = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 30px;
  text-align: center;
`

const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 0.25rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ef4444;
  }
`

const Footer = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e5e5;
  background: white;
`

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
`

const SubtotalLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 400;
`

const SubtotalValue = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: black;
`

const ShippingNote = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 1rem 0;
  text-align: center;
  font-weight: 300;
`

const CheckoutBtn = styled(motion.button)`
  width: 100%;
  background: black;
  color: white;
  padding: 1.25rem 2rem;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;

  &:hover {
    background: #333;
  }
`

const ContinueShoppingBtn = styled(motion.button)`
  width: 100%;
  background: white;
  color: black;
  padding: 1rem 2rem;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    border-color: black;
  }
`
