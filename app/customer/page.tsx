'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { 
  ShoppingCart, 
  Truck, 
  Wrench, 
  MapPin, 
  History, 
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Shield,
  Settings,
  ArrowRight,
  Building2,
  Crown,
  Star,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

interface Order {
  id: string
  containerType: string
  category: 'Purchase' | 'Rental'
  status: 'pending' | 'confirmed' | 'in-transit' | 'delivered'
  orderDate: string
  deliveryDate?: string
  trackingNumber?: string
  totalAmount: number
  customerName: string
  customerEmail: string
  customerPhone: string
  city: string
  province: string
  deliveryAddress?: string
  specialRequirements?: string
  containerId: string
  isNew: boolean
}

const CustomerDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [orders, setOrders] = useState<Order[]>([])
  const [conversionRequest, setConversionRequest] = useState({
    type: 'Office Conversion',
    containerSize: '6m Standard',
    description: '',
    budget: 'Under R50,000',
    timeline: 'ASAP'
  })
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Mock orders data for the customer
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'O001',
        containerType: 'Used Container',
        category: 'Purchase',
        status: 'delivered',
        orderDate: '2024-01-15T10:00:00Z',
        deliveryDate: '2024-01-20T14:00:00Z',
        trackingNumber: 'VC20001-2024',
        totalAmount: 15000,
        customerName: user?.name || 'John Smith',
        customerEmail: user?.email || 'customer@valley.com',
        customerPhone: '+27 82 123 4567',
        city: 'Cape Town',
        province: 'Western Cape',
        deliveryAddress: '123 Main Street, Industrial Area',
        specialRequirements: 'Deliver to construction site',
        containerId: '20-001',
        isNew: false
      },
      {
        id: 'O002',
        containerType: '6m Office Container',
        category: 'Rental',
        status: 'in-transit',
        orderDate: '2024-01-18T09:30:00Z',
        deliveryDate: '2024-01-25T10:00:00Z',
        trackingNumber: 'VC40002-2024',
        totalAmount: 2500,
        customerName: user?.name || 'John Smith',
        customerEmail: user?.email || 'customer@valley.com',
        customerPhone: '+27 82 123 4567',
        city: 'Johannesburg',
        province: 'Gauteng',
        deliveryAddress: '456 Business Park, Storage Zone',
        specialRequirements: 'Monthly rental - 6 months',
        containerId: '40-002',
        isNew: false
      },
      {
        id: 'O003',
        containerType: '6m Refrigeration Container',
        category: 'Purchase',
        status: 'confirmed',
        orderDate: '2024-01-20T14:15:00Z',
        deliveryDate: '2024-01-28T08:00:00Z',
        totalAmount: 22000,
        customerName: user?.name || 'John Smith',
        customerEmail: user?.email || 'customer@valley.com',
        customerPhone: '+27 82 123 4567',
        city: 'Durban',
        province: 'KwaZulu-Natal',
        deliveryAddress: '789 Food Processing Plant',
        specialRequirements: 'Refrigerated container for food storage',
        containerId: '20-003',
        isNew: true
      }
    ]
    setOrders(mockOrders)
  }, [user])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in-transit':
        return <Truck className="w-4 h-4 text-blue-600" />
      case 'confirmed':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-orange-600" />
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
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-800'
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
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount)
  }

  const handleConversionRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    alert(`Conversion request submitted!\n\nType: ${conversionRequest.type}\nContainer: ${conversionRequest.containerSize}\nBudget: ${conversionRequest.budget}\nTimeline: ${conversionRequest.timeline}\n\nWe'll contact you within 24 hours with a detailed quote.`)
    
    // Reset form
    setConversionRequest({
      type: 'Office Conversion',
      containerSize: '6m Standard',
      description: '',
      budget: 'Under R50,000',
      timeline: 'ASAP'
    })
  }

  // Load Leaflet (OpenStreetMap) script and CSS
  useEffect(() => {
    if (activeTab === 'tracking' && !isMapLoaded) {
      // Check if Leaflet is already loaded
      if (typeof window !== 'undefined' && (window as any).L) {
        setIsMapLoaded(true)
        setTimeout(() => initializeMap(), 100)
        return
      }

      // Load Leaflet CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
      link.crossOrigin = ''
      document.head.appendChild(link)

      // Load Leaflet JS
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
      script.crossOrigin = ''
      script.onload = () => {
        setIsMapLoaded(true)
        setTimeout(() => initializeMap(), 100)
      }
      document.head.appendChild(script)
    }
  }, [activeTab, isMapLoaded])

  // Initialize Leaflet Map
  const initializeMap = () => {
    if (typeof window !== 'undefined' && (window as any).L) {
      const mapElement = document.getElementById('customer-tracking-map')
      if (mapElement && !map) {
        const L = (window as any).L
        
        // Clear any existing map
        if (map) {
          map.remove()
        }
        
        const newMap: any = L.map('customer-tracking-map', {
          center: [-30.5595, 22.9375], // Center of South Africa
          zoom: 6,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          dragging: true,
          touchZoom: true,
          attributionControl: false
        })
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors'
        }).addTo(newMap)
        
        // Force map to resize after initialization
        setTimeout(() => {
          newMap.invalidateSize()
        }, 200)
        
        setMap(newMap)
        addOrderMarkers(newMap)
      }
    }
  }

  // Add order markers to map
  const addOrderMarkers = (mapInstance: any) => {
    const newMarkers: any[] = []
    
    orders.filter(order => order.trackingNumber).forEach((order) => {
      // Create custom icon based on order status
      const customIcon = (window as any).L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs" 
               style="background-color: ${
                 order.status === 'delivered' ? '#10B981' : 
                 order.status === 'in-transit' ? '#3B82F6' : 
                 order.status === 'confirmed' ? '#F59E0B' : '#EF4444'
               }">
            ${order.id.slice(-2)}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })

      // Use order delivery address coordinates or default to city center
      const coords = getCoordinatesForCity(order.city)
      const marker = (window as any).L.marker([coords.lat, coords.lng], {
        icon: customIcon
      }).addTo(mapInstance)

      // Create popup content
      const popupContent = `
        <div class="p-3 max-w-xs">
          <h3 class="font-semibold text-gray-900 mb-2">Order #${order.id}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>Container:</strong> ${order.containerType}</p>
            <p><strong>Status:</strong> ${order.status.replace('-', ' ')}</p>
            <p><strong>Location:</strong> ${order.city}, ${order.province}</p>
            <p><strong>Tracking:</strong> ${order.trackingNumber}</p>
            <p><strong>Amount:</strong> ${formatCurrency(order.totalAmount)}</p>
          </div>
        </div>
      `

      marker.bindPopup(popupContent)
      newMarkers.push(marker)
    })
    
    setMarkers(newMarkers)
  }

  // Get coordinates for major South African cities
  const getCoordinatesForCity = (city: string) => {
    const cityCoords: { [key: string]: { lat: number; lng: number } } = {
      'Cape Town': { lat: -33.9249, lng: 18.4241 },
      'Johannesburg': { lat: -26.2041, lng: 28.0473 },
      'Durban': { lat: -29.8587, lng: 31.0218 },
      'Pretoria': { lat: -25.7479, lng: 28.2293 },
      'Port Elizabeth': { lat: -33.9608, lng: 25.6022 },
      'Bloemfontein': { lat: -29.0852, lng: 26.1596 },
      'East London': { lat: -33.0292, lng: 27.8546 },
      'Nelspruit': { lat: -25.4747, lng: 30.9703 }
    }
    
    return cityCoords[city] || { lat: -30.5595, lng: 22.9375 } // Default to South Africa center
  }

  // Cleanup map when component unmounts or tab changes
  useEffect(() => {
    return () => {
      // Remove all markers
      markers.forEach(marker => {
        if (marker && marker.remove) {
          marker.remove()
        }
      })
      setMarkers([])
      
      // Clear map
      if (map && map.remove) {
        map.remove()
        setMap(null)
      }
      
      // Reset map loaded state
      setIsMapLoaded(false)
    }
  }, [activeTab])

  // Add map styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
      #customer-tracking-map {
        height: 384px !important;
        width: 100% !important;
        position: relative !important;
        z-index: 1 !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
      }
      .leaflet-popup-content {
        margin: 0 !important;
        padding: 0 !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'containers', label: 'Containers', icon: ShoppingCart },
    { id: 'conversions', label: 'Container Conversions', icon: Wrench },
    { id: 'tracking', label: 'Track Orders', icon: MapPin },
    { id: 'history', label: 'Order History', icon: History }
  ]

  return (
    <ProtectedRoute allowedTypes={['customer']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 min-h-[4rem]">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 break-words">Customer Portal</h1>
                <p className="text-sm text-gray-600 break-words">Welcome back, {user?.name}</p>
              </div>
              <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                <span className="text-sm text-gray-600 break-words hidden sm:inline">{user?.email}</span>
                <button className="text-sm text-primary-600 hover:text-primary-500 whitespace-nowrap">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Delivered</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => o.status === 'delivered').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {orders.filter(o => o.status !== 'delivered').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(order.status)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {order.containerType} - {order.category}
                              </p>
                              <p className="text-sm text-gray-500">
                                Order #{order.id} • {formatDate(order.orderDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.replace('-', ' ')}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(order.totalAmount)}
                            </span>
                            {order.trackingNumber && (
                              <button className="text-primary-600 hover:text-primary-500 text-sm">
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'containers' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 sm:mb-4">Container Solutions</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Browse our complete range of container solutions. Each container can be rented or purchased to suit your needs.</p>
                  
                  {/* Container Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Storage Containers */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png"
                          alt="Storage Containers"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Storage Containers</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Secure storage solutions for your business needs.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Weather resistant</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Secure locking system</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Easy access</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Durable construction</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">R150/day</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=storage&type=Storage+Containers&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=R150%2Fday'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=storage&type=Storage+Containers&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=R150%2Fday'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Office Containers */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png"
                          alt="Office Containers"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Office Containers</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Professional office spaces in modular containers.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Climate control</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Professional finish</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Electrical outlets</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Windows & doors</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">R450/month</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=office&type=Office+Containers&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=R450%2Fmonth'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=office&type=Office+Containers&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=R450%2Fmonth'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* New Container */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png"
                          alt="New Container"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">New Container</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Brand new container with full warranty and certification.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Full manufacturer warranty</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>ISO certified</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Multiple size options</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Quality guarantee</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">2m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">3m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">R25,000</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=new-container&type=New+Container&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=R25000'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=new-container&type=New+Container&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=R25000'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Used Container */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png"
                          alt="Used Container"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Used Container</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Quality pre-owned container at competitive price.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Quality inspected</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Good condition guarantee</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Cost-effective option</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>30-day warranty</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">2m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">3m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">R15,000</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=used-container&type=Used+Container&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=R15000'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=used-container&type=Used+Container&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=R15000'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Modified Container */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png"
                          alt="Modified Container"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Modified Container</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Custom modified containers tailored to your specific requirements.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Custom modifications</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Professional installation</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Quality materials</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Warranty included</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">Custom</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">pricing</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=modified-container&type=Modified+Container&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=Custom'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=modified-container&type=Modified+Container&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=Custom'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* VIP Container Office */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png"
                          alt="VIP Container Office"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Popular
                        </div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">VIP Container Office</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Premium office container with luxury amenities.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Premium finishes</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Full climate control</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>High-end fixtures</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Executive layout</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">R550/month</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=vip-office&type=VIP+Container+Office&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=R550%2Fmonth'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=vip-office&type=VIP+Container+Office&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=R550%2Fmonth'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Refrigeration / Freezer Container */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png"
                          alt="Refrigeration / Freezer Container"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Refrigeration / Freezer Container</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Temperature-controlled containers for perishable goods.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Temperature control</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Insulated walls</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Energy efficient</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Food grade materials</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">R800/month</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=refrigeration&type=Refrigeration+%2F+Freezer+Container&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=R800%2Fmonth'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=refrigeration&type=Refrigeration+%2F+Freezer+Container&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=R800%2Fmonth'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Event Container */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png"
                          alt="Event Container"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Event Container</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Perfect for events, exhibitions, and temporary structures.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Quick setup</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Flexible configuration</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Professional appearance</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Easy transport</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">R350/month</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=event&type=Event+Container&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=R350%2Fmonth'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=event&type=Event+Container&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=R350%2Fmonth'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Industrial Container */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png"
                          alt="Industrial Container"
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3">
                          <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Industrial Container</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Heavy-duty containers for industrial applications.</p>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Features:</h4>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Heavy-duty construction</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Industrial grade materials</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Custom modifications available</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>Long-term durability</span>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-3 sm:mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Sizes:</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">6m</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">12m</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div>
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">R400/month</span>
                            <span className="text-gray-500 text-xs sm:text-sm ml-1">starting</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => window.location.href = '/booking?container=industrial&type=Industrial+Container&category=Rental&dimensions=6m&capacity=37.4+cu+m&price=R400%2Fmonth'}
                            className="bg-blue-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Rent Now</span>
                            <span className="sm:hidden">Rent</span>
                          </button>
                          <button
                            onClick={() => window.location.href = '/purchase?container=industrial&type=Industrial+Container&category=Purchase&dimensions=6m&capacity=37.4+cu+m&price=R400%2Fmonth'}
                            className="bg-green-600 text-white py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Buy Now</span>
                            <span className="sm:hidden">Buy</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Link
                      href="/contact"
                      className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 hover:bg-green-100 transition-colors text-center"
                    >
                      <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">Custom Quote</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Get a personalized quote</p>
                    </Link>
                    <Link
                      href="/branches"
                      className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4 hover:bg-purple-100 transition-colors text-center"
                    >
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">Find Branch</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Locate nearest branch</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'conversions' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Container Conversions</h3>
                  <p className="text-gray-600 mb-6">Transform standard containers into custom solutions for your specific needs</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Wrench className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="mb-4">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png"
                          alt="Office Conversions"
                          className="w-full h-auto max-h-48 object-contain rounded-lg shadow-sm"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Office Conversions</h4>
                      <p className="text-gray-600 text-sm mb-4">Professional office spaces with all amenities for immediate business operations</p>
                      <ul className="text-sm text-gray-500 space-y-1 mb-4">
                        <li>• Custom floor plans</li>
                        <li>• Electrical & plumbing</li>
                        <li>• Air conditioning</li>
                        <li>• Security systems</li>
                      </ul>
                      <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                        Request Quote
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="mb-4">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png"
                          alt="Storage Solutions"
                          className="w-full h-auto max-h-48 object-contain rounded-lg shadow-sm"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Storage Solutions</h4>
                      <p className="text-gray-600 text-sm mb-4">Secure, weather-resistant storage solutions for any business or personal needs</p>
                      <ul className="text-sm text-gray-500 space-y-1 mb-4">
                        <li>• Shelving systems</li>
                        <li>• Climate control</li>
                        <li>• Security features</li>
                        <li>• Loading equipment</li>
                      </ul>
                      <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                        Request Quote
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="mb-4">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/02/vipcontainer.png"
                          alt="Security Units"
                          className="w-full h-auto max-h-48 object-contain rounded-lg shadow-sm"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Security Units</h4>
                      <p className="text-gray-600 text-sm mb-4">High-security container conversions for valuable goods and sensitive materials</p>
                      <ul className="text-sm text-gray-500 space-y-1 mb-4">
                        <li>• Reinforced construction</li>
                        <li>• Advanced locking</li>
                        <li>• Alarm systems</li>
                        <li>• Monitoring equipment</li>
                      </ul>
                      <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                        Request Quote
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="mb-4">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/04/Elite-office-unit.png"
                          alt="Workshop Spaces"
                          className="w-full h-auto max-h-48 object-contain rounded-lg shadow-sm"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Workshop Spaces</h4>
                      <p className="text-gray-600 text-sm mb-4">Industrial workshop and manufacturing spaces with specialized equipment</p>
                      <ul className="text-sm text-gray-500 space-y-1 mb-4">
                        <li>• Power distribution</li>
                        <li>• Ventilation systems</li>
                        <li>• Work benches</li>
                        <li>• Tool storage</li>
                      </ul>
                      <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                        Request Quote
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="mb-4">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-pavilion.png"
                          alt="Mobile Units"
                          className="w-full h-auto max-h-48 object-contain rounded-lg shadow-sm"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Mobile Units</h4>
                      <p className="text-gray-600 text-sm mb-4">Portable container solutions for events, exhibitions, and remote locations</p>
                      <ul className="text-sm text-gray-500 space-y-1 mb-4">
                        <li>• Transportable design</li>
                        <li>• Self-contained systems</li>
                        <li>• Quick setup</li>
                        <li>• Weather protection</li>
                      </ul>
                      <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                        Request Quote
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                        <Settings className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="mb-4">
                        <img
                          src="https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_office.png"
                          alt="Custom Solutions"
                          className="w-full h-auto max-h-48 object-contain rounded-lg shadow-sm"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Custom Solutions</h4>
                      <p className="text-gray-600 text-sm mb-4">Tailored container conversions designed to meet your unique requirements</p>
                      <ul className="text-sm text-gray-500 space-y-1 mb-4">
                        <li>• Tailored design</li>
                        <li>• Specialized equipment</li>
                        <li>• Unique layouts</li>
                        <li>• Expert consultation</li>
                      </ul>
                      <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conversion Request Form */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Request a Custom Conversion</h3>
                  <form onSubmit={handleConversionRequest} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Conversion Type</label>
                        <select 
                          value={conversionRequest.type}
                          onChange={(e) => setConversionRequest({...conversionRequest, type: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option>Office Conversions</option>
                          <option>Storage Solutions</option>
                          <option>Security Units</option>
                          <option>Workshop Spaces</option>
                          <option>Mobile Units</option>
                          <option>Custom Solutions</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Container Size</label>
                        <select 
                          value={conversionRequest.containerSize}
                          onChange={(e) => setConversionRequest({...conversionRequest, containerSize: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option>6m × 2.4m × 2.6m</option>
                          <option>12m × 2.4m × 2.6m</option>
                          <option>12m × 2.4m × 2.9m</option>
                          <option>Custom Size</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                      <textarea 
                        rows={4}
                        value={conversionRequest.description}
                        onChange={(e) => setConversionRequest({...conversionRequest, description: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Describe your conversion requirements, timeline, and any specific features needed..."
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                        <select 
                          value={conversionRequest.budget}
                          onChange={(e) => setConversionRequest({...conversionRequest, budget: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option>Under R50,000</option>
                          <option>R50,000 - R100,000</option>
                          <option>R100,000 - R200,000</option>
                          <option>R200,000 - R500,000</option>
                          <option>Over R500,000</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                        <select 
                          value={conversionRequest.timeline}
                          onChange={(e) => setConversionRequest({...conversionRequest, timeline: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option>ASAP</option>
                          <option>Within 1 month</option>
                          <option>Within 3 months</option>
                          <option>Within 6 months</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'tracking' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Track Your Orders</h3>
                  <p className="text-gray-600 mb-6">Monitor your container deliveries in real-time</p>
                  
                  {/* Tracking Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Enter Tracking Number</label>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <input 
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter your tracking number (e.g., VC20001-2024)"
                      />
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Track
                      </button>
                    </div>
                  </div>

                  {/* Active Orders with Tracking */}
                  <div className="space-y-4">
                    {orders.filter(order => order.trackingNumber).map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{order.containerType}</h4>
                            <p className="text-sm text-gray-500">Order #{order.id}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Tracking Number</p>
                            <p className="font-medium text-primary-600">{order.trackingNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Order Date</p>
                            <p className="font-medium">{formatDate(order.orderDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Expected Delivery</p>
                            <p className="font-medium">{order.deliveryDate ? formatDate(order.deliveryDate) : 'TBD'}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Ordered</span>
                            <span>Confirmed</span>
                            <span>In Transit</span>
                            <span>Delivered</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                order.status === 'delivered' ? 'bg-green-500' :
                                order.status === 'in-transit' ? 'bg-blue-500' :
                                order.status === 'confirmed' ? 'bg-yellow-500' :
                                'bg-gray-400'
                              }`}
                              style={{
                                width: order.status === 'delivered' ? '100%' :
                                       order.status === 'in-transit' ? '75%' :
                                       order.status === 'confirmed' ? '50%' : '25%'
                              }}
                            ></div>
                          </div>
                        </div>

                        {order.deliveryAddress && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Delivery Address:</span> {order.deliveryAddress}, {order.city}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {orders.filter(order => order.trackingNumber).length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No orders with tracking information yet</p>
                    </div>
                  )}
                </div>

                {/* Order Tracking Map */}
                <div className="bg-white rounded-lg shadow">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    {/* Leaflet Map */}
                    <div 
                      id="customer-tracking-map" 
                      className="w-full h-full"
                      style={{
                        height: '384px',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1
                      }}
                    ></div>
                    
                    {/* Map Controls Overlay */}
                    <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 shadow-lg">
                      <h3 className="text-sm font-semibold text-gray-900">South Africa</h3>
                      <p className="text-xs text-gray-600">Your Order Locations</p>
                    </div>
                    
                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-lg max-w-xs">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Order Status</h4>
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
                          <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0 shadow-sm"></div>
                          <span className="text-xs text-gray-700">Confirmed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 shadow-sm"></div>
                          <span className="text-xs text-gray-700">Pending</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Count */}
                    <div className="absolute top-4 right-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 shadow-lg">
                      <div className="text-sm font-semibold text-gray-900">
                        {orders.filter(order => order.trackingNumber).length}
                      </div>
                      <div className="text-xs text-gray-600">Tracked Orders</div>
                    </div>
                    
                    {/* Loading State */}
                    {!isMapLoaded && (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Loading map...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Order History</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(order.status)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {order.containerType} - {order.category}
                              </p>
                              <p className="text-sm text-gray-500">
                                Order #{order.id} • {formatDate(order.orderDate)}
                              </p>
                              {order.deliveryAddress && (
                                <p className="text-sm text-gray-500">
                                  Deliver to: {order.deliveryAddress}, {order.city}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                              {order.status.replace('-', ' ')}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(order.totalAmount)}
                            </span>
                            {order.trackingNumber && (
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Tracking</p>
                                <p className="text-sm font-medium text-primary-600">{order.trackingNumber}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default CustomerDashboard
