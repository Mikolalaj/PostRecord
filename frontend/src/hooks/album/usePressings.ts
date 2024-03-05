import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { MyError, TableDataResponse } from 'types'
import { MantineColor } from '@mantine/core'
import { useRecoilValue } from 'recoil'
import { tableDataParams } from 'atoms'
import { getFilterParams } from '../../utils'

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

export function usePressings(albumId: string) {
    return useQuery<Array<UserPressing>, AxiosError<MyError>>(
        ['pressings', albumId],
        async () => (await axios.get(basePath + albumId)).data,
        {
            staleTime: 1000 * 60 * 2,
        }
    )
}

export function useAllPressings() {
    const params = useRecoilValue(tableDataParams)
    return useQuery<TableDataResponse<Pressing>, AxiosError<MyError>>(
        ['pressings', params?.get, params?.skip, params?.query, params?.orderBy],
        async () =>
            (
                await axios.get(basePath, {
                    params: getFilterParams(params),
                })
            ).data,
        {
            staleTime: 1000 * 60 * 2,
            enabled: !!params,
        }
    )
}
