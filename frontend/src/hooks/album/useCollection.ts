import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notificationCheck } from 'components/common'
import { MyError, MessageResponse } from 'types'
import { Pressing } from './usePressings'

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
    return useQuery<Array<CollectionPressing>, AxiosError<MyError>>(['collection'], async () => (await axios.get(basePath)).data, {
        staleTime: 1000 * 60 * 2,
    })
}

type CollectionOperation = { pressingId: string; albumId: string }

export function useAddToCollection() {
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.post(basePath, { pressingId })).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
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
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, MyError, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.delete(basePath + pressingId)).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
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
