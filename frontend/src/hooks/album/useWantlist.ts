import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notificationCheck } from 'components/common'
import { MyError, MessageResponse } from 'types'
import { Pressing } from './usePressings'

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
    return useQuery<Array<WantlistPressing>, AxiosError<MyError>>(['wantlist'], async () => (await axios.get(basePath)).data, {
        staleTime: 1000 * 60 * 2,
    })
}

type CollectionOperation = { pressingId: string; albumId: string }

export function useAddToWantlist() {
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.post(basePath, { pressingId })).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
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
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.delete(basePath + pressingId)).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
            queryClient.invalidateQueries(['wantlist'])
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Wantlist updated!',
                message: data.message,
            })
        },
    })
}
