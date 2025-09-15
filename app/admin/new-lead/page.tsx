'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { 
  ArrowLeft,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  DollarSign,
  CheckCircle,
  Send,
  Save,
  Package,
  Truck
} from 'lucide-react'

interface CustomerDetails {
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  country: string
  leadSource: string
  notes: string
  priority: 'low' | 'medium' | 'high'
  assignedTo: string
  containerType: 'rental' | 'purchase' | ''
  selectedContainer: string
  rentalDuration: string
  quantity: number
  customPrice: number
  deliveryType: 'delivery' | 'collection' | ''
  deliveryAddress: string
  deliveryCity: string
  deliveryProvince: string
  deliveryPostalCode: string
  deliveryNotes: string
}

const NewLeadPage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa',
    leadSource: '',
    notes: '',
    priority: 'medium',
    assignedTo: '',
    containerType: '',
    selectedContainer: '',
    rentalDuration: '',
    quantity: 1,
    customPrice: 0,
    deliveryType: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryProvince: '',
    deliveryPostalCode: '',
    deliveryNotes: ''
  })

  // Container options based on type
  const containerOptions = {
    rental: [
      { id: 'storage-20ft', name: '20ft Storage Container', price: 'R150/day', basePrice: 150 },
      { id: 'storage-40ft', name: '40ft Storage Container', price: 'R200/day', basePrice: 200 },
      { id: 'office-20ft', name: '20ft Office Container', price: 'R450/day', basePrice: 450 },
      { id: 'office-40ft', name: '40ft Office Container', price: 'R600/day', basePrice: 600 },
      { id: 'vip-office', name: 'VIP Container Office', price: 'R750/day', basePrice: 750 },
      { id: 'refrigeration', name: 'Refrigeration Container', price: 'R850/day', basePrice: 850 },
      { id: 'freezer', name: 'Freezer Container', price: 'R850/day', basePrice: 850 },
      { id: 'split-container', name: 'Split Container', price: 'R300/day', basePrice: 300 },
      { id: 'elite-mobile', name: 'Elite Mobile Container', price: 'R600/day', basePrice: 600 },
      { id: 'ablution', name: 'Ablution Container', price: 'R400/day', basePrice: 400 },
      { id: 'pavilion', name: 'Pavilion Container', price: 'R500/day', basePrice: 500 },
      { id: 'sleeper', name: 'Sleeper Container', price: 'R350/day', basePrice: 350 }
    ],
    purchase: [
      { id: 'storage-20ft-buy', name: '20ft Storage Container', price: 'R45,000', basePrice: 45000 },
      { id: 'storage-40ft-buy', name: '40ft Storage Container', price: 'R65,000', basePrice: 65000 },
      { id: 'office-20ft-buy', name: '20ft Office Container', price: 'R85,000', basePrice: 85000 },
      { id: 'office-40ft-buy', name: '40ft Office Container', price: 'R120,000', basePrice: 120000 },
      { id: 'vip-office-buy', name: 'VIP Container Office', price: 'R150,000', basePrice: 150000 },
      { id: 'refrigeration-buy', name: 'Refrigeration Container', price: 'R180,000', basePrice: 180000 },
      { id: 'freezer-buy', name: 'Freezer Container', price: 'R180,000', basePrice: 180000 },
      { id: 'split-container-buy', name: 'Split Container', price: 'R75,000', basePrice: 75000 },
      { id: 'elite-mobile-buy', name: 'Elite Mobile Container', price: 'R95,000', basePrice: 95000 },
      { id: 'ablution-buy', name: 'Ablution Container', price: 'R80,000', basePrice: 80000 },
      { id: 'pavilion-buy', name: 'Pavilion Container', price: 'R90,000', basePrice: 90000 },
      { id: 'sleeper-buy', name: 'Sleeper Container', price: 'R70,000', basePrice: 70000 }
    ]
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value,
        // Reset container selection when type changes
        ...(name === 'containerType' && { selectedContainer: '', customPrice: 0 })
      }

      // Auto-set price when container is selected
      if (name === 'selectedContainer' && value && prev.containerType) {
        const selectedContainer = containerOptions[prev.containerType].find(c => c.id === value)
        if (selectedContainer) {
          newData.customPrice = selectedContainer.basePrice
        }
      }

      // Auto-fill delivery address when delivery is selected
      if (name === 'deliveryType' && value === 'delivery') {
        newData.deliveryAddress = prev.address
        newData.deliveryCity = prev.city
        newData.deliveryProvince = prev.province
        newData.deliveryPostalCode = prev.postalCode
      }

      return newData
    })
  }

  const handleSubmit = async (action: 'paid' | 'invoice') => {
    setIsSubmitting(true)
    
    try {
      // Here you would typically send the data to your API
      console.log('Lead data:', { ...formData, action })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message and redirect
      alert(`Lead ${action === 'paid' ? 'marked as paid in house' : 'invoice sent'} successfully!`)
      router.push('/admin')
    } catch (error) {
      console.error('Error saving lead:', error)
      alert('Error saving lead. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.containerType && formData.selectedContainer && formData.customPrice > 0 && formData.deliveryType && (formData.deliveryType === 'collection' || (formData.deliveryAddress && formData.deliveryCity && formData.deliveryProvince && formData.deliveryPostalCode))

  return (
    <ProtectedRoute allowedTypes={['admin']}>
      <div className="min-h-screen bg-secondary-200">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">New Lead</h1>
                  <p className="text-sm text-gray-600">Add customer details and create lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <form className="p-6 space-y-8">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary-600" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Company Information Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-primary-600" />
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary-600" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                  Address Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Province
                      </label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select Province</option>
                        <option value="Western Cape">Western Cape</option>
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="Northern Cape">Northern Cape</option>
                        <option value="Free State">Free State</option>
                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        <option value="North West">North West</option>
                        <option value="Gauteng">Gauteng</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="Limpopo">Limpopo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Details Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary-600" />
                  Lead Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lead Source
                    </label>
                    <select
                      name="leadSource"
                      value={formData.leadSource}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Source</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Email">Email</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Trade Show">Trade Show</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assigned To
                    </label>
                    <input
                      type="text"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleInputChange}
                      placeholder="Sales representative name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Additional notes about the lead..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Container Selection Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary-600" />
                  Container Selection
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="containerType"
                          value="rental"
                          checked={formData.containerType === 'rental'}
                          onChange={handleInputChange}
                          className="mr-2 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Rental</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="containerType"
                          value="purchase"
                          checked={formData.containerType === 'purchase'}
                          onChange={handleInputChange}
                          className="mr-2 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Purchase</span>
                      </label>
                    </div>
                  </div>

                  {formData.containerType && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Container *
                        </label>
                        <select
                          name="selectedContainer"
                          value={formData.selectedContainer}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          required
                        >
                          <option value="">Choose a container...</option>
                          {containerOptions[formData.containerType].map((container) => (
                            <option key={container.id} value={container.id}>
                              {container.name} - {container.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        {formData.containerType === 'rental' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Rental Duration
                            </label>
                            <select
                              name="rentalDuration"
                              value={formData.rentalDuration}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                              <option value="">Select duration</option>
                              <option value="1-week">1 Week</option>
                              <option value="1-month">1 Month</option>
                              <option value="3-months">3 Months</option>
                              <option value="6-months">6 Months</option>
                              <option value="1-year">1 Year</option>
                              <option value="long-term">Long Term</option>
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price per {formData.containerType === 'rental' ? 'day' : 'unit'} (R) *
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            name="customPrice"
                            value={formData.customPrice}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter price"
                          />
                          <span className="text-sm text-gray-500 whitespace-nowrap">
                            × {formData.quantity} = R{(formData.customPrice * formData.quantity).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Base price: R{formData.selectedContainer ? containerOptions[formData.containerType].find(c => c.id === formData.selectedContainer)?.basePrice.toLocaleString() : '0'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Delivery/Collection Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-primary-600" />
                  Delivery/Collection
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Type *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="delivery"
                          checked={formData.deliveryType === 'delivery'}
                          onChange={handleInputChange}
                          className="mr-2 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Delivery</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="collection"
                          checked={formData.deliveryType === 'collection'}
                          onChange={handleInputChange}
                          className="mr-2 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Collection</span>
                      </label>
                    </div>
                  </div>

                  {formData.deliveryType === 'delivery' && (
                    <div className="space-y-4">
                      {formData.address && formData.deliveryAddress === formData.address && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            <span className="text-sm text-green-800">
                              Delivery address auto-filled from customer address
                            </span>
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Address *
                        </label>
                        <input
                          type="text"
                          name="deliveryAddress"
                          value={formData.deliveryAddress}
                          onChange={handleInputChange}
                          placeholder="Enter delivery address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            name="deliveryCity"
                            value={formData.deliveryCity}
                            onChange={handleInputChange}
                            placeholder="City"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Province *
                          </label>
                          <select
                            name="deliveryProvince"
                            value={formData.deliveryProvince}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          >
                            <option value="">Select Province</option>
                            <option value="Western Cape">Western Cape</option>
                            <option value="Eastern Cape">Eastern Cape</option>
                            <option value="Northern Cape">Northern Cape</option>
                            <option value="Free State">Free State</option>
                            <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                            <option value="North West">North West</option>
                            <option value="Gauteng">Gauteng</option>
                            <option value="Mpumalanga">Mpumalanga</option>
                            <option value="Limpopo">Limpopo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            name="deliveryPostalCode"
                            value={formData.deliveryPostalCode}
                            onChange={handleInputChange}
                            placeholder="Postal Code"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Notes
                        </label>
                        <textarea
                          name="deliveryNotes"
                          value={formData.deliveryNotes}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Special delivery instructions, access requirements, contact person, etc."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  )}

                  {formData.deliveryType === 'collection' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">
                            Collection Information
                          </h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p>Customer will collect from our facility.</p>
                            <p className="mt-1">
                              <strong>Collection Address:</strong><br />
                              Valley Containers<br />
                              [Your facility address]<br />
                              [City, Province, Postal Code]
                            </p>
                            <p className="mt-2">
                              <strong>Collection Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit('paid')}
                    disabled={!isFormValid || isSubmitting}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Paid In House
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit('invoice')}
                    disabled={!isFormValid || isSubmitting}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Send Invoice
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default NewLeadPage
