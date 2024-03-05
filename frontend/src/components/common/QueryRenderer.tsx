/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Flex, Loader } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { MyError } from 'types'

export type QueryData<T> = UseQueryResult<T, AxiosError<MyError>>

type QueryRenderData<T> = {
    [K in keyof T]: T[K] extends QueryData<infer DataType> ? DataType : never
}

interface QueryRendererProps<T extends ReadonlyArray<QueryData<any>>> {
    queries: T
    render: (...data: QueryRenderData<T>) => JSX.Element | null
}

function QueryRenderer<T extends ReadonlyArray<QueryData<any>>>({ queries, render }: QueryRendererProps<T>) {
    const allQueriesSuccess = queries.every(query => query.isSuccess)

    if (queries.some(query => query.isLoading)) {
        return (
            <Flex justify='center' align='center' h='100%'>
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
        const data = queries.map(query => query.data) as QueryRenderData<T>
        return render(...data)
    }

    return null
}

export default QueryRenderer
