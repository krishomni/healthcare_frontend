// lib/data.js - Fixed with better error handling
import fs from 'fs'
import path from 'path'

// Get the JSON data with error handling
function getUserData() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'user-data.json')
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('user-data.json not found at:', filePath)
      // Return default data if file doesn't exist
      return getDefaultData()
    }
    
    const jsonData = fs.readFileSync(filePath, 'utf8')
    const parsedData = JSON.parse(jsonData)
    
    // Validate that required fields exist
    if (!parsedData.practice || !parsedData.contact || !parsedData.services) {
      console.error('Invalid JSON structure in user-data.json')
      return getDefaultData()
    }
    
    return parsedData
  } catch (error) {
    console.error('Error reading user-data.json:', error)
    return getDefaultData()
  }
}

// Default data fallback
function getDefaultData() {
  return {
    practice: {
      name: "Your Practice Name",
      tagline: "Your Tagline Here", 
      description: "Your practice description goes here. Edit data/user-data.json to customize this content.",
      logo: "/images/logo.png"
    },
    contact: {
      phone: "+1 (555) 123-4567",
      whatsapp: "+1 (555) 123-4567", 
      email: "info@yourpractice.com",
      address: {
        street: "123 Your Street, Suite 100",
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
    services: [
      {
        id: "primary-care",
        title: "Primary Care",
        description: "Comprehensive healthcare services for all ages including annual checkups and preventive care.",
        icon: "user-md",
        price: "$150",
        duration: "45 minutes",
        features: ["Health examination", "Preventive screening", "Disease management"]
      },
      {
        id: "specialty-care", 
        title: "Specialty Care",
        description: "Expert treatment in various medical specialties with advanced equipment and experienced professionals.",
        icon: "heartbeat",
        price: "$250", 
        duration: "60 minutes",
        features: ["Specialist consultation", "Advanced diagnostics", "Treatment planning"]
      },
      {
        id: "emergency-care",
        title: "Emergency Care", 
        description: "24/7 emergency medical services for urgent health conditions and critical care needs.",
        icon: "shield-alt",
        price: "$500",
        duration: "Variable", 
        features: ["Immediate care", "Emergency procedures", "Critical monitoring"]
      }
    ],
    team: [
      {
        id: "dr-sample",
        name: "Dr. Sample Name",
        title: "Chief Medical Officer", 
        specialty: "Internal Medicine",
        credentials: ["MD", "Board Certified"],
        bio: "Edit data/user-data.json to add your actual team members.",
        specialties: ["Internal Medicine", "Preventive Care"],
        languages: ["English"]
      }
    ],
    blogPosts: [
      {
        id: 1,
        title: "Welcome to Our Healthcare Blog",
        excerpt: "This is a sample blog post. Edit data/user-data.json to add your actual blog content.", 
        content: "<h2>Sample Blog Post</h2><p>This is a sample blog post. Edit the data/user-data.json file to add your actual blog content and articles.</p>",
        publishDate: "2024-03-15",
        author: { name: "Dr. Sample", id: "dr-sample" },
        category: "General Health",
        tags: ["health", "sample"],
        readTime: "2 min read",
        featured: true
      }
    ],
    gallery: {
      facilityImages: [
        {
          id: "sample-facility",
          title: "Sample Facility Image", 
          description: "Add your actual facility images by editing data/user-data.json",
          category: "Facility"
        }
      ],
      beforeAfterCases: []
    },
    testimonials: [
      {
        id: 1,
        patientName: "Sample Patient",
        rating: 5,
        text: "Add real testimonials by editing data/user-data.json",
        date: "2024-03-01",
        service: "Sample Service"
      }
    ],
    socialMedia: {
      facebook: "",
      instagram: "", 
      twitter: "",
      linkedin: ""
    },
    seo: {
      siteTitle: "Your Practice Name - Quality Healthcare Services",
      metaDescription: "Leading medical practice providing comprehensive healthcare services.",
      keywords: "healthcare, medical practice, doctors"
    },
    theme: {
      primaryColor: "#1e40af",
      secondaryColor: "#64748b", 
      accentColor: "#f59e0b"
    },
    features: {
      appointmentBooking: true,
      telemedicine: false,
      patientPortal: true
    }
  }
}

// Export all utility functions
export function getPracticeInfo() {
  const data = getUserData()
  return data.practice
}

export function getContactInfo() {
  const data = getUserData()
  return data.contact
}

export function getBusinessHours() {
  const data = getUserData()
  return data.hours
}

export function getStats() {
  const data = getUserData()
  return data.stats
}

export function getServices() {
  const data = getUserData()
  return data.services
}

export function getServiceById(id) {
  const data = getUserData()
  return data.services.find(service => service.id === id)
}

export function getTeamMembers() {
  const data = getUserData()
  return data.team
}

export function getTeamMemberById(id) {
  const data = getUserData()
  return data.team.find(member => member.id === id)
}

export function getBlogPosts() {
  const data = getUserData()
  return data.blogPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
}

export function getFeaturedBlogPosts() {
  const data = getUserData()
  return data.blogPosts.filter(post => post.featured)
}

export function getBlogPostById(id) {
  const data = getUserData()
  return data.blogPosts.find(post => post.id === parseInt(id))
}

export function getBlogPostBySlug(slug) {
  const data = getUserData()
  return data.blogPosts.find(post => post.slug === slug)
}

export function getRelatedBlogPosts(postId, limit = 3) {
  const data = getUserData()
  const currentPost = data.blogPosts.find(post => post.id === postId)
  if (!currentPost) return []
  
  return data.blogPosts
    .filter(post => post.id !== postId && post.category === currentPost.category)
    .slice(0, limit)
}

export function getBlogPostsByCategory(category) {
  const data = getUserData()
  return data.blogPosts.filter(post => post.category === category)
}

export function getBlogCategories() {
  const data = getUserData()
  const categories = [...new Set(data.blogPosts.map(post => post.category))]
  return ['All', ...categories]
}

export function searchContent(query) {
  const data = getUserData()
  const results = []
  
  // Search blog posts
  data.blogPosts.forEach(post => {
    if (
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    ) {
      results.push({
        type: 'blog',
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        url: `/blog/${post.id}`,
        category: post.category
      })
    }
  })
  
  // Search services
  data.services.forEach(service => {
    if (
      service.title.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase())
    ) {
      results.push({
        type: 'service',
        id: service.id,
        title: service.title,
        excerpt: service.description,
        url: '/services',
        category: 'Medical Service'
      })
    }
  })
  
  // Search team members
  data.team.forEach(member => {
    if (
      member.name.toLowerCase().includes(query.toLowerCase()) ||
      member.specialty.toLowerCase().includes(query.toLowerCase()) ||
      member.specialties.some(spec => spec.toLowerCase().includes(query.toLowerCase()))
    ) {
      results.push({
        type: 'team',
        id: member.id,
        title: member.name,
        excerpt: `${member.specialty} - ${member.credentials.join(', ')}`,
        url: '/team',
        category: 'Healthcare Professional'
      })
    }
  })
  
  return results
}

export function getGalleryItems() {
  const data = getUserData()
  return data.gallery.facilityImages
}

export function getBeforeAfterCases() {
  const data = getUserData()
  return data.gallery.beforeAfterCases
}

export function getTestimonials() {
  const data = getUserData()
  return data.testimonials
}

export function getSocialMedia() {
  const data = getUserData()
  return data.socialMedia
}

export function getSEOData() {
  const data = getUserData()
  return data.seo
}

export function getThemeConfig() {
  const data = getUserData()
  return data.theme
}

export function getFeatures() {
  const data = getUserData()
  return data.features
}

// Export the main function
export { getUserData }

// Quick setup script - create-data-file.js (run this once)
// You can create this file and run: node create-data-file.js

const fs = require('fs')
const path = require('path')

const sampleData = {
  "practice": {
    "name": "Elite Medical Center",
    "tagline": "Your Health, Our Priority", 
    "description": "Providing exceptional healthcare services with state-of-the-art technology and compassionate service.",
    "logo": "/images/logo.png"
  },
  "contact": {
    "phone": "+1 (555) 123-4567",
    "whatsapp": "+1 (555) 123-4567",
    "email": "info@elitemedicalcenter.com",
    "address": {
      "street": "123 Healthcare Blvd, Suite 200",
      "city": "Austin", 
      "state": "TX",
      "zip": "78701"
    }
  },
  "hours": {
    "weekdays": "Mon-Fri: 8:00 AM - 6:00 PM",
    "saturday": "Sat: 9:00 AM - 2:00 PM",
    "sunday": "Sun: Closed"
  },
  "stats": {
    "yearsExperience": "15",
    "patientsServed": "5,000",
    "successRate": "98", 
    "doctorsCount": "8"
  },
  "services": [
    {
      "id": "primary-care",
      "title": "Primary Care",
      "description": "Comprehensive healthcare services for all ages including annual checkups and preventive care.",
      "icon": "user-md",
      "price": "$150",
      "duration": "45 minutes",
      "features": ["Health examination", "Preventive screening", "Disease management"]
    },
    {
      "id": "cardiology",
      "title": "Cardiology Services", 
      "description": "Expert heart and cardiovascular care including diagnostics and treatment.",
      "icon": "heartbeat",
      "price": "$300",
      "duration": "60 minutes",
      "features": ["ECG testing", "Heart monitoring", "Treatment planning"]
    },
    {
      "id": "emergency-care",
      "title": "Emergency Care",
      "description": "24/7 emergency medical services for urgent health conditions.",
      "icon": "shield-alt", 
      "price": "$500",
      "duration": "Variable",
      "features": ["Immediate care", "Emergency procedures", "Critical monitoring"]
    }
  ],
  "team": [
    {
      "id": "dr-sarah-johnson",
      "name": "Dr. Sarah Johnson",
      "title": "Chief Medical Officer",
      "specialty": "Internal Medicine & Cardiology",
      "credentials": ["MD", "FACP", "FACC"],
      "bio": "Dr. Johnson is a board-certified internist and cardiologist with over 15 years of experience.",
      "specialties": ["Preventive Cardiology", "Internal Medicine"],
      "languages": ["English", "Spanish"]
    }
  ],
  "blogPosts": [
    {
      "id": 1,
      "title": "10 Essential Health Tips for 2024",
      "excerpt": "Discover the latest evidence-based strategies to maintain optimal health.",
      "content": "<h2>Stay Healthy in 2024</h2><p>Here are the top 10 health tips for the new year...</p>",
      "publishDate": "2024-03-15",
      "author": {"name": "Dr. Sarah Johnson", "id": "dr-sarah-johnson"},
      "category": "Preventive Care",
      "tags": ["health", "prevention", "wellness"],
      "readTime": "5 min read",
      "featured": true
    }
  ],
  "gallery": {
    "facilityImages": [],
    "beforeAfterCases": []
  },
  "testimonials": [],
  "socialMedia": {
    "facebook": "",
    "instagram": "",
    "twitter": "",
    "linkedin": ""
  },
  "seo": {
    "siteTitle": "Elite Medical Center - Comprehensive Healthcare",
    "metaDescription": "Leading medical center providing comprehensive healthcare services.",
    "keywords": "healthcare, medical center, doctors, Austin, Texas"
  },
  "theme": {
    "primaryColor": "#1e40af",
    "secondaryColor": "#64748b",
    "accentColor": "#f59e0b"
  },
  "features": {
    "appointmentBooking": true,
    "telemedicine": false,
    "patientPortal": true
  }
}

// Create the data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

// Write the sample data file
const filePath = path.join(dataDir, 'user-data.json')
fs.writeFileSync(filePath, JSON.stringify(sampleData, null, 2))

console.log('✅ Created data/user-data.json with sample data')
console.log('You can now customize this file with your practice information')
