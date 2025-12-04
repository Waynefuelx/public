import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Card from '@/components/atoms/Card'
import DeliveryCard from '@/components/molecules/DeliveryCard'
import StatusBadge from '@/components/molecules/StatusBadge'
import Button from '@/components/atoms/Button'
import { MapPin, Eye } from 'lucide-react'
import { useActiveDeliveries, useOrderStatusEnum } from '@/lib/api/hooks'
import {
  formatDate,
} from '@/lib/utils/admin-helpers'
import type { ActiveDeliverySummaryDto } from '@/lib/api/services'

interface Delivery extends ActiveDeliverySummaryDto {
  coordinates?: {
    lat: number
    lng: number
  }
  serialNumber?: string
  qrCode?: string
  customerPhone?: string
  customerEmail?: string
  deliveryAddress?: string
  deliveryProvince?: string
  driverPhone?: string
  notes?: string
  orderId?: string
}

interface DriversTabProps {
  onNavigate: (lat: number, lng: number, address: string) => void
  onViewDetails: (delivery: Delivery) => void
}

const DriversTab = ({ onNavigate, onViewDetails }: DriversTabProps) => {
  const { data: deliveriesData = [] } = useActiveDeliveries()
  const { data: orderStatusEnumData = [] } = useOrderStatusEnum()

  // Create status map from enum data
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


  const deliveries: Delivery[] = (deliveriesData || []) as Delivery[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Driver Deliveries
            </h3>
            <p className="text-sm text-gray-600">
              Manage container deliveries and track driver progress
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">In Transit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Delivered</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Deliveries List */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Active Deliveries
        </h3>

        {/* Mobile View - Cards */}
        <div className="block lg:hidden space-y-4">
          {deliveries.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              delivery={delivery}
              statusMap={statusMap}
              onNavigate={
                delivery.coordinates
                  ? (d) =>
                      onNavigate(
                        d.coordinates!.lat,
                        d.coordinates!.lng,
                        d.deliveryAddress || ''
                      )
                  : undefined
              }
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Container
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Scheduled
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
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {delivery.containerNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {delivery.containerType}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {delivery.customerName}
                      </div>
                      {delivery.customerPhone && (
                        <div className="text-sm text-gray-500">
                          {delivery.customerPhone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {delivery.driverName}
                      </div>
                      {delivery.driverPhone && (
                        <div className="text-sm text-gray-500">
                          {delivery.driverPhone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {delivery.city}
                      </div>
                      {delivery.deliveryProvince && (
                        <div className="text-sm text-gray-500">
                          {delivery.deliveryProvince}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(delivery.scheduledDeliveryDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={delivery.status}
                      statusMap={statusMap}
                      statusType="delivery"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {delivery.coordinates && (
                        <button
                          onClick={() =>
                            onNavigate(
                              delivery.coordinates!.lat,
                              delivery.coordinates!.lng,
                              delivery.deliveryAddress || ''
                            )
                          }
                          className="text-primary-600 hover:text-primary-900"
                          title="Navigate to location"
                        >
                          <MapPin className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onViewDetails(delivery)}
                        className="text-primary-600 hover:text-primary-900"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
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

export default DriversTab
