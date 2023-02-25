import { Flex } from '@mantine/core'
import AlbumCard from './AlbumCard'

const albumsData = [
    {
        id: '1',
        title: 'Blue Weekend',
        artist: 'Wolf Alice',
        image: 'https://i.scdn.co/image/ab67616d00001e020d1e8740297489a355564e34',
        isNew: true,
    },
    {
        id: '2',
        title: 'Surrender',
        artist: 'Maggie Rogers',
        image: 'https://i.scdn.co/image/ab67616d00001e020fdfb62956211c999c39a5a3',
        isNew: false,
    },
    {
        id: '3',
        title: 'Desire, I Want To Turn Into You',
        artist: 'Caroline Polachek',
        image: 'https://i.scdn.co/image/ab67616d00001e02de17893c581b6f4fbeba51e1',
        isNew: false,
    },
    {
        id: '4',
        title: 'Norman Fucking Rockwell!',
        artist: 'Lana Del Rey',
        image: 'https://i.scdn.co/image/ab67616d00001e02879e9318cb9f4e05ee552ac9',
        isNew: false,
    },
    {
        id: '5',
        title: 'Cool It Down',
        artist: 'Yeah Yeah Yeahs',
        image: 'https://i.scdn.co/image/ab67616d00001e02667ca33e4b6d8e74b17a6529',
        isNew: true,
    },
]

function AlbumsListing() {
    return (
        <Flex gap='lg' justify='space-between' wrap='wrap' my='lg'>
            {albumsData.map(album => (
                <AlbumCard {...album} />
            ))}
        </Flex>
    )
}

export default AlbumsListing
