import { ResponseTexts } from '../constants/responseTexts'
import { StatusCodes } from '../constants/statusCodes'
import { ApiError } from './apiError'

export const handleError = (res, error) => {
  console.log(error)
  if (error instanceof ApiError) {
    return res
      .status(error.status)
      .json(error.message)
  }
  res.status(StatusCodes.ServerError).send(ResponseTexts.ServerError)
}
