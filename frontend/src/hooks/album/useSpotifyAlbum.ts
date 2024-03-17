import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { MyError } from 'types'
import { EditableTrack, Track } from './useAlbums'

interface SpotifyAlbum {
    spotifyId: string
    artistName: string
    title: string
    image: string
    releaseDate: string
    tracklist: Array<
        Track & {
            spotifyId: string
        }
    >
}

export interface NewPressing {
    name: string
    image: File
    color: string
}

export interface AlbumFormPost {
    image: string
    genre: string
    artistName: string
    releaseDate: Date
    tracklist: Array<EditableTrack>
    pressings: Array<NewPressing>
}

const basePath = '/api/albums/'

export function useSpotifyAlbum(spotifyAlbumId: string, setFormValues: (values: AlbumFormPost) => void) {
    return useQuery<SpotifyAlbum, AxiosError<MyError>>(
        ['spotifyAlbum', spotifyAlbumId],
        async () => (await axios.get(`${basePath}spotify/${spotifyAlbumId}`)).data,
        {
            staleTime: Infinity,
            enabled: spotifyAlbumId !== null,
            select: (album: SpotifyAlbum): SpotifyAlbum => {
                return {
                    ...album,
                    releaseDate: album.releaseDate,
                    tracklist: album.tracklist.sort((a, b) => a.number - b.number),
                }
            },
            onSuccess: album => {
                setFormValues({
                    artistName: album.artistName,
                    genre: '',
                    releaseDate: new Date(album.releaseDate),
                    image: album.image,
                    tracklist: album.tracklist,
                    pressings: [],
                })
            },
        }
    )
}
