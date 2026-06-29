'use client'

import { useState } from 'react'

import {
  Wrench,
  Building2,
  Package,
  Users,
  Coffee,
  GraduationCap,
  Truck,
  Sun,
  Droplets,
  Star,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  HeartPulse,
  Zap,
  ShoppingCart,
  Boxes
} from 'lucide-react'
import Link from 'next/link'
import BranchLocationModal from '@/components/BranchLocationModal'
import ConversionQuoteModal from '@/components/ConversionQuoteModal'
import { siteConfig } from '@/lib/site-config'

// Resolve industry icon-name strings (from siteConfig) to lucide components.
const industryIconMap: Record<string, any> = {
  GraduationCap,
  HeartPulse,
  Sun,
  Zap,
  Droplets,
  ShoppingCart,
  Truck,
}

const ConversionsPage = () => {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)
  const [isConversionQuoteModalOpen, setIsConversionQuoteModalOpen] = useState(false)
  const [selectedConversionType, setSelectedConversionType] = useState<string>('')

  const { company } = siteConfig

  // Topshell's core service offerings.
  const coreServices = [
    {
      id: 1,
      name: 'Container Rentals',
      description: 'Flexible monthly rentals of on-site storage, offices, accommodation, ablutions, canteens and more — delivered and set up on your site.',
      icon: Package,
      features: [
        'On-site storage & offices',
        'Accommodation & ablutions',
        'Flexible monthly terms',
        'On-site delivery & collection',
        'Best value, guaranteed'
      ],
      image: '/products/storage-6m.webp',
      popular: true
    },
    {
      id: 2,
      name: 'Custom Containers & Conversions',
      description: 'Built to your spec by our in-house CAD design, engineering and conversion workshops — from site offices to specialised facilities.',
      icon: Wrench,
      features: [
        'In-house CAD design',
        'Engineering & conversion workshops',
        'Electrical & plumbing fitted',
        'Tested ready-to-use on delivery',
        'Multi-industry experience'
      ],
      image: '/products/custom.png',
      popular: true
    },
    {
      id: 3,
      name: 'Self-Storage',
      description: 'Secure, affordable self-storage in steel containers — short or long term, with easy access whenever you need it.',
      icon: Boxes,
      features: [
        'Secure steel units',
        'Short & long term',
        'Easy access',
        'Wind & watertight',
        'Affordable rates'
      ],
      image: '/products/self-storage.png',
      popular: false
    },
    {
      id: 4,
      name: 'Container Sales',
      description: 'New and pre-owned shipping containers for sale, delivered across South Africa — conversion-ready and built to last.',
      icon: ShoppingCart,
      features: [
        'New & used containers',
        'Wind & watertight',
        'Delivered nationwide',
        'Conversion-ready',
        'Graded & inspected'
      ],
      image: '/products/storage-6m.webp',
      popular: false
    }
  ]

  // Container conversions Topshell delivers from its in-house workshops.
  const conversionTypes = [
    {
      id: 1,
      name: 'Site Offices',
      description: 'Professional office spaces converted from containers, perfect for construction sites and temporary workspaces.',
      icon: Building2,
      features: [
        'Fully equipped workstations',
        'Air conditioning & heating',
        'Electrical & internet ready',
        'Security features',
        'Quick setup & removal'
      ],
      image: '/products/office-insulated.png',
      popular: true
    },
    {
      id: 2,
      name: 'Free-standing / Mobile Office Units',
      description: 'Independent office solutions that can be positioned anywhere on your property with full mobility.',
      icon: Building2,
      features: [
        'Self-contained units',
        'Easy relocation',
        'Professional appearance',
        'Customizable layouts',
        'Cost-effective solution'
      ],
      image: '/products/office-split.png',
      popular: false
    },
    {
      id: 3,
      name: 'Specialised Storage Solutions',
      description: 'Custom storage containers designed for specific industries and unique storage requirements.',
      icon: Package,
      features: [
        'Industry-specific designs',
        'Climate control options',
        'Security enhancements',
        'Custom shelving',
        'Accessibility features'
      ],
      image: '/products/storage-shed.png',
      popular: false
    },
    {
      id: 4,
      name: 'Accommodation Units',
      description: 'Comfortable living spaces converted from containers, perfect for workers, students, or temporary housing.',
      icon: Users,
      features: [
        'Sleeping quarters',
        'Basic amenities',
        'Climate control',
        'Security features',
        'Flexible configurations'
      ],
      image: '/products/sleeper.png',
      popular: true
    },
    {
      id: 5,
      name: 'Ablution Facilities',
      description: 'Sanitation and hygiene facilities converted from containers for construction sites and events.',
      icon: Droplets,
      features: [
        'Bathroom facilities',
        'Shower units',
        'Hygiene stations',
        'Water management',
        'Easy maintenance'
      ],
      image: '/products/ablution-6m.png',
      popular: false
    },
    {
      id: 6,
      name: 'Mobile Workshops',
      description: 'Fully equipped workshop spaces that can be moved to different locations as needed.',
      icon: Wrench,
      features: [
        'Workbench areas',
        'Tool storage',
        'Power distribution',
        'Ventilation systems',
        'Mobile capability'
      ],
      image: '/products/office-uninsulated.png',
      popular: false
    },
    {
      id: 7,
      name: 'Pre-schools / Classrooms',
      description: 'Educational spaces converted from containers, providing safe learning environments.',
      icon: GraduationCap,
      features: [
        'Child-safe design',
        'Educational layouts',
        'Natural lighting',
        'Safety features',
        'Easy maintenance'
      ],
      image: '/products/conference-pod.png',
      popular: false
    },
    {
      id: 8,
      name: 'Canteens & Soup Kitchens',
      description: 'Food service facilities converted from containers for site canteens and community feeding programs.',
      icon: Coffee,
      features: [
        'Kitchen equipment',
        'Serving areas',
        'Storage space',
        'Hygiene facilities',
        'Stainless-steel worktops'
      ],
      image: '/products/canteen.png',
      popular: false
    },
    {
      id: 9,
      name: 'Remote Solar Grids',
      description: 'Solar power installations integrated into containers for off-grid renewable energy solutions.',
      icon: Sun,
      features: [
        'Solar panel integration',
        'Battery storage',
        'Power distribution',
        'Monitoring systems',
        'Off-grid capability'
      ],
      image: '/products/security-hut.png',
      popular: false
    },
    {
      id: 10,
      name: 'Refrigeration Units',
      description: 'Walk-in refrigeration units converted from containers for reliable on-site cold storage.',
      icon: Droplets,
      features: [
        'Walk-in cold storage',
        'Temperature controlled',
        'Heavy-duty insulation',
        'Reliable refrigeration',
        'Mobile deployment'
      ],
      image: '/products/refrigeration.png',
      popular: false
    },
    {
      id: 11,
      name: 'Promotion Stands / Site Branding',
      description: 'Marketing and promotional spaces converted from containers for brand visibility.',
      icon: Building2,
      features: [
        'Brand integration',
        'Display areas',
        'Interactive elements',
        'Mobile deployment',
        'Custom graphics'
      ],
      image: '/products/conference-pod.png',
      popular: false
    },
    {
      id: 12,
      name: 'Water Purification Systems',
      description: 'Water treatment facilities converted from containers for clean water production.',
      icon: Droplets,
      features: [
        'Filtration systems',
        'Treatment processes',
        'Storage tanks',
        'Monitoring equipment',
        'Mobile deployment'
      ],
      image: '/products/storage-shed.png',
      popular: false
    }
  ]

  // Industries Topshell serves — sourced from the central config so the
  // services and containers pages stay in sync.
  const industries = siteConfig.industries

  const regions = siteConfig.regions

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
              Our Services
              <span className="block text-primary-100">Rentals · Conversions · Self-Storage · Sales</span>
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              With around {company.yearsExperience} years' experience, {company.name} delivers container rentals,
              custom conversions, self-storage and sales — backed by in-house CAD design and engineering workshops.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <button
                onClick={() => {
                  setSelectedConversionType('')
                  setIsConversionQuoteModalOpen(true)
                }}
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
              >
                Get A Quote
              </button>
              <button
                onClick={() => setIsBranchModalOpen(true)}
                className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 border-white text-primary-500 hover:bg-white hover:text-primary-500 w-full sm:w-auto"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Four core services to cover every container need — all with {company.tagline.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {coreServices.map((service) => (
              <div
                key={service.id}
                className="bg-gray-50 rounded-xl border border-gray-100 p-6 sm:p-8 hover:border-primary-300 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              CUSTOM CONTAINERS & CONVERSIONS
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Transform a standard container into a versatile, functional space with our expert in-house conversions.
              Whatever your need for modified shipping containers, our CAD design, engineering and conversion workshops
              bring your vision to life — handling everything from design to sourcing appliances and furniture.
            </p>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <p className="text-primary-800 font-medium">
                Every modified container is thoroughly tested, including electrical and plumbing,
                to ensure it's ready for immediate use upon delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Types Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Shipping Container Conversions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From office spaces to specialised facilities, we can convert containers for any purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {conversionTypes.map((conversion, index) => (
              <div
                key={conversion.id}
                className="bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                {/* Conversion Image */}
                <div className="w-full h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={conversion.image}
                    alt={conversion.name}
                    className="w-full h-full object-contain scale-110 group-hover:scale-115 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextSibling = e.currentTarget.nextElementSibling;
                      if (nextSibling) {
                        (nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <conversion.icon className="w-16 h-16 text-gray-400" />
                  </div>
                </div>

                {/* Conversion Header */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                      <conversion.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    {conversion.popular && (
                      <span className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Conversion Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {conversion.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {conversion.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {conversion.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <a
                    href={`mailto:${company.primaryEmail}?subject=Container Services Quote Request&body=Hi, I would like to request a quote for container services. Please contact me with more information about your services and pricing.`}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full text-center inline-flex items-center justify-center group"
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

      {/* Industries Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From education to FMCG, our containers and conversions support a wide range of sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-6">
            {industries.map((industry) => {
              const Icon = industryIconMap[industry.icon] ?? Boxes
              return (
                <div
                  key={industry.name}
                  className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 text-center hover:border-primary-300 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{industry.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Get in touch with us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Contact us by phone for immediate live assistance – or send us an email.
              We'll get back to you as soon as we can.
            </p>
            <p className="text-lg text-gray-700">
              Get in touch with any of our regions to arrange a visit to our depot or to discuss your specific requirements.
            </p>
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {regions.map((region) => (
              <div
                key={region.id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {region.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {region.city}
                    </p>

                    {/* Address(es) — Southern Cape has two depots */}
                    {region.depots ? (
                      <div className="space-y-2 mb-3">
                        {region.depots.map((depot) => (
                          <div key={depot.name} className="text-sm text-gray-600">
                            <span className="font-medium text-gray-900">{depot.name}: </span>
                            {depot.addressLines.join(', ')}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 mb-3">{region.addressLines.join(', ')}</p>
                    )}

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary-600" />
                        <a
                          href={`tel:${region.phone}`}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                        >
                          {region.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary-600" />
                        <a
                          href={`mailto:${region.email}`}
                          className="text-primary-600 hover:text-primary-800 transition-colors break-all"
                          title={`Click to email ${region.email}`}
                        >
                          {region.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-600" />
                        <span className="text-gray-600">{region.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Get your quote today!
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Ready to transform your container into something extraordinary?
            Contact our team today to discuss your conversion needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href={`mailto:${company.primaryEmail}?subject=Container Conversion Quote Request&body=Hi, I would like to request a quote for container conversion services. Please contact me with more information about your conversion options and pricing.`}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto inline-block text-center"
            >
              Get A Quote
            </a>
            <button
              onClick={() => setIsBranchModalOpen(true)}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Branch Location Modal */}
      <BranchLocationModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />

      {/* Conversion Quote Modal */}
      <ConversionQuoteModal
        isOpen={isConversionQuoteModalOpen}
        onClose={() => setIsConversionQuoteModalOpen(false)}
        conversionType={selectedConversionType}
      />
    </div>
  )
}

export default ConversionsPage
