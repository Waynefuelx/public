import { motion } from 'framer-motion'
import { useState } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import DeleteConfirmModal from '@/components/organisms/admin/DeleteConfirmModal'
import AddSizeToTypeModal from '@/components/organisms/admin/AddSizeToTypeModal'
import {
  useContainerTypes,
  useContainerSizes,
  useAddContainerSizeToType,
  useRemoveContainerSizeFromType,
} from '@/lib/api/hooks'
import { extractErrorMessage } from '@/lib/utils/error-helpers'
import { Plus, Trash2 } from 'lucide-react'

interface ContainerCombinationsTabProps {
  searchTerm: string
}

const ContainerCombinationsTab = ({ searchTerm }: ContainerCombinationsTabProps) => {
  const [selectedTypeId, setSelectedTypeId] = useState<string | number | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    typeId: string | number
    sizeId: string | number
  } | null>(null)

  const { data: typesData } = useContainerTypes({
    search: searchTerm || undefined,
    page: 1,
    pageSize: 100,
  })
  const { data: sizesData } = useContainerSizes({
    page: 1,
    pageSize: 100,
  })

  const addSizeToTypeMutation = useAddContainerSizeToType()
  const removeSizeFromTypeMutation = useRemoveContainerSizeFromType()

  const types = typesData?.items || []
  const sizes = sizesData?.items || []
  const selectedType = types.find((t) => t.id === selectedTypeId)

  const handleAddSize = async (sizeId: string | number) => {
    if (!selectedTypeId) return
    try {
      await addSizeToTypeMutation.mutateAsync({
        containerTypeId: selectedTypeId,
        data: { containerSizeId: sizeId },
      })
      setShowAddModal(false)
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error)
      alert(errorMessage || "Failed to add size to type. Please try again.")
    }
  }

  const handleRemoveSize = async (typeId: string | number, sizeId: string | number) => {
    try {
      await removeSizeFromTypeMutation.mutateAsync({
        containerTypeId: typeId,
        containerSizeId: sizeId,
      })
      setDeleteConfirm(null)
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error)
      alert(errorMessage || "Failed to remove size from type. Please try again.")
    }
  }

  // Get available sizes (not already added to selected type)
  const availableSizes = sizes.filter(
    (size) => !selectedType?.sizes?.some((s) => s.id === size.id)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Type-Size Combinations
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Types List */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Container Types
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedTypeId(type.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  selectedTypeId === type.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                type="button"
              >
                <div className="font-medium text-gray-900">{type.name}</div>
                {type.category && (
                  <div className="text-sm text-gray-500">{type.category}</div>
                )}
                {type.sizes && type.sizes.length > 0 && (
                  <div className="text-xs text-gray-400 mt-1">
                    {type.sizes.length} size{type.sizes.length !== 1 ? "s" : ""}{" "}
                    configured
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Selected Type Details */}
        <Card>
          {selectedTypeId ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedType?.name || "Loading..."}
                </h3>
                <Button
                  size="sm"
                  onClick={() => setShowAddModal(true)}
                  disabled={availableSizes.length === 0}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Size
                </Button>
              </div>
              {selectedType?.sizes && selectedType.sizes.length > 0 ? (
                <div className="space-y-2">
                  {selectedType.sizes.map((size) => (
                    <div
                      key={size.id}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center"
                    >
                      <div className="font-medium text-gray-900">
                        {size.sizeMeters}m
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setDeleteConfirm({
                            typeId: selectedTypeId!,
                            sizeId: size.id,
                          })
                        }}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove size from type"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No sizes configured for this type. Click "Add Size" to add one.
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select a container type to view and manage its size combinations
            </div>
          )}
        </Card>
      </div>

      <AddSizeToTypeModal
        isOpen={showAddModal}
        containerTypeName={selectedType?.name}
        availableSizes={availableSizes}
        onClose={() => setShowAddModal(false)}
        onAddSize={handleAddSize}
        isAdding={addSizeToTypeMutation.isPending}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirm !== null}
        title="Remove Size from Type"
        message="Are you sure you want to remove this size from the container type? This action can be undone by adding the size back."
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() =>
          deleteConfirm && handleRemoveSize(deleteConfirm.typeId, deleteConfirm.sizeId)
        }
        isDeleting={removeSizeFromTypeMutation.isPending}
        confirmLabel="Remove"
      />
    </motion.div>
  )
}

export default ContainerCombinationsTab

