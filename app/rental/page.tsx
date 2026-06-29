'use client'

import { useState } from 'react'
import BranchLocationModal from '@/components/BranchLocationModal'
import * as Icons from 'lucide-react'

import {
  Calendar,
  MapPin,
  Phone,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'
import { rentalProducts, siteConfig, type Product } from '@/lib/site-config'

// Category filter list aligned with siteConfig.productCategories (only those that
// actually have rental products), prefixed with an "All" option.
const rentalCategoryIds = new Set(rentalProducts.map((p) => p.category))
const categories = [
  { id: 'all', label: 'All' },
  ...siteConfig.productCategories.filter((c) => rentalCategoryIds.has(c.id)),
]

export default function RentalPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedContainer, setSelectedContainer] = useState<Product | null>(null)
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)

  const filteredContainers =
    selectedCategory === 'all'
      ? rentalProducts
      : rentalProducts.filter((product) => product.category === selectedCategory)

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
            Your search for high-quality container rentals ends here. From storage to insulated
            offices, {siteConfig.company.name} delivers a one-stop shop for complete site establishment.
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
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-secondary-200 text-secondary-700 hover:bg-secondary-300'
                }`}
              >
                {category.label}
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
              Container Types &amp; Specifications
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              No room for compromise — only quality containers. Every unit is delivered, set up and
              ready to use. {siteConfig.company.taglineLong}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredContainers.map((container) => {
              const Icon = (Icons as any)[container.icon] ?? Icons.Package
              return (
              <div
                key={container.id}
                className="card hover:shadow-soft transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-right">
                    {container.monthlyPrice && (
                      <>
                        <div className="text-2xl font-bold text-primary-600">
                          From R{container.monthlyPrice}
                        </div>
                        <div className="text-sm text-gray-500">per month</div>
                      </>
                    )}
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
                    {container.dimensions && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Dimensions:</span>
                        <span className="font-medium">{container.dimensions}</span>
                      </div>
                    )}
                    {container.capacity && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Capacity:</span>
                        <span className="font-medium">{container.capacity}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Sizes:</span>
                      <span className="font-medium">{container.sizes.join(', ')}</span>
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
                      href={`/booking?container=${container.id}&type=${encodeURIComponent(container.name)}&category=${container.category}${container.dimensions ? `&dimensions=${encodeURIComponent(container.dimensions)}` : ''}${container.capacity ? `&capacity=${encodeURIComponent(container.capacity)}` : ''}${container.monthlyPrice ? `&price=${container.monthlyPrice}` : ''}`}
                      className="btn-primary flex-1 text-sm w-full text-center"
                    >
                      Rent Now
                    </Link>
                  )}
                  <button
                    onClick={() => setSelectedContainer(container)}
                    className="btn-secondary flex-1 text-sm w-full text-center"
                  >
                    View Details
                  </button>
                </div>

                {/* Availability Badge */}
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                    Available
                  </span>
                </div>
              </div>
              )
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-secondary-200 rounded-xl p-6 sm:p-8 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 px-4">
                We offer custom container modifications, specialized equipment, and tailored solutions
                for unique requirements. Our in-house CAD design and engineering team can build containers to your exact spec.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Link
                  href="/rental"
                  className="btn-primary"
                >
                  View All Rentals
                </Link>
                <a
                  href={`mailto:${siteConfig.company.primaryEmail}?subject=Custom Container Quote Request&body=Hi, I would like to request a custom quote for container modifications or specialized solutions. Please contact me with more information.`}
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
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Why Choose {siteConfig.company.name}?</h2>
            <p className="text-lg text-secondary-600">Best service and value for your money, guaranteed — with {siteConfig.company.yearsExperience} years of experience behind every rental</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Flexible Rental Terms',
                description: 'Short or long-term rentals to suit your project, with on-site delivery and collection'
              },
              {
                icon: MapPin,
                title: 'Nationwide Delivery',
                description: 'We deliver across South Africa from our depots in the Western Cape, Southern Cape, Gauteng and Mpumalanga'
              },
              {
                icon: Phone,
                title: 'Dedicated Support',
                description: 'A friendly team ready to help you find the perfect solution for your site'
              },
              {
                icon: CheckCircle,
                title: 'Quality Guaranteed',
                description: 'No room for compromise — only quality containers, every time'
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
                    <h3 className="font-semibold text-secondary-900 mb-2">Specifications</h3>
                    <div className="space-y-2">
                      {selectedContainer.dimensions && (
                        <div className="text-sm text-primary-700 bg-primary-100 px-3 py-2 rounded">
                          {selectedContainer.dimensions}
                        </div>
                      )}
                      {selectedContainer.capacity && (
                        <div className="text-sm text-primary-700 bg-primary-100 px-3 py-2 rounded">
                          {selectedContainer.capacity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-secondary-200 pt-6">
                  <div className="flex items-center justify-between mb-6">
                    {selectedContainer.monthlyPrice && (
                      <div>
                        <span className="text-sm text-secondary-500">Starting from</span>
                        <div className="text-3xl font-bold text-primary-500">From R{selectedContainer.monthlyPrice}/month</div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/booking?container=${selectedContainer.id}&type=${encodeURIComponent(selectedContainer.name)}&category=${selectedContainer.category}`}
                      className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                    >
                      Rent Now
                    </Link>
                    <a
                      href={`mailto:${siteConfig.company.primaryEmail}?subject=Container Rental Quote Request&body=Hi, I would like to request a quote for container rental. Please contact me with more information about pricing and availability.`}
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
