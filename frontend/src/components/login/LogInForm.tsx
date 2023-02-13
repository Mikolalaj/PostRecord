import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse } from '../../atoms'
import useAuth from '../../hooks/useAuth'

export interface LogInFormValues {
    email: string
    password: string
}

export default function LogInForm() {
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

    const setLoginResponse = useSetRecoilState(loginPageResponse)

    const { loginUser } = useAuth()

    const onLogin = async (values: LogInFormValues) => {
        const response = await loginUser(values.email, values.password)
        setLoginResponse(response)
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
                        setLoginResponse(null)
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
