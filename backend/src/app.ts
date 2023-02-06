import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookies from 'cookie-parser'
import authRouter from './routes/authentication'
import usersRouter from './routes/users'
import authentication from './middlewares/authentication'
import { User, PrismaClient } from '@prisma/client'
import morgan from 'morgan'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { createClient } from 'redis'

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

const RedisStore = connectRedis(session)

let redisClient = createClient({ legacyMode: true, password: 'redis' })
redisClient.connect().catch(console.error)

const app: Application = express()

app.use(morgan('dev'))

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
    throw new Error('Session Secret is not set')
}

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: false,
        secret: sessionSecret,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
)

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
