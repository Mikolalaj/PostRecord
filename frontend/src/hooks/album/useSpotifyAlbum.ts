import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Error } from '../../types'
import { atom, useRecoilValue } from 'recoil'
import { Track } from './useAlbums'
import { EditableTrack } from '../../components/addAlbum/EditableTracklist'
import { NewPressing } from '../../components/addAlbum/PressingForm'

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

export interface AlbumFormPost {
    image: string
    artistName: string
    releaseDate: Date
    tracklist: Array<EditableTrack>
    pressings: Array<NewPressing>
}

const basePath = '/api/albums/'

export const spotifyAlbumIdState = atom<string | null>({
    key: 'spotifyAlbumIdState',
    default: null,
})

export function useSpotifyAlbum(setFormValues: (values: AlbumFormPost) => void) {
    const spotifyAlbumId = useRecoilValue(spotifyAlbumIdState)
    return useQuery<SpotifyAlbum, AxiosError<Error>>(
        ['spotifyAlbum', spotifyAlbumId],
        async () => (await axios.get(`${basePath}spotify/${spotifyAlbumId}`)).data,
        {
            staleTime: Infinity,
            enabled: spotifyAlbumId !== null,
            select: (album: SpotifyAlbum): SpotifyAlbum => {
                return {
                    ...album,
                    releaseDate: album.releaseDate,
                    tracklist: album.tracklist.sort((a, b) => a.number - b.number)
                }
            },
            onSuccess: album => {
                setFormValues({
                    artistName: album.artistName,
                    releaseDate: new Date(album.releaseDate),
                    image: album.image,
                    tracklist: album.tracklist,
                    pressings: [],
                })
            },
        }
    )
}
