// pages/api/admin/data.js
import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const client = await clientPromise
    const db = client.db('test')
    const collection = db.collection('settings')

    if (req.method === 'GET') {
      const userData = await collection.findOne({ _id: 'userData' })
      
      if (!userData) {
        return res.status(404).json({ message: 'User data not found' })
      }
      console.log('GET: First service has image?', !!userData.services?.[0]?.image)


      const { _id, ...dataWithoutId } = userData
      res.status(200).json(dataWithoutId)
    } 
    else if (req.method === 'POST') {
  const userData = req.body
  userData.lastModified = new Date().toISOString()
  
  // Remove _id if it exists in the data being sent
  const { _id, ...dataWithoutId } = userData
  
  // Update using the clean data
  const result = await collection.updateOne(
    { _id: 'userData' },
    { $set: dataWithoutId },  // Use dataWithoutId instead of userData
    { upsert: true }
  )

  console.log('Data saved to MongoDB')
  
  res.status(200).json({ 
    success: true, 
    message: 'Data saved successfully',
    timestamp: dataWithoutId.lastModified
  })
}   else {
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