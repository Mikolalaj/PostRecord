import { Group, Text } from '@mantine/core'
import { Stats } from 'hooks/auth/useUser'

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

export default UserStats
