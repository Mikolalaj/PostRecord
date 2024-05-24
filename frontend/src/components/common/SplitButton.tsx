import { createStyles, Button, Menu, Group, ActionIcon, ButtonProps } from '@mantine/core'
import { IconChevronDown, TablerIconsProps } from '@tabler/icons-react'

const useStyles = createStyles(theme => ({
    button: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },

    menuControl: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[4]}`,
        borderLeft: `0rem solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
}))

interface Props extends ButtonProps {
    onClick: () => void
    children: React.ReactNode
    menuItems: Array<{ icon: (props: TablerIconsProps) => JSX.Element; iconColor?: string; label: string; onClick: () => void }>
}

export default function SplitButton({ onClick, children, menuItems, ...rest }: Props) {
    const { classes, theme } = useStyles()
    const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6]

    return (
        <Group noWrap spacing={0}>
            <Button onClick={onClick} className={classes.button} {...rest}>
                {children}
            </Button>
            <Menu transition='pop' position='bottom-end' withinPortal>
                <Menu.Target>
                    <ActionIcon
                        mt={rest.mt}
                        variant={rest.variant === 'white' ? 'filled' : rest.variant}
                        color={theme.primaryColor}
                        size={36}
                        className={classes.menuControl}
                    >
                        <IconChevronDown size='1rem' stroke={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    {menuItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Menu.Item
                                key={index}
                                icon={<Icon size='1rem' stroke={1.5} color={item.iconColor || menuIconColor} />}
                                onClick={item.onClick}
                            >
                                {item.label}
                            </Menu.Item>
                        )
                    })}
                </Menu.Dropdown>
            </Menu>
        </Group>
    )
}
