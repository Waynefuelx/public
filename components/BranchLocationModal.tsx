'use client'

import { useState, useEffect } from 'react'
import { X, MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import { siteConfig, type RegionContact } from '@/lib/site-config'

interface BranchLocationModalProps {
  isOpen: boolean
  onClose: () => void
}

const regions: RegionContact[] = siteConfig.regions

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
  const [closestBranch, setClosestBranch] = useState<RegionContact | null>(null)
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
        setError('Unable to get your location. Please allow location access or select a region manually.')
        setIsLoading(false)
        // Show all regions if location fails
        setClosestBranch(regions[0]) // Default to Western Cape region
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  const findClosestBranch = (userLat: number, userLng: number) => {
    let closest = regions[0]
    let shortestDistance = calculateDistance(userLat, userLng, closest.coordinates.lat, closest.coordinates.lng)

    regions.forEach(region => {
      const distance = calculateDistance(userLat, userLng, region.coordinates.lat, region.coordinates.lng)
      if (distance < shortestDistance) {
        shortestDistance = distance
        closest = region
      }
    })

    setClosestBranch(closest)
    setClosestDistance(shortestDistance)
  }

  const handleGetDirections = (region: RegionContact) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${region.coordinates.lat},${region.coordinates.lng}`
    window.open(url, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Find Your Nearest Region</h2>
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

          {/* Closest Region */}
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
                      {closestBranch.city}
                      {closestDistance && (
                        <span className="ml-2 text-primary-600 font-medium">
                          • {closestDistance.toFixed(1)} km away
                        </span>
                      )}
                    </p>

                    {/* Address(es) — Southern Cape has two depots */}
                    {closestBranch.depots ? (
                      <div className="space-y-3 mb-3">
                        {closestBranch.depots.map((depot) => (
                          <div key={depot.name} className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                            <div className="text-gray-600">
                              <span className="font-medium text-gray-900">{depot.name}: </span>
                              {depot.addressLines.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 text-sm mb-3">
                        <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{closestBranch.addressLines.join(', ')}</span>
                      </div>
                    )}

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

          {/* All Regions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Our Regions</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {regions.map((region) => (
                <div
                  key={region.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    closestBranch?.id === region.id
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setClosestBranch(region)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{region.name}</h4>
                      <p className="text-sm text-gray-600">{region.city}</p>
                    </div>
                    {closestBranch?.id === region.id && (
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
