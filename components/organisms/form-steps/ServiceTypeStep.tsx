import { Truck, CreditCard, FileText } from 'lucide-react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import RadioOption from '@/components/molecules/RadioOption'
import ContainerTypeCard from '@/components/molecules/ContainerTypeCard'
import FormField from '@/components/molecules/FormField'
import Input from '@/components/atoms/Input'

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

interface ServiceTypeStepProps {
  serviceType: string
  selectedContainer: ContainerType | null
  containerTypes: ContainerType[]
  quantity: number
  onServiceTypeChange: (value: string) => void
  onContainerSelect: (container: ContainerType) => void
  onContainerDeselect: () => void
  onQuantityChange: (value: number) => void
  serviceTypeRegister: UseFormRegisterReturn
  quantityRegister: UseFormRegisterReturn
  serviceTypeError?: FieldError
  quantityError?: FieldError
}

const ServiceTypeStep = ({
  serviceType,
  selectedContainer,
  containerTypes,
  quantity,
  onServiceTypeChange,
  onContainerSelect,
  onContainerDeselect,
  onQuantityChange,
  serviceTypeRegister,
  quantityRegister,
  serviceTypeError,
  quantityError,
}: ServiceTypeStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <RadioOption
            value="rental"
            label="Container Rental"
            description="Rent containers for short or long term"
            icon={Truck}
            checked={serviceType === 'rental'}
            onChange={onServiceTypeChange}
          />
          <RadioOption
            value="purchase"
            label="Container Purchase"
            description="Buy containers outright"
            icon={CreditCard}
            checked={serviceType === 'purchase'}
            onChange={onServiceTypeChange}
          />
          <RadioOption
            value="quote"
            label="Request Quote"
            description="Get a custom quote for your needs"
            icon={FileText}
            checked={serviceType === 'quote'}
            onChange={onServiceTypeChange}
          />
        </div>
        <input
          type="hidden"
          value={serviceType}
          {...serviceTypeRegister}
        />
        {serviceTypeError && (
          <p className="text-error-600 text-sm mt-2 flex items-center">
            {serviceTypeError.message}
          </p>
        )}
      </div>

      {serviceType && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedContainer ? 'Selected Container' : 'Container Selection'}
          </h3>

          {selectedContainer ? (
            <ContainerTypeCard
              id={selectedContainer.id}
              name={selectedContainer.name}
              description={selectedContainer.description}
              dimensions={selectedContainer.dimensions}
              capacity={selectedContainer.capacity}
              price={selectedContainer.price}
              priceUnit={selectedContainer.priceUnit}
              image={selectedContainer.image}
              selected
              onClick={onContainerDeselect}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {containerTypes.map((container) => (
                <ContainerTypeCard
                  key={container.id}
                  id={container.id}
                  name={container.name}
                  description={container.description}
                  dimensions={container.dimensions}
                  capacity={container.capacity}
                  price={container.price}
                  priceUnit={container.priceUnit}
                  image={container.image}
                  onClick={() => onContainerSelect(container)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {selectedContainer && (
        <FormField
          label="Quantity"
          required
          error={quantityError?.message}
        >
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value)
              onQuantityChange(value)
              quantityRegister.onChange(e)
            }}
            onBlur={quantityRegister.onBlur}
            name={quantityRegister.name}
            ref={quantityRegister.ref}
            error={quantityError?.message}
          />
        </FormField>
      )}
    </div>
  )
}

export default ServiceTypeStep

