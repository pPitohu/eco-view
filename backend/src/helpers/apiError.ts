import { ResponseTexts } from '../constants/responseTexts'

export class ApiError extends Error {
  public status: number
  public errors: any[]

  constructor(status: number, message: string, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, ResponseTexts.PleaseAuthorize)
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors)
  }

  static ForbiddenRequest(message: string, errors = []) {
    return new ApiError(403, message, errors)
  }

  static NotFound(message: string, errors = []) {
    return new ApiError(404, message, errors)
  }

  static UnprocessableEntity(message: string, errors = []) {
    return new ApiError(422, message, errors)
  }
}
