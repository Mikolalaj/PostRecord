import { Request } from 'express'

class UnauthorizedError extends Error {
    constructor() {
        super('Unauthorized')
    }
}

export function getUserId(req: Request) {
    const userId = req.session.user?.id
    if (!userId) {
        throw new UnauthorizedError()
    }
    return userId
}
