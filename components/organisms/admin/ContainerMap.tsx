'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import LeafletMap from '@/components/organisms/LeafletMap'
import type { Container } from '@/lib/types/container'
import {
  formatDuration,
  calculateDaysSinceDelivery,
} from '@/lib/utils/admin-helpers'

interface ContainerMapProps {
  containers: Container[]
  onContainerSelect: (container: Container) => void
}

const ContainerMap = ({
  containers,
  onContainerSelect,
}: ContainerMapProps) => {
  const mapId = 'leaflet-map-container'
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  // Add container markers to map
  const addContainerMarkers = (mapInstance: any) => {
    if (!mapInstance || containers.length === 0) return

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      if (marker && marker.remove) {
        marker.remove()
      }
    })
    markersRef.current = []

    containers.forEach((container) => {
      // Create custom icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs" 
               style="background-color: ${
                 container.paymentStatus === 'paid'
                   ? '#10B981'
                   : container.paymentStatus === 'overdue'
                   ? '#EF4444'
                   : '#F59E0B'
               }">
            ${container.containerNumber.slice(-3)}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      // Create popup content
      const popupContent = `
        <div class="p-3 max-w-xs">
          <h3 class="font-semibold text-gray-900 mb-2">${
            container.containerNumber
          }</h3>
          <div class="space-y-1 text-sm">
            <p><strong>Customer:</strong> ${container.customerName}</p>
            <p><strong>Type:</strong> ${container.containerType}</p>
            <p><strong>Location:</strong> ${container.location.city}, ${
        container.location.province
      }</p>
            <p><strong>Duration:</strong> ${formatDuration(
              calculateDaysSinceDelivery(container.deliveryDate)
            )}</p>
            <p><strong>Status:</strong> <span class="px-2 py-1 rounded-full text-xs font-medium ${
              container.paymentStatus === 'paid'
                ? 'bg-green-100 text-green-800'
                : container.paymentStatus === 'overdue'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }">${container.paymentStatus}</span></p>
            ${
              container.totalOwed > 0
                ? `<p class="text-red-600 font-medium">Outstanding: R${container.totalOwed.toLocaleString()}</p>`
                : ''
            }
          </div>
          <button onclick="window.selectContainer('${
            container.id
          }')" class="mt-3 w-full bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
            View Details
          </button>
        </div>
      `

      const marker = L.marker(
        [container.location.lat, container.location.lng],
        {
          icon: customIcon,
        }
      ).addTo(mapInstance)

      marker.bindPopup(popupContent)
      markersRef.current.push(marker)
    })
  }

  // Update markers when containers change
  useEffect(() => {
    if (mapRef.current && containers.length > 0) {
      addContainerMarkers(mapRef.current)
    }
  }, [containers])

  // Global function for popup button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ;(window as any).selectContainer = (containerId: string) => {
        const container = containers.find((c) => c.id === containerId)
        if (container) {
          onContainerSelect(container)
        }
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).selectContainer
      }
    }
  }, [containers, onContainerSelect])

  return (
    <LeafletMap
      mapId={mapId}
      height="384px"
      onMapReady={(map) => {
        mapRef.current = map
        if (containers.length > 0) {
          setTimeout(() => {
            addContainerMarkers(map)
          }, 300)
        }
      }}
    >
      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-900">South Africa</h3>
        <p className="text-xs text-gray-600">Container Locations</p>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-lg max-w-xs">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Container Status
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0 shadow-sm"></div>
            <span className="text-xs text-gray-700">
              Paid - No outstanding balance
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0 shadow-sm"></div>
            <span className="text-xs text-gray-700">
              Overdue - Payment required
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0 shadow-sm"></div>
            <span className="text-xs text-gray-700">
              Pending - New rental
            </span>
          </div>
        </div>
      </div>

      {/* Container Count */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-95 rounded-lg px-3 py-2 shadow-lg">
        <div className="text-sm font-semibold text-gray-900">
          {containers.length}
        </div>
        <div className="text-xs text-gray-600">Containers</div>
      </div>
    </LeafletMap>
  )
}

export default ContainerMap
