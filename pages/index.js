import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaTooth, FaBars, FaTimes, FaUserMd, FaHeartbeat, FaMicroscope, FaShieldAlt, FaProcedures, FaCalendarCheck, FaUsers, FaChartLine, FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaClinicMedical, FaXRay, FaHospital, FaBed, FaImage, FaStickyNote } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import NotesWidget from '../components/NotesWidget'
import { getUserData, getFeaturedBlogPosts } from '../lib/data'

export default function Home({ userData, featuredBlogs }) {
  const [showNotes, setShowNotes] = useState(false)

  const getServiceIcon = (iconName) => {
    const icons = {
      'tooth': FaTooth,
      'user-md': FaUserMd,
      'heartbeat': FaHeartbeat,
      'microscope': FaMicroscope,
      'shield-alt': FaShieldAlt,
      'procedures': FaProcedures
    }
    return icons[iconName] || FaUserMd
  }

  const statsData = [
    { icon: FaCalendarCheck, value: userData.stats.yearsExperience, label: 'Years Experience' },
    { icon: FaUsers, value: userData.stats.patientsServed, label: 'Patients Served' },
    { icon: FaChartLine, value: userData.stats.successRate, label: 'Success Rate' },
    { icon: FaUserMd, value: userData.stats.doctorsCount, label: 'Expert Doctors' }
  ]

  const galleryItems = [
    { icon: FaClinicMedical, title: 'Reception Area', gradient: 'from-blue-100 to-blue-200' },
    { icon: FaProcedures, title: 'Treatment Room', gradient: 'from-green-100 to-green-200' },
    { icon: FaXRay, title: 'Diagnostic Equipment', gradient: 'from-purple-100 to-purple-200' },
    { icon: FaHospital, title: 'Surgical Suite', gradient: 'from-yellow-100 to-yellow-200' },
    { icon: FaBed, title: 'Recovery Area', gradient: 'from-red-100 to-red-200' },
    { icon: FaMicroscope, title: 'Laboratory', gradient: 'from-indigo-100 to-indigo-200' }
  ]

  return (
    <>
      <Head>
        <title>{userData.seo.siteTitle}</title>
        <meta name="description" content={userData.seo.metaDescription} />
        <meta name="keywords" content={userData.seo.keywords} />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        
        {/* Notes Toggle */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="fixed top-24 right-4 z-50 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          title="Toggle Notes"
        >
          <FaStickyNote className="text-lg" />
        </button>

        {/* Notes Widget */}
        {showNotes && <NotesWidget onClose={() => setShowNotes(false)} />}

        {/* Hero Section */}
        <motion.section 
          id="home" 
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white pt-20 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
            <motion.div 
              className="text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {userData.practice.tagline}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                {userData.practice.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="bg-white py-16 lg:py-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {statsData.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div 
                    key={index} 
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-blue-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <Icon className="text-blue-600 text-2xl" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                      {stat.value}{stat.label.includes('Rate') ? '%' : '+'}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section 
          id="services" 
          className="bg-gray-50 py-16 lg:py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive healthcare services delivered by experienced professionals
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.services.slice(0, 6).map((service, index) => {
                const Icon = getServiceIcon(service.icon)
                
                return (
                  <motion.div 
                    key={service.id} 
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-blue-50 rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                      <Icon className="text-blue-600 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      Learn More 
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Blog Section */}
        <motion.section 
          className="bg-white py-16 lg:py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Latest Health Insights</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay informed with expert medical advice, health tips, and latest healthcare news
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredBlogs.map((blog, index) => (
                <motion.article 
                  key={blog.id} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <FaImage className="text-4xl text-blue-600 opacity-50" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {blog.category}
                      </span>
                      <span className="text-gray-500 text-sm">{blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">{blog.publishDate}</span>
                      <Link
                        href={`/blog/${blog.id}`}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link
                href="/blog"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View All Articles
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section 
          id="gallery" 
          className="bg-gray-50 py-16 lg:py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Our Modern Facility</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                State-of-the-art equipment and comfortable environment designed for your optimal care
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div 
                    key={index} 
                    className={`bg-gradient-to-br ${item.gradient} rounded-xl h-64 cursor-pointer shadow-lg`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-center text-blue-600 opacity-60 h-full flex flex-col items-center justify-center">
                      <Icon className="text-4xl mb-4 mx-auto" />
                      <p className="font-semibold">{item.title}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        <ScrollToTop />
      </div>
    </>
  )
}

// Get data at build time
export async function getStaticProps() {
  const userData = getUserData()      
  const featuredBlogs = getFeaturedBlogPosts()
  
  return { props: { userData, featuredBlogs } }
}