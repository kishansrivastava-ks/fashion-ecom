// src/pages/admin/AllProducts.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../../api/axios'
import toast from 'react-hot-toast'

const Container = styled.div`
  max-width: 1200px;
`

const Title = styled.h2`
  margin: 0 0 24px 0;
  font-size: 28px;
  font-weight: 500;
  color: #333;
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`

const ProductCard = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const ProductInfo = styled.div`
  padding: 16px;
`

const ProductName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`

const ProductPrice = styled.p`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
`

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 13px;
  color: #666;
`

const StockBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => (props.$inStock ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.$inStock ? '#155724' : '#721c24')};
`

const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
`

const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 20px;
  color: #333;
`

const ModalText = styled.p`
  margin: 0 0 24px 0;
  color: #666;
  line-height: 1.5;
`

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
`

const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`

const ConfirmButton = styled(Button)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
      setProducts(products.filter((p) => p._id !== deleteModal.productId))
      setDeleteModal({ show: false, productId: null, productName: '' })
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, productId: null, productName: '' })
  }

  if (loading) {
    return <LoadingMessage>Loading products...</LoadingMessage>
  }

  return (
    <Container>
      <Title>All Products ({products.length})</Title>

      {products.length === 0 ? (
        <LoadingMessage>No products found</LoadingMessage>
      ) : (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product._id} onClick={() => handleCardClick(product._id)}>
              <ProductImage
                src={product.images.find((img) => img.isPrimary)?.url || product.images[0]?.url}
                alt={product.name}
              />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>₹{product.price.toLocaleString()}</ProductPrice>
                <ProductMeta>
                  <span>SKU: {product.sku}</span>
                  <StockBadge $inStock={product.inStock}>
                    {product.inStock ? `Stock: ${product.stockQuantity}` : 'Out of Stock'}
                  </StockBadge>
                </ProductMeta>
                <div style={{ marginTop: '12px' }}>
                  <DeleteButton onClick={(e) => handleDeleteClick(e, product)}>Delete</DeleteButton>
                </div>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      )}

      {deleteModal.show && (
        <Modal onClick={handleDeleteCancel}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Confirm Delete</ModalTitle>
            <ModalText>
              Are you sure you want to delete <strong>{deleteModal.productName}</strong>? This
              action cannot be undone.
            </ModalText>
            <ModalButtons>
              <CancelButton onClick={handleDeleteCancel}>Cancel</CancelButton>
              <ConfirmButton onClick={handleDeleteConfirm} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </ConfirmButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default AllProducts
