import { Button, Group, NumberInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

interface TrackForm {
    number: number
    title: string
    features: string
    duration: number
}

type Props = {
    type: 'add' | 'edit'
    close: () => void
    onSubmit: (values: TrackForm) => void
    defaultValues?: TrackForm
}

export default function TrackForm({ type, close, onSubmit, defaultValues }: Props) {
    const form = useForm<TrackForm>({
        initialValues: {
            number: defaultValues?.number || 0,
            title: defaultValues?.title || '',
            features: defaultValues?.features || '',
            duration: defaultValues?.duration || 0,
        },
    })
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack spacing='xs'>
                <NumberInput label='Track number' required {...form.getInputProps('number')} />
                <TextInput label='Title' required {...form.getInputProps('title')} />
                <TextInput label='Features' {...form.getInputProps('features')} />
                <NumberInput label='Duration (seconds)' required {...form.getInputProps('duration')} />
                <Group grow>
                    <Button mt='sm' type='button' variant='outline' onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        mt='sm'
                        type='button'
                        onClick={() => {
                            onSubmit(form.values)
                            close()
                        }}
                    >
                        {type === 'add' ? 'Add' : 'Edit'} track
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}
