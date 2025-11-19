import React from 'react'
import FloatingNavbar from '@/components/FloatingNavbar'
import Footer from '@/components/Footer'
import PageTransition from '@/utils/PageTransition'
import CollectionHero from '@/components/common/CollectionHero'
import ProductsSection from '@/components/common/ProductsSection'
import productsData from '../../data/data.json'

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
const BridalCollections = () => {
  return (
    <PageTransition>
      <FloatingNavbar />

      <CollectionHero
        image="/images/bridal/bridal-hero.jpg"
        title="BRIDAL COLLECTIONS"
        subtitle="Your dream wedding deserves a masterpiece. Exquisite bridal wear crafted with unparalleled attention to detail, designed to make your special day unforgettable"
      />

      <ProductsSection title="OUR BRIDAL COLLECTION" products={ethnicProducts} />

      <Footer />
    </PageTransition>
  )
}

export default BridalCollections
