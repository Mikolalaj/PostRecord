import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { MyError } from 'types'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
    albumId: string | null // favourite album
    joinedAt: string
}

export function useUser() {
    return useQuery<User, AxiosError<MyError>>(['user'], async () => (await axios.get('/api/users')).data, {
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}
