import { env } from 'process'
import { cache, logger } from '../../app'
import { stripHtml } from 'string-strip-html'

const BASE_URL = 'http://ws.audioscrobbler.com/2.0/'

export async function getArtistBio(name: string) {
    const cachedData = await cache.get(name)
    if (cachedData) {
        logger.info(`Using cached artist bio for ${name}`)
        return cachedData
    }
    const url = BASE_URL + `?method=artist.getinfo&artist=${name}&api_key=${env.LASTFM_API_KEY}&format=json`
    try {
        const response = await fetch(url, {
            method: 'GET',
        })
        if (response.status === 200) {
            const data = await response.json()
            let bio = data['artist']['bio']['content']
            bio = stripHtml(bio).result // remove html tags
            bio = bio.replace('\n\n', ' ')
            await cache.set(name, bio, {
                EX: 60 * 60 * 24 * 2, // 2 days
            })
            return bio as string
        } else {
            console.log(response)
            logger.error('sth went wrong')
            return ''
        }
    } catch (error) {
        console.error(error)
        return ''
    }
}
