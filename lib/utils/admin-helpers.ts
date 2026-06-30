// Helper functions for admin page

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid Date'
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

export const formatDuration = (days: number): string => {
  if (days < 30) return `${days} days`
  const months = Math.floor(days / 30)
  const remainingDays = days % 30
  if (remainingDays === 0)
    return `${months} month${months > 1 ? 's' : ''}`
  return `${months} month${months > 1 ? 's' : ''} ${remainingDays} days`
}

export const calculateDaysSinceDelivery = (deliveryDate: string): number => {
  const delivery = new Date(deliveryDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - delivery.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const generateTrackingNumber = (): string => {
  const prefix = 'VC'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export const getStatusColor = (status: string | number, statusMap: Map<number, string>): string => {
  let statusLabel: string
  if (typeof status === 'number') {
    statusLabel = statusMap.get(status) || 'unknown'
  } else {
    statusLabel = status
  }

  switch (statusLabel.toLowerCase().replace(/\s+/g, '')) {
    case 'new':
      return 'bg-blue-100 text-blue-800'
    case 'contacted':
      return 'bg-yellow-100 text-yellow-800'
    case 'qualified':
      return 'bg-green-100 text-green-800'
    case 'proposal':
      return 'bg-purple-100 text-purple-800'
    case 'closed':
      return 'bg-green-100 text-green-800'
    case 'lost':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getOrderStatusColor = (status: string | number, statusMap: Map<number, string>): string => {
  let statusLabel: string
  if (typeof status === 'number') {
    statusLabel = statusMap.get(status) || 'unknown'
  } else {
    statusLabel = status
  }

  switch (statusLabel.toLowerCase().replace(/\s+/g, '').replace(/-/g, '')) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'confirmed':
      return 'bg-blue-100 text-blue-800'
    case 'intransit':
      return 'bg-purple-100 text-purple-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'returned':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getPaymentStatusColor = (status: string | number): string => {
  const statusStr = typeof status === 'string' ? status : String(status)
  switch (statusStr) {
    case 'paid':
      return 'bg-green-100 text-green-800'
    case 'overdue':
      return 'bg-red-100 text-red-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getLeadStatusLabel = (status: number | string, statusMap: Map<number, string>): string => {
  const statusNum = typeof status === 'string' ? parseInt(status, 10) : status
  // Use enum data if available, otherwise fallback to default
  if (statusMap.has(statusNum)) {
    return statusMap.get(statusNum)!
  }
  // Fallback for unknown status values
  return 'unknown'
}

export const getDeliveryStatusLabel = (status: number | string, statusMap: Map<number, string>): string => {
  const statusNum = typeof status === 'string' ? parseInt(status, 10) : status
  // Use enum data if available, otherwise fallback to default
  if (statusMap.has(statusNum)) {
    return statusMap.get(statusNum)!
  }
  // Fallback for unknown status values
  return 'pending'
}

export const getDeliveryStatusColor = (status: number | string, statusMap: Map<number, string>): string => {
  const statusLabel = getDeliveryStatusLabel(status, statusMap)
  switch (statusLabel.toLowerCase().replace(/\s+/g, '').replace(/-/g, '')) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'confirmed':
      return 'bg-blue-100 text-blue-800'
    case 'intransit':
      return 'bg-blue-100 text-blue-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getOrderStatusLabel = (status: number | string, statusMap: Map<number, string>): string => {
  const statusNum = typeof status === 'string' ? parseInt(status, 10) : status
  // Use enum data if available, otherwise fallback to default
  if (statusMap.has(statusNum)) {
    return statusMap.get(statusNum)!
  }
  // Fallback for unknown status values
  return 'unknown'
}

// Helper functions for extracting customer data from orders
export const getCustomerName = (order: { customerName?: string; customer?: { name?: string | null } }): string => {
  return order.customerName || order.customer?.name || ''
}

export const getCustomerCompany = (order: { company?: string | null; customer?: { company?: string | null } }): string | undefined => {
  const company = order.company || order.customer?.company
  return company ?? undefined
}

export const getCustomerEmail = (order: { customerEmail?: string; customer?: { email?: string | null } }): string => {
  return order.customerEmail || order.customer?.email || ''
}

export const getCustomerPhone = (order: { customerPhone?: string; customer?: { phoneNumber?: string | null } }): string => {
  return order.customerPhone || order.customer?.phoneNumber || ''
}

// Helper function for getting order type label
export const getOrderTypeLabel = (
  order: { type?: number | string; orderType?: 'purchase' | 'rental' },
  orderTypeMap?: Map<number, string>
): string => {
  // First check if there's a numeric type field
  if (order.type !== undefined && order.type !== null && orderTypeMap) {
    const typeNum = typeof order.type === 'string' ? parseInt(order.type, 10) : order.type
    if (!isNaN(typeNum) && orderTypeMap.has(typeNum)) {
      return orderTypeMap.get(typeNum)!
    }
  }
  // Fall back to orderType string field if it exists
  if (order.orderType && (order.orderType === 'purchase' || order.orderType === 'rental')) {
    return order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)
  }
  return 'unknown'
}

