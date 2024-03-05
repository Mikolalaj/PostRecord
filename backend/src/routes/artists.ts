import { Response, Router } from 'express'
import { getAllArtists } from '../controllers/artists'
import { RequestWithFilterParams } from '../types'

const router = Router()

router.get('/', async (req: RequestWithFilterParams, res: Response) => {
    return await getAllArtists(req, res)
})

export default router
