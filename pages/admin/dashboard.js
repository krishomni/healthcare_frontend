import Link from 'next/link' 
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { api } from '../../lib/api'

import { FaHome, FaCog, FaFileAlt, FaUsers, FaImages, FaEnvelope, FaSignOutAlt, FaSave, FaEdit, FaPlus, FaTrash, FaTimes, FaEye, FaSearch, FaArrowLeft } from 'react-icons/fa'
const ServicesEditor = dynamic(() => import('../../components/admin/ServicesEditor'), { loading: () => <p>Loading...</p> })
const BlogEditor = dynamic(() => import('../../components/admin/BlogEditor'), { loading: () => <p>Loading...</p> })
const GalleryEditor = dynamic(() => import('../../components/admin/GalleryEditor'), { loading: () => <p>Loading...</p> })

const tabs = [
  { id: 'practice', label: 'Practice Info', icon: FaHome },
  { id: 'contact', label: 'Contact & Hours', icon: FaEnvelope },
  { id: 'services', label: 'Services', icon: FaCog },
  { id: 'blog', label: 'Blog Posts', icon: FaFileAlt },
  { id: 'gallery', label: 'Gallery', icon: FaImages },
  { id: 'ui', label: 'Buttons & Links', icon: FaEdit }, // ADD THIS
  { id: 'seo', label: 'SEO Settings', icon: FaSearch }
]

