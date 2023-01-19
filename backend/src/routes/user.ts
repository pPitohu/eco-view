import express from 'express'
import { UserRoles } from '../constants/userRoles'
import { UserController } from '../controllers/user'
import { authorize } from '../middlewares/authorize'
import { validate } from '../middlewares/validate'
import { loginSchema, registerSchema } from '../validations/userValidation'

const UserRouter = express.Router()

UserRouter.post('/register', validate(registerSchema), UserController.register)
UserRouter.post('/login', validate(loginSchema), UserController.login)
UserRouter.get('/me', authorize([ UserRoles.USER, UserRoles.ADMIN ]), UserController.getMe)

export default UserRouter
