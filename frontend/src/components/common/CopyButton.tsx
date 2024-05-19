import { Button, Tooltip } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { IconCopy, IconCheck } from '@tabler/icons-react'

type Props = {
    text: string
    children: React.ReactNode
}

export default function CopyButton({ text, children }: Props) {
    const clipboard = useClipboard()
    return (
        <Tooltip
            label='Link copied!'
            offset={5}
            position='bottom'
            radius='xl'
            transitionDuration={100}
            transition={'slide-down'}
            opened={clipboard.copied}
        >
            <Button
                variant='light'
                rightIcon={clipboard.copied ? <IconCheck size={18} stroke={1.5} /> : <IconCopy size={18} stroke={1.5} />}
                radius='xl'
                size='sm'
                styles={{
                    root: { paddingRight: 14, height: 38 },
                    rightIcon: { marginLeft: 8 },
                }}
                onClick={() => clipboard.copy(text)}
            >
                {children}
            </Button>
        </Tooltip>
    )
}
