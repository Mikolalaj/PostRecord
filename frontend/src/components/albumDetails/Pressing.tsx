import { ActionIcon, Card, Center, createStyles, Group, Image, Modal, Text } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { IconChecks, IconPlus, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useAddToCollection, useRemoveFromCollection } from '../../hooks/album/useCollection'
import { Pressing as PressingType } from '../../hooks/album/usePressings'
import { useLocation } from 'react-router-dom'

const useStyles = createStyles(() => ({
    image: {
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
}))

function Pressing({ id, name, image, color, isInCollection }: PressingType) {
    const location = useLocation()
    const albumId = location.pathname.split('/')[2]

    const { classes, theme } = useStyles()
    const [openedModal, setOpenedModal] = useState(false)
    const { hovered, ref } = useHover()

    const addToCollection = useAddToCollection()
    const removeFromCollection = useRemoveFromCollection()

    const getNameColor = () => {
        if (color === 'dark') {
            return theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[9]
        }
        return theme.colors[color][theme.colorScheme === 'dark' ? 3 : 9]
    }

    const getCardColor = () => {
        if (color === 'dark') {
            return theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[1]
        }
        return theme.colors[color][theme.colorScheme === 'dark' ? 1 : 0]
    }

    return (
        <>
            <Modal size={800} centered opened={openedModal} onClose={() => setOpenedModal(false)} title={name}>
                <Center>
                    <Image src={image} width={700} />
                </Center>
            </Modal>

            <Card radius='md'>
                <Card.Section onClick={() => setOpenedModal(true)} style={{ overflow: 'hidden', cursor: 'pointer' }}>
                    <Image
                        px={30}
                        py={20}
                        height={140}
                        fit='contain'
                        className={classes.image}
                        src={image}
                        style={{ backgroundColor: getCardColor() }}
                    />
                </Card.Section>
                <Card.Section py='sm'>
                    <Group position='center'>
                        <Text color={getNameColor()} ta='center' weight={700}>
                            {name}
                        </Text>
                        <div ref={ref} style={{ position: 'absolute', right: 10 }}>
                            <ActionIcon
                                color={isInCollection ? (hovered ? 'red' : 'teal') : 'blue.4'}
                                radius='xl'
                                variant='subtle'
                                onClick={() =>
                                    isInCollection
                                        ? removeFromCollection.mutateAsync({ pressingId: id, albumId })
                                        : addToCollection.mutateAsync({ pressingId: id, albumId })
                                }
                            >
                                {isInCollection ? hovered ? <IconX size={18} /> : <IconChecks size={18} /> : <IconPlus size={18} />}
                            </ActionIcon>
                        </div>
                    </Group>
                </Card.Section>
            </Card>
        </>
    )
}

export default Pressing
