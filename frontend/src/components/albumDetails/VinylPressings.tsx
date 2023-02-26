import { Carousel } from '@mantine/carousel'
import { createStyles, Title } from '@mantine/core'
import Pressing from './Pressing'

const IMAGE_PATH = 'https://postrecordstorageaccount.blob.core.windows.net/records/'

interface VinylPressingsProps {
    vinylPressings: {
        id: string
        name: string
        image: string
        color: string
    }[]
}

const useStyles = createStyles(theme => ({
    card: {
        height: 440,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}))

function VinylPressings({ vinylPressings }: VinylPressingsProps) {
    const slides = vinylPressings.map(pressing => (
        <Carousel.Slide key={pressing.id}>
            <Pressing {...{ ...pressing, image: IMAGE_PATH + pressing.image }} />
        </Carousel.Slide>
    ))

    return (
        <>
            <Title order={2}>Vinyl Pressings</Title>
            <Carousel
                pt='lg'
                slideSize='25%'
                breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
                slideGap='xl'
                align='start'
                slidesToScroll={1}
                loop>
                {slides}
            </Carousel>
        </>
    )
}

export default VinylPressings
