'use client'

import { useState } from 'react'
import Link from 'next/link'
import BranchLocationModal from '@/components/BranchLocationModal'
import { siteConfig, type Product } from '@/lib/site-config'
import {
  Package,
  Warehouse,
  Briefcase,
  Users,
  BedDouble,
  ShowerHead,
  UtensilsCrossed,
  Thermometer,
  ShieldCheck,
  Wrench,
  Calendar,
  MapPin,
  Mail,
  CheckCircle,
  Star,
  GraduationCap,
  HeartPulse,
  Sun,
  Zap,
  Droplets,
  ShoppingCart,
  Truck,
  Boxes,
} from 'lucide-react'

const iconMap: Record<string, any> = {
  Package,
  Warehouse,
  Briefcase,
  Users,
  BedDouble,
  ShowerHead,
  UtensilsCrossed,
  Thermometer,
  ShieldCheck,
  Wrench,
}

// Resolve industry icon-name strings (from siteConfig.industries) to lucide components.
const industryIconMap: Record<string, any> = {
  GraduationCap,
  HeartPulse,
  Sun,
  Zap,
  Droplets,
  ShoppingCart,
  Truck,
}

const priceLabel = (p: Product): string => {
  if (p.rental && p.monthlyPrice) return `From R${p.monthlyPrice.toLocaleString('en-ZA')}/mo`
  if (p.purchasePrice) return `From R${p.purchasePrice.toLocaleString('en-ZA')}`
  return 'POA'
}

const ContainersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showBranchModal, setShowBranchModal] = useState(false)

  const categories = [
    { id: 'all', name: 'All' },
    ...siteConfig.productCategories.map((c) => ({ id: c.id, name: c.label })),
    { id: 'sales', name: 'For Sale' },
  ]

  const filteredContainers = siteConfig.products.filter(
    (container) => selectedCategory === 'all' || container.category === selectedCategory,
  )

  const handleContainerAction = (container: Product, action: 'rent' | 'buy') => {
    const params = new URLSearchParams({
      container: container.id,
      type: container.name,
      category: action === 'rent' ? 'Rental' : 'Purchase',
      dimensions: container.dimensions || container.sizes[0] || '6m × 2.4m × 2.6m',
      capacity: container.capacity || '',
      price: priceLabel(container),
    })
    window.location.href = `/${action === 'rent' ? 'booking' : 'purchase'}?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-secondary-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-900 mb-3 sm:mb-4">
              Container Solutions
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-secondary-600 max-w-3xl mx-auto px-2">
              Browse our complete range of {siteConfig.company.shortName} containers — each can be rented or
              purchased to suit your site. {siteConfig.company.taglineLong}
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
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-700 hover:bg-secondary-100 border border-secondary-300'
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
            const IconComponent = iconMap[container.icon] ?? Package
            return (
              <div
                key={container.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={container.image}
                    alt={container.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  {container.popular && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-warning-400 text-warning-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-secondary-900">{container.name}</h3>
                  </div>

                  <p className="text-sm sm:text-base text-secondary-600 mb-3 sm:mb-4">{container.description}</p>

                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-semibold text-secondary-900 mb-2 text-sm sm:text-base">Features:</h4>
                    <ul className="space-y-1">
                      {container.features.slice(0, 4).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-xs sm:text-sm text-secondary-600"
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-semibold text-secondary-900 mb-2 text-sm sm:text-base">
                      Available Sizes:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {container.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-primary-600">
                        {priceLabel(container)}
                      </span>
                      {!container.rental && container.purchase && (
                        <span className="text-secondary-500 text-xs sm:text-sm ml-1">excl. VAT</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`grid gap-2 sm:gap-3 ${container.rental && container.purchase ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {container.rental && (
                      <button
                        onClick={() => handleContainerAction(container, 'rent')}
                        className="bg-primary-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                      >
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        Rent
                      </button>
                    )}
                    {container.purchase && (
                      <button
                        onClick={() => handleContainerAction(container, 'buy')}
                        className="bg-primary-800 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-primary-900 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                      >
                        <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                        Buy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Industries We Serve */}
      <section className="py-12 sm:py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-3 sm:mb-4">
              Industries We Serve
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-secondary-600 max-w-3xl mx-auto">
              From education to FMCG, our containers and conversions support a wide range of sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-6">
            {siteConfig.industries.map((industry) => {
              const Icon = industryIconMap[industry.icon] ?? Boxes
              return (
                <div
                  key={industry.name}
                  className="bg-white rounded-xl border border-secondary-200 p-4 sm:p-6 text-center hover:border-primary-300 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-secondary-800">{industry.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="bg-primary-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Need Help Choosing?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2 text-primary-100">
            Our experts are here to help you find the perfect container solution for your site.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => setShowBranchModal(true)}
              className="bg-white text-primary-700 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-secondary-100 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              Find a Branch
            </button>
            <Link
              href="/contact"
              className="bg-primary-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Branch Location Modal */}
      {showBranchModal && (
        <BranchLocationModal isOpen={showBranchModal} onClose={() => setShowBranchModal(false)} />
      )}
    </div>
  )
}

export default ContainersPage
