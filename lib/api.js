const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = {
  async getUserData() {
    const res = await fetch(`${API_URL}/api/user-data`)
    return res.json()
  },
  async adminLogin(credentials) {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return res.json()
  },
  async getAdminData(token) {
    try {
      const response = await fetch('/api/admin/data', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Admin data loaded, first service:', data.services?.[0])
      return data
    } catch (error) {
      console.error('Error loading admin data:', error)
      throw error
    }
  },
  async saveAdminData(data, token) {
    const res = await fetch(`${API_URL}/api/admin/data`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  }
}