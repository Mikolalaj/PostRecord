import { showNotification } from '@mantine/notifications'
import { MutationFunction, useQueryClient, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { MyError } from 'types'

interface UseDeleteItemProps {
    mutationKey: Array<string>
    mutationFn: MutationFunction<unknown, string>
    itemName: string
    queryKeyToInvalidate?: Array<string>
}

export function useDeleteItem({ itemName, queryKeyToInvalidate, ...rest }: UseDeleteItemProps) {
    const queryClient = useQueryClient()
    return useMutation<unknown, AxiosError<MyError>, string>({
        onSuccess: () => {
            queryKeyToInvalidate && queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate })
            showNotification({
                title: 'Success',
                message: `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} deleted`,
            })
        },
        onError: () => {
            showNotification({
                title: 'Error',
                message: `Failed to delete ${itemName}`,
                color: 'red',
            })
        },
        ...rest,
    })
}
