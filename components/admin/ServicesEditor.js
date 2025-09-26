import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'

export default function ServicesEditor({ services, onUpdate }) {
  const [editingService, setEditingService] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  const addService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: '',
      description: '',
      icon: 'user-md',
      price: '',
      duration: '',
      features: []
    }
    onUpdate([...services, newService])
    setEditingService(services.length)
    setIsAdding(true)
  }

  const updateService = (index, field, value) => {
    const updatedServices = [...services]
    updatedServices[index] = { ...updatedServices[index], [field]: value }
    onUpdate(updatedServices)
  }

  const deleteService = (index) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter((_, i) => i !== index)
      onUpdate(updatedServices)
    }
  }

  const addFeature = (serviceIndex) => {
    const updatedServices = [...services]
    if (!updatedServices[serviceIndex].features) {
      updatedServices[serviceIndex].features = []
    }
    updatedServices[serviceIndex].features.push('')
    onUpdate(updatedServices)
  }

  const updateFeature = (serviceIndex, featureIndex, value) => {
    const updatedServices = [...services]
    updatedServices[serviceIndex].features[featureIndex] = value
    onUpdate(updatedServices)
  }

  const removeFeature = (serviceIndex, featureIndex) => {
    const updatedServices = [...services]
    updatedServices[serviceIndex].features.splice(featureIndex, 1)
    onUpdate(updatedServices)
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
            <button
              onClick={addService}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={service.id || index} className="border border-gray-200 rounded-lg p-6">
                {editingService === index ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
                        <input
                          type="text"
                          value={service.title || ''}
                          onChange={(e) => updateService(index, 'title', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter service title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                        <input
                          type="text"
                          value={service.price || ''}
                          onChange={(e) => updateService(index, 'price', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., $150"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                      <textarea
                        value={service.description || ''}
                        onChange={(e) => updateService(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe the service"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        value={service.duration || ''}
                        onChange={(e) => updateService(index, 'duration', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 45 minutes"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      {service.features && service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter feature"
                          />
                          <button
                            onClick={() => removeFeature(index, featureIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addFeature(index)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + Add Feature
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingService(null)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <FaSave className="mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          if (isAdding) {
                            deleteService(index)
                            setIsAdding(false)
                          }
                          setEditingService(null)
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <FaTimes className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          {service.price && <span>{service.price}</span>}
                          {service.duration && <span>{service.duration}</span>}
                          <span>{service.features?.length || 0} features</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingService(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteService(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}