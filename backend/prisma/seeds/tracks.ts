import { prisma } from '../../src/app'

export async function createTracks() {
    await prisma.track.upsert({
        where: { id: 'cf8072d5-5730-42cd-ab21-b8adba1a60b6' },
        update: {},
        create: {
            id: 'cf8072d5-5730-42cd-ab21-b8adba1a60b6',
            title: 'The Grants',
            number: 1,
            spotifyId: '3KbOflJ5JqHWtmco4PiO3h',
            duration: 295,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'dec0be14-c6f6-43f4-8e72-2346f949743d' },
        update: {},
        create: {
            id: 'dec0be14-c6f6-43f4-8e72-2346f949743d',
            title: "Did you know that there's a tunnel under Ocean Blvd",
            number: 2,
            spotifyId: '0HEzuLLojblUOaUSdmJ9gl',
            duration: 285,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'b6d8cc06-ae92-4f6d-8276-34caa93cff5f' },
        update: {},
        create: {
            id: 'b6d8cc06-ae92-4f6d-8276-34caa93cff5f',
            title: 'Sweet',
            number: 3,
            spotifyId: '6x8g6DxglrzCSwKhv2Q1ee',
            duration: 215,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '077b059a-d5c4-4480-a808-a064acddd09f' },
        update: {},
        create: {
            id: '077b059a-d5c4-4480-a808-a064acddd09f',
            title: 'A&W',
            number: 4,
            spotifyId: '5nW4z3pfZgJAJ2QTCz9AIE',
            duration: 433,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'a0822298-18d6-4eb0-971e-c15fb4d376e1' },
        update: {},
        create: {
            id: 'a0822298-18d6-4eb0-971e-c15fb4d376e1',
            title: 'Judah Smith Interlude',
            number: 5,
            spotifyId: '4fFqFgMDP9lY8tqEoArFGq',
            duration: 276,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '1667d2ce-44b5-4a52-ac33-c66c9bf44b08' },
        update: {},
        create: {
            id: '1667d2ce-44b5-4a52-ac33-c66c9bf44b08',
            title: 'Candy Necklace',
            number: 6,
            spotifyId: '3MlEryrxCKZkcfX18ZLX96',
            duration: 314,
            features: 'Jon Batiste',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '39c0b161-f886-49ba-80c3-e5b5b01b8424' },
        update: {},
        create: {
            id: '39c0b161-f886-49ba-80c3-e5b5b01b8424',
            title: 'Jon Batiste Interlude',
            number: 7,
            spotifyId: '2JFVBojvTHpSZLoyowuZys',
            duration: 213,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '320399f2-6834-4bd1-9907-bfbed6c42d04' },
        update: {},
        create: {
            id: '320399f2-6834-4bd1-9907-bfbed6c42d04',
            title: 'Kintsugi',
            number: 8,
            spotifyId: '4VL310GGX3b2ixL3sV0Je8',
            duration: 378,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '86d66c66-21a7-4bce-8173-c96f7832c4a5' },
        update: {},
        create: {
            id: '86d66c66-21a7-4bce-8173-c96f7832c4a5',
            title: 'Fingertips',
            number: 9,
            spotifyId: '1BUckPDAi8NYfLN7EiQcQA',
            duration: 348,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '18eb1e1c-ab4f-4682-944c-a32d14d269db' },
        update: {},
        create: {
            id: '18eb1e1c-ab4f-4682-944c-a32d14d269db',
            title: 'Paris, Texas',
            number: 10,
            spotifyId: '0Oqxt6JixieLHbwMfnJGWO',
            duration: 206,
            features: 'SYML',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'a91ad951-6d36-4593-aee8-e5b3a19cd530' },
        update: {},
        create: {
            id: 'a91ad951-6d36-4593-aee8-e5b3a19cd530',
            title: "Grandfather please stand on the shoulders of my father while he's deep-sea fishing",
            number: 11,
            spotifyId: '55LnC7VuUvayQ3fW0CvDL6',
            duration: 240,
            features: 'RIOPY',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'e612d8c7-bf47-4a18-a4d9-ec48373b662e' },
        update: {},
        create: {
            id: 'e612d8c7-bf47-4a18-a4d9-ec48373b662e',
            title: 'Let The Light In',
            number: 12,
            spotifyId: '4qG7hWhljsqqENL5PaLA2z',
            duration: 278,
            features: 'Father John Misty',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'e9ca7d9d-c416-48e9-9c95-b2ffffdbcf80' },
        update: {},
        create: {
            id: 'e9ca7d9d-c416-48e9-9c95-b2ffffdbcf80',
            title: 'Margaret',
            number: 13,
            spotifyId: '1o82DwNisONAd2mu1RcGE6',
            duration: 339,
            features: 'Bleachers',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'c93dacf6-f2b1-4599-a671-4541da40f0ef' },
        update: {},
        create: {
            id: 'c93dacf6-f2b1-4599-a671-4541da40f0ef',
            title: 'Fishtail',
            number: 14,
            spotifyId: '4Cg9XRHLP3s5ZiQaIdL4zW',
            duration: 242,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'cd6c4766-27dc-427a-a14b-e0f2c3af520b' },
        update: {},
        create: {
            id: 'cd6c4766-27dc-427a-a14b-e0f2c3af520b',
            title: 'Peppers',
            number: 15,
            spotifyId: '2Rlso2ZNV0PaWwUYeeBYxx',
            duration: 248,
            features: 'Tommy Genesis',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '69e943c5-670b-460c-8a0d-e0b6f77ecb18' },
        update: {},
        create: {
            id: '69e943c5-670b-460c-8a0d-e0b6f77ecb18',
            title: 'Taco Truck x VB',
            number: 16,
            spotifyId: '79wgotDiVZml9PiTtNtYBA',
            duration: 353,
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '813a37b8-771f-419c-a177-6035af7f99ca' },
        update: {},
        create: {
            id: '813a37b8-771f-419c-a177-6035af7f99ca',
            title: 'Overdrive',
            number: 1,
            spotifyId: '5WjKzP0MY4COScm6VPrLqU',
            duration: 194,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'def70f59-7f5f-4b07-8000-1ec3586e0424' },
        update: {},
        create: {
            id: 'def70f59-7f5f-4b07-8000-1ec3586e0424',
            title: "That's Where I Am",
            number: 2,
            spotifyId: '49EXOlUTFBGdI098L6SXDh',
            duration: 252,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '1b4a0a35-6d07-44ee-a6c6-d2a04bdae96b' },
        update: {},
        create: {
            id: '1b4a0a35-6d07-44ee-a6c6-d2a04bdae96b',
            title: 'Want Want',
            number: 3,
            spotifyId: '1dSTDwgJBmHw3RaiM9h2ah',
            duration: 188,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'a0ce6549-2e38-4973-b91f-f4b733e1d569' },
        update: {},
        create: {
            id: 'a0ce6549-2e38-4973-b91f-f4b733e1d569',
            title: 'Anywhere With You',
            number: 4,
            spotifyId: '4Hxcb6wDlelhZpk5fc5jmD',
            duration: 297,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '815e8c3f-95e8-4bcd-8181-adef671f926d' },
        update: {},
        create: {
            id: '815e8c3f-95e8-4bcd-8181-adef671f926d',
            title: 'Horses',
            number: 5,
            spotifyId: '1cncEDS6zwXOguyaMGp6vU',
            duration: 305,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '8842b3a9-c59b-4962-b32e-1ce90f6b5a93' },
        update: {},
        create: {
            id: '8842b3a9-c59b-4962-b32e-1ce90f6b5a93',
            title: 'Be Cool',
            number: 6,
            spotifyId: '13WcpETaTUAFDyhVvvXdDa',
            duration: 177,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '2c6d103d-1e62-4320-a314-270516b8b885' },
        update: {},
        create: {
            id: '2c6d103d-1e62-4320-a314-270516b8b885',
            title: 'Shatter',
            number: 7,
            spotifyId: '4MP5tSTc6LxY8xhrUOv9Ya',
            duration: 220,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '2b8339f7-3f0a-48b2-9287-aa8075da6952' },
        update: {},
        create: {
            id: '2b8339f7-3f0a-48b2-9287-aa8075da6952',
            title: 'Begging for Rain',
            number: 8,
            spotifyId: '7GZsRf95nGjdm5APIdS2iM',
            duration: 253,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'ac37b3bf-6f7f-4bc2-b8c7-f856d087c6cb' },
        update: {},
        create: {
            id: 'ac37b3bf-6f7f-4bc2-b8c7-f856d087c6cb',
            title: "I've Got a Friend",
            number: 9,
            spotifyId: '6E1cegf6QEL0J3bCt5tCIC',
            duration: 192,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'fedf260f-26af-436d-8a5c-5c4c6c0095ba' },
        update: {},
        create: {
            id: 'fedf260f-26af-436d-8a5c-5c4c6c0095ba',
            title: 'Honey',
            number: 10,
            spotifyId: '1zoPdnExrABr51QDrEoZUQ',
            duration: 222,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'c4757e32-e2ef-4f2a-ba2e-592664845be3' },
        update: {},
        create: {
            id: 'c4757e32-e2ef-4f2a-ba2e-592664845be3',
            title: 'Symphony',
            number: 11,
            spotifyId: '7IFkBotMhW6cSOxdVNZIZN',
            duration: 311,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '08f4e387-dc39-4f2f-8954-1a1cb8b58619' },
        update: {},
        create: {
            id: '08f4e387-dc39-4f2f-8954-1a1cb8b58619',
            title: 'Different Kind of World',
            number: 12,
            spotifyId: '2cWMbr0aGddDlXbTEzSAxn',
            duration: 165,
            album: {
                connect: { id: 'ad322cd7-696f-4e0d-9e6d-f438f329437f' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '3141752c-d919-44f6-9be6-7b4263677bfc' },
        update: {},
        create: {
            id: '3141752c-d919-44f6-9be6-7b4263677bfc',
            title: 'Lavender Haze',
            number: 1,
            spotifyId: '5jQI2r1RdgtuT8S3iG8zFC',
            duration: 202,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '2a4507dd-dd92-4edb-a681-197de0ebb67b' },
        update: {},
        create: {
            id: '2a4507dd-dd92-4edb-a681-197de0ebb67b',
            title: 'Maroon',
            number: 2,
            spotifyId: '3eX0NZfLtGzoLUxPNvRfqm',
            duration: 218,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '61081dc3-0a83-4f42-b8bc-ed5621a5549e' },
        update: {},
        create: {
            id: '61081dc3-0a83-4f42-b8bc-ed5621a5549e',
            title: 'Anti-Hero',
            number: 3,
            spotifyId: '0V3wPSX9ygBnCm8psDIegu',
            duration: 200,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '9382bbc8-2aae-46ee-b8ab-91ca56868a0d' },
        update: {},
        create: {
            id: '9382bbc8-2aae-46ee-b8ab-91ca56868a0d',
            title: 'Snow On The Beach',
            features: 'Lana Del Rey',
            number: 4,
            spotifyId: '1wtOxkiel43cVs0Yux5Q4h',
            duration: 256,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '0bbc98a4-080c-4a3e-8742-7ffebcfe4e66' },
        update: {},
        create: {
            id: '0bbc98a4-080c-4a3e-8742-7ffebcfe4e66',
            title: "You're On Your Own, Kid",
            number: 5,
            spotifyId: '4D7BCuvgdJlYvlX5WlN54t',
            duration: 194,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'f5528de4-108c-4200-bd7f-73757ff2e576' },
        update: {},
        create: {
            id: 'f5528de4-108c-4200-bd7f-73757ff2e576',
            title: 'Midnight Rain',
            number: 6,
            spotifyId: '3rWDp9tBPQR9z6U5YyRSK4',
            duration: 174,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '8251568d-7986-4389-82d0-d1510e96fca8' },
        update: {},
        create: {
            id: '8251568d-7986-4389-82d0-d1510e96fca8',
            title: 'Question...?',
            number: 7,
            spotifyId: '0heeNYlwOGuUSe7TgUD27B',
            duration: 210,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '2be33915-d544-4b82-9ab3-4bf1b9a2d135' },
        update: {},
        create: {
            id: '2be33915-d544-4b82-9ab3-4bf1b9a2d135',
            title: 'Vigilante Shit',
            number: 8,
            spotifyId: '1xwAWUI6Dj0WGC3KiUPN0O',
            duration: 164,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '6a782bc1-3e13-4253-94f4-438a21b71e82' },
        update: {},
        create: {
            id: '6a782bc1-3e13-4253-94f4-438a21b71e82',
            title: 'Bejeweled',
            number: 9,
            spotifyId: '3qoftcUZaUOncvIYjFSPdE',
            duration: 194,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '673a8d87-ff2e-4db3-a1d2-4fe15da127f3' },
        update: {},
        create: {
            id: '673a8d87-ff2e-4db3-a1d2-4fe15da127f3',
            title: 'Labyrinth',
            number: 10,
            spotifyId: '0A1JLUlkZkp2EFrosoNQi0',
            duration: 247,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'd4b831a4-205a-4640-b55f-430ef10da025' },
        update: {},
        create: {
            id: 'd4b831a4-205a-4640-b55f-430ef10da025',
            title: 'Karma',
            number: 11,
            spotifyId: '7KokYm8cMIXCsGVmUvKtqf',
            duration: 204,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '73cbe11c-a15e-4531-bf24-5c1e1904d8ff' },
        update: {},
        create: {
            id: '73cbe11c-a15e-4531-bf24-5c1e1904d8ff',
            title: 'Sweet Nothing',
            number: 12,
            spotifyId: '0wavGRldH0AWyu2zvTz8zb',
            duration: 188,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '081ee057-c9b4-428d-9745-b36d6ec916b9' },
        update: {},
        create: {
            id: '081ee057-c9b4-428d-9745-b36d6ec916b9',
            title: 'Mastermind',
            number: 13,
            spotifyId: '7FmYn9e7KHMXcxqGSj9LjH',
            duration: 191,
            album: {
                connect: { id: '99f1160a-be73-4287-91e2-f8a5c9710f48' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'ec7f9075-a8b0-4bad-b0c8-077b4dee3607' },
        update: {},
        create: {
            id: 'ec7f9075-a8b0-4bad-b0c8-077b4dee3607',
            title: 'Paradise Calling',
            number: 1,
            spotifyId: '2whqLIu4VLqZLfzfqs3AZa',
            duration: 186,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'b4226c4f-a0aa-4376-9c13-bda8aa89fffb' },
        update: {},
        create: {
            id: 'b4226c4f-a0aa-4376-9c13-bda8aa89fffb',
            title: 'Raincatchers',
            number: 2,
            spotifyId: '4A63fFDxYcCiTMBKtOvQRP',
            duration: 240,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'd29a90e9-291d-4db4-bd8b-789fe95657eb' },
        update: {},
        create: {
            id: 'd29a90e9-291d-4db4-bd8b-789fe95657eb',
            title: 'Ruins I',
            number: 3,
            spotifyId: '0IBlUpCwEAmz5aElyAUv8H',
            duration: 247,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '090ba534-09e0-4168-ab93-70d98ebf0897' },
        update: {},
        create: {
            id: '090ba534-09e0-4168-ab93-70d98ebf0897',
            title: 'Your Arms',
            number: 4,
            spotifyId: '31CFx5UNQHGnnAQkB17SHD',
            duration: 231,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '1e2880ce-87ee-4fbd-a3a3-7758ba819424' },
        update: {},
        create: {
            id: '1e2880ce-87ee-4fbd-a3a3-7758ba819424',
            title: 'Heartbreaker',
            number: 5,
            spotifyId: '6pzi6qWJ5sOKXm2Fqd5JGJ',
            duration: 184,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '91d38b9b-bdb8-4885-b31d-22b93492cf73' },
        update: {},
        create: {
            id: '91d38b9b-bdb8-4885-b31d-22b93492cf73',
            title: 'I Wish I Was A Shooting Star',
            number: 6,
            spotifyId: '4LgzdIJ6aR3UnTCr4EZ2Lt',
            duration: 217,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'f4911663-edb0-4bf8-b504-35b2237de46e' },
        update: {},
        create: {
            id: 'f4911663-edb0-4bf8-b504-35b2237de46e',
            title: 'Portraits',
            number: 7,
            spotifyId: '2Req5uUF6yCH0eaBUhWsCz',
            duration: 233,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '8ee13cfa-0d2e-4292-afae-945c7eec0e36' },
        update: {},
        create: {
            id: '8ee13cfa-0d2e-4292-afae-945c7eec0e36',
            title: 'Ruins II',
            number: 8,
            spotifyId: '7j65VLDmXUNOxGze8nfov9',
            duration: 250,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '910e9904-b1b2-4bb4-9b01-7ad575502f03' },
        update: {},
        create: {
            id: '910e9904-b1b2-4bb4-9b01-7ad575502f03',
            title: 'Automatic',
            number: 9,
            spotifyId: '5R8lOiAXEKj6IS1wJROpr7',
            duration: 187,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '7c5f41d8-fb11-48d5-83b1-4ef7646f18af' },
        update: {},
        create: {
            id: '7c5f41d8-fb11-48d5-83b1-4ef7646f18af',
            title: 'Battlefield',
            number: 10,
            spotifyId: '5FudlXZcml3lNb7x8cuJlt',
            duration: 235,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'd55900b0-9803-4524-9eb9-35a90c023b0e' },
        update: {},
        create: {
            id: 'd55900b0-9803-4524-9eb9-35a90c023b0e',
            title: "Tears Don't Fall",
            number: 11,
            spotifyId: '4Ji20mHDPRKdL7873Wz5Fd',
            duration: 209,
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'e31600be-27e7-4a37-81be-6f13ea08fc2e' },
        update: {},
        create: {
            id: 'e31600be-27e7-4a37-81be-6f13ea08fc2e',
            title: 'Without You Without Them',
            number: 1,
            spotifyId: '12EkF8uGofptstVIX7Oc0C',
            duration: 81,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '3bef493b-ee34-4a32-bc3f-f17f3d9e11e5' },
        update: {},
        create: {
            id: '3bef493b-ee34-4a32-bc3f-f17f3d9e11e5',
            title: '$20',
            number: 2,
            spotifyId: '38xXr3MkiKNzNDv4JDJagF',
            duration: 200,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '612b21c8-b34f-42b3-9afe-9031865d2143' },
        update: {},
        create: {
            id: '612b21c8-b34f-42b3-9afe-9031865d2143',
            title: "Emily I'm Sorry",
            number: 3,
            spotifyId: '693xmBAOD4xwkS4W71W1Jn',
            duration: 214,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'f163412b-5f20-4ff9-a1f7-45aac969aef4' },
        update: {},
        create: {
            id: 'f163412b-5f20-4ff9-a1f7-45aac969aef4',
            title: 'True Blue',
            number: 4,
            spotifyId: '48Qes8IUekSZpcNDQgYzUX',
            duration: 296,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '5620179b-b40d-42ef-889c-bc37d2885567' },
        update: {},
        create: {
            id: '5620179b-b40d-42ef-889c-bc37d2885567',
            title: 'Cool About It',
            number: 5,
            spotifyId: '5PJH1U5Iie893v48Fl9yaC',
            duration: 180,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '41780bea-2457-4433-be74-ce8dffde11b4' },
        update: {},
        create: {
            id: '41780bea-2457-4433-be74-ce8dffde11b4',
            title: 'Not Strong Enough',
            number: 6,
            spotifyId: '09DR0sHnQUhHOiSNttc1mv',
            duration: 234,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '0e3a9762-b098-4339-92d8-d6a9c77ff606' },
        update: {},
        create: {
            id: '0e3a9762-b098-4339-92d8-d6a9c77ff606',
            title: 'Revolution 0',
            number: 7,
            spotifyId: '0FUGzUqkqRktGBvIeM3p2X',
            duration: 257,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'b04c1c53-ee4f-4003-83dc-fb161651f752' },
        update: {},
        create: {
            id: 'b04c1c53-ee4f-4003-83dc-fb161651f752',
            title: 'Leonard Cohen',
            number: 8,
            spotifyId: '3wdrHVkaD700qA8P3OjmYR',
            duration: 102,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'e42c90e9-8bf2-4ab8-a456-a588765c6e78' },
        update: {},
        create: {
            id: 'e42c90e9-8bf2-4ab8-a456-a588765c6e78',
            title: 'Satanist',
            number: 9,
            spotifyId: '4QEsxFZRA3RnjQAPYS3UXa',
            duration: 290,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '4fdd1a73-75c5-4e85-8012-a96790631824' },
        update: {},
        create: {
            id: '4fdd1a73-75c5-4e85-8012-a96790631824',
            title: "We're In Love",
            number: 10,
            spotifyId: '5eoy62yFNJAli6AyKK5qnH',
            duration: 294,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '2a0d680b-2927-4f2b-9989-8c202adf3964' },
        update: {},
        create: {
            id: '2a0d680b-2927-4f2b-9989-8c202adf3964',
            title: 'Anti-Curse',
            number: 11,
            spotifyId: '4LOg3dKvCAJiF9NYC7YqzG',
            duration: 198,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'b5d52083-9378-4a87-ae55-b8e44de3d4b6' },
        update: {},
        create: {
            id: 'b5d52083-9378-4a87-ae55-b8e44de3d4b6',
            title: 'Letter To An Old Poet',
            number: 12,
            spotifyId: '1zShh2S3moxyqU6u6fJZVQ',
            duration: 187,
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'fa45a5bf-f82c-4431-a6d3-711155a78a5f' },
        update: {},
        create: {
            id: 'fa45a5bf-f82c-4431-a6d3-711155a78a5f',
            title: 'De Selby (Part 1)',
            number: 1,
            spotifyId: '6vRvqf5N1ZfCfG67s7EXH1',
            duration: 219,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'c29fa8db-6ece-4ecf-a988-2258c231e590' },
        update: {},
        create: {
            id: 'c29fa8db-6ece-4ecf-a988-2258c231e590',
            title: 'De Selby (Part 2)',
            number: 2,
            spotifyId: '0NiWSr6RZQQKWH2yG7fnrC',
            duration: 227,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'bb4d50f4-e7d3-4119-b00f-c508595ef932' },
        update: {},
        create: {
            id: 'bb4d50f4-e7d3-4119-b00f-c508595ef932',
            title: 'First Time',
            number: 3,
            spotifyId: '7M62aDkiSepRVEb32T9IO4',
            duration: 233,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '959231d9-95d4-492d-89a2-895fdc653f99' },
        update: {},
        create: {
            id: '959231d9-95d4-492d-89a2-895fdc653f99',
            title: 'Francesca',
            number: 4,
            spotifyId: '6bueV7zlPwN6eyhSan67Wb',
            duration: 270,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'c62f1872-e279-412c-a446-8bc487876a18' },
        update: {},
        create: {
            id: 'c62f1872-e279-412c-a446-8bc487876a18',
            title: 'I, Carrion (Icarian)',
            number: 5,
            spotifyId: '3zsTgPLNF9uEPjwu9jbKaU',
            duration: 196,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '394108d1-19f4-4f2c-8131-f064e4dfc551' },
        update: {},
        create: {
            id: '394108d1-19f4-4f2c-8131-f064e4dfc551',
            title: 'Eat Your Young',
            number: 6,
            spotifyId: '3hbKcj640iYmPQgecainOr',
            duration: 243,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'f0db4df3-c1bb-47ee-b5b6-8559a1aff0f8' },
        update: {},
        create: {
            id: 'f0db4df3-c1bb-47ee-b5b6-8559a1aff0f8',
            title: 'Damage Gets Done',
            number: 7,
            spotifyId: '1EYP6mRfJY45IDKETJsjMO',
            duration: 268,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '4aca005d-ffdd-49f5-9b27-54185292b316' },
        update: {},
        create: {
            id: '4aca005d-ffdd-49f5-9b27-54185292b316',
            title: 'Who We Are',
            number: 8,
            spotifyId: '44hoFQSNqQKKFPxKCCMoZ3',
            duration: 245,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'e675b6f5-e8ce-4748-a8f4-3b85fc0906a6' },
        update: {},
        create: {
            id: 'e675b6f5-e8ce-4748-a8f4-3b85fc0906a6',
            title: 'Son of Nyx',
            number: 9,
            spotifyId: '3LwcUjK7q0cnbeYJRZbjbd',
            duration: 199,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '77ace088-4f9d-45cb-a931-f64840433656' },
        update: {},
        create: {
            id: '77ace088-4f9d-45cb-a931-f64840433656',
            title: 'All Things End',
            number: 10,
            spotifyId: '6ntIhmLNCrx09gn9GhjZ5A',
            duration: 216,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '582ed09c-855a-4e67-bd68-803f9244fa6e' },
        update: {},
        create: {
            id: '582ed09c-855a-4e67-bd68-803f9244fa6e',
            title: 'To Someone From A Warm Climate (Uiscefhuaraithe)',
            number: 11,
            spotifyId: '0R0zHeoFVJHi9QbGL7cSaD',
            duration: 240,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '5ef70ca3-d398-450c-bfd6-8fc0a74b5840' },
        update: {},
        create: {
            id: '5ef70ca3-d398-450c-bfd6-8fc0a74b5840',
            title: 'Butchered Tongue',
            number: 12,
            spotifyId: '2fuTf4PvkLWAAVHetDc5yL',
            duration: 149,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '2efef0d4-bb5e-4b16-8997-da81b8d84412' },
        update: {},
        create: {
            id: '2efef0d4-bb5e-4b16-8997-da81b8d84412',
            title: 'Anything But',
            number: 13,
            spotifyId: '3vRQw2YQTzhNGvul0Cb7my',
            duration: 225,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'fcc9b20f-0db9-4f93-9cf5-d270100f7f1a' },
        update: {},
        create: {
            id: 'fcc9b20f-0db9-4f93-9cf5-d270100f7f1a',
            title: 'Abstract (Psychopomp)',
            number: 14,
            spotifyId: '6sZ7gxjnExFIU0fNA7vCWG',
            duration: 244,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: 'a39a86bd-c237-42d5-b982-65e9dfff3071' },
        update: {},
        create: {
            id: 'a39a86bd-c237-42d5-b982-65e9dfff3071',
            title: 'Unknown / Nth',
            number: 15,
            spotifyId: '05QGaQnoBuda27vXxpuiRU',
            duration: 280,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
    await prisma.track.upsert({
        where: { id: '2dc68c08-3efa-45dd-8c02-d72ac176b564' },
        update: {},
        create: {
            id: '2dc68c08-3efa-45dd-8c02-d72ac176b564',
            title: 'First Light',
            number: 16,
            spotifyId: '70DOGQeW4mp3KdDv7pRGlD',
            duration: 292,
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
        },
    })
}
