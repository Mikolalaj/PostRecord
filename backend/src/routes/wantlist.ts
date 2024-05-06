import { Request, Response, Router } from 'express'
import { getUserId } from '../common/utils'
import { getWantlist, addToWantlist, removeFromWantlist } from '../controllers/wantlist'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const userId = getUserId(req)

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
