import { Response } from 'express'
import { prisma } from '../app'
import { getFilterOptions } from '../common/utils'
import { Artist } from '@prisma/client'
import { RequestWithFilterParams } from '../types'

export async function getAllArtists(request: RequestWithFilterParams, response: Response) {
    const artists: Array<Artist> = await prisma.artist.findMany(getFilterOptions(request.query))

    const artistsCount = await prisma.artist.count()

    return response.status(200).send({
        data: artists,
        total: artistsCount,
    })
}
