import { instance } from '@/utils/axios/instance'
import type { MarkerData } from './types'

export const MapService = {
  loadMarkers: async () => {
    try {
      const response = await instance.get('/map/markers/all')
      return response
    } catch (error) {
      return error.response
    }
  },
  addMarker: async (markerData: MarkerData) => {
    try {
      const response = await instance.post('/map/markers/add', { markerData })
      return response
    } catch (error) {
      return error.response
    }
  }
}
