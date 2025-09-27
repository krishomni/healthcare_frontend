import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { FaArrowLeft, FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import ScrollToTop from '../../components/ScrollToTop'
import { api } from '../../lib/api'

export default function BlogPost() {
  const router = useRouter()
  const { id } = router.query
  const [userData, setUserData] = useState(null)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) loadData()
  }, [id])

  const loadData = async () => {
    try {
      const data = await api.getUserData()
      setUserData(data)
      
      // Find the specific blog post
      const foundPost = data.blogPosts?.find(p => p.id.toString() === id)
      if (foundPost) {
        setPost(foundPost)
      } else {
        console.error('Post not found')
      }
    } catch (error) {
      console.error('Error loading blog post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} - {userData?.practice?.name}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        
        <article className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4">
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Link>

            {/* Post Header */}
            <header className="mb-8">
              {post.category && (
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
                {post.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  {post.author?.name || 'Staff'}
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {new Date(post.publishDate).toLocaleDateString()}
                </div>
                {post.readTime && (
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    {post.readTime}
                  </div>
                )}
              </div>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Post Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>

        <ScrollToTop />
      </div>
    </>
  )
}