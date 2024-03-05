import { Request, Response } from 'express'
import { prisma } from '../app'
import { getUserId } from '../common/utils'
import { Pressing } from '@prisma/client'
import { FilterParams } from '../types'

type Pressings = Array<Pressing & { isInCollection: boolean }>

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

    const pressings: Pressings = album.pressings.map(pressing => ({
        ...pressing,
        isInCollection: user.collection.some(collectionPressing => collectionPressing.id === pressing.id) ?? false,
    }))

    return response.status(200).send(pressings)
}

export async function getAllPressings(request: Request<{}, {}, {}, FilterParams>, response: Response) {
    const { skip, query, get, orderBy } = request.query

    const pressings: Array<Pressing> = await prisma.pressing.findMany({
        skip: parseInt(skip),
        take: parseInt(get),
        where: query
            ? {
                  name: {
                      contains: query as string,
                  },
              }
            : undefined,
        orderBy: {
            name: orderBy === 'newest' ? 'asc' : 'desc',
        },
    })

    const pressingsCount = await prisma.pressing.count()

    return response.status(200).send({
        data: pressings,
        total: pressingsCount,
    })
}
