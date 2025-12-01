// src/pages/admin/AddProduct.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../../api/axios'
import toast from 'react-hot-toast'

const Container = styled.div`
  max-width: 900px;
`

const Title = styled.h2`
  margin: 0 0 24px 0;
  font-size: 28px;
  font-weight: 500;
  color: #333;
`

const Form = styled.form`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
`

const FormSection = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #666;
  }
`

const Textarea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #666;
  }
`

const Select = styled.select`
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

const FileInputWrapper = styled.div`
  margin-top: 8px;
`

const FileInput = styled.input`
  display: none;
`

const FileLabel = styled.label`
  display: inline-block;
  padding: 10px 16px;
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

const UploadButton = styled.button`
  margin-left: 12px;
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
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

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
`

const ImagePreview = styled.div`
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`

const PreviewImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background-color: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;

  &:hover {
    background-color: rgba(200, 35, 51, 1);
  }
`

const PrimaryBadge = styled.span`
  position: absolute;
  bottom: 4px;
  left: 4px;
  padding: 2px 6px;
  background-color: #28a745;
  color: white;
  font-size: 10px;
  border-radius: 2px;
  font-weight: 500;
`

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 42px;
`

const Tag = styled.span`
  padding: 4px 8px;
  background-color: #e8e8e8;
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
`

const TagRemove = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  line-height: 1;

  &:hover {
    color: #333;
  }
`

const TagInputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  min-width: 100px;
  font-size: 14px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`

const SubmitButton = styled(Button)`
  background-color: #28a745;
  color: white;

  &:hover:not(:disabled) {
    background-color: #218838;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`

const Message = styled.div`
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
  background-color: ${(props) => (props.$type === 'success' ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.$type === 'success' ? '#155724' : '#721c24')};
  border: 1px solid ${(props) => (props.$type === 'success' ? '#c3e6cb' : '#f5c6cb')};
`

