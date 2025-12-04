import { ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

const FormField = ({ label, error, required, children, className = '' }: FormFieldProps) => {
  return (
    <div className={className}>
      <label className="form-label">
        {label}
        {required && <span className="text-error-600 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-error-600 text-sm mt-2 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField

