// pages/search.js - Fixed with proper imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaSearch, FaFileAlt, FaStethoscope, FaUser, FaClock, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import { getUserData, searchContent } from '../lib/data'

export default function Search({ userData }) {
  const router = useRouter()
  const { q } = router.query
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (q) {
      setSearchQuery(q)
      performSearch(q)
    }
  }, [q])

  const performSearch = (query) => {
    setLoading(true)
    
    try {
      const searchResults = searchContent(query)
      
      // Add additional details to service results
      const enhancedResults = searchResults.map(result => {
        if (result.type === 'service') {
          const service = userData.services.find(s => s.id === result.id)
          if (service) {
            return {
              ...result,
              price: service.price,
              duration: service.duration,
              features: service.features
            }
          }
        }
        return result
      })
      
      setTimeout(() => {
        setResults(enhancedResults)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'blog': return FaFileAlt
      case 'service': return FaStethoscope
      case 'team': return FaUser
      default: return FaFileAlt
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'blog': return 'Article'
      case 'service': return 'Service'
      case 'team': return 'Team Member'
      default: return 'Content'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'blog': return 'bg-green-100 text-green-600'
      case 'service': return 'bg-blue-100 text-blue-600'
      case 'team': return 'bg-purple-100 text-purple-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <>
      <Head>
        <title>Search Results - {userData.practice.name}</title>
        <meta name="description" content="Search results for healthcare services, articles, and information." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        
        {/* Search Header */}
        <motion.section 
          className="bg-white pt-32 pb-8 border-b"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Search Results</h1>
              
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, services, team members..."
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
              
              {q && (
                <p className="text-gray-600">
                  Showing results for: <span className="font-semibold text-blue-600">"{q}"</span>
                </p>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Search Results */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching...</p>
              </motion.div>
            ) : (
              <>
                {results.length > 0 ? (
                  <>
                    <motion.p 
                      className="text-gray-600 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </motion.p>
                    
                    <div className="space-y-6">
                      {results.map((result, index) => {
                        const Icon = getTypeIcon(result.type)
                        return (
                          <motion.div
                            key={`${result.type}-${result.id}`}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <div className="flex items-start">
                              <div className="bg-gray-50 p-3 rounded-lg mr-4 flex-shrink-0">
                                <Icon className="text-gray-600 text-xl" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center mb-3 flex-wrap gap-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(result.type)}`}>
                                    {getTypeLabel(result.type)}
                                  </span>
                                  <span className="text-gray-500 text-sm">{result.category}</span>
                                  {result.price && (
                                    <span className="flex items-center text-green-600 text-sm font-medium">
                                      <FaDollarSign className="mr-1" />
                                      {result.price.replace('$', '')}
                                    </span>
                                  )}
                                  {result.duration && (
                                    <span className="flex items-center text-blue-600 text-sm">
                                      <FaClock className="mr-1" />
                                      {result.duration}
                                    </span>
                                  )}
                                </div>
                                
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                  <Link href={result.url}>
                                    {result.title}
                                  </Link>
                                </h3>
                                
                                <p className="text-gray-600 mb-3 leading-relaxed">
                                  {result.excerpt}
                                </p>
                                
                                {result.features && (
                                  <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {result.features.slice(0, 3).map((feature, idx) => (
                                        <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                          {feature}
                                        </span>
                                      ))}
                                      {result.features.length > 3 && (
                                        <span className="text-xs text-gray-500">
                                          +{result.features.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                <Link
                                  href={result.url}
                                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                  {result.type === 'blog' ? 'Read Article' : 
                                   result.type === 'service' ? 'Learn More' : 'View Profile'} 
                                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </>
                ) : q ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <FaSearch className="text-4xl text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      We couldn't find anything matching "{q}". Try different keywords or browse our services and articles.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/blog"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                      >
                        Browse Articles
                      </Link>
                      <Link
                        href="/services"
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                      >
                        View Services
                      </Link>
                    </div>
                    
                    {/* Search Suggestions */}
                    <div className="mt-8 text-left max-w-md mx-auto">
                      <p className="text-sm font-medium text-gray-700 mb-2">Try searching for:</p>
                      <div className="flex flex-wrap gap-2">
                        {['health tips', 'primary care', 'cardiology', 'emergency', 'preventive care'].map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              setSearchQuery(suggestion)
                              router.push(`/search?q=${encodeURIComponent(suggestion)}`)
                            }}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <FaSearch className="text-4xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Search our content</h3>
                    <p className="text-gray-600 mb-6">
                      Enter a search term above to find articles, services, and team member information.
                    </p>
                    <div className="text-left max-w-md mx-auto">
                      <p className="text-sm font-medium text-gray-700 mb-2">Popular searches:</p>
                      <div className="flex flex-wrap gap-2">
                        {['health tips', 'primary care', 'emergency care', 'cardiology', 'preventive medicine'].map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              setSearchQuery(suggestion)
                              router.push(`/search?q=${encodeURIComponent(suggestion)}`)
                            }}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>

        <ScrollToTop />
      </div>
    </>
  )
}

// Get data at build time
export async function getStaticProps() {
  const userData = getUserData()

  return {
    props: {
      userData
    }
  }
}