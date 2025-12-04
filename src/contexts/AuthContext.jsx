// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'
import { toast } from 'react-hot-toast'

// helper to decode JWT payload (no external lib)
const decodeToken = (token) => {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    // atob(payload) decodes base64 (browser)
    const decoded = decodeURIComponent(
      atob(payload)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(decoded)
  } catch (err) {
    console.error('Failed to decode token', err)
    return null
  }
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return token ? decodeToken(token) : null
    } catch (e) {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const onUnauthorized = () => {
      setToken(null)
      setCurrentUser(null)
      localStorage.removeItem('token')
      // toast.error('Session expired. Please sign in again.')
      // optionally redirect: window.location.href = '/login'
    }
    window.addEventListener('unauthorized', onUnauthorized)
    return () => window.removeEventListener('unauthorized', onUnauthorized)
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      try {
        setCurrentUser(decodeToken(token))
      } catch (e) {
        setCurrentUser(null)
      }
    } else {
      localStorage.removeItem('token')
      setCurrentUser(null)
    }
  }, [token])

  // signup -> POST /auth/signup (returns {message, email})
  const signup = async (payload) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/signup', payload)
      toast.success(res.data.message || 'Signup successful. Check email for code.')
      setLoading(false)
      return { ok: true, email: res.data.email }
    } catch (err) {
      setLoading(false)
      const msg = err?.response?.data?.message || 'Signup failed'
      toast.error(msg)
      return { ok: false, message: msg }
    }
  }

  // verifyEmail -> POST /auth/verify-email (returns {message, token})
  const verifyEmail = async (email, code) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/verify-email', { email, code })
      const newToken = res.data.token
      setToken(newToken)
      toast.success(res.data.message || 'Email verified')
      setLoading(false)
      return { ok: true }
    } catch (err) {
      setLoading(false)
      const msg = err?.response?.data?.message || 'Verification failed'
      toast.error(msg)
      return { ok: false, message: msg }
    }
  }

  // login -> POST /auth/login (returns {token})
  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      const newToken = res.data.token
      setToken(newToken)
      toast.success('Logged in')
      setLoading(false)
      return { ok: true, role: res.data.role }
    } catch (err) {
      setLoading(false)
      const msg = err?.response?.data?.message || 'Login failed'
      toast.error(msg)
      return { ok: false, message: msg }
    }
  }

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
    localStorage.removeItem('token')
    toast.success('Signed out')
    // navigate to login in caller
    window.dispatchEvent(
      new CustomEvent('cartUpdated', { detail: { totalItems: 0, items: [], totalAmount: 0 } })
    )
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loading,
        signup,
        login,
        verifyEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
