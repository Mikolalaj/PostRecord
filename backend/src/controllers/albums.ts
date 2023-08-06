import { Request, Response } from 'express'
import { prisma } from '../app'
import { getSpotifyData } from '../spotify'

export type Tracklist = {
    number: number
    title: string
    duration: string
    features: string | null
}[]

export type Pressing = {
    id: string
    name: string
    image: string
    color: string
    isInCollection: boolean
}

export type Artist = {
    name: string
    image: string
    description: string
}

type Album = {
    id: string
    title: string
    image: string
    genre: string
    year: string
    spotifyId: string
    // artist: Artist
    // tracklist: Tracklist
    // pressings: Pressing[]
}

export async function getAlbums(req: Request, res: Response): Promise<Response> {
    const { sortBy, skip } = req.params

    const userId = req.session.user?.id
    if (!userId) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    const albums = await prisma.album.findMany()
    const spotifyAlbums: Album[] = await Promise.all(
        albums.map(async album => {
            const spotifyAlbum = await getSpotifyData(userId, `https://api.spotify.com/v1/albums/${album.spotifyId}`)
            return {
                id: album.id,
                title: spotifyAlbum.name,
                image: spotifyAlbum.images[1].url,
                genre: album.genre,
                year: spotifyAlbum.release_date.slice(0, 4),
                spotifyId: album.spotifyId,
            }
        })
    )

    return res.status(200).send(spotifyAlbums)
}
