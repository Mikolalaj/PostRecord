import { Badge, Card, createStyles, Group, Image, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles(theme => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        width: 200,
        cursor: 'pointer',
    },
    image: {
        maxWidth: 200,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    title: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: 200,
        overflow: 'hidden',
    },
    section: {
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },
    like: {
        color: theme.colors.red[6],
    },
    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}))

interface AlbumCardProps {
    id: string
    title: string
    artist: string
    image: string
    isNew: boolean
}

export function AlbumCard({ id, title, artist, image, isNew }: AlbumCardProps) {
    const { classes, theme } = useStyles()
    const navigate = useNavigate()

    return (
        <Card withBorder radius='md' p='md' shadow='sm' className={classes.card} onClick={() => navigate(`/album/${id}`)}>
            <Card.Section style={{ overflow: 'hidden' }}>
                <Image className={classes.image} src={image} alt={title} height={200} width={200} />
            </Card.Section>

            <Card.Section className={classes.section} mt='md'>
                <Group position='apart'>
                    <Text size='md' weight={500} className={classes.title}>
                        {title}
                    </Text>
                    {isNew && (
                        <Badge color={theme.colorScheme === 'light' ? 'pink' : 'purple'} size='sm'>
                            New
                        </Badge>
                    )}
                </Group>
                <Text size='sm' mt='xs'>
                    {artist}
                </Text>
            </Card.Section>
        </Card>
    )
}

export default AlbumCard
