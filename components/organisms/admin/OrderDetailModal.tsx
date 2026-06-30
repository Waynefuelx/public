"use client";

import { motion } from "framer-motion";
import type { Order as ApiOrder } from "@/lib/api/services";
import {
  formatDate,
  getOrderStatusLabel,
  getOrderStatusColor,
  getOrderTypeLabel,
  getCustomerName,
  getCustomerEmail,
  getCustomerPhone,
  getCustomerCompany,
} from "@/lib/utils/admin-helpers";

type Order = ApiOrder;

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: () => void;
  statusMap: Map<number, string>;
  orderTypeMap?: Map<number, string>;
}

export default function OrderDetailModal({
  order,
  onClose,
  onUpdateStatus,
  statusMap,
  orderTypeMap,
}: OrderDetailModalProps) {
  if (!order) return null;

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
              Order Details
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
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Order Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-medium text-gray-900">
                    {order.orderNumber || order.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Type</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getOrderTypeLabel(order, orderTypeMap).toLowerCase() === "purchase"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {getOrderTypeLabel(order, orderTypeMap)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                      order.status,
                      statusMap
                    )}`}
                  >
                    {getOrderStatusLabel(order.status, statusMap)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium text-gray-900">
                    R{((order.value ?? order.total) || 0).toLocaleString()}
                  </p>
                </div>
                {order.paymentMethod && (
                  <div>
                    <p className="text-sm text-gray-600">
                      Payment Method
                    </p>
                    <p className="font-medium text-gray-900 capitalize">
                      {order.paymentMethod}
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
                    {getCustomerName(order)}
                  </p>
                </div>
                {getCustomerCompany(order) && (
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-medium text-gray-900">
                      {getCustomerCompany(order)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a
                    href={`mailto:${getCustomerEmail(order)}`}
                    className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                    title={`Click to email ${getCustomerEmail(order)}`}
                  >
                    {getCustomerEmail(order)}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  {getCustomerPhone(order) ? (
                    <a
                      href={`tel:${getCustomerPhone(order)}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {getCustomerPhone(order)}
                    </a>
                  ) : (
                    <p className="font-medium text-gray-500">Not provided</p>
                  )}
                </div>
              </div>
            </div>

            {/* Container Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Container Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Container Type
                  </p>
                  <p className="font-medium text-gray-900">
                    {order.containerType}
                  </p>
                </div>
                {order.containerId && (
                  <div>
                    <p className="text-sm text-gray-600">Container ID</p>
                    <p className="font-medium text-gray-900">
                      {order.containerId}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium text-gray-900">
                    {order.quantity}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Delivery Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.deliveryOption && (
                  <div>
                    <p className="text-sm text-gray-600">
                      Delivery Option
                    </p>
                    <p className="font-medium text-gray-900 capitalize">
                      {order.deliveryOption}
                    </p>
                  </div>
                )}
                {order.deliveryDate && (
                  <div>
                    <p className="text-sm text-gray-600">Delivery Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(order.deliveryDate)}
                    </p>
                  </div>
                )}
                {order.deliveryAddress && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">
                      Delivery Address
                    </p>
                    <p className="font-medium text-gray-900">
                      {typeof order.deliveryAddress === 'string' 
                        ? order.deliveryAddress 
                        : `${order.deliveryAddress.city}, ${order.deliveryAddress.province}`}
                    </p>
                  </div>
                )}
                {order.city && (
                  <div>
                    <p className="text-sm text-gray-600">City</p>
                    <p className="font-medium text-gray-900">
                      {order.city}
                    </p>
                  </div>
                )}
                {order.province && (
                  <div>
                    <p className="text-sm text-gray-600">Province</p>
                    <p className="font-medium text-gray-900">
                      {order.province}
                    </p>
                  </div>
                )}
                {order.postalCode && (
                  <div>
                    <p className="text-sm text-gray-600">Postal Code</p>
                    <p className="font-medium text-gray-900">
                      {order.postalCode}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            {(order.assignedDriver ||
              order.specialRequirements) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.assignedDriver && (
                    <div>
                      <p className="text-sm text-gray-600">
                        Assigned Driver
                      </p>
                      <p className="font-medium text-gray-900">
                        {order.assignedDriver}
                      </p>
                    </div>
                  )}
                  {order.specialRequirements && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">
                        Special Requirements
                      </p>
                      <p className="font-medium text-gray-900">
                        {order.specialRequirements}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              {getCustomerPhone(order) && (
                <a
                  href={`tel:${getCustomerPhone(order)}`}
                  className="btn-primary flex-1 text-center"
                >
                  Call Customer
                </a>
              )}
              {getCustomerEmail(order) && (
                <a
                  href={`mailto:${getCustomerEmail(order)}`}
                  className="btn-secondary flex-1 text-center"
                >
                  Email Customer
                </a>
              )}
              <button
                onClick={onUpdateStatus}
                className="btn-secondary flex-1"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

