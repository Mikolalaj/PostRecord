import { ActionIcon, TextInput, TextInputProps, useMantineTheme } from '@mantine/core'
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons-react'

export interface SearchProps extends TextInputProps {
    onSubmit: () => void
}

function Search({ onSubmit, ...props }: SearchProps) {
    const theme = useMantineTheme()
    return (
        <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            radius='xl'
            size='md'
            rightSection={
                <ActionIcon size={32} radius='xl' color={theme.primaryColor} variant='filled' onClick={onSubmit}>
                    {theme.dir === 'ltr' ? <IconArrowRight size={18} stroke={1.5} /> : <IconArrowLeft size={18} stroke={1.5} />}
                </ActionIcon>
            }
            rightSectionWidth={42}
            {...props}
        />
    )
}

export default Search
