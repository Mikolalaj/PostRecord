import { PrismaClient, User } from '@prisma/client'
import bodyParser from 'body-parser'
import cookies from 'cookie-parser'
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import { createClient } from 'redis'
import winston from 'winston'
import authentication from './middlewares/authentication'
import { morganMiddleware } from './middlewares/morgan'
import { redisSession } from './middlewares/redisSession'
import albumsRouter from './routes/albums'
import collectionRouter from './routes/collection'
import authRouter from './routes/authentication'
import usersRouter from './routes/users'

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
})

export const cache = createClient({
    url: `redis://default:${process.env.REDIS_CACHE_PASSWORD}@localhost:${process.env.REDIS_CACHE_PORT}`,
})
cache.on('error', (error: any) => console.log('Redis Client Error', error))
cache.connect()

declare module 'express-session' {
    interface SessionData {
        user: User
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
app.use('/api/albums', albumsRouter)
app.use('/api/collection', collectionRouter)

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
