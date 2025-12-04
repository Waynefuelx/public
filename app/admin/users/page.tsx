"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import UsersTab from "@/components/organisms/admin/UsersTab";
import UserDetailModal from "@/components/organisms/admin/UserDetailModal";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { Users, ArrowLeft, Filter } from "lucide-react";
import type { UserListItemDto } from "@/lib/api/services";

const AdminUsersPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [showRoleFilter, setShowRoleFilter] = useState(false);

  const handleViewUser = (user: UserListItemDto) => {
    setSelectedUserId(String(user.id));
  };

  const handleEditUser = (user: UserListItemDto) => {
    setSelectedUserId(String(user.id));
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  return (
    <ProtectedRoute allowedTypes={["admin"]}>
      <div className="min-h-screen bg-secondary-200">
        {/* Admin Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
              <div className="min-w-0 flex-1 flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (window.location.href = "/admin")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin
                </Button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    User Management
                  </h1>
                  <p className="text-sm text-gray-600 truncate">
                    Manage system users and roles
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRoleFilter(!showRoleFilter)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Role
                  </Button>
                  {showRoleFilter && (
                    <Card className="absolute right-0 mt-2 z-10 min-w-[200px]">
                      <div className="p-4 space-y-2">
                        <button
                          onClick={() => {
                            setRoleFilter(undefined);
                            setShowRoleFilter(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded text-sm ${
                            roleFilter === undefined
                              ? "bg-primary-100 text-primary-800"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          All Users
                        </button>
                        <button
                          onClick={() => {
                            setRoleFilter("admin");
                            setShowRoleFilter(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded text-sm ${
                            roleFilter === "admin"
                              ? "bg-primary-100 text-primary-800"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          Admin
                        </button>
                        <button
                          onClick={() => {
                            setRoleFilter("customer");
                            setShowRoleFilter(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded text-sm ${
                            roleFilter === "customer"
                              ? "bg-primary-100 text-primary-800"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          Customer
                        </button>
                        <button
                          onClick={() => {
                            setRoleFilter("driver");
                            setShowRoleFilter(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded text-sm ${
                            roleFilter === "driver"
                              ? "bg-primary-100 text-primary-800"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          Driver
                        </button>
                      </div>
                    </Card>
                  )}
                </div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Role Filter Badge */}
          {roleFilter && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Filtered by role:</span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      {roleFilter}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRoleFilter(undefined)}
                  >
                    Clear Filter
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Users Tab */}
          <UsersTab
            onView={handleViewUser}
            onEdit={handleEditUser}
            roleFilter={roleFilter}
          />

          {/* User Detail Modal */}
          <UserDetailModal
            userId={selectedUserId}
            onClose={handleCloseModal}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminUsersPage;

