// pages/blog/index.js - Fixed to load from your MongoDB backend
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaSearch, FaFilter, FaImage, FaCalendar, FaUser, FaClock, FaTag } from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import ScrollToTop from '../../components/ScrollToTop'

export default function BlogIndex() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      console.log('📚 Loading blog data from API...')
      const response = await fetch('/api/user-data')
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }
      
      const data = await response.json()
      console.log('✅ Blog data loaded:', {
        totalPosts: data.blogPosts?.length || 0,
        posts: data.blogPosts?.map(p => p.title)
      })
      
      setUserData(data)
      setError(null)
    } catch (err) {
      console.error('❌ Error loading blog data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!userData || !userData.blogPosts || userData.blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        <div className="pt-32 pb-16 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Blog Posts Yet</h1>
            <p className="text-gray-600 mb-8">
              Start sharing your expertise by creating your first blog post in the admin panel.
            </p>
            <Link 
              href="/admin/dashboard" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Go to Admin Panel
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const blogPosts = userData.blogPosts || []
  const categories = ['All', ...new Set(blogPosts.map(post => post.category).filter(Boolean))]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Head>
        <title>Health Blog - {userData.practice?.name || 'Healthcare Practice'}</title>
        <meta name="description" content="Expert health advice, medical insights, and wellness tips from our healthcare professionals." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        
        {/* Hero Section */}
        <motion.section 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-32 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Health & Wellness Blog</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Expert medical advice, health tips, and the latest healthcare insights
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Search and Filter Section */}
        <motion.section 
          className="bg-white py-8 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md w-full">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <FaFilter className="text-gray-500" />
                <span className="text-gray-700 font-medium">Filter:</span>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {filteredPosts.map((post, index) => (
                  <motion.article 
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <FaImage className="text-4xl text-blue-600 opacity-50" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        {post.category && (
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="text-gray-500 text-sm flex items-center">
                            <FaClock className="mr-1" />
                            {post.readTime}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        {post.author?.name && (
                          <span className="flex items-center">
                            <FaUser className="mr-1" />
                            {post.author.name}
                          </span>
                        )}
                        {post.publishDate && (
                          <span className="flex items-center">
                            <FaCalendar className="mr-1" />
                            {new Date(post.publishDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs flex items-center">
                              <FaTag className="mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link
                        href={`/blog/${post.slug || post.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        Read Full Article →
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        <ScrollToTop />
      </div>
    </>
  )
}