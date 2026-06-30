"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import type { UserDetailDto, UpdateUserRequest, ModifyUserRoleRequest } from "@/lib/api/services";
import { useAdminUser, useAdminUserRoles, useUpdateUser, useAddUserRole, useRemoveUserRole, useAdminRoles } from "@/lib/api/hooks";
import { formatDate } from "@/lib/utils/admin-helpers";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { X, Save, Shield, Plus, Trash2 } from "lucide-react";

interface UserDetailModalProps {
  userId: string | null;
  onClose: () => void;
}

export default function UserDetailModal({
  userId,
  onClose,
}: UserDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UpdateUserRequest>({});
  const [newRole, setNewRole] = useState("");

  const { data: user, isLoading } = useAdminUser(userId);
  const { data: roles = [], isLoading: rolesLoading } = useAdminUserRoles(userId);
  const { data: availableRoles = [], isLoading: availableRolesLoading } = useAdminRoles();
  const updateUserMutation = useUpdateUser();
  const addRoleMutation = useAddUserRole();
  const removeRoleMutation = useRemoveUserRole();

  // Since only one role is allowed, show all available roles (user can change from one to another)
  const availableRolesToAdd = useMemo(() => {
    return availableRoles;
  }, [availableRoles]);

  if (!userId) return null;
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="text-center text-gray-500">Loading user...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="text-center text-gray-500">User not found</div>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditForm({
      userName: user.userName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      company: user.company || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateUserMutation.mutateAsync({
        userId: String(user.id),
        data: editForm,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const handleAddRole = async () => {
    if (!newRole.trim()) return;
    
    // If user already has a role, remove it first (only one role allowed)
    if (roles.length > 0) {
      const existingRole = roles[0];
      if (existingRole === newRole) {
        // Same role selected, no need to change
        setNewRole("");
        return;
      }
      
      // Remove existing role first
      try {
        await removeRoleMutation.mutateAsync({
          userId: String(user.id),
          roleName: existingRole,
        });
      } catch (error) {
        console.error("Error removing existing role:", error);
        alert("Failed to remove existing role. Please try again.");
        return;
      }
    }
    
    // Add the new role
    try {
      await addRoleMutation.mutateAsync({
        userId: String(user.id),
        data: { role: newRole },
      });
      setNewRole("");
    } catch (error) {
      console.error("Error adding role:", error);
      alert("Failed to add role. Please try again.");
    }
  };

  const handleRemoveRole = async (roleName: string) => {
    if (!confirm(`Are you sure you want to remove the role "${roleName}" from this user?`)) {
      return;
    }
    try {
      await removeRoleMutation.mutateAsync({
        userId: String(user.id),
        roleName,
      });
    } catch (error) {
      console.error("Error removing role:", error);
      alert("Failed to remove role. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* User Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">User Information</h3>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    Edit
                  </Button>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <Input
                      value={editForm.userName || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, userName: e.target.value })
                      }
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={editForm.email || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      value={editForm.phoneNumber || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phoneNumber: e.target.value })
                      }
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input
                      value={editForm.company || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, company: e.target.value })
                      }
                      placeholder="Company"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      disabled={updateUserMutation.isPending}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-medium text-gray-900">
                      {user.userName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">
                      {user.email || "N/A"}
                    </p>
                    {user.emailConfirmed && (
                      <span className="text-xs text-green-600 ml-2">✓ Verified</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium text-gray-900">
                      {user.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium text-gray-900">
                      {user.company || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Modified</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(user.modifiedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Role */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Role
                </h3>
              </div>
              {rolesLoading ? (
                <div className="text-sm text-gray-500">Loading role...</div>
              ) : (
                <div className="space-y-3">
                  {roles.length === 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">No role assigned</p>
                      <div className="flex gap-2">
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="input-field flex-1"
                          disabled={availableRolesLoading || availableRolesToAdd.length === 0}
                        >
                          <option value="">
                            {availableRolesLoading
                              ? "Loading roles..."
                              : availableRolesToAdd.length === 0
                              ? "No roles available"
                              : "Select a role"}
                          </option>
                          {availableRolesToAdd.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <Button
                          onClick={handleAddRole}
                          disabled={!newRole.trim() || addRoleMutation.isPending || removeRoleMutation.isPending || availableRolesToAdd.length === 0}
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Set Role
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-2 rounded-lg text-sm font-medium">
                          <Shield className="w-4 h-4" />
                          <span>{roles[0]}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveRole(roles[0])}
                          className="text-red-600 hover:text-red-900 p-2"
                          title="Remove role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="input-field flex-1"
                          disabled={availableRolesLoading || availableRolesToAdd.length === 0}
                        >
                          <option value="">
                            {availableRolesLoading
                              ? "Loading roles..."
                              : availableRolesToAdd.length === 0
                              ? "No roles available"
                              : "Change role"}
                          </option>
                          {availableRolesToAdd
                            .filter((role) => role !== roles[0]) // Don't show current role in dropdown
                            .map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                        </select>
                        <Button
                          onClick={handleAddRole}
                          disabled={!newRole.trim() || addRoleMutation.isPending || removeRoleMutation.isPending || availableRolesToAdd.length === 0}
                          size="sm"
                        >
                          Change Role
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

