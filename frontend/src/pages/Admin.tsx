import { Button, Modal } from '@mantine/core'
// import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconMusicPlus } from '@tabler/icons-react'
import AlbumSearch from '../components/addAlbum/AlbumSearch'

function Admin() {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <>
            <h1>Admin tools</h1>
            <Modal opened={opened} onClose={close} title='Add a new album'>
                <AlbumSearch onSelect={value => console.log(value)} />
                {/* <form onSubmit={form.onSubmit(values => console.log(values))}>
                    <Group position='right' mt='md'>
                        <Button type='submit'>Submit</Button>
                    </Group>
                </form> */}
            </Modal>
            <Button onClick={open} leftIcon={<IconMusicPlus />}>
                Add new album
            </Button>
        </>
    )
}

export default Admin
