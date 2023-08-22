import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React from 'react'
import { Error } from '../../types'
import { Pressing } from './usePressings'

const basePath = '/api/collection/'

export function useCollection() {
    return useQuery<Pressing[], AxiosError<Error>>(['collection'], async () => (await axios.get(basePath)).data, {
        staleTime: 1000 * 60 * 2,
    })
}

type MessageResponse = {
    message: string
}

type CollectionOperation = { pressingId: string; albumId: string }

export function useAddToCollection() {
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, Error, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.post(basePath, { pressingId })).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
            showNotification({
                icon: React.createElement(IconCheck, { size: 18 }), // <IconCheck size={18} />
                color: 'teal',
                title: 'Collection updated!',
                message: data.message,
            })
        },
    })
}

export function useRemoveFromCollection() {
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, Error, CollectionOperation>({
        mutationFn: async ({ pressingId }) => (await axios.delete(basePath + pressingId)).data,
        onSuccess: (data, { albumId }) => {
            queryClient.invalidateQueries(['pressings', albumId])
            showNotification({
                icon: React.createElement(IconCheck, { size: 18 }), // <IconCheck size={18} />
                color: 'teal',
                title: 'Collection updated!',
                message: data.message,
            })
        },
    })
}
