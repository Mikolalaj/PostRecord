import { prisma } from '../app'
import { Request, Response, Router } from 'express'
import { getUserId } from '../common/utils'
const router = Router()

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
            isAdmin: true,
            albumId: true,
        },
    })

    if (!user) {
        return res.status(404).send({ message: 'User not found' })
    }

    return res.json(user)
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

    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName,
            lastName,
            email,
            favouriteAlbum: {
                connect: {
                    id: favouriteAlbumId,
                },
            },
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
