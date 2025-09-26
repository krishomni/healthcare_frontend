const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = {
  // Public data
  async getUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user-data`)
      if (!response.ok) throw new Error('Failed to fetch user data')
      return response.json()
    } catch (error) {
      console.error('Error fetching user data:', error)
      throw error
    }
  },

  // Admin auth
  async adminLogin(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      return response.json()
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  },

  // Admin data
  async getAdminData(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/data`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!response.ok) throw new Error('Failed to fetch admin data')
      return response.json()
    } catch (error) {
      console.error('Error fetching admin data:', error)
      throw error
    }
  },

  async saveAdminData(data, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/data`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      return response.json()
    } catch (error) {
      console.error('Error saving admin data:', error)
      throw error
    }
  }
}
