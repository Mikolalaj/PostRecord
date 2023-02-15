import connectRedis from 'connect-redis'
import session from 'express-session'
import { createClient } from 'redis'

const RedisStore = connectRedis(session)

let redisClient = createClient({ legacyMode: true, password: 'redis' })
redisClient.connect().catch(console.error)

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
    throw new Error('Session Secret is not set')
}

export const redisSession = session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: sessionSecret,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
})
