// pages/contact.js - Create this new page
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaCalendarAlt, FaComment } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import { api } from '../lib/api'


export default function Contact() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('/api/user-data')
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('Sending...')
    
    // Simulate form submission (replace with actual form handler)
    setTimeout(() => {
      setFormStatus('Thank you! We will contact you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        preferredDate: '',
        message: ''
      })
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!userData) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Error loading contact information</div>
  }

  return (
    <>
      <Head>
        <title>Contact Us - {userData.practice?.name}</title>
        <meta name="description" content="Contact our medical practice to schedule a consultation or ask questions about our services." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Contact Us
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-3xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Ready to schedule your consultation? We're here to help with all your healthcare needs.
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <FaPhone className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                      <a 
                        href={`tel:${userData.contact?.phone}`}
                        className="text-blue-600 hover:text-blue-700 text-lg"
                      >
                        {userData.contact?.phone}
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Call for immediate assistance</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <FaEnvelope className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                      <a 
                        href={`mailto:${userData.contact?.email}`}
                        className="text-blue-600 hover:text-blue-700 text-lg"
                      >
                        {userData.contact?.email}
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Send us your questions</p>
                    </div>
                  </div>

                  {/* Address */}
                  {userData.contact?.address && (
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-lg p-3 mr-4">
                        <FaMapMarkerAlt className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                        <p className="text-gray-700">
                          {userData.contact.address.street}<br />
                          {userData.contact.address.city}, {userData.contact.address.state} {userData.contact.address.zip}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">Visit us in person</p>
                      </div>
                    </div>
                  )}

                  {/* Hours */}
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                      <FaClock className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Hours</h3>
                      <div className="text-gray-700 space-y-1">
                        <p>{userData.hours?.weekdays}</p>
                        <p>{userData.hours?.saturday}</p>
                        <p>{userData.hours?.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href={`tel:${userData.contact?.phone}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <FaPhone className="mr-2" />
                    Call Now
                  </a>
                  <a
                    href={`mailto:${userData.contact?.email}`}
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <FaEnvelope className="mr-2" />
                    Send Email
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Consultation</h2>
                  
                  {formStatus && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      formStatus.includes('Thank you') 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {formStatus}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service of Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a service</option>
                        {userData.services?.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                        <option value="General Consultation">General Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <FaComment className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about your health concerns or questions..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'Sending...'}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                    >
                      {formStatus === 'Sending...' ? 'Sending...' : 'Schedule Consultation'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ScrollToTop />
      </div>
    </>
  )
}