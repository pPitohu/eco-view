import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { StatusCodes } from '../constants/statusCodes'
import { UserRoles } from '../constants/userRoles'
import { handleError } from '../helpers/handleError'
import User from '../models/User'
import { MapService } from '../services/map'

export class MapController {
  public static getAllMarkers = async (req: Request, res: Response): Promise<Response> => {
    let user
    try {
      const { authorization } = req.headers
      const token = authorization && authorization.substring('Bearer '.length)
      if (token) {
        const decrypt: any = verify(token, process.env.JWT_SECRET)
        user = await User.findById(decrypt._id)
      }
      const isAdmin = user?.role === UserRoles.ADMIN
      const markers = await MapService.getAllMarkers(isAdmin, user?.email)
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

  public static approveMarker = async (req: Request, res: Response): Promise<Response> => {
    try {
      const marker = await MapService.approveMarker(req.body.markerId)
      return res.status(StatusCodes.Ok).json(marker)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static deleteMarker = async (req: Request, res: Response): Promise<Response> => {
    try {
      await MapService.deleteMarker(req.body.markerId)
      return res.status(StatusCodes.Delete).json()
    } catch (e) {
      handleError(res, e)
    }
  }
}
