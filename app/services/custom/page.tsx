'use client'


import { 
  Wrench, 
  Building2, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Package,
  Shield,
  Clock,
  MapPin,
  Palette,
  Settings,
  Zap
} from 'lucide-react'
import Link from 'next/link'

const CustomSolutionsPage = () => {
  const customServices = [
    {
      id: 1,
      name: 'Office Conversions',
      description: 'Professional office spaces with all modern amenities and custom layouts',
      features: [
        'Custom floor plans',
        'Electrical & plumbing',
        'Air conditioning',
        'Security systems',
        'Professional finish'
      ],
      pricing: 'Custom quote',
      icon: Building2,
      popular: true
    },
    {
      id: 2,
      name: 'Restaurant & Retail',
      description: 'Custom food service and retail spaces with commercial-grade equipment',
      features: [
        'Commercial kitchens',
        'Retail displays',
        'Customer areas',
        'Storage solutions',
        'Health compliance'
      ],
      pricing: 'Custom quote',
      icon: Building2,
      popular: true
    },
    {
      id: 3,
      name: 'Event & Exhibition',
      description: 'Specialized containers for events, exhibitions, and temporary venues',
      features: [
        'Custom branding',
        'Flexible layouts',
        'Lighting systems',
        'Sound systems',
        'Quick setup'
      ],
      pricing: 'Custom quote',
      icon: Package,
      popular: false
    },
    {
      id: 4,
      name: 'Industrial Solutions',
      description: 'Heavy-duty modifications for industrial and construction applications',
      features: [
        'Safety compliance',
        'Heavy equipment',
        'Custom access',
        'Technical support',
        'Project management'
      ],
      pricing: 'Custom quote',
      icon: Wrench,
      popular: false
    }
  ]

  const processSteps = [
    {
      step: '1',
      title: 'Consultation',
      description: 'Discuss your requirements and vision with our design team',
      icon: Settings
    },
    {
      step: '2',
      title: 'Design & Planning',
      description: 'Create detailed plans and 3D renderings of your custom solution',
      icon: Palette
    },
    {
      step: '3',
      title: 'Fabrication',
      description: 'Professional construction and modification in our facilities',
      icon: Wrench
    },
    {
      step: '4',
      title: 'Installation',
      description: 'On-site installation and final quality inspection',
      icon: Zap
    }
  ]

  const industries = [
    {
      name: 'Construction',
      description: 'Site offices, tool storage, and equipment housing',
      icon: Building2
    },
    {
      name: 'Events',
      description: 'Pop-up venues, exhibition spaces, and temporary structures',
      icon: Package
    },
    {
      name: 'Hospitality',
      description: 'Food service, accommodation, and guest facilities',
      icon: Building2
    },
    {
      name: 'Healthcare',
      description: 'Mobile clinics, testing centers, and medical facilities',
      icon: Shield
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
              Custom Solutions
              <span className="block text-primary-100">Tailored for You</span>
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              Transform standard containers into custom solutions that perfectly 
              match your unique requirements and vision.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link 
                href="/rental"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
              >
                Start Project
              </Link>
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

      {/* Services Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Custom Conversion Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we handle every aspect of your custom container project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {customServices.map((service, index) => (
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

                  <Link
                    href="/rental"
                    className="btn-primary w-full text-center group-hover:bg-primary-600 transition-colors duration-200"
                  >
                    Get Quote
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Custom Process
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven process to ensure your custom project is completed to the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary-600" />
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

      {/* Industries Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our custom solutions are designed for a wide range of industries and applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <industry.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {industry.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Custom Solutions?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the Valley Containers difference with our custom conversion expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
              <p className="text-gray-600">
                30+ years of experience in container modifications and custom solutions.
              </p>
            </div>

            <div
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                All custom work comes with our quality guarantee and warranty protection.
              </p>
            </div>

            <div
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timely Delivery</h3>
              <p className="text-gray-600">
                We commit to delivering your custom solution on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Custom Project?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact our custom solutions team today to discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/contact"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
            >
              Start Project
            </Link>
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

export default CustomSolutionsPage
