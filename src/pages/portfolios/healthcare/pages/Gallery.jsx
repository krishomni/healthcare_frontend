import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaImage, FaExpand, FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import { api } from '../lib/api';

export default function Gallery() {
  const { practiceId } = useParams(); // ✅ Get practiceId from URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    document.title = 'Gallery - Healthcare';
    if (practiceId) {
      loadData();
    }
  }, [practiceId]);

  const loadData = async () => {
    try {
      const data = await api.getPracticeData(practiceId); // ✅ Fixed
      setUserData(data);
    } catch (error) {
      console.error('Error loading gallery data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading gallery...</p>
      </div>
    );
  }

  const facilityImages = userData?.gallery?.facilityImages || [];
  const beforeAfterCases = userData?.gallery?.beforeAfterCases || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userData={userData} practiceId={practiceId} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Gallery</h1>
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto">
            Explore our facilities and see our amazing results
          </p>
        </div>
      </section>

      {/* Facility Images */}
      {facilityImages.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Facilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilityImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setLightboxImage(image.url)}
                >
                  <img 
                    src={image.url} 
                    alt={image.caption || 'Facility'}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <FaExpand className="text-white opacity-0 group-hover:opacity-100 text-3xl transition-opacity" />
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <p className="text-white font-semibold">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Before/After Cases */}
      {beforeAfterCases.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Before & After</h2>
            <div className="space-y-12">
              {beforeAfterCases.map((caseItem, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{caseItem.title}</h3>
                  {caseItem.treatment && (
                    <p className="text-gray-600 mb-2">
                      <strong>Treatment:</strong> {caseItem.treatment}
                    </p>
                  )}
                  {caseItem.duration && (
                    <p className="text-gray-600 mb-4">
                      <strong>Duration:</strong> {caseItem.duration}
                    </p>
                  )}
                  {caseItem.description && (
                    <p className="text-gray-700 mb-6">{caseItem.description}</p>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-center font-semibold text-gray-900 mb-2">Before</p>
                      <div className="rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={() => setLightboxImage(caseItem.beforeImage)}>
                        <img 
                          src={caseItem.beforeImage} 
                          alt="Before"
                          className="w-full h-64 object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-center font-semibold text-gray-900 mb-2">After</p>
                      <div className="rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={() => setLightboxImage(caseItem.afterImage)}>
                        <img 
                          src={caseItem.afterImage} 
                          alt="After"
                          className="w-full h-64 object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {facilityImages.length === 0 && beforeAfterCases.length === 0 && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <FaImage className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Gallery Images Yet</h2>
            <p className="text-gray-600 mb-8">Check back soon for photos of our facilities and treatment results.</p>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setLightboxImage(null)}
          >
            <FaTimes />
          </button>
          <img 
            src={lightboxImage} 
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <ScrollToTop />
    </div>
  );
}