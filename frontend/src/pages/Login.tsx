import { Alert, Center, Paper, Text } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms'
import LogInForm from '../components/login/LogInForm'
import SignUpForm from '../components/login/SignUpForm'
import { Response } from '../hooks/useAuth'

function ResultAlert({ response }: { response: Response }) {
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

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [response, setResponse] = useState<Response | null>(null)

    const user = useRecoilValue(userState)
    if (user) {
        return <Navigate to='/' />
    }

    const onFormResult = (response: Response, isToggle: boolean) => {
        setResponse(response)
        if (isToggle) {
            setIsSignUp(value => !value)
        }
    }

    const toggleForm = () => {
        setResponse(null)
        setIsSignUp(v => !v)
    }

    return (
        <Center style={{ width: '100%', height: '100%' }}>
            <Center style={{ width: 500, height: '100%' }}>
                <Paper radius='md' p='xl' withBorder style={{ width: '100%' }}>
                    <Text
                        fw={700}
                        size='xl'
                        ta='center'
                        variant='gradient'
                        gradient={{ from: 'red.7', to: 'violet.6', deg: 120 }}
                        style={{ marginBottom: 20 }}>
                        {isSignUp ? 'Create a new account!' : 'Log in to your account'}
                    </Text>
                    {response && <ResultAlert response={response} />}
                    {isSignUp ? (
                        <SignUpForm onFormResult={onFormResult} toggleForm={toggleForm} />
                    ) : (
                        <LogInForm onFormResult={onFormResult} toggleForm={toggleForm} />
                    )}
                </Paper>
            </Center>
        </Center>
    )
}
