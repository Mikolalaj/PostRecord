import { Carousel } from '@mantine/carousel'
import { Flex, Title } from '@mantine/core'
import { Pressing as PressingType } from '../../hooks/album/useAlbums'
import Pressing from './Pressing'

const IMAGE_PATH = 'https://postrecordstorageaccount.blob.core.windows.net/records/'

interface VinylPressingsProps {
    vinylPressings: PressingType[]
}

function VinylPressings({ vinylPressings }: VinylPressingsProps) {
    const slides = vinylPressings.map(pressing => (
        <Carousel.Slide key={pressing.id}>
            <Pressing {...{ ...pressing, image: IMAGE_PATH + pressing.image }} />
        </Carousel.Slide>
    ))

    return (
        <Flex direction='column'>
            <Title color='red.7' order={2} mb='md'>
                Vinyl Pressings
            </Title>
            <Carousel
                slideSize='25%'
                breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
                slideGap='xl'
                align='start'
                slidesToScroll={1}
                loop>
                {slides}
            </Carousel>
        </Flex>
    )
}

export default VinylPressings
