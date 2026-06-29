'use client'


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
    { number: '20', label: 'Years Experience', icon: Award },
    { number: '4', label: 'Regions Served', icon: Globe },
    { number: '7+', label: 'Industries Served', icon: Building2 },
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
      color: 'text-primary-600'
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
      year: '2005',
      title: 'Topshell Founded',
      description: 'Started in Cape Town with a simple promise: the best service and value for your money, guaranteed'
    },
    {
      year: '2010',
      title: 'Southern Cape Expansion',
      description: 'Opened depots in George and Mossel Bay to serve the growing Southern Cape market'
    },
    {
      year: '2014',
      title: 'In-House Manufacturing & Conversions',
      description: 'Established our own CAD design, engineering, manufacturing and conversion workshops'
    },
    {
      year: '2017',
      title: 'Gauteng & Mpumalanga',
      description: 'Extended our footprint to Midrand and Secunda, reaching clients across Gauteng and Mpumalanga'
    },
    {
      year: '2020',
      title: 'Self-Storage Launched',
      description: 'Opened self-storage facilities in Blackheath and Stellenbosch in the Western Cape'
    },
    {
      year: '2024',
      title: 'Nearly Two Decades of Quality',
      description: 'Trusted across multiple industries as a verified member of the Cape Chamber of Commerce and Industry'
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
              About Topshell Container Rentals
              <span className="block text-primary-100">Your Trusted Partner Since 2005</span>
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              We're more than just a container company. With nearly 20 years' experience,
              we deliver the best service and value for your money, guaranteed — across the
              Western Cape, Southern Cape, Gauteng and Mpumalanga.
            </p>
            <div 
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
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div

            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2005 in Cape Town, Topshell Container Rentals began with a simple
                  promise: to deliver the best service and value for your money, guaranteed. No
                  room for compromise — only quality containers.
                </p>
                <p>
                  What started in the Western Cape has grown into a trusted name across the
                  Southern Cape, Gauteng and Mpumalanga, with two branches and three depots and
                  our own crane trucks handling every delivery and collection.
                </p>
                <p>
                  Today, after nearly 20 years and with in-house CAD design, engineering,
                  manufacturing and conversion workshops, we're proud to serve clients in
                  education, healthcare, renewable energy, electrical engineering, water
                  treatment, retail and FMCG — a one-stop shop for complete site establishment.
                </p>
              </div>
            </div>
            
            <div

              className="relative"
            >
              <div className="bg-primary-500 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-primary-100" />
                  <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                  <p className="text-primary-50">
                    To be your one-stop shop for complete site establishment — delivering
                    quality container solutions with the best service and value for your money,
                    guaranteed.
                  </p>
                  <div className="mt-6 pt-6 border-t border-primary-400 flex items-center justify-center gap-2 text-sm text-primary-50">
                    <Award className="w-5 h-5 text-primary-100 flex-shrink-0" />
                    <span>Verified Member of the Cape Chamber of Commerce and Industry</span>
                  </div>
                </div>
              </div>
            </div>
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
              <div
                key={index}
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
              </div>
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
              The passionate professionals behind Topshell's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
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
              </div>
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
              Key milestones that shaped Topshell into what we are today.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
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
                </div>
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
            Join the businesses across the Western Cape, Southern Cape, Gauteng and Mpumalanga
            who trust Topshell for the best value, guaranteed.
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

