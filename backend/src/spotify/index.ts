import { env } from 'process'
import { client, prisma } from '../app'

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

async function saveNewAccessToken(userId: string) {
    const newToken = await generateNewAccessToken()
    await prisma.user.update({
        where: { id: userId },
        data: { spotifyToken: newToken },
    })
    return newToken
}

async function getAccessToken(userId: string): Promise<string> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { spotifyToken: true },
    })
    if (user === null) {
        throw new Error('User not found')
    }
    if (user.spotifyToken === null) {
        return await saveNewAccessToken(userId)
    }
    return user.spotifyToken
}

export async function getSpotifyData(userId: string, url: string) {
    const cachedData = await client.get(url)
    if (cachedData) {
        console.log('using cached data')
        return JSON.parse(cachedData)
    }
    const token = await getAccessToken(userId)
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }
    try {
        const response = await fetch(url, options)
        if (response.status === 401) {
            const newToken = await await saveNewAccessToken(userId)
            const options = {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + newToken,
                },
            }
            const response = await fetch(url, options)
            const data = await response.json()
            return data
        }
        const data = await response.json()
        await client.set(url, JSON.stringify(data))
        return data
    } catch (error) {
        console.error(error)
    }
}
