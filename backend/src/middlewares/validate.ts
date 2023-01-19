import { NextFunction, Request, Response } from 'express'
import { AnySchema } from 'yup'
import { ResponseTexts } from '../constants/responseTexts'
import { StatusCodes } from '../constants/statusCodes'

export const validate = (schema: AnySchema) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body)
      next()
    } catch (error) {
      console.log(error)
      return res.status(StatusCodes.BadRequest).json(ResponseTexts.DataIsInvalid)
    }
  }
