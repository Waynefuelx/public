"use client";

import { motion } from "framer-motion";
import { useAdminContainer } from "@/lib/api/hooks";
import { Loader2 } from "lucide-react";
import {
  formatDate,
  formatDuration,
  calculateDaysSinceDelivery,
  getPaymentStatusColor,
} from "@/lib/utils/admin-helpers";

interface ContainerDetailModalProps {
  containerId: string | null;
  onClose: () => void;
  onUpdateStatus?: (orderId: string) => void;
}

export default function ContainerDetailModal({
  containerId,
  onClose,
  onUpdateStatus,
}: ContainerDetailModalProps) {
  const { data: container, isLoading, error } = useAdminContainer(containerId);

  if (!containerId) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl max-w-2xl w-full p-6"
        >
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !container) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl max-w-2xl w-full p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Container Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="text-center py-8">
            <p className="text-red-600">
              {error ? "Failed to load container details" : "Container not found"}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Parse rental duration from format like "30.00:00:00" to days
  const parseDurationDays = (durationStr: string): number => {
    if (!durationStr) return 0;
    const parts = durationStr.split(":");
    if (parts.length >= 1) {
      const days = parseFloat(parts[0]);
      if (!isNaN(days)) {
        return Math.floor(days);
      }
    }
    return 0;
  };

  const rentalDurationDays = parseDurationDays(container.rentalDuration);
  const monthlyRate = typeof container.monthlyRate === 'string' 
    ? parseFloat(container.monthlyRate) 
    : (container.monthlyRate || 0);
  
  const totalOwed = container.totalOwed !== undefined && container.totalOwed !== null
    ? (typeof container.totalOwed === 'string' 
        ? parseFloat(container.totalOwed) 
        : (container.totalOwed || 0))
    : null;
  
  const lat = typeof container.location.latitude === 'string'
    ? parseFloat(container.location.latitude)
    : (container.location.latitude || 0);
  const lng = typeof container.location.longitude === 'string'
    ? parseFloat(container.location.longitude)
    : (container.location.longitude || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Container Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Container Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Container Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Container Number
                  </p>
                  <p className="font-medium text-gray-900">
                    {container.containerNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Container Type
                  </p>
                  <p className="font-medium text-gray-900">
                    {container.containerSize} {container.containerType}
                  </p>
                </div>
                {container.deliveryDate && (
                  <div>
                    <p className="text-sm text-gray-600">Delivery Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(container.deliveryDate)}
                    </p>
                  </div>
                )}
                {container.deliveryDate && (
                  <div>
                    <p className="text-sm text-gray-600">
                      Duration at Location
                    </p>
                    <p className="font-medium text-gray-900">
                      {formatDuration(
                        calculateDaysSinceDelivery(
                          container.deliveryDate
                        )
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Customer Name</p>
                  <p className="font-medium text-gray-900">
                    {container.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a
                    href={`mailto:${container.customerEmail}`}
                    className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                    title={`Click to email ${container.customerEmail}`}
                  >
                    {container.customerEmail}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a
                    href={`tel:${container.customerPhone}`}
                    className="font-medium text-primary-600 hover:text-primary-700"
                  >
                    {container.customerPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {container.location.address && (
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">
                      {container.location.address}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">
                    City & Province
                  </p>
                  <p className="font-medium text-gray-900">
                    {container.location.city},{" "}
                    {container.location.province}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {container.paymentStatus && (
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                        container.paymentStatus
                      )}`}
                    >
                      {container.paymentStatus}
                    </span>
                  </div>
                )}
                {(monthlyRate !== undefined && monthlyRate !== null) && (
                  <div>
                    <p className="text-sm text-gray-600">Monthly Rate</p>
                    <p className="font-medium text-gray-900">
                      R{monthlyRate.toLocaleString()}
                    </p>
                  </div>
                )}
                {container.lastPaymentDate && (
                  <div>
                    <p className="text-sm text-gray-600">Last Payment</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(container.lastPaymentDate)}
                    </p>
                  </div>
                )}
                {container.nextPaymentDate && (
                  <div>
                    <p className="text-sm text-gray-600">Next Payment Due</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(container.nextPaymentDate)}
                    </p>
                  </div>
                )}
                {totalOwed !== null && totalOwed > 0 && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-red-600 font-medium">
                      Outstanding Balance: R{totalOwed.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {container.notes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Notes
                </h3>
                <p className="text-gray-700">
                  {container.notes}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <a
                href={`tel:${container.customerPhone}`}
                className="btn-primary flex-1 text-center"
              >
                Call Customer
              </a>
              <button className="btn-secondary flex-1">
                Send Reminder
              </button>
              {container.activeOrderId && onUpdateStatus && (
                <button
                  onClick={() => onUpdateStatus(String(container.activeOrderId))}
                  className="btn-secondary flex-1"
                >
                  Update Status
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

