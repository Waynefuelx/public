'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import { rentalProducts, siteConfig } from '@/lib/site-config'

const ContainerTypes = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Container Types &amp; Specifications
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            No room for compromise — only quality containers. Choose from our full range of
            on-site solutions, each delivered, set up and ready to use. {siteConfig.company.taglineLong}
          </p>
        </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {rentalProducts.map((product) => {
              const Icon = (Icons as any)[product.icon] ?? Icons.Package
              return (
              <div
                key={product.id}
                className="card hover:shadow-soft transition-all duration-300 group"
              >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-right">
                  {product.monthlyPrice && (
                    <>
                      <div className="text-2xl font-bold text-primary-600">
                        From R{product.monthlyPrice}
                      </div>
                      <div className="text-sm text-gray-500">per month</div>
                    </>
                  )}
                </div>
              </div>

              {/* Container Image */}
              {product.image && (
                <div className="mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-64 object-contain rounded-lg shadow-sm"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Content */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>

                {/* Specifications */}
                <div className="space-y-3 mb-4">
                  {product.dimensions && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dimensions:</span>
                      <span className="font-medium">{product.dimensions}</span>
                    </div>
                  )}
                  {product.capacity && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="font-medium">{product.capacity}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sizes:</span>
                    <span className="font-medium">{product.sizes.join(', ')}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, featureIndex) => (
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
                {product.rental && (
                  <Link
                    href={`/booking?container=${product.id}&type=${encodeURIComponent(product.name)}&category=${product.category}${product.dimensions ? `&dimensions=${encodeURIComponent(product.dimensions)}` : ''}${product.capacity ? `&capacity=${encodeURIComponent(product.capacity)}` : ''}${product.monthlyPrice ? `&price=${product.monthlyPrice}` : ''}`}
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
  )
}

export default ContainerTypes
