import { Request, Response, NextFunction } from 'express'
import { prisma } from '../prisma'

async function authentication(req: Request, res: Response, next: NextFunction) {
    const devBearerToken = process.env.DEV_BEARER_TOKEN
    const authentication = req.headers.authorization?.replace('Bearer ', '').trim()
    if (authentication === devBearerToken) {
        const user = await prisma.user.findUnique({ where: { email: 'olejnikmikolaj@gmail.com' } })
        if (user === null) {
            throw new Error('Dev admin user not found')
        }
        req.session.user = user
        return next()
    } else if (!req.session.user) {
        return res.status(401).json({ message: 'There was a problem authorizing the request' })
    }
    next()
}

export default authentication
