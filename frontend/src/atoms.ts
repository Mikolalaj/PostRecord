import { atom } from 'recoil'
import axios from 'axios'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
}

async function getUser() {
    const { data, status } = await axios.get('/api/users')
    if (status !== 200) {
        return null
    }
    return data.user
}

const userState = atom<User | null>({
    key: 'userState',
    default: getUser(),
})

export { userState }
