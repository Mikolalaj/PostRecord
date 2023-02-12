import { Button, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock } from '@tabler/icons-react'
import axios, { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { passwordValidation } from '../../utils/validations'

interface Props {
    onSuccess: ({ data }: ResetPasswordResponse) => void
    onError: (error: AxiosError) => void
}

export interface ResetPasswordFormValues {
    password: string
    confirmPassword: string
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
            password: '',
            confirmPassword: '',
        },
        validate: {
            password: val => passwordValidation(val),
            confirmPassword: (val, values) => (val !== values.password ? 'Passwords do not match' : null),
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
                <PasswordInput
                    required
                    icon={<IconLock size={17} />}
                    label='New password'
                    description='Password must include at least one letter, number and special character'
                    placeholder='Your password'
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    required
                    icon={<IconLock size={17} />}
                    label='Confirm password'
                    placeholder='Confirm password'
                    {...form.getInputProps('confirmPassword')}
                />
                <Button fullWidth type='submit'>
                    Change password
                </Button>
            </Stack>
        </form>
    )
}
