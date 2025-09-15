'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Navigation,
  Phone,
  Mail,
  Package,
  User,
  Calendar,
  Edit3
} from 'lucide-react'

interface Delivery {
  id: string
  containerNumber: string
  containerType: string
  customerName: string
  customerPhone: string
  customerEmail: string
  deliveryAddress: string
  deliveryCity: string
  deliveryProvince: string
  coordinates: {
    lat: number
    lng: number
  }
  scheduledDate: string
  status: 'pending' | 'in-transit' | 'delivered'
  driverName: string
  driverPhone: string
  notes: string
  serialNumber: string
  qrCode: string
}

const DriverDashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('deliveries')
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [isTracking, setIsTracking] = useState(false)
  const [licenseExpiry, setLicenseExpiry] = useState('')
  const [showLicenseWarning, setShowLicenseWarning] = useState(false)
  const [isEditingLicense, setIsEditingLicense] = useState(false)

  // Mock deliveries assigned to this driver
  useEffect(() => {
    const mockDeliveries: Delivery[] = [
      {
        id: 'D001',
        containerNumber: 'VC-20-001',
        containerType: '6m Standard',
        customerName: 'Construction Plus Inc.',
        customerPhone: '+27 82 123 4567',
        customerEmail: 'john.smith@constructionplus.co.za',
        deliveryAddress: '123 Main Street, Industrial Area',
        deliveryCity: 'George',
        deliveryProvince: 'Western Cape',
        coordinates: {
          lat: -33.9715,
          lng: 22.4617
        },
        scheduledDate: '2024-01-20T08:00:00Z',
        status: 'pending',
        driverName: user?.name || 'Mike Johnson',
        driverPhone: '+27 82 555 1234',
        notes: 'Deliver to construction site - contact John Smith on arrival',
        serialNumber: 'VC20001-2024',
        qrCode: 'VC20001-2024-QR'
      },
      {
        id: 'D002',
        containerNumber: 'VC-40-002',
        containerType: '12m High Cube',
        customerName: 'Global Logistics Solutions',
        customerPhone: '+27 82 234 5678',
        customerEmail: 'maria.garcia@globallogistics.co.za',
        deliveryAddress: '456 Harbour Road, Port Area',
        deliveryCity: 'Cape Town',
        deliveryProvince: 'Western Cape',
        coordinates: {
          lat: -33.9249,
          lng: 18.4241
        },
        scheduledDate: '2024-01-21T10:00:00Z',
        status: 'in-transit',
        driverName: user?.name || 'Mike Johnson',
        driverPhone: '+27 82 555 1234',
        notes: 'Port delivery - security clearance required',
        serialNumber: 'VC40002-2024',
        qrCode: 'VC40002-2024-QR'
      }
    ]
    setDeliveries(mockDeliveries)
  }, [user])

  // Load license expiry date and check for warnings
  useEffect(() => {
    // Load license expiry from localStorage (in a real app, this would come from the backend)
    const savedLicenseExpiry = localStorage.getItem('driverLicenseExpiry')
    if (savedLicenseExpiry) {
      setLicenseExpiry(savedLicenseExpiry)
      
      // Check if license expires within 2 months
      const expiryDate = new Date(savedLicenseExpiry)
      const today = new Date()
      const twoMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())
      
      if (expiryDate <= twoMonthsFromNow && expiryDate > today) {
        setShowLicenseWarning(true)
      }
    }
  }, [])


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in-transit':
        return <Truck className="w-4 h-4 text-blue-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />
      default:
        return <Package className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'in-transit':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const startDelivery = (deliveryId: string) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: 'in-transit' as const }
        : delivery
    ))
    setIsTracking(true)
  }

  const completeDelivery = (deliveryId: string) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: 'delivered' as const }
        : delivery
    ))
    setIsTracking(false)
  }

  const navigateToDelivery = (delivery: Delivery) => {
    const fullAddress = `${delivery.deliveryAddress}, ${delivery.deliveryCity}, ${delivery.deliveryProvince}`
    const encodedAddress = encodeURIComponent(fullAddress)
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    window.open(googleMapsUrl, '_blank')
  }

  const handleLicenseExpiryChange = (date: string) => {
    setLicenseExpiry(date)
    localStorage.setItem('driverLicenseExpiry', date)
    
    // Check if license expires within 2 months
    const expiryDate = new Date(date)
    const today = new Date()
    const twoMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())
    
    if (expiryDate <= twoMonthsFromNow && expiryDate > today) {
      setShowLicenseWarning(true)
    } else {
      setShowLicenseWarning(false)
    }
  }

  const dismissLicenseWarning = () => {
    setShowLicenseWarning(false)
  }

  const toggleLicenseEdit = () => {
    setIsEditingLicense(!isEditingLicense)
  }

  const handleLicenseSave = () => {
    setIsEditingLicense(false)
  }

  const tabs = [
    { id: 'deliveries', label: 'My Deliveries', icon: Truck },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <ProtectedRoute allowedTypes={['driver']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900 truncate">Driver Portal</h1>
                    <button 
                      onClick={logout}
                      className="text-sm text-primary-600 hover:text-primary-500 transition-colors flex-shrink-0"
                    >
                      Logout
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm text-gray-600">
                        {isTracking ? 'Tracking Active' : 'Tracking Off'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 truncate">{user?.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between h-16">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Driver Portal</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-600">
                      {isTracking ? 'Tracking Active' : 'Tracking Off'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{user?.email}</span>
                  <button 
                    onClick={logout}
                    className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* License Expiry Warning */}
        {showLicenseWarning && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-orange-800">
                    Driver's License Expiry Warning
                  </h3>
                  <div className="mt-2 text-sm text-orange-700">
                    <p>
                      Your driver's license will expire on {new Date(licenseExpiry).toLocaleDateString('en-ZA')}. 
                      Please renew your license as soon as possible to avoid any service interruptions.
                    </p>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={dismissLicenseWarning}
                      className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-md hover:bg-orange-200 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'deliveries' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Truck className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
                        <p className="text-2xl font-bold text-gray-900">{deliveries.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {deliveries.filter(d => d.status === 'pending').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {deliveries.filter(d => d.status === 'delivered').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deliveries List */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Assigned Deliveries</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {deliveries.map((delivery) => (
                      <div key={delivery.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            {getStatusIcon(delivery.status)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium text-gray-900">
                                  {delivery.containerNumber} - {delivery.containerType}
                                </p>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(delivery.status)}`}>
                                  {delivery.status.replace('-', ' ')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                Customer: {delivery.customerName}
                              </p>
                              <p className="text-sm text-gray-500">
                                Deliver to: {delivery.deliveryAddress}, {delivery.deliveryCity}
                              </p>
                              <p className="text-sm text-gray-500">
                                Scheduled: {formatDate(delivery.scheduledDate)}
                              </p>
                              {delivery.notes && (
                                <p className="text-sm text-gray-500 mt-1">
                                  <span className="font-medium">Notes:</span> {delivery.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => navigateToDelivery(delivery)}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                Navigate
                              </button>
                              <a
                                href={`tel:${delivery.customerPhone}`}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                              >
                                <Phone className="w-3 h-3 mr-1" />
                                Call
                              </a>
                              <a
                                href={`mailto:${delivery.customerEmail}`}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                              >
                                <Mail className="w-3 h-3 mr-1" />
                                Email
                              </a>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {delivery.status === 'pending' && (
                                <button
                                  onClick={() => startDelivery(delivery.id)}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-primary-600 hover:bg-primary-700"
                                >
                                  <Navigation className="w-3 h-3 mr-1" />
                                  Start Delivery
                                </button>
                              )}
                              {delivery.status === 'in-transit' && (
                                <button
                                  onClick={() => completeDelivery(delivery.id)}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Mark Delivered
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}


            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{user?.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Driver ID</label>
                      <p className="mt-1 text-sm text-gray-900">{user?.driverId}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">License Expiry Date</label>
                      {isEditingLicense ? (
                        <div className="mt-1">
                          <input
                            type="date"
                            value={licenseExpiry}
                            onChange={(e) => handleLicenseExpiryChange(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="Select license expiry date"
                          />
                          <div className="mt-2 flex space-x-2">
                            <button
                              onClick={handleLicenseSave}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-primary-600 hover:bg-primary-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={toggleLicenseEdit}
                              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center space-x-2">
                          <p className="text-sm text-gray-900">
                            {licenseExpiry ? new Date(licenseExpiry).toLocaleDateString('en-ZA') : 'Not set'}
                          </p>
                          <button
                            onClick={toggleLicenseEdit}
                            className="inline-flex items-center p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Your driver's license expires every 5 years in South Africa
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {deliveries.filter(d => d.status === 'delivered').length}
                      </p>
                      <p className="text-sm text-gray-600">Completed Deliveries</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {deliveries.filter(d => d.status === 'in-transit').length}
                      </p>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {deliveries.filter(d => d.status === 'pending').length}
                      </p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default DriverDashboard