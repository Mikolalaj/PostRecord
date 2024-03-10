import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { MyError, TableDataResponse, TableDataParams } from 'types'
import { getFilterParams, getFilterParamsKeys } from 'utils'

const basePath = '/api/artists/'

export type Artist = {
    id: string
    name: string
    image: string
    bio: string
}

export function useArtists(params: TableDataParams) {
    return useQuery<TableDataResponse<Artist>, AxiosError<MyError>>({
        queryKey: getFilterParamsKeys('artists', params),
        queryFn: async () =>
            (
                await axios.get(basePath, {
                    params: getFilterParams(params),
                })
            ).data,
        staleTime: 1000 * 60 * 2,
    })
}
