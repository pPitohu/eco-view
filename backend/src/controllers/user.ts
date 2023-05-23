import { Request, Response } from 'express'
import { StatusCodes } from '../constants/statusCodes'
import { handleError } from '../helpers/handleError'
import { UserService } from '../services/user'

export class UserController {
  public static register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = await UserService.register(req.body)
      return res.status(StatusCodes.Created).json(token)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userCredentials = await UserService.login(req.body)
      return res.status(StatusCodes.Ok).json(userCredentials)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static getMe = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = await UserService.getMe(req.body.user)
      return res.status(StatusCodes.Ok).json(token)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static updateImage = async (req: Request, res: Response): Promise<Response> => {
    try {
      const imageData = await UserService.updateImage(req.body.user, (req as any).files.image)
      return res.status(StatusCodes.Ok).json(imageData)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static updateCredentials = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = await UserService.updateCredentials(req.body)
      return res.status(StatusCodes.Ok).json(token)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static sendResetMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await UserService.sendResetMessage(req.body)
      return res.status(StatusCodes.Ok).json(response)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static resetPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
      await UserService.resetPassword(req.body)
      return res.status(StatusCodes.Ok).json()
    } catch (e) {
      handleError(res, e)
    }
  }
}
