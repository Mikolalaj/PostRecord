import { Text, Button, Paper, Group, Stack, Center } from '@mantine/core'
import CopyButton from 'components/common/CopyButton'
import QueryRenderer from 'components/common/QueryRenderer'
import UserAvatar from 'components/common/UserAvatar'
import Collection from 'components/profile/Collection'
import FavouriteAlbum from 'components/profile/FavouriteAlbum'
import Wantlist from 'components/profile/Wantlist'
import { useProfile, Stats } from 'hooks/auth/useUser'

function UserStats({ stats }: { stats: Stats }) {
    const { collection, wantlist, forSale } = stats
    return (
        <Group align='stretch' grow>
            <div>
                <Text ta='center' fz='lg' fw={500}>
                    {collection}
                </Text>
                <Text ta='center' fz='sm' c='dimmed' lh={1}>
                    Collection
                </Text>
            </div>
            <div>
                <Text ta='center' fz='lg' fw={500}>
                    {wantlist}
                </Text>
                <Text ta='center' fz='sm' c='dimmed' lh={1}>
                    Wantlist
                </Text>
            </div>

            <div>
                <Text ta='center' fz='lg' fw={500}>
                    {forSale}
                </Text>
                <Text ta='center' fz='sm' c='dimmed' lh={1}>
                    For sale
                </Text>
            </div>
        </Group>
    )
}

export default function Profile() {
    return (
        <>
            <QueryRenderer
                queries={[useProfile()]}
                render={user => (
                    <Paper radius='md' withBorder p='lg' bg='var(--mantine-color-white)'>
                        <Group align='stretch'>
                            <UserAvatar user={user} size={250} />
                            <Stack ml={40} justify='space-between'>
                                <Text ta='center' fz={28} fw={500}>
                                    {user.firstName} {user.lastName}
                                </Text>
                                <Text ta='center' c='dimmed' fz='sm'>
                                    {user.email} • {user.isAdmin ? 'Admin' : ''}
                                </Text>
                                <UserStats stats={user.stats} />
                                <Center>
                                    <Text c='dimmed' size='sm'>
                                        Join date: {new Date(user.joinedAt).toLocaleDateString()}
                                    </Text>
                                </Center>
                                <Button variant='default' fullWidth mt='md'>
                                    Update profile
                                </Button>
                            </Stack>
                            <Stack ml={30} justify='space-between'>
                                <FavouriteAlbum album={user.favouriteAlbum} />
                                <CopyButton text={location.href + `/${user.id}`}>Copy link to your profile</CopyButton>
                            </Stack>
                            <Stack ml={30}>
                                <Text fz='lg' fw={500}>
                                    Bio
                                </Text>
                                <Text maw={230} c='dimmed' lineClamp={8} align='justify'>
                                    {user.bio || 'No bio'}
                                </Text>
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
