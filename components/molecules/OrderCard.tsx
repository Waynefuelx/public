import Card from '../atoms/Card'
import StatusBadge from './StatusBadge'
import Button from '../atoms/Button'
import type { Order as ApiOrder } from '@/lib/api/services'
import {
  getCustomerName,
  getCustomerCompany,
  getOrderTypeLabel,
  formatDate,
} from '@/lib/utils/admin-helpers'

interface OrderCardProps {
  order: ApiOrder
  statusMap: Map<number, string>
  orderTypeMap?: Map<number, string>
  onViewDetails: (order: ApiOrder) => void
  onUpdateStatus: (order: ApiOrder) => void
}

const OrderCard = ({
  order,
  statusMap,
  orderTypeMap,
  onViewDetails,
  onUpdateStatus,
}: OrderCardProps) => {
  const isNew = order.isNew
  const orderType = getOrderTypeLabel(order, orderTypeMap)

  return (
    <Card className={isNew ? 'border-green-500 bg-green-50' : ''}>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <h4 className="font-medium text-gray-900">
                {order.orderNumber || order.id}
              </h4>
              <p className="text-sm text-gray-500">
                {order.containerType}
              </p>
            </div>
            {isNew && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                orderType.toLowerCase() === 'purchase'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {orderType}
            </span>
            <StatusBadge
              status={order.status}
              statusMap={statusMap}
              statusType="order"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-600">Customer</p>
            <p className="font-medium text-gray-900">
              {getCustomerName(order)}
            </p>
            {getCustomerCompany(order) && (
              <p className="text-xs text-gray-500">
                {getCustomerCompany(order)}
              </p>
            )}
          </div>
          <div>
            <p className="text-gray-600">Total</p>
            <p className="font-medium text-gray-900">
              R{((order.value ?? order.total) || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Delivery</p>
            <p className="font-medium text-gray-900">
              {order.deliveryOption || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Date</p>
            <p className="font-medium text-gray-900">
              {order.deliveryDate ? formatDate(order.deliveryDate) : 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onViewDetails(order)}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            onClick={() => onUpdateStatus(order)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Update Status
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default OrderCard

