import { Response } from 'express'
import { prisma } from '../app'
import { Pressing, Prisma } from '@prisma/client'

interface CollectionPressing extends Pressing {
    album: {
        id: string
        image: string
        releaseDate: Date
        title: string
        artist: string
    }
    addedAt: Date
    salePrice: number | null
}

export async function getCollection(userId: string, response: Response) {
    const pressings = await prisma.user.findUnique({ where: { id: userId } }).collection({ include: { pressing: true } })
    if (!pressings) {
        return response.status(404).send({ message: 'Collection not found' })
    }
    const collection: Array<CollectionPressing> = await Promise.all(
        pressings.map(async pressing => {
            const album = await prisma.album.findUnique({ where: { id: pressing.pressing.albumId } })
            if (!album) {
                throw new Error('Album not found')
            }
            const artist = await prisma.artist.findUnique({ where: { id: album.artistId } })
            if (!artist) {
                throw new Error('Artist not found')
            }
            return {
                ...pressing.pressing,
                album: {
                    id: album.id,
                    image: album.image,
                    releaseDate: album.releaseDate,
                    title: album.title,
                    artist: artist.name,
                },
                addedAt: pressing.addedAt,
                salePrice: pressing.salePrice,
            }
        })
    )
    return response.status(200).send(collection)
}

export async function addToCollection(userId: string, pressingId: string, response: Response) {
    if (!pressingId) {
        return response.status(400).send({ message: 'Missing pressingId' })
    }
    const pressing = await prisma.pressing.findUnique({ where: { id: pressingId } })
    if (!pressing) {
        return response.status(404).send({ message: 'Pressing not found' })
    }

    await prisma.pressingsForUser.create({
        data: {
            userId,
            pressingId,
        },
    })

    return response.status(201).send({ message: `You have added "${pressing.name}" pressing to your collection.` })
}

export async function removeFromCollection(userId: string, pressingId: string, response: Response) {
    if (!pressingId) {
        return response.status(400).send({ message: 'Missing pressingId' })
    }
    const pressing = await prisma.pressing.findUnique({ where: { id: pressingId } })
    if (!pressing) {
        return response.status(404).send({ message: 'Pressing not found' })
    }
    const pressingInCollection = await prisma.user.findUnique({ where: { id: userId } }).collection({ where: { pressingId } })
    if (!pressingInCollection) {
        return response.status(404).send({ message: 'Pressing not found in collection' })
    }

    await prisma.$queryRaw`
        DELETE FROM "PressingsForUser"
        WHERE "userId" = ${Prisma.sql`${userId}::uuid`} AND "pressingId" = ${Prisma.sql`${pressingId}::uuid`}
    `

    return response.status(200).send({ message: `You have removed "${pressing.name}" pressing from your collection.` })
}

export async function setSalePrice(userId: string, pressingId: string, price: number, response: Response) {
    if (!pressingId) {
        return response.status(400).send({ message: 'Missing pressingId' })
    }
    if (!price) {
        return response.status(400).send({ message: 'Missing price' })
    }

    const pressing = await prisma.pressing.findUnique({ where: { id: pressingId } })
    if (!pressing) {
        return response.status(404).send({ message: 'Pressing not found' })
    }

    await prisma.$executeRaw`
        UPDATE "PressingsForUser"
        SET "salePrice" = ${price}
        WHERE "userId" = ${Prisma.sql`${userId}::uuid`} AND "pressingId" = ${Prisma.sql`${pressingId}::uuid`}
    `

    return response.status(201).send({ message: `You have set "${pressing.name}" pressing for sale for $${price}.` })
}

export async function removeFromSale(userId: string, pressingId: string, response: Response) {
    if (!pressingId) {
        return response.status(400).send({ message: 'Missing pressingId' })
    }

    const pressing = await prisma.pressing.findUnique({ where: { id: pressingId } })
    if (!pressing) {
        return response.status(404).send({ message: 'Pressing not found' })
    }

    await prisma.$executeRaw`
        UPDATE "PressingsForUser"
        SET "salePrice" = NULL
        WHERE "userId" = ${Prisma.sql`${userId}::uuid`} AND "pressingId" = ${Prisma.sql`${pressingId}::uuid`}
    `

    return response.status(200).send({ message: `You have removed pressing "${pressing.name}" from sale.` })
}
