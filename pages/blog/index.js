import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCalendar, FaUser, FaClock, FaTag, FaImage } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

export default function Blog() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('/api/user-data')
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!userData || !userData.blogPosts || userData.blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900">No Blog Posts Available</h1>
          <p className="text-gray-600 mt-4">Please add blog posts through the admin panel.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Health Blog - {userData.practice?.name}</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />

        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Health Blog</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Expert medical advice and health tips
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <FaImage className="text-4xl text-blue-600 opacity-50" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author?.name}</span>
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ScrollToTop />
      </div>
    </>
  )
}