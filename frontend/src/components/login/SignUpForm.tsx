import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import useAuth, { Response } from '../../hooks/useAuth'
import { LogInFormValues } from './LogInForm'

interface SignUpFormValues extends LogInFormValues {
    firstName: string
    lastName: string
    terms: boolean
}

interface FormProps {
    toggleForm: () => void
    onFormResult: (response: Response, isToggle: boolean) => void
}

export default function SignUpForm({ onFormResult, toggleForm }: FormProps) {
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            terms: false,
        },
        validate: {
            firstName: value => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: val => (val.length < 6 ? 'Password should include at least 6 characters' : null),
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
                <TextInput required label='Name' placeholder='Your first name' {...form.getInputProps('firstName')} />
                <TextInput required label='Name' placeholder='Your last name' {...form.getInputProps('lastName')} />
                <TextInput required label='Email' placeholder='hello@mail.com' {...form.getInputProps('email')} />
                <PasswordInput required label='Password' placeholder='Your password' {...form.getInputProps('password')} />
                <Checkbox required label='I agree to sell my soul and privacy to this corporation' {...form.getInputProps('terms')} />
            </Stack>
            <Group position='apart' mt='xl'>
                <Anchor component='button' type='button' color='dimmed' onClick={toggleForm} size='xs'>
                    Already have an account? Log in
                </Anchor>
                <Button type='submit'>Sign Up</Button>
            </Group>
        </form>
    )
}
