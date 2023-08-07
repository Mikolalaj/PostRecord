import { env } from 'process'
import { cache, logger } from '../app'

async function generateNewAccessToken() {
    let auth = env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET
    auth = Buffer.from(auth).toString('base64')

    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ grant_type: 'client_credentials' }),
    }

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', options)
        return response.json().then(data => data.access_token)
    } catch (error) {
        console.error(error)
    }
}

async function saveNewAccessToken(): Promise<string> {
    const newToken = await generateNewAccessToken()
    await cache.set('spotifyAccessToken', newToken)
    return newToken
}

async function getAccessToken(): Promise<string> {
    const spotifyAccessToken = await cache.get('spotifyAccessToken')
    if (spotifyAccessToken !== null) {
        return spotifyAccessToken
    }
    return await saveNewAccessToken()
}

export async function getSpotifyData(url: string) {
    const cachedData = await cache.get(url)
    if (cachedData) {
        logger.info(`Using cached data for ${url}`)
        return JSON.parse(cachedData)
    }
    const token = await getAccessToken()
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }
    try {
        const response = await fetch('https://api.spotify.com/v1' + url, options)
        if (response.status === 401) {
            const newToken = await saveNewAccessToken()
            const options = {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + newToken,
                },
            }
            const response = await fetch('https://api.spotify.com/v1' + url, options)
            const data = await response.json()
            return data
        }
        const data = await response.json()
        await cache.set(url, JSON.stringify(data))
        return data
    } catch (error) {
        console.error(error)
    }
}