export default function AdminDashboard() {
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState('practice')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadUserData()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    console.log('🔑 Auth token:', token ? 'Present' : 'Missing')
    if (!token) {
      router.push('/admin/login')
      return false
    }
    return true
  }

  const loadUserData = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    const data = await api.getAdminData(token)
    setUserData(data)
  } catch (error) {
    console.error('Error loading admin data:', error)
     setUserData({
        practice: {
          name: 'Your Practice Name',
          tagline: 'Your Tagline Here',
          description: 'Your practice description goes here.'
        },
        contact: {
          phone: '+1 (555) 123-4567',
          whatsapp: '+1 (555) 123-4567',
          email: 'info@yourpractice.com',
          address: {
            street: '123 Your Street, Suite 100',
            city: 'Your City',
            state: 'ST',
            zip: '12345'
          }
        },
        hours: {
          weekdays: 'Mon-Fri: 8:00 AM - 6:00 PM',
          saturday: 'Sat: 9:00 AM - 2:00 PM',
          sunday: 'Sun: Closed'
        },
        stats: {
          yearsExperience: '15',
          patientsServed: '5,000',
          successRate: '98',
          doctorsCount: '8'
        },
        services: [],
        blogPosts: [],
        seo: {
          siteTitle: 'Your Practice Name - Quality Healthcare Services',
          metaDescription: 'Leading medical practice providing comprehensive healthcare services.',
          keywords: 'healthcare, medical practice, doctors'
        }
      })
    } finally {
      setLoading(false)
    }
}
const saveData = async () => {
  setSaving(true)
  
  console.log('=== SAVING ALL SERVICES ===')
  userData.services?.forEach((service, index) => {
    console.log(`Service ${index}: ${service.title}`)
    console.log(`  - Has image: ${!!service.image}`)
    console.log(`  - Image URL: ${service.image || 'NONE'}`)
  })
  
  try {
    const token = localStorage.getItem('adminToken')
    
    const response = await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })

    if (response.ok) {
      console.log('=== Saved successfully ===')
      setSaveStatus('Changes saved successfully!')
      setTimeout(() => setSaveStatus(''), 3000)
    }
  } catch (error) {
    console.error('Save error:', error)
    setSaveStatus('Error saving changes')
  } finally {
    setSaving(false)
  }
}
  const updateGallery = (gallery) => {
  setUserData(prev => ({
    ...prev,
    gallery
  }))
}
  const updateField = (section, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const updateNestedField = (section, subsection, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }))
  }
 
  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('userData') 
    router.push('/admin/login')
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load dashboard data</p>
          <button 
            onClick={loadUserData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Website Management</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900">Website Management</h1>
        <Link 
          href="/" 
          target="_blank"
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
        >
          <FaArrowLeft className="mr-1" />
          View Site
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {saveStatus && (
          <span className={`text-sm px-3 py-1 rounded-full ${
            saveStatus.includes('Error') || saveStatus.includes('⚠️') 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {saveStatus}
          </span>
        )}
        <button
          onClick={saveData}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <FaSave className="mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={logout}
          className="text-gray-600 hover:text-gray-900 p-2 transition-colors"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  </div>
</header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-lg shadow">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left border-b border-gray-200 transition-colors ${
                        activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="mr-3" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-6">
                
                {/* Services Tab */}
                {activeTab === 'services' && (
                  <ServicesEditor 
                    services={userData.services || []} 
                    onUpdate={(services) => setUserData(prev => ({...prev, services}))}
                  />
                )}

                {/* Blog Tab */}
                {activeTab === 'blog' && (
                  <BlogEditor 
                    blogPosts={userData.blogPosts || []} 
                    onUpdate={(blogPosts) => setUserData(prev => ({...prev, blogPosts}))}
                  />
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                  <GalleryEditor 
                    gallery={userData.gallery || { facilityImages: [], beforeAfterCases: [] }} 
                    onUpdate={(gallery) => setUserData(prev => ({...prev, gallery}))}
                  />
                )}
    
                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <FaSearch className="mr-3" />
                      SEO Settings
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                        <input
                          type="text"
                          value={userData.seo?.siteTitle || ''}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            seo: { ...prev.seo, siteTitle: e.target.value }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your Practice Name - Services"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                        <textarea
                          value={userData.seo?.metaDescription || ''}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            seo: { ...prev.seo, metaDescription: e.target.value }
                          }))}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Brief description for search engines (150-160 characters)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                        <input
                          type="text"
                          value={userData.seo?.keywords || ''}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            seo: { ...prev.seo, keywords: e.target.value }
                          }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="healthcare, medical, doctors, clinic"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Practice Info Tab */}
{activeTab === 'practice' && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
      <FaHome className="mr-3" />
      Practice Information
    </h2>

    {/* Basic Info */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Practice Name *
        </label>
        <input
          type="text"
          value={userData?.practice?.name || ''}
          onChange={(e) => updateField('practice', 'name', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter practice name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tagline *
        </label>
        <input
          type="text"
          value={userData?.practice?.tagline || ''}
          onChange={(e) => updateField('practice', 'tagline', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter tagline"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description 
      </label>
      <textarea
        value={userData?.practice?.description || ''}
        onChange={(e) => updateField('practice', 'description', e.target.value)}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Describe your practice"
      />
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Years Experience
        </label>
        <input
          type="text"
          value={userData?.stats?.yearsExperience || ''}
          onChange={(e) => updateField('stats', 'yearsExperience', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Patients Served
        </label>
        <input
          type="text"
          value={userData?.stats?.patientsServed || ''}
          onChange={(e) => updateField('stats', 'patientsServed', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Success Rate (%)
        </label>
        <input
          type="text"
          value={userData?.stats?.successRate || ''}
          onChange={(e) => updateField('stats', 'successRate', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Doctors
        </label>
        <input
          type="text"
          value={userData?.stats?.doctorsCount || ''}
          onChange={(e) => updateField('stats', 'doctorsCount', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
)}

                {/* Contact & Hours Tab */}
{activeTab === 'contact' && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
      <FaEnvelope className="mr-3" />
      Contact Information & Hours
    </h2>

    {/* Contact Info */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          value={userData?.contact?.phone || ''}
          onChange={(e) => updateField('contact', 'phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          WhatsApp Number
        </label>
        <input
          type="tel"
          value={userData?.contact?.whatsapp || ''}
          onChange={(e) => updateField('contact', 'whatsapp', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email Address *
      </label>
      <input
        type="email"
        value={userData?.contact?.email || ''}
        onChange={(e) => updateField('contact', 'email', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Address */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <input
          type="text"
          value={userData?.contact?.address?.street || ''}
          onChange={(e) => updateNestedField('contact', 'address', 'street', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <input
          type="text"
          value={userData?.contact?.address?.city || ''}
          onChange={(e) => updateNestedField('contact', 'address', 'city', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State *
        </label>
        <input
          type="text"
          value={userData?.contact?.address?.state || ''}
          onChange={(e) => updateNestedField('contact', 'address', 'state', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ZIP Code *
        </label>
        <input
          type="text"
          value={userData?.contact?.address?.zip || ''}
          onChange={(e) => updateNestedField('contact', 'address', 'zip', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Business Hours */}
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weekdays (Mon-Fri)
          </label>
          <input
            type="text"
            value={userData?.hours?.weekdays || ''}
            onChange={(e) => updateField('hours', 'weekdays', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Mon-Fri: 8:00 AM - 6:00 PM"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Saturday
          </label>
          <input
            type="text"
            value={userData?.hours?.saturday || ''}
            onChange={(e) => updateField('hours', 'saturday', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Sat: 9:00 AM - 2:00 PM"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sunday
        </label>
        <input
          type="text"
          value={userData?.hours?.sunday || ''}
          onChange={(e) => updateField('hours', 'sunday', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Sun: Closed"
        />
      </div>
    </div>
  </div>
)}
      {activeTab === 'ui' && (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
      <FaEdit className="mr-3" />
      Buttons & Links Settings
    </h2>

    {/* Homepage Buttons */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Homepage Hero Buttons</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
          <input
            type="text"
            value={userData.ui?.homepage?.primaryButtonText || 'Get Started'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                homepage: { ...prev.ui?.homepage, primaryButtonText: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Get Started"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Link</label>
          <input
            type="text"
            value={userData.ui?.homepage?.primaryButtonLink || '/contact'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                homepage: { ...prev.ui?.homepage, primaryButtonLink: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/contact"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
          <input
            type="text"
            value={userData.ui?.homepage?.secondaryButtonText || 'Learn More'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                homepage: { ...prev.ui?.homepage, secondaryButtonText: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Learn More"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Link</label>
          <input
            type="text"
            value={userData.ui?.homepage?.secondaryButtonLink || '/services'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                homepage: { ...prev.ui?.homepage, secondaryButtonLink: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/services"
          />
        </div>
      </div>
    </div>

    {/* Services Page Buttons */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Page Buttons</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Button Text</label>
          <input
            type="text"
            value={userData.ui?.services?.consultationButtonText || 'Schedule Consultation'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                services: { ...prev.ui?.services, consultationButtonText: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Schedule Consultation"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Button Action</label>
          <select
            value={userData.ui?.services?.consultationAction || 'phone'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                services: { ...prev.ui?.services, consultationAction: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="phone">Call Phone Number</option>
            <option value="contact">Go to Contact Page</option>
            <option value="email">Send Email</option>
            <option value="custom">Custom Link</option>
          </select>
        </div>
        {userData.ui?.services?.consultationAction === 'custom' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Link URL</label>
            <input
              type="text"
              value={userData.ui?.services?.customLink || ''}
              onChange={(e) => setUserData(prev => ({
                ...prev,
                ui: {
                  ...prev.ui,
                  services: { ...prev.ui?.services, customLink: e.target.value }
                }
              }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/booking"
            />
          </div>
        )}
      </div>
    </div>

    {/* Blog Settings */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blog Button Text</label>
          <input
            type="text"
            value={userData.ui?.blog?.readMoreText || 'Read More'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                blog: { ...prev.ui?.blog, readMoreText: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Read More"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blog Link Behavior</label>
          <select
            value={userData.ui?.blog?.linkTarget || '_self'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                blog: { ...prev.ui?.blog, linkTarget: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="_self">Same Tab</option>
            <option value="_blank">New Tab</option>
          </select>
        </div>
      </div>
    </div>

    {/* Gallery Settings */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Button Text</label>
          <input
            type="text"
            value={userData.ui?.gallery?.viewAllText || 'View Full Gallery'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                gallery: { ...prev.ui?.gallery, viewAllText: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="View Full Gallery"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Button Link</label>
          <input
            type="text"
            value={userData.ui?.gallery?.viewAllLink || '/gallery'}
            onChange={(e) => setUserData(prev => ({
              ...prev,
              ui: {
                ...prev.ui,
                gallery: { ...prev.ui?.gallery, viewAllLink: e.target.value }
              }
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/gallery"
          />
        </div>
      </div>
    </div>

    {/* Navigation Settings */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation Menu</h3>
      <div className="space-y-4">
        {['Home', 'Services', 'Blog', 'Contact'].map((item, index) => (
          <div key={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{item} Menu Text</label>
              <input
                type="text"
                value={userData.ui?.navigation?.[item.toLowerCase()]?.text || item}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  ui: {
                    ...prev.ui,
                    navigation: {
                      ...prev.ui?.navigation,
                      [item.toLowerCase()]: {
                        ...prev.ui?.navigation?.[item.toLowerCase()],
                        text: e.target.value
                      }
                    }
                  }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={item}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{item} Menu Link</label>
              <input
                type="text"
                value={userData.ui?.navigation?.[item.toLowerCase()]?.link || `/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  ui: {
                    ...prev.ui,
                    navigation: {
                      ...prev.ui?.navigation,
                      [item.toLowerCase()]: {
                        ...prev.ui?.navigation?.[item.toLowerCase()],
                        link: e.target.value
                      }
                    }
                  }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="text-blue-800 font-semibold mb-2">💡 Button & Link Tips:</h4>
      <ul className="text-blue-700 text-sm space-y-1">
        <li>• Use internal links like "/contact" or "/services" for pages on your site</li>
        <li>• Use external links like "https://calendly.com/yourname" for booking systems</li>
        <li>• Phone links: "tel:+1234567890" to make buttons dial numbers</li>
        <li>• Email links: "mailto:info@yourpractice.com" to open email</li>
        <li>• All changes apply across your entire website</li>
      </ul>
    </div>
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}