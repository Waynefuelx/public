"use client";

import { motion } from "framer-motion";
import {
  formatDate,
  getDeliveryStatusLabel,
  getDeliveryStatusColor,
} from "@/lib/utils/admin-helpers";

interface Delivery {
  id: string | number;
  containerNumber: string;
  containerType: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  driverName: string;
  driverPhone?: string;
  scheduledDeliveryDate: string;
  status: number | string;
  deliveryAddress?: string;
  city?: string;
  deliveryProvince?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  serialNumber?: string;
  notes?: string;
}

interface DeliveryDetailModalProps {
  delivery: Delivery | null;
  onClose: () => void;
  scannedSerialNumber: string;
  onSerialNumberChange: (value: string) => void;
  onScanQR: () => void;
  onVerifySerialNumber: (deliveryId: string, serialNumber: string) => void;
  onNavigate: (lat: number, lng: number, address: string) => void;
  statusMap: Map<number, string>;
}

export default function DeliveryDetailModal({
  delivery,
  onClose,
  scannedSerialNumber,
  onSerialNumberChange,
  onScanQR,
  onVerifySerialNumber,
  onNavigate,
  statusMap,
}: DeliveryDetailModalProps) {
  if (!delivery) return null;

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
              Delivery Details
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
            {/* Delivery Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Delivery Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Container Number
                  </p>
                  <p className="font-medium text-gray-900">
                    {delivery.containerNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Container Type
                  </p>
                  <p className="font-medium text-gray-900">
                    {delivery.containerType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Scheduled Date
                  </p>
                  <p className="font-medium text-gray-900">
                    {formatDate(delivery.scheduledDeliveryDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliveryStatusColor(
                      delivery.status,
                      statusMap
                    )}`}
                  >
                    {getDeliveryStatusLabel(delivery.status, statusMap)}
                  </span>
                </div>
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
                    {delivery.customerName}
                  </p>
                </div>
                {delivery.customerEmail && (
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a
                      href={`mailto:${delivery.customerEmail}`}
                      className="font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                      title={`Click to email ${delivery.customerEmail}`}
                    >
                      {delivery.customerEmail}
                    </a>
                  </div>
                )}
                {delivery.customerPhone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a
                      href={`tel:${delivery.customerPhone}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {delivery.customerPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Driver Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Driver Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Driver Name</p>
                  <p className="font-medium text-gray-900">
                    {delivery.driverName}
                  </p>
                </div>
                {delivery.driverPhone && (
                  <div>
                    <p className="text-sm text-gray-600">Driver Phone</p>
                    <a
                      href={`tel:${delivery.driverPhone}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {delivery.driverPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Location Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Delivery Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {delivery.deliveryAddress && (
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">
                      {delivery.deliveryAddress}
                    </p>
                  </div>
                )}
                {(delivery.city || delivery.deliveryProvince) && (
                  <div>
                    <p className="text-sm text-gray-600">
                      City & Province
                    </p>
                    <p className="font-medium text-gray-900">
                      {delivery.city}
                      {delivery.deliveryProvince &&
                        `, ${delivery.deliveryProvince}`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Serial Number Verification */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Container Verification
              </h3>
              <div className="space-y-4">
                {delivery.serialNumber && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Expected Serial Number
                    </p>
                    <p className="font-medium text-gray-900 bg-gray-50 p-2 rounded">
                      {delivery.serialNumber}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Enter or Scan Serial Number
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={scannedSerialNumber}
                      onChange={(e) => onSerialNumberChange(e.target.value)}
                      placeholder="Enter serial number or scan QR code"
                      className="input-field flex-1"
                    />
                    <button
                      onClick={onScanQR}
                      className="btn-secondary"
                    >
                      Scan QR
                    </button>
                  </div>
                </div>

                {scannedSerialNumber && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onVerifySerialNumber(String(delivery.id), scannedSerialNumber)
                      }
                      className="btn-primary flex-1"
                    >
                      Verify & Complete Delivery
                    </button>
                    <button
                      onClick={() => onSerialNumberChange("")}
                      className="btn-secondary"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {delivery.notes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Delivery Notes
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">
                  {delivery.notes}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              {delivery.customerPhone && (
                <a
                  href={`tel:${delivery.customerPhone}`}
                  className="btn-primary flex-1 text-center"
                >
                  Call Customer
                </a>
              )}
              {delivery.coordinates && (
                <button
                  onClick={() => {
                    if (delivery.coordinates) {
                      onNavigate(
                        delivery.coordinates.lat,
                        delivery.coordinates.lng,
                        delivery.deliveryAddress || ""
                      );
                    }
                  }}
                  className="btn-secondary flex-1"
                >
                  Navigate to Location
                </button>
              )}
              <button
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

