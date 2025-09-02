'use client'


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

const BuyingPage = () => {

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
      name: 'Bulk Orders',
      price: 'Volume Discounts',
      description: 'Special pricing for multiple container purchases',
      icon: Package
    },
    {
      name: 'Warranty & Support',
      price: 'Included',
      description: 'Comprehensive warranty and ongoing support',
      icon: Star
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
              Buy Containers
              <span className="block text-primary-100">Own Your Solution</span>
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              Purchase high-quality containers for permanent use. 
              Competitive pricing with full ownership and customization options.
            </p>

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
              <div
                key={index}
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
                    href={`/purchase?container=${option.name.toLowerCase().replace(/\s+/g, '-')}&type=${encodeURIComponent(option.name)}&category=Purchase&dimensions=6m+%C3%97+2.4m+%C3%97+2.6m&capacity=37.4+cu+m&price=${option.price.replace(/[^\d]/g, '')}`}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center inline-flex items-center justify-center group"
                  >
                    Buy Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
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
              <div
                key={index}
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
              </div>
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
              Common questions about purchasing containers.
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
                answer: 'Yes, we offer competitive volume discounts for bulk container purchases. Contact us for a personalized quote.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, bank transfers, and can arrange payment plans for larger orders.'
              },
              {
                question: 'Is delivery included in the price?',
                answer: 'Delivery costs are clearly stated upfront for all sales. We offer professional delivery and setup services.'
              },
              {
                question: 'What warranty do you provide?',
                answer: 'All new containers come with full manufacturer warranty. Used containers include our quality guarantee.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
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
            Ready to Buy?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact our sales team today to discuss your container purchase and get a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/purchase"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
            >
              Buy Now
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

export default BuyingPage
