import { MantineColor } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useDeleteItem } from 'hooks/common'
import { MyError, TableDataParams, TableDataResponse } from 'types'
import { getFilterParams, getFilterParamsKeys } from 'utils'

const basePath = '/api/pressings/'

export interface Pressing {
    id: string
    name: string
    image: string
    color: MantineColor
}

export interface UserPressing extends Pressing {
    isInCollection: boolean
    isInWantlist: boolean
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

export function useDeletePressing() {
    return useDeleteItem({
        mutationKey: ['deletePressing'],
        mutationFn: async (id: string) => {
            console.log('Deleting pressing', id)
            await new Promise(res => setTimeout(res, 1000))
            // axios.delete(basePath + id)
        },
        itemName: 'pressing',
        queryKeyToInvalidate: ['pressings'],
    })
}
