import { atom } from 'recoil'

export interface Response {
    isSuccess: boolean
    message: string
}

const loginPageResponse = atom<Response | null>({
    key: 'loginPageResponse',
    default: null,
})

export { loginPageResponse }
