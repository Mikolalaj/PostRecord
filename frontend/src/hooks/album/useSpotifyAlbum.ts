import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Error } from '../../types'
import { atom, useRecoilValue } from 'recoil'

interface SpotifyAlbum {
    spotifyId: string
    title: string
    image: string
    releaseDate: Date
    artist: {
        spotifyId: string
        name: string
        image: string
        bio: string
    }
    tracklist: Array<{
        spotifyId: string
        title: string
        duration: number
        features: string | null
        number: number
    }>
}

const basePath = '/api/albums/'

export const spotifyAlbumIdState = atom<string | null>({
    key: 'spotifyAlbumIdState',
    default: null,
})

// album is new if it's release date was in the last month
const isAlbumNew = (releaseData: Date) => new Date(releaseData) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)

export function useSpotifyAlbum(setFormValues: (values: any) => void) {
    const spotifyAlbumId = useRecoilValue(spotifyAlbumIdState)
    return useQuery<SpotifyAlbum, AxiosError<Error>>(
        ['spotifyAlbum', spotifyAlbumId],
        async () => (await axios.get(`${basePath}spotify/${spotifyAlbumId}`)).data,
        {
            staleTime: 1000 * 60 * 2,
            enabled: spotifyAlbumId !== null,
            select: (album: SpotifyAlbum) => {
                return {
                    ...album,
                    releaseDate: new Date(album.releaseDate),
                    tracklist: album.tracklist.sort((a, b) => a.number - b.number),
                    isNew: isAlbumNew(new Date(album.releaseDate)),
                }
            },
            onSuccess: album => {
                setFormValues({
                    artist: {
                        name: album.artist.name,
                        image: album.artist.image,
                        bio: album.artist.bio,
                    },
                    releaseDate: album.releaseDate,
                    image: album.image,
                    // tracklist: album.tracklist,
                })
            },
        }
    )
}
