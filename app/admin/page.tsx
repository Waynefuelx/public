'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProtectedRoute from '@/components/ProtectedRoute'
import { 
  Users, 
  Truck, 
  Calendar, 
  BarChart3, 
  FileText, 
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Navigation,
  Package,
  QrCode,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  ExternalLink,
  Upload,
  Settings,
  Bell,
  Shield,
  DollarSign,
  Target,
  TrendingUp,
  Star,
  Zap
} from 'lucide-react'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost'
  source: string
  assignedTo: string
  lastContact: string
  nextFollowUp: string
  value: number
  notes: string
}

interface Order {
  id: string
  orderType: 'purchase' | 'rental'
  customerName: string
  customerEmail: string
  customerPhone: string
  company?: string
  containerType: string
  containerId: string
  quantity: number
  status: 'pending' | 'confirmed' | 'in-transit' | 'delivered' | 'returned' | 'completed'
  deliveryOption: 'delivery' | 'collection'
  deliveryDate: string
  deliveryAddress?: string
  city?: string
  province?: string
  postalCode?: string
  total: number
  assignedDriver?: string
  specialRequirements?: string
  paymentMethod: 'credit' | 'invoice' | 'quote'
  createdAt: string
  isNew: boolean
}

interface Container {
  id: string
  containerNumber: string
  containerType: string
  customerName: string
  customerEmail: string
  customerPhone: string
  location: {
    lat: number
    lng: number
    address: string
    city: string
    province: string
  }
  deliveryDate: string
  rentalDuration: number // in days
  paymentStatus: 'paid' | 'overdue' | 'pending'
  lastPaymentDate: string
  nextPaymentDate: string
  monthlyRate: number
  totalOwed: number
  notes: string
}

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

