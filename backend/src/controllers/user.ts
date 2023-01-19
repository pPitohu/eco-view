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
}
