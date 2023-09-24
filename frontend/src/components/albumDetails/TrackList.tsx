import { Flex, Table, Text, Title } from '@mantine/core'
import { Track } from '../../hooks/album/useAlbums'

interface TrackListProps {
    tracklist: Array<Track>
}

function TrackList({ tracklist }: TrackListProps) {
    const rows = tracklist.map(track => {
        {
            const durationMinutes = Math.floor(track.duration / 60)
            const durationSeconds = Math.floor(track.duration - durationMinutes * 60)
            let durationSecondsString = durationSeconds.toString()
            if (durationSeconds < 10) {
                durationSecondsString = durationSecondsString.padStart(2, '0')
            }
            return (
                <tr key={track.number}>
                    <td>{track.number}</td>
                    <td>
                        <Text>
                            {track.title} {track.features && <Text component='span' c='dimmed'>{`(feat. ${track.features})`}</Text>}
                        </Text>
                    </td>
                    <td>
                        <Text align='right'>
                            {durationMinutes}:{durationSecondsString}
                        </Text>
                    </td>
                </tr>
            )
        }
    })

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
