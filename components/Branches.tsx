'use client'


import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react'
import Link from 'next/link'

const Branches = () => {
  const branches = [
    {
      id: 'george',
      name: 'George Branch',
      city: 'George',
      region: 'Western Cape',
      address: 'Main Branch',
      phone: '+27 44 878 0878',
      email: 'info@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: true,
      coordinates: { lat: -33.9715, lng: 22.4617 }
    },
    {
      id: 'cape-town',
      name: 'Cape Town Branch',
      city: 'Cape Town',
      region: 'Western Cape',
      address: 'Cape Town Metro',
      phone: '+27 72 211 1052',
      email: 'cpt@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      coordinates: { lat: -33.9249, lng: 18.4241 }
    },
    {
      id: 'mossel-bay',
      name: 'Mossel Bay Branch',
      city: 'Mossel Bay',
      region: 'Western Cape',
      address: 'Mossel Bay Area',
      phone: '+27 (0)44 695 2555',
      email: 'msb@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      coordinates: { lat: -34.1833, lng: 22.1333 }
    },
    {
      id: 'gqeberha',
      name: 'Gqeberha (Port Elizabeth) Branch',
      city: 'Gqeberha',
      region: 'Eastern Cape',
      address: 'Port Elizabeth Metro',
      phone: '+27 (0) 61 451 8829',
      phone2: '+27 (0) 41 486 1134',
      email: 'sales@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      coordinates: { lat: -33.7139, lng: 25.5207 }
    },
    {
      id: 'kimberley',
      name: 'Kimberley Branch',
      city: 'Kimberley',
      region: 'Northern Cape',
      address: 'Kimberley Area',
      phone: '+27 (0)53 831 1554',
      phone2: '+27 (0)71 4730 666',
      email: 'kimberley@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
      coordinates: { lat: -28.7282, lng: 24.7499 }
    },
    {
      id: 'johannesburg',
      name: 'Johannesburg Branch',
      city: 'Johannesburg',
      region: 'Gauteng',
      address: 'Johannesburg Metro',
      phone: '+27 71 371 2972',
      email: 'jhb@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      rating: 5,
      isMain: false,
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
      coordinates: { lat: -20.3484, lng: 57.5522 }
    }
  ]

  const regions = [
    { name: 'Western Cape', branches: ['george', 'cape-town', 'mossel-bay'] },
    { name: 'Eastern Cape', branches: ['gqeberha'] },
    { name: 'Northern Cape', branches: ['kimberley'] },
    { name: 'Gauteng', branches: ['johannesburg'] },
    { name: 'International', branches: ['mauritius'] }
  ]

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Branches & Locations
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Valley Containers has expanded across South Africa and into Africa, providing container solutions 
            nationwide with local expertise and reliable service.
          </p>
        </div>

        {/* Main Branch Highlight */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Star className="w-6 h-6 text-yellow-300 fill-current" />
                  <span className="text-lg font-semibold">Main Branch</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">George Branch</h3>
                <p className="text-primary-100 mb-4">
                  Since 1994, our main branch in George has been the heart of Valley Containers, 
                  serving the Southern Cape with excellence and integrity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <a 
                      href="tel:+27 44 878 0878"
                      className="hover:text-primary-200 transition-colors duration-200"
                      title="Call +27 44 878 0878"
                    >
                      +27 44 878 0878
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                                      <a 
                    href="mailto:info@valleycontainers.co.za"
                    className="hover:text-primary-700 transition-colors duration-200"
                    title="Click to email info@valleycontainers.co.za"
                  >
                  info@valleycontainers.co.za
                </a>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-80 h-48 bg-white/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-2 text-primary-200" />
                  <p className="text-primary-100 font-medium">Western Cape</p>
                  <p className="text-primary-200">George, South Africa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Branches */}
        <div className="space-y-12">
          {regions.map((region, regionIndex) => (
            <div key={region.name} className="border-b border-gray-200 pb-8 last:border-b-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
                {region.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branches
                  .filter(branch => region.branches.includes(branch.id))
                  .map((branch, index) => (
                    <div
                      key={branch.id}
                      className="card hover:shadow-soft transition-all duration-300 group"
                    >
                      {/* Branch Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                          <MapPin className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: branch.rating }, (_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          {branch.isMain && (
                            <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                              Main Branch
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Branch Info */}
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {branch.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {branch.city}, {branch.region}
                        </p>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-primary-600" />
                          <a 
                            href={`tel:${branch.phone}`}
                            className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
                            title={`Call ${branch.phone}`}
                          >
                            {branch.phone}
                          </a>
                        </div>
                        {branch.phone2 && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-primary-600" />
                                                        <a 
                              href={`tel:${branch.phone2}`}
                              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
                              title={`Call ${branch.phone2}`}
                            >
                              {branch.phone2}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-primary-600" />
                          <a 
                            href={`mailto:${branch.email}`}
                            className="text-gray-700 hover:text-primary-700 transition-colors duration-200 break-all"
                            title={`Click to email ${branch.email}`}
                          >
                            {branch.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary-600" />
                          <span className="text-gray-700">{branch.hours}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="btn-primary w-full text-sm">
                        Contact Branch
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-secondary-200 rounded-xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Nationwide Coverage & International Expansion
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 px-4">
              Over the past decade, we have built sound and healthy relationships and today we are the 
              definitive leader of container leasing and sales in the Southern Cape – fast expanding our 
              geographical footprint across the country and into the rest of Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/rental"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3"
              >
                Request a Quote
              </Link>
              <button className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3">
                Find Nearest Branch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Branches
