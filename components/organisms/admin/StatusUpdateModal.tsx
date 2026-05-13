"use client";

import { motion } from "framer-motion";
import { CheckCircle, Truck, MapPin } from "lucide-react";
import type { Order as ApiOrder } from "@/lib/api/services";
import {
  getOrderStatusLabel,
  getOrderStatusColor,
  formatDate,
} from "@/lib/utils/admin-helpers";

type Order = ApiOrder;

interface Notification {
  id: string;
  orderId: string;
  message: string;
  timestamp: string;
}

interface StatusUpdateModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onConfirmOrder: (orderId: string) => void;
  onStartDelivery: (order: Order | any) => void;
  onMarkDelivered: (orderId: string) => void;
  statusMap: Map<number, string>;
  notifications?: Notification[];
}

export default function StatusUpdateModal({
  isOpen,
  order,
  onClose,
  onConfirmOrder,
  onStartDelivery,
  onMarkDelivered,
  statusMap,
  notifications = [],
}: StatusUpdateModalProps) {
  if (!isOpen || !order) return null;

  const orderNotifications = notifications.filter(
    (n) => String(n.orderId) === String(order.id)
  );

  // Helper function to check if status matches a given label
  const isStatus = (status: number | string, label: string): boolean => {
    const statusLabel = getOrderStatusLabel(status, statusMap);
    return statusLabel.toLowerCase().replace(/\s+/g, '').replace(/-/g, '') === 
           label.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Update Order Status
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
            {/* Order Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Order Information
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Order ID:</span>{" "}
                  {order.id}
                </p>
                <p>
                  <span className="font-medium">Customer:</span>{" "}
                  {order.customerName || order.customer?.name || 'N/A'}
                </p>
                <p>
                  <span className="font-medium">Container:</span>{" "}
                  {order.containerType}
                </p>
                <p>
                  <span className="font-medium">Current Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                      order.status,
                      statusMap
                    )}`}
                  >
                    {getOrderStatusLabel(order.status, statusMap)}
                  </span>
                </p>
              </div>
            </div>

            {/* Status Update Options */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Update Status
              </h3>

              {isStatus(order.status, "pending") && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          Confirm Order
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Let the customer know their order has been
                          received and is being prepared.
                        </p>
                        <button
                          onClick={() => {
                            onConfirmOrder(String(order.id));
                          }}
                          className="btn-primary text-sm"
                        >
                          Confirm Order & Notify Customer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isStatus(order.status, "confirmed") && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Truck className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          Start Delivery Process
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Generate tracking number and assign to driver.
                          Customer will be notified that their container
                          is on the way.
                        </p>
                        <button
                          onClick={() => onStartDelivery(order)}
                          className="btn-primary text-sm"
                        >
                          Start Delivery & Send Tracking Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isStatus(order.status, "in-transit") && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          Mark as Delivered
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Update status to delivered when container has
                          been successfully delivered to customer.
                        </p>
                        <button
                          onClick={() => {
                            onMarkDelivered(String(order.id));
                          }}
                          className="btn-primary text-sm"
                        >
                          Mark as Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isStatus(order.status, "delivered") && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    Order Completed
                  </h4>
                  <p className="text-sm text-gray-600">
                    This order has been successfully delivered to the
                    customer.
                  </p>
                </div>
              )}
            </div>

            {/* Notification Preview */}
            {orderNotifications.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Recent Notifications
                </h3>
                <div className="space-y-2">
                  {orderNotifications
                    .slice(0, 2)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm text-blue-900">
                              {notification.message}
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                              {formatDate(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

