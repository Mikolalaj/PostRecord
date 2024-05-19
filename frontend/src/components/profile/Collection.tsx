import { Title, Text, Table, Center } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import QueryRenderer from 'components/common/QueryRenderer'
import { useCollection, CollectionPressing } from 'hooks/album/useCollection'
import CollectionOptions from './CollectionOptions'
import AlbumTitle from './AlbumTitle'
import AlbumImage from './AlbumImage'

type Props = {
    isProfileOwner: boolean
}

export default function Collection({ isProfileOwner }: Props) {
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
                                {isProfileOwner && <th />}
                            </tr>
                        </thead>
                        <tbody>
                            {collection.map(pressing => (
                                <TableRow pressing={pressing} isProfileOwner={isProfileOwner} key={pressing.id} />
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        />
    )
}

function TableRow({ pressing, isProfileOwner }: { pressing: CollectionPressing; isProfileOwner: boolean }) {
    const { ref: rowRef, hovered: isRowHovered } = useHover<HTMLTableRowElement>()

    return (
        <tr key={pressing.id} ref={rowRef}>
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
                {pressing.salePrice ? (
                    <Center>
                        <span>{'$' + pressing.salePrice}</span>
                    </Center>
                ) : (
                    ''
                )}
            </td>
            {isProfileOwner && (
                <td>
                    <CollectionOptions
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
            )}
        </tr>
    )
}
