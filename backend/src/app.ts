import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookies from 'cookie-parser'
import authRouter from './routes/authentication'
import usersRouter from './routes/users'
import authentication from './middlewares/authentication'
import { User, PrismaClient } from '@prisma/client'
import morgan from 'morgan'

declare global {
    namespace Express {
        export interface Request {
            user: User
        }
    }
}

export const prisma = new PrismaClient()

dotenv.config()


const app: Application = express()

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(cookies())

app.use('/api/auth', authRouter)

app.use(authentication)

app.use('/api/users', usersRouter)

app.get('/api', (_, res) => {
    res.send('Hello from the PostRecord API!')
})

const port = process.env.PORT

if (!port) {
    throw new Error('Port is not set')
}

app.listen(port, () => {
    console.log(`⚡ Backend API server is listening on http://localhost:${port}/api`)
})
