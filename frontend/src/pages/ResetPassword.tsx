import { Center, Container, Paper, Text, Title } from '@mantine/core'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { loginPageResponse, userState } from '../atoms'
import ResultAlert from '../components/auth/login/ResultAlert'
import ForgotPasswordForm from '../components/auth/resetPassword/ForgotPasswordForm'
import ResetPasswordForm from '../components/auth/resetPassword/ResetPasswordForm'

export default function ResetPasswordPage() {
    const user = useRecoilValue(userState)
    if (user) {
        return <Navigate to='/' />
    }

    const loginResponse = useRecoilValue(loginPageResponse)

    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const isResetPassword = token && email

    return (
        <Center style={{ width: '100%', height: '100%' }}>
            <Center>
                <Container style={{ width: 550 }}>
                    <Title order={2} ta='center' mb={15}>
                        {isResetPassword ? 'Set up your new password' : 'Forgot your password?'}
                    </Title>
                    {!isResetPassword && (
                        <Text color='dimmed' size='sm' align='center' mb={20}>
                            Enter your email to get a reset link
                        </Text>
                    )}
                    <Paper radius='md' p='xl' withBorder style={{ width: '100%' }}>
                        <ResultAlert response={loginResponse} />
                        {isResetPassword ? <ResetPasswordForm resetToken={token} email={email} /> : <ForgotPasswordForm />}
                    </Paper>
                </Container>
            </Center>
        </Center>
    )
}
