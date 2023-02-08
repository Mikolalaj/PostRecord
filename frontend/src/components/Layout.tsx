import { useState, useEffect } from 'react'
import { createStyles, Header, Container, Group, Burger, AppShell, Button, Space, Title, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}))

type Props = {
    children: React.ReactNode
}

const MenuLinks = [
    { label: 'Home', link: '/' },
    { label: 'Find music', link: '/music' },
    { label: 'Explore', link: '/explore' },
    { label: 'Marketplace', link: '/marketplace' }
]

export default function Layout({ children }: Props) {
    const user = useRecoilValue(userState)
    const navigate = useNavigate()

    const { logoutUser } = useAuth()
    const [opened, { toggle }] = useDisclosure(false)
    const [active, setActive] = useState(MenuLinks[0].link)
    const { classes, cx } = useStyles()

    useEffect(() => {
        setActive(window.location.pathname)
    }, [])

    const items = MenuLinks.map(link => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={event => {
                event.preventDefault()
                setActive(link.link)
                navigate(link.link)
            }}
        >
            {link.label}
        </a>
    ))

    return (
        <AppShell
            padding='md'
            header={
                <Header height={60} mb={120}>
                    <Container className={classes.header}>
                        <Group spacing={5} className={classes.links}>
                            <Title
                                fw={700}
                                order={1}
                                ta='center'
                                variant='gradient'
                                gradient={{ from: 'red.7', to: 'violet.6', deg: 120 }}
                            >
                                PostRecord
                            </Title>
                            <Space w='xl' />
                            {items}
                        </Group>
                        <Group spacing={35}>
                            {user && <Text fw={500}>Hello {user.firstName}!</Text>}
                            <Button onClick={logoutUser}>Log out</Button>
                        </Group>
                        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
                    </Container>
                </Header>
            }
            styles={theme => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <Container size='lg' px='xs' mb='xl'>
                {children}
            </Container>
        </AppShell>
    )
}