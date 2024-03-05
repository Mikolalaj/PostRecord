import { ActionIcon, Button, ColorSwatch, Group, Modal, ScrollArea, Table, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import clsx from 'clsx'
import { NewPressing } from 'hooks/album/useSpotifyAlbum'
import { useState } from 'react'
import ImageFromFile from '../../common/ImageFromFile'
import classes from './EditableTable.module.scss'
import PressingForm from './PressingForm'

type Props = {
    pressings: Array<NewPressing>
    editPressing: (pressing: NewPressing) => void
    deletePressing: (id: string) => void
    addPressing: (pressing: NewPressing) => void
}

export default function Pressings({ pressings, editPressing, addPressing, deletePressing }: Props) {
    const { colorScheme } = useMantineColorScheme()

    const [selectedPressing, setSelectedPressing] = useState<NewPressing | null>(null)
    const [opened, { open, close }] = useDisclosure(false)
    const [scrolled, setScrolled] = useState(false)

    return (
        <>
            <Modal size='550px' centered opened={opened} onClose={close} title={selectedPressing ? 'Edit pressing' : 'Add pressing'}>
                <PressingForm
                    type='add'
                    close={close}
                    onEdit={pressing => editPressing(pressing)}
                    onAdd={pressing => {
                        addPressing(pressing)
                        close()
                    }}
                />
            </Modal>
            <Button compact variant='outline' mt='lg' onClick={open} leftIcon={<IconPlus size={20} />}>
                Add pressing
            </Button>
            <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table miw={700}>
                    <thead
                        className={clsx(classes.header, { [classes.scrolled]: scrolled })}
                        style={{ backgroundColor: colorScheme == 'dark' ? '#141517' : '#f8f9fa' }}
                    >
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Color</th>
                            <th style={{ textAlign: 'center' }} />
                        </tr>
                    </thead>
                    <tbody>
                        {pressings.map(pressing => {
                            return (
                                <tr key={pressing.name}>
                                    <td>
                                        <ImageFromFile file={pressing.image} height={90} width={150} />
                                    </td>
                                    <td>{pressing.name}</td>
                                    <td>
                                        <ColorSwatch color={pressing.color} size={20} />
                                    </td>
                                    <td>
                                        <Group position='center'>
                                            <ActionIcon
                                                color='blue.5'
                                                variant='subtle'
                                                radius='xl'
                                                aria-label='Edit'
                                                onClick={() => {
                                                    open()
                                                    setSelectedPressing(pressing)
                                                }}
                                            >
                                                <IconEdit size={20} stroke={1.5} />
                                            </ActionIcon>
                                            <ActionIcon
                                                color='red.5'
                                                variant='subtle'
                                                radius='xl'
                                                aria-label='Delete'
                                                onClick={() => deletePressing(pressing.name)}
                                            >
                                                <IconTrash size={20} stroke={1.5} />
                                            </ActionIcon>
                                        </Group>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </ScrollArea>
        </>
    )
}
