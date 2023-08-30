import { Autocomplete, Avatar, Button, Group, Modal, Text } from '@mantine/core'
// import { useForm } from '@mantine/form'
import { useDebouncedValue, useDisclosure } from '@mantine/hooks'
import { IconMusicPlus } from '@tabler/icons-react'
import { forwardRef, useState } from 'react'
import { SearchAlbum, useSearchAlbums } from '../hooks/album/useAlbums'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'>, SearchAlbum {}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(function SelectItem(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { image, albumTitle, artist, spotifyId, ...others }: ItemProps,
    ref
) {
    return (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image} />
                <div>
                    <Text size='sm'>{albumTitle}</Text>
                    <Text size='xs' opacity={0.65}>
                        {artist}
                    </Text>
                </div>
            </Group>
        </div>
    )
})

function Admin() {
    const [selectedAlbum, setSelectedAlbum] = useState<string>('')

    const [opened, { open, close }] = useDisclosure(false)

    const [search, setSearch] = useState('')
    const [debounced] = useDebouncedValue(search, 250)
    const { data } = useSearchAlbums(debounced)

    const getSelectData = (album: SearchAlbum) => {
        return { value: album.albumTitle, ...album }
    }
    const albumsRaw = data.map(album => getSelectData(album))
    const albumsRawUnique = albumsRaw.filter((album, index, self) => self.findIndex(a => a.albumTitle === album.albumTitle) === index)
    const albums = selectedAlbum ? [] : albumsRawUnique

    return (
        <>
            <h1>Admin tools</h1>
            <Modal opened={opened} onClose={close} title='Add a new album'>
                <Autocomplete
                    label='Album title'
                    placeholder='Start typing to find your album...'
                    nothingFound={!selectedAlbum && 'No albums found'}
                    itemComponent={SelectItem}
                    data={albums}
                    onChange={value => {
                        setSelectedAlbum('')
                        setSearch(value || '')
                    }}
                    onItemSubmit={value => setSelectedAlbum(value.value)}
                    filter={() => true}
                    value={search}
                    limit={8}
                />
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
