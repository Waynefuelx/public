"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { CreateUserRequest } from "@/lib/api/services";
import { useCreateUser, useAdminRoles } from "@/lib/api/hooks";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { X, Save, UserPlus } from "lucide-react";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (userId: string) => void;
}

export default function CreateUserModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateUserModalProps) {
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    company: "",
    roles: null,
  });
  const [selectedRole, setSelectedRole] = useState("");

  const { data: availableRoles = [], isLoading: rolesLoading } = useAdminRoles();
  const createUserMutation = useCreateUser();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all required fields (Name, Email, Password)");
      return;
    }

    try {
      const userData: CreateUserRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber || null,
        company: formData.company || null,
        roles: selectedRole ? [selectedRole] : null,
      };

      const createdUser = await createUserMutation.mutateAsync(userData);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        company: "",
        roles: null,
      });
      setSelectedRole("");
      
      // Close modal and optionally open the created user's detail
      onClose();
      if (onSuccess && createdUser) {
        onSuccess(String(createdUser.id));
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      company: "",
      roles: null,
    });
    setSelectedRole("");
    onClose();
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
            <div className="flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Create New User</h2>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Required Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters
                </p>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phoneNumber || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder="Enter phone number (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <Input
                  value={formData.company || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Enter company name (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="input-field w-full"
                  disabled={rolesLoading}
                >
                  <option value="">
                    {rolesLoading
                      ? "Loading roles..."
                      : "Select a role (optional)"}
                  </option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Button
                type="submit"
                disabled={createUserMutation.isPending}
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-2" />
                {createUserMutation.isPending ? "Creating..." : "Create User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={createUserMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

