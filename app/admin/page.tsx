'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Truck, 
  Calendar, 
  BarChart3, 
  FileText, 
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost'
  source: string
  assignedTo: string
  lastContact: string
  nextFollowUp: string
  value: number
  notes: string
}

interface Order {
  id: string
  customerName: string
  containerType: string
  quantity: number
  status: 'pending' | 'confirmed' | 'in-transit' | 'delivered' | 'returned'
  deliveryDate: string
  total: number
  assignedDriver: string
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock data - in real app this would come from API
  const leads: Lead[] = [
    {
      id: 'L001',
      name: 'John Smith',
      company: 'Construction Plus Inc.',
      email: 'john.smith@constructionplus.co.za',
      phone: '(555) 123-4567',
      status: 'qualified',
      source: 'Website',
      assignedTo: 'Sarah Johnson',
      lastContact: '2024-01-14T10:30:00Z',
      nextFollowUp: '2024-01-16T14:00:00Z',
      value: 2500,
      notes: 'Interested in 40ft containers for construction project. Budget approved.'
    },
    {
      id: 'L002',
      name: 'Maria Garcia',
      company: 'Global Logistics Solutions',
      email: 'maria.garcia@globallogistics.co.za',
      phone: '(555) 234-5678',
      status: 'new',
      source: 'Referral',
      assignedTo: 'Mike Chen',
      lastContact: '2024-01-13T15:45:00Z',
      nextFollowUp: '2024-01-15T09:00:00Z',
      value: 5000,
      notes: 'Looking for refrigerated containers for food transport. High priority.'
    },
    {
      id: 'L003',
      name: 'David Wilson',
      company: 'Event Productions LLC',
      email: 'david.wilson@eventproductions.co.za',
      phone: '(555) 345-6789',
      status: 'proposal',
      source: 'Trade Show',
      assignedTo: 'Sarah Johnson',
      lastContact: '2024-01-12T11:20:00Z',
      nextFollowUp: '2024-01-17T16:00:00Z',
      value: 3000,
      notes: 'Need containers for upcoming music festival. Proposal sent, awaiting response.'
    }
  ]

  const orders: Order[] = [
    {
      id: 'O001',
      customerName: 'Construction Plus Inc.',
      containerType: '40ft Standard',
      quantity: 2,
      status: 'in-transit',
      deliveryDate: '2024-01-15T14:00:00Z',
      total: 500,
      assignedDriver: 'Mike Johnson'
    },
    {
      id: 'O002',
      customerName: 'Global Logistics Solutions',
      containerType: '20ft Refrigerated',
      quantity: 1,
      status: 'confirmed',
      deliveryDate: '2024-01-18T10:00:00Z',
      total: 200,
      assignedDriver: 'Tom Davis'
    },
    {
      id: 'O003',
      customerName: 'Event Productions LLC',
      containerType: '20ft Standard',
      quantity: 3,
      status: 'pending',
      deliveryDate: '2024-01-20T12:00:00Z',
      total: 450,
      assignedDriver: 'Unassigned'
    }
  ]

  const stats = [
    { label: 'Total Leads', value: '156', change: '+12%', changeType: 'positive' },
    { label: 'Active Orders', value: '89', change: '+5%', changeType: 'positive' },
            { label: 'Revenue This Month', value: 'R45,230', change: '+18%', changeType: 'positive' },
    { label: 'Conversion Rate', value: '23%', change: '+2%', changeType: 'positive' }
  ]

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'proposal': return 'bg-purple-100 text-purple-800'
      case 'closed': return 'bg-green-100 text-green-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'in-transit': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'returned': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'leads', label: 'Lead Management', icon: Users },
    { id: 'orders', label: 'Orders', icon: Truck },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-secondary-200">
      {/* Admin Header - Fixed positioning to avoid conflicts with main nav */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Admin Panel</h1>
              <p className="text-sm text-gray-600 truncate">Valley Containers Staff Portal</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button className="btn-primary text-sm">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">New Lead</span>
                <span className="sm:hidden">New</span>
              </button>
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-primary-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs - Responsive with horizontal scroll on small screens */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-w-fit ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h3>
                <div className="space-y-4">
                                     {leads.slice(0, 3).map((lead) => (
                     <div key={lead.id} className="flex items-center justify-between p-3 bg-secondary-200 rounded-lg">
                       <div>
                         <p className="font-medium text-secondary-900">{lead.name}</p>
                         <p className="text-sm text-secondary-600">{lead.company}</p>
                       </div>
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                         {lead.status}
                       </span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deliveries</h3>
                <div className="space-y-4">
                                     {orders.slice(0, 3).map((order) => (
                     <div key={order.id} className="flex items-center justify-between p-3 bg-secondary-200 rounded-lg">
                       <div>
                         <p className="font-medium text-secondary-900">{order.customerName}</p>
                         <p className="text-sm text-secondary-600">{order.containerType}</p>
                       </div>
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                         {order.status}
                       </span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Filters and Search */}
            <div className="card">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search leads by name, company, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field max-w-xs"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="closed">Closed</option>
                  <option value="lost">Lost</option>
                </select>
                <button className="btn-secondary">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
                <button className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="card">
              <div className="overflow-x-auto">
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
                            <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.company}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {lead.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R{lead.value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(lead.nextFollowUp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                                     <thead className="bg-secondary-200">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Order
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Customer
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Status
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Delivery Date
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Driver
                       </th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                         Actions
                       </th>
                       </tr>
                     </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.containerType}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.deliveryDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.assignedDriver}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Calendar</h3>
              <div className="bg-secondary-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive calendar view</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Schedule management and delivery coordination
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="bg-secondary-200 rounded-lg h-64 flex items-center justify-center">
                   <div className="text-center">
                     <BarChart3 className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                     <p className="text-secondary-600">Lead conversion metrics</p>
                   </div>
                 </div>
                 <div className="bg-secondary-200 rounded-lg h-64 flex items-center justify-center">
                   <div className="text-center">
                     <Truck className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                     <p className="text-secondary-600">Delivery performance</p>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
