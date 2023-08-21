import { Response } from 'express'
import { prisma } from '../app'

export async function getCollection(userId: string, response: Response) {
    const collection = await prisma.user.findUnique({ where: { id: userId } }).collection()
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

    await prisma.user.update({
        where: { id: userId },
        data: {
            collection: {
                connect: { id: pressingId },
            },
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
    const pressingInCollection = await prisma.user.findUnique({ where: { id: userId } }).collection({ where: { id: pressingId } })
    if (!pressingInCollection) {
        return response.status(404).send({ message: 'Pressing not found in collection' })
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            collection: {
                disconnect: { id: pressingId },
            },
        },
    })

    return response.status(200).send({ message: `You have removed "${pressing.name}" pressing from your collection.` })
}
