import { Flex, Text, Title } from '@mantine/core'

interface TrackListProps {
    tracklist: string[]
}

function TrackList({ tracklist }: TrackListProps) {
    return (
        <Flex direction='column'>
            <Title color='red.7' order={2} mb='md'>
                Track list
            </Title>
            {tracklist.map((track, index) => (
                <Text key={index}>
                    {index + 1}. {track}
                </Text>
            ))}
        </Flex>
    )
}

export default TrackList
