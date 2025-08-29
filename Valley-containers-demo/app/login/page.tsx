'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Truck, 
  Eye, 
  EyeOff, 
  Lock, 
  User,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any email/password combination
      if (email && password) {
        toast.success('Login successful! Redirecting to admin panel...')
        setTimeout(() => {
          router.push('/admin')
        }, 1000)
      } else {
        toast.error('Invalid credentials')
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const demoCredentials = [
    { role: 'Sales Manager', email: 'sarah.johnson@valleycontainers.co.za', password: 'demo123' },
    { role: 'Operations Manager', email: 'mike.chen@valleycontainers.co.za', password: 'demo123' },
    { role: 'Finance Manager', email: 'lisa.wang@valleycontainers.co.za', password: 'demo123' }
  ]

  return (
    <div className="min-h-screen bg-secondary-200 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl sm:text-3xl">V</span>
          </div>
        </div>
        
        <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
          Valley Containers
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Staff Portal Access
        </p>
      </div>

      <div className="mt-6 sm:mt-8 mx-auto w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-6 sm:py-8 px-4 shadow-xl rounded-xl sm:px-10 border border-gray-200"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex justify-center py-3"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {demoCredentials.map((credential, index) => (
                <div
                  key={index}
                  className="bg-secondary-200 rounded-lg p-3 text-xs sm:text-sm"
                >
                  <div className="font-medium text-secondary-900">{credential.role}</div>
                  <div className="text-secondary-600 break-all">
                    <span className="font-medium">Email:</span> {credential.email}
                  </div>
                  <div className="text-secondary-600">
                    <span className="font-medium">Password:</span> {credential.password}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Demo Mode</p>
                <p className="mt-1">
                  This is a demonstration application. Use any of the demo credentials above to access the admin panel.
                  All data is simulated for presentation purposes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <div className="text-xs sm:text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
            <a href="/" className="font-medium text-primary-600 hover:text-primary-500">
              Back to Home
            </a>
            <span className="hidden sm:inline mx-2">•</span>
            <a href="/track" className="font-medium text-primary-600 hover:text-primary-500">
              Track Container
            </a>
            <span className="hidden sm:inline mx-2">•</span>
            <a href="/contact" className="font-medium text-primary-600 hover:text-primary-500">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
