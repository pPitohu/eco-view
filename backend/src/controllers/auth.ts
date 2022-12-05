import { Request, Response } from 'express'
import { StatusCodes } from '../constants/statusCodes'
import { handleError } from '../helpers/handleError'
import { AuthService } from '../services/auth'

export class AuthController {
  public static register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await AuthService.register(req.body)
      return res.status(StatusCodes.Created).json({ user })
    } catch (e) {
      handleError(res, e)
    }
  }

  public static login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { token } = await AuthService.login(req.body)
      return res.status(200).json({ token })
    } catch (e) {
      handleError(res, e)
    }
  }
}
