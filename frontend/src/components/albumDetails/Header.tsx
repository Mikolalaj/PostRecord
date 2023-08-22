import { Button, Flex, Group, Image, Stack, Text, Title, createStyles, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHeartPlus, IconPlus } from '@tabler/icons-react'
import { AlbumDetails } from '../../hooks/album/useAlbums'

const useStyles = createStyles(() => ({
    image: {
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.03)',
            cursor: 'pointer',
        },
    },
}))

interface HeaderProps extends Omit<AlbumDetails, 'tracklist'> {}

function Header({ title, image, imageBig, artist, genre, releaseDate, spotifyId }: HeaderProps) {
    const { classes } = useStyles()

    const [opened, { open, close }] = useDisclosure(false)

    return (
        <Flex gap='lg' align='flex-start'>
            <Image className={classes.image} src={image} alt={title} width={250} height={250} onClick={open} />
            <Modal opened={opened} onClose={close} withCloseButton={false} centered size='auto'>
                <Image src={imageBig} alt={title} width={600} height={600} />
            </Modal>

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
