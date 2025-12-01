import React from 'react'
import CartSidebar from './CartSidebar'
import { useCart } from '../contexts/CartContext'

export default function GlobalCartSidebar() {
  const { cart, isCartOpen, closeCart, fetchCart } = useCart()

  return <CartSidebar open={isCartOpen} onClose={closeCart} cart={cart} refreshCart={fetchCart} />
}
