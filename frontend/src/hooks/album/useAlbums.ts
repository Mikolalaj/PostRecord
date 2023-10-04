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
    tracklist: Array<Track>
}

const basePath = '/api/albums/'

export type OrderBy = 'newest' | 'oldest' | 'mostPopular' | 'leastPopular'

interface AlbumsParams {
    get: number
    skip: number
    query: string
    orderBy: OrderBy
}

export const albumsParams = atom<AlbumsParams>({
    key: 'albumsParams',
    default: {
        get: 5,
        skip: 0,
        query: '',
        orderBy: 'newest',
    },
})

interface AlbumsResponse {
    albums: Array<Album>
    total: number
}

// album is new if it's release date was in the last month
const isAlbumNew = (releaseData: Date) => new Date(releaseData) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)

export function useAlbums() {
    const { get, skip, query, orderBy } = useRecoilValue(albumsParams)
    return useQuery<AlbumsResponse, AxiosError<Error>>(
        ['albums', get, skip, query, orderBy],
        async () => {
            const response = await axios.get(basePath, { params: { get, skip, orderBy, query: query !== '' ? query : null } })
            return response.data
        },
        {
            staleTime: 1000 * 60 * 2,
            select: data => {
                return {
                    ...data,
                    albums: data.albums.map((album: Album) => ({
                        ...album,
                        isNew: isAlbumNew(new Date(album.releaseDate)),
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
                releaseDate: new Date(album.releaseDate),
                tracklist: album.tracklist.sort((a, b) => a.number - b.number),
                isNew: isAlbumNew(new Date(album.releaseDate)),
            }
        },
    })
}

export interface SearchAlbum {
    albumTitle: string
    artist: string
    image: string
    spotifyId: string
}

export function useSearchAlbums(search: string) {
    return useQuery<Array<SearchAlbum>, AxiosError<Error>>(
        ['albums', search],
        async () => {
            const response = await axios.get(basePath + 'search', {
                params: { query: search !== '' ? search : null },
            })
            return response.data
        },
        {
            keepPreviousData: true,
            enabled: search !== '',
            initialData: [],
        }
    )
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
