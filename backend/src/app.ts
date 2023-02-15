import { PrismaClient, User } from '@prisma/client'
import bodyParser from 'body-parser'
import cookies from 'cookie-parser'
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import authentication from './middlewares/authentication'
import { morganMiddleware } from './middlewares/morgan'
import { redisSession } from './middlewares/redisSession'
import authRouter from './routes/authentication'
import usersRouter from './routes/users'

declare module 'express-session' {
    interface SessionData {
        user: User
    }
}

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

app.use(morganMiddleware)
app.use(redisSession)
app.use(bodyParser.json())
app.use(cookies())

app.use('/api/auth', authRouter)

app.use(authentication)

app.use('/api/users', usersRouter)

app.get('/api', (req, res) => {
    res.send({ message: 'Hello from the PostRecord API!' })
})

const port = process.env.PORT

if (!port) {
    throw new Error('Port is not set')
}

app.listen(port, () => {
    console.log(`⚡ Backend API server is listening on http://localhost:${port}/api`)
})
