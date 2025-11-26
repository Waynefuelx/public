import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi, customerApi, driverApi, Order, Lead, Delivery, ContainerType, TrackingInfo, PaginatedResponse, LeadListItem, DashboardOverview } from './services'

// Admin Hooks
export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => adminApi.getOrders(),
  })
}

export const useAdminOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['admin', 'orders', orderId],
    queryFn: () => adminApi.getOrder(orderId),
    enabled: !!orderId,
  })
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      adminApi.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] })
    },
  })
}

type AdminLeadsQuery = {
  search?: string
  leadStatus?: string
  page?: number
  pageSize?: number
}

export const useAdminLeads = (params: AdminLeadsQuery = {}) => {
  return useQuery<PaginatedResponse<LeadListItem>>({
    queryKey: ['admin', 'leads', params],
    queryFn: () => adminApi.getLeads(params),
  })
}

export const useAdminLead = (leadId: string) => {
  return useQuery({
    queryKey: ['admin', 'leads', leadId],
    queryFn: () => adminApi.getLead(leadId),
    enabled: !!leadId,
  })
}

export const useAssignLead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ leadId, userId }: { leadId: string; userId: string }) =>
      adminApi.assignLead(leadId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'leads'] })
    },
  })
}

export const useActiveDeliveries = () => {
  return useQuery({
    queryKey: ['admin', 'deliveries', 'active'],
    queryFn: () => adminApi.getActiveDeliveries(),
  })
}

export const useDelivery = (orderId: string) => {
  return useQuery({
    queryKey: ['admin', 'deliveries', orderId],
    queryFn: () => adminApi.getDelivery(orderId),
    enabled: !!orderId,
  })
}

export const useDeliveryLocationHistory = (orderId: string) => {
  return useQuery({
    queryKey: ['admin', 'deliveries', orderId, 'location-history'],
    queryFn: () => adminApi.getDeliveryLocationHistory(orderId),
    enabled: !!orderId,
  })
}

export const useAdminDashboard = () => {
  return useQuery<DashboardOverview>({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => adminApi.getDashboard(),
  })
}

export const useContainerTypes = () => {
  return useQuery({
    queryKey: ['container-types'],
    queryFn: () => adminApi.getContainerTypes(),
  })
}

export const useScheduledDeliveries = (start: string, end: string) => {
  return useQuery({
    queryKey: ['admin', 'calendar', 'scheduled-deliveries', start, end],
    queryFn: () => adminApi.getScheduledDeliveries(start, end),
    enabled: !!start && !!end,
  })
}

export const useAdminContainers = () => {
  return useQuery({
    queryKey: ['admin', 'containers'],
    queryFn: () => adminApi.getContainers(),
  })
}

export const useOrderStatusEnum = () => {
  return useQuery({
    queryKey: ['admin', 'enums', 'orderstatus'],
    queryFn: () => adminApi.getOrderStatusEnum(),
  })
}

export const useLeadStatusEnum = () => {
  return useQuery({
    queryKey: ['admin', 'enums', 'leadstatus'],
    queryFn: () => adminApi.getLeadStatusEnum(),
  })
}

export const useOrderTypeEnum = () => {
  return useQuery({
    queryKey: ['admin', 'enums', 'ordertype'],
    queryFn: () => adminApi.getOrderTypeEnum(),
  })
}

// Customer Hooks
export const useCustomerMe = () => {
  return useQuery({
    queryKey: ['customer', 'me'],
    queryFn: () => customerApi.getMe(),
  })
}

export const useCustomerOrders = () => {
  return useQuery({
    queryKey: ['customer', 'orders'],
    queryFn: () => customerApi.getMyOrders(),
  })
}

export const useCustomerOrderDetails = () => {
  return useQuery({
    queryKey: ['customer', 'orders', 'details'],
    queryFn: () => customerApi.getOrderDetails(),
  })
}

export const useCustomerOrderSummary = () => {
  return useQuery({
    queryKey: ['customer', 'orders', 'summary'],
    queryFn: () => customerApi.getOrderSummary(),
  })
}

export const useTrackOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['customer', 'orders', orderId, 'track'],
    queryFn: () => customerApi.trackOrder(orderId),
    enabled: !!orderId,
  })
}

export const useAvailableContainers = () => {
  return useQuery({
    queryKey: ['containers', 'available'],
    queryFn: () => customerApi.getAvailableContainers(),
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (orderData: Partial<Order>) => customerApi.createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer', 'orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] })
    },
  })
}

// Driver Hooks
export const useDriverMe = () => {
  return useQuery({
    queryKey: ['driver', 'me'],
    queryFn: () => driverApi.getMe(),
  })
}

export const useAssignedOrders = () => {
  return useQuery({
    queryKey: ['driver', 'orders', 'assigned'],
    queryFn: () => driverApi.getAssignedOrders(),
  })
}

export const useAssignedOrderCounts = () => {
  return useQuery({
    queryKey: ['driver', 'orders', 'assigned', 'counts'],
    queryFn: () => driverApi.getAssignedOrderCounts(),
  })
}

export const useUnassignedOrders = () => {
  return useQuery({
    queryKey: ['driver', 'orders', 'unassigned'],
    queryFn: () => driverApi.getUnassignedOrders(),
  })
}

export const useAssignOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (orderId: string) => driverApi.assignOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driver', 'orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'deliveries'] })
    },
  })
}

export const useStartOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (orderId: string) => driverApi.startOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driver', 'orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'deliveries'] })
    },
  })
}

export const useCompleteOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (orderId: string) => driverApi.completeOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['driver', 'orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'deliveries'] })
    },
  })
}

export const useDriverLocationHistory = (orderId: string) => {
  return useQuery({
    queryKey: ['driver', 'orders', orderId, 'location-history'],
    queryFn: () => driverApi.getLocationHistory(orderId),
    enabled: !!orderId,
  })
}

