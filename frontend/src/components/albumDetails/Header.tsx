import { Button, Flex, Group, Image, Stack, Text, Title } from '@mantine/core'
import { IconHeartPlus, IconPlus } from '@tabler/icons-react'

interface HeaderProps {
    title: string
    image: string
    artist: {
        name: string
        image: string
        description: string
    }
    genre: string
    releaseDate: Date
    spotifyId: string
}

function Header({ title, image, artist, genre, releaseDate, spotifyId }: HeaderProps) {
    return (
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
                        <Text weight={500}>Year: </Text>
                    </Flex>
                    <Flex direction='column' justify='center' align='flex-start'>
                        <Text>Capitol Records</Text>
                        <Text>{genre}</Text>
                        <Text>{releaseDate.getFullYear()}</Text>
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
    )
}

export default Header
