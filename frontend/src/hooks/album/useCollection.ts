import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React from 'react'
import { Error, Pressing } from '../../types'

const basePath = '/api/collection/'

export function useCollection() {
    return useQuery<Pressing[], AxiosError<Error>>(['albums'], async () => (await axios.get(basePath)).data, {
        staleTime: 1000 * 60 * 2,
    })
}

type MessageResponse = {
    message: string
}

export function useAddToCollection() {
    const queryClient = useQueryClient()
    return useMutation<MessageResponse, Error, string>({
        mutationFn: async (pressingId: string) => (await axios.post(basePath, { pressingId })).data,
        onSuccess: data => {
            queryClient.invalidateQueries(['albums'])
            showNotification({
                icon: React.createElement(IconCheck, { size: 18 }), // <IconCheck size={18} />
                color: 'teal',
                title: 'Collection updated!',
                message: data.message,
            })
        },
    })
}

// export function useAlbum(albumId: string) {
//     return useQuery<AlbumDetails, AxiosError<Error>>(['albums', albumId], async () => (await axios.get(basePath + albumId)).data, {
//         staleTime: 1000 * 60 * 2,
//         select: (album: AlbumDetails) => {
//             return {
//                 ...album,
//                 // album is new if it's release date was in the last month
//                 releaseDate: new Date(album.releaseDate),
//             }
//         },
//     })
// }
