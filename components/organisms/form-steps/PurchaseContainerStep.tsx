import { Truck, Store } from 'lucide-react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import ContainerTypeCard from '@/components/molecules/ContainerTypeCard'
import FormField from '@/components/molecules/FormField'
import Input from '@/components/atoms/Input'
import RadioOption from '@/components/molecules/RadioOption'

interface ContainerType {
  id: string
  name: string
  description: string
  dimensions: string
  capacity: string
  price: number
  image: string
}

interface PurchaseContainerStepProps {
  selectedContainer: ContainerType | null
  containerTypes: ContainerType[]
  quantity: number
  deliveryOption: string
  onContainerSelect: (container: ContainerType) => void
  onContainerDeselect: () => void
  onQuantityChange: (value: number) => void
  onDeliveryOptionChange: (value: string) => void
  quantityRegister: UseFormRegisterReturn
  deliveryOptionRegister: UseFormRegisterReturn
  quantityError?: FieldError
  deliveryOptionError?: FieldError
}

const PurchaseContainerStep = ({
  selectedContainer,
  containerTypes,
  quantity,
  deliveryOption,
  onContainerSelect,
  onContainerDeselect,
  onQuantityChange,
  onDeliveryOptionChange,
  quantityRegister,
  deliveryOptionRegister,
  quantityError,
  deliveryOptionError,
}: PurchaseContainerStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Container Selection</h3>

        {selectedContainer ? (
          <ContainerTypeCard
            id={selectedContainer.id}
            name={selectedContainer.name}
            description={selectedContainer.description}
            dimensions={selectedContainer.dimensions}
            capacity={selectedContainer.capacity}
            price={selectedContainer.price}
            image={selectedContainer.image}
            selected
            onClick={onContainerDeselect}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {containerTypes.map((container) => (
              <ContainerTypeCard
                key={container.id}
                id={container.id}
                name={container.name}
                description={container.description}
                dimensions={container.dimensions}
                capacity={container.capacity}
                price={container.price}
                image={container.image}
                onClick={() => onContainerSelect(container)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedContainer && (
        <>
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

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Option</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <RadioOption
                value="delivery"
                label="Delivery"
                description="We deliver to your location"
                icon={Truck}
                checked={deliveryOption === 'delivery'}
                onChange={onDeliveryOptionChange}
              />
              <RadioOption
                value="collection"
                label="Collection"
                description="Collect from our depot"
                icon={Store}
                checked={deliveryOption === 'collection'}
                onChange={onDeliveryOptionChange}
              />
            </div>
            <input
              type="hidden"
              value={deliveryOption}
              {...deliveryOptionRegister}
            />
            {deliveryOptionError && (
              <p className="text-error-600 text-sm mt-2 flex items-center">
                {deliveryOptionError.message}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default PurchaseContainerStep

