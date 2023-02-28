import { Container, Flex, Image, Text, Title } from '@mantine/core'

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
            <Container px={0}>
                <Image mr='lg' radius={100} src={image} width={190} height={190} style={{ display: 'block', float: 'left' }} />
                <Text>
                    <Text weight={700} size='xl'>
                        {name}
                    </Text>
                    <Text>{description}</Text>
                </Text>
            </Container>
        </Flex>
    )
}

export default AboutArtist
