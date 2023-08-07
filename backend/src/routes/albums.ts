import { Request, Response, Router } from 'express'
import { getAlbum, getAlbums } from '../controllers/albums'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    return getAlbums(req, res)
})

router.get('/:albumId', async (req: Request, res: Response) => {
    const { albumId } = req.params
    const album = await getAlbum(albumId)
    return res.status(200).send(album)
})

export default router
