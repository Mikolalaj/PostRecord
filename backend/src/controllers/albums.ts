import { Artist, Track } from '@prisma/client'
import { Request, Response } from 'express'
import { prisma } from '../app'
import { getSpotifyData } from '../external/spotify'
import { getArtistBio } from '../external/lastfm'

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
    tracklist: Array<Track>
    imageLarge: string
}

type OrderBy = 'newest' | 'oldest' | 'mostPopular' | 'leastPopular'

export interface AlbumsParams {
    skip: number
    get: number
    query: string
    orderBy: OrderBy
}

export async function getAlbums(req: Request<{}, {}, {}, AlbumsParams>, res: Response): Promise<Response> {
    const { skip, query, get, orderBy } = req.query

    let orderValue: 'asc' | 'desc' = 'asc'
    let orderField: 'releaseDate' | 'popularity' = 'releaseDate'

    if (orderBy === 'newest' || orderBy === 'mostPopular') {
        orderValue = 'desc'
    }
    if (orderBy === 'mostPopular' || orderBy === 'leastPopular') {
        orderField = 'popularity'
    }

    const albums = await prisma.album.findMany({
        where: {
            OR: [
                { title: { contains: query as string, mode: 'insensitive' } },
                { artist: { name: { contains: query as string, mode: 'insensitive' } } },
                { genre: { contains: query as string, mode: 'insensitive' } },
            ],
        },
        take: Number(get),
        skip: Number(skip),
        include: {
            artist: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            [orderField]: orderValue,
        },
    })

    const albumsResult = albums.map(album => ({
        id: album.id,
        title: album.title,
        image: album.image,
        genre: album.genre,
        releaseDate: album.releaseDate,
        spotifyId: album.spotifyId,
        artistName: album.artist.name,
    }))

    const albumsCount = await prisma.album.count()

    return res.status(200).send({
        albums: albumsResult,
        total: albumsCount,
    })
}

export async function getAlbum(albumId: string, userId: string): Promise<AlbumDetails | null> {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { collection: true } })
    if (!user) {
        return null
    }
    const album = await prisma.album.findFirst({ where: { id: albumId }, include: { artist: true, tracklist: true } })
    if (!album) {
        return null
    }

    return album
}

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

export async function getSpotifyAlbum(albumSpotifyId: string): Promise<SpotifyAlbum | null> {
    const album = await getSpotifyData(`/albums/${albumSpotifyId}`)
    const artist = await getSpotifyData(`/artists/${album.artists[0].id}`)

    const bio = await getArtistBio(album.artists[0].name)

    return {
        spotifyId: albumSpotifyId,
        title: album.name,
        image: album.images[1].url,
        releaseDate: album.release_date,
        artist: {
            name: album.artists[0].name,
            image: artist.images[2].url,
            spotifyId: album.artists[0].id,
            bio: bio,
        },
        tracklist: album.tracks.items.map((track: any) => ({
            spotifyId: track.id,
            title: track.name,
            duration: Math.floor(track.duration_ms / 1000),
            features:
                track.artists.length > 1
                    ? track.artists
                          .slice(1)
                          .map((artist: any) => artist.name)
                          .join(', ')
                    : null,
            number: track.track_number,
        })),
    }
}

interface SearchResultAlbum {
    albumTitle: string
    artist: string
    image: string
    spotifyId: string
}

export async function searchSpotifyAlbums(query: string): Promise<Array<SearchResultAlbum>> {
    if (!query) {
        return []
    }
    const result = await getSpotifyData(`/search?q=${query}&type=album&limit=10`)
    const albums: Array<SearchResultAlbum> = result.albums.items.map((album: any) => ({
        albumTitle: album.name as string,
        artist: album.artists[0].name as string,
        image: album.images[2].url as string,
        spotifyId: album.id as string,
    }))
    return albums
}
