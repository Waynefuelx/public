'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  CheckCircle,
  AlertCircle,
  Package,
  Navigation
} from 'lucide-react'
import toast from 'react-hot-toast'
import L from 'leaflet'
import { useTrackOrder } from '@/lib/api/hooks'
import LeafletMap from '@/components/organisms/LeafletMap'

interface TrackingInfo {
  containerId: string
  status: 'pending' | 'confirmed' | 'in-transit' | 'out-for-delivery' | 'delivered'
  estimatedDelivery: string
  currentLocation: string
  driverName: string
  driverPhone: string
  driverEmail: string
  lastUpdate: string
  updates: TrackingUpdate[]
}

interface TrackingUpdate {
  id: string
  timestamp: string
  status: string
  location: string
  description: string
  type: 'info' | 'warning' | 'success' | 'error'
}

const TrackPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [searchTrackingNumber, setSearchTrackingNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  // Fetch tracking info when searchTrackingNumber is set
  const { data: trackingData, isLoading: trackingLoading, error: trackingError } = useTrackOrder(searchTrackingNumber)
  
  // Use API data when available
  useEffect(() => {
    if (trackingData) {
      setTrackingInfo(trackingData)
      setIsSearching(false)
    }
    if (trackingError) {
      toast.error('Unable to find tracking information. Please check your tracking number.')
      setIsSearching(false)
    }
  }, [trackingData, trackingError])

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number')
      return
    }

    setIsSearching(true)
    setSearchTrackingNumber(trackingNumber.trim())
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'confirmed': return 'status-confirmed'
      case 'in-transit': return 'status-pending'
      case 'out-for-delivery': return 'status-confirmed'
      case 'delivered': return 'status-delivered'
      default: return 'status-pending'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />
      case 'confirmed': return <CheckCircle className="w-5 h-5" />
      case 'in-transit': return <Truck className="w-5 h-5" />
      case 'out-for-delivery': return <Navigation className="w-5 h-5" />
      case 'delivered': return <Package className="w-5 h-5" />
      default: return <Clock className="w-5 h-5" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours === 1) return '1 hour ago'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }

  // Add tracking marker to map
  const addTrackingMarker = (mapInstance: any) => {
    if (!trackingInfo || !mapInstance) return

    // Clear existing marker
    if (markerRef.current && markerRef.current.remove) {
      markerRef.current.remove()
      markerRef.current = null
    }

    
    // Create custom icon based on tracking status
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm" 
             style="background-color: ${
               trackingInfo.status === 'delivered' ? '#10B981' : 
               trackingInfo.status === 'in-transit' ? '#3B82F6' : 
               trackingInfo.status === 'out-for-delivery' ? '#8B5CF6' :
               trackingInfo.status === 'confirmed' ? '#F59E0B' : '#EF4444'
             }">
          <Truck class="w-5 h-5" />
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    })

    // Get coordinates for the current location
    const coords = getCoordinatesForLocation(trackingInfo.currentLocation)
    const marker = L.marker([coords.lat, coords.lng], {
      icon: customIcon
    }).addTo(mapInstance)

    // Create popup content
    const popupContent = `
      <div class="p-4 max-w-sm">
        <h3 class="font-semibold text-gray-900 mb-2">Container ${trackingInfo.containerId}</h3>
        <div class="space-y-2 text-sm">
          <p><strong>Status:</strong> ${trackingInfo.status.replace('-', ' ')}</p>
          <p><strong>Location:</strong> ${trackingInfo.currentLocation}</p>
          <p><strong>Driver:</strong> ${trackingInfo.driverName}</p>
          <p><strong>Phone:</strong> ${trackingInfo.driverPhone}</p>
          <p><strong>Last Update:</strong> ${formatTimeAgo(trackingInfo.lastUpdate)}</p>
        </div>
      </div>
    `

    marker.bindPopup(popupContent)
    markerRef.current = marker

    // Center map on marker
    mapInstance.setView([coords.lat, coords.lng], 10)
  }

  // Update marker when tracking info changes
  useEffect(() => {
    if (mapRef.current && trackingInfo) {
      addTrackingMarker(mapRef.current)
    }
  }, [trackingInfo])

  // Get coordinates for locations
  const getCoordinatesForLocation = (location: string) => {
    // Simple location mapping - in real app this would use geocoding
    const locationCoords: { [key: string]: { lat: number; lng: number } } = {
      'N1 Highway, Johannesburg': { lat: -26.2041, lng: 28.0473 },
      'Valley Containers Warehouse, Johannesburg': { lat: -26.2041, lng: 28.0473 },
      'Cape Town': { lat: -33.9249, lng: 18.4241 },
      'Durban': { lat: -29.8587, lng: 31.0218 },
      'Pretoria': { lat: -25.7479, lng: 28.2293 },
      'Port Elizabeth': { lat: -33.9608, lng: 25.6022 },
      'Bloemfontein': { lat: -29.0852, lng: 26.1596 },
      'East London': { lat: -33.0292, lng: 27.8546 },
      'Nelspruit': { lat: -25.4747, lng: 30.9703 }
    }
    
    // Try to find matching location
    for (const [key, coords] of Object.entries(locationCoords)) {
      if (location.toLowerCase().includes(key.toLowerCase())) {
        return coords
      }
    }
    
    return { lat: -30.5595, lng: 22.9375 } // Default to South Africa center
  }


  return (
    <div className="min-h-screen bg-secondary-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Your Container
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get real-time updates on your container delivery. Track location, estimated arrival time, 
            and contact your delivery driver directly.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Enter Your Tracking Number
              </h2>
              <p className="text-gray-600">
                Find your tracking number on your confirmation email or invoice
              </p>
            </div>

            <div className="flex space-x-3">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g., VC-2024-001)"
                className="input-field flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
              <button
                onClick={handleTrack}
                disabled={isSearching}
                className="btn-primary px-8"
              >
                {isSearching ? 'Searching...' : 'Track'}
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>Example tracking numbers: VC-2024-001, VC-2024-002, VC-2024-003</p>
            </div>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Status Overview */}
            <div className="card">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    {getStatusIcon(trackingInfo.status)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Current Status</h3>
                  <span className={`status-badge ${getStatusColor(trackingInfo.status)}`}>
                    {trackingInfo.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-success-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
                  <p className="text-success-600 font-medium">
                    {formatDate(trackingInfo.estimatedDelivery)}
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-warning-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Current Location</h3>
                  <p className="text-warning-600 font-medium">
                    {trackingInfo.currentLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Driver Information */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Driver</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Driver Name</p>
                    <p className="font-medium text-gray-900">{trackingInfo.driverName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a 
                      href={`tel:${trackingInfo.driverPhone}`}
                      className="font-medium text-success-600 hover:text-success-700"
                    >
                      {trackingInfo.driverPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href={`mailto:${trackingInfo.driverEmail}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {trackingInfo.driverEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Delivery Timeline</h3>
              <div className="space-y-6">
                {trackingInfo.updates.map((update, index) => (
                  <div key={update.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        update.type === 'success' ? 'bg-success-100' :
                        update.type === 'warning' ? 'bg-warning-100' :
                        update.type === 'error' ? 'bg-error-100' :
                        'bg-primary-100'
                      }`}>
                        {update.type === 'success' ? <CheckCircle className="w-4 h-4 text-success-600" /> :
                         update.type === 'warning' ? <AlertCircle className="w-4 h-4 text-warning-600" /> :
                         update.type === 'error' ? <AlertCircle className="w-4 h-4 text-error-600" /> :
                         <Package className="w-4 h-4 text-primary-600" />}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{update.status}</h4>
                        <span className="text-sm text-gray-500">{formatTimeAgo(update.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{update.location}</p>
                      <p className="text-sm text-gray-700">{update.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(update.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Location Map */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Location</h3>
              <LeafletMap
                mapId="track-live-map"
                height="400px"
                onMapReady={(map) => {
                  mapRef.current = map
                  if (trackingInfo) {
                    addTrackingMarker(map)
                  }
                }}
              >
                {/* Map Controls Overlay */}
                <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 shadow-lg">
                  <h4 className="text-sm font-semibold text-gray-900">Live Tracking</h4>
                  <p className="text-xs text-gray-600">Container {trackingInfo.containerId}</p>
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-lg max-w-xs">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Status Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0 shadow-sm"></div>
                      <span className="text-xs text-gray-700">Delivered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0 shadow-sm"></div>
                      <span className="text-xs text-gray-700">In Transit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0 shadow-sm"></div>
                      <span className="text-xs text-gray-700">Out for Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0 shadow-sm"></div>
                      <span className="text-xs text-gray-700">Confirmed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 shadow-sm"></div>
                      <span className="text-xs text-gray-700">Pending</span>
                    </div>
                  </div>
                </div>
                
                {/* Driver Info */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-sm font-semibold text-gray-900">{trackingInfo.driverName}</div>
                  <div className="text-xs text-gray-600">Driver</div>
                </div>
              </LeafletMap>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Tracking?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find your tracking information or need assistance? 
              Our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contact Support
              </button>
              <button className="btn-secondary">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackPage
