import { ActionIcon, Card, Center, createStyles, Group, Image, MantineTheme, Modal, Text } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { IconChecks, IconEyeCheck, IconEyeOff, IconEyePlus, IconPlus, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useAddToCollection, useRemoveFromCollection } from '../../hooks/album/useCollection'
import { UserPressing } from '../../hooks/album/usePressings'
import { useLocation } from 'react-router-dom'
import { useAddToWantlist, useRemoveFromWantlist } from 'hooks/album/useWantlist'

function hexToHSL(H: string): string {
    // Konwersja hex na RGB
    let r: number = 0,
        g: number = 0,
        b: number = 0
    if (H.length == 4) {
        r = parseInt('0x' + H[1] + H[1])
        g = parseInt('0x' + H[2] + H[2])
        b = parseInt('0x' + H[3] + H[3])
    } else if (H.length == 7) {
        r = parseInt('0x' + H[1] + H[2])
        g = parseInt('0x' + H[3] + H[4])
        b = parseInt('0x' + H[5] + H[6])
    }
    // Następnie konwersja RGB na HSL
    r /= 255
    g /= 255
    b /= 255
    const cmin: number = Math.min(r, g, b)
    const cmax: number = Math.max(r, g, b)
    const delta: number = cmax - cmin
    let h: number = 0
    let s: number = 0
    let l: number = 0

    if (delta == 0) h = 0
    else if (cmax == r) h = ((g - b) / delta) % 6
    else if (cmax == g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4

    h = Math.round(h * 60)

    if (h < 0) h += 360

    l = (cmax + cmin) / 2
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return 'hsl(' + h + ',' + s + '%,' + l + '%)'
}

function decreaseSaturation(hex: string, amount: number): string {
    const hsl: string = hexToHSL(hex)
    const [h, s, l]: Array<string> = hsl.slice(4, -1).split(',')

    // Zmniejszenie nasycenia
    const newS = Math.max(0, parseInt(s) - amount) + '%'

    // Konwersja z powrotem na format hex nie jest bezpośrednia
    return `hsl(${h},${newS},${l})`
}

const getCardColor = (color: string, theme: MantineTheme) => {
    if (color === 'dark') {
        return theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[1]
    }
    return theme.colorScheme === 'dark' ? decreaseSaturation(theme.colors[color][9], 35) : theme.colors[color][1]
}

const useStyles = createStyles((theme, { color }: { color: string }) => ({
    image: {
        transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: theme.colorScheme === 'dark' ? getCardColor(color, theme) : getCardColor(color, theme),
        },
    },
}))

function Pressing({ id, name, image, color, isInCollection, isInWantlist }: UserPressing) {
    const location = useLocation()
    const albumId = location.pathname.split('/')[2]

    const { classes, theme } = useStyles({ color })
    const [openedModal, setOpenedModal] = useState(false)
    const { hovered, ref } = useHover()

    const addToCollection = useAddToCollection()
    const removeFromCollection = useRemoveFromCollection()

    const addToWantlist = useAddToWantlist()
    const removeFromWantlist = useRemoveFromWantlist()

    const getNameColor = () => {
        if (color === 'dark') {
            return theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[9]
        }
        return theme.colors[color][theme.colorScheme === 'dark' ? 3 : 9]
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
                    <Image px={30} py={20} height={140} fit='contain' className={classes.image} src={image} />
                </Card.Section>
                <Card.Section py='sm'>
                    <Group position='center'>
                        <div ref={ref} style={{ position: 'absolute', left: 10 }}>
                            <ActionIcon
                                color={isInWantlist ? (hovered ? 'red' : 'teal') : 'blue.4'}
                                radius='xl'
                                variant='subtle'
                                onClick={() =>
                                    isInWantlist
                                        ? removeFromWantlist.mutateAsync({ pressingId: id, albumId })
                                        : addToWantlist.mutateAsync({ pressingId: id, albumId })
                                }
                            >
                                {isInWantlist ? (
                                    hovered ? (
                                        <IconEyeOff size={18} />
                                    ) : (
                                        <IconEyeCheck size={18} />
                                    )
                                ) : (
                                    <IconEyePlus size={18} />
                                )}
                            </ActionIcon>
                        </div>
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
