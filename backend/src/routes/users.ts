import { prisma } from '../prisma'
import { Request, Response, Router } from 'express'
import { getUserId } from '../common/utils'
import formidableMiddleware from 'express-formidable'
import sharp from 'sharp'
import { deleteBlob, uploadBlobFromBuffer, uploadBlobFromPath } from '../azure/image'

const router = Router()

interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
    albumId: string | null
    pictures: {
        bigUrl: string
        smallUrl: string
    } | null
}

router.get('/', async (req: Request, res: Response) => {
    const userId = getUserId(req)

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            username: true,
            isAdmin: true,
            albumId: true,
            imageSmallUrl: true,
            imageBigUrl: true,
        },
    })

    if (!user) {
        return res.status(404).send({ message: 'User not found' })
    }

    const userViewModel: User = {
        ...user,
        pictures:
            user.imageBigUrl == null || user.imageSmallUrl == null
                ? null
                : {
                      bigUrl: user.imageBigUrl,
                      smallUrl: user.imageSmallUrl,
                  },
    }

    return res.json(userViewModel)
})

router.delete('/', async (req: Request, res: Response) => {
    const userId = getUserId(req)

    // remove user from database
    await prisma.user.delete({
        where: {
            id: userId,
        },
    })

    // remove user's profile picture from storage
    await deleteBlob(userId)

    // remove user's session
    req.session.destroy(() => {
        return res.status(204).end()
    })
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

router.get('/profile/:username?', async (req: Request, res: Response) => {
    const { username } = req.params

    const user = await prisma.user.findUnique({
        where: username
            ? { username }
            : {
                  id: getUserId(req),
              },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            username: true,
            isAdmin: true,
            albumId: true,
            joinedAt: true,
            bio: true,
            imageSmallUrl: true,
            imageBigUrl: true,
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
        pictures:
            user.imageBigUrl == null || user.imageSmallUrl == null
                ? null
                : {
                      bigUrl: user.imageBigUrl,
                      smallUrl: user.imageSmallUrl,
                  },
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
    bio?: string
    favouriteAlbumId?: string
}

router.use(formidableMiddleware())

router.put('/profile', async (req: Request, res: Response) => {
    if (!req.fields) {
        return res.status(400).send({ message: 'No body data provided' })
    }
    const profile = req.fields.profile
    if (!profile) {
        return res.status(400).send({ message: 'No profile data provided' })
    }

    const profileObject: UpdateUserBody = JSON.parse(profile as unknown as string)
    const userId = getUserId(req)

    let imageName = null
    let newImageBigUrl
    let newImageSmallUrl
    const files = req.files
    if (files && files['profilePicture']) {
        const file = files['profilePicture'] as unknown as { path: string; name: string; type: string; size: number }

        const bigImage = await sharp(file.path).resize(400, 400, { fit: 'cover' }).jpeg().toBuffer()
        const smallImage = await sharp(file.path).resize(80, 80, { fit: 'cover' }).jpeg().toBuffer()

        imageName = Math.random().toString(36).substring(7)

        newImageSmallUrl = await uploadBlobFromBuffer(`${userId}/${imageName}-small.jpeg`, smallImage)
        newImageBigUrl = await uploadBlobFromBuffer(`${userId}/${imageName}-big.jpeg`, bigImage)
    }

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName: profileObject.firstName,
            lastName: profileObject.lastName,
            email: profileObject.email,
            bio: profileObject.bio,
            imageBigUrl: newImageBigUrl,
            imageSmallUrl: newImageSmallUrl,
        },
        select: {
            id: true,
            isAdmin: true,
            email: true,
            firstName: true,
            lastName: true,
            albumId: true,
            bio: true,
            imageBigUrl: true,
            imageSmallUrl: true,
        },
    })

    const userViewModel = {
        id: user.id,
        isAdmin: user.isAdmin,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        albumId: user.albumId,
        bio: user.bio,
        pictures: {
            bigUrl: user.imageBigUrl,
            smallUrl: user.imageSmallUrl,
        },
    }

    return res.status(200).send(userViewModel)
})

export default router
