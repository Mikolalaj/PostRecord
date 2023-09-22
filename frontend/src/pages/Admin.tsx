import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconMusicPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import AlbumSearch from '../components/addAlbum/AlbumSearch'
import { spotifyAlbumIdState, useSpotifyAlbum } from '../hooks/album/useSpotifyAlbum'

function Admin() {
    const [opened, { open, close }] = useDisclosure(false)
    const setAlbumId = useSetRecoilState(spotifyAlbumIdState)


    const form = useForm({
        initialValues: {
            title: '',
            artistName: '',
        },
    })

    const { isLoading, isError } = useSpotifyAlbum(form.setValues)

    return (
        <>
            <h1>Admin tools</h1>
            <Modal opened={opened} onClose={close} title='Add a new album'>
                <AlbumSearch onSelect={value => setAlbumId(value)} />
                {!isLoading && !isError && (
                    <form onSubmit={form.onSubmit(values => console.log(values))}>
                        <Group position='right' mt='md'>
                            <TextInput
                                withAsterisk
                                label="Album title"
                                {...form.getInputProps('title')}
                            />
                            <Button type='submit'>Submit</Button>
                        </Group>
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
