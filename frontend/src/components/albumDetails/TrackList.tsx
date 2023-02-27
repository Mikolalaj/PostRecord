import { ActionIcon, Table } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'

interface TrackListProps {
    tracklist: {
        number: number
        title: string
        duration: string
    }[]
}

function TrackList({ tracklist }: TrackListProps) {
    const rows = tracklist.map(track => (
        <tr key={track.number}>
            <td>{track.number}</td>
            <td>
                <ActionIcon color='pink' radius='xl'>
                    <IconHeart size={18} />
                </ActionIcon>
            </td>
            <td>{track.title}</td>
            <td>{track.duration}</td>
        </tr>
    ))

    return (
        <Table highlightOnHover>
            <tbody>{rows}</tbody>
        </Table>
    )
}

export default TrackList
