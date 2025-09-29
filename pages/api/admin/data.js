// pages/api/admin/data.js
import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const client = await clientPromise
    const db = client.db('healthcare') // Your database name
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
      
      // LOG what we're saving to verify images are included
      console.log('Saving services to MongoDB:')
      userData.services?.forEach((service, i) => {
        console.log(`Service ${i}: ${service.title}, Image: ${service.image || 'NO IMAGE'}`)
      })
      
      // Update the entire userData document
      const result = await collection.updateOne(
        { _id: 'userData' },
        { $set: userData },
        { upsert: true }
      )

      console.log('MongoDB update result:', result.modifiedCount, 'documents modified')
      
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