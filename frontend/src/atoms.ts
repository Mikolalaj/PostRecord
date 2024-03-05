import { atom } from 'recoil'

export interface Response {
    isSuccess: boolean
    message: string
}

export const loginPageResponse = atom<Response | null>({
    key: 'loginPageResponse',
    default: null,
})

export type OrderBy = 'newest' | 'oldest' | 'mostPopular' | 'leastPopular'

export interface TableDataParams {
    get: number
    skip: number
    query: string
    orderBy: OrderBy
}

export const tableDataParams = atom<TableDataParams | null>({
    key: 'tableDataParams',
    default: null,
})
