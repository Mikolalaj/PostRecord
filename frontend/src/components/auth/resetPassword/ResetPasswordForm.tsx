import { Button, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLock } from '@tabler/icons-react'
import { useAccount } from '../../../hooks/auth/useAccount'
import { passwordValidation } from '../../../utils/validations'

interface Props {
    resetToken: string
    email: string
}

export default function ResetPasswordForm({ resetToken, email }: Props) {
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

    const { resetPassword } = useAccount()

    return (
        <form
            noValidate
            onSubmit={form.onSubmit(values =>
                resetPassword({
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
