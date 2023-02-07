import { atom } from 'recoil'
import axios, { isAxiosError } from 'axios'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
}

async function getUser() {
    try {
        const { data, status } = await axios.get('/api/users')
        if (status !== 200) {
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

export { userState }
