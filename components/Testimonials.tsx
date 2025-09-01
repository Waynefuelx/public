'use client'


import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Construction Plus Inc.',
      role: 'Project Manager',
      rating: 5,
      content: 'Valley Containers has been our go-to partner for all our construction storage needs. Their delivery is always on time, and the containers are in excellent condition. The tracking system is fantastic - we always know exactly when our containers will arrive.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Global Logistics Solutions',
      role: 'Operations Director',
      rating: 5,
      content: 'We\'ve been working with Valley Containers for over 3 years now. Their service is consistently excellent, and their staff is incredibly responsive. The online booking system saves us hours of paperwork, and their real-time tracking gives our clients peace of mind.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      company: 'Event Productions LLC',
      role: 'CEO',
      rating: 5,
      content: 'For our large-scale events, we need reliable storage solutions. Valley Containers has never let us down. Their containers are clean, secure, and delivered exactly when promised. The customer service team is always helpful and professional.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 4,
      name: 'David Thompson',
      company: 'Marine Supply Co.',
      role: 'Warehouse Manager',
      rating: 5,
      content: 'The quality of Valley Containers\' products is outstanding. We use their refrigerated containers for storing sensitive marine equipment, and the temperature control is perfect. Their maintenance team is also very responsive when we need service.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      company: 'Retail Storage Solutions',
      role: 'Operations Manager',
      rating: 5,
      content: 'We manage storage for multiple retail clients, and Valley Containers makes it easy. Their online portal lets us track all our containers in one place, and the automated invoicing saves us countless hours. Highly recommended!',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      company: 'Industrial Equipment Corp.',
      role: 'Logistics Coordinator',
      rating: 5,
      content: 'Valley Containers understands industrial needs. Their containers are built to handle heavy equipment, and their delivery team knows how to work around our schedule. The real-time updates help us coordinate with our production team perfectly.',
      avatar: '/api/placeholder/60/60'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-16 sm:py-20 bg-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Don't just take our word for it. Here's what our valued customers have to say about 
            their experience with Valley Containers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card hover:shadow-soft transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="flex justify-end mb-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary-600" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  {testimonial.rating}.0 out of 5
                </span>
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-primary-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: '4.9', label: 'Average Rating', subtitle: 'from 500+ reviews' },
            { number: '99%', label: 'Customer Satisfaction', subtitle: 'based on surveys' },
            { number: '98%', label: 'On-Time Delivery', subtitle: 'tracking accuracy' },
            { number: '24/7', label: 'Customer Support', subtitle: 'always available' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-medium text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied customers who trust Valley Containers for their 
              storage and logistics needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Your Free Trial
              </button>
              <button className="btn-secondary">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
