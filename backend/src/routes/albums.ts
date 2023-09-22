import { Request, Response, Router } from 'express'
import { AlbumsParams, getAlbum, getSpotifyAlbum, getAlbums, searchSpotifyAlbums } from '../controllers/albums'
import { getUserId } from '../common/utils'

const router = Router()

router.get('/', async (req: Request<{}, {}, {}, AlbumsParams>, res: Response) => {
    return getAlbums(req, res)
})

router.get('/search', async (req: Request<{}, {}, {}, { query: string }>, res: Response) => {
    const { query } = req.query
    const result = await searchSpotifyAlbums(query)
    return res.status(200).send(result)
})

router.get('/:albumId', async (req: Request, res: Response) => {
    const { albumId } = req.params
    const userId = getUserId(req)
    const album = await getAlbum(albumId, userId)
    return res.status(200).send(album)
})

router.get('/spotify/:albumSpotifyId', async (req: Request, res: Response) => {
    const { albumSpotifyId } = req.params
    const album = await getSpotifyAlbum(albumSpotifyId)
    return res.status(200).send(album)
})


export default router
