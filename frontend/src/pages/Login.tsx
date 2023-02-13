import { Anchor, Center, Container, Paper, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms'
import LogInForm from '../components/login/LogInForm'
import ResultAlert from '../components/login/ResultAlert'
import SignUpForm from '../components/login/SignUpForm'
import useAuth, { Response } from '../hooks/useAuth'

export default function LoginPage() {
    const user = useRecoilValue(userState)
    if (user) {
        return <Navigate to='/' />
    }

    const navigate = useNavigate()

    const [isSignUp, setIsSignUp] = useState(false)
    const [response, setResponse] = useState<Response | undefined>(undefined)

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

    const onFormResult = (response: Response, isToggle: boolean) => {
        setResponse(response)
        if (isToggle) {
            setIsSignUp(value => !value)
        }
    }

    const toggleForm = () => {
        setResponse(undefined)
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
                        <ResultAlert response={response} />
                        {isSignUp ? <SignUpForm onFormResult={onFormResult} /> : <LogInForm onFormResult={onFormResult} />}
                    </Paper>
                </Container>
            </Center>
        </Center>
    )
}
