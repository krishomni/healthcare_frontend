// pages/api/admin/login.js - FIXED VERSION
export default function handler(req, res) {
  console.log('🔐 Admin login attempt:', {
    method: req.method,
    body: req.body,
    headers: req.headers['content-type']
  })

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body

  console.log('🔐 Credentials received:', { username, password: password ? '[PROVIDED]' : '[MISSING]' })

  // Simple authentication - case sensitive check
  if (username === 'admin' && password === 'password123') {
    console.log('✅ Login successful')
    // Generate a simple token
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
    
    res.status(200).json({ 
      success: true, 
      token,
      message: 'Login successful' 
    })
  } else {
    console.log('❌ Login failed:', { username, passwordLength: password?.length })
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    })
  }
}