// Leaflet types
declare global {
  interface Window {
    L: any
    selectContainer: (containerId: string) => void
  }
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [scannedSerialNumber, setScannedSerialNumber] = useState('')
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [newOrderCount, setNewOrderCount] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false)
  const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null)
  const [notifications, setNotifications] = useState<Array<{
    id: string
    orderId: string
    customerEmail: string
    message: string
    type: 'order_confirmed' | 'delivery_started'
    trackingNumber?: string
    timestamp: string
  }>>([])
  const [isClient, setIsClient] = useState(false)

  // Set client flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize deliveries state with mock data
  useEffect(() => {
    const initialDeliveries: Delivery[] = [
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
        driverName: 'Mike Johnson',
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
        driverName: 'Tom Davis',
        driverPhone: '+27 82 555 2345',
        notes: 'Port delivery - security clearance required',
        serialNumber: 'VC40002-2024',
        qrCode: 'VC40002-2024-QR'
      }
    ]
    setDeliveries(initialDeliveries)
  }, [])

  // Add Leaflet CSS styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .leaflet-container {
        height: 100% !important;
        width: 100% !important;
        z-index: 1 !important;
        font-family: inherit !important;
      }
      .leaflet-control-container {
        z-index: 1000 !important;
      }
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
      #leaflet-map {
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

  // Mock data - in real app this would come from API
  const leads: Lead[] = [
    {
      id: 'L001',
      name: 'John Smith',
      company: 'Construction Plus Inc.',
      email: 'john.smith@constructionplus.co.za',
      phone: '(555) 123-4567',
      status: 'qualified',
      source: 'Website',
      assignedTo: 'Sarah Johnson',
      lastContact: '2024-01-14T10:30:00Z',
      nextFollowUp: '2024-01-16T14:00:00Z',
      value: 2500,
      notes: 'Interested in 12m containers for construction project. Budget approved.'
    },
    {
      id: 'L002',
      name: 'Maria Garcia',
      company: 'Global Logistics Solutions',
      email: 'maria.garcia@globallogistics.co.za',
      phone: '(555) 234-5678',
      status: 'new',
      source: 'Referral',
      assignedTo: 'Mike Chen',
      lastContact: '2024-01-13T15:45:00Z',
      nextFollowUp: '2024-01-15T09:00:00Z',
      value: 5000,
      notes: 'Looking for refrigerated containers for food transport. High priority.'
    },
    {
      id: 'L003',
      name: 'David Wilson',
      company: 'Event Productions LLC',
      email: 'david.wilson@eventproductions.co.za',
      phone: '(555) 345-6789',
      status: 'proposal',
      source: 'Trade Show',
      assignedTo: 'Sarah Johnson',
      lastContact: '2024-01-12T11:20:00Z',
      nextFollowUp: '2024-01-17T16:00:00Z',
      value: 3000,
      notes: 'Need containers for upcoming music festival. Proposal sent, awaiting response.'
    }
  ]

  // Initialize orders data and fetch from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const data = await response.json()
          setOrders(data.orders || [])
          setNewOrderCount(data.orders?.filter((order: Order) => order.isNew).length || 0)
        } else {
          // Fallback to demo data if API fails
          const initialOrders: Order[] = [
            {
              id: 'O001',
              orderType: 'rental',
              customerName: 'John Smith',
              customerEmail: 'john.smith@constructionplus.co.za',
              customerPhone: '+27 82 123 4567',
              company: 'Construction Plus Inc.',
              containerType: '6m Storage Container',
              containerId: '6m-storage',
              quantity: 2,
              status: 'in-transit',
              deliveryOption: 'delivery',
              deliveryDate: '2024-01-15T14:00:00Z',
              deliveryAddress: '123 Main Street, Industrial Area',
              city: 'George',
              province: 'Western Cape',
              postalCode: '6530',
              total: 500,
              assignedDriver: 'Mike Johnson',
              specialRequirements: 'Deliver to construction site - contact John Smith on arrival',
              paymentMethod: 'invoice',
              createdAt: '2024-01-10T08:00:00Z',
              isNew: false
            },
            {
              id: 'O002',
              orderType: 'rental',
              customerName: 'Maria Garcia',
              customerEmail: 'maria.garcia@globallogistics.co.za',
              customerPhone: '+27 82 234 5678',
              company: 'Global Logistics Solutions',
              containerType: '6m Refrigeration Container',
              containerId: '6m-refrigeration',
              quantity: 1,
              status: 'confirmed',
              deliveryOption: 'delivery',
              deliveryDate: '2024-01-18T10:00:00Z',
              deliveryAddress: '456 Harbour Road, Port Area',
              city: 'Cape Town',
              province: 'Western Cape',
              postalCode: '8001',
              total: 200,
              assignedDriver: 'Tom Davis',
              paymentMethod: 'credit',
              createdAt: '2024-01-12T15:30:00Z',
              isNew: false
            }
          ]
          setOrders(initialOrders)
          setNewOrderCount(0)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
        setNewOrderCount(0)
      }
    }

    fetchOrders()
    
    // Poll for new orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Function to add new order
  const addNewOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'isNew'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `O${String(orders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      isNew: true
    }
    
    setOrders(prevOrders => [newOrder, ...prevOrders])
    setNewOrderCount(prevCount => prevCount + 1)
  }

  // Function to mark order as viewed
  const markOrderAsViewed = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, isNew: false } : order
      )
    )
    setNewOrderCount(prevCount => Math.max(0, prevCount - 1))
  }

  // Function to generate tracking number
  const generateTrackingNumber = () => {
    const prefix = 'VC'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `${prefix}${timestamp}${random}`
  }

  // Function to send customer notification
  const sendCustomerNotification = (order: Order, type: 'order_confirmed' | 'delivery_started', trackingNumber?: string) => {
    const notification = {
      id: `notif_${Date.now()}`,
      orderId: order.id,
      customerEmail: order.customerEmail,
      message: type === 'order_confirmed' 
        ? `Your order ${order.id} has been confirmed and we're preparing your container for delivery.`
        : `Your container is on its way! Tracking number: ${trackingNumber}`,
      type,
      trackingNumber,
      timestamp: new Date().toISOString()
    }
    
    setNotifications(prev => [notification, ...prev])
    
    // In a real app, this would send an email/SMS to the customer
    console.log(`Notification sent to ${order.customerEmail}:`, notification.message)
  }

  // Function to update order status
  const updateOrderStatus = (orderId: string, newStatus: Order['status'], trackingNumber?: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status: newStatus }
          
          // Send notification to customer
          if (newStatus === 'confirmed') {
            sendCustomerNotification(updatedOrder, 'order_confirmed')
          } else if (newStatus === 'in-transit' && trackingNumber) {
            sendCustomerNotification(updatedOrder, 'delivery_started', trackingNumber)
          }
          
          return updatedOrder
        }
        return order
      })
    )
  }

  // Function to start delivery process
  const startDeliveryProcess = (order: Order) => {
    const trackingNumber = generateTrackingNumber()
    updateOrderStatus(order.id, 'in-transit', trackingNumber)
    
    // Move order to drivers tab by creating a delivery entry
    const newDelivery: Delivery = {
      id: `D${String(deliveries.length + 1).padStart(3, '0')}`,
      containerNumber: `VC-${order.containerId.toUpperCase()}`,
      containerType: order.containerType,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      deliveryAddress: order.deliveryAddress || '',
      deliveryCity: order.city || '',
      deliveryProvince: order.province || '',
      coordinates: {
        lat: -33.9715, // Default coordinates - in real app would geocode address
        lng: 22.4617
      },
      scheduledDate: order.deliveryDate,
      status: 'pending',
      driverName: 'Unassigned',
      driverPhone: '',
      notes: order.specialRequirements || '',
      serialNumber: trackingNumber,
      qrCode: `${trackingNumber}-QR`
    }
    
    // Add the new delivery to the deliveries state
    setDeliveries(prevDeliveries => [newDelivery, ...prevDeliveries])
    
    console.log('New delivery created and added to drivers:', newDelivery)
    
    // Show success message
    alert(`Delivery started successfully!\n\nTracking Number: ${trackingNumber}\n\nOrder ${order.id} has been moved to the Drivers tab for assignment.`)
    
    setShowStatusUpdateModal(false)
    setOrderToUpdate(null)
  }

  const containers: Container[] = [
    {
      id: 'C001',
      containerNumber: 'VC-20-001',
      containerType: '6m Standard',
      customerName: 'Construction Plus Inc.',
      customerEmail: 'john.smith@constructionplus.co.za',
      customerPhone: '+27 82 123 4567',
      location: {
        lat: -33.9715,
        lng: 22.4617,
        address: '123 Main Street',
        city: 'George',
        province: 'Western Cape'
      },
      deliveryDate: '2024-01-10T08:00:00Z',
      rentalDuration: 45,
      paymentStatus: 'paid',
      lastPaymentDate: '2024-01-15T10:30:00Z',
      nextPaymentDate: '2024-02-15T10:30:00Z',
      monthlyRate: 2500,
      totalOwed: 0,
      notes: 'Construction site storage - long term rental'
    },
    {
      id: 'C002',
      containerNumber: 'VC-40-002',
      containerType: '12m High Cube',
      customerName: 'Global Logistics Solutions',
      customerEmail: 'maria.garcia@globallogistics.co.za',
      customerPhone: '+27 82 234 5678',
      location: {
        lat: -33.9249,
        lng: 18.4241,
        address: '456 Harbour Road',
        city: 'Cape Town',
        province: 'Western Cape'
      },
      deliveryDate: '2024-01-05T14:00:00Z',
      rentalDuration: 30,
      paymentStatus: 'overdue',
      lastPaymentDate: '2024-01-01T09:00:00Z',
      nextPaymentDate: '2024-02-01T09:00:00Z',
      monthlyRate: 3500,
      totalOwed: 3500,
      notes: 'Port storage - payment overdue by 15 days'
    },
    {
      id: 'C003',
      containerNumber: 'VC-20-003',
              containerType: '6m Refrigerated',
      customerName: 'Fresh Foods Ltd',
      customerEmail: 'info@freshfoods.co.za',
      customerPhone: '+27 82 345 6789',
      location: {
        lat: -26.2041,
        lng: 28.0473,
        address: '789 Industrial Park',
        city: 'Johannesburg',
        province: 'Gauteng'
      },
      deliveryDate: '2024-01-12T11:00:00Z',
      rentalDuration: 20,
      paymentStatus: 'pending',
      lastPaymentDate: '2024-01-12T11:00:00Z',
      nextPaymentDate: '2024-02-12T11:00:00Z',
      monthlyRate: 4000,
      totalOwed: 0,
      notes: 'Food storage - new customer'
    },
    {
      id: 'C004',
      containerNumber: 'VC-40-004',
              containerType: '12m Standard',
      customerName: 'Mining Solutions Corp',
      customerEmail: 'contact@miningsolutions.co.za',
      customerPhone: '+27 82 456 7890',
      location: {
        lat: -28.7282,
        lng: 24.7499,
        address: 'Mining Site A',
        city: 'Kimberley',
        province: 'Northern Cape'
      },
      deliveryDate: '2023-12-20T07:00:00Z',
      rentalDuration: 60,
      paymentStatus: 'paid',
      lastPaymentDate: '2024-01-20T08:00:00Z',
      nextPaymentDate: '2024-02-20T08:00:00Z',
      monthlyRate: 3000,
      totalOwed: 0,
      notes: 'Mining equipment storage - reliable customer'
    },
    {
      id: 'C005',
      containerNumber: 'VC-20-005',
      containerType: '6m Standard',
      customerName: 'Event Productions LLC',
      customerEmail: 'david.wilson@eventproductions.co.za',
      customerPhone: '+27 82 567 8901',
      location: {
        lat: -34.1833,
        lng: 22.1333,
        address: 'Beachfront Event Space',
        city: 'Mossel Bay',
        province: 'Western Cape'
      },
      deliveryDate: '2024-01-08T16:00:00Z',
      rentalDuration: 15,
      paymentStatus: 'overdue',
      lastPaymentDate: '2024-01-08T16:00:00Z',
      nextPaymentDate: '2024-02-08T16:00:00Z',
      monthlyRate: 2000,
      totalOwed: 2000,
      notes: 'Event storage - payment overdue by 8 days'
    }
  ]



  const stats = [
    { label: 'Total Leads', value: '156', change: '+12%', changeType: 'positive' },
    { label: 'Active Orders', value: '89', change: '+5%', changeType: 'positive' },
            { label: 'Revenue This Month', value: 'R45,230', change: '+18%', changeType: 'positive' },
    { label: 'Conversion Rate', value: '23%', change: '+2%', changeType: 'positive' }
  ]

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'proposal': return 'bg-purple-100 text-purple-800'
      case 'closed': return 'bg-green-100 text-green-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'in-transit': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'returned': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return '🟢'
      case 'overdue': return '🔴'
      case 'pending': return '🟡'
      default: return '⚪'
    }
  }

  const formatDuration = (days: number) => {
    if (days < 30) return `${days} days`
    const months = Math.floor(days / 30)
    const remainingDays = days % 30
    if (remainingDays === 0) return `${months} month${months > 1 ? 's' : ''}`
    return `${months} month${months > 1 ? 's' : ''} ${remainingDays} days`
  }

  const calculateDaysSinceDelivery = (deliveryDate: string) => {
    const delivery = new Date(deliveryDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - delivery.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
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

  const handleSerialNumberSubmit = (deliveryId: string, serialNumber: string) => {
    // In a real app, this would update the delivery status
    console.log(`Delivery ${deliveryId} serial number: ${serialNumber}`)
    setScannedSerialNumber('')
    // Update delivery status to delivered
    const updatedDeliveries = deliveries.map(delivery => 
      delivery.id === deliveryId 
        ? { ...delivery, status: 'delivered' as const }
        : delivery
    )
    // In real app, you'd update the state or make an API call
  }

  // Load Leaflet (OpenStreetMap) script and CSS
  useEffect(() => {
    if (activeTab === 'containers' && !isMapLoaded) {
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
      const mapElement = document.getElementById('leaflet-map')
      if (mapElement && !map) {
        const L = (window as any).L
        
        // Clear any existing map
        if (map) {
          map.remove()
        }
        
        const newMap: any = L.map('leaflet-map', {
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
        addContainerMarkers(newMap)
      }
    }
  }

  // Add container markers to map
  const addContainerMarkers = (mapInstance: any) => {
    const newMarkers: any[] = []
    
    containers.forEach((container) => {
      // Create custom icon
      const customIcon = (window as any).L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs" 
               style="background-color: ${
                 container.paymentStatus === 'paid' ? '#10B981' : 
                 container.paymentStatus === 'overdue' ? '#EF4444' : '#F59E0B'
               }">
            ${container.containerNumber.slice(-3)}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })

      const marker = (window as any).L.marker([container.location.lat, container.location.lng], {
        icon: customIcon
      }).addTo(mapInstance)

      // Create popup content
      const popupContent = `
        <div class="p-3 max-w-xs">
          <h3 class="font-semibold text-gray-900 mb-2">${container.containerNumber}</h3>
          <div class="space-y-1 text-sm">
            <p><strong>Customer:</strong> ${container.customerName}</p>
            <p><strong>Type:</strong> ${container.containerType}</p>
            <p><strong>Location:</strong> ${container.location.city}, ${container.location.province}</p>
            <p><strong>Duration:</strong> ${formatDuration(calculateDaysSinceDelivery(container.deliveryDate))}</p>
            <p><strong>Status:</strong> <span class="px-2 py-1 rounded-full text-xs font-medium ${
              container.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
              container.paymentStatus === 'overdue' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }">${container.paymentStatus}</span></p>
            ${container.totalOwed > 0 ? `<p class="text-red-600 font-medium">Outstanding: R${container.totalOwed.toLocaleString()}</p>` : ''}
          </div>
          <button onclick="window.selectContainer('${container.id}')" class="mt-3 w-full bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
            View Details
          </button>
        </div>
      `

      marker.bindPopup(popupContent)
      newMarkers.push(marker)
    })

    setMarkers(newMarkers)
  }

  // Global function for info window button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).selectContainer = (containerId: string) => {
        const container = containers.find(c => c.id === containerId)
        if (container) {
          setSelectedContainer(container)
        }
      }
    }
  }, [containers])

  // Cleanup markers when tab changes
  useEffect(() => {
    if (activeTab !== 'containers') {
      // Clear markers
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'containers', label: 'View All Containers', icon: Navigation },
    { id: 'drivers', label: 'Drivers', icon: Truck },
    { id: 'leads', label: 'Lead Management', icon: Users },
    { id: 'orders', label: 'Orders', icon: Truck, notificationCount: newOrderCount },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: FileText }
  ]

  return (
    <ProtectedRoute allowedTypes={['admin']}>
      <div className="min-h-screen bg-secondary-200">
      {/* Admin Header - Fixed positioning to avoid conflicts with main nav */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Admin Panel</h1>
              <p className="text-sm text-gray-600 truncate">Valley Containers Staff Portal</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button 
                onClick={() => window.location.href = '/admin/new-lead'}
                className="btn-primary text-sm flex items-center flex-wrap"
              >
                <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">New Lead</span>
              </button>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs - Responsive with horizontal scroll on small screens */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  if (tab.id === 'orders') {
                    // Mark all orders as viewed when opening orders tab
                    setOrders(prevOrders => 
                      prevOrders.map(order => ({ ...order, isNew: false }))
                    )
                    setNewOrderCount(0)
                  }
                }}
                className={`flex items-center space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-w-fit relative ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.notificationCount && tab.notificationCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{tab.notificationCount}</span>
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h3>
                <div className="space-y-4">
                                     {leads.slice(0, 3).map((lead) => (
                     <div key={lead.id} className="flex items-center justify-between p-3 bg-secondary-200 rounded-lg">
                       <div>
                         <p className="font-medium text-secondary-900">{lead.name}</p>
                         <p className="text-sm text-secondary-600">{lead.company}</p>
                       </div>
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                         {lead.status}
                       </span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deliveries</h3>
                <div className="space-y-4">
                                     {orders.slice(0, 3).map((order) => (
                     <div key={order.id} className="flex items-center justify-between p-3 bg-secondary-200 rounded-lg">
                       <div>
                         <p className="font-medium text-secondary-900">{order.customerName}</p>
                         <p className="text-sm text-secondary-600">{order.containerType}</p>
                       </div>
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                         {order.status}
                       </span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
                <div className="space-y-4">
                  {isClient ? (
                    notifications.length > 0 ? (
                      notifications.slice(0, 3).map((notification) => (
                        <div key={notification.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-sm text-blue-900 font-medium">Order {notification.orderId}</p>
                              <p className="text-xs text-blue-700 mt-1">{notification.message}</p>
                              <p className="text-xs text-blue-600 mt-1">
                                {formatDate(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-500">No notifications yet</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Loading notifications...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Containers Tab */}
        {activeTab === 'containers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Container Locations</h3>
                  <p className="text-sm text-gray-600">Track all Valley Containers across South Africa</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Overdue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Container */}
            <div className="card">
              <div className="relative h-96 rounded-lg overflow-hidden">
                {/* Leaflet Map */}
                <div 
                  id="leaflet-map" 
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
                  <p className="text-xs text-gray-600">Container Locations</p>
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-lg max-w-xs">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Container Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0 shadow-sm"></div>
                      <span className="text-xs text-gray-700">Paid - No outstanding balance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 shadow-sm"></div>
                      <span className="text-xs text-gray-700">Overdue - Payment required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0 shadow-sm"></div>
                      <span className="text-xs text-gray-700">Pending - New rental</span>
                    </div>
                  </div>
                </div>
                
                {/* Container Count */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-sm font-semibold text-gray-900">{containers.length}</div>
                  <div className="text-xs text-gray-600">Containers</div>
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

            {/* Container List */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Containers</h3>
              
              {/* Mobile View - Cards */}
              <div className="block lg:hidden space-y-4">
                {containers.map((container) => (
                  <div key={container.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{container.containerNumber}</h4>
                        <p className="text-sm text-gray-500">{container.containerType}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedContainer(container)}
                        className="text-primary-600 hover:text-primary-900 p-2"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Customer</p>
                        <p className="font-medium text-gray-900">{container.customerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">{container.location.city}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Duration</p>
                        <p className="font-medium text-gray-900">{formatDuration(calculateDaysSinceDelivery(container.deliveryDate))}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(container.paymentStatus)}`}>
                          {container.paymentStatus}
                        </span>
                      </div>
                    </div>
                    
                    {container.totalOwed > 0 && (
                      <div className="text-xs text-red-600 font-medium">
                        Outstanding: R{container.totalOwed.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-secondary-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Container
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Payment Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {containers.map((container) => (
                      <tr key={container.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{container.containerNumber}</div>
                            <div className="text-sm text-gray-500">{container.containerType}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{container.customerName}</div>
                            <div className="text-sm text-gray-500">
                              <a 
                                href={`mailto:${container.customerEmail}`}
                                className="hover:text-primary-700 transition-colors duration-200"
                                title={`Click to email ${container.customerEmail}`}
                              >
                                {container.customerEmail}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{container.location.city}</div>
                            <div className="text-sm text-gray-500">{container.location.province}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDuration(calculateDaysSinceDelivery(container.deliveryDate))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(container.paymentStatus)}`}>
                            {container.paymentStatus}
                          </span>
                          {container.totalOwed > 0 && (
                            <div className="text-xs text-red-600 mt-1">
                              R{container.totalOwed.toLocaleString()} owed
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => setSelectedContainer(container)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Drivers Tab */}
        {activeTab === 'drivers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Driver Deliveries</h3>
                  <p className="text-sm text-gray-600">Manage container deliveries and track driver progress</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">In Transit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deliveries List */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Deliveries</h3>
              
              {/* Mobile View - Cards */}
              <div className="block lg:hidden space-y-4">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{delivery.containerNumber}</h4>
                        <p className="text-sm text-gray-500">{delivery.containerType}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliveryStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Customer</p>
                        <p className="font-medium text-gray-900">{delivery.customerName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Driver</p>
                        <p className="font-medium text-gray-900">{delivery.driverName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">{delivery.deliveryCity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Scheduled</p>
                        <p className="font-medium text-gray-900">{formatDate(delivery.scheduledDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openGoogleMapsNavigation(delivery.coordinates.lat, delivery.coordinates.lng, delivery.deliveryAddress)}
                        className="btn-primary text-sm flex-1"
                      >
                        Navigate
                      </button>
                      <button
                        onClick={() => setSelectedDelivery(delivery)}
                        className="btn-secondary text-sm flex-1"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-secondary-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Container
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Scheduled
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deliveries.map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{delivery.containerNumber}</div>
                            <div className="text-sm text-gray-500">{delivery.containerType}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{delivery.customerName}</div>
                            <div className="text-sm text-gray-500">{delivery.customerPhone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{delivery.driverName}</div>
                            <div className="text-sm text-gray-500">{delivery.driverPhone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{delivery.deliveryCity}</div>
                            <div className="text-sm text-gray-500">{delivery.deliveryProvince}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(delivery.scheduledDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliveryStatusColor(delivery.status)}`}>
                            {delivery.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openGoogleMapsNavigation(delivery.coordinates.lat, delivery.coordinates.lng, delivery.deliveryAddress)}
                              className="text-primary-600 hover:text-primary-900"
                              title="Navigate to location"
                            >
                              <MapPin className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setSelectedDelivery(delivery)}
                              className="text-primary-600 hover:text-primary-900"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Filters and Search */}
            <div className="card">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search leads by name, company, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field max-w-xs"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="closed">Closed</option>
                  <option value="lost">Lost</option>
                </select>
                <button className="btn-secondary">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
                <button className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                                     <thead className="bg-secondary-200">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Lead
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Status
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Assigned To
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Value
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Next Follow-up
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Actions
                       </th>
                       </tr>
                     </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.company}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R{lead.value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(lead.nextFollowUp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
                  <p className="text-sm text-gray-600">Purchase and rental orders from customers</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Purchase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Rental</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">New</span>
                  </div>
                </div>
              </div>
              
              {/* Mobile View - Cards */}
              <div className="block lg:hidden space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className={`bg-white border rounded-lg p-4 space-y-3 ${order.isNew ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{order.id}</h4>
                          <p className="text-sm text-gray-500">{order.containerType}</p>
                        </div>
                        {order.isNew && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.orderType === 'purchase' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {order.orderType}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Customer</p>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        {order.company && <p className="text-xs text-gray-500">{order.company}</p>}
                      </div>
                      <div>
                        <p className="text-gray-600">Total</p>
                        <p className="font-medium text-gray-900">R{order.total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Delivery</p>
                        <p className="font-medium text-gray-900">{order.deliveryOption}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">{formatDate(order.deliveryDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedOrder(order)
                          markOrderAsViewed(order.id)
                        }}
                        className="btn-primary text-sm flex-1"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => {
                          setOrderToUpdate(order)
                          setShowStatusUpdateModal(true)
                        }}
                        className="btn-secondary text-sm flex-1"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View - Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-secondary-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Container
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Delivery
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className={`hover:bg-gray-50 ${order.isNew ? 'bg-green-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-gray-900">{order.id}</div>
                            {order.isNew && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.orderType === 'purchase' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {order.orderType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                            {order.company && <div className="text-sm text-gray-500">{order.company}</div>}
                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.containerType}</div>
                            <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.deliveryOption}</div>
                            <div className="text-sm text-gray-500">{formatDate(order.deliveryDate)}</div>
                            {order.deliveryAddress && (
                              <div className="text-xs text-gray-500 truncate max-w-32">{order.deliveryAddress}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          R{order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                setSelectedOrder(order)
                                markOrderAsViewed(order.id)
                              }}
                              className="text-primary-600 hover:text-primary-900"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setOrderToUpdate(order)
                                setShowStatusUpdateModal(true)
                              }}
                              className="text-primary-600 hover:text-primary-900" 
                              title="Update status"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Calendar</h3>
              <div className="bg-secondary-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive calendar view</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Schedule management and delivery coordination
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Sales Report */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary-600" />
                  Total Sales Report
                </h3>
                <div className="flex gap-2">
                  <select className="input-field text-sm">
                    <option value="this-month">This Month</option>
                    <option value="last-month">Last Month</option>
                    <option value="this-quarter">This Quarter</option>
                    <option value="this-year">This Year</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total Revenue</p>
                      <p className="text-3xl font-bold">R 2,847,500</p>
                      <p className="text-green-200 text-sm">+12.5% from last month</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Orders Completed</p>
                      <p className="text-3xl font-bold">342</p>
                      <p className="text-blue-200 text-sm">+8.2% from last month</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Average Order Value</p>
                      <p className="text-3xl font-bold">R 8,326</p>
                      <p className="text-purple-200 text-sm">+4.1% from last month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Conversion Rate</p>
                      <p className="text-3xl font-bold">68.4%</p>
                      <p className="text-orange-200 text-sm">+2.3% from last month</p>
                    </div>
                    <Target className="w-8 h-8 text-orange-200" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Container Type</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Storage Containers</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <span className="text-sm font-medium">R 1,850,000</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Office Containers</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                        </div>
                        <span className="text-sm font-medium">R 712,000</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Refrigerated Containers</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '10%'}}></div>
                        </div>
                        <span className="text-sm font-medium">R 285,500</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">January</span>
                      <span className="font-medium">R 2,100,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">February</span>
                      <span className="font-medium">R 2,350,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">March</span>
                      <span className="font-medium">R 2,600,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">April</span>
                      <span className="font-medium">R 2,847,500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Time Report */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-primary-600" />
                  Order to Delivery Time Analysis
                </h3>
                <div className="flex gap-2">
                  <select className="input-field text-sm">
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="last-90-days">Last 90 Days</option>
                    <option value="this-year">This Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100 text-sm font-medium">Average Delivery Time</p>
                      <p className="text-3xl font-bold">4.2 days</p>
                      <p className="text-indigo-200 text-sm">-0.8 days from last month</p>
                    </div>
                    <Clock className="w-8 h-8 text-indigo-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-100 text-sm font-medium">Fastest Delivery</p>
                      <p className="text-3xl font-bold">1.2 days</p>
                      <p className="text-teal-200 text-sm">Same day processing</p>
                    </div>
                    <Zap className="w-8 h-8 text-teal-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-rose-100 text-sm font-medium">On-Time Delivery</p>
                      <p className="text-3xl font-bold">94.2%</p>
                      <p className="text-rose-200 text-sm">+2.1% from last month</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-rose-200" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Delivery Time Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Same Day (0-1 days)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">1-3 days</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">3-7 days</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '30%'}}></div>
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">7+ days</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{width: '10%'}}></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Deliveries</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-sm">ORD-2024-001</p>
                        <p className="text-xs text-gray-500">Storage Container</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">2.1 days</p>
                        <p className="text-xs text-gray-500">On time</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-sm">ORD-2024-002</p>
                        <p className="text-xs text-gray-500">Office Container</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600">3.5 days</p>
                        <p className="text-xs text-gray-500">On time</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-sm">ORD-2024-003</p>
                        <p className="text-xs text-gray-500">Refrigerated Container</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-yellow-600">5.2 days</p>
                        <p className="text-xs text-gray-500">Delayed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Performance Report */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-primary-600" />
                  Driver Performance Report
                </h3>
                <div className="flex gap-2">
                  <select className="input-field text-sm">
                    <option value="this-month">This Month</option>
                    <option value="last-month">Last Month</option>
                    <option value="this-quarter">This Quarter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Total Deliveries</p>
                      <p className="text-3xl font-bold">127</p>
                      <p className="text-emerald-200 text-sm">+15% from last month</p>
                    </div>
                    <Truck className="w-8 h-8 text-emerald-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-100 text-sm font-medium">Active Drivers</p>
                      <p className="text-3xl font-bold">8</p>
                      <p className="text-cyan-200 text-sm">2 new this month</p>
                    </div>
                    <Users className="w-8 h-8 text-cyan-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-violet-100 text-sm font-medium">Avg per Driver</p>
                      <p className="text-3xl font-bold">15.9</p>
                      <p className="text-violet-200 text-sm">deliveries/month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-violet-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100 text-sm font-medium">Top Performer</p>
                      <p className="text-3xl font-bold">23</p>
                      <p className="text-amber-200 text-sm">deliveries</p>
                    </div>
                    <Star className="w-8 h-8 text-amber-200" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Driver Performance Rankings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                        <div>
                          <p className="font-medium text-sm">John Smith</p>
                          <p className="text-xs text-gray-500">Driver ID: D001</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">23</p>
                        <p className="text-xs text-gray-500">deliveries</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                        <div>
                          <p className="font-medium text-sm">Sarah Johnson</p>
                          <p className="text-xs text-gray-500">Driver ID: D002</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">19</p>
                        <p className="text-xs text-gray-500">deliveries</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                        <div>
                          <p className="font-medium text-sm">Mike Wilson</p>
                          <p className="text-xs text-gray-500">Driver ID: D003</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600">17</p>
                        <p className="text-xs text-gray-500">deliveries</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">4</div>
                        <div>
                          <p className="font-medium text-sm">Lisa Brown</p>
                          <p className="text-xs text-gray-500">Driver ID: D004</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-600">15</p>
                        <p className="text-xs text-gray-500">deliveries</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Delivery Trends</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">January</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <span className="text-sm font-medium">89</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">February</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '70%'}}></div>
                        </div>
                        <span className="text-sm font-medium">104</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">March</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-sm font-medium">127</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">April</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <span className="text-sm font-medium">127</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Delivery Detail Modal */}
        {selectedDelivery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliveryStatusColor(selectedDelivery.status)}`}>
                          {selectedDelivery.status}
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
                        <a 
                          href={`mailto:${selectedDelivery.customerEmail}`}
                          className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                          title={`Click to email ${selectedDelivery.customerEmail}`}
                        >
                          {selectedDelivery.customerEmail}
                        </a>
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

                  {/* Driver Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Driver Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Driver Name</p>
                        <p className="font-medium text-gray-900">{selectedDelivery.driverName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Driver Phone</p>
                        <a 
                          href={`tel:${selectedDelivery.driverPhone}`}
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          {selectedDelivery.driverPhone}
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
                    <a 
                      href={`tel:${selectedDelivery.customerPhone}`}
                      className="btn-primary flex-1 text-center"
                    >
                      Call Customer
                    </a>
                    <button
                      onClick={() => openGoogleMapsNavigation(selectedDelivery.coordinates.lat, selectedDelivery.coordinates.lng, selectedDelivery.deliveryAddress)}
                      className="btn-secondary flex-1"
                    >
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

        {/* Container Detail Modal */}
        {selectedContainer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Container Details</h2>
                  <button
                    onClick={() => setSelectedContainer(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Container Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Container Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Container Number</p>
                        <p className="font-medium text-gray-900">{selectedContainer.containerNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Container Type</p>
                        <p className="font-medium text-gray-900">{selectedContainer.containerType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery Date</p>
                        <p className="font-medium text-gray-900">{formatDate(selectedContainer.deliveryDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration at Location</p>
                        <p className="font-medium text-gray-900">{formatDuration(calculateDaysSinceDelivery(selectedContainer.deliveryDate))}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Customer Name</p>
                        <p className="font-medium text-gray-900">{selectedContainer.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a 
                          href={`mailto:${selectedContainer.customerEmail}`}
                          className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                          title={`Click to email ${selectedContainer.customerEmail}`}
                        >
                          {selectedContainer.customerEmail}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a 
                          href={`tel:${selectedContainer.customerPhone}`}
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          {selectedContainer.customerPhone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium text-gray-900">{selectedContainer.location.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">City & Province</p>
                        <p className="font-medium text-gray-900">{selectedContainer.location.city}, {selectedContainer.location.province}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Payment Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedContainer.paymentStatus)}`}>
                          {selectedContainer.paymentStatus}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Rate</p>
                        <p className="font-medium text-gray-900">R{selectedContainer.monthlyRate.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Payment</p>
                        <p className="font-medium text-gray-900">{formatDate(selectedContainer.lastPaymentDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Payment Due</p>
                        <p className="font-medium text-gray-900">{formatDate(selectedContainer.nextPaymentDate)}</p>
                      </div>
                      {selectedContainer.totalOwed > 0 && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-red-600 font-medium">
                            Outstanding Balance: R{selectedContainer.totalOwed.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedContainer.notes && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                      <p className="text-gray-700">{selectedContainer.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <a 
                      href={`tel:${selectedContainer.customerPhone}`}
                      className="btn-primary flex-1 text-center"
                    >
                      Call Customer
                    </a>
                    <button className="btn-secondary flex-1">
                      Send Reminder
                    </button>
                    <button className="btn-secondary flex-1">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-medium text-gray-900">{selectedOrder.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Type</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedOrder.orderType === 'purchase' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {selectedOrder.orderType}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created Date</p>
                        <p className="font-medium text-gray-900">{formatDate(selectedOrder.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="font-medium text-gray-900">R{selectedOrder.total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedOrder.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Customer Name</p>
                        <p className="font-medium text-gray-900">{selectedOrder.customerName}</p>
                      </div>
                      {selectedOrder.company && (
                        <div>
                          <p className="text-sm text-gray-600">Company</p>
                          <p className="font-medium text-gray-900">{selectedOrder.company}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a 
                          href={`mailto:${selectedOrder.customerEmail}`}
                          className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                          title={`Click to email ${selectedOrder.customerEmail}`}
                        >
                          {selectedOrder.customerEmail}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a 
                          href={`tel:${selectedOrder.customerPhone}`}
                          className="font-medium text-primary-600 hover:text-primary-700"
                        >
                          {selectedOrder.customerPhone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Container Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Container Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Container Type</p>
                        <p className="font-medium text-gray-900">{selectedOrder.containerType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Container ID</p>
                        <p className="font-medium text-gray-900">{selectedOrder.containerId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quantity</p>
                        <p className="font-medium text-gray-900">{selectedOrder.quantity}</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Delivery Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Delivery Option</p>
                        <p className="font-medium text-gray-900 capitalize">{selectedOrder.deliveryOption}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery Date</p>
                        <p className="font-medium text-gray-900">{formatDate(selectedOrder.deliveryDate)}</p>
                      </div>
                      {selectedOrder.deliveryAddress && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-600">Delivery Address</p>
                          <p className="font-medium text-gray-900">{selectedOrder.deliveryAddress}</p>
                        </div>
                      )}
                      {selectedOrder.city && (
                        <div>
                          <p className="text-sm text-gray-600">City</p>
                          <p className="font-medium text-gray-900">{selectedOrder.city}</p>
                        </div>
                      )}
                      {selectedOrder.province && (
                        <div>
                          <p className="text-sm text-gray-600">Province</p>
                          <p className="font-medium text-gray-900">{selectedOrder.province}</p>
                        </div>
                      )}
                      {selectedOrder.postalCode && (
                        <div>
                          <p className="text-sm text-gray-600">Postal Code</p>
                          <p className="font-medium text-gray-900">{selectedOrder.postalCode}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  {(selectedOrder.assignedDriver || selectedOrder.specialRequirements) && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedOrder.assignedDriver && (
                          <div>
                            <p className="text-sm text-gray-600">Assigned Driver</p>
                            <p className="font-medium text-gray-900">{selectedOrder.assignedDriver}</p>
                          </div>
                        )}
                        {selectedOrder.specialRequirements && (
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-600">Special Requirements</p>
                            <p className="font-medium text-gray-900">{selectedOrder.specialRequirements}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <a 
                      href={`tel:${selectedOrder.customerPhone}`}
                      className="btn-primary flex-1 text-center"
                    >
                      Call Customer
                    </a>
                    <a 
                      href={`mailto:${selectedOrder.customerEmail}`}
                      className="btn-secondary flex-1 text-center"
                    >
                      Email Customer
                    </a>
                    <button 
                      onClick={() => {
                        setOrderToUpdate(selectedOrder)
                        setShowStatusUpdateModal(true)
                        setSelectedOrder(null)
                      }}
                      className="btn-secondary flex-1"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Status Update Modal */}
        {showStatusUpdateModal && orderToUpdate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Update Order Status</h2>
                  <button
                    onClick={() => {
                      setShowStatusUpdateModal(false)
                      setOrderToUpdate(null)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Order ID:</span> {orderToUpdate.id}</p>
                      <p><span className="font-medium">Customer:</span> {orderToUpdate.customerName}</p>
                      <p><span className="font-medium">Container:</span> {orderToUpdate.containerType}</p>
                      <p><span className="font-medium">Current Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(orderToUpdate.status)}`}>
                          {orderToUpdate.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Status Update Options */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
                    
                    {orderToUpdate.status === 'pending' && (
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">Confirm Order</h4>
                              <p className="text-sm text-gray-600 mb-3">
                                Let the customer know their order has been received and is being prepared.
                              </p>
                              <button
                                onClick={() => {
                                  updateOrderStatus(orderToUpdate.id, 'confirmed')
                                  setShowStatusUpdateModal(false)
                                  setOrderToUpdate(null)
                                }}
                                className="btn-primary text-sm"
                              >
                                Confirm Order & Notify Customer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {orderToUpdate.status === 'confirmed' && (
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Truck className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">Start Delivery Process</h4>
                              <p className="text-sm text-gray-600 mb-3">
                                Generate tracking number and assign to driver. Customer will be notified that their container is on the way.
                              </p>
                              <button
                                onClick={() => startDeliveryProcess(orderToUpdate)}
                                className="btn-primary text-sm"
                              >
                                Start Delivery & Send Tracking Info
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {orderToUpdate.status === 'in-transit' && (
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">Mark as Delivered</h4>
                              <p className="text-sm text-gray-600 mb-3">
                                Update status to delivered when container has been successfully delivered to customer.
                              </p>
                              <button
                                onClick={() => {
                                  updateOrderStatus(orderToUpdate.id, 'delivered')
                                  setShowStatusUpdateModal(false)
                                  setOrderToUpdate(null)
                                }}
                                className="btn-primary text-sm"
                              >
                                Mark as Delivered
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {orderToUpdate.status === 'delivered' && (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h4 className="font-medium text-gray-900 mb-2">Order Completed</h4>
                        <p className="text-sm text-gray-600">
                          This order has been successfully delivered to the customer.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Notification Preview */}
                  {isClient && notifications.filter(n => n.orderId === orderToUpdate.id).length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Recent Notifications</h3>
                      <div className="space-y-2">
                        {notifications
                          .filter(n => n.orderId === orderToUpdate.id)
                          .slice(0, 2)
                          .map((notification) => (
                            <div key={notification.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <p className="text-sm text-blue-900">{notification.message}</p>
                                  <p className="text-xs text-blue-600 mt-1">
                                    {formatDate(notification.timestamp)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default AdminPage
