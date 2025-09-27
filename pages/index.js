// pages/index.js - Complete Homepage for Production
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaTooth, FaUserMd, FaHeartbeat, FaMicroscope, FaShieldAlt, FaProcedures, FaCalendarCheck, FaUsers, FaChartLine, FaImage, FaRefresh, FaSearch } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import { api } from '../lib/api'

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
    console.log('Loading homepage data...')
    setLoading(true)
    
    const data = await api.getUserData()
    console.log('Data loaded:', {
      practice: data.practice?.name,
      services: data.services?.length || 0,
      gallery: data.gallery ? 'EXISTS' : 'MISSING'
    })
    
    setUserData(data)
    setDataSource('API')
  } catch (error) {
    console.error('Error loading data:', error)
    
    // Fallback to localStorage for development
    const savedData = localStorage.getItem('userData')
    if (savedData) {
      setUserData(JSON.parse(savedData))
      setDataSource('LocalStorage')
    } else {
      // Set minimal default data
      setUserData({
        practice: { name: 'Healthcare Practice', tagline: 'Loading...', description: 'Loading...' },
        stats: { yearsExperience: '0', patientsServed: '0', successRate: '0', doctorsCount: '0' },
        services: [], gallery: { facilityImages: [], beforeAfterCases: [] }
      })
      setDataSource('Default')
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

               <ScrollToTop />
      </div>
    </>
  )
}