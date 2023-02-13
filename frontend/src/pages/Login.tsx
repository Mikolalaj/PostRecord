import { Anchor, Center, Container, Paper, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loginPageResponse, userState } from '../atoms'
import LogInForm from '../components/auth/login/LogInForm'
import ResultAlert from '../components/auth/login/ResultAlert'
import SignUpForm from '../components/auth/login/SignUpForm'
import useAuth from '../hooks/useAuth'

export default function LoginPage() {
    const user = useRecoilValue(userState)
    if (user) {
        return <Navigate to='/' />
    }

    const [loginResponse, setLoginResponse] = useRecoilState(loginPageResponse)

    const navigate = useNavigate()

    const [isSignUp, setIsSignUp] = useState(false)

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
                setLoginResponse(response)
            }
        }
        checkToken()
    }, [])

    const toggleForm = () => {
        setLoginResponse(null)
        setIsSignUp(v => !v)
    }

    return (
        <Center style={{ width: '100%', height: '100%' }}>
            <Center>
                <Container style={{ width: 550 }}>
                    <Title order={2} ta='center' mb={15}>
                        {isSignUp ? 'Create a new account!' : 'Welcome back! Log in to'}
                        {!isSignUp && (
                            <Text component='span' inherit variant='gradient' gradient={{ from: 'red.7', to: 'violet.6', deg: 120 }}>
                                {' '}
                                PostRecord
                            </Text>
                        )}
                    </Title>
                    <Text color='dimmed' size='sm' align='center' mb={20}>
                        Do not have an account yet?{' '}
                        <Anchor size='sm' color='pink.6' onClick={toggleForm}>
                            Create account
                        </Anchor>
                    </Text>
                    <Paper radius='md' p='xl' withBorder style={{ width: '100%' }}>
                        <ResultAlert response={loginResponse} />
                        {isSignUp ? <SignUpForm changeToSignIn={() => setIsSignUp(true)} /> : <LogInForm />}
                    </Paper>
                </Container>
            </Center>
        </Center>
    )
}
