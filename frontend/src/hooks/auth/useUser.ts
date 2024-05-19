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
}

export interface Stats {
    collection: number
    wantlist: number
    forSale: number
}

export interface Profile extends User {
    bio: string | null
    joinedAt: Date
    stats: Stats
    favouriteAlbum: {
        id: string
        title: string
        image: string
        artist: string
    } | null
}

export function useUser() {
    return useQuery<User, AxiosError<MyError>>(['user'], async () => (await axios.get('/api/users')).data, {
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export function useProfile(userId?: string) {
    return useQuery<Profile, AxiosError<MyError>>(
        ['profile', userId],
        async () => (await axios.get(`/api/users/profile/${userId || ''}`)).data,
        {
            staleTime: 1000 * 60 * 5,
            retry: 1,
        }
    )
}
