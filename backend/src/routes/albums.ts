import { Request, Response, Router } from 'express'
import { AlbumsParams, getAlbum, getSpotifyAlbum, getAlbums, searchSpotifyAlbums, addAlbum } from '../controllers/albums'
import { getUserId } from '../common/utils'
import formidableMiddleware from 'express-formidable'

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

router.use(formidableMiddleware())

router.post('/', async (req: Request, res: Response) => {
    if (!req.fields) {
        return res.status(400).send({ message: 'No album data provided' })
    }
    const album = req.fields.album
    if (!album) {
        return res.status(400).send({ message: 'No album provided' })
    }

    const files = req.files
    if (!files) {
        return res.status(400).send({ message: 'No album nor pressings images provided' })
    }
    const albumObject = JSON.parse(album as unknown as string)
    const pressings = albumObject.pressings.map((pressing: any) => {
        const image = files[pressing.imageName]
        if (!image) {
            return res.status(400).send({ message: `No pressing "${pressing.name}" image provides provided` })
        }
        return {
            color: pressing.color,
            name: pressing.name,
            image: image,
        }
    })
    const newAlbum = await addAlbum({
        image: albumObject.image,
        genre: albumObject.genre,
        albumId: albumObject.albumId,
        artistId: albumObject.artistId,
        artistName: albumObject.artistName,
        releaseDate: albumObject.releaseDate,
        tracklist: albumObject.tracklist,
        pressings: pressings,
    })
    return res.status(200).send(newAlbum)
})

export default router
