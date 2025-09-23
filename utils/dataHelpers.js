export const validatePracticeData = (data) => {
  const errors = {};
  
  if (!data.name?.trim()) errors.name = 'Practice name is required';
  if (!data.tagline?.trim()) errors.tagline = 'Tagline is required';
  if (!data.description?.trim()) errors.description = 'Description is required';
  if (!data.contact?.phone?.trim()) errors.phone = 'Phone number is required';
  if (!data.contact?.email?.trim()) errors.email = 'Email is required';
  if (!data.contact?.address?.street?.trim()) errors.street = 'Street address is required';
  if (!data.contact?.address?.city?.trim()) errors.city = 'City is required';
  if (!data.contact?.address?.state?.trim()) errors.state = 'State is required';
  if (!data.contact?.address?.zip?.trim()) errors.zip = 'ZIP code is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateServiceData = (service) => {
  const errors = {};
  
  if (!service.title?.trim()) errors.title = 'Service title is required';
  if (!service.description?.trim()) errors.description = 'Service description is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTeamMemberData = (member) => {
  const errors = {};
  
  if (!member.name?.trim()) errors.name = 'Name is required';
  if (!member.title?.trim()) errors.title = 'Title is required';
  if (!member.specialty?.trim()) errors.specialty = 'Specialty is required';
  if (!member.bio?.trim()) errors.bio = 'Bio is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateBlogPostData = (post) => {
  const errors = {};
  
  if (!post.title?.trim()) errors.title = 'Title is required';
  if (!post.excerpt?.trim()) errors.excerpt = 'Excerpt is required';
  if (!post.content?.trim()) errors.content = 'Content is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatPhoneNumber = (phone) => {
  // Simple phone number formatting
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const sanitizeHtml = (html) => {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '');
};

// Default placeholder data for new items
export const defaultPracticeData = {
  name: "[Enter Your Practice Name]",
  tagline: "[Your Practice Tagline]",
  description: "[Brief description of your healthcare practice and services]",
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
  }
};

export const defaultServiceData = {
  title: "[Service Name]",
  description: "[Detailed description of your service]",
  icon: "user-md",
  price: "[Service Price]",
  duration: "[Service Duration]",
  features: [
    "[Service Feature 1]",
    "[Service Feature 2]",
    "[Service Feature 3]"
  ],
  isActive: true
};

export const defaultTeamMemberData = {
  name: "[Doctor's Full Name]",
  title: "[Professional Title]",
  specialty: "[Medical Specialty]",
  credentials: ["[Degree 1]", "[Degree 2]"],
  bio: "[Professional biography and experience details]",
  specialties: ["[Specialty 1]", "[Specialty 2]"],
  languages: ["[Language 1]", "[Language 2]"],
  availability: "[Available Days and Hours]",
  phone: "[Direct Contact Number]",
  email: "[Professional Email]",
  experience: "[Years of Experience]",
  isActive: true
};

export const defaultBlogPostData = {
  title: "[Blog Post Title]",
  excerpt: "[Brief excerpt or summary of the blog post]",
  content: "[Full blog post content]",
  category: "[Post Category]",
  tags: ["[tag1]", "[tag2]"],
  featured: false,
  published: true
};