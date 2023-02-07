import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Text, Paper, Group, Button, Checkbox, Anchor, Stack, Center, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useState } from 'react'
import useAuth, { Response } from '../hooks/useAuth'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms'
import { Navigate } from 'react-router-dom'

interface FormProps {
    toggleForm: () => void
    onFormResult: (response: Response, isToggle: boolean) => void
}

interface LogInFormValues {
    email: string
    password: string
}

function LogInForm({ onFormResult, toggleForm }: FormProps) {
    const logInForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    })

    const { loginUser } = useAuth()

    const onLogin = async (values: LogInFormValues) => {
        const response = await loginUser(values.email, values.password)
        onFormResult(response, false)
    }

    return (
        <form onSubmit={logInForm.onSubmit(values => onLogin(values))}>
            <Stack>
                <TextInput required label='Email' placeholder='Your email' {...logInForm.getInputProps('email')} />
                <PasswordInput required label='Password' placeholder='Your password' {...logInForm.getInputProps('password')} />
            </Stack>
            <Group position='apart' mt='xl'>
                <Anchor component='button' type='button' color='dimmed' onClick={toggleForm} size='xs'>
                    Don't have an account? Sign Up
                </Anchor>
                <Button type='submit'>Log In</Button>
            </Group>
        </form>
    )
}

interface SignUpFormValues extends LogInFormValues {
    firstName: string
    lastName: string
    terms: boolean
}

function SignUpForm({ onFormResult, toggleForm }: FormProps) {
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            terms: false,
        },
        validate: {
            firstName: value => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: val => (val.length < 6 ? 'Password should include at least 6 characters' : null),
            terms: val => (val ? null : 'You must agree to sell your soul to us!!! 😈'),
        },
    })

    const { registerUser } = useAuth()

    const onSignUp = async (values: SignUpFormValues) => {
        const response = await registerUser(values.email, values.firstName, values.lastName, values.password)
        onFormResult(response, response.isSuccess)
    }

    return (
        <form noValidate onSubmit={form.onSubmit(values => onSignUp(values))}>
            <Stack>
                <TextInput required label='Name' placeholder='Your first name' {...form.getInputProps('firstName')} />
                <TextInput required label='Name' placeholder='Your last name' {...form.getInputProps('lastName')} />
                <TextInput required label='Email' placeholder='hello@mail.com' {...form.getInputProps('email')} />
                <PasswordInput required label='Password' placeholder='Your password' {...form.getInputProps('password')} />
                <Checkbox required label='I agree to sell my soul and privacy to this corporation' {...form.getInputProps('terms')} />
            </Stack>
            <Group position='apart' mt='xl'>
                <Anchor component='button' type='button' color='dimmed' onClick={toggleForm} size='xs'>
                    Already have an account? Log in
                </Anchor>
                <Button type='submit'>Sign Up</Button>
            </Group>
        </form>
    )
}

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
