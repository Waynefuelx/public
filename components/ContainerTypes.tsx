'use client'

import Link from 'next/link'
import { Truck, Package, Thermometer, Ruler } from 'lucide-react'

const ContainerTypes = () => {
  const containerTypes: Array<{
    id: string
    name: string
    description: string
    dimensions: string
    capacity: string
    weight: string
    features: string[]
    price: number
    rental: boolean
    purchase: boolean
    icon: any
    image?: string
  }> = [
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png'
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/vipcontainer.png'
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_refrigeration.png'
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/3m-storage-container.png'
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_office.png'
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/Elite-office-unit.png'
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/Ablution-Container.png'
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-pavilion.png'
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6-m-sleeper-container-2.png'
    }
  ]

  return (
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
            {containerTypes.map((container, index) => (
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
                  <button className="btn-primary flex-1 text-sm w-full">
                    Rent Now
                  </button>
                )}
                {container.purchase && (
                  <Link
                    href="/rental"
                    className="btn-secondary flex-1 text-sm w-full text-center"
                  >
                    Get Quote
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
              <button className="btn-secondary">
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContainerTypes
