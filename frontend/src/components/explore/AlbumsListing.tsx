import { SimpleGrid } from '@mantine/core'
import AlbumCard from './AlbumCard'
import useAlbums from '../../hooks/album/useAlbums'
import QueryRenderer from '../common/QueryRenderer'

function AlbumsListing() {
    return (
        <QueryRenderer
            query={useAlbums()}
            render={data => {
                return (
                    <SimpleGrid cols={5} spacing='lg' verticalSpacing='lg' my='lg'>
                        {data.map(album => (
                            <AlbumCard {...album} key={album.id} />
                        ))}
                    </SimpleGrid>
                )
            }}
        />
    )
}

export default AlbumsListing
