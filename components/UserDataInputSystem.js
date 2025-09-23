import React, { useState, useEffect } from 'react';

const UserDataInputSystem = () => {
  const [activeSection, setActiveSection] = useState('practice');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Practice Information State
  const [practiceData, setPracticeData] = useState({
    name: '',
    tagline: '',
    description: '',
    established: '',
    licenseNumber: '',
    contact: {
      phone: '',
      whatsapp: '',
      email: '',
      emergencyPhone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      }
    },
    hours: {
      weekdays: '',
      saturday: '',
      sunday: '',
      emergency: ''
    },
    stats: {
      yearsExperience: '',
      patientsServed: '',
      successRate: '',
      doctorsCount: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    seo: {
      siteTitle: '',
      metaDescription: '',
      keywords: ''
    }
  });

  // Services State
  const [services, setServices] = useState([
    {
      id: Date.now(),
      title: '',
      description: '',
      icon: 'user-md',
      price: '',
      duration: '',
      features: [''],
      isActive: true
    }
  ]);

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    {
      id: Date.now(),
      name: '',
      title: '',
      specialty: '',
      credentials: [''],
      bio: '',
      specialties: [''],
      languages: [''],
      availability: '',
      phone: '',
      email: '',
      experience: '',
      isActive: true
    }
  ]);

  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState([
    {
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [''],
      featured: false,
      published: true
    }
  ]);

  // Load existing data on component mount
  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/practice');
      if (response.ok) {
        const data = await response.json();
        // Only load if the data doesn't contain placeholder brackets
        if (data.name && !data.name.includes('[')) {
          setPracticeData(data);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section) => {
    setLoading(true);
    setError('');
    setSaved(false);

    try {
      let response;
      
      switch (section) {
        case 'practice':
          response = await fetch('/api/practice', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(practiceData)
          });
          break;
        case 'services':
          // Save all services
          for (const service of services) {
            if (service.title && service.description) {
              await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(service)
              });
            }
          }
          response = { ok: true };
          break;
        case 'team':
          // Save all team members
          for (const member of teamMembers) {
            if (member.name && member.title) {
              await fetch('/api/team', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member)
              });
            }
          }
          response = { ok: true };
          break;
        case 'blog':
          // Save all blog posts
          for (const post of blogPosts) {
            if (post.title && post.content) {
              await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
              });
            }
          }
          response = { ok: true };
          break;
      }

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError('Failed to save data');
      }
    } catch (error) {
      setError('Error saving data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addService = () => {
    setServices([...services, {
      id: Date.now(),
      title: '',
      description: '',
      icon: 'user-md',
      price: '',
      duration: '',
      features: [''],
      isActive: true
    }]);
  };

  const removeService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addFeatureToService = (serviceId) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, features: [...s.features, ''] } : s
    ));
  };

  const updateServiceFeature = (serviceId, featureIndex, value) => {
    setServices(services.map(s => {
      if (s.id === serviceId) {
        const newFeatures = [...s.features];
        newFeatures[featureIndex] = value;
        return { ...s, features: newFeatures };
      }
      return s;
    }));
  };

  const removeServiceFeature = (serviceId, featureIndex) => {
    setServices(services.map(s => {
      if (s.id === serviceId) {
        return { ...s, features: s.features.filter((_, i) => i !== featureIndex) };
      }
      return s;
    }));
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, {
      id: Date.now(),
      name: '',
      title: '',
      specialty: '',
      credentials: [''],
      bio: '',
      specialties: [''],
      languages: [''],
      availability: '',
      phone: '',
      email: '',
      experience: '',
      isActive: true
    }]);
  };

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const updateTeamMember = (id, field, value) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addArrayField = (memberId, field) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === memberId ? { ...m, [field]: [...m[field], ''] } : m
    ));
  };

  const updateArrayField = (memberId, field, index, value) => {
    setTeamMembers(teamMembers.map(m => {
      if (m.id === memberId) {
        const newArray = [...m[field]];
        newArray[index] = value;
        return { ...m, [field]: newArray };
      }
      return m;
    }));
  };

  const removeArrayField = (memberId, field, index) => {
    setTeamMembers(teamMembers.map(m => {
      if (m.id === memberId) {
        return { ...m, [field]: m[field].filter((_, i) => i !== index) };
      }
      return m;
    }));
  };

  const renderPracticeForm = () => (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2 text-blue-600">🏥</span>
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name *</label>
            <input
              type="text"
              value={practiceData.name}
              onChange={(e) => setPracticeData({...practiceData, name: e.target.value})}
              placeholder="e.g., Elite Medical Center"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('services')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? <span className="animate-spin">⏳</span> : <span>💾</span>}
          <span>Save Services</span>
        </button>
      </div>
    </div>
  );

  const renderTeamForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        <button
          onClick={addTeamMember}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add Team Member</span>
        </button>
      </div>

      {teamMembers.map((member, index) => (
        <div key={member.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Member #{index + 1}</h3>
            {teamMembers.length > 1 && (
              <button
                onClick={() => removeTeamMember(member.id)}
                className="text-red-600 hover:text-red-700"
              >
                🗑️
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                placeholder="e.g., Dr. Sarah Johnson"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title *</label>
              <input
                type="text"
                value={member.title}
                onChange={(e) => updateTeamMember(member.id, 'title', e.target.value)}
                placeholder="e.g., Chief Medical Officer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Specialty *</label>
              <input
                type="text"
                value={member.specialty}
                onChange={(e) => updateTeamMember(member.id, 'specialty', e.target.value)}
                placeholder="e.g., Internal Medicine & Cardiology"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input
                type="text"
                value={member.experience}
                onChange={(e) => updateTeamMember(member.id, 'experience', e.target.value)}
                placeholder="e.g., 15"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio *</label>
            <textarea
              value={member.bio}
              onChange={(e) => updateTeamMember(member.id, 'bio', e.target.value)}
              placeholder="Professional background, education, experience, and achievements..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input
                type="tel"
                value={member.phone}
                onChange={(e) => updateTeamMember(member.id, 'phone', e.target.value)}
                placeholder="e.g., +1 (555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Email</label>
              <input
                type="email"
                value={member.email}
                onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                placeholder="e.g., doctor@yourpractice.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <input
              type="text"
              value={member.availability}
              onChange={(e) => updateTeamMember(member.id, 'availability', e.target.value)}
              placeholder="e.g., Mon-Fri: 8:00 AM - 5:00 PM"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dynamic Arrays */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credentials</label>
              {member.credentials.map((credential, credIndex) => (
                <div key={credIndex} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => updateArrayField(member.id, 'credentials', credIndex, e.target.value)}
                    placeholder="e.g., MD, FACP"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(member.id, 'credentials', credIndex)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField(member.id, 'credentials')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Credential
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
              {member.specialties.map((specialty, specIndex) => (
                <div key={specIndex} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => updateArrayField(member.id, 'specialties', specIndex, e.target.value)}
                    placeholder="e.g., Preventive Cardiology"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(member.id, 'specialties', specIndex)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField(member.id, 'specialties')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Specialty
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
              {member.languages.map((language, langIndex) => (
                <div key={langIndex} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => updateArrayField(member.id, 'languages', langIndex, e.target.value)}
                    placeholder="e.g., English, Spanish"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(member.id, 'languages', langIndex)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField(member.id, 'languages')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Language
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`team-active-${member.id}`}
              checked={member.isActive}
              onChange={(e) => updateTeamMember(member.id, 'isActive', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={`team-active-${member.id}`} className="text-sm font-medium text-gray-700">
              Active Team Member
            </label>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('team')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? <span className="animate-spin">⏳</span> : <span>💾</span>}
          <span>Save Team Members</span>
        </button>
      </div>
    </div>
  );

  const renderBlogForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <button
          onClick={() => setBlogPosts([...blogPosts, {
            id: Date.now(),
            title: '',
            excerpt: '',
            content: '',
            category: '',
            tags: [''],
            featured: false,
            published: true
          }])}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add Blog Post</span>
        </button>
      </div>

      {blogPosts.map((post, index) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Blog Post #{index + 1}</h3>
            {blogPosts.length > 1 && (
              <button
                onClick={() => setBlogPosts(blogPosts.filter(p => p.id !== post.id))}
                className="text-red-600 hover:text-red-700"
              >
                🗑️
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Title *</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setBlogPosts(blogPosts.map(p => 
                  p.id === post.id ? { ...p, title: e.target.value } : p
                ))}
                placeholder="e.g., 10 Essential Health Tips for 2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={post.category}
                onChange={(e) => setBlogPosts(blogPosts.map(p => 
                  p.id === post.id ? { ...p, category: e.target.value } : p
                ))}
                placeholder="e.g., Preventive Care"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
            <textarea
              value={post.excerpt}
              onChange={(e) => setBlogPosts(blogPosts.map(p => 
                p.id === post.id ? { ...p, excerpt: e.target.value } : p
              ))}
              placeholder="Brief summary of the blog post..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              value={post.content}
              onChange={(e) => setBlogPosts(blogPosts.map(p => 
                p.id === post.id ? { ...p, content: e.target.value } : p
              ))}
              placeholder="Full blog post content (you can use HTML tags)..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            {post.tags.map((tag, tagIndex) => (
              <div key={tagIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setBlogPosts(blogPosts.map(p => {
                    if (p.id === post.id) {
                      const newTags = [...p.tags];
                      newTags[tagIndex] = e.target.value;
                      return { ...p, tags: newTags };
                    }
                    return p;
                  }))}
                  placeholder="e.g., health, prevention, wellness"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setBlogPosts(blogPosts.map(p => {
                    if (p.id === post.id) {
                      return { ...p, tags: p.tags.filter((_, i) => i !== tagIndex) };
                    }
                    return p;
                  }))}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setBlogPosts(blogPosts.map(p => 
                p.id === post.id ? { ...p, tags: [...p.tags, ''] } : p
              ))}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Tag
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`featured-${post.id}`}
                checked={post.featured}
                onChange={(e) => setBlogPosts(blogPosts.map(p => 
                  p.id === post.id ? { ...p, featured: e.target.checked } : p
                ))}
                className="mr-2"
              />
              <label htmlFor={`featured-${post.id}`} className="text-sm font-medium text-gray-700">
                Featured Post
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`published-${post.id}`}
                checked={post.published}
                onChange={(e) => setBlogPosts(blogPosts.map(p => 
                  p.id === post.id ? { ...p, published: e.target.checked } : p
                ))}
                className="mr-2"
              />
              <label htmlFor={`published-${post.id}`} className="text-sm font-medium text-gray-700">
                Published
              </label>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('blog')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? <span className="animate-spin">⏳</span> : <span>💾</span>}
          <span>Save Blog Posts</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Your Healthcare Website</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fill in your practice information to create a professional healthcare website. 
            All fields with placeholders should be replaced with your actual information.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="flex flex-wrap border-b">
            <button
              onClick={() => setActiveSection('practice')}
              className={`px-6 py-3 font-medium text-sm ${
                activeSection === 'practice'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="inline mr-2">🏥</span>
              Practice Info
            </button>
            <button
              onClick={() => setActiveSection('services')}
              className={`px-6 py-3 font-medium text-sm ${
                activeSection === 'services'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="inline mr-2">🩺</span>
              Services
            </button>
            <button
              onClick={() => setActiveSection('team')}
              className={`px-6 py-3 font-medium text-sm ${
                activeSection === 'team'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="inline mr-2">👨‍⚕️</span>
              Team
            </button>
            <button
              onClick={() => setActiveSection('blog')}
              className={`px-6 py-3 font-medium text-sm ${
                activeSection === 'blog'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="inline mr-2">📝</span>
              Blog
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {saved && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <span className="text-green-400 mr-3 mt-1">✅</span>
              <p className="text-green-700">Data saved successfully!</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <span className="text-red-400 mr-3 mt-1">❌</span>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Content Sections */}
        {activeSection === 'practice' && renderPracticeForm()}
        {activeSection === 'services' && renderServicesForm()}
        {activeSection === 'team' && renderTeamForm()}
        {activeSection === 'blog' && renderBlogForm()}

        {/* Help Text */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Tips:</strong> Fill out as much information as possible to create a comprehensive website. 
                You can always come back and update any section later. Fields marked with * are required for that section to be saved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataInputSystem;
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline *</label>
            <input
              type="text"
              value={practiceData.tagline}
              onChange={(e) => setPracticeData({...practiceData, tagline: e.target.value})}
              placeholder="e.g., Your Health, Our Priority"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Practice Description *</label>
          <textarea
            value={practiceData.description}
            onChange={(e) => setPracticeData({...practiceData, description: e.target.value})}
            placeholder="Describe your healthcare practice, specialties, and what makes you unique..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year Established</label>
            <input
              type="text"
              value={practiceData.established}
              onChange={(e) => setPracticeData({...practiceData, established: e.target.value})}
              placeholder="e.g., 2008"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              value={practiceData.licenseNumber}
              onChange={(e) => setPracticeData({...practiceData, licenseNumber: e.target.value})}
              placeholder="e.g., MD12345"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2 text-blue-600">📞</span>
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Phone *</label>
            <input
              type="tel"
              value={practiceData.contact.phone}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                contact: {...practiceData.contact, phone: e.target.value}
              })}
              placeholder="e.g., +1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
            <input
              type="tel"
              value={practiceData.contact.whatsapp}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                contact: {...practiceData.contact, whatsapp: e.target.value}
              })}
              placeholder="e.g., +1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={practiceData.contact.email}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                contact: {...practiceData.contact, email: e.target.value}
              })}
              placeholder="e.g., info@yourpractice.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
            <input
              type="tel"
              value={practiceData.contact.emergencyPhone}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                contact: {...practiceData.contact, emergencyPhone: e.target.value}
              })}
              placeholder="e.g., +1 (555) 999-0000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Practice Address *</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={practiceData.contact.address.street}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, street: e.target.value}
                  }
                })}
                placeholder="e.g., 123 Healthcare Blvd, Suite 200"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={practiceData.contact.address.city}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, city: e.target.value}
                  }
                })}
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={practiceData.contact.address.state}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, state: e.target.value}
                  }
                })}
                placeholder="State/Province"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={practiceData.contact.address.zip}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, zip: e.target.value}
                  }
                })}
                placeholder="ZIP/Postal Code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={practiceData.contact.address.country}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, country: e.target.value}
                  }
                })}
                placeholder="Country"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hours */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2 text-blue-600">🕐</span>
          Operating Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekdays</label>
            <input
              type="text"
              value={practiceData.hours.weekdays}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                hours: {...practiceData.hours, weekdays: e.target.value}
              })}
              placeholder="e.g., Mon-Fri: 8:00 AM - 6:00 PM"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Saturday</label>
            <input
              type="text"
              value={practiceData.hours.saturday}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                hours: {...practiceData.hours, saturday: e.target.value}
              })}
              placeholder="e.g., Sat: 9:00 AM - 2:00 PM"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sunday</label>
            <input
              type="text"
              value={practiceData.hours.sunday}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                hours: {...practiceData.hours, sunday: e.target.value}
              })}
              placeholder="e.g., Sun: Closed"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Hours</label>
            <input
              type="text"
              value={practiceData.hours.emergency}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                hours: {...practiceData.hours, emergency: e.target.value}
              })}
              placeholder="e.g., 24/7 Emergency Services Available"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
            <input
              type="text"
              value={practiceData.stats.yearsExperience}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                stats: {...practiceData.stats, yearsExperience: e.target.value}
              })}
              placeholder="e.g., 15"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patients Served</label>
            <input
              type="text"
              value={practiceData.stats.patientsServed}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                stats: {...practiceData.stats, patientsServed: e.target.value}
              })}
              placeholder="e.g., 5,000+"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Success Rate %</label>
            <input
              type="text"
              value={practiceData.stats.successRate}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                stats: {...practiceData.stats, successRate: e.target.value}
              })}
              placeholder="e.g., 98"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Doctors</label>
            <input
              type="text"
              value={practiceData.stats.doctorsCount}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                stats: {...practiceData.stats, doctorsCount: e.target.value}
              })}
              placeholder="e.g., 8"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('practice')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? <span className="animate-spin">⏳</span> : <span>💾</span>}
          <span>Save Practice Information</span>
        </button>
      </div>
    </div>
  );

  const renderServicesForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
        <button
          onClick={addService}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Add Service</span>
        </button>
      </div>

      {services.map((service, index) => (
        <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Service #{index + 1}</h3>
            {services.length > 1 && (
              <button
                onClick={() => removeService(service.id)}
                className="text-red-600 hover:text-red-700"
              >
                🗑️
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => updateService(service.id, 'title', e.target.value)}
                placeholder="e.g., Primary Care"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <select
                value={service.icon}
                onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user-md">Doctor</option>
                <option value="heartbeat">Heartbeat</option>
                <option value="tooth">Dental</option>
                <option value="microscope">Laboratory</option>
                <option value="shield-alt">Prevention</option>
                <option value="procedures">Surgery</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Description *</label>
            <textarea
              value={service.description}
              onChange={(e) => updateService(service.id, 'description', e.target.value)}
              placeholder="Detailed description of your service..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                value={service.price}
                onChange={(e) => updateService(service.id, 'price', e.target.value)}
                placeholder="e.g., $150"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={service.duration}
                onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                placeholder="e.g., 45 minutes"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Features</label>
            {service.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateServiceFeature(service.id, featureIndex, e.target.value)}
                  placeholder="e.g., Comprehensive health examination"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeServiceFeature(service.id, featureIndex)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addFeatureToService(service.id)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Feature
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`active-${service.id}`}
              checked={service.isActive}
              onChange={(e) => updateService(service.id, 'isActive', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={`active-${service.id}`} className="text-sm font-medium text-gray-700">
              Active Service
            </label>import React, { useState, useEffect } from 'react';
import {
  FaClinic, FaUserMd, FaStethoscope, FaBlog, FaImage,
  FaSave, FaPlus, FaTrash, FaEdit, FaEye, FaUpload,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaCheck, FaTimes, FaSpinner
} from 'react-icons/fa';

const UserDataInputSystem = () => {
  const [activeSection, setActiveSection] = useState('practice');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Practice Information State
  const [practiceData, setPracticeData] = useState({
    name: '',
    tagline: '',
    description: '',
    established: '',
    licenseNumber: '',
    contact: {
      phone: '',
      whatsapp: '',
      email: '',
      emergencyPhone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      }
    },
    hours: {
      weekdays: '',
      saturday: '',
      sunday: '',
      emergency: ''
    },
    stats: {
      yearsExperience: '',
      patientsServed: '',
      successRate: '',
      doctorsCount: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    },
    seo: {
      siteTitle: '',
      metaDescription: '',
      keywords: ''
    }
  });

  // Services State
  const [services, setServices] = useState([
    {
      id: Date.now(),
      title: '',
      description: '',
      icon: 'user-md',
      price: '',
      duration: '',
      features: [''],
      isActive: true
    }
  ]);

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    {
      id: Date.now(),
      name: '',
      title: '',
      specialty: '',
      credentials: [''],
      bio: '',
      specialties: [''],
      languages: [''],
      availability: '',
      phone: '',
      email: '',
      experience: '',
      isActive: true
    }
  ]);

  // Blog Posts State
  const [blogPosts, setBlogPosts] = useState([
    {
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [''],
      featured: false,
      published: true
    }
  ]);

  // Load existing data on component mount
  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/practice');
      if (response.ok) {
        const data = await response.json();
        // Only load if the data doesn't contain placeholder brackets
        if (data.name && !data.name.includes('[')) {
          setPracticeData(data);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section) => {
    setLoading(true);
    setError('');
    setSaved(false);

    try {
      let response;
      
      switch (section) {
        case 'practice':
          response = await fetch('/api/practice', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(practiceData)
          });
          break;
        case 'services':
          // Save all services
          for (const service of services) {
            if (service.title && service.description) {
              await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(service)
              });
            }
          }
          response = { ok: true };
          break;
        case 'team':
          // Save all team members
          for (const member of teamMembers) {
            if (member.name && member.title) {
              await fetch('/api/team', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(member)
              });
            }
          }
          response = { ok: true };
          break;
        case 'blog':
          // Save all blog posts
          for (const post of blogPosts) {
            if (post.title && post.content) {
              await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
              });
            }
          }
          response = { ok: true };
          break;
      }

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError('Failed to save data');
      }
    } catch (error) {
      setError('Error saving data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addService = () => {
    setServices([...services, {
      id: Date.now(),
      title: '',
      description: '',
      icon: 'user-md',
      price: '',
      duration: '',
      features: [''],
      isActive: true
    }]);
  };

  const removeService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id, field, value) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addFeatureToService = (serviceId) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, features: [...s.features, ''] } : s
    ));
  };

  const updateServiceFeature = (serviceId, featureIndex, value) => {
    setServices(services.map(s => {
      if (s.id === serviceId) {
        const newFeatures = [...s.features];
        newFeatures[featureIndex] = value;
        return { ...s, features: newFeatures };
      }
      return s;
    }));
  };

  const removeServiceFeature = (serviceId, featureIndex) => {
    setServices(services.map(s => {
      if (s.id === serviceId) {
        return { ...s, features: s.features.filter((_, i) => i !== featureIndex) };
      }
      return s;
    }));
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, {
      id: Date.now(),
      name: '',
      title: '',
      specialty: '',
      credentials: [''],
      bio: '',
      specialties: [''],
      languages: [''],
      availability: '',
      phone: '',
      email: '',
      experience: '',
      isActive: true
    }]);
  };

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const updateTeamMember = (id, field, value) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addArrayField = (memberId, field) => {
    setTeamMembers(teamMembers.map(m => 
      m.id === memberId ? { ...m, [field]: [...m[field], ''] } : m
    ));
  };

  const updateArrayField = (memberId, field, index, value) => {
    setTeamMembers(teamMembers.map(m => {
      if (m.id === memberId) {
        const newArray = [...m[field]];
        newArray[index] = value;
        return { ...m, [field]: newArray };
      }
      return m;
    }));
  };

  const removeArrayField = (memberId, field, index) => {
    setTeamMembers(teamMembers.map(m => {
      if (m.id === memberId) {
        return { ...m, [field]: m[field].filter((_, i) => i !== index) };
      }
      return m;
    }));
  };

  const renderPracticeForm = () => (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaClinic className="mr-2 text-blue-600" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name *</label>
            <input
              type="text"
              value={practiceData.name}
              onChange={(e) => setPracticeData({...practiceData, name: e.target.value})}
              placeholder="e.g., Elite Medical Center"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline *</label>
            <input
              type="text"
              value={practiceData.tagline}
              onChange={(e) => setPracticeData({...practiceData, tagline: e.target.value})}
              placeholder="e.g., Your Health, Our Priority"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Practice Description *</label>
          <textarea
            value={practiceData.description}
            onChange={(e) => setPracticeData({...practiceData, description: e.target.value})}
            placeholder="Describe your healthcare practice, specialties, and what makes you unique..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year Established</label>
            <input
              type="text"
              value={practiceData.established}
              onChange={(e) => setPracticeData({...practiceData, established: e.target.value})}
              placeholder="e.g., 2008"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              value={practiceData.licenseNumber}
              onChange={(e) => setPracticeData({...practiceData, licenseNumber: e.target.value})}
              placeholder="e.g., MD12345"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaPhone className="mr-2 text-blue-600" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Phone *</label>
            <input
              type="tel"
              value={practiceData.contact.phone}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                contact: {...practiceData.contact, phone: e.target.value}
              })}
              placeholder="e.g., +1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
            <input
              type="tel"
              value={practiceData.contact.whatsapp}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                contact: {...practiceData.contact, whatsapp: e.target.value}
              })}
              placeholder="e.g., +1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={practiceData.contact.email}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                contact: {...practiceData.contact, email: e.target.value}
              })}
              placeholder="e.g., info@yourpractice.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
            <input
              type="tel"
              value={practiceData.contact.emergencyPhone}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                contact: {...practiceData.contact, emergencyPhone: e.target.value}
              })}
              placeholder="e.g., +1 (555) 999-0000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Practice Address *</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={practiceData.contact.address.street}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, street: e.target.value}
                  }
                })}
                placeholder="e.g., 123 Healthcare Blvd, Suite 200"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={practiceData.contact.address.city}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, city: e.target.value}
                  }
                })}
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={practiceData.contact.address.state}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, state: e.target.value}
                  }
                })}
                placeholder="State/Province"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={practiceData.contact.address.zip}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, zip: e.target.value}
                  }
                })}
                placeholder="ZIP/Postal Code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={practiceData.contact.address.country}
                onChange={(e) => setPracticeData({
                  ...practiceData, 
                  contact: {
                    ...practiceData.contact, 
                    address: {...practiceData.contact.address, country: e.target.value}
                  }
                })}
                placeholder="Country"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hours */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FaClock className="mr-2 text-blue-600" />
          Operating Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekdays</label>
            <input
              type="text"
              value={practiceData.hours.weekdays}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                hours: {...practiceData.hours, weekdays: e.target.value}
              })}
              placeholder="e.g., Mon-Fri: 8:00 AM - 6:00 PM"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Saturday</label>
            <input
              type="text"
              value={practiceData.hours.saturday}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                hours: {...practiceData.hours, saturday: e.target.value}
              })}
              placeholder="e.g., Sat: 9:00 AM - 2:00 PM"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sunday</label>
            <input
              type="text"
              value={practiceData.hours.sunday}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                hours: {...practiceData.hours, sunday: e.target.value}
              })}
              placeholder="e.g., Sun: Closed"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Hours</label>
            <input
              type="text"
              value={practiceData.hours.emergency}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                hours: {...practiceData.hours, emergency: e.target.value}
              })}
              placeholder="e.g., 24/7 Emergency Services Available"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
            <input
              type="text"
              value={practiceData.stats.yearsExperience}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                stats: {...practiceData.stats, yearsExperience: e.target.value}
              })}
              placeholder="e.g., 15"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patients Served</label>
            <input
              type="text"
              value={practiceData.stats.patientsServed}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                stats: {...practiceData.stats, patientsServed: e.target.value}
              })}
              placeholder="e.g., 5,000+"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Success Rate %</label>
            <input
              type="text"
              value={practiceData.stats.successRate}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                stats: {...practiceData.stats, successRate: e.target.value}
              })}
              placeholder="e.g., 98"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Doctors</label>
            <input
              type="text"
              value={practiceData.stats.doctorsCount}
              onChange={(e) => setPracticeData({
                ...practiceData, 
                stats: {...practiceData.stats, doctorsCount: e.target.value}
              })}
              placeholder="e.g., 8"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('practice')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
          <span>Save Practice Information</span>
        </button>
      </div>
    </div>
  );

  const renderServicesForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Services Management</h2>
        <button
          onClick={addService}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Service</span>
        </button>
      </div>

      {services.map((service, index) => (
        <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Service #{index + 1}</h3>
            {services.length > 1 && (
              <button
                onClick={() => removeService(service.id)}
                className="text-red-600 hover:text-red-700"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => updateService(service.id, 'title', e.target.value)}
                placeholder="e.g., Primary Care"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <select
                value={service.icon}
                onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user-md">Doctor</option>
                <option value="heartbeat">Heartbeat</option>
                <option value="tooth">Dental</option>
                <option value="microscope">Laboratory</option>
                <option value="shield-alt">Prevention</option>
                <option value="procedures">Surgery</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Description *</label>
            <textarea
              value={service.description}
              onChange={(e) => updateService(service.id, 'description', e.target.value)}
              placeholder="Detailed description of your service..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                value={service.price}
                onChange={(e) => updateService(service.id, 'price', e.target.value)}
                placeholder="e.g., $150"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={service.duration}
                onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                placeholder="e.g., 45 minutes"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Features</label>
            {service.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateServiceFeature(service.id, featureIndex, e.target.value)}
                  placeholder="e.g., Comprehensive health examination"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeServiceFeature(service.id, featureIndex)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addFeatureToService(service.id)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Feature
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`active-${service.id}`}
              checked={service.isActive}
              onChange={(e) => updateService(service.id, 'isActive', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={`active-${service.id}`} className="text-sm font-medium text-gray-700">
              Active Service
            </label>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('services')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
          <span>Save Services</span>
        </button>
      </div>
    </div>
  );

  const renderTeamForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        <button
          onClick={addTeamMember}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Team Member</span>
        </button>
      </div>

      {teamMembers.map((member, index) => (
        <div key={member.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Member #{index + 1}</h3>
            {teamMembers.length > 1 && (
              <button
                onClick={() => removeTeamMember(member.id)}
                className="text-red-600 hover:text-red-700"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                placeholder="e.g., Dr. Sarah Johnson"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title *</label>
              <input
                type="text"
                value={member.title}
                onChange={(e) => updateTeamMember(member.id, 'title', e.target.value)}
                placeholder="e.g., Chief Medical Officer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Specialty *</label>
              <input
                type="text"
                value={member.specialty}
                onChange={(e) => updateTeamMember(member.id, 'specialty', e.target.value)}
                placeholder="e.g., Internal Medicine & Cardiology"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input
                type="text"
                value={member.experience}
                onChange={(e) => updateTeamMember(member.id, 'experience', e.target.value)}
                placeholder="e.g., 15"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio *</label>
            <textarea
              value={member.bio}
              onChange={(e) => updateTeamMember(member.id, 'bio', e.target.value)}
              placeholder="Professional background, education, experience, and achievements..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input
                type="tel"
                value={member.phone}
                onChange={(e) => updateTeamMember(member.id, 'phone', e.target.value)}
                placeholder="e.g., +1 (555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Email</label>
              <input
                type="email"
                value={member.email}
                onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                placeholder="e.g., doctor@yourpractice.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <input
              type="text"
              value={member.availability}
              onChange={(e) => updateTeamMember(member.id, 'availability', e.target.value)}
              placeholder="e.g., Mon-Fri: 8:00 AM - 5:00 PM"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dynamic Arrays */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credentials</label>
              {member.credentials.map((credential, credIndex) => (
                <div key={credIndex} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={credential}
                    onChange={(e) => updateArrayField(member.id, 'credentials', credIndex, e.target.value)}
                    placeholder="e.g., MD, FACP"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(member.id, 'credentials', credIndex)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField(member.id, 'credentials')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Credential
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
              {member.specialties.map((specialty, specIndex) => (
                <div key={specIndex} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => updateArrayField(member.id, 'specialties', specIndex, e.target.value)}
                    placeholder="e.g., Preventive Cardiology"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(member.id, 'specialties', specIndex)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField(member.id, 'specialties')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Specialty
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
              {member.languages.map((language, langIndex) => (
                <div key={langIndex} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => updateArrayField(member.id, 'languages', langIndex, e.target.value)}
                    placeholder="e.g., English, Spanish"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(member.id, 'languages', langIndex)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField(member.id, 'languages')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Language
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`team-active-${member.id}`}
              checked={member.isActive}
              onChange={(e) => updateTeamMember(member.id, 'isActive', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={`team-active-${member.id}`} className="text-sm font-medium text-gray-700">
              Active Team Member
            </label>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('team')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
          <span>Save Team Members</span>
        </button>
      </div>
    </div>
  );

  const renderBlogForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <button
          onClick={() => setBlogPosts([...blogPosts, {
            id: Date.now(),
            title: '',
            excerpt: '',
            content: '',
            category: '',
            tags: [''],
            featured: false,
            published: true
          }])}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Blog Post</span>
        </button>
      </div>

      {blogPosts.map((post, index) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Blog Post #{index + 1}</h3>
            {blogPosts.length > 1 && (
              <button
                onClick={() => setBlogPosts(blogPosts.filter(p => p.id !== post.id))}
                className="text-red-600 hover:text-red-700"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Title *</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setBlogPosts(blogPosts.map(p => 
                  p.id === post.id ? { ...p, title: e.target.value } : p
                ))}
                placeholder="e.g., 10 Essential Health Tips for 2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={post.category}
                onChange={(e) => setBlogPosts(blogPosts.map(p => 
                  p.id === post.id ? { ...p, category: e.target.value } : p
                ))}
                placeholder="e.g., Preventive Care"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
            <textarea
              value={post.excerpt}
              onChange={(e) => setBlogPosts(blogPosts.map(p => 
                p.id === post.id ? { ...p, excerpt: e.target.value } : p
              ))}
              placeholder="Brief summary of the blog post..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              value={post.content}
              onChange={(e) => setBlogPosts(blogPosts.map(p => 
                p.id === post.id ? { ...p, content: e.target.value } : p
              ))}
              placeholder="Full blog post content (you can use HTML tags)..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            {post.tags.map((tag, tagIndex) => (
              <div key={tagIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setBlogPosts(blogPosts.map(p => {
                    if (p.id === post.id) {
                      const newTags = [...p.tags];
                      newTags[tagIndex] = e.target.value;
                      return { ...p, tags: newTags };
                    }
                    return p;
                  }))}
                  placeholder="e.g., health, prevention, wellness"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setBlogPosts(blogPosts.map(p => {
                    if (p.id === post.id) {
                      return { ...p, tags: p.tags.filter((_, i) => i !== tagIndex) };
                    }
                    return p;
                  }))}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setBlogPosts(blogPosts.map(p => 
                p.id === post.id ? { ...p, tags: [...p.tags, ''] } : p
              ))}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Tag
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`featured-${post.id}`}
                checked={post.featured}
                onChange={(e) => setBlogPosts(blogPosts.map(p => 
                  p.id === post.id ? { ...p, featured: e.target.checked } : p
                ))}
                className="mr-2"
              />
              <label htmlFor={`featured-${post.id}`} className="text-sm font-medium text-gray-700">
                Featured Post
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`published-${post.id}`}
                checked={post.published}
                onChange={(e) => setBlogPosts(blogPosts.map(p => 
                  p.id === post.id ? { ...p, published: e.target.checked } : p
                ))}
                className="mr-2"
              />
              <label htmlFor={`published-${post.id}`} className="text-sm font-medium text-gray-700">
                Published
              </label>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={() => handleSave('blog')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
          <span>Save Blog Posts</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Your Healthcare Website</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fill in your practice information to create a professional healthcare website. 
            All fields with placeholders should be replaced with your actual information.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="flex flex-wrap border-b">
            <button
              onClick={() => setActiveSection('practice')}
              className={`px-6 py-3 font-medium text-sm ${
                activeSection === 'practice'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaClinic className="inline mr-2" />
              Practice Info
            </button>
            <button
              onClick={() => setActiveSection('services')}
              className={`px-6 py-3 font-medium text-sm ${
                activeSection === 'services'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaStethoscope className="inline mr-2" />
              Services
            </button>
            <button
              onClick={() => setActiveSection('team')}
              className={`px-6 py-3 font-medium text-sm ${
                activeSection === 'team'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaUserMd className="inline mr-2" />
              Team
            </button>
            <button
              onClick={() => setActiveSection('blog')}
              className={`px-6 py-3 font-medium text-sm ${
                activeSection === 'blog'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaBlog className="inline mr-2" />
              Blog
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {saved && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <FaCheck className="text-green-400 mr-3 mt-1" />
              <p className="text-green-700">Data saved successfully!</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <FaTimes className="text-red-400 mr-3 mt-1" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Content Sections */}
        {activeSection === 'practice' && renderPracticeForm()}
        {activeSection === 'services' && renderServicesForm()}
        {activeSection === 'team' && renderTeamForm()}
        {activeSection === 'blog' && renderBlogForm()}

        {/* Help Text */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Tips:</strong> Fill out as much information as possible to create a comprehensive website. 
                You can always come back and update any section later. Fields marked with * are required for that section to be saved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataInputSystem;