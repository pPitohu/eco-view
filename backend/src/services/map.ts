import Marker from '../models/Marker'

export class MapService {
  public static getAllMarkers = async (isAdmin?: boolean, email?: string) => {
    const markersFilter = isAdmin ? {} : {
      $or: [{ approvalStatus: 'approved' }, { author: email }]
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

  public static approveMarker = async (markerId: string) => {
    const marker = await Marker.findById(markerId)
    marker.approvalStatus = 'approved'
    await marker.save()
    return marker
  }

  public static deleteMarker = async (markerId: string) => {
    return await Marker.deleteOne({ _id: markerId })
  }
} 
