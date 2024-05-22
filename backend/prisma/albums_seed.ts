import { prisma } from '../src/prisma'
import { createAlbums } from './seeds/albums'
import { createArtists } from './seeds/artists'
import { createPressings } from './seeds/pressings'
import { createTracks } from './seeds/tracks'

async function main() {
    await createArtists()
    await createAlbums()
    await createPressings()
    await createTracks()
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
