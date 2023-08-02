import { SimpleGrid } from '@mantine/core'
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
        title: 'Midnights',
        artist: 'Taylor Swift',
        image: 'https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5',
        isNew: false,
    },
    {
        id: '4',
        title: 'Desire, I Want To Turn Into You',
        artist: 'Caroline Polachek',
        image: 'https://i.scdn.co/image/ab67616d00001e02de17893c581b6f4fbeba51e1',
        isNew: false,
    },
    {
        id: '5',
        title: 'Norman Fucking Rockwell!',
        artist: 'Lana Del Rey',
        image: 'https://i.scdn.co/image/ab67616d00001e02879e9318cb9f4e05ee552ac9',
        isNew: false,
    },
    {
        id: '6',
        title: 'Cool It Down',
        artist: 'Yeah Yeah Yeahs',
        image: 'https://i.scdn.co/image/ab67616d00001e02667ca33e4b6d8e74b17a6529',
        isNew: true,
    },
    {
        id: '7',
        title: 'Titanic Rising',
        artist: 'Weyes Blood',
        image: 'https://i.scdn.co/image/ab67616d00001e020c64e752dec4c08362cc4a88',
        isNew: false,
    },
    {
        id: '8',
        title: 'And In The Darkness, Hearts Aglow',
        artist: 'Weyes Blood',
        image: 'https://i.scdn.co/image/ab67616d00001e02db8ab490bcedb6e518c37e6e',
        isNew: true,
    },
    {
        id: '9',
        title: 'SOS',
        artist: 'SZA',
        image: 'https://i.scdn.co/image/ab67616d00001e0270dbc9f47669d120ad874ec1',
        isNew: true,
    },
    {
        id: '10',
        title: 'folklore',
        artist: 'Taylor Swift',
        image: 'https://i.scdn.co/image/ab67616d00001e0295f754318336a07e85ec59bc',
        isNew: false,
    },
    {
        id: '11',
        title: 'Did You Know That There Is A Tunnel Under Ocean Blvd',
        artist: 'Lana Del Rey',
        image: 'https://i.scdn.co/image/ab67616d00001e0259ae8cf65d498afdd5585634',
        isNew: true,
    },
]

function AlbumsListing() {
    return (
        <SimpleGrid cols={5} spacing='lg' verticalSpacing='lg' my='lg'>
            {albumsData.map(album => (
                <AlbumCard {...album} />
            ))}
        </SimpleGrid>
    )
}

export default AlbumsListing
