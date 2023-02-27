import { Flex, Text, Title } from '@mantine/core'

interface TrackListProps {
    tracklist: {
        number: number
        title: string
        duration: string
    }[]
}

function TrackList({ tracklist }: TrackListProps) {
    return (
        <Flex direction='column'>
            <Title color='red.7' order={2} mb='md'>
                Track list
            </Title>
            {tracklist.map(track => (
                <Text key={track.number}>
                    {track.number}. {track.title} - {track.duration}
                </Text>
            ))}
        </Flex>
    )
}

export default TrackList
