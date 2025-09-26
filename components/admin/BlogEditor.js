import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaEye } from 'react-icons/fa'

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
      author: { name: '', id: '' },
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
        [parent]: { 
          ...updatedPosts[index][parent], 
          [child]: value 
        }
      }
    } else {
      updatedPosts[index] = { 
        ...updatedPosts[index], 
        [field]: value 
      }
    }
    
    onUpdate(updatedPosts)
  }

  const deletePost = (index) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const updatedPosts = blogPosts.filter((_, i) => i !== index)
      onUpdate(updatedPosts)
      setEditingPost(null)
      setIsAdding(false)
    }
  }

  const generateSlug = (title) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const updateTags = (index, tagsString) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
    updatePost(index, 'tags', tags)
  }

  const savePost = () => {
    setEditingPost(null)
    setIsAdding(false)
  }

  const cancelEdit = (index) => {
    if (isAdding) {
      deletePost(index)
    }
    setEditingPost(null)
    setIsAdding(false)
  }

  return (
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
        {blogPosts && blogPosts.length > 0 ? (
          blogPosts.map((post, index) => (
            <div key={post.id || index} className="border border-gray-200 rounded-lg p-6 bg-white">
              {editingPost === index ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={post.title || ''}
                        onChange={(e) => {
                          updatePost(index, 'title', e.target.value)
                          updatePost(index, 'slug', generateSlug(e.target.value))
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter blog post title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={post.category || ''}
                        onChange={(e) => updatePost(index, 'category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Health Tips"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      value={post.excerpt || ''}
                      onChange={(e) => updatePost(index, 'excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the post"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      value={post.content || ''}
                      onChange={(e) => updatePost(index, 'content', e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your blog post content here (HTML supported)"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={post.author?.name || ''}
                        onChange={(e) => updatePost(index, 'author.name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Dr. John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        value={post.publishDate || ''}
                        onChange={(e) => updatePost(index, 'publishDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={post.tags ? post.tags.join(', ') : ''}
                      onChange={(e) => updateTags(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="health, wellness, tips"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`featured-${index}`}
                      checked={post.featured || false}
                      onChange={(e) => updatePost(index, 'featured', e.target.checked)}
                      className="mr-2 w-4 h-4"
                    />
                    <label htmlFor={`featured-${index}`} className="text-sm font-medium text-gray-700">
                      Featured Post
                    </label>
                  </div>

                  <div className="flex space-x-2 pt-4 border-t">
                    <button
                      onClick={savePost}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <FaSave className="mr-2" />
                      Save
                    </button>
                    <button
                      onClick={() => cancelEdit(index)}
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
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {post.title || 'Untitled Post'}
                        </h3>
                        {post.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        {post.author?.name && <span>{post.author.name}</span>}
                        {post.publishDate && <span>{post.publishDate}</span>}
                        {post.category && <span>{post.category}</span>}
                        {post.tags && post.tags.length > 0 && (
                          <span>{post.tags.join(', ')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => setEditingPost(index)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deletePost(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg mb-2">No blog posts yet</p>
            <p className="text-gray-400 text-sm">Click "Add Blog Post" to create your first post</p>
          </div>
        )}
      </div>
    </div>
  )
}