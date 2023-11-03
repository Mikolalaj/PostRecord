import { Button, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import ImageInput from '../../components/common/ImageInput'
import { AlbumFormPost, spotifyAlbumIdState, useSpotifyAlbum } from '../../hooks/album/useSpotifyAlbum'
import EditableTracklist, { EditableTrack } from './EditableTracklist'
import Pressings from './Pressings'
import { NewPressing } from './PressingForm'
import { useRecoilValue } from 'recoil'

export default function AlbumForm() {
    const form = useForm<AlbumFormPost>({
        initialValues: {
            image: '',
            releaseDate: '',
            tracklist: [],
            pressings: [],
        },
    })

    const { isLoading, isError } = useSpotifyAlbum(form.setValues)
    const albumId = useRecoilValue(spotifyAlbumIdState)

    const onSubmit = (values: AlbumFormPost) => {
        console.log({ ...values, albumId })
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

    const addPressing = (pressing: NewPressing) => {
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

    const editPressing = (pressing: NewPressing) => {
        form.setValues({
            ...form.values,
            pressings: form.values.pressings.map(p => (p.name === pressing.name ? pressing : p)),
        })
    }

    if (isLoading || isError) {
        return null
    }

    return (
        <>
            <form onSubmit={form.onSubmit(onSubmit)} id='album'>
                <ImageInput
                    label='Album cover'
                    placeholder='Upload alternative album cover'
                    {...form.getInputProps('image')}
                    firstInput={<TextInput disabled withAsterisk label='Artist' {...form.getInputProps('artist.name')} />}
                    secondInput={<DatePicker withAsterisk label='Release date' {...form.getInputProps('releaseDate')} />}
                />
            </form>
            <EditableTracklist tracks={form.values.tracklist} deleteTrack={deleteTrack} editTrack={editTrack} />
            <Pressings
                pressings={form.values.pressings}
                deletePressing={deletePressing}
                editPressing={editPressing}
                addPressing={addPressing}
            />
            <Button form='album' mt='lg' type='submit'>
                Submit
            </Button>
        </>
    )
}
