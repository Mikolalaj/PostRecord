import { SimpleGrid } from '@mantine/core'
import { useAlbums } from '../../hooks/album/useAlbums'
import QueryRenderer from '../common/QueryRenderer'
import AlbumCard from './AlbumCard'

function AlbumsListing() {
    return (
        <QueryRenderer
            queries={[useAlbums()]}
            render={albums => {
                return (
                    <SimpleGrid cols={5} spacing='lg' verticalSpacing='lg' my='lg'>
                        {albums.map(album => (
                            <AlbumCard {...album} key={album.id} />
                        ))}
                    </SimpleGrid>
                )
            }}
        />
    )
}

export default AlbumsListing
