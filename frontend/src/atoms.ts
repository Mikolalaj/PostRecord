import { atom } from 'recoil'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
}

async function getUser() {
    const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.status !== 200) {
        return null
    }
    const { user } = await response.json()
    return user
}

const userState = atom<User | null>({
    key: 'userState',
    default: getUser(),
})

export { userState }
