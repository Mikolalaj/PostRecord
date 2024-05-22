import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notificationCheck } from 'components/common'
import { MyError, MessageResponse } from 'types'
import { Pressing } from './usePressings'
import { useParams } from 'react-router-dom'
import { useUser } from 'hooks/auth/useUser'

const basePath = '/api/collection/'

export interface CollectionPressing extends Pressing {
    album: {
        id: string
        image: string
        releaseDate: string
        title: string
        artist: string
    }
    addedAt: string
    salePrice: number | null
}

export function useCollection() {
    const { username } = useParams()
    return useQuery<Array<CollectionPressing>, AxiosError<MyError>>({
        queryKey: username ? ['collection', username] : ['collection'],
        queryFn: async () => (await axios.get(basePath + (username ? username : ''))).data,
        staleTime: 1000 * 60 * 2,
    })
}

type CollectionOperation = { pressingId: string; albumId: string }

export function useAddToCollection() {
    const { data: user } = useUser()
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.post(basePath, { pressingId })).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
            queryClient.invalidateQueries(['collection'])
            queryClient.invalidateQueries(['collection', user?.username])
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Collection updated!',
                message: data.message,
            })
        },
    })
}

export function useRemoveFromCollection() {
    const { data: user } = useUser()
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.delete(basePath + pressingId)).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
            queryClient.invalidateQueries(['collection'])
            queryClient.invalidateQueries(['collection', user?.username])
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Collection updated!',
                message: data.message,
            })
        },
    })
}

export function useRemoveFromSale() {
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, { pressingId: string }>({
        mutationFn: async ({ pressingId }) => (await axios.delete(basePath + 'sale/' + pressingId)).data,
        onSuccess: data => {
            queryClient.invalidateQueries(['collection'])
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Collection updated!',
                message: data.message,
            })
        },
    })
}

export function useSetSalePrice() {
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, { pressingId: string; price: number }>({
        mutationFn: async ({ pressingId, price }) => (await axios.put(basePath + 'sale', { pressingId, price })).data,
        onSuccess: data => {
            queryClient.invalidateQueries(['collection'])
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Collection updated!',
                message: data.message,
            })
        },
    })
}
