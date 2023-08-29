import { Request, Response, Router } from 'express'
import { AlbumsParams, getAlbum, getAlbums } from '../controllers/albums'
import { getUserId } from '../common/utils'

const router = Router()

router.get('/', async (req: Request<{}, {}, {}, AlbumsParams>, res: Response) => {
    return getAlbums(req, res)
})

router.get('/:albumId', async (req: Request, res: Response) => {
    const { albumId } = req.params
    const userId = getUserId(req)
    const album = await getAlbum(albumId, userId)
    return res.status(200).send(album)
})

export default router
