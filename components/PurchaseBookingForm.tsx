'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import StepIndicator from '@/components/molecules/StepIndicator'
import PurchaseContainerStep from '@/components/organisms/form-steps/PurchaseContainerStep'
import PurchaseDeliveryStep from '@/components/organisms/form-steps/PurchaseDeliveryStep'
import ContactInfoStep from '@/components/organisms/form-steps/ContactInfoStep'
import PurchasePaymentStep from '@/components/organisms/form-steps/PurchasePaymentStep'
import Button from '@/components/atoms/Button'

interface PurchaseFormData {
  serviceType: 'purchase'
  containerType: string
  quantity: number
  deliveryOption: 'delivery' | 'collection'
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

const PurchaseBookingForm = ({ 
  onSuccess, 
  selectedContainer: initialSelectedContainer 
}: { 
  onSuccess: () => void
  selectedContainer?: ContainerType | null
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedContainer, setSelectedContainer] = useState<ContainerType | null>(initialSelectedContainer || null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PurchaseFormData>()
  const watchServiceType = watch('serviceType')
  const watchDeliveryOption = watch('deliveryOption')
  
  // Pre-fill form when selectedContainer changes
  useEffect(() => {
    if (selectedContainer) {
      setValue('containerType', selectedContainer.id)
      setValue('serviceType', 'purchase')
    }
  }, [selectedContainer, setValue])

  // Container types for purchase
  const containerTypes: ContainerType[] = [
    {
      id: 'new-container',
      name: 'New Container',
      description: 'Brand new container with full warranty',
      dimensions: '6m × 2.4m × 2.6m',
      capacity: '37.4 cu m',
      price: 25000,
      image: '/products/storage-6m.webp'
    },
    {
      id: 'used-container',
      name: 'Used Container',
      description: 'Quality pre-owned container at competitive price',
      dimensions: '6m × 2.4m × 2.6m',
      capacity: '37.4 cu m',
      price: 15000,
      image: '/products/office-uninsulated.png'
    },
    {
      id: 'modified-container',
      name: 'Modified Container',
      description: 'Custom-converted container for specific needs',
      dimensions: '6m × 2.4m × 2.6m',
      capacity: '37.4 cu m',
      price: 30000,
      image: '/products/office-insulated.png'
    }
  ]

  const onSubmit = async (data: PurchaseFormData) => {
    setIsSubmitting(true)
    
    try {
      // Prepare order data for API
      const orderData = {
        orderType: 'purchase',
        customerName: data.contactName || '',
        customerEmail: data.email || '',
        customerPhone: data.phone || '',
        company: data.company || '',
        containerType: data.containerType || '',
        containerId: selectedContainer?.id || 'unknown',
        quantity: data.quantity || 1,
        deliveryOption: data.deliveryOption || '',
        deliveryDate: data.deliveryDate || '',
        deliveryAddress: data.deliveryAddress || '',
        city: data.city || '',
        province: data.province || '',
        postalCode: data.postalCode || '',
        total: selectedContainer ? selectedContainer.price * (data.quantity || 1) : 0,
        specialRequirements: data.specialRequirements || '',
        paymentMethod: data.paymentMethod || ''
      }
      
      console.log('Submitting order data:', orderData)
      
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
        console.error('Missing required fields:', missingFields)
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
      }
      
      // Submit to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.error || 'Failed to submit order')
      }
      
      const result = await response.json()
      console.log('Purchase order submitted:', result)
      
      toast.success('Purchase order submitted successfully!')
      onSuccess()
    } catch (error) {
      console.error('Error submitting purchase:', error)
      toast.error('Failed to submit purchase order. Please try again.')
    } finally {
      setIsSubmitting(false)
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
          <PurchaseContainerStep
            selectedContainer={selectedContainer}
            containerTypes={containerTypes}
            quantity={quantity}
            deliveryOption={watchDeliveryOption || ''}
            onContainerSelect={setSelectedContainer}
            onContainerDeselect={() => setSelectedContainer(null)}
            onQuantityChange={(value) => setValue('quantity', value)}
            onDeliveryOptionChange={(value) => setValue('deliveryOption', value as any)}
            quantityRegister={register('quantity', {
              required: 'Quantity is required',
              min: { value: 1, message: 'Minimum quantity is 1' },
            })}
            deliveryOptionRegister={register('deliveryOption', { required: 'Please select a delivery option' })}
            quantityError={errors.quantity}
            deliveryOptionError={errors.deliveryOption}
          />
        )
      case 2:
        return (
          <PurchaseDeliveryStep
            deliveryOption={watchDeliveryOption || ''}
            deliveryDateRegister={register('deliveryDate', { required: 'Date is required' })}
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
          <PurchasePaymentStep
            selectedContainer={selectedContainer}
            quantity={quantity}
            total={total}
            deliveryOption={watchDeliveryOption || ''}
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
              {isSubmitting ? 'Submitting...' : 'Submit Purchase Request'}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}

export default PurchaseBookingForm
