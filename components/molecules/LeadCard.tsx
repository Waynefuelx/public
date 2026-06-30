import Card from '../atoms/Card'
import StatusBadge from './StatusBadge'
import Button from '../atoms/Button'
import { Eye, Edit, Trash2 } from 'lucide-react'
import type { LeadListItem } from '@/lib/api/services'
import {
  formatDate,
} from '@/lib/utils/admin-helpers'

interface LeadCardProps {
  lead: LeadListItem
  statusMap: Map<number, string>
  onView?: (lead: LeadListItem) => void
  onEdit?: (lead: LeadListItem) => void
  onDelete?: (lead: LeadListItem) => void
}

const LeadCard = ({
  lead,
  statusMap,
  onView,
  onEdit,
  onDelete,
}: LeadCardProps) => {
  return (
    <Card>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">{lead.name}</h4>
            <p className="text-sm text-gray-500">{lead.company}</p>
            <p className="text-sm text-gray-500">{lead.email}</p>
          </div>
          <StatusBadge
            status={lead.status}
            statusMap={statusMap}
            statusType="lead"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {lead.assignedTo && (
            <div>
              <p className="text-gray-600">Assigned To</p>
              <p className="font-medium text-gray-900">{lead.assignedTo}</p>
            </div>
          )}
          {lead.value !== undefined && (
            <div>
              <p className="text-gray-600">Value</p>
              <p className="font-medium text-gray-900">
                R{lead.value.toLocaleString()}
              </p>
            </div>
          )}
          {lead.nextFollowUpDate && (
            <div>
              <p className="text-gray-600">Next Follow-up</p>
              <p className="font-medium text-gray-900">
                {formatDate(lead.nextFollowUpDate)}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {onView && (
            <Button
              onClick={() => onView(lead)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          )}
          {onEdit && (
            <Button
              onClick={() => onEdit(lead)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={() => onDelete(lead)}
              variant="outline"
              size="sm"
              className="flex-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default LeadCard

