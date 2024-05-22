import { prisma } from '../../src/prisma'

export async function createAlbums() {
    await prisma.album.upsert({
        where: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
        update: {},
        create: {
            id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e',
            artist: {
                connect: {
                    id: 'd707eaa8-676a-4209-b0a4-348f525f85a0',
                },
            },
            title: "Did you know that there's a tunnel under Ocean Blvd",
            spotifyId: '5HOHne1wzItQlIYmLXLYfZ',
            genre: 'Alternative/Indie',
            image: 'https://i.scdn.co/image/ab67616d00001e0259ae8cf65d498afdd5585634',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b27359ae8cf65d498afdd5585634',
            releaseDate: new Date('2023-03-24'),
        },
    })
    await prisma.album.upsert({
        where: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
        update: {},
        create: {
            id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f',
            artist: {
                connect: {
                    id: '21ef71ee-8a1c-46be-b7f8-9f742e50826e',
                },
            },
            title: 'Surrender',
            spotifyId: '2VeOtQQAJxR8VyvmoXqIbI',
            genre: 'Indie Pop',
            image: 'https://i.scdn.co/image/ab67616d00001e020fdfb62956211c999c39a5a3',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b2730fdfb62956211c999c39a5a3',
            releaseDate: new Date('2022-07-29'),
        },
    })
    await prisma.album.upsert({
        where: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
        update: {},
        create: {
            id: '99f1160a-be73-4287-91e2-f8a5c9710f48',
            artist: {
                connect: {
                    id: 'b550927e-fc9a-4312-959f-500f17c1caac',
                },
            },
            title: 'Midnights',
            spotifyId: '151w1FgRZfnKZA9FEcg9Z3',
            genre: 'Pop',
            image: 'https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5',
            releaseDate: new Date('2022-10-21'),
        },
    })
    await prisma.album.upsert({
        where: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
        update: {},
        create: {
            id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9',
            artist: {
                connect: {
                    id: '273cc6f3-fa78-4f78-98fb-7c693975bcfe',
                },
            },
            spotifyId: '0ntTitta8btOS93RiM3TrO',
            title: 'Portraits',
            genre: 'Alternative/Indie',
            image: 'https://i.scdn.co/image/ab67616d00001e0265dc484b9e9e11306d51fe34',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b27365dc484b9e9e11306d51fe34',
            releaseDate: new Date('2023-08-18'),
        },
    })
    await prisma.album.upsert({
        where: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
        update: {},
        create: {
            id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b',
            artist: {
                connect: {
                    id: 'a4bb6aab-4b55-46b3-8c4d-3d0f0a096763',
                },
            },
            title: 'The Record',
            spotifyId: '0e9GjrztzBw8oMC6n2CDeI',
            genre: 'Indie Rock',
            image: 'https://i.scdn.co/image/ab67616d00001e0243fc02bcfa7cd4e6bb66aa22',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b27343fc02bcfa7cd4e6bb66aa22',
            releaseDate: new Date('2023-03-31'),
        },
    })
    await prisma.album.upsert({
        where: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
        update: {},
        create: {
            id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0',
            artist: {
                connect: {
                    id: 'fdfd36d6-4cb7-4b5b-a508-aff67ceedccd'
                }
            },
            title: 'Unreal Unearth',
            spotifyId: '0TFpENEamBfIfGISdSTXFB',
            genre: 'Rock',
            image: 'https://i.scdn.co/image/ab67616d00001e024a60a2e02534ecabc839dbe9',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b2734a60a2e02534ecabc839dbe9',
            releaseDate: new Date('2023-08-18'),
        },
    })
    await prisma.album.upsert({
        where: { id: '8b709fa2-5ae3-4beb-83b5-054878bc03b4' },
        update: {},
        create: {
            id: '8b709fa2-5ae3-4beb-83b5-054878bc03b4',
            artist: {
                connect: {
                    id: '8659a49d-d085-4455-9785-527bd5a667b3'
                }
            },
            title: '30',
            spotifyId: '21jF5jlMtzo94wbxmJ18aa',
            genre: 'Pop',
            image: 'https://i.scdn.co/image/ab67616d00001e02c6b577e4c4a6d326354a89f7',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b273c6b577e4c4a6d326354a89f7',
            releaseDate: new Date('2021-11-19'),
        },
    })
    await prisma.album.upsert({
        where: { id: '184d5ef5-9f39-48d2-a82a-17d89f6acdfe' },
        update: {},
        create: {
            id: '184d5ef5-9f39-48d2-a82a-17d89f6acdfe',
            artist: {
                connect: {
                    id: 'a834ef43-09ad-4e7e-8c48-f15b1c552cd1'
                }
            },
            title: 'COWBOY CARTER',
            spotifyId: '6BzxX6zkDsYKFJ04ziU5xQ',
            genre: 'Country, Pop',
            image: 'https://i.scdn.co/image/ab67616d00001e021572698fff8a1db257a53599',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b2731572698fff8a1db257a53599',
            releaseDate: new Date('2024-03-29'),
        },
    })
    await prisma.album.upsert({
        where: { id: '20578b87-b044-4d43-9a26-b7bcd46f3f7f' },
        update: {},
        create: {
            id: '20578b87-b044-4d43-9a26-b7bcd46f3f7f',
            artist: {
                connect: {
                    id: 'd7f9ade2-cf95-4f71-b7c9-9cdbb9a9b8f2'
                }
            },
            title: 'Lungs',
            spotifyId: '1rLLyY5p6HXNl2lKzINWp5',
            genre: 'Pop',
            image: 'https://i.scdn.co/image/ab67616d00001e02003f81b1f4246362638e682d',
            imageLarge: 'https://i.scdn.co/image/ab67616d0000b273003f81b1f4246362638e682d',
            releaseDate: new Date('2009-07-03'),
        },
    })
}