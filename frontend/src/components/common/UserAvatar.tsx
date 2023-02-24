import { Avatar } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { User } from '../../atoms'

interface UserAvatarProps {
    user: User | null
}

const colors = ['red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange']

function getRandomColor(user: User) {
    const hash = user.firstName.length + user.lastName.length
    return colors[hash % colors.length]
}

function UserAvatar({ user }: UserAvatarProps) {
    if (!user) return null

    const navigate = useNavigate()

    return (
        <Avatar color={getRandomColor(user)} radius='xl' style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
        </Avatar>
    )
}

export default UserAvatar
