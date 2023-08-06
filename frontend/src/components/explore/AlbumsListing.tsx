import { Alert, Loader, SimpleGrid } from '@mantine/core'
import AlbumCard from './AlbumCard'
import useAlbums from './useAlbums'
import { IconAlertCircle } from '@tabler/icons-react'

function AlbumsListing() {
    const { data, isLoading, isError, error } = useAlbums()

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return (
            <Alert icon={<IconAlertCircle size='1rem' />} title='Bummer!' color='red'>
                Error: {error.message}
            </Alert>
        )
    }
    return (
        <SimpleGrid cols={5} spacing='lg' verticalSpacing='lg' my='lg'>
            {data.map(album => (
                <AlbumCard {...album} key={album.id} />
            ))}
        </SimpleGrid>
    )
}

export default AlbumsListing
