import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="form-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`input-field ${error ? 'border-error-500' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-error-600 text-sm mt-2">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-gray-500 text-sm mt-2">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

