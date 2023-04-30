import { Request, Response } from 'express'
import { initialMessages } from '../constants/botMessages'
import { StatusCodes } from '../constants/statusCodes'
import { handleError } from '../helpers/handleError'

export class BotController {
  public static sendInitialMessages = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(StatusCodes.Ok).json(initialMessages)
    } catch (e) {
      handleError(res, e)
    }
  }

  public static handleRecievedMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(StatusCodes.Ok)
    } catch (e) {
      handleError(res, e)
    }
  }
}
