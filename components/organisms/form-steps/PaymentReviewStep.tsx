import { CheckCircle, CreditCard, FileText } from 'lucide-react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import RadioOption from '@/components/molecules/RadioOption'
import QuantitySelector from '@/components/molecules/QuantitySelector'
import FormField from '@/components/molecules/FormField'

interface ContainerType {
  id: string
  name: string
  price: number
}

interface PaymentReviewStepProps {
  serviceType: string
  selectedContainer: ContainerType | null
  quantity: number
  total: number
  paymentMethod: string
  onPaymentMethodChange: (value: string) => void
  onQuantityChange: (value: number) => void
  paymentMethodRegister: UseFormRegisterReturn
  quantityRegister: UseFormRegisterReturn
  paymentMethodError?: FieldError
  quantityError?: FieldError
}

const PaymentReviewStep = ({
  serviceType,
  selectedContainer,
  quantity,
  total,
  paymentMethod,
  onPaymentMethodChange,
  onQuantityChange,
  paymentMethodRegister,
  quantityRegister,
  paymentMethodError,
  quantityError,
}: PaymentReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment & Review</h3>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Service:</span>
              <span className="font-medium capitalize">{serviceType}</span>
            </div>
            {selectedContainer && (
              <>
                <div className="flex justify-between">
                  <span>Container:</span>
                  <span className="font-medium">{selectedContainer.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Quantity:</span>
                  <QuantitySelector
                    value={quantity}
                    onChange={onQuantityChange}
                    register={quantityRegister}
                    error={quantityError?.message}
                  />
                </div>
                <div className="flex justify-between">
                  <span>Price per unit:</span>
                  <span className="font-medium">R{selectedContainer.price}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>R{total.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <FormField
          label="Payment Method"
          required
          error={paymentMethodError?.message}
        >
          <div className="space-y-3">
            <RadioOption
              value="credit"
              label="Credit Card"
              icon={CreditCard}
              checked={paymentMethod === 'credit'}
              onChange={onPaymentMethodChange}
            />
            <RadioOption
              value="invoice"
              label="Invoice (Net 30)"
              icon={FileText}
              checked={paymentMethod === 'invoice'}
              onChange={onPaymentMethodChange}
            />
            <RadioOption
              value="quote"
              label="Quote Only"
              icon={FileText}
              checked={paymentMethod === 'quote'}
              onChange={onPaymentMethodChange}
            />
          </div>
          <input
            type="hidden"
            value={paymentMethod}
            {...paymentMethodRegister}
          />
        </FormField>

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
    </div>
  )
}

export default PaymentReviewStep

