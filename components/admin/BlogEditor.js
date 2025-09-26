import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'

export default function BlogEditor({ blogPosts, onUpdate }) {
  const [editingPost, setEditingPost] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  const addPost = () => {
    const newPost = {
      id: Date.now(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      publishDate: new Date().toISOString().split('T')[0],
      author: { name: '' },
      category: '',
      tags: [],
      readTime: '5 min read',
      featured: false
    }
    onUpdate([...blogPosts, newPost])
    setEditingPost(blogPosts.length)
    setIsAdding(true)
  }

  const updatePost = (index, field, value) => {
    const updatedPosts = [...blogPosts]
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      updatedPosts[index] = {
        ...updatedPosts[index],
        [parent]: { ...updatedPosts[index][parent], [child]: value }
      }
    } else {
      updatedPosts[index] = { ...updatedPosts[index], [field]: value }
    }
    onUpdate(updatedPosts)
  }

  const deletePost = (index) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const updatedPosts = blogPosts.filter((_, i) => i !== index)
      onUpdate(updatedPosts)
    }
  }

  const generateSlug = (title) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Blog Posts Management</h2>
            <button
              onClick={addPost}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Blog Post
            </button>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post, index) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                {editingPost === index ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => {
                          updatePost(index, 'title', e.target.value)
                          updatePost(index, 'slug', generateSlug(e.target.value))
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter blog post title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
                      <textarea
                        value={post.excerpt}
                        onChange={(e) => updatePost(index, 'excerpt', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of the post"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                      <textarea
                        value={post.content}
                        onChange={(e) => updatePost(index, 'content', e.target.value)}
                        rows={10}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your blog post content here"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                        <input
                          type="text"
                          value={post.author.name}
                          onChange={(e) => updatePost(index, 'author.name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={post.category}
                          onChange={(e) => updatePost(index, 'category', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`featured-${index}`}
                        checked={post.featured}
                        onChange={(e) => updatePost(index, 'featured', e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`featured-${index}`} className="text-sm font-medium text-gray-700">
                        Featured Post
                      </label>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingPost(null)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                      >
                        <FaSave className="mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          if (isAdding) {
                            deletePost(index)
                            setIsAdding(false)
                          }
                          setEditingPost(null)
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
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                          {post.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Featured</span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{post.excerpt}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{post.author.name}</span>
                          <span>{post.category}</span>
                          <span>{post.publishDate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingPost(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deletePost(index)}
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