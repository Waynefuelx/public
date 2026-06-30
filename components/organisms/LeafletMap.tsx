'use client'

import { useEffect } from 'react'
import { useLeafletMap, LeafletMapOptions } from '@/hooks/useLeafletMap'
import { Loader2 } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

interface LeafletMapProps {
  mapId: string
  height?: string
  className?: string
  options?: LeafletMapOptions
  onMapReady?: (map: any) => void
  children?: React.ReactNode
}

const LeafletMap = ({
  mapId,
  height = '400px',
  className = '',
  options,
  onMapReady,
  children,
}: LeafletMapProps) => {
  const { map, isMapLoaded } = useLeafletMap(mapId, options)

  // Inject custom styles for Leaflet
  useEffect(() => {
    const style = document.createElement('style')
    style.id = `leaflet-styles-${mapId}`
    style.textContent = `
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
      #${mapId} {
        height: ${height} !important;
        width: 100% !important;
        position: relative !important;
        z-index: 1 !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
      }
      .leaflet-popup-content {
        margin: 0 !important;
        padding: 0 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById(`leaflet-styles-${mapId}`)
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [mapId, height])

  // Call onMapReady when map is initialized
  useEffect(() => {
    if (map && isMapLoaded && onMapReady) {
      onMapReady(map)
    }
  }, [map, isMapLoaded, onMapReady])

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height }}>
      {/* Leaflet Map */}
      <div
        id={mapId}
        className="w-full h-full"
        style={{
          height,
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      ></div>

      {/* Overlay children (controls, legend, etc.) */}
      {children}

      {/* Loading State */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeafletMap

