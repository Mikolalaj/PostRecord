import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Error } from '../../types'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
    albumId: string | null // favourite album
}

export function useUser() {
    return useQuery<User, AxiosError<Error>>(['user'], async () => (await axios.get('/api/users')).data, {
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}
