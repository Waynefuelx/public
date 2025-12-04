import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import Card from '@/components/atoms/Card'
import SearchFilter from '@/components/molecules/SearchFilter'
import Button from '@/components/atoms/Button'
import { Filter, Download, Eye, Edit, Shield } from 'lucide-react'
import { useAdminUsers, useAdminUsersByRole } from '@/lib/api/hooks'
import { formatDate } from '@/lib/utils/admin-helpers'
import type { UserListItemDto } from '@/lib/api/services'

interface UsersTabProps {
  onView?: (user: UserListItemDto) => void
  onEdit?: (user: UserListItemDto) => void
  roleFilter?: string
}

const UsersTab = ({ onView, onEdit, roleFilter }: UsersTabProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  const usersQuery = roleFilter
    ? useAdminUsersByRole({ role: roleFilter, search: searchTerm, page: currentPage, pageSize })
    : useAdminUsers({ search: searchTerm, page: currentPage, pageSize })

  const { data: usersData, isLoading } = usersQuery

  const users = usersData?.items || []
  const totalPages = usersData?.totalPages || 0
  const totalCount = usersData?.totalCount || 0

  // Status options for filter (not used for users, but keeping for consistency)
  const statusOptions = [
    { value: 'all', label: 'All Users' },
  ]

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
              statusFilter="all"
              onStatusFilterChange={() => {}}
              statusOptions={statusOptions}
              placeholder="Search users by name, email, or company..."
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

      {/* Results count */}
      {!isLoading && (
        <div className="text-sm text-gray-600">
          Showing {users.length} of {totalCount} users
        </div>
      )}

      {/* Mobile View - Cards */}
      <div className="block lg:hidden space-y-4">
        {isLoading ? (
          <Card>
            <div className="p-4 text-center text-gray-500">Loading users...</div>
          </Card>
        ) : users.length === 0 ? (
          <Card>
            <div className="p-4 text-center text-gray-500">No users found</div>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.userName || 'No username'}
                    </h3>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {user.email && (
                      <div>
                        <span className="font-medium">Email:</span> {user.email}
                      </div>
                    )}
                    {user.phoneNumber && (
                      <div>
                        <span className="font-medium">Phone:</span> {user.phoneNumber}
                      </div>
                    )}
                    {user.company && (
                      <div>
                        <span className="font-medium">Company:</span> {user.company}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Created:</span>{' '}
                      {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {onView && (
                    <button
                      onClick={() => onView(user)}
                      className="text-primary-600 hover:text-primary-900 p-2"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(user)}
                      className="text-primary-600 hover:text-primary-900 p-2"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Desktop View - Table */}
      <Card>
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No users found</div>
        ) : (
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-secondary-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.userName || 'No username'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.phoneNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {onView && (
                          <button
                            onClick={() => onView(user)}
                            className="text-primary-600 hover:text-primary-900"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(user)}
                            className="text-primary-600 hover:text-primary-900"
                            title="Edit user"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  )
}

export default UsersTab

