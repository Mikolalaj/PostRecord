import { Group, Text } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { IconExternalLink } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

type Props = {
    id: string
    title: string
}

export default function AlbumTitle({ id, title }: Props) {
    const navigate = useNavigate()
    const { ref: titleRef, hovered: isTitleHovered } = useHover<HTMLTableCellElement>()

    return (
        <td ref={titleRef}>
            <Group spacing={4}>
                <Text
                    td={isTitleHovered ? 'underline' : undefined}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/album/${id}`)}
                >
                    {title}
                </Text>{' '}
                <IconExternalLink size={15} color='gray' style={{ visibility: isTitleHovered ? 'visible' : 'hidden' }} />
            </Group>
        </td>
    )
}
