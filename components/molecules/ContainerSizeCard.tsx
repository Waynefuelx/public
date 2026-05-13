import Card from '@/components/atoms/Card'
import { Trash2 } from 'lucide-react'
import type { ContainerSize } from '@/lib/api/services'

interface ContainerSizeCardProps {
  size: ContainerSize
  onDelete: (sizeId: string | number) => void
}

const ContainerSizeCard = ({ size, onDelete }: ContainerSizeCardProps) => {
  return (
    <Card className="p-6 relative">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">
          {size.sizeMeters}m
        </h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(size.id);
          }}
          className="text-red-600 hover:text-red-800 p-1"
          title="Delete size"
          type="button"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </Card>
  )
}

export default ContainerSizeCard

