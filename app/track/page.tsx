'use client'

import { useState } from 'react'
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
  const [isSearching, setIsSearching] = useState(false)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)

  // Mock tracking data - in real app this would come from API
  const mockTrackingData: TrackingInfo = {
    containerId: 'VC-2024-001',
    status: 'in-transit',
    estimatedDelivery: '2024-01-15T14:00:00Z',
    currentLocation: 'N1 Highway, Johannesburg',
    driverName: 'Mike Johnson',
    driverPhone: '(555) 123-4567',
    driverEmail: 'mike.johnson@valleycontainers.co.za',
    lastUpdate: '2024-01-14T10:30:00Z',
    updates: [
      {
        id: '1',
        timestamp: '2024-01-14T10:30:00Z',
        status: 'In Transit',
        location: 'N1 Highway, Johannesburg',
        description: 'Container is en route to delivery location. Estimated arrival in 3 hours.',
        type: 'info'
      },
      {
        id: '2',
        timestamp: '2024-01-14T08:15:00Z',
        status: 'Departed Warehouse',
        location: 'Valley Containers Warehouse, Johannesburg',
        description: 'Container has left the warehouse and is on its way to your location.',
        type: 'success'
      },
      {
        id: '3',
        timestamp: '2024-01-14T07:00:00Z',
        status: 'Loading Complete',
        location: 'Valley Containers Warehouse, Johannesburg',
        description: 'Container has been loaded and secured for transport.',
        type: 'success'
      },
      {
        id: '4',
        timestamp: '2024-01-13T16:45:00Z',
        status: 'Confirmed',
        location: 'Valley Containers Warehouse, Johannesburg',
        description: 'Your order has been confirmed and is being prepared for delivery.',
        type: 'info'
      }
    ]
  }

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number')
      return
    }

    setIsSearching(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, show mock data for any tracking number
      setTrackingInfo(mockTrackingData)
      toast.success('Tracking information found!')
    } catch (error) {
      toast.error('Unable to find tracking information. Please check your tracking number.')
    } finally {
      setIsSearching(false)
    }
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

            {/* Map Placeholder */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Location</h3>
              <div className="bg-secondary-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive map showing container location</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Real-time GPS tracking and route visualization
                  </p>
                </div>
              </div>
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
