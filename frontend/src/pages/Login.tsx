import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Text, Paper, Group, Button, Checkbox, Anchor, Stack, Center, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useState } from 'react'
import useAuth from '../utils/useAuth'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms'
import { Navigate } from 'react-router-dom'

interface FormProps {
    toggleForm: () => void
}

type LogInFormValues = {
    email: string
    password: string
}

function LogInForm({ toggleForm }: FormProps) {
    const logInForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    })

    const [errorMessage, setErrorMessage] = useState<string>('')
    const { loginUser } = useAuth()

    const onLogin = async (values: LogInFormValues) => {
        const errorMessage = await loginUser(values.email, values.password)
        if (errorMessage) {
            setErrorMessage(errorMessage)
        }
    }

    return (
        <form onSubmit={logInForm.onSubmit(values => onLogin(values))}>
            <Stack>
                {errorMessage && (
                    <Alert icon={<IconAlertCircle size={16} />} title='Bummer!' color='red' radius='md'>
                        {errorMessage}
                    </Alert>
                )}
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

interface SignUpFormProps extends FormProps {
    onSignUpSuccess: () => void
}

type SignUpFormValues = {
    firstName: string
    lastName: string
    email: string
    password: string
    terms: boolean
}

function SignUpForm({ toggleForm, onSignUpSuccess }: SignUpFormProps) {
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

    const [errorMessage, setErrorMessage] = useState<string>('')
    const { registerUser } = useAuth()

    const onSignUp = async (values: SignUpFormValues) => {
        const errorMessage = await registerUser(values.email, values.firstName, values.lastName, values.password)
        if (!errorMessage) {
            onSignUpSuccess()
        } else {
            setErrorMessage(errorMessage)
        }
    }

    return (
        <form noValidate onSubmit={form.onSubmit(values => onSignUp(values))}>
            <Stack>
                {errorMessage && (
                    <Alert icon={<IconAlertCircle size={16} />} title='Bummer!' color='red' radius='md'>
                        {errorMessage}
                    </Alert>
                )}
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

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false)

    const user = useRecoilValue(userState)
    if (user) {
        return <Navigate to='/' />
    }

    const onSignUpSuccess = () => {
        setIsSignUp(false)
        setIsSignUpSuccess(true)
    }

    const toggleForm = () => {
        setIsSignUp(v => !v)
        setIsSignUpSuccess(false)
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
                        gradient={{ from: 'pink', to: 'grape', deg: 45 }}
                        style={{ marginBottom: 20 }}>
                        {isSignUp ? 'Create a new account!' : 'Log in to your account'}
                    </Text>
                    {isSignUpSuccess && (
                        <Alert icon={<IconAlertCircle size={16} />} title='Welcome to Foodie!' color='green' radius='md'>
                            You succesfully signed up! Now check your email to verify your account.
                        </Alert>
                    )}
                    {isSignUp ? (
                        <SignUpForm onSignUpSuccess={onSignUpSuccess} toggleForm={toggleForm} />
                    ) : (
                        <LogInForm toggleForm={toggleForm} />
                    )}
                </Paper>
            </Center>
        </Center>
    )
}
