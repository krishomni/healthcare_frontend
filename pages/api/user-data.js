import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise
      const db = client.db('healthcare') // Replace with your database name
      
      // Fetch the user data document from MongoDB
      const userData = await db.collection('settings').findOne({ _id: 'userData' })
      
      if (!userData) {
        return res.status(404).json({ message: 'User data not found' })
      }

      console.log('MongoDB API: Data loaded')
      console.log('Gallery exists:', !!userData.gallery)
      console.log('Facility images:', userData.gallery?.facilityImages?.length || 0)
      console.log('Before/After cases:', userData.gallery?.beforeAfterCases?.length || 0)
      
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