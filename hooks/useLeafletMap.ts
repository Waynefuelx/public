import { useEffect, useState, useRef } from 'react'
import L from 'leaflet'

export interface LeafletMapOptions {
  center?: [number, number]
  zoom?: number
  zoomControl?: boolean
  scrollWheelZoom?: boolean
  doubleClickZoom?: boolean
  boxZoom?: boolean
  keyboard?: boolean
  dragging?: boolean
  touchZoom?: boolean
  attributionControl?: boolean
  tileLayerUrl?: string
  tileLayerOptions?: {
    maxZoom?: number
    attribution?: string
  }
}

const DEFAULT_OPTIONS: LeafletMapOptions = {
  center: [-30.5595, 22.9375], // Center of South Africa
  zoom: 6,
  zoomControl: true,
  scrollWheelZoom: true,
  doubleClickZoom: true,
  boxZoom: true,
  keyboard: true,
  dragging: true,
  touchZoom: true,
  attributionControl: false,
  tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileLayerOptions: {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors',
  },
}

export const useLeafletMap = (
  mapId: string,
  options: LeafletMapOptions = {}
) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const mapOptions = { ...DEFAULT_OPTIONS, ...options }

  // Initialize map when component mounts
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mapElement = document.getElementById(mapId)
    if (mapElement && !mapRef.current) {
      // Clear any existing map
      if ((mapElement as any)._leaflet_id) {
        try {
          const existingMapId = (mapElement as any)._leaflet_id
          const existingMap = (L as any).Map._instances?.[existingMapId] as L.Map | undefined
          if (existingMap && typeof existingMap.remove === 'function') {
            existingMap.remove()
          }
        } catch (error) {
          console.warn('Existing map cleanup warning:', error)
        }
        delete (mapElement as any)._leaflet_id
      }

      mapElement.innerHTML = ''

      const newMap = L.map(mapId, {
        center: mapOptions.center,
        zoom: mapOptions.zoom,
        zoomControl: mapOptions.zoomControl,
        scrollWheelZoom: mapOptions.scrollWheelZoom,
        doubleClickZoom: mapOptions.doubleClickZoom,
        boxZoom: mapOptions.boxZoom,
        keyboard: mapOptions.keyboard,
        dragging: mapOptions.dragging,
        touchZoom: mapOptions.touchZoom,
        attributionControl: mapOptions.attributionControl,
      })

      // Add tile layer
      L.tileLayer(mapOptions.tileLayerUrl!, {
        maxZoom: mapOptions.tileLayerOptions?.maxZoom,
        attribution: mapOptions.tileLayerOptions?.attribution,
      }).addTo(newMap)

      mapRef.current = newMap
      setIsMapLoaded(true)

      // Invalidate size after a delay
      setTimeout(() => {
        if (newMap && typeof newMap.invalidateSize === 'function') {
          newMap.invalidateSize()
        }
      }, 200)
    }
  }, [mapId])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current && typeof mapRef.current.invalidateSize === 'function') {
        mapRef.current.invalidateSize(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Add marker helper
  const addMarker = (
    lat: number,
    lng: number,
    options?: {
      icon?: L.Icon | L.DivIcon
      popup?: string
      onClick?: () => void
    }
  ) => {
    if (!mapRef.current || !isMapLoaded) {
      return null
    }

    const marker = L.marker([lat, lng], {
      icon: options?.icon,
    }).addTo(mapRef.current)

    if (options?.popup) {
      marker.bindPopup(options.popup)
    }

    if (options?.onClick) {
      marker.on('click', options.onClick)
    }

    markersRef.current.push(marker)
    return marker
  }

  // Clear all markers
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => {
      if (marker && marker.remove) {
        marker.remove()
      }
    })
    markersRef.current = []
  }

  // Fit bounds to show all markers
  const fitBounds = () => {
    if (!mapRef.current || markersRef.current.length === 0) return

    const bounds = L.latLngBounds(
      markersRef.current.map((marker) => marker.getLatLng())
    )
    mapRef.current.fitBounds(bounds)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearMarkers()
      if (mapRef.current) {
        try {
          mapRef.current.remove()
        } catch (error) {
          console.warn('Map removal warning:', error)
        }
        mapRef.current = null
      }
    }
  }, [])

  return {
    map: mapRef.current,
    isMapLoaded,
    addMarker,
    clearMarkers,
    fitBounds,
  }
}
