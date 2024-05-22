import { Response } from 'express'
import { prisma } from '../prisma'
import { Pressing, Prisma } from '@prisma/client'

interface WantlistPressing extends Pressing {
    album: {
        id: string
        image: string
        releaseDate: Date
        title: string
        artist: string
    }
    addedAt: Date
}

export async function getWantlist(userId: string, response: Response) {
    const wantlist = await prisma.user.findUnique({ where: { id: userId } }).wantlist({ include: { pressing: true } })
    if (!wantlist) {
        return response.status(404).send({ message: 'Wantlist not found' })
    }
    const collection: Array<WantlistPressing> = await Promise.all(
        wantlist.map(async pressing => {
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
            }
        })
    )
    return response.status(200).send(collection)
}

export async function addToWantlist(userId: string, pressingId: string, response: Response) {
    if (!pressingId) {
        return response.status(400).send({ message: 'Missing pressingId' })
    }
    const pressing = await prisma.pressing.findUnique({ where: { id: pressingId } })
    if (!pressing) {
        return response.status(404).send({ message: 'Pressing not found' })
    }

    await prisma.pressingsWantlist.create({
        data: {
            userId,
            pressingId,
        },
    })

    return response.status(201).send({ message: `You have added "${pressing.name}" pressing to your wantlist.` })
}

export async function removeFromWantlist(userId: string, pressingId: string, response: Response) {
    if (!pressingId) {
        return response.status(400).send({ message: 'Missing pressingId' })
    }
    const pressing = await prisma.pressing.findUnique({ where: { id: pressingId } })
    if (!pressing) {
        return response.status(404).send({ message: 'Pressing not found' })
    }
    const pressingInWantlist = await prisma.user.findUnique({ where: { id: userId } }).wantlist({ where: { pressingId } })
    if (!pressingInWantlist) {
        return response.status(404).send({ message: 'Pressing not found in wantlist' })
    }

    await prisma.$queryRaw`
        DELETE FROM "PressingsWantlist"
        WHERE "userId" = ${Prisma.sql`${userId}::uuid`} AND "pressingId" = ${Prisma.sql`${pressingId}::uuid`}
    `

    return response.status(200).send({ message: `You have removed "${pressing.name}" pressing from your wantlist.` })
}
