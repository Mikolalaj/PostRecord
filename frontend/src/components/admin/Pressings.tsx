import { Image, Modal } from '@mantine/core'
import DataTable from 'components/common/DataTable'
import { useState } from 'react'
import { Pressing, useAllPressings, useDeletePressing } from 'hooks/album/usePressings'
import PressingForm from './addAlbum/PressingForm'

export default function Pressings() {
    const [openedNew, setOpenedNew] = useState(false)

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
                nameKey='name'
                onAdd={() => setOpenedNew(true)}
                deleteMutation={useDeletePressing}
                onEdit={editAlbum}
            />
            <Modal centered size={650} opened={openedNew} onClose={() => setOpenedNew(false)} title='Add new pressing'>
                <PressingForm
                    close={close}
                    onAdd={pressing => {
                        console.log('Adding pressing', pressing)
                        close()
                    }}
                />
            </Modal>
        </>
    )
}
