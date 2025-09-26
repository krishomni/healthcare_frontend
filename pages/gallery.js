import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaClinicMedical, FaXRay, FaHospital, FaBed, FaMicroscope, FaProcedures, FaImage, FaExpand } from 'react-icons/fa'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import siteConfig from '../config/site-config'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const galleryItems = [
    { id: 1, icon: FaClinicMedical, title: 'Reception Area', category: 'Facility', gradient: 'from-blue-100 to-blue-200', description: 'Welcoming and comfortable reception area with modern amenities.' },
    { id: 2, icon: FaProcedures, title: 'Treatment Room', category: 'Facility', gradient: 'from-green-100 to-green-200', description: 'State-of-the-art treatment rooms equipped with latest medical technology.' },
    { id: 3, icon: FaXRay, title: 'Diagnostic Equipment', category: 'Equipment', gradient: 'from-purple-100 to-purple-200', description: 'Advanced diagnostic imaging equipment for accurate assessments.' },
    { id: 4, icon: FaHospital, title: 'Surgical Suite', category: 'Facility', gradient: 'from-yellow-100 to-yellow-200', description: 'Modern surgical suite with advanced monitoring and safety systems.' },
    { id: 5, icon: FaBed, title: 'Recovery Area', category: 'Facility', gradient: 'from-red-100 to-red-200', description: 'Comfortable recovery rooms for post-treatment care and monitoring.' },
    { id: 6, icon: FaMicroscope, title: 'Laboratory', category: 'Equipment', gradient: 'from-indigo-100 to-indigo-200', description: 'Fully equipped laboratory for comprehensive testing and analysis.' },
    { id: 7, icon: FaClinicMedical, title: 'Consultation Room', category: 'Facility', gradient: 'from-pink-100 to-pink-200', description: 'Private consultation rooms for doctor-patient discussions.' },
    { id: 8, icon: FaProcedures, title: 'Emergency Bay', category: 'Facility', gradient: 'from-gray-100 to-gray-200', description: 'Emergency treatment bay for urgent medical care.' },
    { id: 9, icon: FaXRay, title: 'MRI Machine', category: 'Equipment', gradient: 'from-teal-100 to-teal-200', description: '3T MRI scanner for detailed soft tissue imaging.' }
  ]

  const beforeAfterCases = [
    {
      id: 1,
      title: 'Cardiac Recovery Case',
      description: 'Patient showed significant improvement after minimally invasive cardiac procedure.',
      timeframe: '3 months post-surgery',
      category: 'Cardiology'
    },
    {
      id: 2,
      title: 'Orthopedic Rehabilitation',
      description: 'Complete mobility restoration following joint replacement surgery.',
      timeframe: '6 months post-surgery',
      category: 'Orthopedics'
    },
    {
      id: 3,
      title: 'Preventive Care Success',
      description: 'Early detection and successful treatment through regular screening.',
      timeframe: '1 year follow-up',
      category: 'Preventive Care'
    }
  ]

  const categories = ['All', 'Facility', 'Equipment', 'Results']

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <>
      <Head>
        <title>Gallery - {siteConfig.practice.name}</title>
        <meta name="description" content="Take a virtual tour of our modern medical facility and see our state-of-the-art equipment and comfortable patient areas." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
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
                Take a virtual tour of our modern medical facility and see the advanced technology we use to provide exceptional care
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

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {filteredItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div 
                    key={item.id}
                    className={`bg-gradient-to-br ${item.gradient} rounded-xl h-64 cursor-pointer shadow-lg relative overflow-hidden group`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center text-blue-600 opacity-60 group-hover:opacity-100 transition-opacity">
                        <Icon className="text-4xl mb-4 mx-auto" />
                        <p className="font-semibold">{item.title}</p>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaExpand className="text-white text-lg" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Before/After Results */}
        {selectedCategory === 'All' || selectedCategory === 'Results' ? (
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Patient Success Stories</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg max-w-4xl mx-auto">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Important:</strong> Results may vary. Individual outcomes depend on various factors including patient health, adherence to treatment plans, and other medical conditions. All images and cases are shared with explicit patient consent.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {beforeAfterCases.map((case_, index) => (
                  <motion.div 
                    key={case_.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="grid grid-cols-2 h-48">
                      <div className="bg-gray-100 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <FaImage className="text-2xl mb-2 mx-auto" />
                          <p className="text-sm">Before</p>
                        </div>
                      </div>
                      <div className="bg-green-50 flex items-center justify-center">
                        <div className="text-center text-green-400">
                          <FaImage className="text-2xl mb-2 mx-auto" />
                          <p className="text-sm">After</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          {case_.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{case_.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{case_.timeframe}</p>
                      <p className="text-gray-600">{case_.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="bg-white rounded-xl max-w-2xl w-full max-h-full overflow-auto"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-64 bg-gradient-to-br ${selectedImage.gradient} flex items-center justify-center`}>
                <selectedImage.icon className="text-6xl text-blue-600 opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedImage.title}</h3>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {selectedImage.category}
                  </span>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <ScrollToTop />
      </div>
    </>
  )
}
