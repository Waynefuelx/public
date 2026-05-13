import { LucideIcon } from 'lucide-react'

interface RadioOptionProps {
  value: string
  label: string
  description?: string
  icon?: LucideIcon
  checked: boolean
  onChange: (value: string) => void
  className?: string
}

const RadioOption = ({
  value,
  label,
  description,
  icon: Icon,
  checked,
  onChange,
  className = '',
}: RadioOptionProps) => {
  return (
    <label className={`relative ${className}`}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
          checked
            ? 'border-primary-600 bg-primary-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center space-x-3">
          {Icon && (
            <Icon
              className={`w-6 h-6 ${
                checked ? 'text-primary-600' : 'text-gray-400'
              }`}
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{label}</div>
            {description && (
              <div className="text-sm text-gray-500">{description}</div>
            )}
          </div>
        </div>
      </div>
    </label>
  )
}

export default RadioOption

