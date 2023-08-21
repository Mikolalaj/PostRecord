import { Pressing } from '@prisma/client'
import { Request, Response } from 'express'
import { prisma } from '../app'
import { getSpotifyData } from '../external/spotify'
import { getArtistBio } from '../external/lastfm'

export type Tracklist = {
    number: number
    title: string
    duration: number
    features: string | null
}[]

export type Artist = {
    name: string
    image: string
    description: string
}

interface Album {
    id: string
    artistName: string
    title: string
    image: string
    genre: string
    releaseDate: Date
    spotifyId: string
}

interface AlbumDetails extends Omit<Album, 'artistName'> {
    artist: Artist
    tracklist: Tracklist
    pressings: (Pressing & { isInCollection: boolean })[]
    imageBig: string
}

export async function getAlbums(req: Request, res: Response): Promise<Response> {
    const { sortBy, skip } = req.params

    const albums = await prisma.album.findMany()
    const spotifyAlbums: Album[] = await Promise.all(
        albums.map(async album => {
            const spotifyAlbum = await getSpotifyData(`/albums/${album.spotifyId}`)
            return {
                id: album.id,
                artistName: spotifyAlbum.artists[0].name,
                title: spotifyAlbum.name,
                image: spotifyAlbum.images[1].url,
                genre: album.genre,
                releaseDate: spotifyAlbum.release_date,
                spotifyId: album.spotifyId,
            }
        })
    )

    return res.status(200).send(spotifyAlbums)
}

export async function getAlbum(albumId: string): Promise<AlbumDetails | null> {
    const album = await prisma.album.findFirst({ where: { id: albumId } })
    if (!album) {
        return null
    }
    const spotifyAlbum = await getSpotifyData(`/albums/${album.spotifyId}`)
    const spotifyArtist = await getSpotifyData(`/artists/${spotifyAlbum.artists[0].id}`)

    const pressings = await prisma.pressing.findMany({
        where: { albumId },
    })

    const artistBio = await getArtistBio(spotifyAlbum.artists[0].name)

    return {
        id: album.id,
        title: spotifyAlbum.name,
        image: spotifyAlbum.images[1].url,
        imageBig: spotifyAlbum.images[0].url,
        genre: album.genre,
        releaseDate: spotifyAlbum.release_date,
        spotifyId: album.spotifyId,
        artist: {
            name: spotifyAlbum.artists[0].name,
            image: spotifyArtist.images[1].url,
            description: artistBio,
        },
        tracklist: spotifyAlbum.tracks.items.map((track: any, index: number) => ({
            number: index + 1,
            title: track.name.replace(/\(feat. .*\)/, '').trim(),
            duration: Math.floor(track.duration_ms / 1000),
            features:
                track.artists.length > 1
                    ? track.artists
                          .slice(1)
                          .map((artist: any) => artist.name)
                          .join(', ')
                    : null,
        })),
        pressings: pressings.map(pressing => ({
            ...pressing,
            isInCollection: false,
        })),
    }
}
