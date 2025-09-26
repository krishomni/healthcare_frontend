import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaShare, FaClock, FaUser, FaTag, FaImage } from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import ScrollToTop from '../../components/ScrollToTop'
import siteConfig from '../../config/site-config'

export default function BlogPost() {
  const router = useRouter()
  const { id } = router.query

  // Sample blog post data - in real app, fetch based on ID
  const blogPost = {
    id: 1,
    title: "10 Essential Health Tips for 2024",
    excerpt: "Discover the latest evidence-based strategies to maintain optimal health and prevent common illnesses throughout the year.",
    content: `
      <h2>Introduction</h2>
      <p>Maintaining good health in 2024 requires a comprehensive approach that combines traditional wellness practices with modern scientific insights. In this article, we'll explore ten evidence-based strategies that can significantly improve your overall health and wellbeing.</p>
      
      <h2>1. Prioritize Quality Sleep</h2>
      <p>Sleep is the foundation of good health. Adults should aim for 7-9 hours of quality sleep each night. Poor sleep is linked to numerous health problems including obesity, diabetes, cardiovascular disease, and weakened immunity.</p>
      
      <h3>Tips for Better Sleep:</h3>
      <ul>
        <li>Maintain a consistent sleep schedule</li>
        <li>Create a relaxing bedtime routine</li>
        <li>Keep your bedroom cool, dark, and quiet</li>
        <li>Avoid screens for at least 1 hour before bedtime</li>
      </ul>
      
      <h2>2. Stay Hydrated</h2>
      <p>Proper hydration is crucial for every bodily function. Water helps regulate body temperature, lubricates joints, and aids in nutrient transportation. Aim for 8-10 glasses of water daily, adjusting for activity level and climate.</p>
      
      <h2>3. Eat a Balanced Diet</h2>
      <p>Focus on whole foods including plenty of fruits, vegetables, lean proteins, and whole grains. Limit processed foods, excessive sugar, and unhealthy fats. The Mediterranean diet continues to show strong evidence for promoting longevity and reducing disease risk.</p>
      
      <h2>4. Exercise Regularly</h2>
      <p>Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week, plus strength training exercises twice weekly. Regular exercise reduces the risk of chronic diseases and improves mental health.</p>
      
      <h2>5. Manage Stress Effectively</h2>
      <p>Chronic stress can wreak havoc on your health. Develop healthy coping mechanisms such as meditation, deep breathing exercises, yoga, or regular physical activity. Consider professional help if stress becomes overwhelming.</p>
      
      <h2>6. Maintain Social Connections</h2>
      <p>Strong social relationships are linked to better mental health, increased longevity, and reduced risk of depression. Make time for family and friends, join community groups, or volunteer for causes you care about.</p>
      
      <h2>7. Get Regular Check-ups</h2>
      <p>Preventive healthcare is key to catching potential issues early. Schedule regular visits with your healthcare provider, keep up with recommended screenings, and don't ignore symptoms.</p>
      
      <h2>8. Limit Alcohol and Avoid Smoking</h2>
      <p>If you drink alcohol, do so in moderation. Avoid smoking and secondhand smoke exposure. These substances significantly increase the risk of numerous health problems including cancer, heart disease, and respiratory issues.</p>
      
      <h2>9. Practice Good Hygiene</h2>
      <p>Simple habits like regular handwashing, dental care, and personal hygiene can prevent many infections and diseases. This became especially apparent during the COVID-19 pandemic.</p>
      
      <h2>10. Stay Mentally Active</h2>
      <p>Keep your brain engaged through reading, learning new skills, solving puzzles, or taking up new hobbies. Mental stimulation may help prevent cognitive decline and keep your mind sharp as you age.</p>
      
      <h2>Conclusion</h2>
      <p>Implementing these ten health tips doesn't have to be overwhelming. Start with one or two changes and gradually incorporate others into your routine. Remember, small consistent changes often lead to the most sustainable improvements in health and wellbeing.</p>
      
      <p>Always consult with your healthcare provider before making significant changes to your health routine, especially if you have existing medical conditions.</p>
    `,
    date: "2024-03-15",
    category: "Preventive Care",
    author: "Dr. Sarah Johnson",
    image: "/images/blog1.jpg",
    readTime: "5 min read",
    tags: ["health", "prevention", "wellness", "tips"]
  }

  const relatedPosts = [
    {
      id: 2,
      title: "Understanding Heart Health",
      excerpt: "Learn about cardiovascular health and prevention strategies.",
      category: "Cardiology"
    },
    {
      id: 3,
      title: "Mental Health Awareness",
      excerpt: "Breaking the stigma and finding support resources.",
      category: "Mental Health"
    }
  ]

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.excerpt,
        url: window.location.href
      })
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      <Head>
        <title>{blogPost.title} - {siteConfig.practice.name}</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Article Header */}
        <motion.section 
          className="bg-white pt-32 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back to Blog
              </Link>
              
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {blogPost.category}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blogPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{blogPost.readTime}</span>
                </div>
                <div className="flex items-center">
                  <span>{blogPost.date}</span>
                </div>
                <button
                  onClick={sharePost}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaShare className="mr-2" />
                  Share
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Image */}
        <motion.section 
          className="bg-white pb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-64 lg:h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <FaImage className="text-6xl text-blue-600 opacity-50" />
            </div>
          </div>
        </motion.section>

        {/* Article Content */}
        <motion.section 
          className="bg-white pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg max-w-none prose-blue prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <FaTag className="text-gray-500" />
                <span className="font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Related Posts */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <FaImage className="text-4xl text-green-600 opacity-50" />
                  </div>
                  <div className="p-6">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <ScrollToTop />
      </div>
    </>
  )
}
