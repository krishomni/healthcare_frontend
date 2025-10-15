const siteConfig = {
  practice: {
    name: "Your Practice Name", 
    tagline: "Your Tagline Here", 
    description: "Your practice description goes here. Describe your services and approach to healthcare.", 
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
    sunday: "Sun: Closed", 
    emergency: "24/7 Emergency Services Available" 
  },

  stats: {
    years: "15",
    patients: "5,000", 
    successRate: "98", 
    doctors: "8" 
  },

  services: [
    {
      title: "Primary Care", 
      description: "Comprehensive healthcare services for all ages including annual checkups and preventive care.", // Service description
      icon: "user-md" 
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

  theme: {
    primary: "#1e40af", 
    secondary: "#64748b", 
    accent: "#f59e0b" 
  },

  seo: {
    title: "Your Practice Name - Quality Healthcare Services", // Browser tab title
    description: "Leading medical practice providing comprehensive healthcare services with experienced doctors and state-of-the-art facilities.", // Meta description
    keywords: "healthcare, medical practice, doctors, [your city], [your specialty]" // Keywords for SEO
  },

  social: {
    facebook: "", 
    instagram: "", 
    twitter: "", 
    linkedin: ""
  }
}

export default siteConfig