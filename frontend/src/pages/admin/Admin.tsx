import { Button } from '@mantine/core'
import { IconMusicPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

function Admin() {
    const navigate = useNavigate()

    return (
        <>
            <h1>Admin tools</h1>
            <Button onClick={() => navigate('/admin/add-new-album')} leftIcon={<IconMusicPlus />}>
                Add new album
            </Button>
        </>
    )
}

export default Admin
