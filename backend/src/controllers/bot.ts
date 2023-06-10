import { Request, Response } from 'express'
import { initialMessages, initialSuggestedMessages } from '../constants/botMessages'
import { StatusCodes } from '../constants/statusCodes'
import { handleError } from '../helpers/handleError'
import { BotService } from '../services/bot'

export class BotController {
  public static sendInitialMessages = async (req: Request, res: Response): Promise<Response> => {
    try {
      return res.status(StatusCodes.Ok).json({
        messages: initialMessages,
        suggestedMessages: initialSuggestedMessages
      })
    } catch (e) {
      handleError(res, e)
    }
  }

  public static handleRecievedMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { message, suggestedMessages } =
        await BotService.handleRecievedMessage(req.body.userMessage)
      return res.status(StatusCodes.Ok).json({
        message,
        suggestedMessages
      })
    } catch (e) {
      handleError(res, e)
    }
  }
}
