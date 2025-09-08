'use client'

import Link from 'next/link'
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

export default function PublicHome() {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book containers with our intuitive calendar system and flexible delivery options.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery service across South Africa with real-time tracking.'
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'High-quality containers with advanced security features for your valuable goods.'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'Multiple payment options including credit cards, bank transfers, and financing.'
    },
    {
      icon: MapPin,
      title: 'Nationwide Coverage',
      description: 'Service available across all major cities and industrial areas in South Africa.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist with all your container needs.'
    }
  ]

  const stats = [
    { label: 'Happy Customers', value: '500+' },
    { label: 'Containers Delivered', value: '2,500+' },
    { label: 'Cities Covered', value: '25+' },
    { label: 'Years Experience', value: '10+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Professional Container
              <span className="block text-secondary-200">Rental & Sales</span>
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              High-quality shipping containers for storage, transport, and custom conversions across South Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="btn-primary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-secondary-100"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Valley Containers?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive container solutions with unmatched service quality and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Container Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Container Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From standard shipping containers to specialized units, we have the perfect solution for your needs
            </p>
          </div>
          <ContainerTypes />
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategically located branches across South Africa for convenient service
            </p>
          </div>
          <Branches />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by businesses and individuals across South Africa
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust Valley Containers for their storage and transport needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="btn-primary text-lg px-8 py-4 bg-white text-primary-600 hover:bg-secondary-100"
            >
              Sign In to Your Account
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
