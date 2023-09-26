import { Button, TextInput, Textarea } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import PhotoInput from '../../components/common/PhotoInput'
import { useSpotifyAlbum } from '../../hooks/album/useSpotifyAlbum'
import EditableTracklist, { EditableTrack } from './EditableTracklist'

type Props = {}

export default function AlbumForm({}: Props) {
    interface Form {
        image: string
        artist: {
            name: string
            image: string
            bio: string
        }
        releaseDate: string
        tracklist: Array<EditableTrack>
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

    if (isLoading || isError) {
        return null
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <PhotoInput
                label='Album cover'
                placeholder='Upload alternative album cover'
                defaultValue={form.values.image}
                firstInput={<TextInput withAsterisk label='Artist' {...form.getInputProps('artist.name')} />}
                secondInput={<DatePicker withAsterisk label='Release date' {...form.getInputProps('releaseDate')} />}
            />
            <Textarea withAsterisk label='Bio' minRows={8} {...form.getInputProps('artist.bio')} />
            <EditableTracklist tracks={form.values.tracklist} deleteTrack={deleteTrack} editTrack={editTrack} />
            <Button mt='lg' type='submit'>
                Submit
            </Button>
        </form>
    )
}
