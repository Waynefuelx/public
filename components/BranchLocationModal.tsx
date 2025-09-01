'use client'

import { useState, useEffect } from 'react'
import { X, MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'

interface Branch {
  id: string
  name: string
  city: string
  province: string
  phone: string
  email: string
  hours: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface BranchLocationModalProps {
  isOpen: boolean
  onClose: () => void
}

const branches: Branch[] = [
  {
    id: 'george',
    name: 'George Branch',
    city: 'George',
    province: 'Western Cape',
    phone: '+27 44 878 0878',
    email: 'info@valleycontainers.co.za',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -33.9715, lng: 22.4571 } // George, Western Cape
  },
  {
    id: 'cape-town',
    name: 'Cape Town Branch',
    city: 'Cape Town',
    province: 'Western Cape',
    phone: '+27 72 211 1052',
    email: 'cpt@valleycontainers.co.za',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -33.9249, lng: 18.4241 } // Cape Town
  },
  {
    id: 'mossel-bay',
    name: 'Mossel Bay Branch',
    city: 'Mossel Bay',
    province: 'Western Cape',
    phone: '+27 (0)44 695 2555',
    email: 'msb@valleycontainers.co.za',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -34.1833, lng: 22.1333 } // Mossel Bay
  },
  {
    id: 'port-elizabeth',
    name: 'Gqeberha (Port Elizabeth) Branch',
    city: 'Gqeberha',
    province: 'Eastern Cape',
    phone: '+27 (0) 61 451 8829',
    email: 'sales@valleycontainers.co.za',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -33.7139, lng: 25.5207 } // Port Elizabeth
  },
  {
    id: 'kimberley',
    name: 'Kimberley Branch',
    city: 'Kimberley',
    province: 'Northern Cape',
    phone: '+27 (0)53 831 1554',
    email: 'kimberley@valleycontainers.co.za',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -28.7282, lng: 24.7499 } // Kimberley
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg Branch',
    city: 'Johannesburg',
    province: 'Gauteng',
    phone: '+27 71 371 2972',
    email: 'jhb@valleycontainers.co.za',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -26.2041, lng: 28.0473 } // Johannesburg
  },
  {
    id: 'mauritius',
    name: 'Mauritius Branch',
    city: 'Mauritius',
    province: 'International',
    phone: '+230 606 7684',
    email: 'info@valleycontainersma.mu',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    coordinates: { lat: -20.3484, lng: 57.5522 } // Mauritius
  }
]

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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

export default function BranchLocationModal({ isOpen, onClose }: BranchLocationModalProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [closestBranch, setClosestBranch] = useState<Branch | null>(null)
  const [closestDistance, setClosestDistance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && !userLocation) {
      getUserLocation()
    }
  }, [isOpen, userLocation])

  const getUserLocation = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        findClosestBranch(latitude, longitude)
        setIsLoading(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setError('Unable to get your location. Please allow location access or select a branch manually.')
        setIsLoading(false)
        // Show all branches if location fails
        setClosestBranch(branches[0]) // Default to George branch
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  const findClosestBranch = (userLat: number, userLng: number) => {
    let closest = branches[0]
    let shortestDistance = calculateDistance(userLat, userLng, closest.coordinates.lat, closest.coordinates.lng)

    branches.forEach(branch => {
      const distance = calculateDistance(userLat, userLng, branch.coordinates.lat, branch.coordinates.lng)
      if (distance < shortestDistance) {
        shortestDistance = distance
        closest = branch
      }
    })

    setClosestBranch(closest)
    setClosestDistance(shortestDistance)
  }

  const handleGetDirections = (branch: Branch) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates.lat},${branch.coordinates.lng}`
    window.open(url, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Find Your Nearest Branch</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Location Status */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Finding your location...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Closest Branch */}
          {closestBranch && (
            <div className="mb-6">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {closestBranch.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {closestBranch.city}, {closestBranch.province}
                      {closestDistance && (
                        <span className="ml-2 text-primary-600 font-medium">
                          • {closestDistance.toFixed(1)} km away
                        </span>
                      )}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary-600" />
                        <a 
                          href={`tel:${closestBranch.phone}`}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                        >
                          {closestBranch.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary-600" />
                        <a 
                          href={`mailto:${closestBranch.email}`}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                          title={`Click to email ${closestBranch.email}`}
                        >
                          {closestBranch.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-600" />
                        <span className="text-gray-600">{closestBranch.hours}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleGetDirections(closestBranch)}
                      className="mt-4 flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Branches */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Our Branches</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {branches.map((branch) => (
                <div 
                  key={branch.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    closestBranch?.id === branch.id 
                      ? 'border-primary-300 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setClosestBranch(branch)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{branch.name}</h4>
                      <p className="text-sm text-gray-600">{branch.city}, {branch.province}</p>
                    </div>
                    {closestBranch?.id === branch.id && (
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        Closest
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={getUserLocation}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Refresh Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
