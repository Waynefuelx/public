'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import { 
  Bell, 
  Check, 
  X, 
  Clock, 
  Package, 
  Truck, 
  AlertCircle,
  Filter,
  Search
} from 'lucide-react'

interface Notification {
  id: string
  orderId: string
  customerEmail: string
  message: string
  type: 'order_confirmed' | 'delivery_started' | 'delivery_completed' | 'order_cancelled' | 'payment_received'
  trackingNumber?: string
  timestamp: string
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
}

const NotificationsPage = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isClient, setIsClient] = useState(false)

  // Set client flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mock notifications data
  useEffect(() => {
    if (isClient) {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          orderId: 'ORD-2024-001',
          customerEmail: 'john.doe@example.com',
          message: 'Order confirmed and payment received',
          type: 'order_confirmed',
          trackingNumber: 'TRK-001',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          isRead: false,
          priority: 'high'
        },
        {
          id: '2',
          orderId: 'ORD-2024-002',
          customerEmail: 'jane.smith@example.com',
          message: 'Delivery started - Container is on route',
          type: 'delivery_started',
          trackingNumber: 'TRK-002',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
          isRead: false,
          priority: 'medium'
        },
        {
          id: '3',
          orderId: 'ORD-2024-003',
          customerEmail: 'bob.wilson@example.com',
          message: 'Delivery completed successfully',
          type: 'delivery_completed',
          trackingNumber: 'TRK-003',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
          isRead: true,
          priority: 'low'
        },
        {
          id: '4',
          orderId: 'ORD-2024-004',
          customerEmail: 'alice.brown@example.com',
          message: 'Payment received for order',
          type: 'payment_received',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
          isRead: true,
          priority: 'medium'
        },
        {
          id: '5',
          orderId: 'ORD-2024-005',
          customerEmail: 'charlie.davis@example.com',
          message: 'Order cancelled by customer',
          type: 'order_cancelled',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
          isRead: false,
          priority: 'high'
        }
      ]
      setNotifications(mockNotifications)
    }
  }, [isClient])

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order_confirmed':
        return <Check className="w-5 h-5 text-green-600" />
      case 'delivery_started':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'delivery_completed':
        return <Package className="w-5 h-5 text-green-600" />
      case 'order_cancelled':
        return <X className="w-5 h-5 text-red-600" />
      case 'payment_received':
        return <Check className="w-5 h-5 text-green-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50'
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50'
      case 'low':
        return 'border-l-green-500 bg-green-50'
      default:
        return 'border-l-gray-500 bg-gray-50'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.isRead) || 
      (filter === 'read' && notification.isRead)
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    
    const matchesSearch = searchTerm === '' || 
      notification.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesType && matchesSearch
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <ProtectedRoute allowedTypes={['admin', 'customer', 'driver']}>
      <div className="min-h-screen bg-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">
                  <Bell className="w-8 h-8 text-primary-600 flex-shrink-0" />
                  <span className="whitespace-nowrap">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-sm font-medium px-2 py-1 rounded-full flex-shrink-0">
                      {unreadCount}
                    </span>
                  )}
                </h1>
                <p className="text-gray-600 mt-2">Stay updated with your latest orders and deliveries</p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="btn-secondary text-sm flex-shrink-0"
                >
                  Mark All as Read
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 w-full"
                />
              </div>

              {/* Status Filter */}
              <div className="flex-1 min-w-48">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
                  className="input-field w-full"
                >
                  <option value="all">All Notifications</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex-1 min-w-48">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="all">All Types</option>
                  <option value="order_confirmed">Order Confirmed</option>
                  <option value="delivery_started">Delivery Started</option>
                  <option value="delivery_completed">Delivery Completed</option>
                  <option value="order_cancelled">Order Cancelled</option>
                  <option value="payment_received">Payment Received</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow-sm border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'ring-2 ring-blue-100' : ''
                  } transition-all duration-200 hover:shadow-md`}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Order {notification.orderId}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                              notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {notification.priority}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-2">{notification.message}</p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                            <span className="break-all">{notification.customerEmail}</span>
                            {notification.trackingNumber && (
                              <span className="whitespace-nowrap">Tracking: {notification.trackingNumber}</span>
                            )}
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Clock className="w-4 h-4" />
                              {formatDate(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 lg:ml-4">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium whitespace-nowrap"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-500">
                  {searchTerm || filter !== 'all' || typeFilter !== 'all' 
                    ? 'Try adjusting your filters to see more notifications.'
                    : 'You\'re all caught up! New notifications will appear here.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default NotificationsPage
