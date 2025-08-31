'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { 
  Truck, 
  Calendar, 
  MapPin, 
  CreditCard, 
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface BookingFormData {
  serviceType: 'rental' | 'purchase' | 'quote'
  containerType: string
  quantity: number
  deliveryDate: string
  deliveryAddress: string
  city: string
  province: string
  postalCode: string
  contactName: string
  email: string
  phone: string
  company: string
  specialRequirements: string
  paymentMethod: 'credit' | 'invoice' | 'quote'
}

interface ContainerType {
  id: string
  name: string
  description: string
  dimensions: string
  capacity: string
  price: number
  image: string
}

const BookingForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedContainer, setSelectedContainer] = useState<ContainerType | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>()
  const watchServiceType = watch('serviceType')

  const containerTypes: ContainerType[] = [
    {
      id: '20ft-standard',
      name: '20ft Standard Container',
      description: 'Standard shipping container, perfect for general cargo',
      dimensions: '20\' × 8\' × 8.5\'',
      capacity: '1,170 cu ft',
      price: 150,
      image: '/api/placeholder/300/200'
    },
    {
      id: '40ft-standard',
      name: '40ft Standard Container',
      description: 'Large capacity container for bulk shipments',
      dimensions: '40\' × 8\' × 8.5\'',
      capacity: '2,390 cu ft',
      price: 250,
      image: '/api/placeholder/300/200'
    },
    {
      id: '40ft-high-cube',
      name: '40ft High Cube',
      description: 'Extra height container for oversized items',
      dimensions: '40\' × 8\' × 9.5\'',
      capacity: '2,694 cu ft',
      price: 275,
      image: '/api/placeholder/300/200'
    },
    {
      id: '20ft-reefer',
      name: '20ft Refrigerated',
      description: 'Temperature controlled container for perishables',
      dimensions: '20\' × 8\' × 8.5\'',
      capacity: '1,170 cu ft',
      price: 200,
      image: '/api/placeholder/300/200'
    }
  ]

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Booking submitted successfully! We\'ll contact you soon.')
      onSuccess()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center flex-shrink-0">
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
            step <= currentStep 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              step
            )}
          </div>
          {step < 4 && (
            <div className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 ${
              step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { value: 'rental', label: 'Container Rental', icon: Truck, description: 'Rent containers for short or long term' },
            { value: 'purchase', label: 'Container Purchase', icon: CreditCard, description: 'Buy containers outright' },
            { value: 'quote', label: 'Request Quote', icon: FileText, description: 'Get a custom quote for your needs' }
          ].map((option) => (
            <label key={option.value} className="relative">
              <input
                type="radio"
                value={option.value}
                {...register('serviceType', { required: 'Please select a service type' })}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                watchServiceType === option.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center space-x-3">
                  <option.icon className={`w-6 h-6 ${
                    watchServiceType === option.value ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.serviceType && (
          <p className="text-error-600 text-sm mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.serviceType.message}
          </p>
        )}
      </div>

      {watchServiceType && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Container Selection</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {containerTypes.map((container) => (
              <div
                key={container.id}
                onClick={() => setSelectedContainer(container)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedContainer?.id === container.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{container.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{container.description}</p>
                    <div className="text-sm text-gray-600">
                      <div>Dimensions: {container.dimensions}</div>
                      <div>Capacity: {container.capacity}</div>
                      <div className="font-medium text-primary-600">
                        R{container.price}/month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedContainer && (
        <div>
          <label className="form-label">Quantity</label>
          <input
            type="number"
            min="1"
            {...register('quantity', { 
              required: 'Quantity is required',
              min: { value: 1, message: 'Minimum quantity is 1' }
            })}
            className="input-field"
            placeholder="Enter quantity"
          />
          {errors.quantity && (
            <p className="text-error-600 text-sm mt-2">{errors.quantity.message}</p>
          )}
        </div>
      )}
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Delivery Date</label>
            <input
              type="date"
              {...register('deliveryDate', { required: 'Delivery date is required' })}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.deliveryDate && (
              <p className="text-error-600 text-sm mt-2">{errors.deliveryDate.message}</p>
            )}
          </div>
          
          <div>
            <label className="form-label">Company Name</label>
            <input
              type="text"
              {...register('company')}
              className="input-field"
              placeholder="Enter company name"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="form-label">Delivery Address</label>
          <input
            type="text"
            {...register('deliveryAddress', { required: 'Delivery address is required' })}
            className="input-field"
            placeholder="Street address"
          />
          {errors.deliveryAddress && (
            <p className="text-error-600 text-sm mt-2">{errors.deliveryAddress.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="form-label">City</label>
            <input
              type="text"
              {...register('city', { required: 'City is required' })}
              className="input-field"
              placeholder="City"
            />
            {errors.city && (
              <p className="text-error-600 text-sm mt-2">{errors.city.message}</p>
            )}
          </div>
          
          <div>
            <label className="form-label">Province</label>
            <input
              type="text"
              {...register('province', { required: 'Province is required' })}
              className="input-field"
              placeholder="Province"
            />
            {errors.province && (
              <p className="text-error-600 text-sm mt-2">{errors.province.message}</p>
            )}
          </div>
          
          <div>
            <label className="form-label">Postal Code</label>
            <input
              type="text"
              {...register('postalCode', { required: 'Postal code is required' })}
              className="input-field"
              placeholder="Postal code"
            />
            {errors.postalCode && (
              <p className="text-error-600 text-sm mt-2">{errors.postalCode.message}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Contact Name</label>
            <input
              type="text"
              {...register('contactName', { required: 'Contact name is required' })}
              className="input-field"
              placeholder="Full name"
            />
            {errors.contactName && (
              <p className="text-error-600 text-sm mt-2">{errors.contactName.message}</p>
            )}
          </div>
          
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="input-field"
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-error-600 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="form-label">Phone Number</label>
                      <input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="input-field"
              placeholder="+27 82 123 4567"
            />
          {errors.phone && (
            <p className="text-error-600 text-sm mt-2">{errors.phone.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="form-label">Special Requirements</label>
          <textarea
            {...register('specialRequirements')}
            className="input-field"
            rows={3}
            placeholder="Any special requirements or notes..."
          />
        </div>
      </div>
    </motion.div>
  )

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment & Review</h3>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Service:</span>
              <span className="font-medium capitalize">{watchServiceType}</span>
            </div>
            {selectedContainer && (
              <>
                <div className="flex justify-between">
                  <span>Container:</span>
                  <span className="font-medium">{selectedContainer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{watch('quantity') || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per unit:</span>
                                          <span className="font-medium">R{selectedContainer.price}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                                          <span>R{(selectedContainer.price * (watch('quantity') || 0)).toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="form-label">Payment Method</label>
          <div className="space-y-3">
            {[
              { value: 'credit', label: 'Credit Card', icon: CreditCard },
              { value: 'invoice', label: 'Invoice (Net 30)', icon: FileText },
              { value: 'quote', label: 'Quote Only', icon: FileText }
            ].map((option) => (
              <label key={option.value} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option.value}
                  {...register('paymentMethod', { required: 'Please select a payment method' })}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <option.icon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.paymentMethod && (
            <p className="text-error-600 text-sm mt-2">{errors.paymentMethod.message}</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">What happens next?</p>
              <p className="mt-1">
                After submitting your booking, our team will review your request and contact you within 24 hours 
                to confirm details and arrange delivery. You'll receive email updates throughout the process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      default: return renderStep1()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto">
      {renderStepIndicator()}
      
      {renderCurrentStep()}

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`btn-secondary w-full sm:w-auto ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary w-full sm:w-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full sm:w-auto"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default BookingForm
