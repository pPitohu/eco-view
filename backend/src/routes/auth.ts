import express from 'express'
import { AuthController } from '../controllers/auth'

const AuthRouter = express.Router()

AuthRouter.post('/register', AuthController.register)
AuthRouter.post('/login', AuthController.login)

export default AuthRouter
