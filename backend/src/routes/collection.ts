import { Request, Response, Router } from 'express'
import { getUserId } from '../common/utils'
import { getCollection, addToCollection, removeFromCollection } from '../controllers/collection'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const userId = getUserId(req)

    return await getCollection(userId, res)
})

router.post('/', async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const { pressingId } = req.body

    return await addToCollection(userId, pressingId, res)
})

router.delete('/:pressingId', async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const { pressingId } = req.params

    return await removeFromCollection(userId, pressingId, res)
})

export default router
