import { Flex, Group, Image, Text, Title } from '@mantine/core'
import VinylPressings from '../components/albumDetails/VinylPressings'

const albumData: AlbumProps = {
    title: 'Surrender',
    artist: 'Maggie Rogers',
    image: 'https://i.scdn.co/image/ab67616d00001e020fdfb62956211c999c39a5a3',
    artistImage: 'https://i.scdn.co/image/ab6761610000e5ebc8167bcebaf508dc6c3459b1',
    pressings: [
        {
            id: '1',
            name: 'Black',
            image: 'maggie-rogers-surrender-black.webp',
            color: 'dark',
        },
        {
            id: '2',
            name: 'Hot Pink',
            image: 'maggie-rogers-surrender-pink.webp',
            color: 'pink',
        },
        {
            id: '3',
            name: 'Teardrop Blue',
            image: 'maggie-rogers-surrender-blue.webp',
            color: 'blue',
        },
        {
            id: '4',
            name: 'Orchid',
            image: 'maggie-rogers-surrender-purple.webp',
            color: 'grape',
        },
        {
            id: '5',
            name: 'Spring Green',
            image: 'maggie-rogers-surrender-green.webp',
            color: 'green',
        },
        {
            id: '6',
            name: 'Tangerine Dream',
            image: 'maggie-rogers-surrender-orange.webp',
            color: 'orange',
        },
    ],
    genre: 'Pop',
    style: 'Indie Pop',
    year: '2022',
    tracklist: [
        'Overdrive',
        "That's Where I Am",
        'Want Want',
        'Anywhere With You',
        'Horses',
        'Be Cool',
        'Shatter',
        'Begging For Rain',
        "I've Got A Friend",
        'Honey',
        'Symphony',
        'Different Kind Of World',
    ],
}

interface AlbumProps {
    title: string
    artist: string
    image: string
    artistImage: string
    genre: string
    style: string
    year: string
    tracklist: string[]
    pressings: {
        id: string
        name: string
        image: string
        color: string
    }[]
}

function Album() {
    // function Album({ title, artist, image, pressings }: AlbumProps) {
    const { title, artist, image, pressings } = albumData
    return (
        <>
            <Flex gap='lg' align='flex-start'>
                <Image src={image} alt={title} width={250} height={250} />
                <Flex direction='column' justify='flex-start' align='flex-start'>
                    <Title>
                        <Text component='span' inherit color='violet'>
                            {title}
                        </Text>{' '}
                        <Text component='span' weight={200} size='xl'>
                            by {artist}
                        </Text>
                    </Title>
                    <Group style={{ width: '100%' }}>
                        <Flex direction='column' justify='center' align='flex-start'>
                            <Text weight={500}>Label: </Text>
                            <Text weight={500}>Genre: </Text>
                            <Text weight={500}>Style: </Text>
                            <Text weight={500}>Year: </Text>
                        </Flex>
                        <Flex direction='column' justify='center' align='flex-start'>
                            <Text>Capitol Records</Text>
                            <Text>{albumData.genre}</Text>
                            <Text>{albumData.style}</Text>
                            <Text>{albumData.year}</Text>
                        </Flex>
                    </Group>
                </Flex>
            </Flex>
            <Title order={2}>Track list</Title>
            {albumData.tracklist.map((track, index) => (
                <Text key={index}>
                    {index + 1}. {track}
                </Text>
            ))}
            <iframe
                style={{ borderRadius: '12px', border: '0px' }}
                src='https://open.spotify.com/embed/album/2VeOtQQAJxR8VyvmoXqIbI?utm_source=generator'
                width='100%'
                height='152'
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'></iframe>
            <VinylPressings vinylPressings={pressings} />
        </>
    )
}

export default Album
