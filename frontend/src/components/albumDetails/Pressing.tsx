import { ActionIcon, Card, createStyles, Group, Image, Modal, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconPlus } from '@tabler/icons-react'
import { useState } from 'react'

const useStyles = createStyles(theme => ({
    image: {
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
}))

interface PressingProps {
    name: string
    image: string
    color: string
}

function Pressing({ name, image, color }: PressingProps) {
    const { classes, theme } = useStyles()
    const [openedModal, setOpenedModal] = useState(false)

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
                <Image src={image} height={800} />
            </Modal>

            <Card radius='md'>
                <Card.Section onClick={() => setOpenedModal(true)} style={{ overflow: 'hidden', cursor: 'pointer' }}>
                    <Image height={180} className={classes.image} src={image} style={{ backgroundColor: getCardColor() }} />
                </Card.Section>
                <Card.Section py='sm'>
                    <Group position='center'>
                        <Text color={getNameColor()} ta='center' weight={700}>
                            {name}
                        </Text>
                        <ActionIcon
                            color='violet'
                            radius='xl'
                            variant='subtle'
                            onClick={() =>
                                showNotification({
                                    icon: <IconCheck size={18} />,
                                    color: 'teal',
                                    title: 'Collection updated!',
                                    message: `You have added "${name}" pressing to your collection.`,
                                })
                            }
                            style={{ position: 'absolute', right: 10 }}>
                            <IconPlus size={18} />
                        </ActionIcon>
                    </Group>
                </Card.Section>
            </Card>
        </>
    )
}

export default Pressing
