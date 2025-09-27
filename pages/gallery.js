import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaImage, FaExpand } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

export default function Gallery() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      console.log('🔄 Loading gallery data...')
      const response = await fetch('/api/user-data')
      const data = await response.json()
      
      console.log('📦 Raw data received:', data)
      console.log('🖼️ Gallery data:', data.gallery)
      console.log('🏢 Facility images:', data.gallery?.facilityImages)
      console.log('📊 Before/After cases:', data.gallery?.beforeAfterCases)
      
      setUserData(data)
    } catch (error) {
      console.error('❌ Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!userData) {
    return <div>Error loading data</div>
  }

  const gallery = userData.gallery || { facilityImages: [], beforeAfterCases: [] }
  const categories = ['All', 'Facility', 'Results']

  console.log('🎯 Current gallery state:', gallery)
  console.log('🎯 Facility images count:', gallery.facilityImages?.length || 0)
  console.log('🎯 Before/After count:', gallery.beforeAfterCases?.length || 0)

  const filteredFacilityImages = selectedCategory === 'All' || selectedCategory === 'Facility' 
    ? gallery.facilityImages || [] 
    : []

  const filteredBeforeAfter = selectedCategory === 'All' || selectedCategory === 'Results'
    ? gallery.beforeAfterCases || []
    : []

  const hasContent = (gallery.facilityImages && gallery.facilityImages.length > 0) || 
                     (gallery.beforeAfterCases && gallery.beforeAfterCases.length > 0)

  console.log('✅ Has content:', hasContent)
  console.log('✅ Filtered facility images:', filteredFacilityImages.length)
  console.log('✅ Filtered before/after:', filteredBeforeAfter.length)

  return (
    <>
      <Head>
        <title>Gallery - {userData.practice?.name}</title>
        <meta name="description" content="Take a virtual tour of our modern medical facility" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        
        {/* Debug Info - Remove in production */}
        <div className="fixed top-20 right-4 bg-black text-white p-3 text-xs z-50 rounded-lg max-w-xs">
          <div><strong>Debug Info:</strong></div>
          <div>Facility Images: {gallery.facilityImages?.length || 0}</div>
          <div>Before/After: {gallery.beforeAfterCases?.length || 0}</div>
          <div>Has Content: {hasContent ? 'YES' : 'NO'}</div>
          <div>Selected: {selectedCategory}</div>
          <button 
            onClick={loadData}
            className="bg-blue-600 px-2 py-1 rounded mt-2 w-full"
          >
            Refresh Data
          </button>
        </div>

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
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Facility & Results</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Take a virtual tour of our modern medical facility
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Category Filter */}
        <motion.section 
          className="bg-white py-8 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
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
        </motion.section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {!hasContent && (
              <div className="text-center py-20">
                <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Gallery Items Yet</h2>
                <p className="text-gray-600 mb-6">Gallery images will appear here once added through the admin panel.</p>
                <Link
                  href="/admin/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                >
                  Go to Admin Panel
                </Link>
              </div>
            )}

            {/* Facility Images Grid */}
            {filteredFacilityImages.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Facility</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredFacilityImages.map((image, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedImage({ type: 'facility', data: image })}
                    >
                      <div className="h-64 bg-gray-200 relative overflow-hidden">
                        {image.url ? (
                          <img 
                            src={image.url} 
                            alt={image.caption} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaImage className="text-4xl text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2">
                          <FaExpand className="text-blue-600 text-lg" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{image.caption}</h3>
                        <p className="text-gray-600">{image.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Before/After Cases */}
            {filteredBeforeAfter.length > 0 && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Patient Success Stories</h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg max-w-4xl mx-auto text-left">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> Results may vary. All images shared with patient consent.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBeforeAfter.map((case_, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage({ type: 'beforeafter', data: case_ })}
                    >
                      <div className="grid grid-cols-2 h-48">
                        <div className="bg-gray-100 flex items-center justify-center">
                          {case_.beforeImage ? (
                            <img src={case_.beforeImage} alt="Before" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center text-gray-400">
                              <FaImage className="text-2xl mb-2 mx-auto" />
                              <p className="text-sm">Before</p>
                            </div>
                          )}
                        </div>
                        <div className="bg-green-50 flex items-center justify-center">
                          {case_.afterImage ? (
                            <img src={case_.afterImage} alt="After" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center text-green-400">
                              <FaImage className="text-2xl mb-2 mx-auto" />
                              <p className="text-sm">After</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 mb-2">{case_.title}</h3>
                        <p className="text-blue-600 font-medium text-sm mb-2">{case_.treatment}</p>
                        <p className="text-gray-500 text-sm mb-2">{case_.duration}</p>
                        <p className="text-gray-600">{case_.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.type === 'facility' ? (
                <>
                  <div className="h-96 bg-gray-200">
                    {selectedImage.data.url && (
                      <img 
                        src={selectedImage.data.url} 
                        alt={selectedImage.data.caption}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedImage.data.caption}</h3>
                    <p className="text-gray-600 mb-4">{selectedImage.data.description}</p>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 h-96">
                    <div className="bg-gray-100">
                      {selectedImage.data.beforeImage && (
                        <img src={selectedImage.data.beforeImage} alt="Before" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="bg-green-50">
                      {selectedImage.data.afterImage && (
                        <img src={selectedImage.data.afterImage} alt="After" className="w-full h-full object-cover" />
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.data.title}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{selectedImage.data.treatment}</p>
                    <p className="text-gray-500 mb-4">{selectedImage.data.duration}</p>
                    <p className="text-gray-600 mb-6">{selectedImage.data.description}</p>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <ScrollToTop />
      </div>
    </>
  )
}