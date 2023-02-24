import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

export default function ThemePicker() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const dark = colorScheme === 'dark'

    function onChange() {
        toggleColorScheme()
        localStorage.setItem('colorScheme', dark ? 'light' : 'dark')
    }

    return (
        <ActionIcon variant='outline' color={dark ? 'pink' : 'primary'} onClick={onChange} title='Toggle color scheme'>
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
    )
}
