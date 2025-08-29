'use client'

import { motion } from 'framer-motion'
import { 
  Check, 
  Star, 
  Package, 
  Building2, 
  Snowflake, 
  Crown,
  Truck,
  Wrench,
  ArrowRight,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import Link from 'next/link'

const PricingPage = () => {
  const rentalPlans = [
    {
      name: 'Storage Container',
      price: 'R150',
      period: '/day',
      description: 'Basic storage solution for any business or personal needs',
      features: [
        'Weather-resistant construction',
        'Multiple size options (6ft, 10ft, 20ft, 40ft)',
        'Easy access doors',
        'Stackable design',
        'Security lockable',
        'Flexible rental terms',
        'Delivery included'
      ],
      popular: false,
      icon: Package
    },
    {
      name: 'Office Container',
      price: 'R450',
      period: '/day',
      description: 'Professional office space with all modern amenities',
      features: [
        'Fully furnished interior',
        'Electrical wiring & lighting',
        'Air conditioning',
        'Windows & ventilation',
        'Professional appearance',
        'Quick setup & removal',
        'Monthly discounts available'
      ],
      popular: true,
      icon: Building2
    },
    {
      name: 'VIP Container Office',
      price: 'R750',
      period: '/day',
      description: 'Premium executive office with luxury finishes',
      features: [
        'Premium finishes & materials',
        'Executive furniture included',
        'Advanced climate control',
        'Soundproofing',
        'Custom branding options',
        'Dedicated support',
        'Priority scheduling'
      ],
      popular: false,
      icon: Crown
    },
    {
      name: 'Refrigeration Container',
      price: 'R600',
      period: '/day',
      description: 'Temperature-controlled storage for sensitive materials',
      features: [
        'Temperature control -18°C to +25°C',
        'Food-grade materials',
        'Energy efficient',
        '24/7 monitoring',
        'Professional installation',
        'Maintenance included',
        'Emergency support'
      ],
      popular: false,
      icon: Snowflake
    }
  ]

  const salesOptions = [
    {
      name: 'New Container',
      price: 'R25,000',
      description: 'Brand new container with full warranty',
      features: [
        'Full manufacturer warranty',
        'ISO certified',
        'Multiple size options',
        'Custom modifications available',
        'Delivery included',
        'Quality guarantee'
      ],
      popular: true
    },
    {
      name: 'Used Container',
      price: 'R15,000',
      description: 'Quality pre-owned container at competitive price',
      features: [
        'Quality inspected',
        'Good condition guarantee',
        'Cost-effective option',
        'Multiple sizes available',
        'Delivery available',
        '30-day warranty'
      ],
      popular: false
    },
    {
      name: 'Modified Container',
      price: 'Custom',
      description: 'Custom-converted container for specific needs',
      features: [
        'Custom design & build',
        'Professional installation',
        'Quality materials',
        'Compliance certified',
        'Project management',
        'Warranty included'
      ],
      popular: false
    }
  ]

  const additionalServices = [
    {
      name: 'Delivery & Setup',
      price: 'From R500',
      description: 'Professional delivery and installation service',
      icon: Truck
    },
    {
      name: 'Custom Modifications',
      price: 'Custom Quote',
      description: 'Tailored container modifications and conversions',
      icon: Wrench
    },
    {
      name: 'Long-term Rental',
      price: 'Volume Discounts',
      description: 'Special pricing for extended rental periods',
      icon: Calendar
    },
    {
      name: 'Maintenance',
      price: 'Included',
      description: 'Regular maintenance and support included',
      icon: Package
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            >
              Transparent Pricing
              <span className="block text-primary-100">No Hidden Costs</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              Clear, competitive pricing for all our container solutions. 
              Choose the option that best fits your budget and requirements.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link 
                href="/rental"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
              >
                Start Renting
              </Link>
              <Link 
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
              >
                Get Custom Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sales Options Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Container Sales Options
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Purchase containers for permanent use with competitive pricing and quality guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {salesOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 border-2 overflow-hidden ${
                  option.popular ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
                }`}
              >
                {option.popular && (
                  <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
                    Best Value
                  </div>
                )}
                
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {option.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-primary-600">
                        {option.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/rental"
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center inline-flex items-center justify-center group"
                  >
                    Get Quote
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Plans Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Container Rental Plans
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible rental options with transparent pricing. No hidden fees or surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rentalPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 border-2 overflow-hidden ${
                  plan.popular ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <plan.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-primary-600">
                        {plan.price}
                      </span>
                      <span className="text-gray-500 text-lg">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/rental"
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center inline-flex items-center justify-center group"
                  >
                    Choose Plan
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Value-added services to enhance your container experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  {service.price}
                </div>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our pricing and services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'Are there any hidden fees?',
                answer: 'No, our pricing is completely transparent. The price you see is the price you pay, with no hidden charges or surprise fees.'
              },
              {
                question: 'Do you offer volume discounts?',
                answer: 'Yes, we offer competitive volume discounts for long-term rentals and bulk orders. Contact us for a personalized quote.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, bank transfers, and can arrange payment plans for larger orders.'
              },
              {
                question: 'Is delivery included in the price?',
                answer: 'Delivery is included for most rental plans. For sales and custom solutions, delivery costs are clearly stated upfront.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your container needs and get a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/rental"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
            >
              Start Renting
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingPage
