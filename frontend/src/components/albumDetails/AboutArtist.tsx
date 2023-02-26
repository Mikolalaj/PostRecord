import { Flex, Image, Text, Title } from '@mantine/core'

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
            <Flex>
                <Image src={image} width={220} height={220} />
                <Flex direction='column' ml='lg'>
                    <Text weight={700} size='xl'>
                        {name}
                    </Text>
                    <Text>{description}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default AboutArtist
