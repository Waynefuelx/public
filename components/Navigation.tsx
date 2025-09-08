'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

import { 
  Menu, 
  X, 
  User, 
  Truck, 
  Calendar, 
  BarChart3, 
  LogOut,
  Settings,
  Bell,
  Shield,
  Package
} from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  // Navigation items based on user type
  const getNavigation = () => {
    if (user?.type === 'customer') {
      return [
        { name: 'Dashboard', href: '/customer' },
        { name: 'Containers', href: '/containers' },
        { name: 'Conversions', href: '/services' },
        { name: 'Tracking', href: '/track' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ]
    } else if (user?.type === 'driver') {
      return [
        { name: 'Deliveries', href: '/driver' },
        { name: 'Map', href: '/driver' },
        { name: 'Profile', href: '/driver' },
      ]
    } else if (user?.type === 'admin') {
      return [
        { name: 'Admin Panel', href: '/admin' },
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ]
    } else {
      // Public navigation
      return [
        { name: 'Home', href: '/' },
        { name: 'Containers', href: '/containers' },
        { name: 'Conversions', href: '/services' },
        { name: 'Branches', href: '/branches' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ]
    }
  }

  const navigation = getNavigation()

  const userMenuItems = [
    { name: 'Dashboard', href: user?.type === 'customer' ? '/customer' : user?.type === 'driver' ? '/driver' : '/admin', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Valley Containers</span>
            </Link>
          </div>

                    {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-secondary-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu & CTA */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {!user ? (
              <>
                <Link
                  href="/track"
                  className="btn-secondary text-sm"
                >
                  Track Container
                </Link>
                <Link
                  href="/login"
                  className="btn-primary text-sm"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  {user.type === 'customer' && <Package className="w-4 h-4 inline mr-1" />}
                  {user.type === 'driver' && <Truck className="w-4 h-4 inline mr-1" />}
                  {user.type === 'admin' && <Shield className="w-4 h-4 inline mr-1" />}
                  {user.name}
                </span>
                
                {/* User Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-primary-600" />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-primary-600 capitalize">{user.type}</p>
                      </div>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <item.icon className="w-4 h-4 mr-3" />
                          {item.name}
                        </Link>
                      ))}
                      <hr className="my-1" />
                      <button 
                        onClick={() => {
                          logout()
                          setIsUserMenuOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className="lg:hidden border-t border-gray-200 bg-white shadow-lg"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-secondary-700 hover:text-primary-500 hover:bg-secondary-100 rounded-lg transition-colors duration-200 active:bg-secondary-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <hr className="my-4 border-gray-200" />
            {!user ? (
              <>
                <Link
                  href="/track"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 active:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Track Container
                </Link>
                <Link
                  href="/login"
                  className="block px-4 py-3 text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200 active:bg-primary-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <p className="text-xs text-primary-600 capitalize">{user.type}</p>
                </div>
                {userMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 active:bg-gray-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 active:bg-gray-200"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
