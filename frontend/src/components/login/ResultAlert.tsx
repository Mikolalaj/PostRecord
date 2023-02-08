import { Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { Response } from '../../hooks/useAuth'

export default function ResultAlert({ response }: { response: Response }) {
    return (
        <Alert
            icon={<IconAlertCircle size={16} />}
            title={response.isSuccess ? 'Success!' : 'Bummer!'}
            color={response.isSuccess ? 'green' : 'red'}
            radius='md'>
            {response.message}
        </Alert>
    )
}