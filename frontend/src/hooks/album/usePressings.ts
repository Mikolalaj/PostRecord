import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { MyError, TableDataResponse, TableDataParams } from 'types'
import { MantineColor } from '@mantine/core'
import { getFilterParams, getFilterParamsKeys } from '../../utils'

const basePath = '/api/pressings/'

export interface Pressing {
    id: string
    name: string
    image: string
    color: MantineColor
}

export interface UserPressing extends Pressing {
    isInCollection: boolean
}

export interface PressingDetails extends Pressing {
    albumTitle: string
}

export function usePressings(albumId: string) {
    return useQuery<Array<UserPressing>, AxiosError<MyError>>(
        ['pressings', albumId],
        async () => (await axios.get(basePath + albumId)).data,
        {
            staleTime: 1000 * 60 * 2,
        }
    )
}

export function useAllPressings(params: TableDataParams) {
    return useQuery<TableDataResponse<PressingDetails>, AxiosError<MyError>>({
        queryKey: getFilterParamsKeys('pressings', params),
        queryFn: async () =>
            (
                await axios.get(basePath, {
                    params: getFilterParams(params),
                })
            ).data,
        staleTime: 1000 * 60 * 2,
    })
}
