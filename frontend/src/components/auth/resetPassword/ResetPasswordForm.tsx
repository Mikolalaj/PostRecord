import { Button, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock } from '@tabler/icons-react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse } from '../../../atoms'
import { parseErrorMessage, parseResponseMessage } from '../../../utils/axios'
import { passwordValidation } from '../../../utils/validations'

interface Props {
    resetToken: string
    email: string
}

type ResetPasswordRequest = {
    password: string
    token: string
    email: string
}

export default function ResetPasswordForm({ resetToken, email }: Props) {
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

    const setLoginResponse = useSetRecoilState(loginPageResponse)

    const mutation = useMutation(
        (data: ResetPasswordRequest) => {
            return axios.post('/api/auth/resetPassword', data)
        },
        {
            onError: (error: AxiosError) => {
                setLoginResponse({ isSuccess: false, message: parseErrorMessage(error) })
            },
            onSuccess: (response: AxiosResponse) => {
                navigate('/login')
                setLoginResponse({ isSuccess: true, message: parseResponseMessage(response) })
            },
        }
    )

    return (
        <form
            noValidate
            onSubmit={form.onSubmit(values =>
                mutation.mutate({
                    password: values.password,
                    token: resetToken,
                    email: email,
                })
            )}>
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
