import { motion } from 'framer-motion'
import { useState } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ContainerSizeCard from '@/components/molecules/ContainerSizeCard'
import CreateContainerSizeModal from '@/components/organisms/admin/CreateContainerSizeModal'
import DeleteConfirmModal from '@/components/organisms/admin/DeleteConfirmModal'
import {
  useContainerSizes,
  useCreateContainerSize,
  useDeleteContainerSize,
} from '@/lib/api/hooks'
import { extractErrorMessage } from '@/lib/utils/error-helpers'
import { Plus } from 'lucide-react'

interface ContainerSizesTabProps {
  searchTerm: string
}

const ContainerSizesTab = ({ searchTerm }: ContainerSizesTabProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null)

  const { data: sizesData, isLoading } = useContainerSizes({
    search: searchTerm || undefined,
    page: 1,
    pageSize: 100,
  })

  const createSizeMutation = useCreateContainerSize()
  const deleteSizeMutation = useDeleteContainerSize()

  const sizes = sizesData?.items || []

  const handleCreate = async (data: { sizeMeters: number }) => {
    try {
      await createSizeMutation.mutateAsync({ sizeMeters: data.sizeMeters })
      setShowCreateModal(false)
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error)
      alert(errorMessage || "Failed to create container size. Please try again.")
    }
  }

  const handleDelete = async (sizeId: string | number) => {
    try {
      await deleteSizeMutation.mutateAsync(sizeId)
      setDeleteConfirmId(null)
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error)
      alert(errorMessage || "Failed to delete container size. Please try again.")
      setDeleteConfirmId(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Container Sizes</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Size
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <div className="p-8 text-center text-gray-500">Loading sizes...</div>
        </Card>
      ) : sizes.length === 0 ? (
        <Card>
          <div className="p-8 text-center text-gray-500">
            No container sizes found
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sizes.map((size) => (
            <ContainerSizeCard
              key={size.id}
              size={size}
              onDelete={(id) => setDeleteConfirmId(id)}
            />
          ))}
        </div>
      )}

      <CreateContainerSizeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
        isSubmitting={createSizeMutation.isPending}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirmId !== null}
        title="Delete Container Size"
        message="Are you sure you want to delete this container size? This action cannot be undone and will remove it from all associated container types."
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
        isDeleting={deleteSizeMutation.isPending}
      />
    </motion.div>
  )
}

export default ContainerSizesTab

