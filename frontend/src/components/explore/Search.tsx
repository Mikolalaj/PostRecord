import { ActionIcon, TextInput, TextInputProps, useMantineTheme } from '@mantine/core'
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons-react'

export interface SearchProps extends TextInputProps {
    placeholder: string
}

function Search(props: TextInputProps) {
    const theme = useMantineTheme()

    return (
        <TextInput
            icon={<IconSearch size={18} stroke={1.5} />}
            radius='xl'
            size='md'
            rightSection={
                <ActionIcon size={32} radius='xl' color={theme.primaryColor} variant='filled'>
                    {theme.dir === 'ltr' ? <IconArrowRight size={18} stroke={1.5} /> : <IconArrowLeft size={18} stroke={1.5} />}
                </ActionIcon>
            }
            placeholder={props.placeholder}
            rightSectionWidth={42}
            {...props}
        />
    )
}

export default Search
