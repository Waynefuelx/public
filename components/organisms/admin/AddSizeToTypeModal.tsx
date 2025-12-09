import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import { X } from 'lucide-react'
import type { ContainerSize } from '@/lib/api/services'

interface AddSizeToTypeModalProps {
  isOpen: boolean
  containerTypeName?: string
  availableSizes: ContainerSize[]
  onClose: () => void
  onAddSize: (sizeId: string | number) => Promise<void>
  isAdding?: boolean
}

const AddSizeToTypeModal = ({
  isOpen,
  containerTypeName,
  availableSizes,
  onClose,
  onAddSize,
  isAdding = false,
}: AddSizeToTypeModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Add Size to {containerTypeName || "Type"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {availableSizes.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => onAddSize(size.id)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
                  disabled={isAdding}
                  type="button"
                >
                  <div className="font-medium text-gray-900">
                    {size.sizeMeters}m
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              All available sizes have been added to this type.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default AddSizeToTypeModal

