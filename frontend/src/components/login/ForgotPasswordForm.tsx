import { Anchor, Button, Center, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconArrowLeft, IconAt } from '@tabler/icons-react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse } from '../../atoms'
import { parseErrorMessage, parseResponseMessage } from '../../utils/axios'

export interface ForgotPasswordRequest {
    email: string
}

export default function ForgotPasswordForm() {
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    })

    const setLoginResponse = useSetRecoilState(loginPageResponse)

    const mutation = useMutation(
        (data: ForgotPasswordRequest) => {
            return axios.post('/api/auth/forgotPassword', data)
        },
        {
            onError: (error: AxiosError) => {
                setLoginResponse({ isSuccess: false, message: parseErrorMessage(error) })
            },
            onSuccess: (response: AxiosResponse) => {
                setLoginResponse({ isSuccess: true, message: parseResponseMessage(response) })
            },
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
                        setLoginResponse(null)
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
