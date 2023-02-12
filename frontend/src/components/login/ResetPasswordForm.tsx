import { Anchor, Box, Button, Center, Checkbox, Group, PasswordInput, Stack, TextInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconArrowLeft, IconAt, IconLock } from '@tabler/icons-react'
import useAuth, { Response } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

interface Props {
    onFormResult: (response: Response, isToggle: boolean) => void
}

export interface ResetPasswordFormValues {
    email: string
}

export default function ResetPasswordForm({ onFormResult }: Props) {
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    })

    // const { resetPassword } = useAuth()

    const onLogin = async (values: ResetPasswordFormValues) => {
        // const response = await resetPassword(values.email)
        // onFormResult(response, false)
    }

    return (
        <form noValidate onSubmit={form.onSubmit(values => onLogin(values))}>
            <Stack>
                <TextInput
                    required
                    icon={<IconAt size={17} />}
                    label='Email'
                    placeholder='Your email'
                    {...form.getInputProps('email')}
                />
            </Stack>
            <Group position='apart' mt='xl' mb={25}>
                <Anchor
                    color='violet.5'
                    size='sm'
                    onClick={() => {
                        navigate('/login')
                    }}>
                    <Center inline>
                        <IconArrowLeft size={12} stroke={1.5} />
                        <Text ml={5} size={12}>Back to login page</Text>
                    </Center>
                </Anchor>
                <Button fullWidth type='submit'>
                    Reset password
                </Button>
            </Group>
        </form>
    )
}
