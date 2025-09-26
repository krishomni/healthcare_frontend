import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'user-data.json')

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('📖 Reading from:', dataPath)
      
      // Check if file exists, create default if not
      if (!fs.existsSync(dataPath)) {
        console.log('❌ File does not exist, creating default with gallery...')
        
        // Create data directory if it doesn't exist
        const dataDir = path.dirname(dataPath)
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
        }
        
        // Create default data WITH GALLERY
        const defaultData = {
          practice: {
            name: "Elite Medical Center",
            tagline: "Your Health, Our Priority",
            description: "Providing exceptional healthcare services with state-of-the-art technology and compassionate care."
          },
          contact: {
            phone: "+1 (555) 123-4567",
            whatsapp: "+1 (555) 123-4567",
            email: "info@elitemedicalcenter.com",
            address: {
              street: "123 Healthcare Blvd, Suite 200",
              city: "Austin",
              state: "TX",
              zip: "78701"
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
          services: [
            {
              id: "primary-care",
              title: "Primary Care",
              description: "Comprehensive healthcare services for all ages including annual checkups, preventive care, and chronic disease management.",
              icon: "user-md",
              price: "$150",
              duration: "45 minutes",
              features: [
                "Comprehensive health examination",
                "Preventive care screening",
                "Chronic disease management",
                "Health education and counseling"
              ]
            },
            {
              id: "dental-care",
              title: "Dental Care",
              description: "Complete dental services including cleanings, fillings, crowns, and cosmetic procedures.",
              icon: "tooth",
              price: "$200",
              duration: "60 minutes",
              features: [
                "Regular dental cleanings",
                "Cavity treatments and fillings",
                "Cosmetic dental procedures",
                "Dental implants and crowns"
              ]
            }
          ],
          blogPosts: [
            {
              id: 1,
              title: "10 Essential Health Tips for 2024",
              slug: "health-tips-2024",
              excerpt: "Discover the latest evidence-based strategies to maintain optimal health and prevent common illnesses.",
              content: "<h2>Introduction</h2><p>Maintaining good health requires a comprehensive approach that includes regular exercise, proper nutrition, adequate sleep, and preventive care...</p>",
              publishDate: "2024-03-15",
              author: { name: "Dr. Sarah Johnson" },
              category: "Health Tips",
              tags: ["health", "prevention", "wellness"],
              readTime: "5 min read",
              featured: true
            },
            {
              id: 2,
              title: "The Importance of Regular Dental Checkups",
              slug: "dental-checkups-importance",
              excerpt: "Learn why regular dental visits are crucial for maintaining overall health and preventing serious dental issues.",
              content: "<h2>Why Regular Checkups Matter</h2><p>Regular dental checkups are essential for maintaining good oral health and can help prevent serious dental problems...</p>",
              publishDate: "2024-03-10",
              author: { name: "Dr. Michael Chen" },
              category: "Dental Health",
              tags: ["dental", "preventive care", "oral health"],
              readTime: "4 min read",
              featured: true
            }
          ],
          gallery: {
            facilityImages: [
              {
                url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
                caption: "Modern Reception Area",
                description: "Our welcoming reception area designed for patient comfort and privacy"
              },
              {
                url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
                caption: "Advanced Equipment Room",
                description: "State-of-the-art medical technology for precise diagnostics and treatment"
              },
              {
                url: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800",
                caption: "Private Consultation Room",
                description: "Comfortable and confidential spaces for patient consultations"
              },
              {
                url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
                caption: "Surgical Suite",
                description: "Fully equipped surgical facilities meeting the highest safety standards"
              }
            ],
            beforeAfterCases: [
              {
                title: "Complete Smile Makeover",
                treatment: "Dental Veneers & Whitening",
                duration: "6 weeks",
                description: "Patient received comprehensive cosmetic dental treatment including porcelain veneers and professional whitening for a complete smile transformation.",
                beforeImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400",
                afterImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400"
              },
              {
                title: "Orthodontic Treatment Success",
                treatment: "Clear Aligners",
                duration: "12 months",
                description: "Complete teeth alignment achieved using modern clear aligner technology with excellent patient compliance.",
                beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400",
                afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400"
              },
              {
                title: "Dental Restoration",
                treatment: "Implants & Crowns",
                duration: "4 months",
                description: "Multiple missing teeth restored with dental implants and custom crowns for full functionality and aesthetics.",
                beforeImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400",
                afterImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400"
              }
            ]
          },
          seo: {
            siteTitle: "Elite Medical Center - Comprehensive Healthcare Services",
            metaDescription: "Leading medical center providing comprehensive healthcare services with experienced doctors and state-of-the-art facilities.",
            keywords: "medical center, healthcare, doctors, dental care, primary care"
          },
          lastModified: new Date().toISOString()
        }
        
        fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2))
        return res.status(200).json(defaultData)
      }
      
      const jsonData = fs.readFileSync(dataPath, 'utf8')
      const userData = JSON.parse(jsonData)
      console.log('✅ Data loaded successfully')
      
      // Set cache headers
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
      res.status(200).json(userData)
    } catch (error) {
      console.error('❌ Error reading data:', error)
      res.status(500).json({ message: 'Error reading data', error: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}