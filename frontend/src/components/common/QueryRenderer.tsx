import { Alert, Flex, Loader } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type Error = {
    message: string
}

export type QueryData<T> = UseQueryResult<T, AxiosError<Error>>
type QueryRenderData<TQueries extends readonly QueryData<any>[]> = {
    [K in keyof TQueries]: TQueries[K] extends QueryData<infer T> ? T : never
}

interface QueryRendererProps<TQueries extends readonly QueryData<any>[]> {
    queries: TQueries
    render: (...data: QueryRenderData<TQueries>) => JSX.Element
}

function QueryRenderer<TQueries extends readonly QueryData<any>[]>({ queries, render }: QueryRendererProps<TQueries>) {
    const allQueriesSuccess = queries.every(query => query.isSuccess)

    if (queries.some(query => query.isLoading)) {
        return (
            <Flex justify='center' align='center' mih={100}>
                <Loader />
            </Flex>
        )
    }

    if (queries.some(query => query.isError)) {
        const error = queries.find(query => query.isError)?.error
        return (
            <Alert icon={<IconAlertCircle size='1rem' />} title='Bummer!' color='red'>
                Error: {error?.response?.data.message || error?.message}
            </Alert>
        )
    }

    if (allQueriesSuccess) {
        const data = queries.map(query => query.data) as QueryRenderData<TQueries>
        return render(...data)
    }

    return null
}

export default QueryRenderer
