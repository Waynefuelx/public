import Card from '../atoms/Card'
import StatusBadge from './StatusBadge'
import Button from '../atoms/Button'
import { MapPin, Eye } from 'lucide-react'
import {
  formatDate,
} from '@/lib/utils/admin-helpers'

interface Delivery {
  id: string | number
  containerNumber: string
  containerType: string
  containerSize: string
  customerName: string
  customerPhone?: string
  driverName: string
  driverPhone?: string
  city: string
  deliveryProvince?: string
  scheduledDeliveryDate: string
  status: number
  locationHistory: any[]
  coordinates?: {
    lat: number
    lng: number
  }
  deliveryAddress?: string
}

interface DeliveryCardProps {
  delivery: Delivery
  statusMap: Map<number, string>
  onNavigate?: (delivery: Delivery) => void
  onViewDetails: (delivery: Delivery) => void
}

const DeliveryCard = ({
  delivery,
  statusMap,
  onNavigate,
  onViewDetails,
}: DeliveryCardProps) => {
  return (
    <Card>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">
              {delivery.containerNumber}
            </h4>
            <p className="text-sm text-gray-500">
              {delivery.containerType}
            </p>
          </div>
          <StatusBadge
            status={delivery.status}
            statusMap={statusMap}
            statusType="delivery"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-600">Customer</p>
            <p className="font-medium text-gray-900">
              {delivery.customerName}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Driver</p>
            <p className="font-medium text-gray-900">
              {delivery.driverName}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Location</p>
            <p className="font-medium text-gray-900">
              {delivery.city}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Scheduled</p>
            <p className="font-medium text-gray-900">
              {formatDate(delivery.scheduledDeliveryDate)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {onNavigate && delivery.coordinates && (
            <Button
              onClick={() => onNavigate(delivery)}
              variant="primary"
              size="sm"
              className="flex-1"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Navigate
            </Button>
          )}
          <Button
            onClick={() => onViewDetails(delivery)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default DeliveryCard

