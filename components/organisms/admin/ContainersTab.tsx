import { motion } from 'framer-motion'
import { useMemo } from 'react'
import Card from '@/components/atoms/Card'
import ContainerCard from '@/components/molecules/ContainerCard'
import ContainerMap from '@/components/organisms/admin/ContainerMap'
import StatusBadge from '@/components/molecules/StatusBadge'
import { Eye, Loader2 } from 'lucide-react'
import { useAdminContainers } from '@/lib/api/hooks'
import {
  formatDuration,
  calculateDaysSinceDelivery,
} from '@/lib/utils/admin-helpers'
import type { DashboardContainerSummary } from '@/lib/api/services'
import type { Container } from '@/lib/types/container'

interface ContainersTabProps {
  onViewContainer: (container: Container) => void
}

const ContainersTab = ({ onViewContainer }: ContainersTabProps) => {
  const { data: containersData = [], isLoading: containersLoading } =
    useAdminContainers()

  // Map API containers data to Container interface
  const containers: Container[] = useMemo(() => {
    if (!containersData || containersData.length === 0) {
      return []
    }

    return containersData.map((apiContainer: DashboardContainerSummary) => {
      // Parse duration string (format: "DD.HH:MM:SS" or similar)
      const parseDurationDays = (durationStr: string): number => {
        // Try to parse the duration string
        // Format might be like "45.00:00:00" (days.hours:minutes:seconds)
        const parts = durationStr.split('.')
        if (parts.length > 0) {
          const days = parseInt(parts[0], 10)
          if (!isNaN(days)) {
            return days
          }
        }
        // Fallback: try to extract days from other formats
        const dayMatch = durationStr.match(/(\d+)/)
        if (dayMatch) {
          return parseInt(dayMatch[1], 10)
        }
        return 0
      }

      const rentalDuration = parseDurationDays(apiContainer.duration)
      // Calculate delivery date as today minus rental duration
      const deliveryDate = new Date()
      deliveryDate.setDate(deliveryDate.getDate() - rentalDuration)

      const lat =
        typeof apiContainer.location.latitude === 'string'
          ? parseFloat(apiContainer.location.latitude)
          : apiContainer.location.latitude
      const lng =
        typeof apiContainer.location.longitude === 'string'
          ? parseFloat(apiContainer.location.longitude)
          : apiContainer.location.longitude

      return {
        id: String(apiContainer.id),
        containerNumber: apiContainer.containerNumber,
        containerType: `${apiContainer.size} ${apiContainer.type}`,
        customerName: apiContainer.customer.name,
        customerEmail: apiContainer.customer.email,
        customerPhone: apiContainer.customer.phoneNumber || '',
        location: {
          lat,
          lng,
          address: '', // Not provided by API
          city: apiContainer.address.city,
          province: apiContainer.address.province,
        },
        deliveryDate: deliveryDate.toISOString(),
        rentalDuration,
        paymentStatus: 'paid' as const, // Default since API doesn't provide this
        lastPaymentDate: deliveryDate.toISOString(),
        nextPaymentDate: new Date(
          deliveryDate.getTime() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        monthlyRate: 0, // Not provided by API
        totalOwed: 0, // Not provided by API
        notes: '', // Not provided by API
      }
    })
  }, [containersData])

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
              Container Locations
            </h3>
            <p className="text-sm text-gray-600">
              Track all Valley Containers across South Africa
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Paid</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Overdue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Map Container */}
      <Card>
        <ContainerMap
          containers={containers}
          onContainerSelect={onViewContainer}
        />
      </Card>

      {/* Container List */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          All Containers
        </h3>

        {/* Mobile View - Cards */}
        <div className="block lg:hidden space-y-4">
          {containersLoading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Loading containers...</p>
            </div>
          ) : containers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-600">No containers found</p>
            </div>
          ) : (
            containers.map((container) => (
              <ContainerCard
                key={container.id}
                container={container}
                onView={onViewContainer}
              />
            ))
          )}
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
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {containersLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Loading containers...</p>
                  </td>
                </tr>
              ) : containers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <p className="text-sm text-gray-600">No containers found</p>
                  </td>
                </tr>
              ) : (
                containers.map((container) => (
                  <tr key={container.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {container.containerNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {container.containerType}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {container.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          <a
                            href={`mailto:${container.customerEmail}`}
                            className="hover:text-primary-700 transition-colors duration-200"
                            title={`Click to email ${container.customerEmail}`}
                          >
                            {container.customerEmail}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {container.location.city}
                        </div>
                        <div className="text-sm text-gray-500">
                          {container.location.province}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDuration(
                        calculateDaysSinceDelivery(container.deliveryDate)
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        status={container.paymentStatus}
                        statusType="payment"
                      />
                      {container.totalOwed > 0 && (
                        <div className="text-xs text-red-600 mt-1">
                          R{container.totalOwed.toLocaleString()} owed
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => onViewContainer(container)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}

export default ContainersTab
