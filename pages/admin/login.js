import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { api } from '../../lib/api'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

  try {
    const result = await api.adminLogin(credentials)
    if (result.success) {
      localStorage.setItem('adminToken', result.token)
      router.push('/admin/dashboard')
    } else {
      setError(result.message)
    }
  } catch (err) {
    setError('Login failed. Please try again.')
  } finally {
    setLoading(false)
  }
}

  // Auto-fill for testing
  const handleQuickFill = () => {
    setCredentials({ username: 'admin', password: 'password123' })
  }

  return (
    <>
      <Head>
        <title>Admin Login - Content Management</title>
      </Head>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaLock className="text-blue-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-gray-600">Access your website management panel</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500 mb-2">
                Default credentials:
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <div><strong>Username:</strong> admin</div>
                <div><strong>Password:</strong> password123</div>
                <button 
                  type="button"
                  onClick={handleQuickFill}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-xs"
                >
                  Click to auto-fill
                </button>
              </div>
            </div>

            {/* Debug Info */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              Current values: {credentials.username} / {credentials.password.length} chars
            </div>
          </div>
        </div>
      </div>
    </>
  )
}