import { Text, Button, Paper, Group, Stack, Center } from '@mantine/core'
import QueryRenderer from 'components/common/QueryRenderer'
import UserAvatar from 'components/common/UserAvatar'
import Collection from 'components/profile/Collection'
import Wantlist from 'components/profile/Wantlist'
import { useUser } from 'hooks/auth/useUser'

const stats = [
    { value: '2', label: 'For Sale' },
    { value: '64', label: 'In Collection' },
    { value: '5', label: 'In Wantlist' },
]

function Stats() {
    return (
        <Group align='stretch'>
            {stats.map(stat => (
                <div key={stat.label}>
                    <Text ta='center' fz='lg' fw={500}>
                        {stat.value}
                    </Text>
                    <Text ta='center' fz='sm' c='dimmed' lh={1}>
                        {stat.label}
                    </Text>
                </div>
            ))}
        </Group>
    )
}

export default function Profile() {
    return (
        <>
            <QueryRenderer
                queries={[useUser()]}
                render={user => (
                    <Paper radius='md' withBorder p='lg' bg='var(--mantine-color-white)'>
                        <Group align='stretch'>
                            <UserAvatar user={user} size={250} />
                            <Stack>
                                <Text ta='center' fz='lg' fw={500} mt='md'>
                                    {user.firstName} {user.lastName}
                                </Text>
                                <Text ta='center' c='dimmed' fz='sm'>
                                    {user.email} • {user.isAdmin ? 'Admin' : ''}
                                </Text>
                                <Stats />
                                <Center>
                                    <Text c='dimmed' size='sm'>
                                        Join date: {new Date(user.joinedAt).toLocaleDateString()}
                                    </Text>
                                </Center>
                                <Button variant='default' fullWidth mt='md'>
                                    Update profile
                                </Button>
                            </Stack>
                        </Group>
                    </Paper>
                )}
            />
            <Collection />
            <Wantlist />
        </>
    )
}
