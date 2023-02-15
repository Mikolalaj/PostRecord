import { Anchor, Button, Center, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconArrowLeft, IconAt } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginPageResponse } from '../../../atoms'
import { useAccount } from '../../../hooks/auth/useAccount'
import { emailValidation } from '../../../utils/validations'

export default function ForgotPasswordForm() {
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: emailValidation,
        },
    })

    const { forgotPassword } = useAccount()

    const setLoginResponse = useSetRecoilState(loginPageResponse)

    return (
        <form noValidate onSubmit={form.onSubmit(values => forgotPassword(values))}>
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
