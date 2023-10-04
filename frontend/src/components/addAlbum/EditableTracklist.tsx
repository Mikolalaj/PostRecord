import { useState } from 'react'
import { Track } from '../../hooks/album/useAlbums'
import { Table, ScrollArea, ActionIcon, Group, Modal, createStyles } from '@mantine/core'
import classes from './EditableTable.module.scss'
import clsx from 'clsx'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import TrackForm from './TrackForm'

const useStyles = createStyles({})

export interface EditableTrack extends Track {
    spotifyId: string
}

type Props = {
    tracks: Array<EditableTrack>
    deleteTrack: (spotifyId: string) => void
    editTrack: (track: EditableTrack) => void
}

export default function EditableTracklist({ tracks, deleteTrack, editTrack }: Props) {
    const { theme } = useStyles()
    const [selectedTrack, setSelectedTrack] = useState<EditableTrack | null>(null)
    const [opened, { open, close }] = useDisclosure(false)
    const [scrolled, setScrolled] = useState(false)

    const rows = tracks.map(track => (
        <tr key={track.spotifyId}>
            <td>{track.number}</td>
            <td>{track.title}</td>
            <td>{track.features}</td>
            <td>{track.duration}</td>
            <td>
                <Group position='center'>
                    <ActionIcon
                        color='blue.5'
                        variant='subtle'
                        radius='xl'
                        aria-label='Edit'
                        onClick={() => {
                            open()
                            setSelectedTrack(track)
                        }}
                    >
                        <IconEdit size={20} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        color='red.5'
                        variant='subtle'
                        radius='xl'
                        aria-label='Delete'
                        onClick={() => deleteTrack(track.spotifyId)}
                    >
                        <IconTrash size={20} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </td>
        </tr>
    ))

    return (
        <>
            <Modal centered opened={opened} onClose={close} title='Edit track'>
                <TrackForm
                    type='edit'
                    close={close}
                    onSubmit={values => {
                        if (selectedTrack) {
                            editTrack({
                                ...values,
                                spotifyId: selectedTrack.spotifyId,
                                features: values.features || null,
                            })
                        }
                    }}
                    defaultValues={
                        selectedTrack
                            ? {
                                  number: selectedTrack.number,
                                  title: selectedTrack.title,
                                  features: selectedTrack.features || '',
                                  duration: selectedTrack.duration,
                              }
                            : undefined
                    }
                />
            </Modal>

            <ScrollArea mt='lg' h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table miw={700}>
                    <thead
                        className={clsx(classes.header, { [classes.scrolled]: scrolled })}
                        style={{ backgroundColor: theme.colorScheme == 'dark' ? '#141517' : '#f8f9fa', zIndex: 2 }}
                    >
                        <tr>
                            <th>Track number</th>
                            <th>Title</th>
                            <th>Features</th>
                            <th>Duration (seconds)</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </>
    )
}
