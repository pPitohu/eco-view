import express from 'express'
import { UserRoles } from '../constants/userRoles'
import { UserController } from '../controllers/user'
import { authorize } from '../middlewares/authorize'
import { validate } from '../middlewares/validate'
import { loginSchema, registerSchema, updateSchema } from '../validations/userValidation'

const UserRouter = express.Router()

UserRouter.post('/register', validate(registerSchema), UserController.register)
UserRouter.post('/login', validate(loginSchema), UserController.login)
UserRouter.get('/me', authorize([ UserRoles.USER, UserRoles.ADMIN ]), UserController.getMe)
UserRouter.put('/image', authorize([ UserRoles.USER, UserRoles.ADMIN ]), UserController.updateImage)
UserRouter.put('/credentials', validate(updateSchema), authorize([ UserRoles.USER, UserRoles.ADMIN ]), UserController.updateCredentials)

export default UserRouter
