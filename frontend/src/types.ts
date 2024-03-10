export type MyError = {
    message: string
}

export type MessageResponse = {
    message: string
}

export interface TableDataResponse<T> {
    data: Array<T>
    total: number
}

export type OrderBy = 'newest' | 'oldest' | 'mostPopular' | 'leastPopular'

export interface TableDataParams {
    get: number
    skip: number
    query: string
    orderBy: OrderBy
}
