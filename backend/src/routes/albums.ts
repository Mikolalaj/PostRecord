import { Request, Response, Router } from 'express'
import { getAlbums } from '../controllers/albums'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    return getAlbums(req, res)
})

export default router
