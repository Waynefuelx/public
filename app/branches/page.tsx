'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Star, Navigation, Globe } from 'lucide-react'
import Link from 'next/link'
import Branches from '@/components/Branches'

const BranchesPage = () => {
  const branches = [
    {
      id: 'george',
      name: 'George Branch',
      city: 'George',
      region: 'Western Cape',
      address: 'Main Branch - Southern Cape',
      phone: '+27 44 878 0878',
      email: 'info@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: true,
      description: 'Since 1994, our main branch in George has been the heart of Valley Containers, serving the Southern Cape with excellence and integrity.',
      services: ['Container Rental', 'Container Sales', 'Office Containers', 'Storage Solutions', 'Custom Conversions'],
      coordinates: { lat: -33.9715, lng: 22.4617 }
    },
    {
      id: 'cape-town',
      name: 'Cape Town Branch',
      city: 'Cape Town',
      region: 'Western Cape',
      address: 'Cape Town Metro Area',
      phone: '+27 72 211 1052',
      email: 'cpt@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      description: 'Serving the greater Cape Town metropolitan area with comprehensive container solutions and local expertise.',
      services: ['Container Rental', 'Office Containers', 'Storage Solutions', 'Event Containers', 'Logistics Support'],
      coordinates: { lat: -33.9249, lng: 18.4241 }
    },
    {
      id: 'mossel-bay',
      name: 'Mossel Bay Branch',
      city: 'Mossel Bay',
      region: 'Western Cape',
      address: 'Mossel Bay & Garden Route',
      phone: '+27 (0)44 695 2555',
      email: 'msb@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      description: 'Providing container solutions along the beautiful Garden Route, serving local businesses and tourism needs.',
      services: ['Container Rental', 'Tourism Solutions', 'Event Containers', 'Storage Solutions', 'Local Delivery'],
      coordinates: { lat: -34.1833, lng: 22.1333 }
    },
    {
      id: 'gqeberha',
      name: 'Gqeberha (Port Elizabeth) Branch',
      city: 'Gqeberha',
      region: 'Eastern Cape',
      address: 'Port Elizabeth Metro Area',
      phone: '+27 (0) 61 451 8829',
      phone2: '+27 (0) 41 486 1134',
      email: 'sales@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      description: 'Serving the Eastern Cape region with industrial container solutions and port logistics support.',
      services: ['Industrial Containers', 'Port Logistics', 'Container Sales', 'Custom Solutions', 'Regional Delivery'],
      coordinates: { lat: -33.7139, lng: 25.5207 }
    },
    {
      id: 'kimberley',
      name: 'Kimberley Branch',
      city: 'Kimberley',
      region: 'Northern Cape',
      address: 'Northern Cape Region',
      phone: '+27 (0)53 831 1554',
      phone2: '+27 (0)71 4730 666',
      email: 'kimberley@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      description: 'Supporting the Northern Cape mining and agricultural sectors with specialized container solutions.',
      services: ['Mining Containers', 'Agricultural Solutions', 'Storage Containers', 'Remote Site Support', 'Regional Service'],
      coordinates: { lat: -28.7282, lng: 24.7499 }
    },
    {
      id: 'johannesburg',
      name: 'Johannesburg Branch',
      city: 'Johannesburg',
      region: 'Gauteng',
      address: 'Johannesburg Metro Area',
      phone: '+27 71 371 2972',
      email: 'jhb@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      description: 'Serving the economic heart of South Africa with comprehensive container solutions for all industries.',
      services: ['Corporate Solutions', 'Industrial Containers', 'Office Containers', 'Event Solutions', 'National Logistics'],
      coordinates: { lat: -26.2041, lng: 28.0473 }
    },
    {
      id: 'mauritius',
      name: 'Mauritius Branch',
      city: 'Mauritius',
      region: 'International',
      address: 'Mauritius Island',
      phone: '+230 606 7684',
      phone2: '+230 5944 6060/5251 9252',
      email: 'info@valleycontainersma.mu',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      description: 'Expanding our reach into Africa with container solutions for the Mauritius market and surrounding regions.',
      services: ['International Shipping', 'Tourism Solutions', 'Island Logistics', 'Custom Solutions', 'Regional Expansion'],
      coordinates: { lat: -20.3484, lng: 57.5522 }
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
              Our Branches
              <span className="block text-primary-100">Nationwide Coverage</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              From the Southern Cape to Johannesburg, and expanding into Africa - Valley Containers 
              brings professional container solutions closer to you.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link 
                href="/contact"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
              >
                Find Nearest Branch
              </Link>
              <Link 
                href="/rental"
                className="bg-white text-primary-500 hover:bg-secondary-100 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto border border-primary-200 inline-flex items-center justify-center"
              >
                Request Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                7
              </div>
              <div className="text-sm sm:text-base text-gray-600">Branches</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                5
              </div>
              <div className="text-sm sm:text-base text-gray-600">Provinces</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                2
              </div>
              <div className="text-sm sm:text-base text-gray-600">Countries</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                30+
              </div>
              <div className="text-sm sm:text-base text-gray-600">Years Experience</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branches Component */}
      <Branches />

      {/* Contact CTA */}
      <section className="py-16 sm:py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Need Help Finding the Right Branch?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Our team is here to help you connect with the nearest branch and get the container solutions you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link 
              href="/contact"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
            >
              Contact Us
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BranchesPage
