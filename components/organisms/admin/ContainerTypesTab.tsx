import { motion } from 'framer-motion'
import { useState } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ContainerTypeCard from '@/components/molecules/ContainerTypeCard'
import CreateContainerTypeModal from '@/components/organisms/admin/CreateContainerTypeModal'
import DeleteConfirmModal from '@/components/organisms/admin/DeleteConfirmModal'
import {
  useContainerTypes,
  useCreateContainerType,
  useDeleteContainerType,
} from '@/lib/api/hooks'
import { extractErrorMessage } from '@/lib/utils/error-helpers'
import { Plus } from 'lucide-react'

interface ContainerTypesTabProps {
  searchTerm: string
}

const ContainerTypesTab = ({ searchTerm }: ContainerTypesTabProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null)

  const { data: typesData, isLoading } = useContainerTypes({
    search: searchTerm || undefined,
    page: 1,
    pageSize: 100,
  })

  const createTypeMutation = useCreateContainerType()
  const deleteTypeMutation = useDeleteContainerType()

  const types = typesData?.items || []

  const handleCreate = async (data: { name: string; description?: string }) => {
    try {
      await createTypeMutation.mutateAsync(data)
      setShowCreateModal(false)
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error)
      alert(errorMessage || "Failed to create container type. Please try again.")
    }
  }

  const handleDelete = async (typeId: string | number) => {
    try {
      await deleteTypeMutation.mutateAsync(typeId)
      setDeleteConfirmId(null)
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error)
      alert(errorMessage || "Failed to delete container type. Please try again.")
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
        <h2 className="text-xl font-semibold text-gray-900">Container Types</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Type
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <div className="p-8 text-center text-gray-500">Loading types...</div>
        </Card>
      ) : types.length === 0 ? (
        <Card>
          <div className="p-8 text-center text-gray-500">
            No container types found
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {types.map((type) => (
            <ContainerTypeCard
              key={type.id}
              type={type}
              onDelete={(id) => setDeleteConfirmId(id)}
            />
          ))}
        </div>
      )}

      <CreateContainerTypeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
        isSubmitting={createTypeMutation.isPending}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirmId !== null}
        title="Delete Container Type"
        message="Are you sure you want to delete this container type? This action cannot be undone and will remove all associated size combinations."
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
        isDeleting={deleteTypeMutation.isPending}
      />
    </motion.div>
  )
}

export default ContainerTypesTab

