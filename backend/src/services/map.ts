import Marker from '../models/Marker'

enum ResponseTexts {
  UserEmailAlreadyExists = 'Пользователь с таким email уже существует',
  UserUsernameAlreadyExists = 'Пользователь с таким логином уже существует',
  UnknownError = 'Неизвестная ошибка',
  UserNotFound = 'Пользователь не найден',
  PasswordIsInvalid = 'Неверный пароль',
  InvalidData = 'Неверные данные'
}

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
