'use client'


import {
  Building2,
  CheckCircle,
  ArrowRight,
  Star,
  Package,
  Shield,
  Truck,
  Wrench,
  Clock,
  MapPin
} from 'lucide-react'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { siteConfig, purchaseProducts } from '@/lib/site-config'

// Quote mailto link, built from the central site config.
const quoteMailto = `mailto:${siteConfig.company.primaryEmail}?subject=Container Sales Quote Request&body=Hi, I would like to request a quote for container purchase. Please contact me with more information about pricing and availability.`

const SalesServicesPage = () => {
  // Sales catalog, sourced from the central site config (New 6m / Used 6m /
  // Custom Modified). Each card keeps the same shape the markup expects.
  const salesOptions = purchaseProducts
    .filter((product) => product.category === 'sales')
    .map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      sizes: product.sizes,
      pricing: product.purchasePrice
        ? `From R${product.purchasePrice.toLocaleString()}`
        : 'Custom quote',
      features: product.features,
      icon: (Icons as any)[product.icon] ?? Icons.Package,
      popular: product.popular ?? false,
    }))

  const benefits = [
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'All containers undergo rigorous quality inspection'
    },
    {
      icon: Clock,
      title: 'Quick Delivery',
      description: 'Fast delivery across South Africa'
    },
    {
      icon: Wrench,
      title: 'Custom Modifications',
      description: 'Tailored solutions for your specific needs'
    },
    {
      icon: MapPin,
      title: 'Nationwide Service',
      description: 'Service available across all provinces'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="text-center">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            >
              Container Sales
              <span className="block text-primary-100">Own Your Solution</span>
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              Purchase new or used containers for permanent use. Quality guaranteed 
              with warranty options and custom modifications available.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <a
                href={quoteMailto}
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto inline-block text-center"
              >
                Get Quote
              </a>
              <Link 
                href="/services"
                className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 border-white text-white hover:bg-white hover:text-primary-500 w-full sm:w-auto"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Buy from {siteConfig.company.name}?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the {siteConfig.company.name} difference with our quality containers and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sales Options Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sales Options
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of container sales options to meet your specific requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {salesOptions.map((option, index) => (
              <div
                key={option.id}
                className="bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <option.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    {option.popular && (
                      <span className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {option.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {option.sizes.map((size) => (
                        <span key={size} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {option.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="text-lg font-semibold text-primary-600">
                      {option.pricing}
                    </div>
                  </div>

                  <a
                    href={quoteMailto}
                    className="btn-primary w-full text-center group-hover:bg-primary-600 transition-colors duration-200 inline-block"
                  >
                    Get Quote
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Purchase
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple process makes purchasing containers easy and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Select Container',
                description: 'Choose from our range of new, used, or custom containers.'
              },
              {
                step: '2',
                title: 'Get Quote',
                description: 'Contact us for a detailed quote including delivery and modifications.'
              },
              {
                step: '3',
                title: 'Customize',
                description: 'Discuss any modifications or custom requirements with our team.'
              },
              {
                step: '4',
                title: 'Purchase & Delivery',
                description: 'Complete payment and we\'ll deliver your container to your location.'
              }
            ].map((step, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Purchase?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact our sales team today to discuss your container needs and get a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={quoteMailto}
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-500 hover:bg-secondary-100 w-full sm:w-auto inline-block text-center"
            >
              Get Quote
            </a>
            <Link 
              href="/services"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SalesServicesPage
