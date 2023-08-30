import { Artist, Track } from '@prisma/client'
import { Request, Response } from 'express'
import { prisma } from '../app'
import { getSpotifyData } from '../external/spotify'

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
