import { Text, Paper, Group, Stack, Center, useMantineTheme, Modal } from '@mantine/core'
import CopyButton from 'components/common/CopyButton'
import UserAvatar from 'components/common/UserAvatar'
import FavouriteAlbum from 'components/profile/FavouriteAlbum'
import UserStats from 'components/profile/UserStats'
import { Profile } from 'hooks/auth/useUser'
import { useState } from 'react'
import UpdateProfileForm from './UpdateProfileForm'
import SplitButton from 'components/common/SplitButton'
import { IconKey, IconTrash } from '@tabler/icons-react'

type Props = {
    user: Profile
    isProfileOwner: boolean
}

export default function UserInfo({ user, isProfileOwner }: Props) {
    const theme = useMantineTheme()
    const [modalOpened, setModalOpened] = useState(false)
    return (
        <>
            <Modal size={550} centered opened={modalOpened} onClose={() => setModalOpened(false)} title='Update your profile'>
                <UpdateProfileForm profile={user} closeModal={() => setModalOpened(false)} />
            </Modal>

            <Paper
                radius='md'
                withBorder
                p='lg'
                bg={theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'var(--mantine-color-white)'}
            >
                <Group align='stretch'>
                    <UserAvatar user={user} size={250} />
                    <Stack ml={40} justify='space-between'>
                        <Text ta='center' fz={28} fw={500}>
                            {user.firstName} {user.lastName}
                        </Text>
                        <Text ta='center' c='dimmed' fz='sm'>
                            {user.email}
                            {user.isAdmin ? ' • Admin' : ''}
                        </Text>
                        <UserStats stats={user.stats} />
                        <Center>
                            <Text c='dimmed' size='sm'>
                                Join date: {new Date(user.joinedAt).toLocaleDateString()}
                            </Text>
                        </Center>
                        {isProfileOwner && (
                            <SplitButton
                                variant='default'
                                fullWidth
                                mt='md'
                                onClick={() => setModalOpened(true)}
                                menuItems={[
                                    {
                                        label: 'Change password',
                                        icon: IconKey,
                                        onClick: () => {
                                            console.log('Update profile')
                                        },
                                    },
                                    {
                                        label: 'Delete account',
                                        icon: IconTrash,
                                        iconColor: theme.colors.red[6],
                                        onClick: () => {
                                            console.log('Delete account')
                                        },
                                    },
                                ]}
                            >
                                Update profile
                            </SplitButton>
                        )}
                    </Stack>
                    <Stack ml={30} justify='space-between'>
                        <FavouriteAlbum album={user.favouriteAlbum} />
                        {isProfileOwner && (
                            <CopyButton text={location.href + `/${user.username}`}>Copy link to your profile</CopyButton>
                        )}
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
        </>
    )
}
