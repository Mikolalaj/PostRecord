import { useSetRecoilState } from 'recoil'
import AlbumSearch from '../../components/addAlbum/AlbumSearch'
import TrackList from '../../components/albumDetails/TrackList'
import PhotoInput from '../../components/common/PhotoInput'
import { Track } from '../../hooks/album/useAlbums'
import { spotifyAlbumIdState, useSpotifyAlbum } from '../../hooks/album/useSpotifyAlbum'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { Button, TextInput, Textarea } from '@mantine/core'

type Props = {}

export default function AddNewAlbum({}: Props) {
    const setAlbumId = useSetRecoilState(spotifyAlbumIdState)
    interface Form {
        image: string
        artist: {
            name: string
            image: string
            bio: string
        }
        releaseDate: string
        tracklist: Array<
            Track & {
                spotifyId: string
            }
        >
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

    return (
        <>
            <h1>Add a new album</h1>
            <AlbumSearch onSelect={value => setAlbumId(value)} />
            {!isLoading && !isError && (
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <PhotoInput
                        label='Album cover'
                        placeholder='Upload alternative album cover'
                        defaultValue={form.values.image}
                        firstInput={<TextInput withAsterisk label='Artist' {...form.getInputProps('artist.name')} />}
                        secondInput={<DatePicker withAsterisk label='Release date' {...form.getInputProps('releaseDate')} />}
                    />
                    <Textarea withAsterisk label='Bio' minRows={6} {...form.getInputProps('artist.bio')} />
                    <TrackList tracklist={form.values.tracklist} />
                    <Button mt='lg' type='submit'>
                        Submit
                    </Button>
                </form>
            )}
        </>
    )
}
