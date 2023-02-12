import { Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt, IconLock } from '@tabler/icons-react'
import useAuth, { Response } from '../../hooks/useAuth'
import { passwordValidation } from '../../utils/validations'
import { LogInFormValues } from './LogInForm'

interface SignUpFormValues extends LogInFormValues {
    firstName: string
    lastName: string
    terms: boolean
}

interface FormProps {
    onFormResult: (response: Response, isToggle: boolean) => void
}

export default function SignUpForm({ onFormResult }: FormProps) {
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
        validate: {
            firstName: value => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            lastName: value => (value.length < 2 ? 'Last must have at least 2 letters' : null),
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: val => passwordValidation(val),
            confirmPassword: (val, values) => (val !== values.password ? 'Passwords do not match' : null),
            terms: val => (val ? null : 'You must agree to sell your soul to us!!! 😈'),
        },
    })

    const { registerUser } = useAuth()

    const onSignUp = async (values: SignUpFormValues) => {
        const response = await registerUser(values.email, values.firstName, values.lastName, values.password)
        onFormResult(response, response.isSuccess)
    }

    return (
        <form noValidate onSubmit={form.onSubmit(values => onSignUp(values))}>
            <Stack>
                <TextInput required label='First Name' placeholder='Your first name' {...form.getInputProps('firstName')} />
                <TextInput required label='Last Name' placeholder='Your last name' {...form.getInputProps('lastName')} />
                <TextInput
                    required
                    icon={<IconAt size={17} />}
                    label='Email'
                    placeholder='hello@mail.com'
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    required
                    icon={<IconLock size={17} />}
                    label='Password'
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
                <Checkbox required label='I agree to sell my soul and privacy to this corporation' {...form.getInputProps('terms')} />
            </Stack>
            <Group position='apart' mt='xl'>
                <Button fullWidth type='submit'>
                    Sign Up
                </Button>
            </Group>
        </form>
    )
}
