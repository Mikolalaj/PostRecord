import { Image, Modal } from '@mantine/core'
import DataTable from 'components/common/DataTable'
import { Album, useAlbums } from 'hooks/album/useAlbums'
import { useState } from 'react'
import AddNewAlbum from './AddNewAlbum'

export default function Albums() {
    const [openedNew, setOpenedNew] = useState(false)

    const editAlbum = (album: Album) => {
        console.log('Editing album', album.id)
    }

    return (
        <>
            <DataTable
                dataQuery={useAlbums}
                headers={['Cover Photo', 'Title', 'Artist']}
                renderRow={album => (
                    <>
                        <td>
                            <Image width={70} src={album.image} alt={album.title} />
                        </td>
                        <td>{album.title}</td>
                        <td>{album.artistName}</td>
                    </>
                )}
                itemName='album'
                nameKey='title'
                onAdd={() => setOpenedNew(true)}
                onEdit={editAlbum}
            />
            <Modal size={1100} opened={openedNew} onClose={() => setOpenedNew(false)} title='Add new album'>
                <AddNewAlbum />
            </Modal>
        </>
    )
}
