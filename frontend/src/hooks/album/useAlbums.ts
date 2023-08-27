import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { atom, useRecoilValue } from 'recoil'
import { notificationCheck } from '../../components/common'
import { Error } from '../../types'
import { User } from '../auth/useUser'

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

export interface Artist {
    name: string
    image: string
    bio: string
}

export interface AlbumDetails extends Omit<Album, 'artistName'> {
    artist: Artist
    imageLarge: string
    tracklist: Track[]
}

const basePath = '/api/albums/'

interface AlbumsParams {
    get: number
    skip: number
    query: string
}

export const albumsParams = atom<AlbumsParams>({
    key: 'albumsParams',
    default: {
        get: 5,
        skip: 0,
        query: '',
    },
})

interface AlbumsResponse {
    albums: Album[]
    total: number
}

export function useAlbums() {
    const { get, skip, query } = useRecoilValue(albumsParams)
    return useQuery<AlbumsResponse, AxiosError<Error>>(
        ['albums', get, skip, query],
        async () => {
            const response = await axios.get(basePath, { params: { get, skip, query } })
            return response.data
        },
        {
            staleTime: 1000 * 60 * 2,
            select: data => {
                return {
                    ...data,
                    albums: data.albums.map((album: Album) => ({
                        ...album,
                        // album is new if it's release date was in the last month
                        isNew: new Date(album.releaseDate) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
                    })),
                }
            },
        }
    )
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
    const queryClient = useQueryClient()
    return useMutation<User, AxiosError<Error>, string | null>({
        mutationFn: async albumId => {
            const response = await axios.put('/api/users', { favouriteAlbumId: albumId })
            return response.data
        },
        onSuccess: (_, albumId) => {
            queryClient.invalidateQueries(['user'])
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
