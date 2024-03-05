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
