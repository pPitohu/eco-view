import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { ResponseTexts } from '../constants/responseTexts'
import { StatusCodes } from '../constants/statusCodes'
import { UserRoles } from '../constants/userRoles'
import User from '../models/User'

export const authorize = (roles: UserRoles[]) => 
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    try {
      const token = authorization && authorization.substring('Bearer '.length)

      if (!token) {
        return res.status(StatusCodes.Unauthorized).send(ResponseTexts.PleaseAuthorize)
      }
    
      const decrypt = verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decrypt.id)
      req.body.user = user

      if (user.role === UserRoles.ADMIN) return next()
      if (!roles.includes(user.role)) {
        return res.status(StatusCodes.Unauthorized).send(ResponseTexts.PleaseAuthorize)
      }
    
      next()
    } catch (error) {
      console.log(error)
      return res.status(StatusCodes.ServerError).json(ResponseTexts.ServerError)
    }
  }
