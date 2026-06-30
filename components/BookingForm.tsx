'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useContainerTypes, useCreateOrder } from '@/lib/api/hooks'
import toast from 'react-hot-toast'
import StepIndicator from '@/components/molecules/StepIndicator'
import ServiceTypeStep from '@/components/organisms/form-steps/ServiceTypeStep'
import DeliveryDetailsStep from '@/components/organisms/form-steps/DeliveryDetailsStep'
import ContactInfoStep from '@/components/organisms/form-steps/ContactInfoStep'
import PaymentReviewStep from '@/components/organisms/form-steps/PaymentReviewStep'
import Button from '@/components/atoms/Button'

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
  priceUnit?: string
  image: string
  category?: string
}

const BookingForm = ({ 
  onSuccess, 
  selectedContainer: initialSelectedContainer 
}: { 
  onSuccess: () => void
  selectedContainer?: ContainerType | null
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedContainer, setSelectedContainer] = useState<ContainerType | null>(initialSelectedContainer || null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>()
  const watchServiceType = watch('serviceType')
  const createOrderMutation = useCreateOrder()
  const isSubmitting = createOrderMutation.isPending
  
  // Pre-fill form when selectedContainer changes
  useEffect(() => {
    if (selectedContainer) {
      setValue('containerType', selectedContainer.id)
      setValue('serviceType', 'rental')
    }
  }, [selectedContainer, setValue])

  // Fetch container types from API
  const { data: containerTypesData, isLoading: containerTypesLoading } = useContainerTypes()
  const containerTypesList = containerTypesData?.items ?? []
  
  // Transform API data to match component interface, with fallback to empty array
  const containerTypes: ContainerType[] = containerTypesList.length > 0
    ? containerTypesList.map((ct: any) => ({
        id: ct.id || ct.name?.toLowerCase().replace(/\s+/g, '-'),
        name: ct.name,
        description: ct.description,
        dimensions: ct.dimensions,
        capacity: ct.capacity,
        price: ct.price,
        priceUnit: ct.priceUnit || 'month',
        image: ct.image,
        category: ct.category
      }))
    : []

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Prepare order data for API
      const orderData = {
        orderType: (watchServiceType === 'purchase' ? 'purchase' : 'rental') as 'purchase' | 'rental',
        customerName: data.contactName || '',
        customerEmail: data.email || '',
        customerPhone: data.phone || '',
        company: data.company || '',
        containerType: data.containerType || '',
        containerId: selectedContainer?.id || 'unknown',
        quantity: data.quantity || 1,
        deliveryOption: 'delivery' as 'delivery' | 'collection', // Rental is always delivery
        deliveryDate: data.deliveryDate || '',
        deliveryAddress: data.deliveryAddress || '',
        city: data.city || '',
        province: data.province || '',
        postalCode: data.postalCode || '',
        total: selectedContainer ? (selectedContainer.price || 0) * (data.quantity || 1) : 0,
        specialRequirements: data.specialRequirements || '',
        paymentMethod: data.paymentMethod || ''
      }
      
      // Validate required fields before sending
      const missingFields = []
      if (!orderData.customerName) missingFields.push('customerName')
      if (!orderData.customerEmail) missingFields.push('customerEmail')
      if (!orderData.customerPhone) missingFields.push('customerPhone')
      if (!orderData.containerType) missingFields.push('containerType')
      if (!orderData.containerId) missingFields.push('containerId')
      if (!orderData.quantity) missingFields.push('quantity')
      if (!orderData.deliveryOption) missingFields.push('deliveryOption')
      if (!orderData.deliveryDate) missingFields.push('deliveryDate')
      if (!orderData.total) missingFields.push('total')
      if (!orderData.paymentMethod) missingFields.push('paymentMethod')
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
      }
      
      // Submit to API using React Query mutation
      await createOrderMutation.mutateAsync(orderData)
      
      toast.success('Order submitted successfully!')
      onSuccess()
    } catch (error: any) {
      console.error('Error submitting order:', error)
      toast.error(error?.message || 'Failed to submit order. Please try again.')
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))
  
  const quantity = watch('quantity') || 1
  const total = selectedContainer ? selectedContainer.price * quantity : 0

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceTypeStep
            serviceType={watchServiceType || ''}
            selectedContainer={selectedContainer}
            containerTypes={containerTypes}
            quantity={quantity}
            onServiceTypeChange={(value) => setValue('serviceType', value as any)}
            onContainerSelect={setSelectedContainer}
            onContainerDeselect={() => setSelectedContainer(null)}
            onQuantityChange={(value) => setValue('quantity', value)}
            serviceTypeRegister={register('serviceType', { required: 'Please select a service type' })}
            quantityRegister={register('quantity', {
              required: 'Quantity is required',
              min: { value: 1, message: 'Minimum quantity is 1' },
            })}
            serviceTypeError={errors.serviceType}
            quantityError={errors.quantity}
          />
        )
      case 2:
        return (
          <DeliveryDetailsStep
            deliveryDateRegister={register('deliveryDate', { required: 'Delivery date is required' })}
            companyRegister={register('company')}
            deliveryAddressRegister={register('deliveryAddress', { required: 'Delivery address is required' })}
            cityRegister={register('city', { required: 'City is required' })}
            provinceRegister={register('province', { required: 'Province is required' })}
            postalCodeRegister={register('postalCode', { required: 'Postal code is required' })}
            deliveryDateError={errors.deliveryDate}
            deliveryAddressError={errors.deliveryAddress}
            cityError={errors.city}
            provinceError={errors.province}
            postalCodeError={errors.postalCode}
          />
        )
      case 3:
        return (
          <ContactInfoStep
            contactNameRegister={register('contactName', { required: 'Contact name is required' })}
            emailRegister={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            phoneRegister={register('phone', { required: 'Phone number is required' })}
            specialRequirementsRegister={register('specialRequirements')}
            contactNameError={errors.contactName}
            emailError={errors.email}
            phoneError={errors.phone}
          />
        )
      case 4:
        return (
          <PaymentReviewStep
            serviceType={watchServiceType || ''}
            selectedContainer={selectedContainer}
            quantity={quantity}
            total={total}
            paymentMethod={watch('paymentMethod') || ''}
            onPaymentMethodChange={(value) => setValue('paymentMethod', value as any)}
            onQuantityChange={(value) => setValue('quantity', value)}
            paymentMethodRegister={register('paymentMethod', { required: 'Please select a payment method' })}
            quantityRegister={register('quantity', {
              required: 'Quantity is required',
              min: { value: 1, message: 'Minimum quantity is 1' },
              max: { value: 100, message: 'Maximum quantity is 100' },
            })}
            paymentMethodError={errors.paymentMethod}
            quantityError={errors.quantity}
          />
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto">
      <StepIndicator currentStep={currentStep} totalSteps={4} />
      
      {renderCurrentStep()}

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
        <Button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          variant="outline"
          fullWidth
          className={currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Previous
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              variant="primary"
              fullWidth
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              fullWidth
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}

export default BookingForm
