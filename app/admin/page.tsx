"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import DeliveryCalendar from "@/components/DeliveryCalendar";
import AdminTabs from "@/components/organisms/admin/AdminTabs";
import DashboardTab from "@/components/organisms/admin/DashboardTab";
import OrdersTab from "@/components/organisms/admin/OrdersTab";
import LeadsTab from "@/components/organisms/admin/LeadsTab";
import ContainersTab from "@/components/organisms/admin/ContainersTab";
import DriversTab from "@/components/organisms/admin/DriversTab";
import ReportsTab from "@/components/organisms/admin/ReportsTab";
import DeliveryDetailModal from "@/components/organisms/admin/DeliveryDetailModal";
import QRScannerModal from "@/components/organisms/admin/QRScannerModal";
import ContainerDetailModal from "@/components/organisms/admin/ContainerDetailModal";
import OrderDetailModal from "@/components/organisms/admin/OrderDetailModal";
import StatusUpdateModal from "@/components/organisms/admin/StatusUpdateModal";
import {
  useAdminOrders,
  useAdminLeads,
  useActiveDeliveries,
  useUpdateOrderStatus,
  useOrderStatusEnum,
  useLeadStatusEnum,
  useOrderTypeEnum,
} from "@/lib/api/hooks";
import type {
  Order as ApiOrder,
  Lead as ApiLead,
  ActiveDeliverySummaryDto,
} from "@/lib/api/services";
import { adminApi } from "@/lib/api/services";
import {
  Users,
  Truck,
  Calendar,
  BarChart3,
  FileText,
  Plus,
  Navigation,
  UserCog,
} from "lucide-react";

// Use Order type from API services
type Order = ApiOrder;

// Use ActiveDeliverySummaryDto from API for active deliveries
// Extend with optional fields for UI compatibility
interface Delivery extends ActiveDeliverySummaryDto {
  coordinates?: {
    lat: number;
    lng: number;
  };
  serialNumber?: string;
  qrCode?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryAddress?: string;
  deliveryProvince?: string;
  driverPhone?: string;
  notes?: string;
  orderId?: string;
}


