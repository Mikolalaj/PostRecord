import { prisma } from '../src/app'

async function main() {
    await createAlbums()
    await createPressings()
}

async function createAlbums() {
    await prisma.album.upsert({
        where: { id: '81cb450c-33cf-446a-aecc-ff582545b5d5' },
        update: {},
        create: {
            id: '81cb450c-33cf-446a-aecc-ff582545b5d5',
            spotifyId: '5HOHne1wzItQlIYmLXLYfZ', // Did you know that there's a tunnel under Ocean Blvd
            artistSpotifyId: '00FQb4jTyendYWaN8pK0wa', // Lana Del Rey
            genre: 'Alternative/Indie',
        },
    })
}

async function createPressings() {
    await prisma.pressing.upsert({
        where: { id: '2add5fec-3b3c-4ed6-8d82-5ca611f1101c' },
        update: {},
        create: {
            id: '2add5fec-3b3c-4ed6-8d82-5ca611f1101c',
            album: {
                connect: { id: '81cb450c-33cf-446a-aecc-ff582545b5d5' },
            },
            name: 'Standard Black',
            image: 'lana-del-rey-dykttiatuob-black.png',
            color: 'gray',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'c93378da-b4c2-4754-898a-d3bf2a0d9f11' },
        update: {},
        create: {
            id: 'c93378da-b4c2-4754-898a-d3bf2a0d9f11',
            album: {
                connect: { id: '81cb450c-33cf-446a-aecc-ff582545b5d5' },
            },
            name: 'Retail Red',
            image: 'lana-del-rey-dykttiatuob-red.png',
            color: 'red',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '25aeb909-e653-4ea0-8f36-e7f9adb549be' },
        update: {},
        create: {
            id: '25aeb909-e653-4ea0-8f36-e7f9adb549be',
            album: {
                connect: { id: '81cb450c-33cf-446a-aecc-ff582545b5d5' },
            },
            name: 'Amazon Green',
            image: 'lana-del-rey-dykttiatuob-green.png',
            color: 'green',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '2b7bcf2d-0278-46c4-a118-f93b922e15ce' },
        update: {},
        create: {
            id: '2b7bcf2d-0278-46c4-a118-f93b922e15ce',
            album: {
                connect: { id: '81cb450c-33cf-446a-aecc-ff582545b5d5' },
            },
            name: 'Indie Pink',
            image: 'lana-del-rey-dykttiatuob-pink.png',
            color: 'pink',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'b24bf357-a65b-4738-8d7a-b1f0bd0efb69' },
        update: {},
        create: {
            id: 'b24bf357-a65b-4738-8d7a-b1f0bd0efb69',
            album: {
                connect: { id: '81cb450c-33cf-446a-aecc-ff582545b5d5' },
            },
            name: 'Webstore White',
            image: 'lana-del-rey-dykttiatuob-white.png',
            color: 'gray',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '5db17bee-08b4-480e-8d7b-b520ff426899' },
        update: {},
        create: {
            id: '5db17bee-08b4-480e-8d7b-b520ff426899',
            album: {
                connect: { id: '81cb450c-33cf-446a-aecc-ff582545b5d5' },
            },
            name: 'Limited Nude',
            image: 'lana-del-rey-dykttiatuob-nude.png',
            color: 'gray',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '586466b0-bdde-469d-a009-7914cbdd3dc6' },
        update: {},
        create: {
            id: '586466b0-bdde-469d-a009-7914cbdd3dc6',
            album: {
                connect: { id: '81cb450c-33cf-446a-aecc-ff582545b5d5' },
            },
            name: 'Picture Disk',
            image: 'lana-del-rey-dykttiatuob-picture.png',
            color: 'gray',
        },
    })
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
