'use client'

import { useState } from 'react'
import BranchLocationModal from '@/components/BranchLocationModal'

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
  Thermometer
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
    sizes: ['6m x 2.4m', '12m x 2.4m', '6m', '12m'],
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
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)

  const filteredContainers = selectedCategory === 'All' 
    ? containerTypes 
    : containerTypes.filter(container => container.category === selectedCategory)

  return (
    <div className="min-h-screen bg-secondary-200">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Container Rental
            <span className="block text-primary-100">Solutions</span>
          </h1>
          <p 
            className="text-xl md:text-2xl text-primary-50 mb-8 max-w-3xl mx-auto"
          >
            Flexible, reliable container rentals for every need. From storage to luxury offices, we have the perfect solution.
          </p>
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

      {/* Container Types Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Container Types & Specifications
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Choose from our wide range of container types, each designed for specific use cases 
              and cargo requirements. All containers meet international standards and are regularly inspected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                id: '6m-storage',
                name: '6m Storage Container',
                description: 'Versatile storage container perfect for secure storage, moving, and general cargo.',
                dimensions: '6m × 2.4m × 2.6m',
                capacity: '37.4 cu m',
                weight: '2,268 kg',
                features: ['Weather resistant', 'Secure locking', 'Stackable', 'Easy access'],
                price: 125,
                rental: true,
                purchase: true,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png',
                category: 'Storage'
              },
              {
                id: '6m-office',
                name: '6m Office Container',
                description: 'Professional office space container, perfect for construction sites, events, and temporary workspaces.',
                dimensions: '6m × 2.4m × 2.6m',
                capacity: '37.4 cu m',
                weight: '2,800 kg',
                features: ['Insulated walls', 'Electrical fittings', 'Windows & doors', 'Office ready'],
                price: 450,
                category: 'Office',
                rental: true,
                purchase: true,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png'
              },
              {
                id: '6m-vip-office',
                name: '6m VIP Container Office',
                description: 'Premium office container with enhanced amenities and professional finish.',
                dimensions: '6m × 2.4m × 2.6m',
                capacity: '37.4 cu m',
                weight: '2,800 kg',
                features: ['Premium finish', 'Enhanced amenities', 'Professional design', 'VIP experience'],
                price: 550,
                rental: true,
                purchase: true,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/vipcontainer.png',
                category: 'Office'
              },
              {
                id: '6m-refrigeration',
                name: '6m Refrigeration Container',
                description: 'Temperature controlled container for perishable goods, food, and pharmaceuticals.',
                dimensions: '6m × 2.4m × 2.6m',
                capacity: '33.1 cu m',
                weight: '2,722 kg',
                features: ['Temperature control', 'Insulated walls', 'Fresh air vents', 'Monitoring system'],
                price: 200,
                rental: true,
                purchase: false,
                icon: Thermometer,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_refrigeration.png',
                category: 'Specialized'
              },
              {
                id: '3m-storage',
                name: '3m Storage Container',
                description: 'Compact storage container perfect for small spaces and limited storage needs.',
                dimensions: '3m × 2.4m × 2.6m',
                capacity: '18.7 cu m',
                weight: '1,134 kg',
                features: ['Compact size', 'Easy transport', 'Versatile use', 'Cost effective'],
                price: 75,
                rental: true,
                purchase: true,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/3m-storage-container.png',
                category: 'Storage'
              },
              {
                id: '6m-split',
                name: '6m Split Container',
                description: 'Divided container offering multiple compartments for organized storage.',
                dimensions: '6m × 2.4m × 2.6m',
                capacity: '37.4 cu m',
                weight: '2,268 kg',
                features: ['Multiple compartments', 'Organized storage', 'Flexible layout', 'Efficient use'],
                price: 175,
                rental: true,
                purchase: true,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_office.png',
                category: 'Storage'
              },
              {
                id: 'elite-mobile-office',
                name: 'Elite Mobile Site Office',
                description: 'Premium mobile office solution with advanced features and professional finish.',
                dimensions: '6m × 2.4m × 2.6m',
                capacity: '37.4 cu m',
                weight: '2,800 kg',
                features: ['Premium features', 'Mobile design', 'Professional finish', 'Advanced amenities'],
                price: 600,
                rental: true,
                purchase: true,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/Elite-office-unit.png',
                category: 'Office'
              },
              {
                id: '3m-ablution',
                name: '3m Ablution Container',
                description: 'Sanitation container with bathroom and shower facilities for construction sites and events.',
                dimensions: '3m × 2.4m × 2.6m',
                capacity: '18.7 cu m',
                weight: '1,134 kg',
                features: ['Bathroom facilities', 'Shower unit', 'Sanitation', 'Event ready'],
                price: 100,
                rental: true,
                purchase: false,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/Ablution-Container.png',
                category: 'Facilities'
              },
              {
                id: '6m-pavilion',
                name: '6m Pavilion Container',
                description: 'Open-sided container perfect for events, exhibitions, and temporary structures.',
                dimensions: '6m × 2.4m × 2.6m',
                capacity: '37.4 cu m',
                weight: '2,268 kg',
                features: ['Open sides', 'Event ready', 'Exhibition space', 'Temporary structures'],
                price: 200,
                rental: true,
                purchase: true,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-pavilion.png',
                category: 'Events'
              },
              {
                id: '6m-sleeper',
                name: '6m Sleeper Container',
                description: 'Sleeping accommodation container with beds and basic amenities for workers.',
                dimensions: '6m × 2.4m × 2.6m',
                capacity: '37.4 cu m',
                weight: '2,268 kg',
                features: ['Sleeping quarters', 'Basic amenities', 'Worker accommodation', 'Comfortable rest'],
                price: 150,
                rental: true,
                purchase: false,
                icon: Package,
                image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6-m-sleeper-container-2.png',
                category: 'Accommodation'
              }
            ].map((container, index) => (
              <div
                key={container.id}
                className="card hover:shadow-soft transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                    <container.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      R {container.price}
                    </div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                </div>

                {/* Container Image */}
                {container.image && (
                  <div className="mb-4">
                    <img
                      src={container.image}
                      alt={container.name}
                      className="w-full h-auto max-h-64 object-contain rounded-lg shadow-sm"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {container.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {container.description}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dimensions:</span>
                      <span className="font-medium">{container.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="font-medium">{container.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Weight Limit:</span>
                      <span className="font-medium">{container.weight}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {container.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {container.rental && (
                    <Link
                      href={`/booking?container=${container.id}&type=${container.name}&category=${container.category}&dimensions=${encodeURIComponent(container.dimensions)}&capacity=${encodeURIComponent(container.capacity)}&price=${container.price}`}
                      className="btn-primary flex-1 text-sm w-full text-center"
                    >
                      Rent Now
                    </Link>
                  )}
                </div>

                {/* Availability Badge */}
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                    Available
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-secondary-200 rounded-xl p-6 sm:p-8 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 px-4">
                We offer custom container modifications, specialized equipment, and tailored solutions 
                for unique requirements. Our engineering team can design containers to meet your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link 
                  href="/rental"
                  className="btn-primary"
                >
                  View All Rentals
                </Link>
                <a 
                  href="mailto:info@valleycontainers.co.za?subject=Custom Container Quote Request&body=Hi, I would like to request a custom quote for container modifications or specialized solutions. Please contact me with more information."
                  className="btn-secondary inline-block text-center"
                >
                  Request Custom Quote
                </a>
              </div>
            </div>
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
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
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
            <button 
              onClick={() => setIsBranchModalOpen(true)}
              className="btn-secondary text-lg px-8 py-3 border-white text-primary-500 hover:bg-white hover:text-primary-500"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Container Details Modal */}
      {selectedContainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
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
                    <a
                      href="mailto:info@valleycontainers.co.za?subject=Container Rental Quote Request&body=Hi, I would like to request a quote for container rental. Please contact me with more information about pricing and availability."
                      className="flex-1 bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center inline-block"
                    >
                      Get Quote
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Branch Location Modal */}
      <BranchLocationModal 
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />
    </div>
  )
}
