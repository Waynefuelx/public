import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import StatCard from '@/components/molecules/StatCard'
import Card from '@/components/atoms/Card'
import StatusBadge from '@/components/molecules/StatusBadge'
import {
  useAdminDashboard,
  useAdminLeads,
  useAdminOrders,
  useOrderStatusEnum,
  useLeadStatusEnum,
} from '@/lib/api/hooks'
import {
  formatDate,
  getStatusColor,
  getOrderStatusColor,
  getDeliveryStatusLabel,
} from '@/lib/utils/admin-helpers'
import type { SummaryOverview, Order as ApiOrder } from '@/lib/api/services'

interface Stat {
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
}

const DEFAULT_STATS: Stat[] = [
  {
    label: 'Total Leads',
    value: '156',
    change: '+12%',
    changeType: 'positive',
  },
  {
    label: 'Active Orders',
    value: '89',
    change: '+5%',
    changeType: 'positive',
  },
  {
    label: 'Revenue This Month',
    value: 'R45,230',
    change: '+18%',
    changeType: 'positive',
  },
  {
    label: 'Conversion Rate',
    value: '23%',
    change: '+2%',
    changeType: 'positive',
  },
]

const DashboardTab = () => {
  // React Query hooks
  const { data: dashboardData, isLoading: dashboardLoading } = useAdminDashboard()
  const { data: leadsData } = useAdminLeads()
  const { data: ordersData = [] } = useAdminOrders()
  const { data: orderStatusEnumData = [] } = useOrderStatusEnum()
  const { data: leadStatusEnumData = [] } = useLeadStatusEnum()

  // Create status maps from enum data
  const statusMap = useMemo(() => {
    const map = new Map<number, string>()
    orderStatusEnumData.forEach((option) => {
      const key = typeof option.key === 'string' ? parseInt(option.key, 10) : option.key
      if (!isNaN(key)) {
        map.set(key, option.value)
      }
    })
    return map
  }, [orderStatusEnumData])

  const leadStatusMap = useMemo(() => {
    const map = new Map<number, string>()
    leadStatusEnumData.forEach((option) => {
      const key = typeof option.key === 'string' ? parseInt(option.key, 10) : option.key
      if (!isNaN(key)) {
        map.set(key, option.value)
      }
    })
    return map
  }, [leadStatusEnumData])

  // Helper functions that use status maps
  const getLeadStatusLabel = (status: number | string): string => {
    const statusNum = typeof status === 'string' ? parseInt(status, 10) : status
    if (leadStatusMap.has(statusNum)) {
      return leadStatusMap.get(statusNum)!
    }
    return 'unknown'
  }

  const getOrderStatusLabel = (status: number | string): string => {
    const statusNum = typeof status === 'string' ? parseInt(status, 10) : status
    if (statusMap.has(statusNum)) {
      return statusMap.get(statusNum)!
    }
    return 'unknown'
  }
  
  const getDeliveryStatusLabelWithMap = (status: string | number) => {
    return getDeliveryStatusLabel(status, statusMap)
  }

  // Formatters
  const numberFormatter = useMemo(() => new Intl.NumberFormat('en-ZA'), [])
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
      }),
    []
  )

  const toNumber = (value: number | string | null | undefined): number => {
    if (value === null || value === undefined) return 0
    if (typeof value === 'string') {
      const parsed = parseFloat(value)
      return Number.isNaN(parsed) ? 0 : parsed
    }
    return value
  }

  const buildStat = (
    label: string,
    summary?: SummaryOverview<number | string>,
    options: { format?: 'currency' | 'percent' } = {}
  ): Stat => {
    if (!summary) {
      const fallback = DEFAULT_STATS.find((stat) => stat.label === label)
      return (
        fallback || {
          label,
          value: '-',
          change: '0%',
          changeType: 'positive' as const,
        }
      )
    }

    const countValue = toNumber(summary.count)
    let displayValue: string

    if (options.format === 'currency') {
      displayValue = currencyFormatter.format(countValue)
    } else if (options.format === 'percent') {
      displayValue = `${countValue.toFixed(1)}%`
    } else {
      displayValue = numberFormatter.format(countValue)
    }

    const comparisonValue = toNumber(summary.comparison)
    const changeType: 'positive' | 'negative' = comparisonValue >= 0 ? 'positive' : 'negative'
    const changeValue = `${comparisonValue >= 0 ? '+' : ''}${comparisonValue.toFixed(1)}%`

    return {
      label,
      value: displayValue,
      change: changeValue,
      changeType,
    }
  }

  // Get customer name helper
  const getCustomerName = (order: ApiOrder): string => {
    return order.customerName || order.customer?.name || ''
  }

  // Compute stats
  const stats = useMemo(() => {
    if (!dashboardData) {
      return DEFAULT_STATS
    }

    return [
      buildStat('Total Leads', dashboardData.totalLeads),
      buildStat('Active Orders', dashboardData.activeOrders),
      buildStat('Revenue This Month', dashboardData.revenue, {
        format: 'currency',
      }),
      buildStat('Conversion Rate', dashboardData.conversionRate, {
        format: 'percent',
      }),
    ]
  }, [dashboardData, currencyFormatter, numberFormatter])

  // Compute recent leads
  const recentLeads = useMemo(() => {
    const leads = leadsData?.items || []
    if (dashboardData?.recentLeads?.length) {
      return dashboardData.recentLeads.map((item, index) => ({
        key: `dashboard-lead-${index}-${item.title}`,
        title: item.title,
        subtitle: item.subtitle,
        status: item.status, // Keep original status value for StatusBadge
      }))
    }

    return leads.slice(0, 3).map((lead) => ({
      key: String(lead.id),
      title: lead.name,
      subtitle: lead.company,
      status: lead.status, // Keep original status value for StatusBadge
    }))
  }, [dashboardData?.recentLeads, leadsData])

  // Compute upcoming deliveries
  const upcomingDeliveries = useMemo(() => {
    const orders = ordersData || []
    if (dashboardData?.upcomingDeliveries?.length) {
      return dashboardData.upcomingDeliveries.map((item, index) => ({
        key: `dashboard-delivery-${index}-${item.title}`,
        title: item.title,
        subtitle: item.subtitle,
        status: item.status, // Keep original status value for StatusBadge
      }))
    }

    return orders.slice(0, 3).map((order) => ({
      key: String(order.id),
      title: getCustomerName(order),
      subtitle: order.containerType || '',
      status: order.status, // Keep original status value for StatusBadge
    }))
  }, [dashboardData?.upcomingDeliveries, ordersData])

  // Compute recent notifications
  const recentNotifications = useMemo(() => {
    if (dashboardData?.notifications?.length) {
      return dashboardData.notifications.slice(0, 3).map((item, index) => ({
        key: `dashboard-notification-${index}-${item.title}`,
        title: item.title,
        message: item.subtitle,
        timestamp: item.timeStamp,
      }))
    }

    return []
  }, [dashboardData?.notifications])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {dashboardLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Refreshing dashboard data...</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Leads
          </h3>
          <div className="space-y-4">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div
                  key={lead.key}
                  className="flex items-center justify-between p-3 bg-secondary-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-secondary-900">
                      {lead.title}
                    </p>
                    <p className="text-sm text-secondary-600">
                      {lead.subtitle}
                    </p>
                  </div>
                  <StatusBadge
                    status={lead.status}
                    statusMap={leadStatusMap}
                    statusType="lead"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  No recent leads available.
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Deliveries
          </h3>
          <div className="space-y-4">
            {upcomingDeliveries.length > 0 ? (
              upcomingDeliveries.map((delivery) => (
                <div
                  key={delivery.key}
                  className="flex items-center justify-between p-3 bg-secondary-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-secondary-900">
                      {delivery.title}
                    </p>
                    <p className="text-sm text-secondary-600">
                      {delivery.subtitle}
                    </p>
                  </div>
                  <StatusBadge
                    status={delivery.status}
                    statusMap={statusMap}
                    statusType="order"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  No upcoming deliveries scheduled.
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Notifications
          </h3>
          <div className="space-y-4">
            {recentNotifications.length > 0 ? (
              recentNotifications.map((notification) => (
                <div
                  key={notification.key}
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-blue-900 font-medium">
                        {notification.title}
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        {formatDate(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  No notifications yet
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default DashboardTab
