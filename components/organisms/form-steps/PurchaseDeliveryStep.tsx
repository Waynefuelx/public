import { Store } from 'lucide-react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import FormField from '@/components/molecules/FormField'
import Input from '@/components/atoms/Input'

interface PurchaseDeliveryStepProps {
  deliveryOption: string
  deliveryDateRegister: UseFormRegisterReturn
  companyRegister: UseFormRegisterReturn
  deliveryAddressRegister: UseFormRegisterReturn
  cityRegister: UseFormRegisterReturn
  provinceRegister: UseFormRegisterReturn
  postalCodeRegister: UseFormRegisterReturn
  deliveryDateError?: FieldError
  deliveryAddressError?: FieldError
  cityError?: FieldError
  provinceError?: FieldError
  postalCodeError?: FieldError
}

const PurchaseDeliveryStep = ({
  deliveryOption,
  deliveryDateRegister,
  companyRegister,
  deliveryAddressRegister,
  cityRegister,
  provinceRegister,
  postalCodeRegister,
  deliveryDateError,
  deliveryAddressError,
  cityError,
  provinceError,
  postalCodeError,
}: PurchaseDeliveryStepProps) => {
  const isDelivery = deliveryOption === 'delivery'
  const dateLabel = isDelivery ? 'Delivery Date' : 'Collection Date'

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isDelivery ? 'Delivery Details' : 'Collection Details'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={dateLabel}
            required
            error={deliveryDateError?.message}
          >
            <Input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...deliveryDateRegister}
              error={deliveryDateError?.message}
            />
          </FormField>

          <FormField label="Company Name">
            <Input
              type="text"
              placeholder="Enter company name"
              {...companyRegister}
            />
          </FormField>
        </div>

        {isDelivery && (
          <>
            <FormField
              label="Delivery Address"
              required
              error={deliveryAddressError?.message}
              className="mt-4"
            >
              <Input
                type="text"
                placeholder="Street address"
                {...deliveryAddressRegister}
                error={deliveryAddressError?.message}
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <FormField
                label="City"
                required
                error={cityError?.message}
              >
                <Input
                  type="text"
                  placeholder="City"
                  {...cityRegister}
                  error={cityError?.message}
                />
              </FormField>

              <FormField
                label="Province"
                required
                error={provinceError?.message}
              >
                <Input
                  type="text"
                  placeholder="Province"
                  {...provinceRegister}
                  error={provinceError?.message}
                />
              </FormField>

              <FormField
                label="Postal Code"
                required
                error={postalCodeError?.message}
              >
                <Input
                  type="text"
                  placeholder="Postal code"
                  {...postalCodeRegister}
                  error={postalCodeError?.message}
                />
              </FormField>
            </div>
          </>
        )}

        {!isDelivery && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Store className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Collection Information</p>
                <p className="mt-1">
                  You can collect your container from our main depot. We'll provide you with the exact address and collection instructions after your order is confirmed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PurchaseDeliveryStep

