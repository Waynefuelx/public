"use client";

import { motion } from "framer-motion";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateScan: () => void;
}

export default function QRScannerModal({
  isOpen,
  onClose,
  onSimulateScan,
}: QRScannerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-md w-full p-6"
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Scan QR Code
          </h3>
          <div className="bg-gray-100 rounded-lg p-8 mb-4">
            <div className="text-gray-500 text-sm">
              QR Scanner Placeholder
              <br />
              (In real app, integrate with camera API)
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              onClick={onSimulateScan}
              className="btn-primary flex-1"
            >
              Simulate Scan
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

