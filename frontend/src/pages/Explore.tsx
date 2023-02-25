import { Stack, Title } from '@mantine/core'
import AlbumsListing from '../components/explore/AlbumsListing'
import Search from '../components/explore/Search'

function Explore() {
    return (
        <>
            <Stack spacing='lg'>
                <Title>Explore</Title>
                <Search placeholder='Search albums' />
            </Stack>
            <AlbumsListing />
        </>
    )
}

export default Explore
