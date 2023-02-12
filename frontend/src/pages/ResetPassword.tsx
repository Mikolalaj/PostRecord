import { Center, Container, Paper, Title, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms'
import ResetPasswordForm from '../components/login/ResetPasswordForm'
import ResultAlert from '../components/login/ResultAlert'
import { Response } from '../hooks/useAuth'
import { useSearchParams, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ResetPasswordPage() {
    const user = useRecoilValue(userState)
    if (user) {
        return <Navigate to='/' />
    }

    const navigate = useNavigate()

    const [response, setResponse] = useState<Response | null>(null)

    const { confirmEmail } = useAuth()

    const [searchParams] = useSearchParams()

    useEffect(() => {
        async function checkToken() {
            const token = searchParams.get('token')
            if (token) {
                const response = await confirmEmail(token)
                if (response.isSuccess) {
                    navigate('/login')
                }
                setResponse(response)
            }
        }
        checkToken()
    }, [])

    const onFormResult = (response: Response) => {
        setResponse(response)
    }

    return (
        <Center style={{ width: '100%', height: '100%' }}>
            <Center>
                <Container style={{ width: 550 }}>
                    <Title order={2} ta='center' mb={15}>
                        Forgot your password?
                    </Title>
                    <Text color='dimmed' size='sm' align='center' mb={20}>
                        Enter your email to get a reset link
                    </Text>
                    <Paper radius='md' p='xl' withBorder style={{ width: '100%' }}>
                        {response && <ResultAlert response={response} />}
                        <ResetPasswordForm onFormResult={onFormResult} />
                    </Paper>
                </Container>
            </Center>
        </Center>
    )
}
