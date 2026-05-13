"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Card from "@/components/atoms/Card";
import ContainerSizesTab from "@/components/organisms/admin/ContainerSizesTab";
import ContainerTypesTab from "@/components/organisms/admin/ContainerTypesTab";
import ContainerCombinationsTab from "@/components/organisms/admin/ContainerCombinationsTab";
import { Package, Link2, Search } from "lucide-react";

const ContainerManagementPage = () => {
  const [activeTab, setActiveTab] = useState<
    "sizes" | "types" | "combinations"
  >("sizes");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ProtectedRoute allowedTypes={["admin"]}>
      <div className="min-h-screen bg-secondary-200">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  Container Management
                </h1>
                <p className="text-sm text-gray-600 truncate">
                  Manage container sizes, types, and their combinations
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveTab("sizes")}
                className={`flex items-center space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-w-fit ${
                  activeTab === "sizes"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Container Sizes</span>
              </button>
              <button
                onClick={() => setActiveTab("types")}
                className={`flex items-center space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-w-fit ${
                  activeTab === "types"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Container Types</span>
              </button>
              <button
                onClick={() => setActiveTab("combinations")}
                className={`flex items-center space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-w-fit ${
                  activeTab === "combinations"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>Type-Size Combinations</span>
              </button>
            </nav>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </Card>

          {/* Tab Content */}
          {activeTab === "sizes" && (
            <ContainerSizesTab searchTerm={searchTerm} />
          )}
          {activeTab === "types" && (
            <ContainerTypesTab searchTerm={searchTerm} />
          )}
          {activeTab === "combinations" && (
            <ContainerCombinationsTab searchTerm={searchTerm} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ContainerManagementPage;
