import { Request, Response, NextFunction } from 'express'

function authentication(req: Request, res: Response, next: NextFunction) {
    const devBearerToken = process.env.DEV_BEARER_TOKEN
    if (devBearerToken && req.headers.authorization === `Bearer ${devBearerToken}`) {
        return next()
    } else if (!req.session.user) {
        return res.status(401).json({ message: 'There was a problem authorizing the request' })
    }
    next()
}

export default authentication
