export default function handler(req, res) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    res.status(200).json(userData)
  } 
  else if (req.method === 'POST') {
    try {
      // Update the in-memory data
      userData = { ...req.body, lastModified: new Date().toISOString() }
      
      res.status(200).json({ 
        success: true, 
        message: 'Data saved successfully',
        timestamp: userData.lastModified
      })
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error saving data', 
        error: error.message 
      })
    }
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}