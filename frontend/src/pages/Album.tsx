import { Flex, Grid } from '@mantine/core'
import AboutArtist from '../components/albumDetails/AboutArtist'
import Header from '../components/albumDetails/Header'
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
    const { artist, pressings, tracklist } = albumData
    return (
        <Flex gap='xl' direction='column'>
            <Header {...albumData} />
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
