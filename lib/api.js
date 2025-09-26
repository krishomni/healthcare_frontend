const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const api = {
  // Get public user data for homepage
  async getUserData() {
    try {
      console.log('Fetching from:', `${API_BASE_URL}/api/user-data`)
      const response = await fetch(`${API_BASE_URL}/api/user-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control to get fresh data
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('User data fetched successfully')
      return data
    } catch (error) {
      console.error('Error fetching user data:', error)
      throw error
    }
  },

  // Admin login
  async adminLogin(credentials) {
    try {
      console.log('Attempting login to:', `${API_BASE_URL}/api/admin/login`)
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('Login failed:', data.message)
      } else {
        console.log('Login successful')
      }
      
      return data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  },

  // Get admin data (protected route)
  async getAdminData(token) {
    try {
      console.log('Fetching admin data from:', `${API_BASE_URL}/api/admin/data`)
      const response = await fetch(`${API_BASE_URL}/api/admin/data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Admin data fetched successfully')
      return data
    } catch (error) {
      console.error('Error fetching admin data:', error)
      throw error
    }
  },

  // Save admin data (protected route)
  async saveAdminData(data, token) {
    try {
      console.log('Saving data to:', `${API_BASE_URL}/api/admin/data`)
      const response = await fetch(`${API_BASE_URL}/api/admin/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      
      if (!response.ok) {
        console.error('Save failed:', result.message)
      } else {
        console.log('Data saved successfully')
      }
      
      return result
    } catch (error) {
      console.error('Error saving admin data:', error)
      throw error
    }
  }
}

export default api