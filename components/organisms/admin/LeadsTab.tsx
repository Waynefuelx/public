import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import Card from '@/components/atoms/Card'
import LeadCard from '@/components/molecules/LeadCard'
import SearchFilter from '@/components/molecules/SearchFilter'
import StatusBadge from '@/components/molecules/StatusBadge'
import Button from '@/components/atoms/Button'
import { Filter, Download, Eye, Edit, Trash2 } from 'lucide-react'
import { useAdminLeads, useLeadStatusEnum } from '@/lib/api/hooks'
import {
  formatDate,
} from '@/lib/utils/admin-helpers'
import type { LeadListItem } from '@/lib/api/services'

interface LeadsTabProps {
  onView?: (lead: LeadListItem) => void
  onEdit?: (lead: LeadListItem) => void
  onDelete?: (lead: LeadListItem) => void
}

const LeadsTab = ({ onView, onEdit, onDelete }: LeadsTabProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data: leadsData } = useAdminLeads()
  const { data: leadStatusEnumData = [] } = useLeadStatusEnum()

  // Create status map from enum data
  const leadStatusMap = useMemo(() => {
    const map = new Map<number, string>()
    leadStatusEnumData.forEach((option) => {
      const key =
        typeof option.key === 'string' ? parseInt(option.key, 10) : option.key
      if (!isNaN(key)) {
        map.set(key, option.value)
      }
    })
    return map
  }, [leadStatusEnumData])


  const leads = leadsData?.items || []

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || lead.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [leads, searchTerm, statusFilter])

  // Status options for filter
  const statusOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Statuses' },
      ...Array.from(leadStatusMap.entries()).map(([key, value]) => ({
        value: value.toLowerCase(),
        label: value,
      })),
    ]
  }, [leadStatusMap])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              statusOptions={statusOptions}
              placeholder="Search leads by name, company, or email..."
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Mobile View - Cards */}
      <div className="block lg:hidden space-y-4">
        {filteredLeads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            statusMap={leadStatusMap}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop View - Table */}
      <Card>
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Next Follow-up
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {lead.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {lead.company}
                      </div>
                      <div className="text-sm text-gray-500">
                        {lead.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={lead.status}
                      statusMap={leadStatusMap}
                      statusType="lead"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.assignedTo || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.value ? `R${lead.value.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.nextFollowUpDate
                      ? formatDate(lead.nextFollowUpDate)
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {onView && (
                        <button
                          onClick={() => onView(lead)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(lead)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(lead)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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

export default LeadsTab
