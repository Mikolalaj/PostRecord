import { Request, Response } from 'express'
import { prisma } from '../app'
import { getUserId } from '../common/utils'
import { Pressing } from '@prisma/client'

type Pressings = (Pressing & { isInCollection: boolean })[]

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
