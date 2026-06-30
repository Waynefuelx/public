import { motion } from 'framer-motion'
import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { X } from 'lucide-react'

interface CreateContainerSizeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { sizeMeters: number }) => Promise<void>
  isSubmitting?: boolean
}

const CreateContainerSizeModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: CreateContainerSizeModalProps) => {
  const [formData, setFormData] = useState({ sizeMeters: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const sizeMeters = Number(formData.sizeMeters)
    if (isNaN(sizeMeters) || sizeMeters <= 0) {
      alert("Please enter a valid size in meters (greater than 0)")
      return
    }
    await onSubmit({ sizeMeters })
    setFormData({ sizeMeters: "" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Create Container Size
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Size in meters *"
            value={formData.sizeMeters}
            type="number"
            step="0.1"
            min="0"
            onChange={(e) =>
              setFormData({ ...formData, sizeMeters: e.target.value })
            }
            required
          />
          <div className="flex gap-4 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Size"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default CreateContainerSizeModal

