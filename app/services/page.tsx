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
  Clock
} from 'lucide-react'
import Link from 'next/link'
import BranchLocationModal from '@/components/BranchLocationModal'

const ConversionsPage = () => {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)
  
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png',
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/Elite-office-unit.png',
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png',
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6-m-sleeper-container-2.png',
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/Ablution-Container.png',
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_office.png',
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/container-conversions-5.webp',
      popular: false
    },
    {
      id: 8,
      name: 'Soup Kitchens',
      description: 'Food service facilities converted from containers for community feeding programs.',
      icon: Users,
      features: [
        'Kitchen equipment',
        'Serving areas',
        'Storage space',
        'Hygiene facilities',
        'Community access'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/container-conversions-3.png_1-400x284.webp',
      popular: false
    },
    {
      id: 9,
      name: 'Remote Solar Grids',
      description: 'Solar power installations integrated into containers for off-grid energy solutions.',
      icon: Sun,
      features: [
        'Solar panel integration',
        'Battery storage',
        'Power distribution',
        'Monitoring systems',
        'Off-grid capability'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/container-conversions-7-400x284.webp',
      popular: false
    },
    {
      id: 10,
      name: 'Coffee Shops',
      description: 'Mobile coffee shop solutions converted from containers for events and permanent locations.',
      icon: Coffee,
      features: [
        'Coffee equipment',
        'Serving counter',
        'Storage space',
        'Customer seating',
        'Mobile operation'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-pavilion.png',
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-pavilion.png',
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
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_refrigeration.png',
      popular: false
    }
  ]

  const branches = [
    {
      name: 'George Branch',
      city: 'George',
      province: 'Western Cape',
      phone: '+27 44 878 0878',
      email: 'info@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Cape Town Branch',
      city: 'Cape Town',
      province: 'Western Cape',
      phone: '+27 72 211 1052',
      email: 'cpt@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Mossel Bay Branch',
      city: 'Mossel Bay',
      province: 'Western Cape',
      phone: '+27 (0)44 695 2555',
      email: 'msb@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Gqeberha Branch',
      city: 'Gqeberha',
      province: 'Eastern Cape',
      phone: '+27 (0) 61 451 8829',
      email: 'sales@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Kimberley Branch',
      city: 'Kimberley',
      province: 'Northern Cape',
      phone: '+27 (0)53 831 1554',
      email: 'kimberley@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Johannesburg Branch',
      city: 'Johannesburg',
      province: 'Gauteng',
      phone: '+27 71 371 2972',
      email: 'jhb@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Mauritius Branch',
      city: 'Mauritius',
      province: 'International',
      phone: '+230 606 7684',
      email: 'info@valleycontainersma.mu',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
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
              Container Conversions
              <span className="block text-primary-100">Custom Solutions</span>
            </h1>
            <p 

              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              Valley Containers has over a decade of container conversion experience. 
              Transform standard containers into versatile, functional spaces.
            </p>
            <div 

              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link 
                href="/rental"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
              >
                Get A Quote
              </Link>
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

      {/* Introduction Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 

              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
            >
              CUSTOM CONTAINERS
            </h2>
            <p 

              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed"
            >
              You can transform a standard containers into versatile, functional spaces with our expert container conversions near me. 
              Whatever your need for modified shipping containers is, we can bring your vision to life. Our team specialises in 
              creating custom shipping containers tailored to your specific needs, handling everything from design to sourcing 
              appliances and furniture.
            </p>
            <div 

              className="bg-primary-50 border border-primary-200 rounded-lg p-6"
            >
              <p className="text-primary-800 font-medium">
                All modified shipping container are thoroughly tested, including electrical and plumbing, 
                to ensure it's ready for immediate use upon delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Types Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 

              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Types of Shipping Container Conversions
            </h2>
            <p 

              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              From office spaces to specialized facilities, we can convert containers for any purpose.
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
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link
                    href="/contact"
                    className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full text-center inline-flex items-center justify-center group"
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

      {/* Contact Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 

              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
            >
              Get in touch with us
            </h2>
            <p 

              className="text-lg sm:text-xl text-gray-600 mb-8"
            >
              Contact us by phone for immediate live assistance – or send us an email. 
              We'll get back to you as soon as we can.
            </p>
            <p 

              className="text-lg text-gray-700"
            >
              Get in touch with any of our branches to arrange a visit to our depot or to discuss your specific requirements.
            </p>
          </div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {branches.map((branch, index) => (
              <div
                key={branch.name}

                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {branch.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {branch.city}, {branch.province}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary-600" />
                        <a 
                          href={`tel:${branch.phone}`}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                        >
                          {branch.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary-600" />
                        <a 
                          href={`mailto:${branch.email}`}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                          title={`Click to email ${branch.email}`}
                        >
                          {branch.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-600" />
                        <span className="text-gray-600">{branch.hours}</span>
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
          <h2 

            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          >
            Get your quote today!
          </h2>
          <p 

            className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto"
          >
            Ready to transform your container into something extraordinary? 
            Contact our team today to discuss your conversion needs.
          </p>
          <div 

            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
            >
              Get A Quote
            </Link>
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
    </div>
  )
}

export default ConversionsPage
