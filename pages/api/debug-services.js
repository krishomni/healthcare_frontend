import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('healthcare')
    
    const userData = await db.collection('settings').findOne({ _id: 'userData' })
    
    if (!userData || !userData.services) {
      return res.json({ error: 'No services found' })
    }

    // Return just the services with image info
    const servicesDebug = userData.services.map(s => ({
      title: s.title,
      hasImage: !!s.image,
      imageValue: s.image,
      allFields: Object.keys(s)
    }))

    res.json({
      totalServices: userData.services.length,
      services: servicesDebug
    })
  } catch (error) {
    res.json({ error: error.message })
  }
}