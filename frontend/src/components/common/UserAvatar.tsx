import { Avatar } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

interface UserAvatarProps {
    user: {
        id: string
        firstName: string
        lastName: string
        pictures: {
            bigUrl: string
            smallUrl: string
        } | null
    } | null
    size?: number
}

const colors = ['red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange']

function getRandomColor(user: { firstName: string; lastName: string }) {
    const hash = user.firstName.length + user.lastName.length
    return colors[hash % colors.length]
}

function UserAvatar({ user, size }: UserAvatarProps) {
    if (!user) return null
    const navigate = useNavigate()

    const imagePath = user.pictures ? (size && size > 80 ? user.pictures.bigUrl : user.pictures.smallUrl) : undefined

    return (
        <Avatar
            size={size}
            color={getRandomColor(user)}
            radius={size || 'xl'}
            style={{ cursor: 'pointer', border: '1px solid var(--mantine-color-gray-3)' }}
            onClick={() => navigate('/profile')}
            src={imagePath ? imagePath : undefined}
        >
            {imagePath ? undefined : user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
        </Avatar>
    )
}

export default UserAvatar
