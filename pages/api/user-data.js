// pages/api/user-data.js
import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise
      const db = client.db('tests') 
      
      // Fetch from MongoDB instead of JSON file
      const userData = await db.collection('settings').findOne({ _id: 'userData' })
      
      if (!userData) {
        return res.status(404).json({ message: 'User data not found' })
      }

      console.log('API: Returning data from MongoDB')
      console.log('Services count:', userData.services?.length)
      console.log('First service has image:', !!userData.services?.[0]?.image)
      
      // Remove MongoDB _id from response
      const { _id, ...dataWithoutId } = userData
      
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.status(200).json(dataWithoutId)
    } catch (error) {
      console.error('Error fetching from MongoDB:', error)
      res.status(500).json({ 
        message: 'Error reading data',
        error: error.message 
      })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}