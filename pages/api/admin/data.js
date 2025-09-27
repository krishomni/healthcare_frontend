// pages/api/admin/data.js - MongoDB Version
import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  // Simple auth check
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const client = await clientPromise
    const db = client.db('healthcare') // Replace with your database name
    const collection = db.collection('settings')

    if (req.method === 'GET') {
      const userData = await collection.findOne({ _id: 'userData' })
      
      if (!userData) {
        return res.status(404).json({ message: 'User data not found' })
      }

      const { _id, ...dataWithoutId } = userData
      res.status(200).json(dataWithoutId)
    } 
    else if (req.method === 'POST') {
      const userData = req.body
      userData.lastModified = new Date().toISOString()
      
      // Update or insert the userData document
      const result = await collection.updateOne(
        { _id: 'userData' },
        { $set: userData },
        { upsert: true }
      )

      console.log('Data saved to MongoDB')
      console.log('Gallery images:', userData.gallery?.facilityImages?.length || 0)
      console.log('Before/After cases:', userData.gallery?.beforeAfterCases?.length || 0)
      
      res.status(200).json({ 
        success: true, 
        message: 'Data saved successfully',
        timestamp: userData.lastModified
      })
    } 
    else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    console.error('MongoDB error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Database error', 
      error: error.message 
    })
  }
}