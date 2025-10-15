// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = {
  async getUserData() {
    const res = await fetch(`${API_BASE_URL}/api/user-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
  
  async adminLogin(credentials) {
    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    if (!res.ok) throw new Error(`Login failed: ${res.status}`)
    return res.json()
  },
  
  async getAdminData(token) {
    const response = await fetch(`${API_BASE_URL}/api/admin/data`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return response.json()
  },
  
  async saveAdminData(data, token) {
    const res = await fetch(`${API_BASE_URL}/api/admin/data`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error(`Save failed: ${res.status}`)
    return res.json()
  }
}