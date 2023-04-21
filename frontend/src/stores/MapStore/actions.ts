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
  }
}

export default actions
