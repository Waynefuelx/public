'use client'


import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Package,
  Shield,
  Navigation,
  Globe,
  Phone,
  Mail
} from 'lucide-react'
import Link from 'next/link'

const LogisticsServicesPage = () => {
  const logisticsServices = [
    {
      id: 1,
      name: 'Container Delivery',
      description: 'Professional delivery service for containers to any location across South Africa',
      features: [
        'Nationwide coverage',
        'Professional drivers',
        'Real-time tracking',
        'Insurance included',
        'Flexible scheduling'
      ],
      pricing: 'From R500',
      icon: Truck,
      popular: true
    },
    {
      id: 2,
      name: 'Container Pickup',
      description: 'Scheduled pickup service for returning or relocating containers',
      features: [
        'Scheduled pickups',
        'Professional handling',
        'Damage assessment',
        'Documentation',
        'Flexible timing'
      ],
      pricing: 'From R400',
      icon: Package,
      popular: false
    },
    {
      id: 3,
      name: 'Site Logistics',
      description: 'Comprehensive logistics support for construction and industrial sites',
      features: [
        'Site planning',
        'Equipment coordination',
        'Safety compliance',
        'Project management',
        '24/7 support'
      ],
      pricing: 'Custom quote',
      icon: Navigation,
      popular: false
    },
    {
      id: 4,
      name: 'International Shipping',
      description: 'Container shipping services for international destinations',
      features: [
        'Port coordination',
        'Customs clearance',
        'Documentation support',
        'Tracking systems',
        'Insurance options'
      ],
      pricing: 'Custom quote',
      icon: Globe,
      popular: false
    }
  ]

  const coverage = [
    {
      region: 'Western Cape',
      cities: ['Cape Town', 'George', 'Stellenbosch', 'Paarl', 'Worcester'],
      icon: MapPin
    },
    {
      region: 'Gauteng',
      cities: ['Johannesburg', 'Pretoria', 'Centurion', 'Sandton', 'Midrand'],
      icon: MapPin
    },
    {
      region: 'KwaZulu-Natal',
      cities: ['Durban', 'Pietermaritzburg', 'Ballito', 'Umhlanga', 'Richards Bay'],
      icon: MapPin
    },
    {
      region: 'Eastern Cape',
      cities: ['Port Elizabeth', 'East London', 'Mthatha', 'Queenstown', 'Grahamstown'],
      icon: MapPin
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
              Logistics & Delivery
              <span className="block text-primary-100">Nationwide Service</span>
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              Comprehensive logistics solutions including delivery, pickup, and transportation 
              services across South Africa and beyond.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <a 
                href="mailto:info@valleycontainers.co.za?subject=Container Logistics Quote Request&body=Hi, I would like to request a quote for container logistics services. Please contact me with more information about pricing and delivery options."
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

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                9
              </div>
              <div className="text-sm sm:text-base text-gray-600">Provinces</div>
            </div>
            <div
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                24/7
              </div>
              <div className="text-sm sm:text-base text-gray-600">Support</div>
            </div>
            <div
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                50+
              </div>
              <div className="text-sm sm:text-base text-gray-600">Cities</div>
            </div>
            <div
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                100%
              </div>
              <div className="text-sm sm:text-base text-gray-600">Insured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Logistics Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive logistics solutions designed to meet your transportation and delivery needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {logisticsServices.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    {service.popular && (
                      <span className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="text-lg font-semibold text-primary-600">
                      {service.pricing}
                    </div>
                  </div>

                  <a
                    href="mailto:info@valleycontainers.co.za?subject=Container Logistics Quote Request&body=Hi, I would like to request a quote for container logistics services. Please contact me with more information about pricing and delivery options."
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

      {/* Coverage Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nationwide Coverage
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We provide logistics services across all provinces in South Africa with local expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coverage.map((region, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-soft p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <region.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {region.region}
                </h3>
                <div className="space-y-1">
                  {region.cities.map((city, cityIndex) => (
                    <p key={cityIndex} className="text-sm text-gray-600">
                      {city}
                    </p>
                  ))}
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
              How Our Logistics Work
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures efficient and reliable logistics services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Request Service',
                description: 'Contact us with your logistics requirements and timeline.'
              },
              {
                step: '2',
                title: 'Get Quote',
                description: 'Receive a detailed quote including all costs and delivery timeframes.'
              },
              {
                step: '3',
                title: 'Schedule Service',
                description: 'Book your preferred delivery or pickup time slot.'
              },
              {
                step: '4',
                title: 'Track & Deliver',
                description: 'Monitor progress and receive your container on schedule.'
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
            Need Logistics Support?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact our logistics team today to discuss your transportation and delivery needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a 
              href="mailto:info@valleycontainers.co.za?subject=Container Logistics Quote Request&body=Hi, I would like to request a quote for container logistics services. Please contact me with more information about pricing and delivery options."
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto inline-block text-center"
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

export default LogisticsServicesPage
