import express from 'express'
import { UserRoles } from '../constants/userRoles'
import { BotController } from '../controllers/bot'
import { authorize } from '../middlewares/authorize'

const BotRouter = express.Router()

BotRouter.get('/messages/initial', authorize([ UserRoles.USER, UserRoles.ADMIN ]), BotController.sendInitialMessages)
BotRouter.post('/messages', authorize([ UserRoles.USER, UserRoles.ADMIN ]), BotController.handleRecievedMessage)

export default BotRouter
