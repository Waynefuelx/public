'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Building2, 
  Crown, 
  Snowflake, 
  Split, 
  Truck, 
  ShowerHead, 
  Tent, 
  Bed,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Star
} from 'lucide-react'
import Link from 'next/link'

interface ContainerType {
  id: string
  name: string
  icon: any
  description: string
  features: string[]
  sizes: string[]
  rentalPeriods: string[]
  startingPrice: string
  image: string
  popular?: boolean
  category: string
}

const containerTypes: ContainerType[] = [
  {
    id: 'storage',
    name: 'Storage Containers',
    icon: Package,
    description: 'Secure, weather-resistant storage solutions for any business or personal needs.',
    features: [
      'Weather-resistant construction',
      'Multiple size options',
      'Easy access doors',
      'Stackable design',
      'Security lockable'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', '6m x 2.4m x 2.6m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R150/day',
    image: '/storage-container.jpg',
    category: 'Storage'
  },
  {
    id: 'office',
    name: 'Office Containers',
    icon: Building2,
    description: 'Professional office spaces with all amenities for immediate business operations.',
    features: [
      'Fully furnished interior',
      'Electrical wiring',
      'Air conditioning',
      'Windows and lighting',
      'Professional appearance'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', 'Custom configurations'],
    rentalPeriods: ['Monthly', 'Quarterly', 'Annual'],
    startingPrice: 'R450/day',
    image: '/office-container.jpg',
    category: 'Office'
  },
  {
    id: 'vip-office',
    name: 'VIP Container Office',
    icon: Crown,
    description: 'Premium executive office solutions with luxury finishes and advanced amenities.',
    features: [
      'Premium finishes',
      'Executive furniture',
      'Advanced climate control',
      'Soundproofing',
      'Custom branding options'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', '18m x 2.4m'],
    rentalPeriods: ['Monthly', 'Quarterly', 'Annual'],
    startingPrice: 'R750/day',
    image: '/vip-office.jpg',
    popular: true,
    category: 'Office'
  },
  {
    id: 'refrigeration',
    name: 'Refrigeration / Freezer Container',
    icon: Snowflake,
    description: 'Temperature-controlled containers for food storage, pharmaceuticals, and sensitive materials.',
    features: [
      'Temperature control -18°C to +25°C',
      'Energy efficient',
      'Remote monitoring',
      'Alarm systems',
      'Insulated walls'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', '20ft', '40ft'],
    rentalPeriods: ['Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R850/day',
    image: '/refrigeration-container.jpg',
    category: 'Specialized'
  },
  {
    id: 'split',
    name: 'Split Container',
    icon: Split,
    description: 'Versatile containers with internal partitions for multiple uses or separate storage areas.',
    features: [
      'Internal partitions',
      'Multiple access doors',
      'Flexible configurations',
      'Cost-effective solution',
      'Easy customization'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', 'Custom partitions'],
    rentalPeriods: ['Monthly', 'Quarterly', 'Annual'],
    startingPrice: 'R300/day',
    image: '/split-container.jpg',
    category: 'Storage'
  },
  {
    id: 'elite-mobile',
    name: 'Elite Mobile Container',
    icon: Truck,
    description: 'High-end mobile solutions with premium finishes and advanced mobility features.',
    features: [
      'Premium materials',
      'Advanced mobility',
      'Custom interiors',
      'Professional appearance',
      'Quick deployment'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', 'Custom dimensions'],
    rentalPeriods: ['Weekly', 'Monthly', 'Event-based'],
    startingPrice: 'R600/day',
    image: '/elite-mobile.jpg',
    category: 'Premium'
  },
  {
    id: 'ablution',
    name: 'Ablution Container',
    icon: ShowerHead,
    description: 'Complete bathroom and shower facilities for construction sites, events, and remote locations.',
    features: [
      'Multiple shower units',
      'Toilet facilities',
      'Hot water systems',
      'Ventilation',
      'Easy maintenance'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', 'Custom layouts'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Event-based'],
    startingPrice: 'R400/day',
    image: '/ablution-container.jpg',
    category: 'Facilities'
  },
  {
    id: 'pavilion',
    name: 'Pavilion Container',
    icon: Tent,
    description: 'Event and exhibition spaces with open layouts and professional presentation capabilities.',
    features: [
      'Open floor plans',
      'Professional lighting',
      'Climate control',
      'Custom branding',
      'Flexible configurations'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', '18m x 2.4m'],
    rentalPeriods: ['Daily', 'Weekly', 'Event-based'],
    startingPrice: 'R500/day',
    image: '/pavilion-container.jpg',
    category: 'Events'
  },
  {
    id: 'sleeper',
    name: 'Sleeper Container',
    icon: Bed,
    description: 'Comfortable accommodation units with sleeping quarters and essential amenities.',
    features: [
      'Sleeping quarters',
      'Basic amenities',
      'Climate control',
      'Security features',
      'Easy transport'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', 'Custom layouts'],
    rentalPeriods: ['Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R350/day',
    image: '/sleeper-container.jpg',
    category: 'Accommodation'
  }
]

const categories = ['All', 'Storage', 'Office', 'Specialized', 'Premium', 'Facilities', 'Events', 'Accommodation']

export default function RentalPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedContainer, setSelectedContainer] = useState<ContainerType | null>(null)

  const filteredContainers = selectedCategory === 'All' 
    ? containerTypes 
    : containerTypes.filter(container => container.category === selectedCategory)

  return (
    <div className="min-h-screen bg-secondary-200">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Container Rental
            <span className="block text-primary-100">Solutions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-50 mb-8 max-w-3xl mx-auto"
          >
            Flexible, reliable container rentals for every need. From storage to luxury offices, we have the perfect solution.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Choose Your Container Type</h2>
            <p className="text-lg text-secondary-600">Filter by category to find the perfect solution</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-secondary-200 text-secondary-700 hover:bg-secondary-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Container Grid */}
      <section className="py-16 bg-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContainers.map((container, index) => (
              <motion.div
                key={container.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Popular Badge */}
                {container.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Popular
                  </div>
                )}

                {/* Container Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <container.icon className="w-20 h-20 text-primary-500" />
                </div>

                {/* Container Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-secondary-900">{container.name}</h3>
                    <span className="text-sm text-secondary-500 bg-secondary-100 px-2 py-1 rounded">
                      {container.category}
                    </span>
                  </div>

                  <p className="text-secondary-600 mb-4">{container.description}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-secondary-900 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {container.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-secondary-600">
                          <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sizes */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-secondary-900 mb-2">Available Sizes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {container.sizes.map((size, idx) => (
                        <span key={idx} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rental Periods */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-secondary-900 mb-2">Rental Periods:</h4>
                    <div className="flex flex-wrap gap-2">
                      {container.rentalPeriods.map((period, idx) => (
                        <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="border-t border-secondary-200 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-secondary-500">Starting from</span>
                        <div className="text-2xl font-bold text-primary-500">{container.startingPrice}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedContainer(container)}
                        className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        View Details
                      </button>
                      <Link 
                        href="/booking"
                        className="flex-1 bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                      >
                        Rent Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Why Choose Valley Containers?</h2>
            <p className="text-lg text-secondary-600">We provide the most reliable and flexible container rental solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Flexible Rental Terms',
                description: 'Daily, weekly, monthly, or long-term rentals to suit your needs'
              },
              {
                icon: MapPin,
                title: 'Nationwide Delivery',
                description: 'We deliver anywhere in South Africa with our extensive logistics network'
              },
              {
                icon: Phone,
                title: '24/7 Support',
                description: 'Round-the-clock customer service and technical support'
              },
              {
                icon: CheckCircle,
                title: 'Quality Guaranteed',
                description: 'All containers meet international standards and safety requirements'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Rent Your Container?
          </h2>
          <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
            Get started with your container rental today. Our team is ready to help you find the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking"
              className="btn-primary text-lg px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100"
            >
              Start Renting
            </Link>
            <button className="btn-secondary text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-500">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Container Details Modal */}
      {selectedContainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary-900">{selectedContainer.name}</h2>
                <button
                  onClick={() => setSelectedContainer(null)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Description</h3>
                  <p className="text-secondary-600">{selectedContainer.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedContainer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-secondary-600">
                        <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Available Sizes</h3>
                    <div className="space-y-2">
                      {selectedContainer.sizes.map((size, idx) => (
                        <div key={idx} className="text-sm text-secondary-600 bg-secondary-100 px-3 py-2 rounded">
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Rental Periods</h3>
                    <div className="space-y-2">
                      {selectedContainer.rentalPeriods.map((period, idx) => (
                        <div key={idx} className="text-sm text-primary-700 bg-primary-100 px-3 py-2 rounded">
                          {period}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-secondary-200 pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-sm text-secondary-500">Starting from</span>
                      <div className="text-3xl font-bold text-primary-500">{selectedContainer.startingPrice}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      href="/booking"
                      className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                    >
                      Rent Now
                    </Link>
                    <Link
                      href="/rental"
                      className="flex-1 bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
