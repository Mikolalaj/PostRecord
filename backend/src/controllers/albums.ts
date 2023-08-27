import { Artist, Track } from '@prisma/client'
import { Request, Response } from 'express'
import { prisma } from '../app'

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
    tracklist: Track[]
    imageLarge: string
}

export async function getAlbums(req: Request, res: Response): Promise<Response> {
    const { skip, query, get } = req.query
    const albums = await prisma.album.findMany({
        where: {
            OR: [
                { title: { contains: query as string } },
                { artist: { name: { contains: query as string } } },
                { genre: { contains: query as string } },
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
