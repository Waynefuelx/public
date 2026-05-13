import { UseFormRegisterReturn, FieldError } from 'react-hook-form'
import FormField from '@/components/molecules/FormField'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'

interface ContactInfoStepProps {
  contactNameRegister: UseFormRegisterReturn
  emailRegister: UseFormRegisterReturn
  phoneRegister: UseFormRegisterReturn
  specialRequirementsRegister: UseFormRegisterReturn
  contactNameError?: FieldError
  emailError?: FieldError
  phoneError?: FieldError
}

const ContactInfoStep = ({
  contactNameRegister,
  emailRegister,
  phoneRegister,
  specialRequirementsRegister,
  contactNameError,
  emailError,
  phoneError,
}: ContactInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Contact Name"
            required
            error={contactNameError?.message}
          >
            <Input
              type="text"
              placeholder="Full name"
              {...contactNameRegister}
              error={contactNameError?.message}
            />
          </FormField>

          <FormField
            label="Email"
            required
            error={emailError?.message}
          >
            <Input
              type="email"
              placeholder="email@example.com"
              {...emailRegister}
              error={emailError?.message}
            />
          </FormField>
        </div>

        <FormField
          label="Phone Number"
          required
          error={phoneError?.message}
          className="mt-4"
        >
          <Input
            type="tel"
            placeholder="+27 82 123 4567"
            {...phoneRegister}
            error={phoneError?.message}
          />
        </FormField>

        <FormField
          label="Special Requirements"
          className="mt-4"
        >
          <Textarea
            rows={3}
            placeholder="Any special requirements or notes..."
            {...specialRequirementsRegister}
          />
        </FormField>
      </div>
    </div>
  )
}

export default ContactInfoStep

