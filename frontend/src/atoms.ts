import axios, { isAxiosError } from 'axios'
import { atom } from 'recoil'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
    albumId: string | null // favourite album
}

async function getUser() {
    try {
        const { data, status } = await axios.get('/api/users')
        console.log(data.user)
        if (status !== 200 && status !== 304) {
            return null
        }
        return data.user
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
                return null
            }
        }
    }
}

const userState = atom<User | null>({
    key: 'userState',
    default: getUser(),
})

export interface Response {
    isSuccess: boolean
    message: string
}

const loginPageResponse = atom<Response | null>({
    key: 'loginPageResponse',
    default: null,
})

export { userState, loginPageResponse }
