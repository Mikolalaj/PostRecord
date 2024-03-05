import { Image, Modal } from '@mantine/core'
import DataTable from 'components/common/DataTable'
import { useState } from 'react'
import AddNewAlbum from './AddNewAlbum'
import { Artist, useArtists } from 'hooks/album/useArtists'

export default function Artists() {
    const [openedNew, setOpenedNew] = useState(false)

    const deleteArtist = (artist: Artist) => {
        console.log('Deleting artist', artist.id)
    }

    const editArtist = (artist: Artist) => {
        console.log('Editing artist', artist.id)
    }

    return (
        <>
            <DataTable
                dataQuery={() => useArtists()}
                headers={['Photo', 'Name', 'Bio']}
                renderRow={artist => (
                    <>
                        <td>
                            <Image width={70} src={artist.image} alt={artist.name} />
                        </td>
                        <td style={{ width: '15%', minWidth: '150px' }}>{artist.name}</td>
                        <td>
                            <span
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {artist.bio}
                            </span>
                        </td>
                    </>
                )}
                itemName='artist'
                onAdd={() => setOpenedNew(true)}
                onDelete={deleteArtist}
                onEdit={editArtist}
            />
            <Modal size={1100} opened={openedNew} onClose={() => setOpenedNew(false)} title='Add new artist'>
                <AddNewAlbum />
            </Modal>
        </>
    )
}
