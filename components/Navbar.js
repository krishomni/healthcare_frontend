import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaTooth, FaBars, FaTimes, FaSearch } from 'react-icons/fa'

export default function Navbar({ userData = null }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  // Default practice data if userData is not provided
  const practiceData = userData?.practice || {
    name: "Your Practice Name"
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' }
  ]

  const handleSearch = (e) => {
  e.preventDefault()
  if (searchQuery.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setShowSearch(false)
    setSearchQuery('')
  }
}

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Now safely uses practiceData */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <FaTooth className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{practiceData.name}</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  router.pathname === item.href 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Search and Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-600 hover:text-blue-600 p-2 transition-colors"
            >
              <FaSearch className="text-lg" />
            </button>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t p-4">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, services..."
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block font-medium transition-colors ${
                    router.pathname === item.href 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <FaSearch />
                    </button>
                  </div>
                </form>
                <Link
                  href="/contact"
                  className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
