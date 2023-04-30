import Marker from '../models/Marker'

export class MapService {
  public static getAllMarkers = async (isAdmin: boolean, email: string) => {
    const markersFilter = isAdmin ? {} : {
      $or: [{ status: 'approved' }, { author: email }]
    }
    const markers = await Marker.find(markersFilter)

    return markers
  }

  public static addMarker = async (markerData, isAdmin: boolean) => {
    const marker = await Marker.create({
      ...markerData,
      approvalStatus: isAdmin ? 'approved' : 'pending'
    })

    return marker
  }
} 
