import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import useAuth, { Response } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

interface FormProps {
    onFormResult: (response: Response, isToggle: boolean) => void
}

export interface LogInFormValues {
    email: string
    password: string
}

export default function LogInForm({ onFormResult }: FormProps) {
    const navigate = useNavigate()
    const logInForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: val => (val.length < 1 ? 'Password is required' : null),
        },
    })

    const { loginUser } = useAuth()

    const onLogin = async (values: LogInFormValues) => {
        const response = await loginUser(values.email, values.password)
        onFormResult(response, false)
    }

    return (
        <form noValidate onSubmit={logInForm.onSubmit(values => onLogin(values))}>
            <Stack>
                <TextInput
                    required
                    icon={<IconAt size={17} />}
                    label='Email'
                    placeholder='Your email'
                    {...logInForm.getInputProps('email')}
                />
                <PasswordInput
                    required
                    icon={<IconLock size={17} />}
                    label='Password'
                    placeholder='Your password'
                    {...logInForm.getInputProps('password')}
                />
            </Stack>
            <Group position='apart' mt='xl' mb={25}>
                <Checkbox label='Remember me' />
                <Anchor
                    component='button'
                    type='button'
                    color='violet.5'
                    onClick={() => {
                        navigate('/resetPassword')
                    }}
                    size='xs'>
                    Forgot password?
                </Anchor>
            </Group>
            <Button fullWidth type='submit'>
                Log In
            </Button>
        </form>
    )
}
