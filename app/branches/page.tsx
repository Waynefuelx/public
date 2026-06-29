'use client'


import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Star, Navigation, Globe, MapPinOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Branches from '@/components/Branches'
import { siteConfig, type RegionContact } from '@/lib/site-config'

const BranchesPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestBranch, setNearestBranch] = useState<{ region: RegionContact; distance: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const regions = siteConfig.regions

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Function to find nearest region
  const findNearestBranch = (userLat: number, userLng: number) => {
    let nearest = regions[0]
    let shortestDistance = calculateDistance(userLat, userLng, nearest.coordinates.lat, nearest.coordinates.lng)

    regions.forEach(region => {
      const distance = calculateDistance(userLat, userLng, region.coordinates.lat, region.coordinates.lng)
      if (distance < shortestDistance) {
        shortestDistance = distance
        nearest = region
      }
    })

    return { region: nearest, distance: shortestDistance }
  }

  // Function to get user location and find nearest region
  const handleFindNearestBranch = () => {
    setIsLoading(true)
    setError(null)
    setNearestBranch(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })

        const result = findNearestBranch(latitude, longitude)
        setNearestBranch(result)
        setIsLoading(false)
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        setError(errorMessage)
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

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
              Our Regions
              <span className="block text-primary-100">Western &amp; Southern Cape · Gauteng · Mpumalanga</span>
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              From the Western &amp; Southern Cape to Gauteng and Mpumalanga, {siteConfig.company.name}
              brings professional container solutions closer to you.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <button
                onClick={handleFindNearestBranch}
                disabled={isLoading}
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Finding...
                  </>
                ) : (
                  <>
                    <MapPin className="w-5 h-5" />
                    Find Nearest Region
                  </>
                )}
              </button>
              <a
                href={`mailto:${siteConfig.company.primaryEmail}?subject=Quote Request&body=Hi, I would like to request a quote for container rental or purchase. Please contact me with more information.`}
                className="bg-white text-primary-500 hover:bg-secondary-100 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto border border-primary-200 inline-flex items-center justify-center"
              >
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nearest Region Result */}
      {(nearestBranch || error) && (
        <section
          className="py-8 bg-white border-b border-gray-200"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <MapPinOff className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">Location Error</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={handleFindNearestBranch}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : nearestBranch && (
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                <div className="text-center mb-6">
                  <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Nearest Region Found!</h3>
                  <p className="text-gray-600">Based on your current location</p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{nearestBranch.region.name}</h4>
                    <span className="text-sm bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                      {nearestBranch.region.city}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      {/* Address(es) — Southern Cape has two depots */}
                      {nearestBranch.region.depots ? (
                        nearestBranch.region.depots.map((depot) => (
                          <div key={depot.name} className="flex items-start gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                            <span>
                              <span className="font-medium text-gray-900">{depot.name}: </span>
                              {depot.addressLines.join(', ')}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span>{nearestBranch.region.addressLines.join(', ')}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-primary-600" />
                        <a
                          href={`tel:${nearestBranch.region.phone}`}
                          className="hover:text-primary-600 transition-colors duration-200"
                        >
                          {nearestBranch.region.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-primary-600" />
                        <a
                          href={`mailto:${nearestBranch.region.email}`}
                          className="hover:text-primary-800 transition-colors duration-200"
                          title={`Click to email ${nearestBranch.region.email}`}
                        >
                          {nearestBranch.region.email}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-primary-600" />
                        <span>{nearestBranch.region.hours}</span>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">
                          {nearestBranch.distance.toFixed(1)} km
                        </div>
                        <div className="text-sm text-gray-500">Distance from you</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`tel:${nearestBranch.region.phone}`}
                      className="btn-primary text-center"
                    >
                      Call Region
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${nearestBranch.region.coordinates.lat},${nearestBranch.region.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-center"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                4
              </div>
              <div className="text-sm sm:text-base text-gray-600">Regions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                5
              </div>
              <div className="text-sm sm:text-base text-gray-600">Depots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                ~{siteConfig.company.yearsExperience}
              </div>
              <div className="text-sm sm:text-base text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                100%
              </div>
              <div className="text-sm sm:text-base text-gray-600">Best Value Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Component */}
      <Branches />

      {/* Contact CTA */}
      <section className="py-16 sm:py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Need Help Finding the Right Region?
          </h2>
          <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Our team is here to help you connect with the nearest region and get the container solutions you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              href="/contact"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100 w-full sm:w-auto"
            >
              Contact Us
            </Link>
            <button
              onClick={handleFindNearestBranch}
              disabled={isLoading}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Finding...
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  Find Nearest Region
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BranchesPage
