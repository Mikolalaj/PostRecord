import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notificationCheck } from '../../components/common'
import { Error, MessageResponse } from '../../types'
import { User, userState } from '../../atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'

export interface Album {
    id: string
    artistName: string
    title: string
    image: string
    genre: string
    releaseDate: Date
    isNew: boolean
    spotifyId: string
}

export interface Track {
    number: number
    title: string
    duration: number
    features: string | null
}

export interface AlbumDetails extends Omit<Album, 'artistName'> {
    artist: {
        name: string
        image: string
        description: string
    }
    imageBig: string
    tracklist: Track[]
}

const basePath = '/api/albums/'

export function useAlbums() {
    return useQuery<Album[], AxiosError<Error>>(['albums'], async () => (await axios.get(basePath)).data, {
        staleTime: 1000 * 60 * 2,
        select: data =>
            data.map((album: Album) => ({
                ...album,
                // album is new if it's release date was in the last month
                isNew: new Date(album.releaseDate) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
            })),
    })
}

export function useAlbum(albumId: string) {
    return useQuery<AlbumDetails, AxiosError<Error>>(['albums', albumId], async () => (await axios.get(basePath + albumId)).data, {
        staleTime: 1000 * 60 * 2,
        select: (album: AlbumDetails) => {
            return {
                ...album,
                // album is new if it's release date was in the last month
                releaseDate: new Date(album.releaseDate),
            }
        },
    })
}

export function useSetFavouriteAlbum() {
    const [user, setUser] = useRecoilState(userState)
    //const setUser = useSetRecoilState(userState)
    const queryClient = useQueryClient()
    return useMutation<User, AxiosError<Error>, string | null>({
        mutationFn: async albumId => {
            const response = await axios.put('/api/users', { favouriteAlbumId: albumId })
            return response.data
        },
        onSuccess: (_, albumId) => {
            setUser({ ...(user as User), albumId: albumId })
            let message
            if (albumId === null) {
                message = 'Favourite album removed!'
            } else {
                const album = queryClient.getQueryData<AlbumDetails>(['albums', albumId])
                message = `Album ${album && '"' + album.title + '"'} was set as your favourite!`
            }
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Profile updated!',
                message: message,
            })
        },
    })
}
