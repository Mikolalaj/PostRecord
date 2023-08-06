import { Flex, Loader, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type Error = {
    message: string
}

interface QueryRendererProps<T> {
    query: UseQueryResult<T, AxiosError<Error>>
    render: (data: T) => JSX.Element
}

function QueryRenderer<T>({ query, render }: QueryRendererProps<T>) {
    const { data, isLoading, isError, error } = query

    if (isLoading) {
        return (
            <Flex justify='center' align='center' mih={100}>
                <Loader />
            </Flex>
        )
    }
    if (isError) {
        return (
            <Alert icon={<IconAlertCircle size='1rem' />} title='Bummer!' color='red'>
                Error: {error.response?.data.message || error.message}
            </Alert>
        )
    }
    return render(data)
}

export default QueryRenderer
