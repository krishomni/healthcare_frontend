import { getUserData } from '../../lib/data'

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userData = getUserData()
      
      // Log to verify gallery data exists
      console.log('📦 API: Returning user data')
      console.log('🖼️ Gallery data:', userData.gallery)
      console.log('🏢 Facility images:', userData.gallery?.facilityImages?.length || 0)
      console.log('📊 Before/After cases:', userData.gallery?.beforeAfterCases?.length || 0)
      
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      
      res.status(200).json(userData)
    } catch (error) {
      console.error('❌ Error in API route:', error)
      res.status(500).json({ 
        message: 'Error reading data file',
        error: error.message 
      })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}