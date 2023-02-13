import { Center, Container, Paper, Text, Title } from '@mantine/core'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms'
import ForgotPasswordForm, { ForgotPasswordResponse } from '../components/login/ForgotPasswordForm'
import ResetPasswordForm from '../components/login/ResetPasswordForm'
import ResultAlert from '../components/login/ResultAlert'
import { Response } from '../hooks/useAuth'
import { parseErrorMessage } from '../utils/error'

export default function ResetPasswordPage() {
    const user = useRecoilValue(userState)
    if (user) {
        return <Navigate to='/' />
    }

    const navigate = useNavigate()

    const [response, setResponse] = useState<Response | undefined>(undefined)

    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const isResetPassword = token && email

    const onError = (error: AxiosError) => {
        setResponse({ isSuccess: false, message: parseErrorMessage(error) })
    }
    const onSuccess = ({ data }: ForgotPasswordResponse) => {
        setResponse({ isSuccess: true, message: data.message })
    }

    return (
        <Center style={{ width: '100%', height: '100%' }}>
            <Center>
                <Container style={{ width: 550 }}>
                    <Title order={2} ta='center' mb={15}>
                        {isResetPassword ? 'Set up your newpassword' : 'Forgot your password?'}
                    </Title>
                    {!isResetPassword && (
                        <Text color='dimmed' size='sm' align='center' mb={20}>
                            Enter your email to get a reset link
                        </Text>
                    )}
                    <Paper radius='md' p='xl' withBorder style={{ width: '100%' }}>
                        <ResultAlert response={response} />
                        {isResetPassword ? (
                            <ResetPasswordForm onError={onError} onSuccess={onSuccess} resetToken={token} email={email} />
                        ) : (
                            <ForgotPasswordForm onError={onError} onSuccess={onSuccess} />
                        )}
                    </Paper>
                </Container>
            </Center>
        </Center>
    )
}
