'use client'


import { 
  Truck, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Star,
  Package,
  Building2,
  Shield
} from 'lucide-react'
import Link from 'next/link'

const RentalServicesPage = () => {
  const rentalOptions = [
    {
      id: 1,
      name: 'Storage Containers',
      description: 'Secure storage solutions for businesses and individuals',
      sizes: ['2m', '3m', '6m', '12m'],
      pricing: 'From R120/day',
      features: [
        'Weather resistant',
        'Secure locking systems',
        'Multiple access options',
        'Insurance available',
        'Flexible rental terms'
      ],
      icon: Package,
      popular: true
    },
    {
      id: 2,
      name: 'Office Containers',
      description: 'Converted containers perfect for office spaces and site offices',
      sizes: ['6m', '12m'],
      pricing: 'From R200/day',
      features: [
        'Fully furnished options',
        'Air conditioning',
        'Electrical & plumbing',
        'Security features',
        'Quick setup & removal'
      ],
      icon: Building2,
      popular: true
    },
    {
      id: 3,
      name: 'Event Containers',
      description: 'Specialized containers for events, exhibitions, and temporary needs',
      sizes: ['3m', '6m', '12m'],
      pricing: 'From R150/day',
      features: [
        'Custom branding options',
        'Easy access doors',
        'Lighting included',
        'Flexible layouts',
        'Event support'
      ],
      icon: Package,
      popular: false
    },
    {
      id: 4,
      name: 'Industrial Containers',
      description: 'Heavy-duty containers for industrial and construction applications',
      sizes: ['6m', '12m', '12m HC'],
      pricing: 'From R180/day',
      features: [
        'Heavy-duty construction',
        'Forklift accessible',
        'Custom modifications',
        'Safety compliant',
        'Technical support'
      ],
      icon: Building2,
      popular: false
    }
  ]

  const benefits = [
    {
      icon: Calendar,
      title: 'Flexible Terms',
      description: 'Daily, weekly, monthly, or long-term rental options'
    },
    {
      icon: MapPin,
      title: 'Nationwide Delivery',
      description: 'We deliver to any location across South Africa'
    },
    {
      icon: Clock,
      title: 'Quick Setup',
      description: 'Same-day delivery available for urgent requirements'
    },
    {
      icon: Shield,
      title: 'Full Support',
      description: '24/7 customer support and maintenance included'
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
              Container Rental
              <span className="block text-primary-100">Flexible Solutions</span>
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              From temporary storage to long-term office solutions, our container rental 
              service provides flexibility and reliability for all your needs.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link 
                href="/rental"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
              >
                Start Renting Now
              </Link>
              <a 
                href="mailto:info@valleycontainers.co.za?subject=Container Rental Quote Request&body=Hi, I would like to request a quote for container rental services. Please contact me with more information about pricing and availability."
                className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 border-white text-white hover:bg-white hover:text-primary-500 w-full sm:w-auto inline-block text-center"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Rental Service?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the Valley Containers difference with our comprehensive rental solutions.
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

      {/* Rental Options Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rental Options
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our wide range of container rental options designed to meet your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rentalOptions.map((option, index) => (
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
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="text-lg font-semibold text-primary-600">
                      {option.pricing}
                    </div>
                  </div>

                  <Link
                    href="/rental"
                    className="btn-primary w-full text-center group-hover:bg-primary-600 transition-colors duration-200"
                  >
                    Rent Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
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
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with container rental is simple and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Container',
                description: 'Select from our range of containers based on your needs and requirements.'
              },
              {
                step: '2',
                title: 'Get a Quote',
                description: 'Contact us for a personalized quote including delivery and setup costs.'
              },
              {
                step: '3',
                title: 'Delivery & Setup',
                description: 'We deliver and set up your container at your specified location.'
              },
              {
                step: '4',
                title: 'Enjoy & Return',
                description: 'Use your container and return it when you\'re done, or extend your rental.'
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
            Ready to Start Renting?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your container rental needs and get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/rental"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
            >
              Start Renting
            </Link>
            <a 
              href="mailto:info@valleycontainers.co.za?subject=Container Rental Quote Request&body=Hi, I would like to request a quote for container rental services. Please contact me with more information about pricing and availability."
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto inline-block text-center"
            >
              Get Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RentalServicesPage
