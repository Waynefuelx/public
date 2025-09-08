'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Truck, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Shield, 
  Clock,
  Users,
  BarChart3,
  FileText,
  Phone
} from 'lucide-react'
import ContainerTypes from '@/components/ContainerTypes'
import Branches from '@/components/Branches'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect users based on authentication status
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect authenticated users to their appropriate dashboard
        switch (user.type) {
          case 'customer':
            router.push('/customer')
            break
          case 'driver':
            router.push('/driver')
            break
          case 'admin':
            router.push('/admin')
            break
        }
      } else {
        // Redirect unauthenticated users to login
        router.push('/login')
      }
    }
  }, [user, isLoading, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // This will redirect, so we don't need to render anything
  return null

  const features = [
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book containers with our intuitive calendar system and flexible delivery options.'
    },
    {
      icon: Truck,
      title: 'Real-time Tracking',
      description: 'Monitor your container from dispatch to delivery with live updates and notifications.'
    },
    {
      icon: MapPin,
      title: 'Nationwide Coverage',
      description: 'We deliver containers anywhere in South Africa with our extensive logistics network.'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment options with secure processing and instant invoicing.'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'All containers meet industry standards with comprehensive quality assurance.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service and technical support for all your needs.'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Containers Delivered' },
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Cities Covered' },
    { number: '99%', label: 'Satisfaction Rate' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="text-center">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            >
              Professional Container
              <span className="block text-primary-100">Rental & Sales</span>
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              Streamlined container management with real-time tracking, instant quotes, and nationwide delivery.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 relative z-10"
            >
              <Link 
                href="/rental"
                className="bg-white text-primary-500 hover:bg-secondary-100 font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 border border-primary-200 text-base sm:text-lg w-full sm:w-auto inline-flex items-center justify-center hover:shadow-lg active:scale-95"
              >
                Rent Now
              </Link>
              <Link 
                href="/pricing"
                className="bg-white text-primary-500 hover:bg-secondary-100 font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 border border-primary-200 text-base sm:text-lg w-full sm:w-auto inline-flex items-center justify-center cursor-pointer hover:shadow-lg active:scale-95"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 -z-10" style={{ zIndex: -1 }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Valley Containers?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We provide comprehensive container solutions with cutting-edge technology and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card hover:shadow-soft transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Container Types Section */}
      <ContainerTypes />

      {/* Branches Section */}
      <Branches />

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of satisfied customers who trust Valley Containers for their container needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link 
              href="/booking"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
            >
              Rent Your Container
            </Link>
            <Link 
              href="/rental"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
            >
              Buy Containers
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  )
}
