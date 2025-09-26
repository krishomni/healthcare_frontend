import { useState } from 'react'

export default function BlogEditor({ blogPosts, onUpdate }) {
  const [editingPost, setEditingPost] = useState(null)

  const addPost = () => {
    const newPost = {
      id: Date.now(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: { name: '' },
      category: '',
      tags: [''],
      featured: false,
      published: true,
      publishDate: new Date().toISOString().split('T')[0]
    }
    onUpdate([...blogPosts, newPost])
    setEditingPost(blogPosts.length)
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
    if (confirm('Delete this blog post?')) {
      onUpdate(blogPosts.filter((_, i) => i !== index))
    }
  }

  const updateTags = (index, tagsString) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
    updatePost(index, 'tags', tags)
  }

  const generateSlug = (title) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <button
          onClick={addPost}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Blog Post
        </button>
      </div>

      {blogPosts.map((post, index) => (
        <div key={post.id} className="border rounded-lg p-6 bg-white">
          {editingPost === index ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => {
                      updatePost(index, 'title', e.target.value)
                      updatePost(index, 'slug', generateSlug(e.target.value))
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={post.category}
                    onChange={(e) => updatePost(index, 'category', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  value={post.excerpt}
                  onChange={(e) => updatePost(index, 'excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  value={post.content}
                  onChange={(e) => updatePost(index, 'content', e.target.value)}
                  rows={10}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Write your blog post content here (HTML supported)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author Name</label>
                  <input
                    type="text"
                    value={post.author.name}
                    onChange={(e) => updatePost(index, 'author.name', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={post.publishDate}
                    onChange={(e) => updatePost(index, 'publishDate', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={post.tags.join(', ')}
                  onChange={(e) => updateTags(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="health, wellness, tips"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={post.featured}
                    onChange={(e) => updatePost(index, 'featured', e.target.checked)}
                    className="mr-2"
                  />
                  Featured Post
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={post.published}
                    onChange={(e) => updatePost(index, 'published', e.target.checked)}
                    className="mr-2"
                  />
                  Published
                </label>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingPost(null)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-600 mt-1">{post.excerpt}</p>
                <div className="text-sm text-gray-500 mt-2">
                  <span>{post.author.name}</span> • <span>{post.publishDate}</span> • <span>{post.category}</span>
                  {post.featured && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2">Featured</span>}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingPost(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}