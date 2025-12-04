import React, { useEffect, useState } from 'react'
import FloatingNavbar from '@/components/FloatingNavbar'
import Footer from '@/components/Footer'
import PageTransition from '@/utils/PageTransition'
import CollectionHero from '@/components/common/CollectionHero'
import ProductsSection from '@/components/common/ProductsSection'
import productsData from '../../data/data.json'
import api from '@/api/axios'
import toast from 'react-hot-toast'
import Banner from '@/components/common/Banner'
import StandardNavbar from '@/components/StandardNavbar'

// filter out those whose category is ethnic
const ethnicProducts = productsData.products.filter(
  (product) => product.category.toLowerCase() === 'ethnic'
)

// const ethnicProducts = [
//   {
//     id: 1,
//     code: 'ETH-001',
//     category: 'Saree',
//     image: '/products/ethnic-saree-001.jpg',
//     link: '/products/ethnic/eth-001',
//   },
//   {
//     id: 2,
//     code: 'ETH-002',
//     category: 'Lehenga',
//     image: '/products/ethnic-lehenga-002.jpg',
//     link: '/products/ethnic/eth-002',
//   },
//   {
//     id: 3,
//     code: 'ETH-003',
//     category: 'Anarkali',
//     image: '/products/ethnic-anarkali-003.jpg',
//     link: '/products/ethnic/eth-003',
//   },
//   {
//     id: 4,
//     code: 'ETH-004',
//     category: 'Sharara Set',
//     image: '/products/ethnic-sharara-004.jpg',
//     link: '/products/ethnic/eth-004',
//   },
//   {
//     id: 5,
//     code: 'ETH-005',
//     category: 'Palazzo Suit',
//     image: '/products/ethnic-palazzo-005.jpg',
//     link: '/products/ethnic/eth-005',
//   },
// ]

// Main Component
const EthnicCollections = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await api.get('/products')
        if (mounted) {
          setProducts(res.data.products || [])
        }
      } catch (err) {
        console.error('Failed to fetch products', err)
        toast.error(err?.response?.data?.message || 'Failed to load products')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProducts()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <PageTransition>
      {/* <FloatingNavbar /> */}
      <Banner />
      <StandardNavbar />

      <CollectionHero
        image="/images/ethnic/ethnic-hero.jpg"
        title="ETHNIC COLLECTIONS"
        subtitle="Timeless elegance meets contemporary design. Discover handcrafted pieces that celebrate heritage and tradition with modern sophistication."
      />

      <ProductsSection title="OUR ETHNIC COLLECTION" products={products} />

      <Footer />
    </PageTransition>
  )
}

export default EthnicCollections
