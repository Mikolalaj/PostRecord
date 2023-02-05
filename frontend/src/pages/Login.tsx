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
    })

    const [errorMessage, setErrorMessage] = useState<string>('')
    const { loginUser } = useAuth()

    const onLogin = async (values: LogInFormValues) => {
        const isSuccess = await loginUser(values.email, values.password)
        if (!isSuccess) {
            setErrorMessage('Invalid username or password. Please try again.')
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
                <TextInput
                    required
                    label='Email'
                    placeholder='Your email'
                    value={logInForm.values.email}
                    onChange={event => logInForm.setFieldValue('email', event.currentTarget.value)}
                    error={logInForm.errors.email && 'Invalid email'}
                />
                <PasswordInput
                    required
                    label='Password'
                    placeholder='Your password'
                    value={logInForm.values.password}
                    onChange={event => logInForm.setFieldValue('password', event.currentTarget.value)}
                    error={logInForm.errors.password && 'Password should include at least 6 characters'}
                />
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
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: val => (val.length < 6 ? 'Password should include at least 6 characters' : null),
        },
    })

    const [errorMessage, setErrorMessage] = useState<string>('')
    const { registerUser } = useAuth()

    const onSignUp = async (values: SignUpFormValues) => {
        const response = await registerUser(values.email, values.firstName, values.lastName, values.password)
        if (response === true) {
            onSignUpSuccess()
        } else {
            setErrorMessage(response)
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
                <TextInput
                    required
                    label='Name'
                    placeholder='Your first name'
                    value={form.values.firstName}
                    onChange={event => form.setFieldValue('firstName', event.currentTarget.value)}
                />
                <TextInput
                    required
                    label='Name'
                    placeholder='Your last name'
                    value={form.values.lastName}
                    onChange={event => form.setFieldValue('lastName', event.currentTarget.value)}
                />
                <TextInput
                    required
                    label='Email'
                    placeholder='hello@mail.com'
                    value={form.values.email}
                    onChange={event => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email && 'Invalid email'}
                />
                <PasswordInput
                    required
                    label='Password'
                    placeholder='Your password'
                    value={form.values.password}
                    onChange={event => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password && 'Password should include at least 6 characters'}
                />
                <Checkbox
                    required
                    label='I agree to sell my soul and privacy to this corporation'
                    checked={form.values.terms}
                    onChange={event => form.setFieldValue('terms', event.currentTarget.checked)}
                    error={form.errors.password && 'You must agree to sell your soul to us!!!'}
                />
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
                            You succesfully signed up! Now you can log in.
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
