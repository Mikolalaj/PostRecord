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
            let bio = stripHtml(data['artist']['bio']['summary']).result
            bio = bio.replace('\n\n', ' ')
            bio = bio.replace(' Read more on Last.fm', '.')
            await cache.set(name, bio)
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
