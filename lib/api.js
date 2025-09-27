// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export const api = {
  async getUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user-data`, {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      console.log('✅ Client: Data loaded successfully')
      console.log('🖼️ Gallery:', data.gallery)
      
      return data
    } catch (error) {
      console.error('❌ Client: Error loading data:', error)
      throw error
    }
  },

  async saveUserData(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('❌ Client: Error saving data:', error)
      throw error
    }
  }
}