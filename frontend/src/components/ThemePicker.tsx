import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'

export default function ThemePicker() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const dark = colorScheme === 'dark'

    return (
        <ActionIcon variant='outline' color={dark ? 'pink' : 'primary'} onClick={() => toggleColorScheme()} title='Toggle color scheme'>
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
    )
}
