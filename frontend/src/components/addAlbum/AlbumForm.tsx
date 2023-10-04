import { Button, TextInput, Textarea } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import ImageInput from '../../components/common/ImageInput'
import { useSpotifyAlbum } from '../../hooks/album/useSpotifyAlbum'
import EditableTracklist, { EditableTrack } from './EditableTracklist'
import Pressings from './Pressings'
import { Pressing } from './PressingForm'

export default function AlbumForm() {
    interface Form {
        image: string
        artist: {
            name: string
            image: string
            bio: string
        }
        releaseDate: string
        tracklist: Array<EditableTrack>
        pressings: Array<Pressing>
    }

    const form = useForm<Form>({
        initialValues: {
            image: '',
            artist: {
                name: '',
                image: '',
                bio: '',
            },
            releaseDate: '',
            tracklist: [],
            pressings: [],
        },
    })

    const { isLoading, isError } = useSpotifyAlbum(form.setValues)

    const onSubmit = (values: Form) => {
        console.log(values)
    }

    const deleteTrack = (spotifyId: string) => {
        form.setValues({
            ...form.values,
            tracklist: form.values.tracklist.filter(track => track.spotifyId !== spotifyId),
        })
    }

    const editTrack = (track: EditableTrack) => {
        form.setValues({
            ...form.values,
            tracklist: form.values.tracklist.map(t => (t.spotifyId === track.spotifyId ? track : t)),
        })
    }

    const addPressing = (pressing: Pressing) => {
        form.setValues({
            ...form.values,
            pressings: [...form.values.pressings, pressing],
        })
    }

    const deletePressing = (name: string) => {
        form.setValues({
            ...form.values,
            pressings: form.values.pressings.filter(pressing => pressing.name !== name),
        })
    }

    const editPressing = (pressing: Pressing) => {
        form.setValues({
            ...form.values,
            pressings: form.values.pressings.map(p => (p.name === pressing.name ? pressing : p)),
        })
    }

    if (isLoading || isError) {
        return null
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <ImageInput
                label='Album cover'
                placeholder='Upload alternative album cover'
                {...form.getInputProps('image')}
                firstInput={<TextInput withAsterisk label='Artist' {...form.getInputProps('artist.name')} />}
                secondInput={<DatePicker withAsterisk label='Release date' {...form.getInputProps('releaseDate')} />}
            />
            <Textarea withAsterisk label='Bio' minRows={8} {...form.getInputProps('artist.bio')} />
            <EditableTracklist tracks={form.values.tracklist} deleteTrack={deleteTrack} editTrack={editTrack} />
            <Pressings
                pressings={form.values.pressings}
                deletePressing={deletePressing}
                editPressing={editPressing}
                addPressing={addPressing}
            />
            <Button mt='lg' type='submit'>
                Submit
            </Button>
        </form>
    )
}
