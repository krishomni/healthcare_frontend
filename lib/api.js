// lib/api.js
export const api = {
  async getUserData() {
    const res = await fetch('/api/user-data')
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
  
  async adminLogin(credentials) {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return res.json()
  },
  
  async getAdminData(token) {
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
  },
  
  async saveAdminData(data, token) {
    const res = await fetch('/api/admin/data', {
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