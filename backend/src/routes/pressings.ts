import { Request, Response, Router } from 'express'
import { getPressings, getAllPressings } from '../controllers/pressings'
import { FilterParams } from '../types'

const router = Router()

router.get('/', async (req: Request<{}, {}, {}, FilterParams>, res: Response) => {
    return await getAllPressings(req, res)
})

router.get('/:albumId', async (req: Request, res: Response) => {
    const { albumId } = req.params
    return await getPressings(albumId, req, res)
})

export default router
