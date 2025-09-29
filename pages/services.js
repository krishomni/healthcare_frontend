import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaTooth, FaUserMd, FaHeartbeat, FaMicroscope, FaShieldAlt, FaProcedures,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheck, FaExclamationCircle
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import { api } from '../lib/api';

export default function Services() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for handling errors
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state on new load attempt
      const data = await api.getUserData();

      // **IMPROVEMENT: Validate the data received from the API**
      if (data && Array.isArray(data.services)) {
        console.log("Successfully received user data:", data);
        setUserData(data);
      } else {
        // This error will trigger if the API response is not structured correctly
        console.error("Received invalid data structure from API:", data);
        throw new Error("The data received from the server was not in the correct format.");
      }
    } catch (err) {
      console.error("Failed to load services data:", err);
      setError("We couldn't load our services at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (iconName) => {
    const icons = {
      'tooth': FaTooth,
      'user-md': FaUserMd,
      'heartbeat': FaHeartbeat,
      'microscope': FaMicroscope,
      'shield-alt': FaShieldAlt,
      'procedures': FaProcedures,
    };
    return icons[iconName] || FaUserMd;
  };

  const handleScheduleConsultation = (service) => {
    // This function remains the same
    const action = userData?.ui?.services?.consultationAction || 'phone';
    switch (action) {
      case 'phone':
        window.location.href = `tel:${userData.contact?.phone}`;
        break;
      case 'contact':
        window.location.href = '/contact';
        break;
      case 'email':
        window.location.href = `mailto:${userData.contact?.email}`;
        break;
      case 'custom':
        const customLink = userData.ui?.services?.customLink;
        if (customLink) {
          window.open(customLink, customLink.startsWith('http') ? '_blank' : '_self');
        }
        break;
      default:
        window.location.href = `tel:${userData.contact?.phone}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Our Services - {userData?.practice?.name || 'Healthcare Practice'}</title>
        <meta name="description" content="Comprehensive healthcare services offered by our experienced medical team." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Our Medical Services
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive healthcare services delivered by experienced professionals using state-of-the-art technology.
            </motion.p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* **IMPROVEMENT: Display error message if loading fails** */}
            {error ? (
              <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg">
                <FaExclamationCircle className="mx-auto text-4xl text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-red-800 mb-2">Something went wrong</h3>
                <p className="text-red-600">{error}</p>
              </div>
            ) : userData?.services?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData.services.map((service, index) => {
                  const Icon = getServiceIcon(service.icon);
                  return (
                    <motion.div 
                      key={service.id || index} 
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Icon className="text-blue-600 text-6xl opacity-30" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-blue-600 rounded-lg w-12 h-12 flex items-center justify-center shadow-lg">
                          <Icon className="text-white text-xl" />
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        
                        {(service.price || service.duration) && (
                          <div className="flex items-center space-x-4 text-sm text-blue-700 mb-4">
                            {service.price && <span className="font-semibold">{service.price}</span>}
                            {service.duration && <span>{service.duration}</span>}
                          </div>
                        )}

                        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                        
                        {service.features?.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                            <ul className="space-y-2">
                              {service.features.slice(0, 3).map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start">
                                  <FaCheck className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                  <span className="text-gray-600 text-sm">{feature}</span>
                                </li>
                              ))}
                              {service.features.length > 3 && (
                                <li className="text-blue-600 text-sm font-medium">
                                  +{service.features.length - 3} more features
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="space-y-3">
                          <button
                            onClick={() => handleScheduleConsultation(service)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                          >
                            <FaPhone className="mr-2" />
                            {userData.ui?.services?.consultationButtonText || 'Schedule Consultation'}
                          </button>
                          
                          <button
                            onClick={() => setSelectedService(service)}
                            className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-colors"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No services are currently available.</p>
                <Link href="/admin/login" className="text-blue-600 hover:text-blue-700">
                  Add services through the admin panel →
                </Link>
              </div>
            )}
          </div>
        </section>

        {userData && (
          <section className="bg-blue-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Contact us today to schedule your consultation and take the first step towards better health.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`tel:${userData.contact?.phone}`}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center"
                >
                  <FaPhone className="mr-2" />
                  Call {userData.contact?.phone}
                </a>
                
                <a
                  href={`mailto:${userData.contact?.email}`}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center"
                >
                  <FaEnvelope className="mr-2" />
                  Email Us
                </a>
              </div>

              {userData.contact?.address && (
                <div className="mt-8 flex items-center justify-center text-blue-100">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>
                    {userData.contact.address.street}, {userData.contact.address.city}, {userData.contact.address.state}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedService(null)}>
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {selectedService.image && (
                <div className="h-64 bg-gray-200">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">{selectedService.title}</h3>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{selectedService.description}</p>
                
                {selectedService.features?.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Service Includes:</h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => handleScheduleConsultation(selectedService)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    {userData.ui?.services?.consultationButtonText || 'Schedule Consultation'}
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <ScrollToTop />
      </div>
    </>
  );
}