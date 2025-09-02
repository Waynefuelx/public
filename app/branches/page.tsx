'use client'


import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Star, Navigation, Globe, MapPinOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Branches from '@/components/Branches'

const BranchesPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearestBranch, setNearestBranch] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  // Function to find nearest branch
  const findNearestBranch = (userLat: number, userLng: number) => {
    let nearest = branches[0]
    let shortestDistance = calculateDistance(userLat, userLng, nearest.coordinates.lat, nearest.coordinates.lng)
    
    branches.forEach(branch => {
      const distance = calculateDistance(userLat, userLng, branch.coordinates.lat, branch.coordinates.lng)
      if (distance < shortestDistance) {
        shortestDistance = distance
        nearest = branch
      }
    })
    
    return { branch: nearest, distance: shortestDistance }
  }

  // Function to get user location and find nearest branch
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
              Our Branches
              <span className="block text-primary-100">Nationwide Coverage</span>
            </h1>
            <p 

              className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            >
              From the Southern Cape to Johannesburg, and expanding into Africa - Valley Containers 
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
                    Find Nearest Branch
                  </>
                )}
              </button>
              <Link 
                href="/rental"
                className="bg-white text-primary-500 hover:bg-secondary-100 font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-base sm:text-lg w-full sm:w-auto border border-primary-200 inline-flex items-center justify-center"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Nearest Branch Result */}
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
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                <div className="text-center mb-6">
                  <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Nearest Branch Found!</h3>
                  <p className="text-gray-600">Based on your current location</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900">{nearestBranch.branch.name}</h4>
                    <span className="text-sm bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
                      {nearestBranch.branch.region}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        <span>{nearestBranch.branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-primary-600" />
                        <a 
                          href={`tel:${nearestBranch.branch.phone}`}
                          className="hover:text-primary-600 transition-colors duration-200"
                        >
                          {nearestBranch.branch.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-primary-600" />
                        <a 
                          href={`mailto:${nearestBranch.branch.email}`}
                          className="hover:text-primary-800 transition-colors duration-200"
                          title={`Click to email ${nearestBranch.branch.email}`}
                        >
                          {nearestBranch.branch.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-primary-600" />
                        <span>{nearestBranch.branch.hours}</span>
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
                      href={`tel:${nearestBranch.branch.phone}`}
                      className="btn-primary text-center"
                    >
                      Call Branch
                    </a>
                    <Link 
                      href="/contact"
                      className="btn-secondary text-center"
                    >
                      Get Directions
                    </Link>
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
            <div

              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                7
              </div>
              <div className="text-sm sm:text-base text-gray-600">Branches</div>
            </div>
            <div

              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                5
              </div>
              <div className="text-sm sm:text-base text-gray-600">Provinces</div>
            </div>
            <div

              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                2
              </div>
              <div className="text-sm sm:text-base text-gray-600">Countries</div>
            </div>
            <div

              className="text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                30+
              </div>
              <div className="text-sm sm:text-base text-gray-600">Years Experience</div>
            </div>
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
                  Get Directions
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
