import { Tabs } from '@mantine/core'
import { IconDisc, IconMusic, IconUsers } from '@tabler/icons-react'
import Albums from 'components/admin/Albums'
import Artists from 'components/admin/Artists'
import Pressings from 'components/admin/Pressings'
import { useNavigate, useParams } from 'react-router-dom'

function Admin() {
    const navigate = useNavigate()
    const { subPage } = useParams()

    return (
        <>
            <h1>Admin dashboard</h1>
            <Tabs keepMounted={false} radius='md' value={subPage} onTabChange={value => navigate(`/admin/${value}`)}>
                <Tabs.List>
                    <Tabs.Tab value='albums' icon={<IconMusic size={14} />}>
                        Albums
                    </Tabs.Tab>
                    <Tabs.Tab value='pressings' icon={<IconDisc size={14} />}>
                        Pressings
                    </Tabs.Tab>
                    <Tabs.Tab value='artists' icon={<IconUsers size={14} />}>
                        Artists
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='albums' pt='xs'>
                    <Albums />
                </Tabs.Panel>
                <Tabs.Panel value='pressings' pt='xs'>
                    <Pressings />
                </Tabs.Panel>
                <Tabs.Panel value='artists' pt='xs'>
                    <Artists />
                </Tabs.Panel>
            </Tabs>
        </>
    )
}

export default Admin
