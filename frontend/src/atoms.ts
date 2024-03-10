import { atom } from 'recoil'

export interface Response {
    isSuccess: boolean
    message: string
}

export const loginPageResponse = atom<Response | null>({
    key: 'loginPageResponse',
    default: null,
})
