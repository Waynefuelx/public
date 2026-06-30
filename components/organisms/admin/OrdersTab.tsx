import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Card from '@/components/atoms/Card'
import OrderCard from '@/components/molecules/OrderCard'
import StatusBadge from '@/components/molecules/StatusBadge'
import { Eye } from 'lucide-react'
import {
  useAdminOrders,
  useOrderStatusEnum,
  useOrderTypeEnum,
} from '@/lib/api/hooks'
import {
  formatDate,
  getOrderTypeLabel,
  getCustomerName,
  getCustomerCompany,
} from '@/lib/utils/admin-helpers'
import type { Order as ApiOrder } from '@/lib/api/services'

interface OrdersTabProps {
  onViewDetails: (order: ApiOrder) => void
  onUpdateStatus: (order: ApiOrder) => void
}

const OrdersTab = ({ onViewDetails, onUpdateStatus }: OrdersTabProps) => {
  const { data: ordersData = [] } = useAdminOrders()
  const { data: orderStatusEnumData = [] } = useOrderStatusEnum()
  const { data: orderTypeEnumData = [] } = useOrderTypeEnum()

  // Create status maps from enum data
  const statusMap = useMemo(() => {
    const map = new Map<number, string>()
    orderStatusEnumData.forEach((option) => {
      const key =
        typeof option.key === 'string' ? parseInt(option.key, 10) : option.key
      if (!isNaN(key)) {
        map.set(key, option.value)
      }
    })
    return map
  }, [orderStatusEnumData])

  const orderTypeMap = useMemo(() => {
    const map = new Map<number, string>()
    orderTypeEnumData.forEach((option) => {
      const key =
        typeof option.key === 'string' ? parseInt(option.key, 10) : option.key
      if (!isNaN(key)) {
        map.set(key, option.value)
      }
    })
    return map
  }, [orderTypeEnumData])


  // Helper functions to extract customer data (for table view)
  const getCustomerEmail = (order: ApiOrder): string => {
    return order.customerEmail || order.customer?.email || ''
  }

  const orders = ordersData || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              All Orders
            </h3>
            <p className="text-sm text-gray-600">
              Purchase and rental orders from customers
            </p>
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
            <OrderCard
              key={order.id}
              order={order}
              statusMap={statusMap}
              orderTypeMap={orderTypeMap}
              onViewDetails={onViewDetails}
              onUpdateStatus={onUpdateStatus}
            />
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
                <tr
                  key={order.id}
                  className={`hover:bg-gray-50 ${
                    order.isNew ? 'bg-green-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderNumber || order.id}
                      </div>
                      {order.isNew && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(order.createdAt || order.orderDate || '')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        getOrderTypeLabel(order, orderTypeMap).toLowerCase() === 'purchase'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {getOrderTypeLabel(order, orderTypeMap)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {getCustomerName(order)}
                      </div>
                      {getCustomerCompany(order) && (
                        <div className="text-sm text-gray-500">
                          {getCustomerCompany(order)}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        <a
                          href={`mailto:${getCustomerEmail(order)}`}
                          className="hover:text-primary-700 transition-colors duration-200"
                        >
                          {getCustomerEmail(order)}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.containerType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.deliveryOption || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    R{((order.value ?? order.total) || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={order.status}
                      statusMap={statusMap}
                      statusType="order"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewDetails(order)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onUpdateStatus(order)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}

export default OrdersTab
