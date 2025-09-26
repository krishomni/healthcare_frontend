const siteConfig = {
  // BASIC INFORMATION - Edit these fields
  practice: {
    name: "Your Practice Name", // Change this to your practice name
    tagline: "Your Tagline Here", // Change this to your headline
    description: "Your practice description goes here. Describe your services and approach to healthcare.", // Your practice description
    logo: "/images/logo.png" // Add your logo file to public/images/
  },

  // CONTACT INFORMATION - Update with your details
  contact: {
    phone: "+1 (555) 123-4567", // Your phone number
    whatsapp: "+1 (555) 123-4567", // Your WhatsApp number  
    email: "info@yourpractice.com", // Your email
    address: {
      street: "123 Your Street, Suite 100", // Your address
      city: "Your City", // Your city
      state: "ST", // Your state
      zip: "12345" // Your ZIP code
    }
  },

  // BUSINESS HOURS - Update your operating hours
  hours: {
    weekdays: "Mon-Fri: 8:00 AM - 6:00 PM", // Your weekday hours
    saturday: "Sat: 9:00 AM - 2:00 PM", // Saturday hours (or "Closed")
    sunday: "Sun: Closed", // Sunday hours
    emergency: "24/7 Emergency Services Available" // Emergency info
  },

  // STATISTICS - Update with your actual numbers
  stats: {
    years: "15", // Years of experience
    patients: "5,000", // Number of patients served  
    successRate: "98", // Success rate percentage
    doctors: "8" // Number of doctors/staff
  },

  // SERVICES - Customize your services (add/remove/edit)
  services: [
    {
      title: "Primary Care", // Service name
      description: "Comprehensive healthcare services for all ages including annual checkups and preventive care.", // Service description
      icon: "user-md" // Icon name (don't change unless you know CSS)
    },
    {
      title: "Specialized Care", 
      description: "Expert treatment in cardiology, orthopedics, and other medical specialties with advanced equipment.",
      icon: "heartbeat"
    },
    {
      title: "Diagnostic Services",
      description: "State-of-the-art diagnostic testing including X-rays, lab work, and comprehensive health screenings.", 
      icon: "microscope"
    },
    {
      title: "Emergency Care",
      description: "Urgent medical care available for accidents, severe symptoms, and medical emergencies.",
      icon: "shield-alt"
    },
    {
      title: "Preventive Medicine",
      description: "Preventive healthcare services designed to maintain optimal health and catch issues early.",
      icon: "procedures" 
    },
    {
      title: "Wellness Programs",
      description: "Comprehensive wellness and lifestyle programs to help you achieve your health goals.",
      icon: "tooth"
    }
  ],

  // THEME COLORS - Customize your website colors
  theme: {
    primary: "#1e40af", // Main blue color (or change to your brand color)
    secondary: "#64748b", // Secondary gray color
    accent: "#f59e0b" // Accent color for highlights
  },

  // SEO SETTINGS - Improve your search engine visibility  
  seo: {
    title: "Your Practice Name - Quality Healthcare Services", // Browser tab title
    description: "Leading medical practice providing comprehensive healthcare services with experienced doctors and state-of-the-art facilities.", // Meta description
    keywords: "healthcare, medical practice, doctors, [your city], [your specialty]" // Keywords for SEO
  },

  // SOCIAL MEDIA - Add your social media links (optional)
  social: {
    facebook: "", // Your Facebook page URL
    instagram: "", // Your Instagram URL
    twitter: "", // Your Twitter URL  
    linkedin: "" // Your LinkedIn URL
  }
}

export default siteConfig