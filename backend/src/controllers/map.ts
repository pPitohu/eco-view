import { Request, Response } from 'express'
import { StatusCodes } from '../constants/statusCodes'
import { UserRoles } from '../constants/userRoles'
import { handleError } from '../helpers/handleError'
import { MapService } from '../services/map'

export class MapController {
  public static getAllMarkers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const isAdmin = req.body.user.role === UserRoles.ADMIN
      const markers = await MapService.getAllMarkers(isAdmin, req.body.user.email)
      return res.status(StatusCodes.Ok).json(markers)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static addMarker = async (req: Request, res: Response): Promise<Response> => {
    try {
      const isAdmin = req.body.user.role === UserRoles.ADMIN
      const markers = await MapService.addMarker(req.body.markerData, isAdmin)
      return res.status(StatusCodes.Created).json(markers)
    } catch (e) {
      handleError(res, e)
    }
  }
}
