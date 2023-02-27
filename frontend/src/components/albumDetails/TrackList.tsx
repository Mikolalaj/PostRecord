import { ActionIcon, Flex, Table, Title } from '@mantine/core'
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
