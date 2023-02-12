import { Anchor, Button, Center, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconArrowLeft, IconAt } from '@tabler/icons-react'
import axios, { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

interface Props {
    onSuccess: ({ data }: ResetPasswordResponse) => void
    onError: (error: AxiosError) => void
}

export interface ResetPasswordFormValues {
    email: string
}

export interface ResetPasswordResponse {
    data: {
        message: string
    }
}

export default function ForgotPasswordForm({ onSuccess, onError }: Props) {
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    })

    const mutation = useMutation(
        (data: ResetPasswordFormValues) => {
            return axios.post('/api/auth/resetPassword', data)
        },
        {
            onError,
            onSuccess,
        }
    )

    return (
        <form noValidate onSubmit={form.onSubmit(values => mutation.mutate(values))}>
            <Stack>
                <TextInput
                    required
                    icon={<IconAt size={17} />}
                    label='Email'
                    placeholder='Your email'
                    {...form.getInputProps('email')}
                />
                <Anchor
                    color='violet.5'
                    size='sm'
                    onClick={() => {
                        navigate('/login')
                    }}>
                    <Center inline>
                        <IconArrowLeft size={12} stroke={1.5} />
                        <Text ml={5} size={12}>
                            Back to login page
                        </Text>
                    </Center>
                </Anchor>
                <Button fullWidth type='submit'>
                    Reset password
                </Button>
            </Stack>
        </form>
    )
}
