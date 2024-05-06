import { Title, Text, Table, Center, Group } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import QueryRenderer from 'components/common/QueryRenderer'
import { useCollection, CollectionPressing } from 'hooks/album/useCollection'
import PressingOptions from './PressingOptions'
import { IconExternalLink } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export default function Collection() {
    return (
        <QueryRenderer
            queries={[useCollection()]}
            render={collection => (
                <>
                    <Title order={2} mt='xl'>
                        <Text fz='xl' fw={700}>
                            Collection
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
                                <th style={{ textAlign: 'center' }}>Sale price</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {collection.map(pressing => (
                                <TableRow pressing={pressing} key={pressing.id} />
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        />
    )
}

function TableRow({ pressing }: { pressing: CollectionPressing }) {
    const { ref: rowRef, hovered: isRowHovered } = useHover<HTMLTableRowElement>()
    const { ref: titleRef, hovered: isTitleHovered } = useHover<HTMLTableCellElement>()
    const navigate = useNavigate()

    return (
        <tr key={pressing.id} ref={rowRef}>
            <td>
                <img src={import.meta.env.VITE_IMAGE_PATH + pressing.image} alt={pressing.image} height='50' />
            </td>
            <td>{pressing.name}</td>
            <td ref={titleRef}>
                <Group spacing={4}>
                    <Text
                        td={isTitleHovered ? 'underline' : undefined}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/album/${pressing.album.id}`)}
                    >
                        {pressing.album.title}
                    </Text>{' '}
                    <IconExternalLink size={15} color='gray' style={{ visibility: isTitleHovered ? 'visible' : 'hidden' }} />
                </Group>
            </td>
            <td>
                <Center>{new Date(pressing.album.releaseDate).getFullYear()}</Center>
            </td>
            <td>
                <Center>{new Date(pressing.addedAt).toDateString()}</Center>
            </td>
            <td>
                {pressing.salePrice ? (
                    <Center>
                        <span>{'$' + pressing.salePrice}</span>
                    </Center>
                ) : (
                    ''
                )}
            </td>
            <td>
                <PressingOptions
                    isHidden={!isRowHovered}
                    price={pressing.salePrice}
                    pressing={{
                        id: pressing.id,
                        name: pressing.name,
                    }}
                    album={{
                        id: pressing.album.id,
                        title: pressing.album.title,
                    }}
                />
            </td>
        </tr>
    )
}
