export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body

  if (username === 'admin' && password === 'password123') {
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
    res.status(200).json({ success: true, token })
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  }
}
