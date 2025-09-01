'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  LogOut,
  User,
  QrCode,
  Navigation
} from 'lucide-react'
import toast from 'react-hot-toast'

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
  status: 'pending' | 'in-transit' | 'delivered' | 'completed'
  driverName: string
  driverPhone: string
  notes: string
  serialNumber?: string
  qrCode?: string
}

interface Driver {
  id: string
  name: string
  phone: string
  email: string
  vehicleNumber: string
  licenseNumber: string
}

const DriverPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null)
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [scannedSerialNumber, setScannedSerialNumber] = useState('')
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Delivery['status']>>({})
  const [loginForm, setLoginForm] = useState({
    phone: '',
    password: ''
  })

  // Mock driver data
  const drivers: Driver[] = [
    {
      id: 'DR001',
      name: 'Mike Johnson',
      phone: '+27 82 555 1234',
      email: 'mike.johnson@valleycontainers.co.za',
      vehicleNumber: 'CA 123-456',
      licenseNumber: 'DL123456789'
    },
    {
      id: 'DR002',
      name: 'Tom Davis',
      phone: '+27 82 555 2345',
      email: 'tom.davis@valleycontainers.co.za',
      vehicleNumber: 'CA 234-567',
      licenseNumber: 'DL234567890'
    },
    {
      id: 'DR003',
      name: 'Sarah Wilson',
      phone: '+27 82 555 3456',
      email: 'sarah.wilson@valleycontainers.co.za',
      vehicleNumber: 'CA 345-678',
      licenseNumber: 'DL345678901'
    },
    {
      id: 'DR004',
      name: 'David Brown',
      phone: '+27 82 555 4567',
      email: 'david.brown@valleycontainers.co.za',
      vehicleNumber: 'CA 456-789',
      licenseNumber: 'DL456789012'
    }
  ]

  // Mock delivery data
  const allDeliveries: Delivery[] = [
    {
      id: 'D001',
      containerNumber: 'VC-20-001',
      containerType: '20ft Standard',
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
      driverName: 'Mike Johnson',
      driverPhone: '+27 82 555 1234',
      notes: 'Deliver to construction site - contact John Smith on arrival',
      serialNumber: 'VC20001-2024',
      qrCode: 'VC20001-2024-QR'
    },
    {
      id: 'D002',
      containerNumber: 'VC-40-002',
      containerType: '40ft High Cube',
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
      driverName: 'Tom Davis',
      driverPhone: '+27 82 555 2345',
      notes: 'Port delivery - security clearance required',
      serialNumber: 'VC40002-2024',
      qrCode: 'VC40002-2024-QR'
    },
    {
      id: 'D003',
      containerNumber: 'VC-20-003',
      containerType: '20ft Refrigerated',
      customerName: 'Fresh Foods Ltd',
      customerPhone: '+27 82 345 6789',
      customerEmail: 'info@freshfoods.co.za',
      deliveryAddress: '789 Industrial Park, Food Zone',
      deliveryCity: 'Johannesburg',
      deliveryProvince: 'Gauteng',
      coordinates: {
        lat: -26.2041,
        lng: 28.0473
      },
      scheduledDate: '2024-01-22T14:00:00Z',
      status: 'pending',
      driverName: 'Sarah Wilson',
      driverPhone: '+27 82 555 3456',
      notes: 'Refrigerated container - maintain temperature during transport',
      serialNumber: 'VC20003-2024',
      qrCode: 'VC20003-2024-QR'
    },
    {
      id: 'D004',
      containerNumber: 'VC-40-004',
      containerType: '40ft Standard',
      customerName: 'Mining Solutions Corp',
      customerPhone: '+27 82 456 7890',
      customerEmail: 'contact@miningsolutions.co.za',
      deliveryAddress: 'Mining Site A, Northern Cape',
      deliveryCity: 'Kimberley',
      deliveryProvince: 'Northern Cape',
      coordinates: {
        lat: -28.7282,
        lng: 24.7499
      },
      scheduledDate: '2024-01-23T07:00:00Z',
      status: 'pending',
      driverName: 'David Brown',
      driverPhone: '+27 82 555 4567',
      notes: 'Mining site delivery - safety equipment required',
      serialNumber: 'VC40004-2024',
      qrCode: 'VC40004-2024-QR'
    }
  ]

  // Load saved status overrides (persists across pages/tabs)
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('deliveryStatusOverrides') : null
      if (raw) setStatusOverrides(JSON.parse(raw))
    } catch {}
  }, [])

  const persistOverrides = (next: Record<string, Delivery['status']>) => {
    setStatusOverrides(next)
    try {
      localStorage.setItem('deliveryStatusOverrides', JSON.stringify(next))
    } catch {}
  }

  const updateDeliveryStatus = (deliveryId: string, nextStatus: Delivery['status']) => {
    const next = { ...statusOverrides, [deliveryId]: nextStatus }
    persistOverrides(next)
  }

  // Filter deliveries for current driver and apply effective status
  const driverDeliveries = allDeliveries
    .filter(delivery => delivery.driverName === currentDriver?.name)
    .map(delivery => ({
      ...delivery,
      status: statusOverrides[delivery.id] ?? delivery.status
    }))

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const driver = drivers.find(d => d.phone === loginForm.phone)
    if (driver) {
      setCurrentDriver(driver)
      setIsLoggedIn(true)
    } else {
      alert('Invalid phone number. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentDriver(null)
    setLoginForm({ phone: '', password: '' })
  }

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-transit': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const openGoogleMapsNavigation = (lat: number, lng: number, address: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
    window.open(url, '_blank')
  }

  const handleStartTrip = (delivery: Delivery) => {
    if (delivery.status === 'in-transit') return
    updateDeliveryStatus(delivery.id, 'in-transit')
    toast.success(`Customer notified: Driver is on the way to ${delivery.deliveryCity}`)
  }

  const handleSerialNumberSubmit = (deliveryId: string, serialNumber: string) => {
    console.log(`Delivery ${deliveryId} serial number: ${serialNumber}`)
    setScannedSerialNumber('')
    // In real app, update delivery status via API
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

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Driver Portal</h1>
            <p className="text-gray-600 mt-2">Valley Containers Delivery System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={loginForm.phone}
                onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                placeholder="+27 82 555 1234"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo Credentials: Use any driver phone number from the list
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Driver Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Driver Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {currentDriver?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentDriver?.vehicleNumber}</p>
                <p className="text-xs text-gray-600">Vehicle</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {driverDeliveries.filter(d => d.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-gray-900">
                  {driverDeliveries.filter(d => d.status === 'in-transit').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {driverDeliveries.filter(d => d.status === 'delivered' || d.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Navigation className="w-4 h-4 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{driverDeliveries.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deliveries */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">My Deliveries</h2>
            <p className="text-sm text-gray-600">Manage your assigned container deliveries</p>
          </div>

          {driverDeliveries.length === 0 ? (
            <div className="p-8 text-center">
              <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Deliveries Assigned</h3>
              <p className="text-gray-600">You don't have any deliveries assigned at the moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {driverDeliveries.map((delivery) => (
                <div key={delivery.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{delivery.containerNumber}</h3>
                      <p className="text-sm text-gray-600">{delivery.containerType}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDeliveryStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-medium text-gray-900">{delivery.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{delivery.deliveryCity}, {delivery.deliveryProvince}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Scheduled</p>
                      <p className="font-medium text-gray-900">{formatDate(delivery.scheduledDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{delivery.deliveryAddress}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {delivery.status === 'pending' && (
                      <button
                        onClick={() => handleStartTrip(delivery)}
                        className="btn-primary text-sm"
                      >
                        Start Trip
                      </button>
                    )}
                    <button
                      onClick={() => openGoogleMapsNavigation(delivery.coordinates.lat, delivery.coordinates.lng, delivery.deliveryAddress)}
                      className="btn-primary text-sm"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Navigate
                    </button>
                    <a
                      href={`tel:${delivery.customerPhone}`}
                      className="btn-secondary text-sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Customer
                    </a>
                    <button
                      onClick={() => setSelectedDelivery(delivery)}
                      className="btn-secondary text-sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delivery Detail Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
                <button
                  onClick={() => setSelectedDelivery(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Delivery Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Container Number</p>
                      <p className="font-medium text-gray-900">{selectedDelivery.containerNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Container Type</p>
                      <p className="font-medium text-gray-900">{selectedDelivery.containerType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Scheduled Date</p>
                      <p className="font-medium text-gray-900">{formatDate(selectedDelivery.scheduledDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliveryStatusColor(statusOverrides[selectedDelivery.id] ?? selectedDelivery.status)}`}>
                        {statusOverrides[selectedDelivery.id] ?? selectedDelivery.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Customer Name</p>
                      <p className="font-medium text-gray-900">{selectedDelivery.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{selectedDelivery.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a 
                        href={`tel:${selectedDelivery.customerPhone}`}
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        {selectedDelivery.customerPhone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{selectedDelivery.deliveryAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">City & Province</p>
                      <p className="font-medium text-gray-900">{selectedDelivery.deliveryCity}, {selectedDelivery.deliveryProvince}</p>
                    </div>
                  </div>
                </div>

                {/* Serial Number Verification */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Container Verification</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Expected Serial Number</p>
                      <p className="font-medium text-gray-900 bg-gray-50 p-2 rounded">{selectedDelivery.serialNumber}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Enter or Scan Serial Number</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={scannedSerialNumber}
                          onChange={(e) => setScannedSerialNumber(e.target.value)}
                          placeholder="Enter serial number or scan QR code"
                          className="input-field flex-1"
                        />
                        <button
                          onClick={() => setShowQRScanner(true)}
                          className="btn-secondary"
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          Scan QR
                        </button>
                      </div>
                    </div>

                    {scannedSerialNumber && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSerialNumberSubmit(selectedDelivery.id, scannedSerialNumber)}
                          className="btn-primary flex-1"
                        >
                          Verify & Complete Delivery
                        </button>
                        <button
                          onClick={() => setScannedSerialNumber('')}
                          className="btn-secondary"
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedDelivery.notes && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Delivery Notes</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedDelivery.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  {(statusOverrides[selectedDelivery.id] ?? selectedDelivery.status) === 'pending' && (
                    <button 
                      onClick={() => handleStartTrip({ ...selectedDelivery, status: statusOverrides[selectedDelivery.id] ?? selectedDelivery.status })}
                      className="btn-primary flex-1"
                    >
                      Start Trip
                    </button>
                  )}
                  <a 
                    href={`tel:${selectedDelivery.customerPhone}`}
                    className="btn-primary flex-1 text-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </a>
                  <button
                    onClick={() => openGoogleMapsNavigation(selectedDelivery.coordinates.lat, selectedDelivery.coordinates.lng, selectedDelivery.deliveryAddress)}
                    className="btn-secondary flex-1"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Navigate to Location
                  </button>
                  <button
                    onClick={() => setSelectedDelivery(null)}
                    className="btn-secondary flex-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan QR Code</h3>
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-500 text-sm">
                  QR Scanner Placeholder
                  <br />
                  (In real app, integrate with camera API)
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowQRScanner(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setScannedSerialNumber('VC20001-2024-QR')
                    setShowQRScanner(false)
                  }}
                  className="btn-primary flex-1"
                >
                  Simulate Scan
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default DriverPage
