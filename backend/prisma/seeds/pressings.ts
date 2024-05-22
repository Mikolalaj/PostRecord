import { prisma } from '../../src/prisma'

export async function createPressings() {
    await prisma.pressing.upsert({
        where: { id: '2add5fec-3b3c-4ed6-8d82-5ca611f1101c' },
        update: {},
        create: {
            id: '2add5fec-3b3c-4ed6-8d82-5ca611f1101c',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
            name: 'Standard Black',
            image: 'lana-del-rey-dykttiatuob-black.png',
            color: 'dark',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'c93378da-b4c2-4754-898a-d3bf2a0d9f11' },
        update: {},
        create: {
            id: 'c93378da-b4c2-4754-898a-d3bf2a0d9f11',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
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
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
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
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
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
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
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
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
            },
            name: 'Limited Nude',
            image: 'lana-del-rey-dykttiatuob-nude.png',
            color: 'dark',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '586466b0-bdde-469d-a009-7914cbdd3dc6' },
        update: {},
        create: {
            id: '586466b0-bdde-469d-a009-7914cbdd3dc6',
            album: {
                connect: { id: '0837800c-e15a-45a0-9a99-bd38fdd4c66e' },
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
    await prisma.pressing.upsert({
        where: { id: '50de1d52-cc7c-4381-ac6f-ada7f3310248' },
        update: {},
        create: {
            id: '50de1d52-cc7c-4381-ac6f-ada7f3310248',
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
            name: 'Standard Black',
            image: 'birdy-portraits-black.png',
            color: 'dark',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'd787ce0c-d4cb-46a6-8c50-b5b365b8bdcb' },
        update: {},
        create: {
            id: 'd787ce0c-d4cb-46a6-8c50-b5b365b8bdcb',
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
            name: 'Exclusive Recycled',
            image: 'birdy-portraits-recycled.png',
            color: 'violet',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '365ca71b-df84-4c5d-91a7-2e8c67410928' },
        update: {},
        create: {
            id: '365ca71b-df84-4c5d-91a7-2e8c67410928',
            album: {
                connect: { id: '703fe9d3-5a13-4ce6-b4d9-418d9faba1f9' },
            },
            name: 'Retail Purple',
            image: 'birdy-portraits-purple.png',
            color: 'pink',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '491b0c68-7167-4804-a4c9-4a3566bcc849' },
        update: {},
        create: {
            id: '491b0c68-7167-4804-a4c9-4a3566bcc849',
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
            name: 'Urban Outfitters Pink',
            image: 'boygenius-the-record-pink.png',
            color: 'pink',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '90eac5d6-d231-4c5b-aaee-a922b54baac9' },
        update: {},
        create: {
            id: '90eac5d6-d231-4c5b-aaee-a922b54baac9',
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
            name: 'Indie Blue',
            image: 'boygenius-the-record-blue.png',
            color: 'blue',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '9012da7a-936f-4f27-a9bc-494dd0565aac' },
        update: {},
        create: {
            id: '9012da7a-936f-4f27-a9bc-494dd0565aac',
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
            name: 'Standard Black',
            image: 'boygenius-the-record-black.png',
            color: 'gray',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '167d1bef-8502-4225-a4da-5ec4704fde52' },
        update: {},
        create: {
            id: '167d1bef-8502-4225-a4da-5ec4704fde52',
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
            name: 'Exclusive Gray',
            image: 'boygenius-the-record-gray.png',
            color: 'gray',
        },
    })
    await prisma.pressing.upsert({
        where: { id: 'd749a751-0a5a-402b-8c78-98d1cc7b5195' },
        update: {},
        create: {
            id: 'd749a751-0a5a-402b-8c78-98d1cc7b5195',
            album: {
                connect: { id: '1b1bc3dd-8bcf-434e-a51a-e19383c5899b' },
            },
            name: 'Retail Orange',
            image: 'boygenius-the-record-orange.png',
            color: 'orange',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '776b9751-b3cb-46d9-a50b-ce895f6f1cb2' },
        update: {},
        create: {
            id: '776b9751-b3cb-46d9-a50b-ce895f6f1cb2',
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
            name: 'Raw Ochre',
            image: 'hozier-unreal-unearth-raw-ochre.png',
            color: 'orange',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '68f8ca22-fda9-4be9-abaf-39075c556439' },
        update: {},
        create: {
            id: '68f8ca22-fda9-4be9-abaf-39075c556439',
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
            name: 'Standard Black',
            image: 'hozier-unreal-unearth-black.png',
            color: 'dark',
        },
    })
    await prisma.pressing.upsert({
        where: { id: '21195c0e-0969-4df3-a8f8-cf3e9d212b2f' },
        update: {},
        create: {
            id: '21195c0e-0969-4df3-a8f8-cf3e9d212b2f',
            album: {
                connect: { id: 'd3e7cbef-5970-4712-ac1f-4b858539aab0' },
            },
            name: 'Burn Clay',
            image: 'hozier-unreal-unearth-burnt-clay.png',
            color: 'red',
        },
    })
}
