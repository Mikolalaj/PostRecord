import { Request, Response } from 'express'
import { prisma } from '../app'
import { getUserId, getFilterOptions } from '../common/utils'
import { Pressing } from '@prisma/client'
import { RequestWithFilterParams } from '../types'

type Pressings = Array<Pressing & { isInCollection: boolean; isInWantlist: boolean }>

export async function getPressings(albumId: string, request: Request, response: Response) {
    const userId = getUserId(request)
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { collection: true } })
    if (!user) {
        return response.status(404).send({ message: 'User not found' })
    }
    const album = await prisma.album.findUnique({ where: { id: albumId }, include: { pressings: true } })
    if (!album) {
        return response.status(404).send({ message: 'Album not found' })
    }

    const userCollection = await prisma.pressingsForUser.findMany({
        where: { userId },
        select: { pressingId: true },
    })
    const userWantlist = await prisma.pressingsWantlist.findMany({
        where: { userId },
        select: { pressingId: true },
    })

    const pressings: Pressings = album.pressings.map(pressing => ({
        ...pressing,
        isInCollection: userCollection.some(p => p.pressingId === pressing.id),
        isInWantlist: userWantlist.some(p => p.pressingId === pressing.id),
    }))

    return response.status(200).send(pressings)
}

interface PressingDetails extends Pressing {
    albumTitle: string
}

export async function getAllPressings(request: RequestWithFilterParams, response: Response) {
    const pressings = await prisma.pressing.findMany({
        ...getFilterOptions(request.query),
        include: {
            album: {
                select: {
                    title: true,
                },
            },
        },
    })

    const pressingsDetails: Array<PressingDetails> = pressings.map(pressing => ({
        ...pressing,
        albumTitle: pressing.album.title,
    }))

    const pressingsCount = await prisma.pressing.count()

    return response.status(200).send({
        data: pressingsDetails,
        total: pressingsCount,
    })
}
