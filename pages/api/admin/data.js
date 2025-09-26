import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'user-data.json')

export default function handler(req, res) {
  // Simple auth check (in production, verify JWT token)
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      console.log('📖 Admin reading from:', dataPath)
      
      // Check if file exists, create default if not
      if (!fs.existsSync(dataPath)) {
        console.log('❌ File does not exist for admin, creating default with gallery...')
        
        const dataDir = path.dirname(dataPath)
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
        }
        
        const defaultData = {
          practice: {
            name: "Your Practice Name",
            tagline: "Your Tagline Here",
            description: "Your practice description goes here."
          },
          contact: {
            phone: "+1 (555) 123-4567",
            whatsapp: "+1 (555) 123-4567",
            email: "info@yourpractice.com",
            address: {
              street: "123 Your Street",
              city: "Your City",
              state: "ST",
              zip: "12345"
            }
          },
          hours: {
            weekdays: "Mon-Fri: 8:00 AM - 6:00 PM",
            saturday: "Sat: 9:00 AM - 2:00 PM",
            sunday: "Sun: Closed"
          },
          stats: {
            yearsExperience: "15",
            patientsServed: "5,000",
            successRate: "98",
            doctorsCount: "8"
          },
          services: [],
          blogPosts: [],
          gallery: {
            facilityImages: [],
            beforeAfterCases: []
          },
          seo: {
            siteTitle: "Your Practice Name - Quality Healthcare Services",
            metaDescription: "Leading medical practice providing comprehensive healthcare services.",
            keywords: "healthcare, medical practice, doctors"
          }
        }
        
        fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2))
        return res.status(200).json(defaultData)
      }
      
      const jsonData = fs.readFileSync(dataPath, 'utf8')
      const userData = JSON.parse(jsonData)
      console.log('✅ Admin data loaded successfully')
      res.status(200).json(userData)
    } catch (error) {
      console.error('❌ Admin error reading data:', error)
      res.status(500).json({ message: 'Error reading data', error: error.message })
    }
  } 
  else if (req.method === 'POST') {
    try {
      const userData = req.body
      console.log('💾 Admin saving data to:', dataPath)
      console.log('📝 Data preview:', {
        practice: userData.practice?.name,
        services: userData.services?.length || 0,
        blogPosts: userData.blogPosts?.length || 0,
        facilityImages: userData.gallery?.facilityImages?.length || 0,
        beforeAfterCases: userData.gallery?.beforeAfterCases?.length || 0
      })
      
      // Add timestamp for last modified
      userData.lastModified = new Date().toISOString()
      
      // Ensure gallery structure exists
      if (!userData.gallery) {
        userData.gallery = {
          facilityImages: [],
          beforeAfterCases: []
        }
      }
      
      // Ensure data directory exists
      const dataDir = path.dirname(dataPath)
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      
      // Write to JSON file with pretty formatting
      fs.writeFileSync(dataPath, JSON.stringify(userData, null, 2))
      
      console.log('✅ Admin data saved successfully!')
      
      res.status(200).json({ 
        success: true, 
        message: 'Data saved successfully',
        timestamp: userData.lastModified
      })
    } catch (error) {
      console.error('❌ Admin error saving data:', error)
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