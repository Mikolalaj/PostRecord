import { Artist, Track } from '@prisma/client'
import { Request, Response } from 'express'
import { prisma } from '../app'
import { getSpotifyData } from '../external/spotify'
import { getArtistBio } from '../external/lastfm'
import { uploadBlobFromPath } from '../azure/image'
import { File as FormidableFile } from 'formidable'
import { FilterParams } from '../types'

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

export async function getAlbums(req: Request<{}, {}, {}, FilterParams>, res: Response): Promise<Response> {
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
        data: albumsResult,
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

// interface Track {
//     spotifyId: string
//     title: string
//     duration: number
//     features: string | null
//     number: number
// }

interface SpotifyAlbum {
    spotifyId: string
    title: string
    image: string
    imageLarge: string
    releaseDate: Date
    artistName: string
    artistId: string
    tracklist: Array<Track>
}

export async function getSpotifyAlbum(albumSpotifyId: string): Promise<SpotifyAlbum | null> {
    const album = await getSpotifyData(`/albums/${albumSpotifyId}`)

    return {
        spotifyId: albumSpotifyId,
        title: album.name,
        image: album.images[1].url,
        imageLarge: album.images[0].url,
        releaseDate: album.release_date,
        artistName: album.artists[0].name,
        artistId: album.artists[0].id,
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

interface NewAlbum {
    albumId: string
    artistId: string
    artistName: string
    image: FormidableFile | string
    releaseDate: string
    genre: string
    tracklist: Array<Track>
    pressings: Array<{
        color: string
        name: string
        image: {
            name: string
            path: string
        }
    }>
}

function getFileName(artistName: string, albumTitle: string, pressingName: string) {
    return `${artistName}-${albumTitle}-${pressingName}.png`.replace(/\s+/g, '-').toLowerCase()
}

export async function addAlbum(album: NewAlbum) {
    const spotifyAlbum = await getSpotifyAlbum(album.albumId)
    if (!spotifyAlbum) {
        throw new Error('Spotify album not found')
    }
    const bio = await getArtistBio(album.artistName)

    const pressingsFileNames = Object.fromEntries(
        album.pressings.map(pressing => [pressing.name, getFileName(album.artistName, spotifyAlbum.title, pressing.name)])
    )
    const artistImageFileName = album.artistName.replace(/\s+/g, '-').toLowerCase() + '.png'
    for (const pressing of album.pressings) {
        uploadBlobFromPath(pressingsFileNames[pressing.name], pressing.image.path)
    }
    const newAlbum = await prisma.album.create({
        data: {
            title: spotifyAlbum.title,
            image: spotifyAlbum.image,
            imageLarge: spotifyAlbum.imageLarge,
            genre: album.genre,
            releaseDate: new Date(spotifyAlbum.releaseDate),
            spotifyId: spotifyAlbum.spotifyId,
            artist: {
                connectOrCreate: {
                    where: {
                        spotifyId: spotifyAlbum.artistId,
                    },
                    create: {
                        name: spotifyAlbum.artistName,
                        bio: bio,
                        image: typeof album.image === 'string' ? album.image : artistImageFileName,
                        spotifyId: spotifyAlbum.artistId,
                    },
                },
            },
            tracklist: {
                create: spotifyAlbum.tracklist,
            },
            pressings: {
                create: album.pressings.map(pressing => ({
                    color: pressing.color,
                    name: pressing.name,
                    image: pressingsFileNames[pressing.name],
                })),
            },
        },
    })
    return newAlbum
}
