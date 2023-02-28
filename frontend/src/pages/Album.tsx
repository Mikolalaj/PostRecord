import { Button, Flex, Grid, Group, Image, Stack, Text, Title } from '@mantine/core'
import { IconHeartPlus, IconPlus } from '@tabler/icons-react'
import AboutArtist from '../components/albumDetails/AboutArtist'
import TrackList from '../components/albumDetails/TrackList'
import VinylPressings from '../components/albumDetails/VinylPressings'
import { AlbumType } from '../types'

const albumData: AlbumType = {
    title: 'Surrender',
    artist: {
        name: 'Maggie Rogers',
        image: 'https://i.scdn.co/image/ab6761610000e5ebc8167bcebaf508dc6c3459b1',
        description:
            'Maggie Rogers is an American singer-songwriter, multi-instrumentalist and record producer from Easton, Maryland. \
            Her big break came when her song "Alaska" was played to Pharrell Williams during a master class at New York University. \
            She released her debut EP, Now That the Light Is Fading, in 2015. Her debut studio album, Heard It in a Past Life, was \
            released in 2019. She was nominated for a Grammy Award for Best New Artist in 2019. Her second studio album, \
            Heard It in a Past Life, was released in 2021. Her third studio album, Heard It in a Past Life, was released in 2022. \
            She graduated from Harvard Divinity School in May 2022.',
    },
    image: 'https://i.scdn.co/image/ab67616d00001e020fdfb62956211c999c39a5a3',
    pressings: [
        {
            id: '1',
            name: 'Black',
            image: 'maggie-rogers-surrender-black.webp',
            color: 'dark',
            isInCollection: false,
        },
        {
            id: '2',
            name: 'Hot Pink',
            image: 'maggie-rogers-surrender-pink.webp',
            color: 'pink',
            isInCollection: false,
        },
        {
            id: '3',
            name: 'Teardrop Blue',
            image: 'maggie-rogers-surrender-blue.webp',
            color: 'blue',
            isInCollection: true,
        },
        {
            id: '4',
            name: 'Orchid',
            image: 'maggie-rogers-surrender-purple.webp',
            color: 'grape',
            isInCollection: false,
        },
        {
            id: '5',
            name: 'Spring Green',
            image: 'maggie-rogers-surrender-green.webp',
            color: 'green',
            isInCollection: false,
        },
        {
            id: '6',
            name: 'Tangerine Dream',
            image: 'maggie-rogers-surrender-orange.webp',
            color: 'orange',
            isInCollection: false,
        },
    ],
    genre: 'Pop',
    style: 'Indie Pop',
    year: '2022',
    spotifyId: '2VeOtQQAJxR8VyvmoXqIbI',
    tracklist: [
        {
            number: 1,
            title: 'Overdrive',
            duration: '3:14',
        },
        {
            number: 2,
            title: "That's Where I Am",
            duration: '4:12',
        },
        {
            number: 3,
            title: 'Want Want',
            duration: '3:08',
        },
        {
            number: 4,
            title: 'Anywhere With You',
            duration: '4:57',
        },
        {
            number: 5,
            title: 'Horses',
            duration: '5:05',
        },
        {
            number: 6,
            title: 'Be Cool',
            duration: '2:57',
        },
        {
            number: 7,
            title: 'Shatter',
            duration: '3:40',
        },
        {
            number: 8,
            title: 'Begging For Rain',
            duration: '4:13',
        },
        {
            number: 9,
            title: "I've Got A Friend",
            duration: '3:12',
        },
        {
            number: 10,
            title: 'Honey',
            duration: '3:42',
        },
        {
            number: 11,
            title: 'Symphony',
            duration: '5:11',
        },
        {
            number: 12,
            title: 'Different Kind Of World',
            duration: '2:45',
        },
    ],
}

function Album() {
    // function Album({ title, artist, image, pressings }: AlbumProps) {
    const { title, artist, image, pressings, spotifyId, tracklist } = albumData
    return (
        <Flex gap='xl' direction='column'>
            <Flex gap='lg' align='flex-start'>
                <Image src={image} alt={title} width={250} height={250} />
                <Stack align='flex-start' justify='space-between'>
                    <Title>
                        <Text component='span' inherit color='violet' style={{ fontSize: 40 }}>
                            {title}
                        </Text>{' '}
                        <Text component='span' weight={200} size='xl'>
                            by {artist.name}
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
                    <Group mt='xl'>
                        <Button variant='light' leftIcon={<IconPlus size={20} />}>
                            Add to collection
                        </Button>
                        <Button color='pink' variant='outline' leftIcon={<IconHeartPlus size={20} />}>
                            Set as favorite
                        </Button>
                        <Button color='green.6' component='a' target='_blank' href={`https://open.spotify.com/album/${spotifyId}`}>
                            Listen on Spotify
                        </Button>
                    </Group>
                </Stack>
            </Flex>
            <Grid gutter={50}>
                <Grid.Col lg={6} sm={6} xs={12}>
                    <TrackList tracklist={tracklist} />
                </Grid.Col>
                <Grid.Col lg={6} sm={6} xs={12}>
                    <AboutArtist {...artist} />
                </Grid.Col>
            </Grid>
            <VinylPressings vinylPressings={pressings} />
        </Flex>
    )
}

export default Album
