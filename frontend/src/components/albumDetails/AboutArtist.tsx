import { Flex, Image, Spoiler, Text, Title } from '@mantine/core'
import { Artist } from '../../hooks/album/useAlbums'

function AboutArtist({ name, image, bio }: Artist) {
    return (
        <Flex direction='column'>
            <Title color='red.7' order={2} mb='md'>
                About This Artist
            </Title>
            <Spoiler maxHeight={400} showLabel='Show more' hideLabel='Hide'>
                <Image mr='lg' radius={100} src={image} width={190} height={190} style={{ display: 'block', float: 'left' }} />
                <Text>
                    <Text weight={700} size='xl'>
                        {name}
                    </Text>
                    <Text align='justify'>{bio}</Text>
                </Text>
            </Spoiler>
        </Flex>
    )
}

export default AboutArtist
