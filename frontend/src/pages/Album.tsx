import { Flex, Grid } from '@mantine/core'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import AboutArtist from '../components/albumDetails/AboutArtist'
import Header from '../components/albumDetails/Header'
import TrackList from '../components/albumDetails/TrackList'
import VinylPressings from '../components/albumDetails/VinylPressings'
import { AlbumType } from '../types'

const albumDataSurrender: AlbumType = {
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
            image: 'maggie-rogers-surrender-black.png',
            color: 'dark',
            isInCollection: false,
        },
        {
            id: '2',
            name: 'Hot Pink',
            image: 'maggie-rogers-surrender-pink.png',
            color: 'pink',
            isInCollection: false,
        },
        {
            id: '3',
            name: 'Teardrop Blue',
            image: 'maggie-rogers-surrender-blue.png',
            color: 'blue',
            isInCollection: true,
        },
        {
            id: '4',
            name: 'Orchid',
            image: 'maggie-rogers-surrender-purple.png',
            color: 'grape',
            isInCollection: false,
        },
        {
            id: '5',
            name: 'Spring Green',
            image: 'maggie-rogers-surrender-green.png',
            color: 'green',
            isInCollection: false,
        },
        {
            id: '6',
            name: 'Tangerine Dream',
            image: 'maggie-rogers-surrender-orange.png',
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
            features: null,
        },
        {
            number: 2,
            title: "That's Where I Am",
            duration: '4:12',
            features: null,
        },
        {
            number: 3,
            title: 'Want Want',
            duration: '3:08',
            features: null,
        },
        {
            number: 4,
            title: 'Anywhere With You',
            duration: '4:57',
            features: null,
        },
        {
            number: 5,
            title: 'Horses',
            duration: '5:05',
            features: null,
        },
        {
            number: 6,
            title: 'Be Cool',
            duration: '2:57',
            features: null,
        },
        {
            number: 7,
            title: 'Shatter',
            duration: '3:40',
            features: null,
        },
        {
            number: 8,
            title: 'Begging For Rain',
            duration: '4:13',
            features: null,
        },
        {
            number: 9,
            title: "I've Got A Friend",
            duration: '3:12',
            features: null,
        },
        {
            number: 10,
            title: 'Honey',
            duration: '3:42',
            features: null,
        },
        {
            number: 11,
            title: 'Symphony',
            duration: '5:11',
            features: null,
        },
        {
            number: 12,
            title: 'Different Kind Of World',
            duration: '2:45',
            features: null,
        },
    ],
}

const albumDataMidnights: AlbumType = {
    title: 'Midnights',
    artist: {
        name: 'Taylor Swift',
        image: 'https://i.scdn.co/image/ab676161000051745a00969a4698c3132a15fbb0',
        description:
            'Taylor Alison Swift is an American singer-songwriter. Her discography spans multiple genres, and her narrative \
            songwriting, which is often inspired by her personal life, has received widespread media coverage and critical praise.\
            Born in West Reading, Pennsylvania, Swift relocated to Nashville, Tennessee in 2004 to pursue a career in country music.\
            She broke into the country music scene with her eponymous self-titled debut studio album, "Taylor Swift" in 2006, which \
            included the singles "Teardrops on My Guitar" and "Our Song". Swift also released the holiday album, Sounds of the Season:\
            The Taylor Swift Holiday Collection, later titled as "The Taylor Swift Holiday Collection" in October 2007.',
    },
    image: 'https://i.scdn.co/image/ab67616d00001e02bb54dde68cd23e2a268ae0f5',
    pressings: [
        {
            id: '1',
            name: 'Jade Green',
            image: 'taylor-swift-midnights-jade-green.png',
            color: 'green',
            isInCollection: false,
        },
        {
            id: '2',
            name: 'Mahogany',
            image: 'taylor-swift-midnights-mahogany.png',
            color: 'orange',
            isInCollection: false,
        },
        {
            id: '3',
            name: 'Blood Moon',
            image: 'taylor-swift-midnights-blood-moon.png',
            color: 'yellow',
            isInCollection: false,
        },
        {
            id: '4',
            name: 'Lavender',
            image: 'taylor-swift-midnights-lavender.png',
            color: 'grape',
            isInCollection: false,
        },
        {
            id: '5',
            name: 'Moonstone Blue',
            image: 'taylor-swift-midnights-moonstone-blue.png',
            color: 'blue',
            isInCollection: true,
        },
    ],
    genre: 'Pop',
    style: 'Vocal',
    year: '2022',
    spotifyId: '151w1FgRZfnKZA9FEcg9Z3',
    tracklist: [
        {
            number: 1,
            title: 'Lavender Haze',
            duration: '3:22',
            features: null,
        },
        {
            number: 2,
            title: 'Maroon',
            duration: '3:38',
            features: null,
        },
        {
            number: 3,
            title: 'Anti-Hero',
            duration: '3:20',
            features: null,
        },
        {
            number: 4,
            title: "You're On Your Own, Kid",
            duration: '4:57',
            features: null,
        },
        {
            number: 5,
            title: 'Snow On The Beach',
            duration: '5:05',
            features: 'Lana Del Rey',
        },
        {
            number: 6,
            title: 'Midnight Rain',
            duration: '2:57',
            features: null,
        },
        {
            number: 7,
            title: 'Question...?',
            duration: '3:40',
            features: null,
        },
        {
            number: 8,
            title: 'Vigilante Shit',
            duration: '4:13',
            features: null,
        },
        {
            number: 9,
            title: 'Bejeweled',
            duration: '3:12',
            features: null,
        },
        {
            number: 10,
            title: 'Labryinth',
            duration: '3:42',
            features: null,
        },
        {
            number: 11,
            title: 'Karma',
            duration: '5:11',
            features: null,
        },
        {
            number: 12,
            title: 'Sweet Nothing',
            duration: '2:45',
            features: null,
        },
        {
            number: 13,
            title: 'Mastermind',
            duration: '3:11',
            features: null,
        },
    ],
}

function Album() {
    const { id } = useParams()

    const albumData = useMemo(() => {
        if (!id) {
            return null
        }
        if (id === '2') {
            return albumDataSurrender
        } else if (id === '3') {
            return albumDataMidnights
        }
        return null
    }, [])

    return (
        <Flex gap='xl' direction='column'>
            <Header {...albumData!} />
            <Grid gutter={50}>
                <Grid.Col lg={6} sm={6} xs={12}>
                    <TrackList tracklist={albumData!.tracklist} />
                </Grid.Col>
                <Grid.Col lg={6} sm={6} xs={12}>
                    <AboutArtist {...albumData!.artist} />
                </Grid.Col>
            </Grid>
            <VinylPressings vinylPressings={albumData!.pressings} />
        </Flex>
    )
}

export default Album
