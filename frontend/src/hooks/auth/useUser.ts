import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notificationCheck } from 'components/common'
import { useNavigate } from 'react-router-dom'
import { MyError } from 'types'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    username: string
    isAdmin: boolean
    albumId: string | null // favourite album
    pictures: {
        bigUrl: string
        smallUrl: string
    } | null
}

export interface Stats {
    collection: number
    wantlist: number
    forSale: number
}

export interface Profile extends Omit<User, 'albumId'> {
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

export function useDeleteUser() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation<void, AxiosError<MyError>>({
        mutationFn: async () => {
            await axios.delete('/api/users')
        },
        onSuccess: () => {
            showNotification({
                icon: notificationCheck,
                color: 'red',
                title: 'Account deleted!',
                message: 'Your account has been deleted successfully',
            })
            queryClient.clear()
            navigate('/login')
        },
    })
}

export function useProfile(username: string | undefined = undefined) {
    return useQuery<Profile, AxiosError<MyError>>(
        username ? ['profile', username] : ['profile'],
        async () => (await axios.get(`/api/users/profile/${username || ''}`)).data,
        {
            staleTime: 1000 * 60 * 5,
            retry: 1,
        }
    )
}

export interface ProfileUpdate {
    firstName: string
    lastName: string
    email: string
    bio: string
    picture?: File
}

export function useUpdateProfile() {
    const queryClient = useQueryClient()
    return useMutation<User & { bio: string }, AxiosError<MyError>, ProfileUpdate>({
        mutationKey: ['updateProfile'],
        mutationFn: async (profile: ProfileUpdate) => {
            const formData = new FormData()
            formData.append('profile', JSON.stringify(profile))
            if (profile.picture instanceof File) {
                formData.append('profilePicture', profile.picture)
            }
            const response = await axios.put('/api/users/profile', formData)
            return response.data
        },
        onSuccess: data => {
            const { firstName, lastName, email, bio, pictures } = data
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Profile updated!',
                message: 'Your profile has been updated successfully',
            })
            queryClient.setQueryData<User>(['user'], data)
            queryClient.setQueryData(['profile'], (profile?: Profile) => {
                if (!profile) throw new Error('Profile not found')
                return {
                    ...profile,
                    firstName,
                    lastName,
                    email,
                    bio,
                    pictures,
                }
            })
        },
    })
}
