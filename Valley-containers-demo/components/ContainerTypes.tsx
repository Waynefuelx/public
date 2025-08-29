'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Truck, Package, Thermometer, Ruler } from 'lucide-react'

const ContainerTypes = () => {
  const containerTypes = [
    {
      id: '20ft-standard',
      name: '20ft Standard Container',
      description: 'The most popular container size, perfect for general cargo, storage, and shipping.',
      dimensions: '20\' × 8\' × 8.5\'',
      capacity: '1,170 cu ft',
      weight: '5,000 lbs',
      features: ['Weather resistant', 'Stackable', 'ISO certified', 'Easy transport'],
      price: 150,
      rental: true,
      purchase: true,
      icon: Package
    },
    {
      id: '40ft-standard',
      name: '40ft Standard Container',
      description: 'Large capacity container ideal for bulk shipments, construction projects, and storage.',
      dimensions: '40\' × 8\' × 8.5\'',
      capacity: '2,390 cu ft',
      weight: '8,000 lbs',
      features: ['High capacity', 'Cost effective', 'Versatile use', 'Strong construction'],
      price: 250,
      rental: true,
      purchase: true,
      icon: Package
    },
    {
      id: '40ft-high-cube',
      name: '40ft High Cube',
      description: 'Extra height container for oversized items, machinery, and tall equipment.',
      dimensions: '40\' × 8\' × 9.5\'',
      capacity: '2,694 cu ft',
      weight: '8,500 lbs',
      features: ['Extra height', 'Oversized cargo', 'Machinery storage', 'Flexible loading'],
      price: 275,
      rental: true,
      purchase: true,
      icon: Ruler
    },
    {
      id: '20ft-reefer',
      name: '20ft Refrigerated',
      description: 'Temperature controlled container for perishable goods, food, and pharmaceuticals.',
      dimensions: '20\' × 8\' × 8.5\'',
      capacity: '1,170 cu ft',
      weight: '6,000 lbs',
      features: ['Temperature control', 'Insulated walls', 'Fresh air vents', 'Monitoring system'],
      price: 200,
      rental: true,
      purchase: false,
      icon: Thermometer
    },
    {
      id: '40ft-open-top',
      name: '40ft Open Top',
      description: 'Open top container for easy loading of tall or heavy items from above.',
      dimensions: '40\' × 8\' × 8.5\'',
      capacity: '2,390 cu ft',
      weight: '8,000 lbs',
      features: ['Open top loading', 'Crane accessible', 'Heavy machinery', 'Flexible loading'],
      price: 300,
      rental: true,
      purchase: true,
      icon: Package
    },
    {
      id: '20ft-flat-rack',
      name: '20ft Flat Rack',
      description: 'Flat rack container for oversized, heavy, or awkwardly shaped cargo.',
      dimensions: '20\' × 8\' × 8.5\'',
      capacity: '1,170 cu ft',
      weight: '5,000 lbs',
      features: ['Open sides', 'Heavy duty', 'Oversized cargo', 'Easy loading'],
      price: 175,
      rental: true,
      purchase: false,
      icon: Package
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
            <motion.div
              key={container.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
            </motion.div>
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
