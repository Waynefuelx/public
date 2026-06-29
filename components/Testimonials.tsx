'use client'


import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Riaan Botha',
      company: 'Cape Coastal Construction',
      role: 'Site Manager',
      rating: 5,
      content: 'Topshell has been our go-to partner for site offices and storage across our Western Cape projects. Their crane trucks delivered and set up everything on time, and the units were in excellent condition. Best value for our money, no question.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'Thandeka Nkosi',
      company: 'Highveld Mining Services',
      role: 'Procurement Manager',
      rating: 5,
      content: 'We\'ve worked with Topshell for several years now on our Mpumalanga operations. Their 8-bed sleeper units and ablution facilities are exactly what our teams need on remote sites. Reliable delivery, quality builds and genuinely competitive pricing.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 3,
      name: 'Megan Pretorius',
      company: 'Stellenbosch Events Co.',
      role: 'Operations Director',
      rating: 5,
      content: 'For our large-scale events we need clean, secure units delivered exactly when promised. Topshell has never let us down. Their custom-branded containers looked fantastic and collection afterwards was just as smooth as the delivery.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 4,
      name: 'David Williams',
      company: 'Sunfields Renewable Energy',
      role: 'Project Lead',
      rating: 5,
      content: 'Topshell understands the renewable energy sector. They kitted out our solar farm with offices, a canteen and security huts as a complete site establishment package. The quality and on-site support were outstanding from start to finish.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 5,
      name: 'Naledi Mokoena',
      company: 'Freshline Retail Group',
      role: 'Logistics Manager',
      rating: 5,
      content: 'We rely on Topshell for refrigeration units and storage across our stores. Their team is responsive, the units are spotless, and the value for money is the best we\'ve found. Highly recommended for any retail or FMCG operation.',
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 6,
      name: 'Pieter van Zyl',
      company: 'George Primary Academy',
      role: 'School Bursar',
      rating: 5,
      content: 'When we needed extra classrooms fast, Topshell converted containers to our exact spec and delivered them to George ahead of schedule. The in-house engineering really shows in the finish. Quality work and excellent service throughout.',
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
            their experience with Topshell.
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
              Join the businesses across the Western Cape, Southern Cape, Gauteng and Mpumalanga
              who trust Topshell for the best value, guaranteed.
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
