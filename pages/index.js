import { useState, useEffect } from 'react'
import Head from 'next/head'
import { FaTooth, FaBars, FaTimes, FaUserMd, FaHeartbeat, FaMicroscope, FaShieldAlt, FaProcedures, FaCalendarCheck, FaUsers, FaChartLine, FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaClinicMedical, FaXRay, FaHospital, FaBed, FaImage, FaCalendarAlt, FaLanguage } from 'react-icons/fa'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const practiceData = {
    name: 'Elite Dental Care',
    tagline: 'Your Smile, Our Priority',
    description: 'Providing exceptional dental care with state-of-the-art technology and compassionate service. Your oral health is our commitment.',
    stats: {
      years: '15',
      patients: '5000',
      successRate: '98',
      doctors: '8'
    }
  }

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#team', label: 'Team' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' }
  ]

  const services = [
    {
      icon: FaTooth,
      title: 'General Dentistry',
      description: 'Comprehensive dental care including cleanings, fillings, crowns, and preventive treatments for the whole family.'
    },
    {
      icon: FaUserMd,
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with veneers, teeth whitening, and aesthetic treatments using the latest techniques.'
    },
    {
      icon: FaProcedures,
      title: 'Oral Surgery',
      description: 'Expert surgical procedures including extractions, implants, and corrective jaw surgery with minimal discomfort.'
    },
    {
      icon: FaMicroscope,
      title: 'Orthodontics',
      description: 'Straighten your teeth with traditional braces, clear aligners, and modern orthodontic solutions.'
    },
    {
      icon: FaShieldAlt,
      title: 'Preventive Care',
      description: 'Protect your oral health with regular checkups, cleanings, and early detection of dental issues.'
    },
    {
      icon: FaHeartbeat,
      title: 'Emergency Dental',
      description: 'Urgent dental care available for accidents, severe pain, and dental emergencies when you need it most.'
    }
  ]

  const doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Chief Dental Officer',
      credentials: 'DDS, MS Periodontics',
      bio: 'Board-certified periodontist with over 15 years of experience specializing in gum disease treatment and dental implants. Graduated from Harvard School of Dental Medicine.',
      specialties: ['Periodontics', 'Dental Implants'],
      availability: 'Mon-Fri: 8:00 AM - 5:00 PM',
      languages: 'English, Spanish',
      gradient: 'from-blue-100 to-blue-200'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Cosmetic Dentist',
      credentials: 'DDS, AACD Accredited',
      bio: 'Cosmetic dentistry expert with 12 years of experience in smile makeovers, veneers, and aesthetic treatments. Member of the American Academy of Cosmetic Dentistry.',
      specialties: ['Cosmetic Dentistry', 'Veneers'],
      availability: 'Mon-Thu: 9:00 AM - 6:00 PM',
      languages: 'English, Mandarin',
      gradient: 'from-green-100 to-green-200'
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatric Dentist',
      credentials: 'DDS, Pediatric Specialty',
      bio: 'Dedicated pediatric dentist with 10 years of experience making dental visits fun and comfortable for children. Specializes in preventive care and behavior management.',
      specialties: ['Pediatric Dentistry', 'Preventive Care'],
      availability: 'Tue-Sat: 8:00 AM - 4:00 PM',
      languages: 'English, Spanish',
      gradient: 'from-purple-100 to-purple-200'
    }
  ]

  const statsData = [
    { icon: FaCalendarCheck, value: practiceData.stats.years, label: 'Years Experience' },
    { icon: FaUsers, value: practiceData.stats.patients, label: 'Patients Served' },
    { icon: FaChartLine, value: practiceData.stats.successRate, label: 'Success Rate' },
    { icon: FaUserMd, value: practiceData.stats.doctors, label: 'Expert Doctors' }
  ]

  const galleryItems = [
    { icon: FaClinicMedical, title: 'Reception Area', gradient: 'from-blue-100 to-blue-200' },
    { icon: FaProcedures, title: 'Treatment Room', gradient: 'from-green-100 to-green-200' },
    { icon: FaXRay, title: 'Diagnostic Equipment', gradient: 'from-purple-100 to-purple-200' },
    { icon: FaHospital, title: 'Surgical Suite', gradient: 'from-yellow-100 to-yellow-200' },
    { icon: FaBed, title: 'Recovery Area', gradient: 'from-red-100 to-red-200' },
    { icon: FaMicroscope, title: 'Laboratory', gradient: 'from-indigo-100 to-indigo-200' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({ fullName: '', email: '', phone: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>{practiceData.name} - Quality Healthcare Services</title>
        <meta name="description" content="Leading medical center providing comprehensive healthcare services with experienced doctors and state-of-the-art facilities." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90'
        }`}>
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center space-x-3 group">
                <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                  <FaTooth className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{practiceData.name}</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              
              {/* Contact Button */}
              <div className="hidden md:block">
                <a
                  href="#contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Contact Us
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-900 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
            
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden bg-white border-t shadow-lg">
                <div className="px-4 py-6 space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block text-gray-600 hover:text-blue-600 font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {practiceData.tagline}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {practiceData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </a>
                <a
                  href="#services"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {statsData.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center group">
                    <div className="bg-blue-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <Icon className="text-blue-600 text-2xl" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                      {stat.value}{stat.label.includes('Rate') ? '%' : '+'}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Our Dental Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive dental care delivered by experienced professionals using the latest technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 group">
                    <div className="bg-blue-50 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                      <Icon className="text-blue-600 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                      Learn More 
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Board-certified dental professionals dedicated to your oral health and beautiful smile
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className={`h-80 bg-gradient-to-br ${doctor.gradient} flex items-center justify-center`}>
                    <FaUserMd className="text-6xl text-blue-600 opacity-30" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{doctor.specialty}</p>
                    <p className="text-gray-600 font-medium mb-4">{doctor.credentials}</p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {doctor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {doctor.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-600 text-sm space-y-2">
                      <p className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        {doctor.availability}
                      </p>
                      <p className="flex items-center">
                        <FaLanguage className="mr-2" />
                        {doctor.languages}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Our Modern Facility</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                State-of-the-art equipment and comfortable environment designed for your optimal care
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {galleryItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className={`bg-gradient-to-br ${item.gradient} rounded-xl h-64 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg`}>
                    <div className="text-center text-blue-600 opacity-60">
                      <Icon className="text-4xl mb-4 mx-auto" />
                      <p className="font-semibold">{item.title}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Before/After Disclaimer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> Patient results may vary. All treatment outcomes depend on individual circumstances and following post-treatment care instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-blue-600 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Ready to schedule your appointment? Contact us today and let us help you achieve your perfect smile.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <FaPhone className="text-xl mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-blue-100">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaWhatsapp className="text-xl mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-blue-100">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaEnvelope className="text-xl mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-blue-100">info@elitedentalcare.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-xl mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-blue-100">
                        123 Dental Plaza, Suite 200<br />
                        Austin, TX 78701
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaClock className="text-xl mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Hours</p>
                      <p className="text-blue-100">
                        Mon-Fri: 8:00 AM - 6:00 PM<br />
                        Sat: 9:00 AM - 2:00 PM<br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white/10 rounded-xl p-8 backdrop-blur">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-vertical"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 disabled:opacity-50 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
                
                <p className="text-xs text-blue-100 mt-4">
                  Your information is secure and will only be used to respond to your inquiry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <h4 className="text-xl font-bold text-blue-400 mb-4">{practiceData.name}</h4>
                <p className="text-gray-300 mb-4 max-w-md">
                  Leading dental practice providing comprehensive oral health services with state-of-the-art technology and experienced professionals committed to your smile.
                </p>
                <div className="text-gray-300 text-sm">
                  <p>123 Dental Plaza, Suite 200</p>
                  <p>Austin, TX 78701</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Email: info@elitedentalcare.com</p>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {navItems.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-4">Services</h4>
                <ul className="space-y-2">
                  {services.slice(0, 4).map((service, index) => (
                    <li key={index}>
                      <a
                        href="#services"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {service.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
              <p>&copy; 2024 {practiceData.name}. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}