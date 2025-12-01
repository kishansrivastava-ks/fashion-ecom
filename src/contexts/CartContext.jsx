import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCart = async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/cart')
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (productId, quantity) => {
    try {
      await api.post('/cart/add', { productId, quantity })
      await fetchCart()
      return true
    } catch (error) {
      console.error('Error adding to cart:', error)
      return false
    }
  }

  const updateCartItem = async (productId, quantity) => {
    try {
      await api.post('/cart/update', { productId, quantity })
      await fetchCart()
      return true
    } catch (error) {
      console.error('Error updating cart item:', error)
      return false
    }
  }

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  // Fetch cart on mount
  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isLoading,
        openCart,
        closeCart,
        fetchCart,
        addToCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
