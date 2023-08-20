import { Flex, Image, Spoiler, Text, Title } from '@mantine/core'

interface AboutArtistProps {
    name: string
    image: string
    description: string
}

function AboutArtist({ name, image, description }: AboutArtistProps) {
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
                    <Text align='justify'>{description}</Text>
                </Text>
            </Spoiler>
        </Flex>
    )
}

export default AboutArtist
