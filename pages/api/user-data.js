let userData = {
  practice: {
    name: "Elite Medical Center",
    tagline: "Your Health, Our Priority",
    description: "Providing exceptional healthcare services with state-of-the-art technology."
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
    }
  ],
  blogPosts: [
    {
      id: 1,
      title: "10 Essential Health Tips for 2024",
      slug: "health-tips-2024",
      excerpt: "Discover the latest evidence-based strategies to maintain optimal health and prevent common illnesses.",
      content: "<h2>Introduction</h2><p>Maintaining good health requires a comprehensive approach...</p>",
      publishDate: "2024-03-15",
      author: { name: "Dr. Sarah Johnson" },
      category: "Health Tips",
      tags: ["health", "prevention", "wellness"],
      readTime: "5 min read",
      featured: true
    }
  ],
  gallery: {
    facilityImages: [
      {
        url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
        caption: "Modern Reception Area",
        description: "Our welcoming reception area designed for patient comfort"
      }
    ],
    beforeAfterCases: [
      {
        title: "Complete Smile Makeover",
        treatment: "Dental Veneers & Whitening",
        duration: "6 weeks",
        description: "Patient received comprehensive cosmetic dental treatment.",
        beforeImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400",
        afterImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400"
      }
    ]
  },
  ui: {
    homepage: {
      primaryButtonText: "Get Started",
      primaryButtonLink: "/contact",
      secondaryButtonText: "Learn More",
      secondaryButtonLink: "/services"
    },
    services: {
      consultationButtonText: "Schedule Consultation",
      consultationAction: "phone"
    },
    blog: {
      readMoreText: "Read More",
      linkTarget: "_self"
    },
    gallery: {
      viewAllText: "View Full Gallery",
      viewAllLink: "/gallery"
    },
    navigation: {
      home: { text: "Home", link: "/" },
      services: { text: "Services", link: "/services" },
      blog: { text: "Blog", link: "/blog" },
      contact: { text: "Contact", link: "/contact" }
    }
  },
  seo: {
    siteTitle: "Elite Medical Center - Comprehensive Healthcare Services",
    metaDescription: "Leading medical center providing comprehensive healthcare services.",
    keywords: "medical center, healthcare, doctors"
  },
  lastModified: new Date().toISOString()
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(userData)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}