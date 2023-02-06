import { Request, Response, NextFunction } from 'express'

function authentication(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
        return res.status(401).json({ message: 'There was a problem authorizing the request' })
    } 
    next()
}

export default authentication
