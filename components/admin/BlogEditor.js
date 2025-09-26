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
      lastModified: new Date().toISOString().split('T')[0],
      author: { name: '', id: '' },
      category: '',
      tags: [],
      readTime: '5 min read',
      featured: false,
      image: '',
      metaDescription: '',
      relatedPosts: []
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

  const updateTags = (index, tagsString) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
    updatePost(index, 'tags', tags)
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

      {blogPosts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-2">No blog posts yet</p>
          <p className="text-gray-400 text-sm">Click "Add Blog Post" to create your first article</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-6 bg-white">
              {editingPost === index ? (
                <div className="space-y-4">
                  {/* Title and Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title * <span className="text-xs text-gray-500">(This appears everywhere)</span>
                      </label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => {
                          updatePost(index, 'title', e.target.value)
                          updatePost(index, 'slug', generateSlug(e.target.value))
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 10 Health Tips for Better Living"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <input
                        type="text"
                        value={post.category}
                        onChange={(e) => updatePost(index, 'category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Health Tips, Wellness, Medical News"
                      />
                    </div>
                  </div>

                  {/* Slug (auto-generated) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug <span className="text-xs text-gray-500">(Auto-generated from title)</span>
                    </label>
                    <input
                      type="text"
                      value={post.slug}
                      onChange={(e) => updatePost(index, 'slug', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      placeholder="will-be-generated-from-title"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt * <span className="text-xs text-gray-500">(Brief summary shown on blog list)</span>
                    </label>
                    <textarea
                      value={post.excerpt}
                      onChange={(e) => updatePost(index, 'excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="A brief description of what this article is about (1-2 sentences)"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content * <span className="text-xs text-gray-500">(Full article content - HTML supported)</span>
                    </label>
                    <textarea
                      value={post.content}
                      onChange={(e) => updatePost(index, 'content', e.target.value)}
                      rows={10}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="Write your blog post content here. You can use HTML tags like <h2>, <p>, <ul>, <li>, etc."
                    />
                  </div>

                  {/* Author and Date */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                      <input
                        type="text"
                        value={post.author.name}
                        onChange={(e) => updatePost(index, 'author.name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Dr. Sarah Johnson"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                      <input
                        type="date"
                        value={post.publishDate}
                        onChange={(e) => updatePost(index, 'publishDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                      <input
                        type="text"
                        value={post.readTime}
                        onChange={(e) => updatePost(index, 'readTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 5 min read"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags <span className="text-xs text-gray-500">(Comma separated)</span>
                    </label>
                    <input
                      type="text"
                      value={post.tags.join(', ')}
                      onChange={(e) => updateTags(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="health, wellness, tips, prevention"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <input
                      type="checkbox"
                      id={`featured-${index}`}
                      checked={post.featured}
                      onChange={(e) => updatePost(index, 'featured', e.target.checked)}
                      className="mr-3 w-5 h-5 text-blue-600"
                    />
                    <label htmlFor={`featured-${index}`} className="text-sm font-medium text-gray-700">
                      ⭐ Feature this post on homepage (shows in featured articles section)
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4 border-t">
                    <button
                      onClick={() => {
                        setEditingPost(null)
                        setIsAdding(false)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <FaSave className="mr-2" />
                      Save Post
                    </button>
                    <button
                      onClick={() => {
                        if (isAdding) {
                          deletePost(index)
                          setIsAdding(false)
                        }
                        setEditingPost(null)
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
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
                        <h3 className="text-xl font-semibold text-gray-900">
                          {post.title || 'Untitled Post'}
                        </h3>
                        {post.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-semibold">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{post.excerpt || 'No excerpt provided'}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        {post.author.name && (
                          <span>👤 {post.author.name}</span>
                        )}
                        {post.publishDate && (
                          <span>📅 {post.publishDate}</span>
                        )}
                        {post.category && (
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            {post.category}
                          </span>
                        )}
                        {post.readTime && (
                          <span>⏱️ {post.readTime}</span>
                        )}
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {post.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                        className="text-green-600 hover:text-green-800 p-2"
                        title="Preview Post"
                      >
                        <FaEye size={18} />
                      </button>
                      <button
                        onClick={() => setEditingPost(index)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="Edit Post"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => deletePost(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Delete Post"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-blue-800 font-semibold mb-2">💡 Blog Post Tips:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• <strong>Title</strong> is the most important - make it compelling and clear</li>
          <li>• <strong>Excerpt</strong> appears on blog listings - keep it under 150 characters</li>
          <li>• <strong>Featured</strong> posts show on the homepage in the blog section</li>
          <li>• Use <strong>HTML tags</strong> in content: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;</li>
          <li>• <strong>Tags</strong> help organize your content - separate with commas</li>
          <li>• Changes appear immediately after clicking "Save Changes" at the top</li>
        </ul>
      </div>
    </div>
  )
}