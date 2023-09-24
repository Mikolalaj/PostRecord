import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconMusicPlus } from '@tabler/icons-react'
import { useSetRecoilState } from 'recoil'
import AlbumSearch from '../components/addAlbum/AlbumSearch'
import { spotifyAlbumIdState, useSpotifyAlbum } from '../hooks/album/useSpotifyAlbum'
import PhotoInput from '../components/common/PhotoInput'

function Admin() {
    const [opened, { open, close }] = useDisclosure(false)
    const setAlbumId = useSetRecoilState(spotifyAlbumIdState)

    // interface SpotifyAlbum {
    //     tracklist: Array<{
    //         spotifyId: string
    //         title: string
    //         duration: number
    //         features: string | null
    //         number: number
    //     }>
    // }

    interface Form {
        image: string
        artist: {
            name: string
            image: string
            bio: string
        }
        releaseDate: string
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
        },
    })

    const { isLoading, isError } = useSpotifyAlbum(form.setValues)

    const onSubmit = (values: Form) => {
        console.log(values)
    }

    return (
        <>
            <h1>Admin tools</h1>
            <Modal opened={opened} onClose={close} title='Add a new album' size={800}>
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
                        <Button mt='lg' type='submit'>
                            Submit
                        </Button>
                    </form>
                )}
            </Modal>
            <Button onClick={open} leftIcon={<IconMusicPlus />}>
                Add new album
            </Button>
        </>
    )
}

export default Admin
