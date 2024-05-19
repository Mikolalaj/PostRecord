import { Center, Text, Paper, Image, Stack } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

type Props = {
    album: {
        id: string
        title: string
        artist: string
        image: string
    } | null
}

export default function FavouriteAlbum({ album }: Props) {
    if (!album) {
        return (
            <>
                <Text ta='center' fz='lg' fw={500}>
                    Favourite album
                </Text>
                <Center>
                    <Text c='dimmed' size='sm'>
                        No favourite album
                    </Text>
                </Center>
            </>
        )
    }
    const { id, title, artist, image } = album
    const navigate = useNavigate()

    return (
        <div>
            <Text ta='center' fz='lg' fw={500} mb='md'>
                Favourite album
            </Text>

            <Center style={{ cursor: 'pointer' }}>
                <Text c='dimmed' size='sm'>
                    <Paper
                        shadow='sm'
                        radius='md'
                        withBorder
                        display='flex'
                        style={{ flexDirection: 'row' }}
                        onClick={() => navigate(`/album/${id}`)}
                    >
                        <Image src={image} alt={title} width={70} radius='sm' />
                        <Center>
                            <Stack spacing={3} mx='sm'>
                                <Text fz='md' weight={500}>
                                    {title}
                                </Text>
                                <Text c='dimmed'>{artist}</Text>
                            </Stack>
                        </Center>
                    </Paper>
                </Text>
            </Center>
        </div>
    )
}
