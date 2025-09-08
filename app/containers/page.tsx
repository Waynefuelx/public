'use client'

import { useState } from 'react'
import BranchLocationModal from '@/components/BranchLocationModal'
import { useSearchParams } from 'next/navigation'

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
  Star,
  Thermometer,
  Check,
  Wrench,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

interface ContainerType {
  id: string
  name: string
  icon: any
  description: string
  features: string[]
  sizes: string[]
  rentalPeriods?: string[]
  startingPrice: string
  image: string
  popular?: boolean
  category: string
  type: 'rental' | 'purchase' | 'both'
}

const containerTypes: ContainerType[] = [
  // Rental Containers
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
      'Security locks included',
      'Delivery and setup available'
    ],
    sizes: ['2m', '3m', '6m', '12m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R150/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png',
    popular: true,
    category: 'Storage',
    type: 'rental'
  },
  {
    id: 'office',
    name: 'Office Containers',
    icon: Building2,
    description: 'Professional office spaces with all amenities for your business needs.',
    features: [
      'Air conditioning included',
      'Electrical outlets',
      'Windows and lighting',
      'Professional flooring',
      'Security features',
      'Furniture options available'
    ],
    sizes: ['6m', '12m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R450/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png',
    popular: true,
    category: 'Office',
    type: 'rental'
  },
  {
    id: 'vip-office',
    name: 'VIP Container Office',
    icon: Crown,
    description: 'Premium office container with luxury amenities and professional finish.',
    features: [
      'Premium air conditioning',
      'High-end finishes',
      'Multiple rooms',
      'Executive furniture',
      'Advanced security',
      'Custom branding options'
    ],
    sizes: ['6m', '12m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R750/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/vipcontainer.png',
    popular: false,
    category: 'Office',
    type: 'rental'
  },
  {
    id: 'refrigeration',
    name: 'Refrigeration Container',
    icon: Snowflake,
    description: 'Temperature-controlled containers for food storage and sensitive materials.',
    features: [
      'Temperature control system',
      'Insulated walls',
      'Monitoring systems',
      'Multiple temperature zones',
      'Energy efficient',
      'Remote monitoring available'
    ],
    sizes: ['6m x 2.4m', '12m x 2.4m', '6m', '12m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R850/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_refrigeration.png',
    popular: false,
    category: 'Specialized',
    type: 'rental'
  },
  {
    id: 'split',
    name: 'Split Container',
    icon: Split,
    description: 'Versatile containers with multiple compartments for different uses.',
    features: [
      'Multiple compartments',
      'Flexible configuration',
      'Separate access doors',
      'Customizable layout',
      'Secure storage',
      'Easy organization'
    ],
    sizes: ['6m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R300/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_office.png',
    popular: false,
    category: 'Storage',
    type: 'rental'
  },
  {
    id: 'mobile-site',
    name: 'Elite Mobile Site Office',
    icon: Truck,
    description: 'Premium mobile office solution for construction and remote sites.',
    features: [
      'Mobile design',
      'Premium finishes',
      'All amenities included',
      'Quick setup',
      'Durable construction',
      'Professional appearance'
    ],
    sizes: ['6m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R600/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/Elite-office-unit.png',
    popular: false,
    category: 'Mobile',
    type: 'rental'
  },
  {
    id: 'ablution',
    name: 'Ablution Container',
    icon: ShowerHead,
    description: 'Complete bathroom facilities for construction sites and events.',
    features: [
      'Multiple shower stalls',
      'Toilet facilities',
      'Hot water system',
      'Ventilation system',
      'Easy maintenance',
      'Durable construction'
    ],
    sizes: ['3m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R400/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png',
    popular: false,
    category: 'Specialized',
    type: 'rental'
  },
  {
    id: 'pavilion',
    name: 'Pavilion Container',
    icon: Tent,
    description: 'Event and exhibition containers with open design and professional finish.',
    features: [
      'Open design',
      'Professional finish',
      'Event-ready',
      'Customizable layout',
      'Easy access',
      'Versatile use'
    ],
    sizes: ['6m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R500/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-pavilion.png',
    popular: false,
    category: 'Event',
    type: 'rental'
  },
  {
    id: 'sleeper',
    name: 'Sleeper Container',
    icon: Bed,
    description: 'Comfortable accommodation containers for remote work sites.',
    features: [
      'Sleeping quarters',
      'Basic amenities',
      'Climate control',
      'Security features',
      'Comfortable design',
      'Easy maintenance'
    ],
    sizes: ['6m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R350/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png',
    popular: false,
    category: 'Accommodation',
    type: 'rental'
  },
  {
    id: 'small-storage',
    name: 'Small Storage Container',
    icon: Package,
    description: 'Compact storage solution for smaller spaces and short-term needs.',
    features: [
      'Compact design',
      'Easy access',
      'Secure storage',
      'Weather resistant',
      'Cost effective',
      'Quick delivery'
    ],
    sizes: ['3m'],
    rentalPeriods: ['Daily', 'Weekly', 'Monthly', 'Long-term'],
    startingPrice: 'R75/day',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png',
    popular: false,
    category: 'Storage',
    type: 'rental'
  },
  // Purchase Options
  {
    id: 'new-container',
    name: 'New Container',
    icon: Package,
    description: 'Brand new container with full warranty and certification.',
    features: [
      'Full manufacturer warranty',
      'ISO certified',
      'Multiple size options',
      'Custom modifications available',
      'Delivery included',
      'Quality guarantee'
    ],
    sizes: ['2m', '3m', '6m', '12m', '12m HC'],
    startingPrice: 'R25,000',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png',
    popular: true,
    category: 'Purchase',
    type: 'purchase'
  },
  {
    id: 'used-container',
    name: 'Used Container',
    icon: Building2,
    description: 'Quality pre-owned container at competitive price.',
    features: [
      'Quality inspected',
      'Good condition guarantee',
      'Cost-effective option',
      'Multiple sizes available',
      'Delivery available',
      '30-day warranty'
    ],
    sizes: ['2m', '3m', '6m', '12m'],
    startingPrice: 'R15,000',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png',
    popular: false,
    category: 'Purchase',
    type: 'purchase'
  },
  {
    id: 'modified-container',
    name: 'Modified Container',
    icon: Wrench,
    description: 'Custom modified containers for specific business needs.',
    features: [
      'Custom modifications',
      'Professional installation',
      'Multiple configurations',
      'Quality materials',
      'Expert craftsmanship',
      'Warranty included'
    ],
    sizes: ['6m', '12m'],
    startingPrice: 'Custom',
    image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_refrigeration.png',
    popular: false,
    category: 'Purchase',
    type: 'purchase'
  }
]

const ContainersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showBranchModal, setShowBranchModal] = useState(false)
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'rental' // 'rental' or 'purchase'

  const categories = [
    { id: 'all', name: 'All Containers' },
    { id: 'Storage', name: 'Storage' },
    { id: 'Office', name: 'Office' },
    { id: 'Specialized', name: 'Specialized' },
    { id: 'Mobile', name: 'Mobile' },
    { id: 'Event', name: 'Event' },
    { id: 'Accommodation', name: 'Accommodation' },
    { id: 'Purchase', name: 'Purchase' }
  ]

  const filteredContainers = containerTypes.filter(container => {
    const categoryMatch = selectedCategory === 'all' || container.category === selectedCategory
    return categoryMatch
  })

  const handleContainerAction = (container: ContainerType, action: 'rent' | 'buy') => {
    if (action === 'rent') {
      // Navigate to booking page with container details
      const params = new URLSearchParams({
        container: container.id,
        type: container.name,
        category: 'Rental',
        dimensions: container.sizes[0] || '6m × 2.4m × 2.6m',
        capacity: '37.4 cu m',
        price: container.startingPrice
      })
      window.location.href = `/booking?${params.toString()}`
    } else {
      // Navigate to purchase page with container details
      const params = new URLSearchParams({
        container: container.id,
        type: container.name,
        category: 'Purchase',
        dimensions: container.sizes[0] || '6m × 2.4m × 2.6m',
        capacity: '37.4 cu m',
        price: container.startingPrice
      })
      window.location.href = `/purchase?${params.toString()}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Container Solutions
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Browse our complete range of container solutions. Each container can be rented or purchased to suit your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Container Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredContainers.map((container) => {
            const IconComponent = container.icon
            return (
              <div key={container.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={container.image}
                    alt={container.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  {container.popular && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{container.name}</h3>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{container.description}</p>
                  
                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                    <ul className="space-y-1">
                      {container.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {container.sizes.map((size, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {container.rentalPeriods && (
                    <div className="mb-3 sm:mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Rental Periods:</h4>
                      <div className="flex flex-wrap gap-1">
                        {container.rentalPeriods.map((period, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {period}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-blue-600">{container.startingPrice}</span>
                      <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      onClick={() => handleContainerAction(container, 'rent')}
                      className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Rent Now</span>
                      <span className="sm:hidden">Rent</span>
                    </button>
                    <button
                      onClick={() => handleContainerAction(container, 'buy')}
                      className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Buy Now</span>
                      <span className="sm:hidden">Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Need Help Choosing?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Our experts are here to help you find the perfect container solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => setShowBranchModal(true)}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              Find a Branch
            </button>
            <Link
              href="/contact"
              className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Branch Location Modal */}
      {showBranchModal && (
        <BranchLocationModal
          isOpen={showBranchModal}
          onClose={() => setShowBranchModal(false)}
        />
      )}
    </div>
  )
}

export default ContainersPage
