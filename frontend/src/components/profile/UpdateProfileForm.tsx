import { Stack, TextInput, Group, Button, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt } from '@tabler/icons-react'
import ImageInput from 'components/common/ImageInput'
import { Profile, useUpdateProfile } from 'hooks/auth/useUser'
import { useEffect } from 'react'
import { emailValidation } from 'utils/validations'

type Props = {
    profile: Profile
    closeModal: () => void
}

export default function UpdateProfileForm({ profile, closeModal }: Props) {
    const form = useForm({
        initialValues: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            bio: profile.bio || '',
            picture: undefined,
        },
        validate: {
            email: emailValidation,
        },
    })

    const { mutateAsync, isLoading, isSuccess } = useUpdateProfile()

    useEffect(() => {
        if (isSuccess) {
            closeModal()
        }
    }, [isSuccess])

    return (
        <form noValidate onSubmit={form.onSubmit(values => mutateAsync(values))}>
            <Stack>
                <ImageInput
                    label='Profile picture'
                    placeholder='Upload new user profile picture'
                    {...form.getInputProps('picture')}
                    firstInput={
                        <TextInput required label='First Name' placeholder='Your first name' {...form.getInputProps('firstName')} />
                    }
                    secondInput={
                        <TextInput required label='Last Name' placeholder='Your last name' {...form.getInputProps('lastName')} />
                    }
                    image={profile.pictures?.bigUrl || null}
                    circle
                />
                <TextInput
                    required
                    icon={<IconAt size={17} />}
                    label='Email'
                    placeholder='hello@mail.com'
                    {...form.getInputProps('email')}
                />
                <Textarea label='Bio' placeholder='Your profile description' minRows={4} {...form.getInputProps('bio')} />

                {/* <PasswordInput
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
                /> */}
            </Stack>
            <Group grow mt='xl'>
                <Button onClick={closeModal}>Cancel</Button>
                <Button type='submit' loading={isLoading}>
                    Save changes
                </Button>
            </Group>
        </form>
    )
}
