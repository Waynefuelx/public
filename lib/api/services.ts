import { apiClient } from '../api-client'

// Types
export interface Order {
  id: string | number
  orderNumber?: string
  orderType?: 'purchase' | 'rental'
  type?: number
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  customer?: {
    name: string
    email: string
    phoneNumber?: string | null
    company?: string | null
  }
  company?: string
  containerType: string
  containerId?: string
  containerSize?: string
  quantity: number
  status: 'pending' | 'confirmed' | 'in-transit' | 'delivered' | 'returned' | 'completed' | number
  deliveryOption?: 'delivery' | 'collection'
  deliveryDate: string
  deliveryAddress?: string | { city: string; province: string }
  city?: string
  province?: string
  postalCode?: string
  total?: number
  value?: number
  assignedDriver?: string
  specialRequirements?: string
  paymentMethod?: 'credit' | 'invoice' | 'quote'
  createdAt?: string
  orderDate?: string
  isNew?: boolean
}

export interface Lead {
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

export interface Delivery {
  id: string
  containerNumber: string
  containerType: string
  customerName: string
  customerPhone: string
  customerEmail: string
  deliveryAddress: string
  deliveryCity: string
  deliveryProvince: string
  coordinates?: {
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
  orderId?: string
}

export interface LocationHistoryDto {
  latitude: number | string
  longitude: number | string
  timestamp: string
}

export interface ScheduledDeliveryDto {
  orderId: number | string
  status: number
  day: string
  time: string
  customerName: string
  addressLine: string
}

export interface EnumOptionDto {
  key: number | string
  value: string
}

export interface ActiveDeliverySummaryDto {
  id: number | string
  containerNumber: string
  containerSize: string
  containerType: string
  customerName: string
  city: string
  driverName: string
  scheduledDeliveryDate: string
  status: number
  locationHistory: LocationHistoryDto[]
}

export interface ContainerType {
  id: string
  name: string
  description?: string
  dimensions?: string
  capacity?: string
  price?: number
  priceUnit?: string
  image?: string
  category?: string
}

export interface TrackingInfo {
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

export interface TrackingUpdate {
  id: string
  timestamp: string
  status: string
  location: string
  description: string
  type: 'info' | 'warning' | 'success' | 'error'
}

export interface Notification {
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

export interface SummaryOverview<T = number | string> {
  count: T
  comparison?: number | string | null
}

export interface DashboardSummary {
  title: string
  subtitle: string
  status: number | string
}

export interface NotificationSummary {
  title: string
  subtitle: string
  timeStamp: string
  status: number | string
}

export interface DashboardOverview {
  totalLeads: SummaryOverview<number | string>
  activeOrders: SummaryOverview<number | string>
  revenue: SummaryOverview<number | string>
  conversionRate: SummaryOverview<number | string>
  recentLeads: DashboardSummary[]
  upcomingDeliveries: DashboardSummary[]
  notifications: NotificationSummary[]
}

export interface CustomerSummary {
  name: string
  email: string
  phoneNumber: string | null
  company: string | null
}

export interface LocationDto {
  latitude: number | string
  longitude: number | string
}

export interface AddressSummaryDto {
  city: string
  province: string
}

export interface DashboardContainerSummary {
  id: number | string
  containerNumber: string
  size: string
  customer: CustomerSummary
  location: LocationDto
  address: AddressSummaryDto
  duration: string
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface LeadListItem extends Lead {
  assignedUserId?: string
  assignedUserName?: string | null
  nextFollowUpDate?: string | null
  createdAt?: string
  modifiedAt?: string
}

interface AdminLeadsParams {
  search?: string
  leadStatus?: string
  page?: number
  pageSize?: number
}

// Admin API Services
export const adminApi = {
  // Orders
  getOrders: () => apiClient.get<Order[]>('/admin/orders'),
  getOrder: (orderId: string) => apiClient.get<Order>(`/admin/orders/${orderId}`),
  updateOrderStatus: (orderId: string, status: string) => 
    apiClient.patch(`/admin/orders/${orderId}/status`, { status }),

  // Leads
  getLeads: (params: AdminLeadsParams = {}) => {
    const searchParams = new URLSearchParams()
    if (params.search) searchParams.set('search', params.search)
    if (params.leadStatus) searchParams.set('leadStatus', params.leadStatus)
    if (typeof params.page !== 'undefined') searchParams.set('page', String(params.page))
    if (typeof params.pageSize !== 'undefined') searchParams.set('pageSize', String(params.pageSize))

    const queryString = searchParams.toString()
    const endpoint = queryString ? `/admin/leads?${queryString}` : '/admin/leads'
    return apiClient.get<PaginatedResponse<LeadListItem>>(endpoint)
  },
  getLead: (leadId: string) => apiClient.get<Lead>(`/admin/leads/${leadId}`),
  assignLead: (leadId: string, userId: string) => 
    apiClient.post(`/admin/leads/${leadId}/assign`, { userId }),
  exportLeads: () => apiClient.get('/admin/leads/export'),

  // Deliveries
  getActiveDeliveries: () => apiClient.get<ActiveDeliverySummaryDto[]>('/admin/deliveries/active'),
  getDelivery: (orderId: string) => apiClient.get<Delivery>(`/admin/deliveries/active/${orderId}`),
  getDeliveryLocationHistory: (orderId: string) => 
    apiClient.get(`/admin/deliveries/active/${orderId}/location-history`),

  // Dashboard
  getDashboard: () => apiClient.get<DashboardOverview>('/admin/dashboard'),

  // Container Types
  getContainerTypes: () => apiClient.get<ContainerType[]>('/admin/container-types'),
  getContainerSizes: () => apiClient.get('/admin/container-sizes'),
  getContainerTypeSizes: (containerTypeId: string) => 
    apiClient.get(`/admin/container-types/${containerTypeId}/sizes`),

  // Containers
  getContainers: () => apiClient.get<DashboardContainerSummary[]>('/admin/containers'),
  getContainer: (id: string) => apiClient.get(`/admin/containers/${id}`),

  // Calendar
  getScheduledDeliveries: (start: string, end: string) => {
    const params = new URLSearchParams()
    params.set('start', start)
    params.set('end', end)
    return apiClient.get<ScheduledDeliveryDto[]>(`/admin/calendar/scheduled-deliveries?${params.toString()}`)
  },

  // Enums
  getOrderStatusEnum: () => apiClient.get<EnumOptionDto[]>('/admin/enums/orderstatus'),
  getLeadStatusEnum: () => apiClient.get<EnumOptionDto[]>('/admin/enums/leadstatus'),
  getOrderTypeEnum: () => apiClient.get<EnumOptionDto[]>('/admin/enums/ordertype'),
}

// Customer API Services
export interface CustomerProfile {
  id: number | string
  name: string | null
  phoneNumber: string | null
  company: string | null
  email?: string
}

export interface DriverProfile {
  id: number | string
  name: string | null
  email: string | null
  phoneNumber: string | null
  driverLicenseExpiryDate: string | null
  driverId?: string
}

export const customerApi = {
  getMe: () => apiClient.get<CustomerProfile>('/customers/me'),
  getMyOrders: () => apiClient.get<Order[]>('/customers/me/orders'),
  getOrderDetails: () => apiClient.get('/customers/me/orders/details'),
  getOrderSummary: () => apiClient.get('/customers/me/orders/summary'),
  trackOrder: (orderId: string) => apiClient.get<TrackingInfo>(`/customers/me/orders/${orderId}/track`),
  getAvailableContainers: () => apiClient.get<ContainerType[]>('/customers/containers/available'),
  createOrder: (orderData: Partial<Order>) => apiClient.post<Order>('/customers/orders', orderData),
}

// Driver API Services
export const driverApi = {
  getMe: () => apiClient.get<DriverProfile>('/drivers/me'),
  getAssignedOrders: () => apiClient.get<Delivery[]>('/drivers/orders/assigned'),
  getAssignedOrderCounts: () => apiClient.get('/drivers/orders/assigned/counts'),
  getUnassignedOrders: () => apiClient.get<Delivery[]>('/drivers/orders/unassigned'),
  assignOrder: (orderId: string) => apiClient.post(`/drivers/orders/${orderId}/assign`),
  startOrder: (orderId: string) => apiClient.post(`/drivers/orders/${orderId}/start`),
  completeOrder: (orderId: string) => apiClient.post(`/drivers/orders/${orderId}/complete`),
  getLocationHistory: (orderId: string) => 
    apiClient.get(`/drivers/orders/${orderId}/location-history`),
}

// Auth API Types
export interface AccessTokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number | string
  tokenType?: string | null
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
  firstName?: string
  lastName?: string
  phone?: string
}

export interface CurrentUserProfile {
  id: number | string
  name: string | null
  email: string | null
  phoneNumber: string | null
  company: string | null
  roles: string[]
}

// Auth API Services
export const authApi = {
  login: (email: string, password: string, useCookies?: boolean) => 
    apiClient.post<AccessTokenResponse>('/auth/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  register: (data: RegisterRequest) => apiClient.post('/auth/register', data),
  refresh: (refreshToken: string) => apiClient.post<AccessTokenResponse>('/auth/refresh', { refreshToken }),
  forgotPassword: (email: string) => apiClient.post('/auth/forgotPassword', { email }),
  resetPassword: (data: any) => apiClient.post('/auth/resetPassword', data),
  confirmEmail: (token: string) => apiClient.post('/auth/confirmEmail', { token }),
  resendConfirmationEmail: (email: string) => 
    apiClient.post('/auth/resendConfirmationEmail', { email }),
  getCurrentUser: () => apiClient.get<CurrentUserProfile>('/api/me'),
}

