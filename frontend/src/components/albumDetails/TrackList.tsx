import { Flex, Table, Text, Title } from '@mantine/core'
import { TracklistType } from '../../types'

interface TrackListProps {
    tracklist: TracklistType
}

function TrackList({ tracklist }: TrackListProps) {
    const rows = tracklist.map(track => (
        <tr key={track.number}>
            <td>{track.number}</td>
            <td>
                <Text>
                    {track.title} {track.features && <Text component='span' c='dimmed'>{`(feat. ${track.features})`}</Text>}
                </Text>
            </td>
            <td>
                <Text align='right'>{track.duration}</Text>
            </td>
        </tr>
    ))

    return (
        <Flex direction='column'>
            <Title color='red.7' order={2} mb='md'>
                Tracklist
            </Title>
            <Table highlightOnHover>
                <tbody>{rows}</tbody>
            </Table>
        </Flex>
    )
}

export default TrackList
