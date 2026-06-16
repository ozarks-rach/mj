import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
}

export const propertyAPI = {
  getAll: (filters?: any) => api.get('/properties', { params: filters }),
  getById: (id: string) => api.get(`/properties/${id}`),
  create: (data: any) => api.post('/properties', data),
  update: (id: string, data: any) => api.put(`/properties/${id}`, data),
  delete: (id: string) => api.delete(`/properties/${id}`),
}

export const messageAPI = {
  getConversation: (conversationId: string) => api.get(`/messages/${conversationId}`),
  send: (data: any) => api.post('/messages', data),
}

export const offerAPI = {
  getPropertyOffers: (propertyId: string) => api.get(`/offers/property/${propertyId}`),
  create: (data: any) => api.post('/offers', data),
  updateStatus: (id: string, status: string) => api.put(`/offers/${id}`, { status }),
}

export const userAPI = {
  getProfile: (id: string) => api.get(`/users/${id}`),
  updateProfile: (data: any) => api.put('/users/profile', data),
}

export default api
