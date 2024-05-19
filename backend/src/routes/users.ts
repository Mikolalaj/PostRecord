import { prisma } from '../app'
import { Request, Response, Router } from 'express'
import { getUserId } from '../common/utils'
const router = Router()

interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
    albumId: string | null
}

router.get('/', async (req: Request, res: Response) => {
    const userId = getUserId(req)

    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isAdmin: true,
            albumId: true,
        },
    })

    if (!user) {
        return res.status(404).send({ message: 'User not found' })
    }

    return res.json(user)
})

interface Profile extends User {
    favouriteAlbum: {
        id: string
        title: string
        image: string
        artist: string
    } | null
    bio: string | null
    joinedAt: Date
    stats: {
        collection: number
        wantlist: number
        forSale: number
    }
}

router.get('/profile/:userId?', async (req: Request, res: Response) => {
    const userId = req.params.userId || getUserId(req)

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isAdmin: true,
            albumId: true,
            joinedAt: true,
            bio: true,
        },
    })

    if (!user) {
        return res.status(404).send({ message: 'User not found' })
    }

    const collection = await prisma.pressingsForUser.count({
        where: {
            userId: user.id,
        },
    })
    const wantlist = await prisma.pressingsWantlist.count({
        where: {
            userId: user.id,
        },
    })
    const forSale = await prisma.pressingsForUser.count({
        where: {
            userId: user.id,
            salePrice: {
                not: null,
            },
        },
    })

    const favouriteAlbumId = user.albumId
    let favouriteAlbum = null
    if (favouriteAlbumId) {
        favouriteAlbum = await prisma.album.findUnique({
            where: {
                id: favouriteAlbumId,
            },
            select: {
                id: true,
                title: true,
                image: true,
                artist: {
                    select: {
                        name: true,
                    },
                },
            },
        })
    }

    const profile: Profile = {
        ...user,
        stats: {
            collection,
            wantlist,
            forSale,
        },
        favouriteAlbum: favouriteAlbum
            ? {
                  id: favouriteAlbum.id,
                  title: favouriteAlbum.title,
                  image: favouriteAlbum.image,
                  artist: favouriteAlbum.artist.name,
              }
            : null,
    }

    return res.json(profile)
})

type UpdateUserBody = {
    firstName?: string
    lastName?: string
    email?: string
    favouriteAlbumId?: string
}

router.put('/', async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const { firstName, lastName, email, favouriteAlbumId }: UpdateUserBody = req.body

    let favouriteAlbum
    if (favouriteAlbumId == null) {
        favouriteAlbum = {
            disconnect: true,
        }
    } else if (favouriteAlbumId) {
        favouriteAlbum = {
            connect: {
                id: favouriteAlbumId,
            },
        }
    } else {
        favouriteAlbum = undefined
    }

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName,
            lastName,
            email,
            favouriteAlbum: favouriteAlbum,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isAdmin: true,
            albumId: true,
        },
    })

    return res.status(200).send(user)
})

export default router
