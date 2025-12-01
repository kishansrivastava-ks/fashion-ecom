// src/pages/admin/AllProducts.jsx
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Package, AlertCircle, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '@/api/axios'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  max-width: 1400px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  color: black;
`

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
`

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  color: #999;
  font-size: 1rem;
  font-weight: 300;
  gap: 1rem;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  background: white;
  border: 1px solid #e5e5e5;
  text-align: center;
  gap: 1rem;
`

const EmptyText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666;
  font-weight: 300;
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ProductCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: black;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`

const ImageContainer = styled.div`
  width: 100%;
  height: 320px;
  overflow: hidden;
  background: #f5f5f5;
  position: relative;

  @media (max-width: 768px) {
    height: 280px;
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${ProductCard}:hover & {
    transform: scale(1.08);
  }
`

const StockBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${(props) => (props.$inStock ? '#22c55e' : '#ef4444')};
  color: white;
`

const ProductInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const ProductName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  color: black;
  letter-spacing: 0.02em;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: black;
  margin: 0.25rem 0;
`

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
  font-size: 0.85rem;
  color: #666;
`

const SKU = styled.span`
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const StockInfo = styled.span`
  font-size: 0.85rem;
  color: ${(props) => (props.$inStock ? '#22c55e' : '#ef4444')};
  font-weight: 500;
`

const ActionBar = styled.div`
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: flex-end;
`

const DeleteButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: white;
  color: #ef4444;
  border: 1px solid #ef4444;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  backdrop-filter: blur(2px);
`

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: black;
    color: white;
    border-color: black;
    transform: rotate(90deg);
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-right: 2rem;
`

const ModalIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  flex-shrink: 0;
`

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: black;
`

const ModalText = styled.p`
  margin: 0 0 2rem 0;
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
  font-weight: 300;

  strong {
    color: black;
    font-weight: 500;
  }
`

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`

const Button = styled(motion.button)`
  padding: 0.85rem 1.75rem;
  border: none;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  @media (min-width: 481px) {
    flex: initial;
    min-width: 120px;
  }
`

const CancelButton = styled(Button)`
  background: white;
  color: black;
  border: 1px solid #e5e5e5;

  &:hover {
    background: #f5f5f5;
    border-color: #ccc;
  }
`

const ConfirmButton = styled(Button)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({ show: false, productId: null, productName: '' })
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await api.get('/products')
      setProducts(res.data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleCardClick = (productId) => {
    // console.log('Navigate to:', `/admin/products/${productId}`)
    navigate(`/admin/products/${productId}`)
  }

  const handleDeleteClick = (e, product) => {
    e.stopPropagation()
    setDeleteModal({
      show: true,
      productId: product._id,
      productName: product.name,
    })
  }

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true)
      await api.delete(`/products/${deleteModal.productId}`)
      toast.success('Product deleted successfully')
      setDeleteModal({ show: false, productId: null, productName: '' })
      setDeleting(false)
    } catch (error) {
      console.error('Error deleting product:', error)
      // toast.error('Failed to delete product')
      setDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, productId: null, productName: '' })
  }

  if (loading) {
    return (
      <LoadingMessage>
        <Package size={48} color="#ccc" />
        Loading products...
      </LoadingMessage>
    )
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Title>All Products</Title>
          <Subtitle>
            {products.length} {products.length === 1 ? 'product' : 'products'} in inventory
          </Subtitle>
        </TitleWrapper>
      </Header>

      {products.length === 0 ? (
        <EmptyState>
          <Package size={64} color="#ddd" />
          <EmptyText>No products found. Start by adding your first product.</EmptyText>
        </EmptyState>
      ) : (
        <ProductGrid>
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              onClick={() => handleCardClick(product._id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <ImageContainer>
                <ProductImage
                  src={product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url}
                  alt={product.name}
                />
                <StockBadge $inStock={product.inStock}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </StockBadge>
              </ImageContainer>

              <ProductInfo>
                <SKU>SKU: {product.sku}</SKU>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>₹{product.price.toLocaleString()}</ProductPrice>
                <ProductMeta>
                  <StockInfo $inStock={product.inStock}>
                    {product.inStock ? `${product.stockQuantity} units` : 'Out of Stock'}
                  </StockInfo>
                </ProductMeta>
              </ProductInfo>

              <ActionBar>
                <DeleteButton
                  onClick={(e) => handleDeleteClick(e, product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 size={16} />
                  Delete
                </DeleteButton>
              </ActionBar>
            </ProductCard>
          ))}
        </ProductGrid>
      )}

      <AnimatePresence>
        {deleteModal.show && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDeleteCancel}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton
                onClick={handleDeleteCancel}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} />
              </CloseButton>

              <ModalHeader>
                <ModalIcon>
                  <AlertCircle size={24} />
                </ModalIcon>
                <ModalTitle>Confirm Delete</ModalTitle>
              </ModalHeader>

              <ModalText>
                Are you sure you want to delete <strong>{deleteModal.productName}</strong>? This
                action cannot be undone and will permanently remove this product from your
                inventory.
              </ModalText>

              <ModalButtons>
                <CancelButton
                  onClick={handleDeleteCancel}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </CancelButton>
                <ConfirmButton
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {deleting ? 'Deleting...' : 'Delete Product'}
                </ConfirmButton>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  )
}

export default AllProducts
