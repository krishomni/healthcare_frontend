// pages/index.js - Complete Homepage for Production
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaTooth, FaUserMd, FaHeartbeat, FaMicroscope, FaShieldAlt, FaProcedures, FaCalendarCheck, FaUsers, FaChartLine, FaImage, FaRefresh, FaSearch } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

// API Base URL - uses environment variable or falls back to relative paths
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export default function Home() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [dataSource, setDataSource] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      console.log('🏠 Loading homepage data...')
      setLoading(true)
      
      // Fetch from backend API
      const response = await fetch(`${API_BASE_URL}/api/user-data`)
      
      console.log('🏠 API Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Homepage data loaded:', {
          practice: data.practice?.name,
          services: data.services?.length || 0,
          blogPosts: data.blogPosts?.length || 0,
          gallery: data.gallery ? 'EXISTS' : 'MISSING',
          facilityImages: data.gallery?.facilityImages?.length || 0,
          beforeAfterCases: data.gallery?.beforeAfterCases?.length || 0
        })
        
        setUserData(data)
        setLastUpdated(data.lastModified || new Date().toISOString())
        setDataSource('API')
      } else {
        throw new Error('API call failed')
      }
    } catch (error) {
      console.error('❌ Error loading homepage data:', error)
      
      // Fallback to localStorage for development
      const savedData = localStorage.getItem('userData')
      if (savedData) {
        const data = JSON.parse(savedData)
        console.log('✅ Data loaded from localStorage:', Object.keys(data))
        setUserData(data)
        setDataSource('LocalStorage')
        setLastUpdated('From Browser Cache')
      } else {
        // Last resort: minimal default data
        setUserData({
          practice: {
            name: 'Healthcare Practice',
            tagline: 'Your Health, Our Priority',
            description: 'Providing quality healthcare services to our community.'
          },
          contact: {
            phone: '+1 (555) 123-4567',
            email: 'info@practice.com',
            address: { street: '', city: '', state: '', zip: '' }
          },
          stats: {
            yearsExperience: '15',
            patientsServed: '5,000',
            successRate: '98',
            doctorsCount: '8'
          },
          services: [],
          blogPosts: [],
          gallery: {
            facilityImages: [],
            beforeAfterCases: []
          },
          ui: {
            homepage: {
              primaryButtonText: 'Get Started',
              primaryButtonLink: '/contact',
              secondaryButtonText: 'Learn More',
              secondaryButtonLink: '/services'
            },
            services: {
              consultationButtonText: 'Schedule Consultation',
              consultationAction: 'phone'
            },
            blog: {
              readMoreText: 'Read More',
              linkTarget: '_self'
            },
            gallery: {
              viewAllText: 'View Full Gallery',
              viewAllLink: '/gallery'
            },
            navigation: {
              home: { text: 'Home', link: '/' },
              services: { text: 'Services', link: '/services' },
              blog: { text: 'Blog', link: '/blog' },
              contact: { text: 'Contact', link: '/contact' }
            }
          },
          seo: {
            siteTitle: 'Healthcare Practice',
            metaDescription: 'Quality healthcare services',
            keywords: 'healthcare'
          }
        })
        setDataSource('Default')
        setLastUpdated('Never')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered...')
    loadData()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('🔍 Searching for:', searchQuery)
      const results = {
        services: userData.services?.filter(service => 
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [],
        blogPosts: userData.blogPosts?.filter(post => 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        ) || []
      }
      console.log('🔍 Search results:', results)
      alert(`Found ${results.services.length} services and ${results.blogPosts.length} articles matching "${searchQuery}"`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading website data</p>
          <button 
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

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
    { icon: FaCalendarCheck, value: userData.stats?.yearsExperience || '0', label: 'Years Experience' },
    { icon: FaUsers, value: userData.stats?.patientsServed || '0', label: 'Patients Served' },
    { icon: FaChartLine, value: userData.stats?.successRate || '0', label: 'Success Rate' },
    { icon: FaUserMd, value: userData.stats?.doctorsCount || '0', label: 'Expert Doctors' }
  ]

  const hasGallery = userData.gallery && (
    (userData.gallery.facilityImages && userData.gallery.facilityImages.length > 0) ||
    (userData.gallery.beforeAfterCases && userData.gallery.beforeAfterCases.length > 0)
  )

  return (
    <>
      <Head>
        <title>{userData.seo?.siteTitle || userData.practice?.name || 'Healthcare Practice'}</title>
        <meta name="description" content={userData.seo?.metaDescription || userData.practice?.description} />
        <meta name="keywords" content={userData.seo?.keywords || 'healthcare'} />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        
        {/* Admin Access Link */}
        <Link
          href="/admin/login"
          className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-20 hover:opacity-100 transition-opacity"
        >
          Admin
        </Link>

        {/* Search Button */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="fixed top-24 right-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg transition-colors hover:bg-green-600"
          title="Search"
        >
          <FaSearch />
        </button>

        {/* Search Box */}
        {showSearch && (
          <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-xl border p-4 w-80">
            <form onSubmit={handleSearch} className="space-y-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, articles..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Debug Info - Only in Development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-20 left-4 bg-black text-white p-3 text-xs z-50 rounded-lg max-w-xs">
            <div className="mb-2">
              <strong>Debug Info:</strong>
            </div>
            <div>Data Source: {dataSource}</div>
            <div>Last Updated: {lastUpdated}</div>
            <div>Services: {userData.services?.length || 0}</div>
            <div>Blog Posts: {userData.blogPosts?.length || 0}</div>
            <div>Gallery: {hasGallery ? 'VISIBLE' : 'HIDDEN'}</div>
            <div>Facility Images: {userData.gallery?.facilityImages?.length || 0}</div>
            <div>B/A Cases: {userData.gallery?.beforeAfterCases?.length || 0}</div>
            <button 
              onClick={handleRefresh}
              className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded mt-2 flex items-center text-xs"
            >
              <FaRefresh className="mr-1" />
              Refresh
            </button>
          </div>
        )}

        {/* Hero Section */}
        <motion.section 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {userData.practice?.tagline || 'Your Health, Our Priority'}
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {userData.practice?.description || 'Providing quality healthcare services to our community.'}
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link 
                  href={userData.ui?.homepage?.primaryButtonLink || '/contact'} 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  {userData.ui?.homepage?.primaryButtonText || 'Get Started'}
                </Link>
                <Link 
                  href={userData.ui?.homepage?.secondaryButtonLink || '/services'} 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  {userData.ui?.homepage?.secondaryButtonText || 'Learn More'}
                </Link>
              </motion.div>
            </div>
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
                    <div className="bg-blue-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
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
        {userData.services && userData.services.length > 0 && (
          <motion.section 
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
                      key={service.id || index} 
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
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      {service.price && (
                        <div className="text-blue-600 font-semibold mb-4">
                          {service.price} {service.duration && `• ${service.duration}`}
                        </div>
                      )}
                      <Link href="/services" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
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
        )}

        {/* Gallery Section */}
        {hasGallery && (
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
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Our Facilities & Results</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Take a look at our state-of-the-art facilities and the successful outcomes we've achieved
                </p>
              </motion.div>

              {/* Facility Images */}
              {userData.gallery.facilityImages && userData.gallery.facilityImages.length > 0 && (
                <div className="mb-16">
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-8 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Our Modern Facilities
                  </motion.h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData.gallery.facilityImages.slice(0, 6).map((image, index) => (
                      <motion.div 
                        key={index}
                        className="relative group bg-white rounded-xl shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-blue-100 to-blue-200">
                          {image.url ? (
                            <img 
                              src={image.url} 
                              alt={image.caption || 'Facility image'}
                              className="w-full h-64 object-cover"
                            />
                          ) : (
                            <div className="w-full h-64 flex items-center justify-center">
                              <FaImage className="text-4xl text-blue-600 opacity-50" />
                            </div>
                          )}
                        </div>
                        {image.caption && (
                          <div className="p-4">
                            <p className="text-gray-700 font-medium">{image.caption}</p>
                            {image.description && (
                              <p className="text-gray-500 text-sm mt-1">{image.description}</p>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Before/After Cases */}
              {userData.gallery.beforeAfterCases && userData.gallery.beforeAfterCases.length > 0 && (
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-8 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Treatment Results
                  </motion.h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {userData.gallery.beforeAfterCases.slice(0, 4).map((case_, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="grid grid-cols-2">
                          <div className="relative">
                            <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-red-100 to-red-200">
                              {case_.beforeImage ? (
                                <img 
                                  src={case_.beforeImage} 
                                  alt="Before treatment"
                                  className="w-full h-48 object-cover"
                                />
                              ) : (
                                <div className="w-full h-48 flex items-center justify-center">
                                  <FaImage className="text-3xl text-red-600 opacity-50" />
                                </div>
                              )}
                            </div>
                            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Before
                            </div>
                          </div>
                          
                          <div className="relative">
                            <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-green-100 to-green-200">
                              {case_.afterImage ? (
                                <img 
                                  src={case_.afterImage} 
                                  alt="After treatment"
                                  className="w-full h-48 object-cover"
                                />
                              ) : (
                                <div className="w-full h-48 flex items-center justify-center">
                                  <FaImage className="text-3xl text-green-600 opacity-50" />
                                </div>
                              )}
                            </div>
                            <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              After
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            {case_.title || `Case Study ${index + 1}`}
                          </h4>
                          {case_.description && (
                            <p className="text-gray-600 text-sm mb-3">{case_.description}</p>
                          )}
                          {case_.treatment && (
                            <div className="flex items-center text-blue-600 text-sm font-medium">
                              <span>Treatment: {case_.treatment}</span>
                            </div>
                          )}
                          {case_.duration && (
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <span>Duration: {case_.duration}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery CTA */}
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Link
                  href={userData.ui?.gallery?.viewAllLink || '/gallery'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {userData.ui?.gallery?.viewAllText || 'View Full Gallery'}
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Blog Section */}
        {userData.blogPosts && userData.blogPosts.length > 0 && (
          <motion.section 
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
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">Latest Health Insights</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Stay informed with expert medical advice, health tips, and latest healthcare news
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {userData.blogPosts.filter(post => post.featured).slice(0, 3).map((blog, index) => (
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
                          target={userData.ui?.blog?.linkTarget || '_self'}
                          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                        >
                          {userData.ui?.blog?.readMoreText || 'Read More'} →
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
                  target={userData.ui?.blog?.linkTarget || '_self'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  View All Articles
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}

        <ScrollToTop />
      </div>
    </>
  )
}