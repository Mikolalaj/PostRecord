import { Button, Group, Text, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import ImageInput from 'components/common/ImageInput'
import { EditableTrack, useAddAlbum } from 'hooks/album/useAlbums'
import { AlbumFormPost, NewPressing, spotifyAlbumIdState, useSpotifyAlbum } from 'hooks/album/useSpotifyAlbum'
import { useRecoilValue } from 'recoil'
import EditableTracklist from './EditableTracklist'
import Pressings from './Pressings'

export default function AlbumForm() {
    const form = useForm<AlbumFormPost>({
        initialValues: {
            image: '',
            artistName: '',
            releaseDate: new Date(),
            genre: '',
            tracklist: [],
            pressings: [],
        },
        validate: {
            releaseDate: value => (value ? null : 'Enter the release date'),
            genre: value => (value ? null : 'Enter the genre'),
            pressings: value => (value.length > 0 ? null : 'Add at least one pressing'),
        },
    })

    const { mutate } = useAddAlbum()

    const { isLoading, isError } = useSpotifyAlbum(form.setValues)
    const albumId = useRecoilValue(spotifyAlbumIdState)

    const onSubmit = (values: AlbumFormPost) => {
        if (albumId) {
            console.log({ ...values, albumId })
            mutate({ ...values, releaseDate: values.releaseDate.toISOString(), albumId, artistId: '' })
        }
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
                    firstInput={<TextInput disabled withAsterisk label='Artist' {...form.getInputProps('artistName')} />}
                    secondInput={
                        <Group grow>
                            <DatePicker withAsterisk label='Release date' {...form.getInputProps('releaseDate')} />
                            <TextInput withAsterisk label='Genre' {...form.getInputProps('genre')} />
                        </Group>
                    }
                />
            </form>
            <EditableTracklist tracks={form.values.tracklist} deleteTrack={deleteTrack} editTrack={editTrack} />
            <Pressings
                pressings={form.values.pressings}
                deletePressing={deletePressing}
                editPressing={editPressing}
                addPressing={addPressing}
            />
            {form.errors.pressings && <Text c='red'>{form.errors.pressings}</Text>}
            <Button form='album' mt='lg' type='submit'>
                Submit
            </Button>
        </>
    )
}
