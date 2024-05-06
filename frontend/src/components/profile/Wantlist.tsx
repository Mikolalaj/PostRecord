import { Title, Text, Table, Center, ActionIcon } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import QueryRenderer from 'components/common/QueryRenderer'
import { useRemoveFromWantlist, useWantlist, WantlistPressing } from 'hooks/album/useWantlist'
import AlbumTitle from './AlbumTitle'
import AlbumImage from './AlbumImage'
import { IconTrash } from '@tabler/icons-react'
import { openConfirmModal } from '@mantine/modals'

export default function Wantlist() {
    return (
        <QueryRenderer
            queries={[useWantlist()]}
            render={wantlist => {
                if (wantlist.length === 0) {
                    return null
                }
                return (
                    <>
                        <Title order={2} mt='xl'>
                            <Text fz='xl' fw={700}>
                                Wantlist
                            </Text>
                        </Title>
                        <Table highlightOnHover>
                            <thead>
                                <tr>
                                    <th />
                                    <th>Pressing Name</th>
                                    <th>Album Title</th>
                                    <th style={{ textAlign: 'center' }}>Year</th>
                                    <th style={{ textAlign: 'center' }}>Added date</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {wantlist.map(pressing => (
                                    <TableRow pressing={pressing} key={pressing.id} />
                                ))}
                            </tbody>
                        </Table>
                    </>
                )
            }}
        />
    )
}

function TableRow({ pressing }: { pressing: WantlistPressing }) {
    const { ref, hovered } = useHover<HTMLTableRowElement>()

    const removeFromWantlist = useRemoveFromWantlist()

    const openRemoveFromCollectionModal = () => {
        openConfirmModal({
            title: 'Please confirm your action',
            children: <Text size='sm'>Are you sure you want to remove this pressing from your collection?</Text>,
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => removeFromWantlist.mutate({ pressingId: pressing.id, albumId: pressing.album.id }),
            centered: true,
        })
    }

    return (
        <tr key={pressing.id} ref={ref}>
            <AlbumImage image={pressing.image} />
            <td>{pressing.name}</td>
            <AlbumTitle id={pressing.album.id} title={pressing.album.title} />
            <td>
                <Center>{new Date(pressing.album.releaseDate).getFullYear()}</Center>
            </td>
            <td>
                <Center>{new Date(pressing.addedAt).toDateString()}</Center>
            </td>
            <td>
                <ActionIcon
                    aria-label='Remove from collection'
                    style={{ visibility: hovered ? 'visible' : 'hidden' }}
                    variant='light'
                    color='red'
                    radius='xl'
                    onClick={openRemoveFromCollectionModal}
                >
                    <IconTrash stroke={1.5} size={18} />
                </ActionIcon>
            </td>
        </tr>
    )
}