const AddProduct = () => {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploadMessage, setUploadMessage] = useState({ text: '', type: '' })
  const [selectedFiles, setSelectedFiles] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'ethnic',
    subCategory: '',
    description: '',
    price: '',
    currency: 'INR',
    inStock: true,
    stockQuantity: '',
    sku: '',
    images: [],
    sizes: [],
    fabric: '',
    work: '',
    length: '',
    occasion: '',
    pattern: '',
    badges: [],
    tags: [],
  })

  const [tagInput, setTagInput] = useState('')
  const [sizeInput, setSizeInput] = useState('')
  const [badgeInput, setBadgeInput] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileSelect = (e) => {
    setSelectedFiles(Array.from(e.target.files))
    setUploadMessage({ text: '', type: '' })
  }

  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select images to upload')
      return
    }

    const formDataToSend = new FormData()
    selectedFiles.forEach((file) => {
      formDataToSend.append('images', file)
    })

    try {
      setUploading(true)
      setUploadMessage({ text: '', type: '' })

      const res = await api.post('/uploads/product-images', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...res.data.images],
      }))

      setUploadMessage({
        text: 'Images uploaded successfully!',
        type: 'success',
      })
      setSelectedFiles([])

      // Reset file input
      const fileInput = document.getElementById('file-input')
      if (fileInput) fileInput.value = ''
    } catch (error) {
      console.error('Error uploading images:', error)
      setUploadMessage({
        text: 'Failed to upload images. Please try again.',
        type: 'error',
      })
      toast.error('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSetPrimaryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      })),
    }))
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }))
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleAddSize = (e) => {
    if (e.key === 'Enter' && sizeInput.trim()) {
      e.preventDefault()
      if (!formData.sizes.includes(sizeInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          sizes: [...prev.sizes, sizeInput.trim()],
        }))
      }
      setSizeInput('')
    }
  }

  const handleRemoveSize = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((size) => size !== sizeToRemove),
    }))
  }

  const handleAddBadge = (e) => {
    if (e.key === 'Enter' && badgeInput.trim()) {
      e.preventDefault()
      if (!formData.badges.includes(badgeInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          badges: [...prev.badges, badgeInput.trim()],
        }))
      }
      setBadgeInput('')
    }
  }

  const handleRemoveBadge = (badgeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      badges: prev.badges.filter((badge) => badge !== badgeToRemove),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.images.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity),
    }

    try {
      setSubmitting(true)
      await api.post('/products', productData)
      toast.success('Product added successfully!')
      navigate('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error(error.response?.data?.message || 'Failed to create product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container>
      <Title>Add New Product</Title>

      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Basic Information</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                name="sku"
                type="text"
                value={formData.sku}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category">Category *</Label>
              <Select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="ethnic">Ethnic</option>
                <option value="western">Western</option>
                <option value="bridal">Bridal</option>
                <option value="custom">Custom</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subCategory">Sub Category *</Label>
              <Input
                id="subCategory"
                name="subCategory"
                type="text"
                value={formData.subCategory}
                onChange={handleInputChange}
                placeholder="e.g., sarees, lehengas"
                required
              />
            </FormGroup>
          </FormGrid>

          <FormGroup style={{ marginTop: '16px' }}>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Pricing & Stock</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="currency">Currency</Label>
              <Select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="stockQuantity">Stock Quantity *</Label>
              <Input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <Input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  style={{ width: 'auto', marginRight: '8px' }}
                />
                In Stock
              </Label>
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Images</SectionTitle>
          {uploadMessage.text && <Message $type={uploadMessage.type}>{uploadMessage.text}</Message>}
          <FileInputWrapper>
            <FileInput
              id="file-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
            />
            <FileLabel htmlFor="file-input">
              {selectedFiles.length > 0
                ? `${selectedFiles.length} file(s) selected`
                : 'Choose Images'}
            </FileLabel>
            <UploadButton
              type="button"
              onClick={handleImageUpload}
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </UploadButton>
          </FileInputWrapper>

          {formData.images.length > 0 && (
            <ImagePreviewGrid>
              {formData.images.map((image, index) => (
                <ImagePreview key={index}>
                  <PreviewImage src={image.url} alt={image.alt} />
                  <RemoveImageButton type="button" onClick={() => handleRemoveImage(index)}>
                    ×
                  </RemoveImageButton>
                  {image.isPrimary && <PrimaryBadge>Primary</PrimaryBadge>}
                  {!image.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimaryImage(index)}
                      style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        padding: '2px 6px',
                        fontSize: '10px',
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        border: '1px solid #ddd',
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                    >
                      Set Primary
                    </button>
                  )}
                </ImagePreview>
              ))}
            </ImagePreviewGrid>
          )}
        </FormSection>

        <FormSection>
          <SectionTitle>Product Details</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="fabric">Fabric</Label>
              <Input
                id="fabric"
                name="fabric"
                type="text"
                value={formData.fabric}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="work">Work</Label>
              <Input
                id="work"
                name="work"
                type="text"
                value={formData.work}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                name="length"
                type="text"
                value={formData.length}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="occasion">Occasion</Label>
              <Input
                id="occasion"
                name="occasion"
                type="text"
                value={formData.occasion}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="pattern">Pattern</Label>
              <Input
                id="pattern"
                name="pattern"
                type="text"
                value={formData.pattern}
                onChange={handleInputChange}
              />
            </FormGroup>
          </FormGrid>
        </FormSection>

        <FormSection>
          <SectionTitle>Sizes</SectionTitle>
          <FormGroup>
            <Label>Add Sizes (Press Enter to add)</Label>
            <TagInput>
              {formData.sizes.map((size, index) => (
                <Tag key={index}>
                  {size}
                  <TagRemove type="button" onClick={() => handleRemoveSize(size)}>
                    ×
                  </TagRemove>
                </Tag>
              ))}
              <TagInputField
                type="text"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                onKeyDown={handleAddSize}
                placeholder="Type size and press Enter"
              />
            </TagInput>
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Badges</SectionTitle>
          <FormGroup>
            <Label>Add Badges (Press Enter to add)</Label>
            <TagInput>
              {formData.badges.map((badge, index) => (
                <Tag key={index}>
                  {badge}
                  <TagRemove type="button" onClick={() => handleRemoveBadge(badge)}>
                    ×
                  </TagRemove>
                </Tag>
              ))}
              <TagInputField
                type="text"
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                onKeyDown={handleAddBadge}
                placeholder="Type badge and press Enter"
              />
            </TagInput>
          </FormGroup>
        </FormSection>

        <FormSection>
          <SectionTitle>Tags</SectionTitle>
          <FormGroup>
            <Label>Add Tags (Press Enter to add)</Label>
            <TagInput>
              {formData.tags.map((tag, index) => (
                <Tag key={index}>
                  {tag}
                  <TagRemove type="button" onClick={() => handleRemoveTag(tag)}>
                    ×
                  </TagRemove>
                </Tag>
              ))}
              <TagInputField
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag and press Enter"
              />
            </TagInput>
          </FormGroup>
        </FormSection>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Creating Product...' : 'Create Product'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/admin/products')}>
            Cancel
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  )
}

export default AddProduct
