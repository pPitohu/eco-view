import { useMapStore } from '.'
import { MapService } from '@/services/MapService'
import type { MarkerData } from '@/services/MapService/types'
import { handleResponse } from '@/utils/axios/handleResponse'
import type { Marker } from './types'

const actions = {
  loadMarkers: async () => {
    const mapStore = useMapStore()
    const response = await MapService.loadMarkers()

    const handleSuccessStatus = (markers: Marker[]) => {
      mapStore.markers = markers
      mapStore.modifyMarkers()
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })
  },

  addMarker: async (markerData: MarkerData) => {
    const mapStore = useMapStore()
    const response = await MapService.addMarker(markerData)

    const handleSuccessStatus = (marker: Marker) => {
      const modifiedMarker = mapStore.modifyMarker(marker)
      mapStore.markers.push(modifiedMarker)
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 201
    })
  },

  approveMarker: async (marker: Marker) => {
    const mapStore = useMapStore()
    mapStore.isApprovingMarker = true
    const response = await MapService.approveMarker(marker._id)

    const handleSuccessStatus = (newMarker: Marker) => {
      const markerToUpdate = mapStore.markers.find(m => m._id === marker._id)
      if (markerToUpdate) {
        const modifiedMarker = mapStore.modifyMarker(newMarker)
        Object.assign(markerToUpdate, modifiedMarker)
      }
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })

    mapStore.isApprovingMarker = false
  },

  deleteMarker: async (marker: Marker) => {
    const mapStore = useMapStore()
    mapStore.isDeletingMarker = true
    const response = await MapService.deleteMarker(marker._id)

    const handleSuccessStatus = () => {
      mapStore.markers = mapStore.markers.filter(m => m._id !== marker._id)
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 204
    })

    mapStore.isDeletingMarker = false
  }
}

export default actions
