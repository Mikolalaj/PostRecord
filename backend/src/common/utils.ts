import { Request } from 'express'
import { FilterParams } from '../types'

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

export function getFilterOptions(params: FilterParams) {
    const { skip, query, get, orderBy } = params
    return {
        skip: parseInt(skip),
        take: parseInt(get),
        where: query
            ? {
                  name: {
                      contains: query as string,
                  },
              }
            : undefined,
        orderBy: ({
            name: orderBy === 'newest' ? 'asc' : 'desc',
        }) as const,
    }
}
