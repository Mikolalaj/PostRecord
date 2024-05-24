import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notificationCheck } from 'components/common'
import { MyError, MessageResponse } from 'types'
import { Pressing } from './usePressings'
import { useParams } from 'react-router-dom'
import { Profile, useUser } from 'hooks/auth/useUser'

const basePath = '/api/wantlist/'

export interface WantlistPressing extends Pressing {
    album: {
        id: string
        image: string
        releaseDate: string
        title: string
        artist: string
    }
    addedAt: string
}

export function useWantlist() {
    const { username } = useParams()

    return useQuery<Array<WantlistPressing>, AxiosError<MyError>>({
        queryKey: username ? ['wantlist', username] : ['wantlist'],
        queryFn: async () => (await axios.get(basePath + (username ? username : ''))).data,
        staleTime: 1000 * 60 * 2,
    })
}

type CollectionOperation = { pressingId: string; albumId: string }

export function useAddToWantlist() {
    const { data: user } = useUser()
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.post(basePath, { pressingId })).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
            queryClient.invalidateQueries(['wantlist'])
            queryClient.invalidateQueries(['wantlist', user?.username])
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Wantlist updated!',
                message: data.message,
            })
        },
    })
}

export function useRemoveFromWantlist() {
    const { data: user } = useUser()
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.delete(basePath + pressingId)).data,
        onSuccess: (data, { albumId, pressingId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
            const collectionUpdate = (old: Array<WantlistPressing> | undefined) => old?.filter(p => p.id !== pressingId)
            queryClient.setQueryData<Array<WantlistPressing>>(['wantlist'], collectionUpdate)
            queryClient.setQueryData<Array<WantlistPressing>>(['wantlist', user?.username], collectionUpdate)
            const profileUpdate = (old: Profile | undefined) => {
                if (!old) return old
                return { ...old, stats: { ...old.stats, wantlist: old.stats.wantlist - 1 } }
            }
            queryClient.setQueryData<Profile>(['profile'], profileUpdate)
            queryClient.setQueryData<Profile>(['profile', user?.username], profileUpdate)
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Wantlist updated!',
                message: data.message,
            })
        },
    })
}
