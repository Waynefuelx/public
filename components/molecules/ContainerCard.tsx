import Card from '../atoms/Card'
import StatusBadge from './StatusBadge'
import Button from '../atoms/Button'
import { Eye } from 'lucide-react'
import type { Container } from '@/lib/types/container'
import {
  formatDuration,
  calculateDaysSinceDelivery,
  getPaymentStatusColor,
} from '@/lib/utils/admin-helpers'

interface ContainerCardProps {
  container: Container
  onView: (container: Container) => void
}

const ContainerCard = ({
  container,
  onView,
}: ContainerCardProps) => {
  return (
    <Card>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">
              {container.containerNumber}
            </h4>
            <p className="text-sm text-gray-500">
              {container.containerType}
            </p>
          </div>
          <Button
            onClick={() => onView(container)}
            variant="outline"
            size="sm"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-600">Customer</p>
            <p className="font-medium text-gray-900">
              {container.customerName}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Location</p>
            <p className="font-medium text-gray-900">
              {container.location.city}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Duration</p>
            <p className="font-medium text-gray-900">
              {formatDuration(calculateDaysSinceDelivery(container.deliveryDate))}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <StatusBadge
              status={container.paymentStatus}
              statusType="payment"
            />
          </div>
        </div>

        {container.totalOwed > 0 && (
          <div className="text-xs text-red-600 font-medium">
            Outstanding: R{container.totalOwed.toLocaleString()}
          </div>
        )}
      </div>
    </Card>
  )
}

export default ContainerCard
