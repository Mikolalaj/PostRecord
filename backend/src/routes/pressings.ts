import { Request, Response, Router } from 'express'
import { getPressings } from '../controllers/pressings'

const router = Router()

router.get('/:albumId', async (req: Request, res: Response) => {
    const { albumId } = req.params
    return await getPressings(albumId, req, res)
})

export default router
