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

const BridalCollections = () => {
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
        image="/images/bridal/bridal-hero.jpg"
        title="BRIDAL COLLECTIONS"
        subtitle="Your dream wedding deserves a masterpiece. Exquisite bridal wear crafted with unparalleled attention to detail, designed to make your special day unforgettable"
      />

      <ProductsSection title="OUR BRIDAL COLLECTION" products={products} />

      <Footer />
    </PageTransition>
  )
}

export default BridalCollections
