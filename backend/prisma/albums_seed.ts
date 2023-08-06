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
    await prisma.album.upsert({
        where: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
        update: {},
        create: {
            id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f',
            spotifyId: '2VeOtQQAJxR8VyvmoXqIbI', // Surrender
            artistSpotifyId: '4NZvixzsSefsNiIqXn0NDe', // Maggie Rogers
            genre: 'Indie Pop',
        },
    })
    await prisma.album.upsert({
        where: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
        update: {},
        create: {
            id: '99f1160a-be73-4287-91e2-f8a5c9710f48',
            spotifyId: '151w1FgRZfnKZA9FEcg9Z3', // Midnights
            artistSpotifyId: '06HL4z0CvFAxyc27GXpf02', // Taylor Swift
            genre: 'Pop',
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
    await prisma.pressing.upsert({
        where: { id: 'caea3aaa-bdb1-4a8b-b8eb-4d90a523cc87' },
        update: {},
        create: {
            id: 'caea3aaa-bdb1-4a8b-b8eb-4d90a523cc87',
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
            name: 'Black',
            image: 'maggie-rogers-surrender-black.png',
            color: 'dark',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'ef2aa0d5-8947-4112-8a70-cee14e65e06e' },
        update: {},
        create: {
            id: 'ef2aa0d5-8947-4112-8a70-cee14e65e06e',
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
            name: 'Hot Pink',
            image: 'maggie-rogers-surrender-pink.png',
            color: 'pink',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'cc73b71f-a8b2-4841-a508-11b2dd5703b0' },
        update: {},
        create: {
            id: 'cc73b71f-a8b2-4841-a508-11b2dd5703b0',
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
            name: 'Teardrop Blue',
            image: 'maggie-rogers-surrender-blue.png',
            color: 'blue',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'f4379ee9-450c-4ff0-af43-a235f9bd0a6b' },
        update: {},
        create: {
            id: 'f4379ee9-450c-4ff0-af43-a235f9bd0a6b',
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
            name: 'Orchid',
            image: 'maggie-rogers-surrender-purple.png',
            color: 'grape',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'ddc47e7d-6f1e-4a5c-b65e-aa8b7b3847ea' },
        update: {},
        create: {
            id: 'ddc47e7d-6f1e-4a5c-b65e-aa8b7b3847ea',
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
            name: 'Spring Green',
            image: 'maggie-rogers-surrender-green.png',
            color: 'green',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '5c8af1ea-0d01-4b7f-a979-3b93b9a67cf6' },
        update: {},
        create: {
            id: '5c8af1ea-0d01-4b7f-a979-3b93b9a67cf6',
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
            name: 'Tangerine Dream',
            image: 'maggie-rogers-surrender-orange.png',
            color: 'orange',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '0b468081-bd6e-4614-8db5-163aa65bccbd' },
        update: {},
        create: {
            id: '0b468081-bd6e-4614-8db5-163aa65bccbd',
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
            name: 'Jade Green',
            image: 'taylor-swift-midnights-jade-green.png',
            color: 'green',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'd0e72ec6-cddc-420b-813d-c805c8c4f83e' },
        update: {},
        create: {
            id: 'd0e72ec6-cddc-420b-813d-c805c8c4f83e',
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
            name: 'Mahogany',
            image: 'taylor-swift-midnights-mahogany.png',
            color: 'orange',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '575186ad-4b72-4fed-9f12-1a1ef4cdfb62' },
        update: {},
        create: {
            id: '575186ad-4b72-4fed-9f12-1a1ef4cdfb62',
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
            name: 'Blood Moon',
            image: 'taylor-swift-midnights-blood-moon.png',
            color: 'yellow',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '35418d9b-c6d8-488e-b330-57347ebd395a' },
        update: {},
        create: {
            id: '35418d9b-c6d8-488e-b330-57347ebd395a',
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
            name: 'Lavender',
            image: 'taylor-swift-midnights-lavender.png',
            color: 'grape',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '52f1c288-e23d-49ff-b58f-976a59f99db4' },
        update: {},
        create: {
            id: '52f1c288-e23d-49ff-b58f-976a59f99db4',
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
            name: 'Moonstone Blue',
            image: 'taylor-swift-midnights-moonstone-blue.png',
            color: 'blue',
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
