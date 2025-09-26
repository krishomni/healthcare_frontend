import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaTooth, FaUserMd, FaHeartbeat, FaMicroscope, FaShieldAlt, FaProcedures, 
  FaCalendarCheck, FaUsers, FaChartLine 
} from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import { api } from '../lib/api'

export default function Home() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState(null)

  // Load data from API or fallback to localStorage/default
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getUserData()
        setUserData(data)
        setDataSource('API')
      } catch (error) {
        console.error('Error loading data:', error)
        const savedData = localStorage.getItem('userData')
        if (savedData) {
          setUserData(JSON.parse(savedData))
          setDataSource('LocalStorage')
        } else {
          setUserData({
            practice: { name: 'Healthcare Practice', tagline: 'Loading...', description: 'Loading...' },
            stats: { yearsExperience: '0', patientsServed: '0', successRate: '0', doctorsCount: '0' },
            services: [], 
            gallery: { facilityImages: [], beforeAfterCases: [] },
            seo: { siteTitle: 'Healthcare Practice', metaDescription: 'Welcome to our website' }
          })
          setDataSource('Default')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!userData) return <div>Error loading website data</div>

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
    { icon: FaCalendarCheck, value: userData?.stats?.yearsExperience || 0, label: 'Years Experience' },
    { icon: FaUsers, value: userData?.stats?.patientsServed || 0, label: 'Patients Served' },
    { icon: FaChartLine, value: userData?.stats?.successRate || 0, label: 'Success Rate' },
    { icon: FaUserMd, value: userData?.stats?.doctorsCount || 0, label: 'Expert Doctors' }
  ]

  return (
    <>
      <Head>
        <title>{userData.seo?.siteTitle || userData.practice.name}</title>
        <meta name="description" content={userData.seo?.metaDescription || ''} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />

        {/* Admin Link */}
        <Link
          href="/admin/login"
          className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-20 hover:opacity-100 transition-opacity"
        >
          Admin
        </Link>

        {/* Hero Section */}
        <motion.section 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {userData.practice.tagline}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                {userData.practice.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                  Get Started
                </Link>
                <Link href="/services" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {statsData.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="bg-blue-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
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

        <ScrollToTop />
      </div>
    </>
  )
}
