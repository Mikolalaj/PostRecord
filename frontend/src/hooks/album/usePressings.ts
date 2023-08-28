import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Error } from '../../types'
import { MantineColor } from '@mantine/core'

const basePath = '/api/pressings/'

export interface Pressing {
    id: string
    name: string
    image: string
    color: MantineColor
    isInCollection: boolean
}

export function usePressings(albumId: string) {
    return useQuery<Array<Pressing>, AxiosError<Error>>(
        ['pressings', albumId],
        async () => (await axios.get(basePath + albumId)).data,
        {
            staleTime: 1000 * 60 * 2,
        }
    )
}