interface Tab {
  id: string;
  label: string;
  icon: any;
  notificationCount: number;
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(
    null
  );
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedSerialNumber, setScannedSerialNumber] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);

  // React Query hooks - kept for modals and other functions
  const {
    data: ordersData = [],
  } = useAdminOrders();
  const { data: deliveriesData = [] } = useActiveDeliveries();
  const updateOrderStatusMutation = useUpdateOrderStatus();
  const { data: orderStatusEnumData = [] } = useOrderStatusEnum();
  const { data: leadStatusEnumData = [] } = useLeadStatusEnum();
  const { data: orderTypeEnumData = [] } = useOrderTypeEnum();

  // Create a map of status number to label from enum data for order status
  const statusMap = useMemo(() => {
    const map = new Map<number, string>();
    orderStatusEnumData.forEach((option) => {
      const key =
        typeof option.key === "string" ? parseInt(option.key, 10) : option.key;
      if (!isNaN(key)) {
        map.set(key, option.value);
      }
    });
    return map;
  }, [orderStatusEnumData]);

  // Create a map of status number to label from enum data for lead status
  const leadStatusMap = useMemo(() => {
    const map = new Map<number, string>();
    leadStatusEnumData.forEach((option) => {
      const key =
        typeof option.key === "string" ? parseInt(option.key, 10) : option.key;
      if (!isNaN(key)) {
        map.set(key, option.value);
      }
    });
    return map;
  }, [leadStatusEnumData]);

  // Create a map of order type number to label from enum data
  const orderTypeMap = useMemo(() => {
    const map = new Map<number, string>();
    orderTypeEnumData.forEach((option) => {
      const key =
        typeof option.key === "string" ? parseInt(option.key, 10) : option.key;
      if (!isNaN(key)) {
        map.set(key, option.value);
      }
    });
    return map;
  }, [orderTypeEnumData]);

  // Get order status label from enum map
  const getOrderStatusLabel = (status: number | string): string => {
    const statusNum = typeof status === "string" ? parseInt(status, 10) : status;
    if (statusMap.has(statusNum)) {
      return statusMap.get(statusNum)!;
    }
    return "unknown";
  };

  // Get order status number from label (reverse map)
  const getOrderStatusNumber = (statusLabel: string): number | null => {
    const normalizedLabel = statusLabel.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
    const entries = Array.from(statusMap.entries());
    for (const [key, value] of entries) {
      const normalizedValue = value.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
      if (normalizedValue === normalizedLabel) {
        return key;
      }
    }
    return null;
  };

  // Get order type label from enum map
  const getOrderTypeLabel = (order: Order): string => {
    // First check if there's a numeric type field
    if (order.type !== undefined && order.type !== null) {
      const typeNum = typeof order.type === "string" ? parseInt(order.type, 10) : order.type;
      if (!isNaN(typeNum) && orderTypeMap.has(typeNum)) {
        return orderTypeMap.get(typeNum)!;
      }
    }
    // Fall back to orderType string field if it exists
    if (order.orderType && (order.orderType === 'purchase' || order.orderType === 'rental')) {
      return order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1);
    }
    return "unknown";
  };

  // Helper functions to extract customer data from either flat or nested structure
  const getCustomerName = (order: Order): string => {
    return order.customerName || order.customer?.name || '';
  };

  const getCustomerEmail = (order: Order): string => {
    return order.customerEmail || order.customer?.email || '';
  };

  const getCustomerPhone = (order: Order): string => {
    return order.customerPhone || order.customer?.phoneNumber || '';
  };

  const getCustomerCompany = (order: Order): string | undefined => {
    return order.company || order.customer?.company || undefined;
  };

  // Use API data or fallback to empty arrays - kept for modals and other functions
  const orders = ordersData || [];
  const deliveries: Delivery[] = (deliveriesData || []) as Delivery[];
  const newOrderCount = orders.filter((order) => order.isNew === true).length;
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      orderId: string;
      customerEmail: string;
      message: string;
      type: "order_confirmed" | "delivery_started";
      trackingNumber?: string;
      timestamp: string;
    }>
  >([
    {
      id: `notif_${Date.now()}`,
      orderId: "ORD-0001",
      customerEmail: "zandre@pakwe.co.za",
      message: `Your container is on its way! Tracking number: 123`,
      type: "order_confirmed",
      trackingNumber: "123",
      timestamp: new Date().toISOString(),
    },
  ]);


  // Add custom admin page styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  // Function to mark order as viewed
  // Note: This would need an API endpoint to mark orders as viewed
  // For now, React Query will refetch orders and update the UI
  const markOrderAsViewed = (orderId: string) => {
    // TODO: Implement API call to mark order as viewed when endpoint is available
    // For now, the data will be refetched by React Query
    console.log("Marking order as viewed:", orderId);
  };

  // Function to generate tracking number
  const generateTrackingNumber = () => {
    const prefix = "VC";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  // Function to send customer notification
  const sendCustomerNotification = (
    order: Order,
    type: "order_confirmed" | "delivery_started",
    trackingNumber?: string
  ) => {
    const customerEmail = getCustomerEmail(order);
    const orderNumber = order.orderNumber || String(order.id);
    const notification = {
      id: `notif_${Date.now()}`,
      orderId: String(order.id),
      customerEmail: customerEmail,
      message:
        type === "order_confirmed"
          ? `Your order ${orderNumber} has been confirmed and we're preparing your container for delivery.`
          : `Your container is on its way! Tracking number: ${trackingNumber}`,
      type,
      trackingNumber,
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [notification, ...prev]);

    // In a real app, this would send an email/SMS to the customer
    console.log(
      `Notification sent to ${customerEmail}:`,
      notification.message
    );
  };

  // Function to update order status
  const updateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"],
    trackingNumber?: string
  ) => {
    try {
      // Convert status to number - if it's already a number, use it; otherwise map from label
      let statusNumber: number;
      if (typeof newStatus === 'number') {
        statusNumber = newStatus;
      } else {
        const mappedStatus = getOrderStatusNumber(newStatus);
        if (mappedStatus === null) {
          console.error(`Could not map status "${newStatus}" to a number`);
          return;
        }
        statusNumber = mappedStatus;
      }
      
      await updateOrderStatusMutation.mutateAsync({
        orderId,
        status: statusNumber,
      });

      // Find the order to send notification
      const order = orders.find((o) => String(o.id) === orderId);
      if (order) {
        const updatedOrder = { ...order, status: newStatus };

        // Send notification to customer
        if (newStatus === "confirmed") {
          sendCustomerNotification(updatedOrder, "order_confirmed");
        } else if (newStatus === "in-transit" && trackingNumber) {
          sendCustomerNotification(
            updatedOrder,
            "delivery_started",
            trackingNumber
          );
        }
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Function to start delivery process
  const startDeliveryProcess = (order: Order) => {
    const trackingNumber = generateTrackingNumber();
    updateOrderStatus(String(order.id), "in-transit", trackingNumber);

    // Move order to drivers tab by creating a delivery entry
    const newDelivery: Delivery = {
      id: `D${String(deliveries.length + 1).padStart(3, "0")}`,
      containerNumber: `TS-${(order.containerId || '').toUpperCase()}`,
      containerSize: order.containerSize || order.containerType, // Map containerType to containerSize
      containerType: order.containerType,
      customerName: getCustomerName(order),
      city: order.city || "",
      driverName: "Unassigned",
      scheduledDeliveryDate: order.deliveryDate,
      status: 0, // 0 = pending
      locationHistory: [],
      // Additional optional fields
      customerPhone: getCustomerPhone(order),
      customerEmail: getCustomerEmail(order),
      deliveryAddress: typeof order.deliveryAddress === 'string' 
        ? order.deliveryAddress 
        : order.deliveryAddress 
          ? `${order.deliveryAddress.city}, ${order.deliveryAddress.province}`
          : "",
      deliveryProvince: order.province || "",
      coordinates: {
        lat: -33.9715, // Default coordinates - in real app would geocode address
        lng: 22.4617,
      },
      driverPhone: "",
      notes: order.specialRequirements || "",
      serialNumber: trackingNumber,
      qrCode: `${trackingNumber}-QR`,
    };

    // Note: Deliveries are now managed by React Query
    // The new delivery should be created via API endpoint
    // For now, React Query will refetch deliveries and update the UI
    // TODO: Implement API call to create delivery when endpoint is available
    console.log("New delivery created:", newDelivery);

    console.log("New delivery created and added to drivers:", newDelivery);

    // Show success message
    alert(
      `Delivery started successfully!\n\nTracking Number: ${trackingNumber}\n\nOrder ${order.id} has been moved to the Drivers tab for assignment.`
    );

    setShowStatusUpdateModal(false);
    setOrderToUpdate(null);
  };

  const openGoogleMapsNavigation = (
    lat: number,
    lng: number,
  ) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, "_blank");
  };

  const handleSerialNumberSubmit = (
    deliveryId: string,
    serialNumber: string
  ) => {
    // In a real app, this would update the delivery status
    console.log(`Delivery ${deliveryId} serial number: ${serialNumber}`);
    setScannedSerialNumber("");
    // Update delivery status to delivered
    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.id === deliveryId
        ? { ...delivery, status: "delivered" as const }
        : delivery
    );
    // In real app, you'd update the state or make an API call
  };


  const tabs: Tab[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      notificationCount: 0,
    },
    {
      id: "containers",
      label: "View All Containers",
      icon: Navigation,
      notificationCount: 0,
    },
    { id: "drivers", label: "Drivers", icon: Truck, notificationCount: 0 },
    {
      id: "leads",
      label: "Lead Management",
      icon: Users,
      notificationCount: 0,
    },
    {
      id: "orders",
      label: "Orders",
      icon: Truck,
      notificationCount: newOrderCount,
    },
    { id: "calendar", label: "Calendar", icon: Calendar, notificationCount: 0 },
    { id: "reports", label: "Reports", icon: FileText, notificationCount: 0 },
    { id: "users", label: "Users", icon: UserCog, notificationCount: 0 },
  ];

  return (
    <ProtectedRoute allowedTypes={["admin"]}>
      <div className="min-h-screen bg-secondary-200">
        {/* Admin Header - Fixed positioning to avoid conflicts with main nav */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:h-16 gap-4 sm:gap-0">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-600 truncate">
                  Topshell Container Rentals Staff Portal
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <button
                  onClick={() => (window.location.href = "/admin/new-lead")}
                  className="btn-primary text-sm flex items-center flex-wrap"
                >
                  <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="whitespace-nowrap">New Lead</span>
                </button>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdminTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => {
              if (tabId === "users") {
                // Navigate to users page
                window.location.href = "/admin/users";
                return;
              }
              setActiveTab(tabId);
              if (tabId === "orders") {
                // Mark all orders as viewed when opening orders tab
                // Note: This would need an API endpoint to mark all orders as viewed
                // For now, React Query will refetch orders and update the UI
                // TODO: Implement API call when endpoint is available
              }
            }}
          />

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && <DashboardTab />}

          {/* Containers Tab */}
          {activeTab === "containers" && (
            <ContainersTab
              onViewContainer={(container) => setSelectedContainerId(String(container.id))}
            />
          )}

          {/* Drivers Tab */}
          {activeTab === "drivers" && (
            <DriversTab
              onNavigate={openGoogleMapsNavigation}
              onViewDetails={(delivery) => setSelectedDelivery(delivery)}
            />
          )}

          {/* Leads Tab */}
          {activeTab === "leads" && <LeadsTab />}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <OrdersTab
              onViewDetails={(order) => {
                setSelectedOrder(order);
                markOrderAsViewed(String(order.id));
              }}
              onUpdateStatus={(order) => {
                setOrderToUpdate(order);
                setShowStatusUpdateModal(true);
              }}
            />
          )}

          {/* Calendar Tab */}
          {activeTab === "calendar" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <DeliveryCalendar />
            </motion.div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && <ReportsTab />}

          {/* Delivery Detail Modal */}
          <DeliveryDetailModal
            delivery={selectedDelivery}
            onClose={() => setSelectedDelivery(null)}
            scannedSerialNumber={scannedSerialNumber}
            onSerialNumberChange={setScannedSerialNumber}
            onScanQR={() => setShowQRScanner(true)}
            onVerifySerialNumber={handleSerialNumberSubmit}
            onNavigate={openGoogleMapsNavigation}
            statusMap={statusMap}
          />

          {/* QR Scanner Modal */}
          <QRScannerModal
            isOpen={showQRScanner}
            onClose={() => setShowQRScanner(false)}
            onSimulateScan={() => {
              setScannedSerialNumber("TS20001-2024-QR");
              setShowQRScanner(false);
            }}
          />

          {/* Container Detail Modal */}
          <ContainerDetailModal
            containerId={selectedContainerId}
            onClose={() => setSelectedContainerId(null)}
            onUpdateStatus={async (orderId) => {
              // Try to find order in existing orders array first
              let order = orders.find((o) => String(o.id) === orderId);
              
              // If not found, fetch it from the API
              if (!order) {
                try {
                  const fetchedOrder = await adminApi.getOrder(orderId);
                  order = fetchedOrder as Order;
                } catch (error) {
                  console.error("Error fetching order:", error);
                  return;
                }
              }
              
              if (order) {
                setOrderToUpdate(order);
                setShowStatusUpdateModal(true);
                setSelectedContainerId(null);
              }
            }}
          />

          {/* Order Detail Modal */}
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onUpdateStatus={() => {
              setOrderToUpdate(selectedOrder);
              setShowStatusUpdateModal(true);
              setSelectedOrder(null);
            }}
            statusMap={statusMap}
            orderTypeMap={orderTypeMap}
          />

          {/* Status Update Modal */}
          <StatusUpdateModal
            isOpen={showStatusUpdateModal}
            order={orderToUpdate}
            onClose={() => {
              setShowStatusUpdateModal(false);
              setOrderToUpdate(null);
            }}
            onConfirmOrder={(orderId) => {
              updateOrderStatus(orderId, "confirmed");
              setShowStatusUpdateModal(false);
              setOrderToUpdate(null);
            }}
            onStartDelivery={startDeliveryProcess}
            onMarkDelivered={(orderId) => {
              updateOrderStatus(orderId, "delivered");
              setShowStatusUpdateModal(false);
              setOrderToUpdate(null);
            }}
            statusMap={statusMap}
            notifications={notifications}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
