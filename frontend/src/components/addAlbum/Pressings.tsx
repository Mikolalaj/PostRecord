import { useState } from 'react'
import { Table, ScrollArea, ActionIcon, Group, Modal, Button, useMantineColorScheme, Image, ColorSwatch } from '@mantine/core'
import classes from './EditableTable.module.scss'
import clsx from 'clsx'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import PressingForm, { Pressing } from './PressingForm'

type Props = {
    pressings: Array<Pressing>
    editPressing: (pressing: Pressing) => void
    deletePressing: (id: string) => void
    addPressing: (pressing: Pressing) => void
}

export default function Pressings({ pressings, editPressing, addPressing, deletePressing }: Props) {
    const { colorScheme } = useMantineColorScheme()

    const [selectedPressing, setSelectedPressing] = useState<Pressing | null>(null)
    const [opened, { open, close }] = useDisclosure(false)
    const [scrolled, setScrolled] = useState(false)

    const rows = pressings.map(pressing => (
        <tr key={pressing.name}>
            <td>
                <Image src={pressing.image} width={70} height={70} />
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
    ))

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
                            <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </>
    )
}
