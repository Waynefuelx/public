'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  Globe, 
  Building2, 
  Truck, 
  Shield,
  Heart,
  Target,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Package
} from 'lucide-react'
import Link from 'next/link'

const AboutPage = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '1000+', label: 'Happy Customers', icon: Heart },
    { number: '50+', label: 'Team Members', icon: Users },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ]

  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on the quality of our containers and services.',
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      title: 'Customer Focus',
      description: 'Your success is our priority. We build lasting relationships.',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      title: 'Innovation',
      description: 'Constantly improving our solutions to meet evolving needs.',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Reliability',
      description: 'You can count on us to deliver on time, every time.',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ]

  const team = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      experience: '20+ years in container industry',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Sarah Johnson',
      position: 'Operations Director',
      experience: '15+ years logistics experience',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Mike Chen',
      position: 'Technical Manager',
      experience: '12+ years engineering background',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Lisa Rodriguez',
      position: 'Customer Success Manager',
      experience: '10+ years customer service',
      image: '/api/placeholder/150/150'
    }
  ]

  const milestones = [
    {
      year: '2008',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize container solutions in South Africa'
    },
    {
      year: '2012',
      title: 'First Major Contract',
      description: 'Secured our first corporate client, marking significant growth'
    },
    {
      year: '2015',
      title: 'Expansion Phase',
      description: 'Opened multiple branches across major cities'
    },
    {
      year: '2018',
      title: 'Innovation Hub',
      description: 'Launched custom container modification services'
    },
    {
      year: '2021',
      title: 'Digital Transformation',
      description: 'Implemented advanced booking and tracking systems'
    },
    {
      year: '2024',
      title: 'Market Leader',
      description: 'Recognized as the leading container solution provider in the region'
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
              About Valley Containers
              <span className="block text-primary-100">Your Trusted Partner Since 2008</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              We're more than just a container company. We're innovators, problem-solvers, 
              and your partners in building success stories across South Africa.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Link 
                href="/services"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
              >
                Our Services
              </Link>
              <Link 
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2008, Valley Containers began with a simple mission: to provide 
                  innovative, reliable container solutions that help businesses and individuals 
                  achieve their goals.
                </p>
                <p>
                  What started as a small operation in Johannesburg has grown into South Africa's 
                  leading container solution provider, serving clients across the country with 
                  unmatched quality and service.
                </p>
                <p>
                  Today, we're proud to have helped thousands of customers transform their 
                  spaces and operations with our versatile container solutions, from basic 
                  storage to sophisticated office complexes.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-primary-500 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-primary-100" />
                  <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                  <p className="text-primary-50">
                    To provide innovative, sustainable container solutions that empower 
                    businesses and communities to grow and succeed.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind Valley Containers' success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-lg transition-all duration-300"
              >
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.experience}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones that shaped Valley Containers into what we are today.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-50 rounded-lg p-6 shadow-soft">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Valley Containers for their 
            container solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/rental"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
            >
              Get Started
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

