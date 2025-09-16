'use client'

import { useState } from 'react'
import { 
  X, 
  Send, 
  Loader2, 
  Wrench, 
  Building2, 
  Package, 
  Users, 
  Coffee, 
  GraduationCap,
  Truck,
  Sun,
  Droplets
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ConversionQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  conversionType?: string
}

const ConversionQuoteModal = ({ isOpen, onClose, conversionType }: ConversionQuoteModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    conversionType: conversionType || 'Office Conversion',
    containerSize: '6m Standard',
    description: '',
    budget: 'Under R50,000',
    timeline: 'ASAP',
    location: '',
    specialRequirements: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const conversionTypes = [
    { value: 'Office Conversion', label: 'Office Conversion', icon: Building2 },
    { value: 'Accommodation', label: 'Accommodation', icon: Users },
    { value: 'Café/Restaurant', label: 'Café/Restaurant', icon: Coffee },
    { value: 'Classroom', label: 'Classroom', icon: GraduationCap },
    { value: 'Workshop', label: 'Workshop', icon: Wrench },
    { value: 'Storage', label: 'Storage', icon: Package },
    { value: 'Mobile Unit', label: 'Mobile Unit', icon: Truck },
    { value: 'Solar Station', label: 'Solar Station', icon: Sun },
    { value: 'Water Treatment', label: 'Water Treatment', icon: Droplets }
  ]

  const containerSizes = [
    '6m Standard',
    '12m Standard', 
    '6m High Cube',
    '12m High Cube',
    'Custom Size'
  ]

  const budgetRanges = [
    'Under R50,000',
    'R50,000 - R100,000',
    'R100,000 - R200,000',
    'R200,000 - R500,000',
    'Over R500,000'
  ]

  const timelines = [
    'ASAP',
    'Within 1 month',
    'Within 3 months',
    'Within 6 months',
    'Planning ahead'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Submit to API
      const response = await fetch('/api/conversion-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit conversion quote request')
      }
      
      const result = await response.json()
      console.log('Conversion quote submitted:', result)
      
      toast.success('Conversion quote request submitted successfully! Our team will contact you within 24 hours.')
      onClose()
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        conversionType: 'Office Conversion',
        containerSize: '6m Standard',
        description: '',
        budget: 'Under R50,000',
        timeline: 'ASAP',
        location: '',
        specialRequirements: ''
      })
    } catch (error) {
      console.error('Error submitting conversion quote:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit conversion quote request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Request Conversion Quote</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="+27 82 123 4567"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Your company name"
                />
              </div>
            </div>

            {/* Conversion Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="conversionType" className="block text-sm font-medium text-gray-700 mb-2">
                  Conversion Type *
                </label>
                <select
                  id="conversionType"
                  name="conversionType"
                  value={formData.conversionType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                >
                  {conversionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="containerSize" className="block text-sm font-medium text-gray-700 mb-2">
                  Container Size *
                </label>
                <select
                  id="containerSize"
                  name="containerSize"
                  value={formData.containerSize}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                >
                  {containerSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="Describe your conversion project in detail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                >
                  {timelines.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="City, Province"
                />
              </div>
            </div>

            <div>
              <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements
              </label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                placeholder="Any special requirements or specifications..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Request Quote
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConversionQuoteModal
