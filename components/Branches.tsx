'use client'


import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const Branches = () => {
  const regions = siteConfig.regions
  const { company, primaryEmail } = { company: siteConfig.company, primaryEmail: siteConfig.company.primaryEmail }
  // The Western Cape head office is the main region.
  const mainRegion = regions[0]

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Regions & Locations
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {company.name} operates across the Western &amp; Southern Cape, Gauteng and Mpumalanga, delivering
            container solutions with local expertise and reliable service.
          </p>
        </div>

        {/* Main Region Highlight */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 sm:p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Star className="w-6 h-6 text-yellow-300 fill-current" />
                  <span className="text-lg font-semibold">Head Office</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">{mainRegion.name}</h3>
                <p className="text-primary-100 mb-4">
                  Since {company.foundedYear}, our {mainRegion.city} head office has been the heart of {company.name},
                  serving the Western Cape with {company.yearsExperience} years of excellence and integrity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <a
                      href={`tel:${mainRegion.phone}`}
                      className="hover:text-primary-200 transition-colors duration-200"
                      title={`Call ${mainRegion.phone}`}
                    >
                      {mainRegion.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <a
                      href={`mailto:${mainRegion.email}`}
                      className="hover:text-primary-200 transition-colors duration-200"
                      title={`Click to email ${mainRegion.email}`}
                    >
                      {mainRegion.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-80 h-48 bg-white/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-2 text-primary-200" />
                  <p className="text-primary-100 font-medium">{mainRegion.name}</p>
                  <p className="text-primary-200">{mainRegion.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <div
              key={region.id}
              className="card hover:shadow-soft transition-all duration-300 group"
            >
              {/* Region Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  {index === 0 && (
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      Head Office
                    </span>
                  )}
                  {region.hasSpecialOffer && index !== 0 && (
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      Special Offer
                    </span>
                  )}
                </div>
              </div>

              {/* Region Info */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {region.name}
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  {region.city}
                </p>

                {/* Address(es) — Southern Cape has two depots */}
                {region.depots ? (
                  <div className="space-y-2">
                    {region.depots.map((depot) => (
                      <div key={depot.name} className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{depot.name}: </span>
                        {depot.addressLines.join(', ')}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">{region.addressLines.join(', ')}</p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-primary-600" />
                  <a
                    href={`tel:${region.phone}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    title={`Call ${region.phone}`}
                  >
                    {region.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary-600" />
                  <a
                    href={`mailto:${region.email}`}
                    className="text-gray-700 hover:text-primary-600 transition-colors duration-200 break-all"
                    title={`Click to email ${region.email}`}
                  >
                    {region.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary-600" />
                  <span className="text-gray-700">{region.hours}</span>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`mailto:${region.email}?subject=Quote Request&body=Hi, I would like to request a quote for container rental or purchase. Please contact me with more information.`}
                className="btn-primary w-full text-sm inline-block text-center"
              >
                Contact Region
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-secondary-200 rounded-xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Nationwide Coverage Across Four Regions
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 px-4">
              Over {company.yearsExperience} years we have built sound and healthy relationships and today
              we are a trusted leader in container rentals, sales and conversions — fast expanding our
              geographical footprint across South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a
                href={`mailto:${primaryEmail}?subject=Quote Request&body=Hi, I would like to request a quote for container rental or purchase. Please contact me with more information.`}
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 inline-block text-center"
              >
                Request a Quote
              </a>
              <button className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3">
                Find Nearest Region
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Branches
