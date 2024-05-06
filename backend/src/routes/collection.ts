import { Request, Response, Router } from 'express'
import { getUserId } from '../common/utils'
import { getCollection, addToCollection, removeFromCollection, setSalePrice, removeFromSale } from '../controllers/collection'

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

router.put('/sale', async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const { pressingId, price } = req.body

    return await setSalePrice(userId, pressingId, price, res)
})

router.delete('/sale/:pressingId', async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const { pressingId } = req.params

    return await removeFromSale(userId, pressingId, res)
})

export default router
