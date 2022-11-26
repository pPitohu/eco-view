import express, { Application, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(bodyParser.json())

app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

app.get('/', (req: Request, res: Response): Response => res.send(process.env.CLIENT_URL))

mongoose.connect(
    'mongodb://db:27017/eco-view',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
  ).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
app.listen(PORT, (): void => console.log(`\nServer listening at http://localhost:${PORT}`))
