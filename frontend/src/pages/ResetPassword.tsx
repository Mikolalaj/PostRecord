import { Center, Container, Paper, Text, Title } from '@mantine/core'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms'
import ResetPasswordForm, { ResetPasswordResponse } from '../components/login/ResetPasswordForm'
import ResultAlert from '../components/login/ResultAlert'
import useAuth, { Response } from '../hooks/useAuth'
import { parseErrorMessage } from '../utils/error'

export default function ResetPasswordPage() {
    const user = useRecoilValue(userState)
    if (user) {
        return <Navigate to='/' />
    }

    // const navigate = useNavigate()

    const [response, setResponse] = useState<Response | null>(null)

    // const { resetPassword } = useAuth()

    // const [searchParams] = useSearchParams()

    // useEffect(() => {
    //     async function checkToken() {
    //         const token = searchParams.get('token')
    //         if (token) {
    //             const response = await resetPassword(token)
    //             if (response.isSuccess) {
    //                 navigate('/login')
    //             }
    //             setResponse(response)
    //         }
    //     }
    //     checkToken()
    // }, [])

    const onError = (error: AxiosError) => {
        setResponse({ isSuccess: false, message: parseErrorMessage(error) })
    }
    const onSuccess = ({ data }: ResetPasswordResponse) => {
        setResponse({ isSuccess: true, message: data.message })
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
                        <ResetPasswordForm onError={onError} onSuccess={onSuccess} />
                    </Paper>
                </Container>
            </Center>
        </Center>
    )
}
