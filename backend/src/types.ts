import { Request } from 'express'

type OrderBy = 'newest' | 'oldest' | 'mostPopular' | 'leastPopular'

export interface FilterParams {
    skip: string
    get: string
    query: string
    orderBy: OrderBy
}

export type RequestWithFilterParams = Request<{}, {}, {}, FilterParams>
