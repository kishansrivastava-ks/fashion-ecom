// src/api/axios.js
import axios from 'axios'
// import jwt_decode from 'jwt-decode'

// base URL — use env var in your frontend (.env.local)
// const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'https://shaashee-backend-production.up.railway.app'

const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  // if you later switch to cookies change this
  withCredentials: false,
})

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// response interceptor: catch 401 and broadcast logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // remove token & reload or send event
      localStorage.removeItem('token')
      // you can also dispatch a custom event to let AuthContext react
      window.dispatchEvent(new Event('unauthorized'))
    }
    return Promise.reject(err)
  }
)

export default api
