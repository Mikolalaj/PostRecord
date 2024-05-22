import { Request, Response, Router } from 'express'
import { getUserId } from '../common/utils'
import { getWantlist, addToWantlist, removeFromWantlist } from '../controllers/wantlist'
import { prisma } from '../prisma'

const router = Router()

router.get('/:username?', async (req: Request, res: Response) => {
    const { username } = req.params
    let userId
    if (username) {
        const user = await prisma.user.findUnique({
            where: { username },
            select: { id: true },
        })

        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }

        userId = user.id
    } else {
        userId = getUserId(req)
    }

    return await getWantlist(userId, res)
})

router.post('/', async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const { pressingId } = req.body

    return await addToWantlist(userId, pressingId, res)
})

router.delete('/:pressingId', async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const { pressingId } = req.params

    return await removeFromWantlist(userId, pressingId, res)
})

export default router
