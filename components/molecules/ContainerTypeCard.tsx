import Card from '@/components/atoms/Card'
import { Trash2 } from 'lucide-react'
import type { ContainerType } from '@/lib/api/services'

interface ContainerTypeCardProps {
  type: ContainerType
  onDelete: (typeId: string | number) => void
}

const ContainerTypeCard = ({ type, onDelete }: ContainerTypeCardProps) => {
  return (
    <Card className="p-6 relative">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {type.name}
        </h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(type.id);
          }}
          className="text-red-600 hover:text-red-800 p-1"
          title="Delete type"
          type="button"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      {type.category && (
        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded mb-2">
          {type.category}
        </span>
      )}
      {type.description && (
        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
      )}
      {type.dimensions && (
        <p className="text-sm text-gray-500">
          <span className="font-medium">Dimensions:</span> {type.dimensions}
        </p>
      )}
      {type.capacity && (
        <p className="text-sm text-gray-500">
          <span className="font-medium">Capacity:</span> {type.capacity}
        </p>
      )}
      {type.price && (
        <p className="text-sm text-gray-900 font-medium mt-2">
          {type.priceUnit || "$"}
          {type.price}
        </p>
      )}
      {type.image && (
        <div className="mt-4">
          <img
            src={type.image}
            alt={type.name}
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}
    </Card>
  )
}

export default ContainerTypeCard
