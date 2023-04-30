import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import express, { Application, NextFunction, Request, Response, Router } from 'express'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import BotRouter from './routes/bot'
import MapRouter from './routes/map'
import UserRouter from './routes/user'
dotenv.config()

const app: Application = express()
const router: Router = Router()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload({
  debug: true,
  limits: { fileSize: 50 * 1024 * 1024 }
}))

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL)
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

router.use('/user', UserRouter)
router.use('/map', MapRouter)
router.use('/bot', BotRouter)

app.use(router)

mongoose.connect(
  process.env.MONGO_URL,
  process.env.NODE_ENV === 'development' ? {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } : {}
).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
  
app.listen(PORT, (): void => console.log(`\nServer listening at http://localhost:${PORT}`))
