import { Button, ColorInput, DEFAULT_THEME, Group, Stack, TextInput, useMantineColorScheme } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useMemo } from 'react'
import ImageInput from '../../common/ImageInput'
import { NewPressing } from 'hooks/album/useSpotifyAlbum'
import AlbumSearch from './AlbumSearch'

type Props = {
    close: () => void
    onAdd?: (values: NewPressing) => void
    onEdit?: (values: NewPressing) => void
    defaultValues?: NewPressing
}

export default function PressingForm({ close, onAdd, onEdit, defaultValues }: Props) {
    if (onEdit && !defaultValues) {
        throw new Error('defaultValues is required when type is "edit"')
    }
    if (onAdd && onEdit) {
        throw new Error('onAdd and onEdit are mutually exclusive')
    }
    if (!onAdd && !onEdit) {
        throw new Error('onAdd or onEdit is required')
    }
    const onSubmit = onAdd || onEdit
    const form = useForm<NewPressing>({
        initialValues: defaultValues && {
            name: defaultValues.name || '',
            image: defaultValues.image || '',
            color: defaultValues.color || '',
        },
        validate: {
            name: isNotEmpty('Enter name of the pressing'),
            image: isNotEmpty('Upload an image of the pressing'),
            color: isNotEmpty('Choose a background color'),
        },
        transformValues(values) {
            return {
                ...values,
                color: hexToName(values.color),
            }
        },
    })

    const { colorScheme } = useMantineColorScheme()

    const swatches = useMemo(() => {
        const shade = colorScheme === 'dark' ? 3 : 9
        const swatches = []
        for (const key in DEFAULT_THEME.colors) {
            swatches.push(DEFAULT_THEME.colors[key][shade])
        }
        return swatches
    }, [colorScheme])

    const hexToName = (hex: string) => {
        const shade = colorScheme === 'dark' ? 3 : 9
        for (const key in DEFAULT_THEME.colors) {
            if (DEFAULT_THEME.colors[key][shade] === hex) {
                return key
            }
        }
        return 'gray'
    }

    return (
        <form noValidate onSubmit={form.onSubmit(onSubmit!)}>
            <Stack spacing='xs'>
                <AlbumSearch albumsType='local' {...form.getInputProps('album')} />
                <ImageInput
                    label='Image'
                    placeholder='Image of the pressing'
                    background={form.values.color}
                    required
                    {...form.getInputProps('image')}
                    firstInput={
                        <TextInput
                            label='Name'
                            placeholder='Name of the pressing'
                            withAsterisk
                            required
                            {...form.getInputProps('name')}
                        />
                    }
                    secondInput={
                        <ColorInput
                            withPicker={false}
                            label='Color'
                            swatches={swatches}
                            swatchesPerRow={7}
                            placeholder='Choose a background color'
                            required
                            {...form.getInputProps('color')}
                        />
                    }
                />
                <Group grow>
                    <Button mt='sm' type='button' variant='outline' onClick={close}>
                        Cancel
                    </Button>
                    <Button mt='sm' type='submit'>
                        {onAdd ? 'Add' : 'Edit'} pressing
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}
