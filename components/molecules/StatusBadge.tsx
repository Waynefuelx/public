import {
  getOrderStatusLabel,
  getOrderStatusColor,
  getLeadStatusLabel,
  getStatusColor as getLeadStatusColor,
  getDeliveryStatusLabel,
  getDeliveryStatusColor,
  getPaymentStatusColor,
} from '@/lib/utils/admin-helpers'

type StatusType = 'order' | 'lead' | 'delivery' | 'payment'

interface StatusBadgeProps {
  status: string | number
  statusMap?: Map<number, string>
  statusType: StatusType
}

const StatusBadge = ({ status, statusMap, statusType }: StatusBadgeProps) => {
  let label: string
  let colorClasses: string

  switch (statusType) {
    case 'order':
      if (!statusMap) {
        label = String(status)
        colorClasses = 'bg-gray-100 text-gray-800'
      } else {
        label = getOrderStatusLabel(status, statusMap)
        colorClasses = getOrderStatusColor(status, statusMap)
      }
      break
    case 'lead':
      if (!statusMap) {
        label = String(status)
        colorClasses = 'bg-gray-100 text-gray-800'
      } else {
        label = getLeadStatusLabel(status, statusMap)
        colorClasses = getLeadStatusColor(status, statusMap)
      }
      break
    case 'delivery':
      if (!statusMap) {
        label = String(status)
        colorClasses = 'bg-gray-100 text-gray-800'
      } else {
        label = getDeliveryStatusLabel(status, statusMap)
        colorClasses = getDeliveryStatusColor(status, statusMap)
      }
      break
    case 'payment':
      label = String(status)
      colorClasses = getPaymentStatusColor(status)
      break
    default:
      label = String(status)
      colorClasses = 'bg-gray-100 text-gray-800'
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}
    >
      {label}
    </span>
  )
}

export default StatusBadge

