import { Image, Modal } from '@mantine/core'
import DataTable from 'components/common/DataTable'
import { useState } from 'react'
import AddNewAlbum from './AddNewAlbum'
import { Pressing, useAllPressings } from 'hooks/album/usePressings'

export default function Pressings() {
    const [openedNew, setOpenedNew] = useState(false)

    const deleteAlbum = (pressing: Pressing) => {
        console.log('Deleting pressing', pressing.id)
    }

    const editAlbum = (pressing: Pressing) => {
        console.log('Editing pressing', pressing.id)
    }

    return (
        <>
            <DataTable
                dataQuery={useAllPressings}
                headers={['Photo', 'Name', 'Album Title']}
                renderRow={album => (
                    <>
                        <td>
                            <Image width={70} src={import.meta.env.VITE_IMAGE_PATH + album.image} alt={album.name} />
                        </td>
                        <td>{album.name}</td>
                        <td>{album.albumTitle}</td>
                    </>
                )}
                itemName='pressing'
                onAdd={() => setOpenedNew(true)}
                onDelete={deleteAlbum}
                onEdit={editAlbum}
            />
            <Modal size={1100} opened={openedNew} onClose={() => setOpenedNew(false)} title='Add new pressing'>
                <AddNewAlbum />
            </Modal>
        </>
    )
}
