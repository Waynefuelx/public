import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import { X } from 'lucide-react'

interface DeleteConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onClose: () => void
  onConfirm: () => void
  isDeleting?: boolean
  confirmLabel?: string
}

const DeleteConfirmModal = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  isDeleting = false,
  confirmLabel = "Delete",
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : confirmLabel}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DeleteConfirmModal

