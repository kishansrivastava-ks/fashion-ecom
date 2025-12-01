// src/pages/admin/ProductDetails.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../../api/axios'
import toast from 'react-hot-toast'

const Container = styled.div`
  max-width: 1000px;
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

const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
`

const ProductContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
`

const Title = styled.h2`
  margin: 0 0 24px 0;
  font-size: 28px;
  font-weight: 500;
  color: #333;
`

const ImagesSection = styled.div`
  margin-bottom: 32px;
`

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
`

const ImageWrapper = styled.div`
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`

const PrimaryBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 8px;
  background-color: #28a745;
  color: white;
  font-size: 11px;
  border-radius: 4px;
  font-weight: 500;
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`

const DetailItem = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
  font-weight: 500;
`

const Value = styled.div`
  font-size: 15px;
  color: #333;
`

const Description = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
`

const BadgesContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`

const Badge = styled.span`
  padding: 4px 12px;
  background-color: #e8e8e8;
  color: #333;
  font-size: 12px;
  border-radius: 12px;
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

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/products/${id}`)
      setProduct(res.data)
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Failed to load product details')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await api.delete(`/products/${id}`)
      toast.success('Product deleted successfully')
      navigate('/admin/products')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
      setDeleting(false)
    }
  }

  if (loading) {
    return <LoadingMessage>Loading product details...</LoadingMessage>
  }

  if (!product) {
    return <LoadingMessage>Product not found</LoadingMessage>
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/admin/products')}>← Back to Products</BackButton>
        <DeleteButton onClick={() => setDeleteModal(true)}>Delete Product</DeleteButton>
      </Header>

      <ProductContainer>
        <Title>{product.name}</Title>

        <ImagesSection>
          <SectionTitle>Images</SectionTitle>
          <ImageGrid>
            {product.images.map((image, index) => (
              <ImageWrapper key={index}>
                <ProductImage src={image.url} alt={image.alt} />
                {image.isPrimary && <PrimaryBadge>Primary</PrimaryBadge>}
              </ImageWrapper>
            ))}
          </ImageGrid>
        </ImagesSection>

        <DetailsGrid>
          <DetailItem>
            <Label>Price</Label>
            <Value>
              ₹{product.price.toLocaleString()} {product.currency}
            </Value>
          </DetailItem>

          <DetailItem>
            <Label>SKU</Label>
            <Value>{product.sku}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Category</Label>
            <Value>
              {product.category} / {product.subCategory}
            </Value>
          </DetailItem>

          <DetailItem>
            <Label>Stock Status</Label>
            <Value>
              {product.inStock ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
            </Value>
          </DetailItem>

          <DetailItem>
            <Label>Fabric</Label>
            <Value>{product.fabric}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Work</Label>
            <Value>{product.work}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Length</Label>
            <Value>{product.length}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Occasion</Label>
            <Value>{product.occasion}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Pattern</Label>
            <Value>{product.pattern}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Rating</Label>
            <Value>
              {product.rating} ({product.reviews} reviews)
            </Value>
          </DetailItem>

          <DetailItem>
            <Label>Status</Label>
            <Value>{product.isActive ? 'Active' : 'Inactive'}</Value>
          </DetailItem>
        </DetailsGrid>

        <DetailItem>
          <Label>Sizes</Label>
          <BadgesContainer>
            {product.sizes.map((size, index) => (
              <Badge key={index}>{size}</Badge>
            ))}
          </BadgesContainer>
        </DetailItem>

        {product.badges.length > 0 && (
          <DetailItem>
            <Label>Badges</Label>
            <BadgesContainer>
              {product.badges.map((badge, index) => (
                <Badge key={index}>{badge}</Badge>
              ))}
            </BadgesContainer>
          </DetailItem>
        )}

        {product.tags.length > 0 && (
          <DetailItem>
            <Label>Tags</Label>
            <BadgesContainer>
              {product.tags.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </BadgesContainer>
          </DetailItem>
        )}

        <Description>
          <Label>Description</Label>
          <Value>{product.description}</Value>
        </Description>
      </ProductContainer>

      {deleteModal && (
        <Modal onClick={() => setDeleteModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Confirm Delete</ModalTitle>
            <ModalText>
              Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be
              undone.
            </ModalText>
            <ModalButtons>
              <CancelButton onClick={() => setDeleteModal(false)}>Cancel</CancelButton>
              <ConfirmButton onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </ConfirmButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default ProductDetails
