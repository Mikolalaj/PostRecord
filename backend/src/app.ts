import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookies from 'cookie-parser'
import loginRouter from './routes/login'
import authentication from './middlewares/authentication'
import { User } from '@prisma/client'

declare global {
    namespace Express {
        export interface Request {
            user?: User
        }
    }
}

dotenv.config()

const app: Application = express()

app.use(bodyParser.json())
app.use(cookies())

app.use('/api/login', loginRouter)

app.use(authentication)

app.get('/api', (req, res) => {
    console.log(req.user)
    res.send('Hello World!')
})

const port = 3001

app.listen(port, function () {
    console.log(`⚡ Backend API server is listening on http://localhost:${port}/api`)
})
