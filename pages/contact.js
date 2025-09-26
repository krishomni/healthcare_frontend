import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheck, FaArrowLeft, FaUser, FaCalendarAlt } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import siteConfig from '../config/site-config'
import { api } from '../lib/api'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate form submission - replace with actual API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
      setFormData({ fullName: '', email: '', phone: '', service: '', preferredDate: '', preferredTime: '', message: '' })
      setErrors({})
    }, 2000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  // Success Page
  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Message Sent - {siteConfig.practice.name}</title>
        </Head>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-32 pb-16">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="text-green-600 text-3xl" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h1>
                <p className="text-lg text-gray-600 mb-8">
                  Thank you for contacting us. We've received your message and will get back to you within 24 hours.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                      You'll receive an email confirmation shortly
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                      Our team will review your request within 2-4 hours
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                      We'll contact you to confirm your appointment details
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                      You'll receive appointment reminders via email/SMS
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                  <Link
                    href="/"
                    className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                  >
                    Return Home
                  </Link>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">Need immediate assistance?</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <FaPhone className="mr-2" />
                      Call {siteConfig.contact.phone}
                    </a>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`}
                      className="flex items-center justify-center text-green-600 hover:text-green-700 font-medium"
                    >
                      <FaWhatsapp className="mr-2" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Contact Us - {siteConfig.practice.name}</title>
        <meta name="description" content="Get in touch with our healthcare team. Schedule appointments, ask questions, or learn more about our services." />
        <meta name="keywords" content="contact, appointment, healthcare, medical consultation" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Section */}
        <motion.section 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-32 pb-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500 rounded-full opacity-10"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Ready to take the next step in your healthcare journey? We're here to help you every step of the way.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
                
                <div className="space-y-6 mb-8">
                  <motion.div 
                    className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaPhone className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <p className="text-gray-600">{siteConfig.contact.phone}</p>
                      <p className="text-gray-500 text-sm">Mon-Fri 8AM-6PM</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <FaWhatsapp className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-gray-600">{siteConfig.contact.whatsapp}</p>
                      <p className="text-gray-500 text-sm">Quick responses</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <FaEnvelope className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">{siteConfig.contact.email}</p>
                      <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <FaMapMarkerAlt className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        {siteConfig.contact.address.street}<br />
                        {siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                      <FaClock className="text-yellow-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                      <div className="text-gray-600 text-sm">
                        <p>{siteConfig.hours.weekdays}</p>
                        <p>{siteConfig.hours.saturday}</p>
                        <p>{siteConfig.hours.sunday}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Map Placeholder */}
                <motion.div 
                  className="bg-gray-200 rounded-lg h-64 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center text-gray-500">
                    <FaMapMarkerAlt className="text-4xl mb-2 mx-auto" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Coming Soon</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Schedule Your Appointment</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service of Interest
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a service</option>
                          {siteConfig.services.map((service, index) => (
                            <option key={index} value={service.title}>{service.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tell us how we can help you, your symptoms, or any questions you have..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="loading-spinner mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        'Send Message & Schedule Appointment'
                      )}
                    </button>
                  </form>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700 text-center">
                      <strong>Privacy Notice:</strong> Your information is secure and will only be used to respond to your inquiry and schedule your appointment. We follow HIPAA guidelines for all patient communications.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <motion.section 
          className="bg-white py-16 border-t"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Need Immediate Assistance?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.a
                href={`tel:${siteConfig.contact.phone}`}
                className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                <FaPhone className="text-blue-600 text-2xl mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Call Now</h4>
                <p className="text-gray-600 text-sm">Speak directly with our team</p>
              </motion.a>

              <motion.a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`}
                className="bg-green-50 hover:bg-green-100 p-6 rounded-lg transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                <FaWhatsapp className="text-green-600 text-2xl mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
                <p className="text-gray-600 text-sm">Quick message response</p>
              </motion.a>

              <motion.div
                className="bg-yellow-50 hover:bg-yellow-100 p-6 rounded-lg transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                <FaCalendarAlt className="text-yellow-600 text-2xl mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-2">Emergency</h4>
                <p className="text-gray-600 text-sm">Call 911 for emergencies</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <ScrollToTop />
      </div>
    </>
  )
}
