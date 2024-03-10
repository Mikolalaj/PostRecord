import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { notificationCheck } from 'components/common'
import { MyError, TableDataResponse, TableDataParams } from 'types'
import { User } from '../auth/useUser'
import { useNavigate } from 'react-router-dom'
import { getFilterParamsKeys } from 'utils/index'

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

export interface EditableTrack extends Track {
    spotifyId: string
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

// album is new if it's release date was in the last month
const isAlbumNew = (releaseData: Date) => new Date(releaseData) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)

export function useAlbums(params: TableDataParams) {
    return useQuery<TableDataResponse<Album>, AxiosError<MyError>>({
        queryKey: getFilterParamsKeys('albums', params),
        queryFn: async () => {
            const response = await axios.get(basePath, {
                params: {
                    get: params?.get,
                    skip: params?.skip,
                    orderBy: params?.orderBy,
                    query: params?.query !== '' ? params?.query : null,
                },
            })
            return response.data
        },
        staleTime: 1000 * 60 * 2,
        select: data => {
            return {
                ...data,
                albums: data.data.map((album: Album) => ({
                    ...album,
                    isNew: isAlbumNew(new Date(album.releaseDate)),
                })),
            }
        },
    })
}

export function useAlbum(albumId: string) {
    return useQuery<AlbumDetails, AxiosError<MyError>>(['albums', albumId], async () => (await axios.get(basePath + albumId)).data, {
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
    return useQuery<Array<SearchAlbum>, AxiosError<MyError>>(
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
    return useMutation<User, AxiosError<MyError>, string | null>({
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

interface NewAlbum {
    albumId: string
    artistId: string
    image: File | string
    releaseDate: string
    genre: string
    tracklist: Array<Track>
    pressings: Array<{
        color: string
        name: string
        image: File
    }>
}

export function useAddAlbum() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation<Album, AxiosError<MyError>, NewAlbum>({
        mutationFn: async album => {
            const pressingsWithImageNames = album.pressings.map(({ image, ...pressing }) => {
                return {
                    ...pressing,
                    imageName: image.name,
                }
            })
            const albumWithImageName = {
                ...album,
                pressings: pressingsWithImageNames,
            }
            const formData = new FormData()
            formData.append('album', JSON.stringify(albumWithImageName))
            if (album.image instanceof File) {
                formData.append('image', album.image)
            }
            album.pressings.forEach(pressing => {
                formData.append(pressing.image.name, pressing.image)
            })
            const response = await axios.post(basePath, formData)
            return response.data
        },
        onSuccess: album => {
            queryClient.invalidateQueries(['albums'])
            navigate('/album/' + album.id)
            showNotification({
                icon: notificationCheck,
                color: 'teal',
                title: 'Album added!',
                message: 'Album was successfully added to the database!',
            })
        },
    })
}
