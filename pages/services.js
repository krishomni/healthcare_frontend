import Head from 'next/head'
import { motion } from 'framer-motion'
import { FaTooth, FaUserMd, FaHeartbeat, FaMicroscope, FaShieldAlt, FaProcedures, FaCheck } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import { getUserData, getServices } from '../lib/data'

export default function Services({ userData, services }) {
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

  return (
    <>
      <Head>
        <title>Our Services - {userData.practice.name}</title>
        <meta name="description" content="Comprehensive healthcare services delivered by experienced professionals using the latest medical technology and techniques." />
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
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Medical Services</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Comprehensive healthcare services delivered by experienced professionals using the latest medical technology
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = getServiceIcon(service.icon)
                return (
                  <motion.div 
                    key={service.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="bg-blue-50 rounded-lg w-16 h-16 flex items-center justify-center">
                          <Icon className="text-blue-600 text-2xl" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                          <div className="text-gray-500 text-sm">{service.duration}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-gray-600">
                              <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                        Schedule Consultation
                      </button>
                    </div>
                  </motion.div>
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

// Get data at build time
export async function getStaticProps() {
  const userData = getUserData()
  const services = getServices()

  return {
    props: {
      userData,
      services
    }
  }
}