import { UseFormRegisterReturn } from 'react-hook-form'

interface QuantitySelectorProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  register?: UseFormRegisterReturn
  error?: string
}

const QuantitySelector = ({
  value,
  min = 1,
  max = 100,
  onChange,
  register,
  error,
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        {...(register || {})}
        onChange={(e) => {
          const newValue = Number(e.target.value)
          onChange(newValue)
          if (register?.onChange) {
            register.onChange(e)
          }
        }}
        className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
      {error && (
        <p className="text-error-600 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}

export default QuantitySelector

