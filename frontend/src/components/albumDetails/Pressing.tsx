import { Card, Image, Text, useMantineTheme } from '@mantine/core'

interface PressingProps {
    name: string
    image: string
    color: string
}

function Pressing({ name, image, color }: PressingProps) {
    const theme = useMantineTheme()

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
        <Card radius='md' sx={{ backgroundImage: `url(${image})` }}>
            <Card.Section>
                <Image src={image} height={160} style={{ backgroundColor: getCardColor() }} />
            </Card.Section>
            <Card.Section py='sm'>
                <Text color={getNameColor()} ta='center' weight={700}>
                    {name}
                </Text>
            </Card.Section>
        </Card>
    )
}

export default Pressing
