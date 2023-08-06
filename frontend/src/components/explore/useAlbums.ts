import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export type Album = {
    id: string
    artistName: string
    title: string
    image: string
    genre: string
    date: string
    isNew: boolean
    spotifyId: string
}

type Error = {
    message: string
}

function useAlbums() {
    return useQuery<Album[], Error>(['albums'], async () => (await axios.get('/api/albums')).data, {
        staleTime: 1000 * 60 * 2,
        select: data =>
            data.map((album: Album) => ({
                ...album,
                // album is new if it's release date was in the last month
                isNew: new Date(album.date) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
            })),
        placeholderData: [],
    })
}

export default useAlbums
