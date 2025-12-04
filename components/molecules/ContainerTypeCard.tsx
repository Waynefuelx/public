import Card from '../atoms/Card'
import { X } from 'lucide-react'

interface ContainerTypeCardProps {
  id: string
  name: string
  description: string
  dimensions: string
  capacity: string
  price: number
  priceUnit?: string
  image: string
  selected?: boolean
  onClick: () => void
}

const ContainerTypeCard = ({
  id,
  name,
  description,
  dimensions,
  capacity,
  price,
  priceUnit = 'per month',
  image,
  selected = false,
  onClick,
}: ContainerTypeCardProps) => {
  return (
    <Card>
      <div
        className={`p-4 cursor-pointer transition-all ${
          selected
            ? 'ring-2 ring-primary-500 bg-primary-50'
            : 'hover:shadow-md'
        }`}
        onClick={onClick}
      >
        {selected && (
          <div className="flex justify-end mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt={name}
              className="w-full h-auto max-h-48 object-contain rounded-lg"
            />
          </div>
        )}
        <h4 className="font-semibold text-gray-900 mb-2">{name}</h4>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="space-y-1 text-sm mb-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Dimensions:</span>
            <span className="font-medium text-gray-900">{dimensions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Capacity:</span>
            <span className="font-medium text-gray-900">{capacity}</span>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Price:</span>
            <span className="text-lg font-bold text-primary-600">
              R{price.toLocaleString()}
            </span>
          </div>
          {priceUnit && (
            <p className="text-xs text-gray-500 text-right mt-1">
              {priceUnit}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

export default ContainerTypeCard

