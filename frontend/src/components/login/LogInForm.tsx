import { Anchor, Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import useAuth, { Response } from '../../hooks/useAuth'

interface FormProps {
    toggleForm: () => void
    onFormResult: (response: Response, isToggle: boolean) => void
}

export interface LogInFormValues {
    email: string
    password: string
}

export default function LogInForm({ onFormResult, toggleForm }: FormProps) {
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
