import { Request, Response, NextFunction } from 'express'
import { User } from '@prisma/client'
import jwt, {JsonWebTokenError} from 'jsonwebtoken'

function authentication(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'Unable to find JWT token' })
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        throw new Error('JWT secret is not set')
    }

    try {
        const decodedToken = jwt.verify(token, jwtSecret)
        if (!decodedToken) {
            return res.status(401).json({ message: 'There was a problem authorizing the request' })
        }
        req.user = decodedToken as User
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid JWT token' })
        }
        else {
            return res.status(401).json({ message: 'There was a problem authorizing the request' })
        }
    }
    next()
}

export default authentication
