const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs').promises;

// Import routes
const practiceRoutes = require('./routes/practice');
const servicesRoutes = require('./routes/services');
const teamRoutes = require('./routes/team');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const uploadRoutes = require('./routes/upload');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files and data files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
fs.access(dataDir).catch(() => fs.mkdir(dataDir, { recursive: true }));

// Routes
app.use('/api/practice', practiceRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize default data files if they don't exist
const initializeDataFiles = async () => {
  const defaultData = {
    practice: {
      name: "[Enter Your Practice Name]",
      tagline: "[Your Practice Tagline]",
      description: "[Brief description of your healthcare practice and services]",
      logo: "/uploads/logo.png",
      established: "[Year Established]",
      licenseNumber: "[Medical License Number]",
      contact: {
        phone: "[Your Phone Number]",
        whatsapp: "[WhatsApp Number]",
        email: "[Your Email Address]",
        emergencyPhone: "[Emergency Contact Number]",
        address: {
          street: "[Street Address]",
          city: "[City Name]",
          state: "[State/Province]",
          zip: "[Postal Code]",
          country: "[Country]"
        }
      },
      hours: {
        weekdays: "[Monday-Friday Hours]",
        saturday: "[Saturday Hours]",
        sunday: "[Sunday Hours]",
        emergency: "[Emergency Hours Information]"
      },
      stats: {
        yearsExperience: "[Years of Experience]",
        patientsServed: "[Number of Patients Served]",
        successRate: "[Success Rate Percentage]",
        doctorsCount: "[Number of Doctors]"
      },
      socialMedia: {
        facebook: "[Facebook URL]",
        instagram: "[Instagram URL]",
        twitter: "[Twitter URL]",
        linkedin: "[LinkedIn URL]"
      },
      seo: {
        siteTitle: "[Your Practice Name - Healthcare Services]",
        metaDescription: "[SEO description of your practice and services]",
        keywords: "[healthcare, medical, your specialty, location]"
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
    },
    services: [
      {
        id: "service-1",
        title: "[Service Name 1]",
        description: "[Detailed description of your first service]",
        icon: "user-md",
        price: "[Service Price]",
        duration: "[Service Duration]",
        features: [
          "[Service Feature 1]",
          "[Service Feature 2]",
          "[Service Feature 3]"
        ],
        isActive: true
      },
      {
        id: "service-2",
        title: "[Service Name 2]",
        description: "[Detailed description of your second service]",
        icon: "heartbeat",
        price: "[Service Price]",
        duration: "[Service Duration]",
        features: [
          "[Service Feature 1]",
          "[Service Feature 2]",
          "[Service Feature 3]"
        ],
        isActive: true
      }
    ],
    team: [
      {
        id: "doctor-1",
        name: "[Doctor's Full Name]",
        title: "[Professional Title]",
        specialty: "[Medical Specialty]",
        credentials: ["[Degree 1]", "[Degree 2]", "[Certification]"],
        bio: "[Professional biography and experience details]",
        specialties: ["[Specialty 1]", "[Specialty 2]"],
        languages: ["[Language 1]", "[Language 2]"],
        availability: "[Available Days and Hours]",
        phone: "[Direct Contact Number]",
        email: "[Professional Email]",
        experience: "[Years of Experience]",
        education: [
          {
            degree: "[Degree Name]",
            institution: "[University/Institution]",
            year: "[Graduation Year]"
          }
        ],
        isActive: true
      }
    ],
    blogPosts: [
      {
        id: 1,
        title: "[Blog Post Title]",
        slug: "[url-friendly-title]",
        excerpt: "[Brief excerpt or summary of the blog post]",
        content: "[Full blog post content in HTML format]",
        author: {
          name: "[Author Name]",
          id: "doctor-1"
        },
        category: "[Post Category]",
        tags: ["[tag1]", "[tag2]", "[tag3]"],
        readTime: "[X] min read",
        featured: true,
        published: true,
        publishDate: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0
      }
    ],
    gallery: {
      facilityImages: [
        {
          id: "facility-1",
          title: "[Facility Area Name]",
          description: "[Description of the facility area]",
          category: "Facility",
          image: "/uploads/facility/placeholder.jpg"
        }
      ],
      beforeAfterCases: [
        {
          id: "case-1",
          title: "[Case Study Title]",
          description: "[Case study description and results]",
          timeframe: "[Treatment Duration]",
          category: "[Medical Category]",
          beforeImage: "/uploads/cases/before-placeholder.jpg",
          afterImage: "/uploads/cases/after-placeholder.jpg"
        }
      ]
    },
    testimonials: [
      {
        id: "testimonial-1",
        patientName: "[Patient Name or Initials]",
        treatment: "[Treatment Received]",
        rating: 5,
        testimonial: "[Patient testimonial or review]",
        isActive: true,
        consentGiven: true
      }
    ],
    contacts: []
  };

  const filePath = path.join(dataDir, 'user-data.json');
  
  try {
    await fs.access(filePath);
  } catch (error) {
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
    console.log('Created default data file with placeholders');
  }
};

// Initialize on startup
initializeDataFiles();

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
